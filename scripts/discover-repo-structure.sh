#!/bin/bash

# 🔗 BEKALAH REPOSITORY DISCOVERY & LINKING SCRIPT
# 
# This script helps discover all your repositories and creates proper linking strategy

echo "🔍 DISCOVERING BEKALAH REPOSITORY STRUCTURE"
echo "==========================================="
echo ""

# Check current repository
echo "📍 CURRENT REPOSITORY:"
echo "Repository: $(git config --get remote.origin.url)"
echo "Branch: $(git branch --show-current)"
echo "Status: $(git status --porcelain | wc -l) files changed"
echo ""

# Look for clues about other repositories in your files
echo "🔍 SEARCHING FOR REPOSITORY REFERENCES..."
echo ""

# Search for GitHub links in your files
echo "📋 GITHUB REFERENCES FOUND:"
grep -r "github.com/Bekalah" . --include="*.md" --include="*.json" --include="*.js" --include="*.ts" 2>/dev/null | head -20

echo ""
echo "📋 BEKALAH.GITHUB.IO REFERENCES:"
grep -r "bekalah.github.io" . --include="*.md" --include="*.json" --include="*.js" --include="*.ts" 2>/dev/null | head -20

echo ""
echo "📋 DEPLOYMENT REFERENCES:"
grep -r "deploy\|deployment" . --include="*.md" --include="*.json" --include="*.js" --include="*.ts" 2>/dev/null | grep -i bekalah | head -10

echo ""
echo "🎯 LIKELY REPOSITORY STRUCTURE BASED ON YOUR FILES:"
echo ""

# Check if there are references to other repos
if grep -r "stone-grimoire" . --include="*.md" >/dev/null 2>&1; then
    echo "  📚 Stone Grimoire - Likely separate repo or integrated here"
fi

if grep -r "cathedral-of-circuits" . --include="*.md" >/dev/null 2>&1; then
    echo "  🏛️ Cathedral of Circuits - Likely separate repo or integrated here"
fi

if grep -r "bekalah.github.io" . --include="*.md" >/dev/null 2>&1; then
    echo "  🌐 bekalah.github.io - User/organization site (should be separate repo)"
fi

echo ""
echo "💡 RECOMMENDATION BASED ON GITHUB PAGES BEST PRACTICES:"
echo ""
echo "For bekalah.github.io (root domain), you need:"
echo "  📦 Repository: Bekalah/bekalah.github.io"
echo "  🌐 URL: https://bekalah.github.io/"
echo "  📁 Content: Your main portfolio/hub"
echo ""
echo "For project sites, you can keep:"
echo "  📦 Repository: Bekalah/cathedral-research"  
echo "  🌐 URL: https://bekalah.github.io/cathedral-research/"
echo "  📁 Content: This sophisticated project"
echo ""
echo "🎯 NEXT STEPS:"
echo "1. Create/update Bekalah/bekalah.github.io for root domain"
echo "2. Link cathedral-research as project site or move content"
echo "3. Organize other repos to link properly"
echo ""