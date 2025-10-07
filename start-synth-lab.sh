#!/bin/bash

echo "🎹 Cathedral Synthesis Laboratory Quick Start"
echo "=============================================="
echo ""

# Check if pnpm is installed
if ! command -v pnpm &> /dev/null; then
    echo "📦 Installing pnpm..."
    npm install -g pnpm@latest
fi

# Navigate to project
cd "/Users/rebeccalemke/Library/Mobile Documents/com~apple~CloudDocs/cathedral-research"

echo "🧹 Cleaning up old dependencies..."
rm -rf node_modules
rm -rf packages/*/node_modules

echo "📚 Installing core audio libraries..."
pnpm add --workspace-root tone howler tonal chroma-js

echo "🎵 Starting basic synthesis demo..."
# Create a simple demo server
python3 -m http.server 8080 &
SERVER_PID=$!

echo ""
echo "🚀 Demo server running at: http://localhost:8080"
echo "📂 Navigate to: packages/synth-lab-pro/demo/"
echo ""
echo "🎹 Available synthesis features:"
echo "   • FM Synthesis (DEXED-style)"
echo "   • Granular Processing"
echo "   • Real-time Effects"
echo "   • MIDI Input Support"
echo "   • Liber Arcanae Integration"
echo "   • Professional Audio Export"
echo ""
echo "⌨️  Keyboard shortcuts:"
echo "   Z-M: Play notes (C-B)"
echo "   S,D,G,H,J: Black keys"
echo "   R: Record/Stop"
echo "   1-8: Switch synthesis rooms"
echo ""
echo "🃏 Tarot Cards influence synthesis:"
echo "   • The Fool: Random modulation"
echo "   • The Magician: Harmonic control"
echo "   • High Priestess: Spectral effects"
echo "   • The Empress: Lush textures"
echo ""
echo "Press Ctrl+C to stop the demo server"

# Wait for user to stop
trap "kill $SERVER_PID" EXIT
wait $SERVER_PID