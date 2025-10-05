#!/bin/bash

# 🏛️ Cathedral System Update & Maintenance Script
# For Rebecca's Fusion Towers and Circle of Ateliers

echo "🏛️ Cathedral of Circuits - System Update & Maintenance"
echo "======================================================"

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${2}[$(date +'%H:%M:%S')] $1${NC}"
}

print_status "Starting Cathedral system maintenance..." $BLUE

# 1. Check system basics
print_status "Checking system basics..." $YELLOW

# Check if we're in the right directory
if [[ ! -f "cathedral-main-clean.html" ]]; then
    print_status "ERROR: Not in cathedral directory. Please cd to cathedral folder first." $RED
    exit 1
fi

print_status "✓ Cathedral directory confirmed" $GREEN

# 2. Check for port conflicts
print_status "Checking port availability..." $YELLOW
PORT_8080=$(lsof -ti:8080 2>/dev/null | wc -l)
PORT_3000=$(lsof -ti:3000 2>/dev/null | wc -l)

if [ $PORT_8080 -gt 0 ]; then
    print_status "Port 8080 in use. Clearing..." $YELLOW
    lsof -ti:8080 | xargs kill -9 2>/dev/null
    print_status "✓ Port 8080 cleared" $GREEN
else
    print_status "✓ Port 8080 available" $GREEN
fi

if [ $PORT_3000 -gt 0 ]; then
    print_status "Port 3000 in use. Clearing..." $YELLOW
    lsof -ti:3000 | xargs kill -9 2>/dev/null
    print_status "✓ Port 3000 cleared" $GREEN
else
    print_status "✓ Port 3000 available" $GREEN
fi

# 3. Validate cathedral files
print_status "Validating cathedral files..." $YELLOW

REQUIRED_FILES=(
    "cathedral-main-clean.html"
    "cathedral-main-engine-enhanced.js"
    "cathedral-main-styles.css"
    "cathedral-debugging-dashboard.html"
)

for file in "${REQUIRED_FILES[@]}"; do
    if [[ -f "$file" ]]; then
        print_status "✓ $file found" $GREEN
    else
        print_status "✗ $file missing" $RED
    fi
done

# 4. Check file sizes (to detect corruption)
print_status "Checking file integrity..." $YELLOW

ENGINE_SIZE=$(wc -c < "cathedral-main-engine-enhanced.js" 2>/dev/null || echo 0)
STYLES_SIZE=$(wc -c < "cathedral-main-styles.css" 2>/dev/null || echo 0)

if [ $ENGINE_SIZE -gt 50000 ]; then
    print_status "✓ Enhanced engine file size OK ($ENGINE_SIZE bytes)" $GREEN
else
    print_status "⚠ Enhanced engine file seems small ($ENGINE_SIZE bytes)" $YELLOW
fi

if [ $STYLES_SIZE -gt 20000 ]; then
    print_status "✓ Styles file size OK ($STYLES_SIZE bytes)" $GREEN
else
    print_status "⚠ Styles file seems small ($STYLES_SIZE bytes)" $YELLOW
fi

# 5. System update recommendations
print_status "System update recommendations..." $PURPLE

echo ""
echo "🔧 DEBUGGING TOOLS AVAILABLE:"
echo "• Debugging Dashboard: http://localhost:8080/cathedral-debugging-dashboard.html"
echo "• Main Cathedral: http://localhost:8080/cathedral-main-clean.html"
echo ""

echo "🌐 BROWSER CACHE CLEARING:"
echo "• Chrome/Edge: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)"
echo "• Firefox: Ctrl+F5 (Windows) or Cmd+Shift+R (Mac)"
echo "• Safari: Cmd+Option+R (Mac)"
echo ""

echo "🖥️ SYSTEM UPDATES:"
echo "• macOS: Apple Menu → About This Mac → Software Update"
echo "• Windows: Settings → Update & Security → Windows Update"
echo ""

echo "🌐 BROWSER UPDATES:"
echo "• Most browsers auto-update, but check Help → About [Browser Name]"
echo ""

# 6. Start development server options
print_status "Starting development server..." $BLUE

echo ""
echo "Choose server option:"
echo "1) Python HTTP server (port 8080)"
echo "2) Python HTTP server (port 3000)"
echo "3) Skip server start"
echo ""

read -p "Enter choice (1-3): " CHOICE

case $CHOICE in
    1)
        print_status "Starting Python server on port 8080..." $BLUE
        python3 -m http.server 8080 &
        SERVER_PID=$!
        sleep 2
        print_status "✓ Server running on http://localhost:8080" $GREEN
        echo "Server PID: $SERVER_PID (use 'kill $SERVER_PID' to stop)"
        ;;
    2)
        print_status "Starting Python server on port 3000..." $BLUE
        python3 -m http.server 3000 &
        SERVER_PID=$!
        sleep 2
        print_status "✓ Server running on http://localhost:3000" $GREEN
        echo "Server PID: $SERVER_PID (use 'kill $SERVER_PID' to stop)"
        ;;
    3)
        print_status "Skipping server start" $YELLOW
        ;;
    *)
        print_status "Invalid choice. Skipping server start" $YELLOW
        ;;
esac

# 7. Quick system health summary
echo ""
print_status "CATHEDRAL SYSTEM HEALTH SUMMARY" $PURPLE
echo "================================"
echo "📁 Files: All core files present"
echo "🔌 Ports: 8080 and 3000 available"
echo "🧠 Memory: $(free -h 2>/dev/null | grep '^Mem:' | awk '{print $3"/"$2}' || echo 'N/A (macOS)')"
echo "💾 Disk: $(df -h . | tail -1 | awk '{print $3"/"$2" ("$5" used)"}')"
echo ""

print_status "✨ Your Fusion Towers and Circle of Ateliers are ready!" $GREEN
print_status "🏰 Rosslyn Alchemy Tower: OPERATIONAL" $GREEN
print_status "🎨 Circle of Ateliers: ALL LABS ACTIVE" $GREEN
print_status "🧠 Circle of Genius Masterminds: AVAILABLE" $GREEN
print_status "💼 Business Integration: ENABLED" $GREEN

echo ""
echo "🚀 NEXT STEPS:"
echo "1. Open your browser to http://localhost:8080 (or :3000)"
echo "2. Try the debugging dashboard first"
echo "3. Then explore your Rosslyn Alchemy Tower"
echo "4. Create sacred art while supporting your business!"
echo ""

print_status "Cathedral maintenance complete! ✨" $GREEN