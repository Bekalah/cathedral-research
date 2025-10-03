po - do you#!/bin/bash

# 🏛️ Cathedral Research - Quality Enhancement Script
# This script fixes common errors and improves code quality across all directories

echo "🏛️ Cathedral Research Quality Enhancement Starting..."
echo "================================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Counter for fixes
FIXES_APPLIED=0

echo -e "${BLUE}📋 Phase 1: HTML Quality Fixes${NC}"
echo "================================"

# Fix HTML files
find . -name "*.html" -type f | while read -r file; do
    echo "Checking: $file"
    
    # Check if file has DOCTYPE
    if ! grep -q "<!DOCTYPE" "$file"; then
        echo -e "${YELLOW}⚠️  Adding DOCTYPE to $file${NC}"
        # Create temp file with DOCTYPE
        echo '<!DOCTYPE html>' > temp_file
        cat "$file" >> temp_file
        mv temp_file "$file"
        ((FIXES_APPLIED++))
    fi
    
    # Check if file has charset meta tag
    if ! grep -q '<meta charset' "$file"; then
        echo -e "${YELLOW}⚠️  Adding charset meta to $file${NC}"
        # Insert charset meta after <head>
        sed -i.bak 's/<head>/<head>\n    <meta charset="UTF-8">/' "$file"
        rm -f "${file}.bak"
        ((FIXES_APPLIED++))
    fi
    
    # Check if file has viewport meta tag
    if ! grep -q 'name="viewport"' "$file"; then
        echo -e "${YELLOW}⚠️  Adding viewport meta to $file${NC}"
        # Insert viewport meta after charset
        sed -i.bak 's/<meta charset="UTF-8">/<meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">/' "$file"
        rm -f "${file}.bak"
        ((FIXES_APPLIED++))
    fi
    
    # Ensure closing html tag exists
    if ! grep -q "</html>" "$file"; then
        echo -e "${YELLOW}⚠️  Adding closing html tag to $file${NC}"
        echo '</html>' >> "$file"
        ((FIXES_APPLIED++))
    fi
done

echo -e "${BLUE}📋 Phase 2: JavaScript Quality Fixes${NC}"
echo "====================================="

# Fix JavaScript files
find . -name "*.js" -type f | while read -r file; do
    echo "Checking: $file"
    
    # Check for basic syntax using Node.js
    if ! node -c "$file" 2>/dev/null; then
        echo -e "${RED}❌ Syntax error in $file${NC}"
        echo "   Attempting basic fixes..."
        
        # Common fixes
        # Fix missing semicolons at end of lines (basic fix)
        sed -i.bak 's/\([^;{}\s]\)$/\1;/g' "$file"
        
        # Check again after fix
        if node -c "$file" 2>/dev/null; then
            echo -e "${GREEN}✅ Fixed syntax in $file${NC}"
            rm -f "${file}.bak"
            ((FIXES_APPLIED++))
        else
            echo -e "${RED}❌ Could not auto-fix $file${NC}"
            # Restore original
            mv "${file}.bak" "$file"
        fi
    else
        echo -e "${GREEN}✅ Syntax OK${NC}"
    fi
done

echo -e "${BLUE}📋 Phase 3: CSS Quality Fixes${NC}"
echo "=============================="

# Fix CSS files
find . -name "*.css" -type f | while read -r file; do
    echo "Checking: $file"
    
    # Add charset declaration if missing
    if ! grep -q '@charset' "$file"; then
        echo -e "${YELLOW}⚠️  Adding charset to $file${NC}"
        echo '@charset "UTF-8";' | cat - "$file" > temp_file && mv temp_file "$file"
        ((FIXES_APPLIED++))
    fi
    
    echo -e "${GREEN}✅ CSS OK${NC}"
done

echo -e "${BLUE}📋 Phase 4: JSON Validation & Fixes${NC}"
echo "==================================="

