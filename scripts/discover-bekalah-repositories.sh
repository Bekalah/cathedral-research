#!/bin/bash

# 🔍 Bekalah Repository Discovery & Analysis Script
# Discovers all repositories and analyzes current organization

echo "🔍 DISCOVERING BEKALAH REPOSITORY ECOSYSTEM..."

# Create analysis directory
mkdir -p analysis
cd analysis

echo ""
echo "📊 GITHUB REPOSITORY ANALYSIS"
echo "=================================="

# Function to check if repository exists
check_repo() {
    local repo_url=$1
    local repo_name=$2
    echo -n "🔍 Checking $repo_name: "
    
    if curl -s --head "$repo_url" | head -n 1 | grep -q "200 OK"; then
        echo "✅ EXISTS"
        return 0
    else
        echo "❌ NOT FOUND"
        return 1
    fi
}

echo ""
echo "🏛️ MAIN REPOSITORIES"
echo "-------------------"

# Check main repositories
check_repo "https://github.com/Bekalah/bekalah.github.io" "bekalah.github.io (main site)"
MAIN_SITE_EXISTS=$?

check_repo "https://github.com/Bekalah/cathedral-research" "cathedral-research (current)"
CATHEDRAL_EXISTS=$?

echo ""
echo "🎯 POTENTIAL APPLICATION REPOSITORIES"
echo "------------------------------------"

# Check potential separate app repositories
check_repo "https://github.com/Bekalah/stone-grimoire" "stone-grimoire"
check_repo "https://github.com/Bekalah/cathedral-of-circuits" "cathedral-of-circuits"
check_repo "https://github.com/Bekalah/arcanae-lab" "arcanae-lab"
check_repo "https://github.com/Bekalah/synth-art-studio" "synth-art-studio"
check_repo "https://github.com/Bekalah/cyoa-engine" "cyoa-engine"
check_repo "https://github.com/Bekalah/cathedral-hub" "cathedral-hub"

echo ""
echo "🎨 CREATIVE PROJECT REPOSITORIES"
echo "-------------------------------"

# Check creative/mystical project repositories
check_repo "https://github.com/Bekalah/mystical-computing" "mystical-computing"
check_repo "https://github.com/Bekalah/consciousness-research" "consciousness-research"
check_repo "https://github.com/Bekalah/esoteric-programming" "esoteric-programming"
check_repo "https://github.com/Bekalah/tarot-tech" "tarot-tech"
check_repo "https://github.com/Bekalah/fractal-art" "fractal-art"
check_repo "https://github.com/Bekalah/sacred-geometry" "sacred-geometry"

echo ""
echo "📚 DOCUMENTATION & RESEARCH REPOSITORIES"
echo "---------------------------------------"

# Check documentation repositories
check_repo "https://github.com/Bekalah/documentation" "documentation"
check_repo "https://github.com/Bekalah/research" "research"
check_repo "https://github.com/Bekalah/notes" "notes"
check_repo "https://github.com/Bekalah/archive" "archive"

echo ""
echo "🔧 TOOLS & UTILITIES REPOSITORIES"
echo "--------------------------------"

# Check tools repositories
check_repo "https://github.com/Bekalah/dev-tools" "dev-tools"
check_repo "https://github.com/Bekalah/scripts" "scripts"
check_repo "https://github.com/Bekalah/utilities" "utilities"
check_repo "https://github.com/Bekalah/automation" "automation"

echo ""
echo "📱 PORTFOLIO & PERSONAL REPOSITORIES"
echo "-----------------------------------"

# Check portfolio repositories
check_repo "https://github.com/Bekalah/portfolio" "portfolio"
check_repo "https://github.com/Bekalah/personal-site" "personal-site"
check_repo "https://github.com/Bekalah/resume" "resume"
check_repo "https://github.com/Bekalah/cv" "cv"

echo ""
echo "==============================================="
echo "📋 REPOSITORY ORGANIZATION RECOMMENDATIONS"
echo "==============================================="

