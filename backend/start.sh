#!/bin/bash
cd /app/backend
export NODE_ENV=development
export PORT=8001
exec node --loader tsx index.ts
