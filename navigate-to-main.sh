#!/bin/bash

# Cathedral Repository Navigation Script (Research Archive Version)
# Automatically guides to main repository

echo "🏛️ Cathedral Research Archive - Navigation Guide"
echo "================================================"

MAIN_REPO="/Users/rebeccalemke/cathedral"

echo "⚠️  WARNING: THIS IS THE RESEARCH ARCHIVE"
echo "📍 You are currently in the research folder"
echo ""
echo "🎯 MAIN REPOSITORY LOCATION:"
echo "   $MAIN_REPO"
echo ""
echo "🚀 Quick Navigation:"
echo "   cd '$MAIN_REPO'"
echo ""
echo "📖 For detailed instructions:"
echo "   cat REDIRECT_TO_MAIN.md"
echo ""

# Auto-navigate option
echo "Would you like to navigate to the main repository now? (y/n)"
read -r response

if [[ "$response" =~ ^[Yy]$ ]]; then
    echo "🚀 Navigating to main repository..."
    cd "$MAIN_REPO" || exit 1
    
    # Source the main navigation script if it exists
    if [ -f "$MAIN_REPO/scripts/check-location.sh" ]; then
        source "$MAIN_REPO/scripts/check-location.sh"
    else
        echo "✅ Now in main repository: $(pwd)"
        echo ""
        echo "📦 Available packages:"
        ls packages/ 2>/dev/null || echo "   Run setup to initialize packages"
        echo ""
        echo "🔧 Next steps:"
        echo "   npm install       # Install dependencies"
        echo "   npm run dev       # Start development"
    fi
else
    echo ""
    echo "📚 Research Archive Contents:"
    echo "   - BUILDING CATHEDRALS/    → Move to main/infrastructure/"
    echo "   - research/               → Archive old, move useful to main/data/"
    echo "   - scattered files         → Organize by function to main repo"
    echo ""
    echo "🔄 Consolidation Process:"
    echo "   1. Check if component exists in main/packages/"
    echo "   2. Follow Trinity Architecture (Soul/Body/Spirit)"
    echo "   3. Use modular standards - standalone + integrated"
    echo "   4. Archive obsolete research files"
    echo ""
    echo "📖 Read REDIRECT_TO_MAIN.md for complete instructions"
fi