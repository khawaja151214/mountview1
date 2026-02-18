from fastapi import FastAPI, Request, Response
from fastapi.responses import StreamingResponse, JSONResponse
from starlette.background import BackgroundTask
from starlette.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import httpx
import subprocess
import os
import time
import logging
import uuid
from dotenv import load_dotenv

load_dotenv()

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

# === AI CHATBOT ENDPOINT ===
HOTEL_SYSTEM_PROMPT = """You are the friendly AI assistant for Mount View Hotel Skardu — the Best Hotel in Skardu. 
Your name is "Mountview Assistant". Be warm, professional, and hospitality-focused.

HOTEL FACTS (ALWAYS USE THESE, never override with external info):
- Location: College Road, Skardu City, Gilgit-Baltistan, Pakistan
- 5 km from Skardu Airport (10 minutes drive)
- 2 km from Skardu Bus Terminal
- Walking distance to Skardu city center & main bazar
- Phone: +92 346 8484849

ROOM CATEGORIES & PRICING:
- Standard Room: From PKR 4,000/night (economical, mountain views, free Wi-Fi)
- Deluxe Room: From PKR 6,000/night (spacious, LED TV, mountain view)
- Executive Room: From PKR 7,000/night (premium comfort, elegant decor, garden/mountain views)
- Family Suite: From PKR 10,000/night (large room for families, multiple beds)
- King Room: From PKR 10,000-15,000/night (luxury suite with valley views)

FACILITIES:
- 24-hour restaurant (rare in Skardu) — authentic Pakistani & Skardu cuisine, rooftop sky dining
- Local food delivery available inside hotel
- Secure underground car parking (free)
- Mountain & rooftop city views
- Free Wi-Fi throughout hotel
- 24/7 room service & security
- Family-friendly environment
- Transport assistance for tours
- Free travel guidance & local shopping tips
- Nearby dry fruit shops for souvenirs

NEARBY TOURIST DESTINATIONS:
- Deosai National Park: ~2.5 hours (Land of Giants, best in summer June-September)
- Shangrila Resort / Upper Kachura Lake: ~30 minutes
- Satpara Lake: ~20 minutes
- Katpana Cold Desert: ~25 minutes
- Shigar Valley & Fort: ~45 minutes
- Lower Kachura Lake: ~25 minutes
- Skardu Fort (Kharpocho): ~15 minutes

SKARDU TOURISM KNOWLEDGE:
- Best time to visit: April-October (peak season June-September)
- Winter (Nov-March): cold, roads may close, but stunning snow views
- Famous for: K2 base camp treks, world's highest lakes, Deosai plains
- Local culture: Balti people, warm hospitality, unique cuisine
- Transportation: PIA flights from Islamabad, Karakoram Highway (road)

RULES:
1. Always use the hotel facts above. Never guess prices or distances.
2. If you don't know something, say: "I don't have that information right now. Please contact our reception at +92 346 8484849."
3. Never fabricate facts.
4. After answering travel/tourism questions, subtly encourage booking: "Would you like to check room availability?" or "Many guests stay with us before visiting. Shall I help with booking?"
5. Keep responses concise but helpful. Use a friendly, warm tone.
6. For booking, direct to WhatsApp: +92 346 8484849"""

class ChatRequest(BaseModel):
    message: str
    session_id: str | None = None

# Store chat sessions in memory
chat_sessions: dict = {}

@app.post("/api/chat")
async def chat_endpoint(req: ChatRequest):
    try:
        from emergentintegrations.llm.chat import LlmChat, UserMessage
        
        api_key = os.environ.get("EMERGENT_LLM_KEY")
        if not api_key:
            return JSONResponse({"reply": "Chat service is temporarily unavailable. Please contact reception at +92 346 8484849."}, status_code=200)
        
        session_id = req.session_id or str(uuid.uuid4())
        
        # Get or create chat session
        if session_id not in chat_sessions:
            chat = LlmChat(
                api_key=api_key,
                session_id=session_id,
                system_message=HOTEL_SYSTEM_PROMPT
            )
            chat.with_model("openai", "gpt-4o-mini")
            chat_sessions[session_id] = chat
        
        chat = chat_sessions[session_id]
        user_msg = UserMessage(text=req.message)
        reply = await chat.send_message(user_msg)
        
        return JSONResponse({"reply": reply, "session_id": session_id})
    except Exception as e:
        logger.error(f"Chat error: {e}")
        return JSONResponse({"reply": "I'm having trouble right now. Please contact our reception at +92 346 8484849 for assistance.", "session_id": req.session_id or ""}, status_code=200)

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