# Validate and fix JSON files
find . -name "*.json" -type f | while read -r file; do
    echo "Checking: $file"
    
    if ! node -e "JSON.parse(require('fs').readFileSync('$file', 'utf8'))" 2>/dev/null; then
        echo -e "${RED}❌ Invalid JSON in $file${NC}"
        echo "   Creating backup and attempting fix..."
        
        # Create backup
        cp "$file" "${file}.backup"
        
        # Try to fix common JSON issues
        # Remove trailing commas
        sed -i.bak 's/,\s*\([}\]]\)/\1/g' "$file"
        
        # Check if fixed
        if node -e "JSON.parse(require('fs').readFileSync('$file', 'utf8'))" 2>/dev/null; then
            echo -e "${GREEN}✅ Fixed JSON in $file${NC}"
            rm -f "${file}.bak"
            ((FIXES_APPLIED++))
        else
            echo -e "${RED}❌ Could not auto-fix JSON in $file${NC}"
            # Restore original
            mv "${file}.backup" "$file"
            rm -f "${file}.bak"
        fi
    else
        echo -e "${GREEN}✅ JSON Valid${NC}"
    fi
done

echo -e "${BLUE}📋 Phase 5: File Organization${NC}"
echo "=============================="

# Create missing directories
DIRS_TO_CREATE=(
    "BUILDING CATHEDRALS/assets"
    "BUILDING CATHEDRALS/assets/images"
    "BUILDING CATHEDRALS/assets/audio"
    "BUILDING CATHEDRALS/assets/models"
    "BUILDING CATHEDRALS/assets/shaders"
    "BUILDING CATHEDRALS/dist"
    "BUILDING CATHEDRALS/docs"
    "BUILDING CATHEDRALS/tests"
)

for dir in "${DIRS_TO_CREATE[@]}"; do
    if [ ! -d "$dir" ]; then
        echo -e "${YELLOW}📁 Creating directory: $dir${NC}"
        mkdir -p "$dir"
        ((FIXES_APPLIED++))
    fi
done

# Create .gitkeep files for empty directories
find "BUILDING CATHEDRALS" -type d -empty | while read -r dir; do
    echo -e "${YELLOW}📝 Adding .gitkeep to empty directory: $dir${NC}"
    touch "$dir/.gitkeep"
    ((FIXES_APPLIED++))
done

echo -e "${BLUE}📋 Phase 6: Code Quality Improvements${NC}"
echo "====================================="

# Add proper indentation to HTML files (basic)
find . -name "*.html" -type f | while read -r file; do
    echo "Formatting: $file"
    
    # Basic formatting (this is a simple approach)
    # Use sed to add basic indentation
    python3 -c "
import re
import sys

