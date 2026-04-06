#!/bin/bash

# SACIMAK Quick Start Script

echo "🎨 SACIMAK - Luxury Bag Customizer"
echo "=================================="
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo "✅ Dependencies installed!"
    echo ""
fi

echo "🚀 Starting development server..."
echo "   Local:   http://localhost:5173/"
echo "   Press Ctrl+C to stop"
echo ""

npm run dev
