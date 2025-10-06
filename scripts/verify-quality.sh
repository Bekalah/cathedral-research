#!/bin/bash
# Museum-Quality Graphics Verification
# Prevents cartoon graphics and preserves sophisticated aesthetic

set -e

echo "🏛️ Verifying Museum-Quality Graphics for Cathedral Research..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Initialize verification status
VERIFICATION_PASSED=true
ISSUES_FOUND=()

# Function to add issue
add_issue() {
    ISSUES_FOUND+=("$1")
    VERIFICATION_PASSED=false
}

echo "🔍 Scanning for inappropriate cartoon-style elements..."

# Define patterns that indicate cartoon/low-quality graphics
CARTOON_PATTERNS=(
    "sparkle" "glitter" "bubble" "comic" "cutesy" "kawaii"
    "emoji-style" "cartoon" "childish" "toy-like" "pixel-art"
    "8-bit" "retro-game" "minecraft" "blocky" "square-ish"
    "cute-" "adorable" "chibi" "anime-eyes" "rainbow-sparkle"
)

# Scan build directories for inappropriate patterns
BUILD_DIRS=("apps/*/dist" "dist" "build")
for pattern in "${CARTOON_PATTERNS[@]}"; do
    for build_dir in "${BUILD_DIRS[@]}"; do
        if [[ -d $build_dir ]] && grep -ri "$pattern" "$build_dir" >/dev/null 2>&1; then
            add_issue "❌ Found inappropriate '$pattern' elements in $build_dir"
        fi
    done
done

echo "✅ Cartoon element scan complete"

echo "🎨 Verifying sophisticated color palette preservation..."

# Sophisticated color palette (from your actual CSS)
SOPHISTICATED_COLORS=(
    "#1a1a2e"  # Primary Obsidian
    "#16213e"  # Midnight
    "#e74c3c"  # Accent Crimson
    "#f39c12"  # Gold
    "#9b59b6"  # Purple
    "#2c3e50"  # Dark Slate
    "#34495e"  # Dark Blue Grey
)

COLOR_FOUND=false
for color in "${SOPHISTICATED_COLORS[@]}"; do
    if find . -name "*.css" -o -name "*.scss" -o -name "*.js" -o -name "*.tsx" -o -name "*.jsx" | xargs grep -l "$color" >/dev/null 2>&1; then
        COLOR_FOUND=true
        break
    fi
done

if [ "$COLOR_FOUND" = false ]; then
    add_issue "⚠️  Sophisticated color palette may be missing or overridden"
fi

echo "✅ Color palette verification complete"

echo "📚 Verifying Cinzel typography preservation..."

# Check for sophisticated typography
if ! find . -name "*.css" -o -name "*.scss" -o -name "*.js" -o -name "*.tsx" -o -name "*.jsx" | xargs grep -l "Cinzel\|serif" >/dev/null 2>&1; then
    add_issue "❌ Cinzel typography missing - museum quality compromised"
fi

echo "✅ Typography verification complete"

echo "🔮 Verifying Three.js shader quality..."

# Check for sophisticated Three.js materials
SHADER_PATTERNS=("MeshStandardMaterial" "ShaderMaterial" "mystical" "aura" "energy")
SHADER_FOUND=false

for pattern in "${SHADER_PATTERNS[@]}"; do
    if find packages/three-engine -name "*.ts" -o -name "*.js" | xargs grep -l "$pattern" >/dev/null 2>&1; then
        SHADER_FOUND=true
        break
    fi
done

if [ "$SHADER_FOUND" = false ]; then
    add_issue "⚠️  Advanced Three.js materials may be missing"
fi

echo "✅ Shader quality verification complete"

echo "🏗️ Verifying build quality..."

# Check if builds exist and are properly structured
REQUIRED_APPS=("cathedral-hub" "stone-grimoire" "arcanae-lab" "cathedral-of-circuits")
for app in "${REQUIRED_APPS[@]}"; do
    BUILD_PATH="apps/$app/dist"
    if [[ ! -d "$BUILD_PATH" ]]; then
        add_issue "❌ Missing build for $app at $BUILD_PATH"
    elif [[ ! -f "$BUILD_PATH/index.html" ]]; then
        add_issue "❌ Missing index.html for $app"
    fi
done

echo "✅ Build structure verification complete"

echo "📁 Verifying asset quality..."

# Check for high-quality assets
ASSET_DIRS=("assets/images" "assets/models" "assets/shaders" "public")
for asset_dir in "${ASSET_DIRS[@]}"; do
    if [[ -d "$asset_dir" ]]; then
        # Count high-quality image formats
        HIGH_QUALITY_COUNT=$(find "$asset_dir" -name "*.png" -o -name "*.jpg" -o -name "*.webp" -o -name "*.svg" | wc -l)
        if [[ $HIGH_QUALITY_COUNT -eq 0 ]]; then
            add_issue "⚠️  No high-quality images found in $asset_dir"
        fi
    fi
done

echo "✅ Asset quality verification complete"

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Report results
if [ "$VERIFICATION_PASSED" = true ]; then
    echo "🏛️ MUSEUM-QUALITY VERIFICATION PASSED"
    echo "✨ Sophisticated aesthetic preserved"
    echo "✨ No cartoon elements detected"
    echo "✨ Professional visual standards maintained"
    echo ""
    echo "Ready for deployment to bekalah.github.io"
    exit 0
else
    echo "❌ MUSEUM-QUALITY VERIFICATION FAILED"
    echo ""
    echo "Issues found:"
    for issue in "${ISSUES_FOUND[@]}"; do
        echo "   $issue"
    done
    echo ""
    echo "🔧 Please resolve these issues before deployment"
    echo "💡 Ensure sophisticated 'Game of Thrones meets Thierry Mugler' aesthetic is maintained"
    exit 1
fi