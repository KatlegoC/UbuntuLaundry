#!/bin/bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && source "$NVM_DIR/nvm.sh"

echo "Starting backend server..."
cd server
node server.js &
BACKEND_PID=$!
cd ..

echo "Waiting for backend to start..."
sleep 3

echo "Starting frontend server (this may take 30-60 seconds)..."
npm start

# Cleanup
trap "kill $BACKEND_PID 2>/dev/null" EXIT
