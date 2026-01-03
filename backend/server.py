#!/usr/bin/env python3
import subprocess
import os
import sys

# Change to backend directory
os.chdir('/app/backend')

# Set environment variables
os.environ['NODE_ENV'] = 'development'
os.environ['PORT'] = '8001'

# Execute the Node.js server using tsx
try:
    subprocess.run(['npx', 'tsx', 'index.ts'], check=True)
except KeyboardInterrupt:
    print("Server stopped")
    sys.exit(0)
except Exception as e:
    print(f"Error starting server: {e}")
    sys.exit(1)