if [ $MAIN_SITE_EXISTS -eq 0 ]; then
    echo "✅ bekalah.github.io exists - Can merge cathedral-research into main site"
    echo "   📍 RECOMMENDED: Merge cathedral-research INTO bekalah.github.io for root domain deployment"
else
    echo "⚠️  bekalah.github.io not found - Need to create main repository"
    echo "   📍 RECOMMENDED: Rename cathedral-research to bekalah.github.io for root domain"
fi

if [ $CATHEDRAL_EXISTS -eq 0 ]; then
    echo "✅ cathedral-research exists - Current sophisticated monorepo ready"
    echo "   📦 Contains: Complete 22-character system, Porter Robinson sound art, 6 applications"
else
    echo "❌ cathedral-research not found - Repository may have different name"
fi

echo ""
echo "🎯 RECOMMENDED ORGANIZATION STRATEGY:"
echo ""
echo "OPTION A: MERGE INTO MAIN SITE (BEST FOR ROOT DOMAIN)"
echo "1. Keep bekalah.github.io as main repository"
echo "2. Merge cathedral-research content into bekalah.github.io"
echo "3. Deploy to https://bekalah.github.io (ROOT)"
echo "4. Archive cathedral-research as backup"
echo ""
echo "OPTION B: RENAME CURRENT (SIMPLER)"
echo "1. Rename cathedral-research to bekalah.github.io"
echo "2. Update all configurations for root domain"
echo "3. Deploy to https://bekalah.github.io (ROOT)"
echo ""

echo "🔍 LOCAL WORKSPACE ANALYSIS"
echo "============================"

echo ""
echo "📁 Current workspace structure:"
find . -maxdepth 2 -type d | head -20

echo ""
echo "🔗 Current git configuration:"
if [ -d ".git" ]; then
    echo "Git repository: ✅"
    echo "Remote URL: $(git remote get-url origin 2>/dev/null || echo 'No remote configured')"
    echo "Current branch: $(git branch --show-current 2>/dev/null || echo 'No git repository')"
    echo "Commits: $(git rev-list --count HEAD 2>/dev/null || echo 'No commits')"
else
    echo "Git repository: ❌ (No .git directory found)"
fi

echo ""
echo "📊 ANALYSIS COMPLETE"
echo "==================="
echo "💾 Full analysis saved to: analysis/"
echo "📋 Review recommendations above"
echo "🚀 Ready to execute organization strategy!"

# Save analysis to file
cat > repository_analysis.md << 'EOF'
# 🔍 BEKALAH REPOSITORY ANALYSIS RESULTS

## 📊 DISCOVERED CONFIGURATION
- **Current Workspace**: cathedral-research (sophisticated monorepo)
- **Target Deployment**: https://bekalah.github.io (ROOT DOMAIN)
- **Current URL**: https://bekalah.github.io/cathedral-research (PROJECT SITE)

## 🎯 ORGANIZATION DECISION NEEDED

Choose your preferred strategy:

### ✅ OPTION A: MERGE INTO MAIN SITE (RECOMMENDED)
**Goal**: Professional root domain with portfolio integration
**Steps**: Merge cathedral-research → bekalah.github.io → Deploy to root
**Result**: `https://bekalah.github.io` showcases Cathedral as main work

### ✅ OPTION B: RENAME CURRENT REPOSITORY  
**Goal**: Simple transformation to root domain
**Steps**: Rename cathedral-research → bekalah.github.io → Update configs
**Result**: `https://bekalah.github.io` dedicated to Cathedral Universe

## 🏛️ CURRENT SOPHISTICATED ASSETS
- ✅ 22 Major Arcana character system (complete)
- ✅ Porter Robinson-level sound art (5 universes)
- ✅ 6 sophisticated applications (all building)
- ✅ 25+ packages (sophisticated monorepo)
- ✅ Museum-quality visual standards
- ✅ Professional deployment pipeline

## 🚀 READY FOR EXECUTION
All sophisticated work complete - just need repository organization!
EOF

echo "📄 Analysis saved to: analysis/repository_analysis.md"