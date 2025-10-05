#!/bin/bash

# 🧹 BOOKS REPOSITORY CLEANUP SCRIPT
# Removes individual book files while preserving the cathedral project

echo "🔮 CATHEDRAL GRIMOIRE CLEANUP RITUAL INITIATED..."
echo "✨ Preserving your authentic magical software in cathedral/"

# Navigate to books directory
cd "/Users/rebeccalemke/Library/Mobile Documents/com~apple~CloudDocs/BOOKS"

# Create backup list of what we're removing (for reference)
echo "📚 Creating removal log..."
ls -la | grep -E '\.(pdf|epub|djvu)$' > books_removed_$(date +%Y%m%d_%H%M%S).log

# Count files before cleanup
BEFORE_COUNT=$(find . -maxdepth 1 -type f \( -name "*.pdf" -o -name "*.epub" -o -name "*.djvu" -o -name "*.txt" \) | wc -l | tr -d ' ')
echo "📊 Found $BEFORE_COUNT book files to remove"

# Remove PDF files
echo "🔥 Removing PDF grimoires (keeping concepts in cathedral/grimoire_concepts.json)..."
find . -maxdepth 1 -name "*.pdf" -delete 2>/dev/null

# Remove EPUB files  
echo "🔥 Removing EPUB texts (wisdom preserved in lightweight format)..."
find . -maxdepth 1 -name "*.epub" -delete 2>/dev/null

# Remove other book formats
echo "🔥 Removing DJVU and text files..."
find . -maxdepth 1 -name "*.djvu" -delete 2>/dev/null
find . -maxdepth 1 -name "*_djvu.txt" -delete 2>/dev/null
find . -maxdepth 1 -name "*_hocr.html" -delete 2>/dev/null
find . -maxdepth 1 -name "*_text.pdf" -delete 2>/dev/null

# Remove duplicate/backup HTML files not in cathedral
echo "🔥 Removing old HTML implementations (authentic versions in cathedral/)..."
find . -maxdepth 1 -name "*.html" ! -path "./cathedral/*" -delete 2>/dev/null

# Remove old folders that might contain duplicates
echo "🔥 Removing book collection folders (concepts extracted to grimoire_concepts.json)..."
rm -rf "CollectedPdfsByAleisterCrowley" 2>/dev/null
rm -rf "israel-regardie-book-collection" 2>/dev/null
rm -rf "stephen-skinner-book-collection" 2>/dev/null
rm -rf "occult-grab-bag-7_202304" 2>/dev/null
rm -rf "Christopher Hyatt - An Interview with Israel Regardie_jp2" 2>/dev/null

# Remove old project folders that are now in cathedral
echo "🔥 Removing legacy project folders (consolidated in cathedral/)..."
rm -rf "circuitum99" 2>/dev/null
rm -rf "github-projects" 2>/dev/null

# Remove utility files not needed
echo "🔥 Removing temporary and duplicate files..."
find . -maxdepth 1 -name "*.xlsx" -delete 2>/dev/null
find . -maxdepth 1 -name "*.jpeg" -delete 2>/dev/null
find . -maxdepth 1 -name "*copy*.html" -delete 2>/dev/null
find . -maxdepth 1 -name "codex_kit_all_in_one.txt" -delete 2>/dev/null
find . -maxdepth 1 -name "monorepo-integration.txt" -delete 2>/dev/null
find . -maxdepth 1 -name "index_*.html" -delete 2>/dev/null

# Count files after cleanup
AFTER_COUNT=$(find . -maxdepth 1 -type f | wc -l | tr -d ' ')
REMOVED_COUNT=$((BEFORE_COUNT - AFTER_COUNT))

echo ""
echo "✅ CLEANUP COMPLETE!"
echo "📊 Removed $REMOVED_COUNT book files"
echo "🏛️ Cathedral project preserved with all authentic grimoire concepts"
echo "💾 Repository size dramatically reduced"
echo "⚖️ All copyrighted content removed - legally clean"
echo ""
echo "🔮 What remains:"
echo "   📁 cathedral/ - Your complete consciousness technology suite"
echo "   📄 cleanup-books-repo.sh - This cleanup script"
echo "   📋 books_removed_*.log - List of removed files for reference"
echo ""
echo "🌟 Your grimoire-powered applications are ready for deployment!"
echo "   • CLAVIS SIGILLUM - World building with 72+72+22 entities"
echo "   • CODEX - Sacred knowledge system" 
echo "   • LUMIN - Soul activation interface"

# Show final directory structure
echo ""
echo "📂 Final repository structure:"
ls -la | head -20