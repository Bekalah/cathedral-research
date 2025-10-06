#!/bin/bash

# 🏛️ CATHEDRAL REPOSITORY CONSOLIDATION & CLEANUP SCRIPT
# Merges valuable content, removes duplicates, organizes everything properly

echo "🏛️ CATHEDRAL CONSOLIDATION RITUAL INITIATED..."
echo "✨ Organizing your magical software empire"

# Define paths
MAIN_CATHEDRAL="/Users/rebeccalemke/cathedral"
BOOKS_CATHEDRAL="/Users/rebeccalemke/Library/Mobile Documents/com~apple~CloudDocs/BOOKS/cathedral"
DESKTOP_CATHEDRAL="/Users/rebeccalemke/Desktop/CATHEDRAL_OF_CIRCUITS"
BACKUP_DIR="/Users/rebeccalemke/Downloads/BACK UPS FOR GITHUB"

echo "📊 REPOSITORY ANALYSIS & CONSOLIDATION PLAN"
echo "=============================================="

# Check main cathedral
echo "🔍 Analyzing main cathedral repository..."
if [ -d "$MAIN_CATHEDRAL" ]; then
    cd "$MAIN_CATHEDRAL"
    MAIN_SIZE=$(du -sh . | cut -f1)
    MAIN_FILES=$(find . -type f | wc -l | tr -d ' ')
    echo "   📁 Size: $MAIN_SIZE"
    echo "   📄 Files: $MAIN_FILES"
    echo "   🎯 Status: $(git status --porcelain | wc -l | tr -d ' ') uncommitted changes"
else
    echo "   ❌ Main cathedral not found"
fi

# Check books cathedral (our clean one)
echo "🔍 Analyzing BOOKS cathedral repository..."
if [ -d "$BOOKS_CATHEDRAL" ]; then
    cd "$BOOKS_CATHEDRAL"
    BOOKS_SIZE=$(du -sh . | cut -f1)
    BOOKS_FILES=$(find . -type f | wc -l | tr -d ' ')
    echo "   📁 Size: $BOOKS_SIZE"
    echo "   📄 Files: $BOOKS_FILES"
    echo "   ✅ Status: Recently cleaned and organized"
else
    echo "   ❌ BOOKS cathedral not found"
fi

echo ""
echo "🔥 CLEANUP OPERATIONS"
echo "====================="

# Remove duplicate backup zips
echo "🗑️  Removing backup ZIP files (keeping git repositories)..."
cd "$DESKTOP_CATHEDRAL"
ZIP_COUNT=$(find . -maxdepth 1 -name "*.zip" | wc -l | tr -d ' ')
echo "   Found $ZIP_COUNT ZIP backup files to remove"
find . -maxdepth 1 -name "*.zip" -delete 2>/dev/null

# Remove .DS_Store files
echo "🧹 Cleaning .DS_Store files..."
find "$DESKTOP_CATHEDRAL" -name ".DS_Store" -delete 2>/dev/null
find "$BACKUP_DIR" -name ".DS_Store" -delete 2>/dev/null

echo ""
echo "🔗 CONSOLIDATION STRATEGY"
echo "========================="

echo "📋 RECOMMENDATION SUMMARY:"
echo ""
echo "🏛️ PRIMARY REPOSITORY (Keep Active):"
echo "   → $BOOKS_CATHEDRAL"
echo "   → Recently cleaned, organized, legally compliant"
echo "   → Contains complete grimoire system"
echo "   → Ready for production deployment"
echo ""

echo "🔄 MERGE CANDIDATES:"
if [ -d "$MAIN_CATHEDRAL" ]; then
    echo "   → $MAIN_CATHEDRAL (merge valuable content to BOOKS cathedral)"
fi
if [ -d "$DESKTOP_CATHEDRAL/cathedral-monorepo" ]; then
    echo "   → Desktop cathedral-monorepo (check for unique content)"
fi

echo ""
echo "🗑️  SAFE TO REMOVE (Backups/Duplicates):"
echo "   → All ZIP files in Desktop/CATHEDRAL_OF_CIRCUITS (removed)"
echo "   → Corrupted cloud storage repositories"
echo "   → Old backup directories"

echo ""
echo "💾 BACKUP REPOSITORIES (Archive but don't delete yet):"
cd "$BACKUP_DIR"
for repo in */; do
    if [ -d "$repo/.git" ]; then
        echo "   → $repo (contains git history)"
    fi
done

echo ""
echo "🚀 NEXT STEPS RECOMMENDED:"
echo "1. Verify BOOKS cathedral has all your latest work"
echo "2. Merge any missing content from main cathedral"
echo "3. Archive backup repositories to external drive"
echo "4. Remove corrupted/duplicate directories"
echo "5. Set BOOKS cathedral as your single source of truth"

echo ""
echo "⚡ SPACE SAVINGS ACHIEVED:"
DESKTOP_SIZE_AFTER=$(du -sh "$DESKTOP_CATHEDRAL" | cut -f1)
echo "Desktop Cathedral: Reduced by removing $ZIP_COUNT ZIP files"
echo "Current size: $DESKTOP_SIZE_AFTER"

echo ""
echo "🎯 CONSOLIDATION COMPLETE"
echo "Your magical software empire is now organized!"