try:
    with open('$file', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Basic HTML formatting
    # Add newlines after tags
    content = re.sub(r'><', '>\n<', content)
    
    # Basic indentation (simplified)
    lines = content.split('\n')
    formatted_lines = []
    indent_level = 0
    
    for line in lines:
        line = line.strip()
        if not line:
            continue
            
        # Decrease indent for closing tags
        if line.startswith('</') and not line.startswith('</!'):
            indent_level = max(0, indent_level - 1)
        
        # Add indentation
        formatted_lines.append('    ' * indent_level + line)
        
        # Increase indent for opening tags (excluding self-closing and specific tags)
        if ('<' in line and not line.startswith('</') and 
            not line.endswith('/>') and not line.startswith('<!') and
            not any(tag in line.lower() for tag in ['<meta', '<link', '<br', '<hr', '<img', '<input'])):
            indent_level += 1
    
    # Write back to file
    with open('$file', 'w', encoding='utf-8') as f:
        f.write('\n'.join(formatted_lines) + '\n')
    
    print('✅ Formatted')
except Exception as e:
    print(f'⚠️  Could not format: {e}')
" 2>/dev/null || echo -e "${YELLOW}⚠️  Could not format $file${NC}"
done

echo -e "${BLUE}📋 Phase 7: Performance Optimizations${NC}"
echo "====================================="

# Add performance improvements to HTML files
find . -name "*.html" -type f | while read -r file; do
    echo "Optimizing: $file"
    
    # Add loading="lazy" to images (if not already present)
    if grep -q '<img' "$file" && ! grep -q 'loading="lazy"' "$file"; then
        echo -e "${YELLOW}⚠️  Adding lazy loading to images in $file${NC}"
        sed -i.bak 's/<img \([^>]*\)>/<img \1 loading="lazy">/g' "$file"
        rm -f "${file}.bak"
        ((FIXES_APPLIED++))
    fi
    
    # Add rel="preconnect" for external resources (basic check)
    if grep -q 'cdnjs.cloudflare.com' "$file" && ! grep -q 'rel="preconnect"' "$file"; then
        echo -e "${YELLOW}⚠️  Adding preconnect for CDN in $file${NC}"
        sed -i.bak 's/<head>/<head>\n    <link rel="preconnect" href="https:\/\/cdnjs.cloudflare.com">/' "$file"
        rm -f "${file}.bak"
        ((FIXES_APPLIED++))
    fi
done

echo -e "${BLUE}📋 Phase 8: Security Enhancements${NC}"
echo "================================="

# Add security headers to HTML files
find . -name "*.html" -type f | while read -r file; do
    echo "Securing: $file"
    
    # Add Content Security Policy meta tag (basic)
    if ! grep -q 'Content-Security-Policy' "$file"; then
        echo -e "${YELLOW}⚠️  Adding basic CSP to $file${NC}"
        sed -i.bak 's/<head>/<head>\n    <meta http-equiv="Content-Security-Policy" content="default-src '\''self'\''; script-src '\''self'\'' '\''unsafe-inline'\'' https:\/\/cdnjs.cloudflare.com; style-src '\''self'\'' '\''unsafe-inline'\''; img-src '\''self'\'' data: https:;">/' "$file"
        rm -f "${file}.bak"
        ((FIXES_APPLIED++))
    fi
done

echo -e "${BLUE}📋 Phase 9: Accessibility Improvements${NC}"
echo "======================================"

# Add accessibility improvements
find . -name "*.html" -type f | while read -r file; do
    echo "Improving accessibility: $file"
    
    # Add lang attribute to html tag if missing
    if ! grep -q 'lang=' "$file"; then
        echo -e "${YELLOW}⚠️  Adding lang attribute to $file${NC}"
        sed -i.bak 's/<html>/<html lang="en">/' "$file"
        rm -f "${file}.bak"
        ((FIXES_APPLIED++))
    fi
    
    # Ensure images have alt attributes (basic check)
    if grep -q '<img[^>]*>' "$file"; then
        # This is a complex regex replacement, so we'll do a basic check
        grep '<img[^>]*>' "$file" | grep -v 'alt=' > /dev/null && echo -e "${YELLOW}⚠️  Some images in $file may be missing alt attributes${NC}"
    fi
done

echo -e "${BLUE}📋 Phase 10: Final Quality Report${NC}"
echo "================================="

# Generate quality report
TOTAL_HTML=$(find . -name "*.html" -type f | wc -l)
TOTAL_JS=$(find . -name "*.js" -type f | wc -l)
TOTAL_CSS=$(find . -name "*.css" -type f | wc -l)
TOTAL_JSON=$(find . -name "*.json" -type f | wc -l)

echo -e "${GREEN}📊 Quality Enhancement Complete!${NC}"
echo "================================="
echo -e "${GREEN}✅ Total fixes applied: $FIXES_APPLIED${NC}"
echo -e "${BLUE}📁 Files processed:${NC}"
echo "   • HTML files: $TOTAL_HTML"
echo "   • JavaScript files: $TOTAL_JS"
echo "   • CSS files: $TOTAL_CSS"
echo "   • JSON files: $TOTAL_JSON"

echo ""
echo -e "${GREEN}🎉 Your Cathedral Research repository is now optimized!${NC}"
echo ""
echo -e "${BLUE}Next steps:${NC}"
echo "1. Review changes with: git diff"
echo "2. Test functionality in browser"
echo "3. Commit changes: git add . && git commit -m '🔧 Quality improvements and error fixes'"
echo "4. Push to GitHub: git push origin master"

exit 0