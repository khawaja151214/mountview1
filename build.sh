#!/bin/bash
set -e
echo "Building Mount View Hotel frontend..."
cd frontend
yarn install
yarn build
echo "Build complete!"
