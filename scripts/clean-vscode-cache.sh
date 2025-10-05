#!/bin/bash
# VS Code Cache Cleaning Script for Cathedral Research
# Run this weekly or whenever VS Code starts freezing/showing phantom errors

echo "🧹 Cathedral Research - VS Code Cache Cleaner"
echo "=============================================="
date

# Kill VS Code processes
echo "1. Killing VS Code processes..."
pkill "Visual Studio Code" 2>/dev/null || echo "   No VS Code processes running"
pkill "Code Helper" 2>/dev/null || echo "   No Code Helper processes"
sleep 2

# Clear TypeScript caches
echo "2. Clearing TypeScript caches..."
rm -rf ~/Library/Caches/typescript* 2>/dev/null && echo "   ✅ TypeScript caches cleared" || echo "   No TypeScript caches found"
rm -rf ~/Library/Caches/com.microsoft.VSCode* 2>/dev/null && echo "   ✅ VS Code caches cleared" || echo "   No VS Code caches found"

# Clear project-specific caches
echo "3. Clearing project caches..."
cd "$(dirname "$0")/.." || exit 1
rm -rf node_modules/.vite 2>/dev/null && echo "   ✅ Vite cache cleared" || echo "   No Vite cache"
rm -rf node_modules/.cache 2>/dev/null && echo "   ✅ Node cache cleared" || echo "   No Node cache"
rm -rf .next 2>/dev/null && echo "   ✅ Next.js cache cleared" || echo "   No Next.js cache"
rm -rf dist 2>/dev/null && echo "   ✅ Dist folder cleared" || echo "   No dist folder"
rm -rf .vscode/settings.json 2>/dev/null && echo "   ✅ VS Code workspace settings cleared" || echo "   No workspace settings"

# Clear any phantom file references
echo "4. Checking for phantom files..."
if [ -d "packages/labs/audio" ]; then
    echo "   ⚠️  Found phantom audio directory - removing..."
    rm -rf packages/labs/audio
    echo "   ✅ Phantom directory removed"
else
    echo "   ✅ No phantom directories found"
fi

# Create a clean tsconfig trigger
echo "5. Refreshing TypeScript configuration..."
touch tsconfig.json
echo "   ✅ TypeScript config refreshed"

echo ""
echo "🎉 Cache cleaning complete!"
echo "💡 Now restart VS Code: open -a 'Visual Studio Code' ."
echo "⏰ Run this script weekly or when VS Code starts acting up"
echo ""