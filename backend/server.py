from fastapi import FastAPI, Request, Response
from fastapi.responses import StreamingResponse
from starlette.background import BackgroundTask
from starlette.middleware.cors import CORSMiddleware
import httpx
import subprocess
import os
import time
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Node.js backend URL
NODE_BACKEND_URL = "http://localhost:8002"

# Start Node.js server in the background
def start_nodejs_server():
    """Start the Node.js Express server"""
    try:
        logger.info("Starting Node.js backend server on port 8002...")
        # Change to backend directory and start the server
        os.chdir('/app/backend')
        env = os.environ.copy()
        env['PORT'] = '8002'
        env['NODE_ENV'] = 'development'
        
        # Start the server in background
        process = subprocess.Popen(
            ['npx', 'tsx', 'index.ts'],
            env=env,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE
        )
        
        # Give it a few seconds to start
        time.sleep(3)
        logger.info(f"Node.js server started with PID: {process.pid}")
        return process
    except Exception as e:
        logger.error(f"Failed to start Node.js server: {e}")
        return None

# Start the Node.js server when FastAPI starts
nodejs_process = None

@app.on_event("startup")
async def startup_event():
    global nodejs_process
    nodejs_process = start_nodejs_server()

@app.on_event("shutdown")
async def shutdown_event():
    global nodejs_process
    if nodejs_process:
        logger.info("Stopping Node.js server...")
        nodejs_process.terminate()
        nodejs_process.wait()

# Proxy all API requests to Node.js backend
@app.api_route("/api/{path:path}", methods=["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"])
async def proxy_to_nodejs(request: Request, path: str):
    """Proxy all /api/* requests to the Node.js Express backend"""
    try:
        client = httpx.AsyncClient()
        url = f"{NODE_BACKEND_URL}/api/{path}"
        
        # Get request body if present
        body = await request.body()
        
        # Forward the request to Node.js backend
        response = await client.request(
            method=request.method,
            url=url,
            headers=dict(request.headers),
            content=body,
            params=request.query_params,
            timeout=30.0
        )
        
        await client.aclose()
        
        # Return the response from Node.js
        return Response(
            content=response.content,
            status_code=response.status_code,
            headers=dict(response.headers),
            media_type=response.headers.get("content-type")
        )
    except httpx.ConnectError:
        logger.error("Cannot connect to Node.js backend. Is it running?")
        return Response(
            content='{"error": "Backend service unavailable"}',
            status_code=503,
            media_type="application/json"
        )
    except Exception as e:
        logger.error(f"Proxy error: {e}")
        return Response(
            content=f'{{"error": "{str(e)}"}}',
            status_code=500,
            media_type="application/json"
        )

@app.get("/")
async def root():
    """Health check endpoint"""
    return {
        "message": "Mount View Hotel Skardu - Proxy Server",
        "status": "running",
        "nodejs_backend": NODE_BACKEND_URL
    }

@app.get("/health")
async def health_check():
    """Check if both FastAPI proxy and Node.js backend are healthy"""
    try:
        client = httpx.AsyncClient()
        response = await client.get(f"{NODE_BACKEND_URL}/api/", timeout=5.0)
        await client.aclose()
        
        if response.status_code == 200:
            return {"status": "healthy", "backend": "connected"}
        else:
            return {"status": "degraded", "backend": "error"}
    except Exception as e:
        return {"status": "unhealthy", "backend": str(e)}
