#!/bin/bash

# Ubuntu Laundry Lounge - Startup Script
# This script starts both the backend and frontend servers

echo "🚀 Starting Ubuntu Laundry Lounge..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed!"
    echo "Please install Node.js first. See SETUP_NODE.md for instructions."
    exit 1
fi

# Check if dependencies are installed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing frontend dependencies..."
    npm install
fi

if [ ! -d "server/node_modules" ]; then
    echo "📦 Installing backend dependencies..."
    cd server
    npm install
    cd ..
fi

# Check if .env file exists
if [ ! -f "server/.env" ]; then
    echo "⚠️  Warning: server/.env file not found!"
    echo "Copy server/.env.example to server/.env and configure Twilio credentials."
    echo "The app will run but WhatsApp notifications won't work."
    echo ""
    read -p "Continue anyway? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Start backend server in background
echo "🔧 Starting backend server on port 3000..."
cd server
node server.js &
BACKEND_PID=$!
cd ..

# Wait a moment for backend to start
sleep 2

# Start frontend server
echo "🎨 Starting frontend server on port 4200..."
echo "📱 Opening Chrome browser..."
echo ""
echo "✅ Application will be available at: http://localhost:4200"
echo "✅ Backend API available at: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop both servers"

# Open Chrome (macOS)
if command -v open &> /dev/null; then
    sleep 5  # Wait for server to start
    open -a "Google Chrome" http://localhost:4200
fi

# Start Angular dev server (this will block)
npm start

# Cleanup on exit
trap "kill $BACKEND_PID 2>/dev/null" EXIT

