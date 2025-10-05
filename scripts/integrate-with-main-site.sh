#!/bin/bash

# 🏛️ Cathedral Research Integration Script
# This script helps integrate the Cathedral Research monorepo with your main bekalah.github.io site

set -e

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Configuration
MAIN_REPO="bekalah.github.io"
CATHEDRAL_REPO="cathedral-research"
INTEGRATION_BRANCH="cathedral-integration"

# Print colored output
print_header() {
    echo -e "${PURPLE}🏛️ ============================================${NC}"
    echo -e "${PURPLE}   Cathedral Research Integration Script${NC}"
    echo -e "${PURPLE}============================================${NC}"
}

print_step() {
    echo -e "${BLUE}🔧 $1${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️ $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_info() {
    echo -e "${CYAN}ℹ️ $1${NC}"
}

# Check if we're in the right directory
check_environment() {
    print_step "Checking environment..."
    
    if [ ! -f "package.json" ] || [ ! -d "apps" ] || [ ! -d "packages" ]; then
        print_error "This doesn't appear to be the Cathedral Research monorepo directory."
        print_info "Please run this script from the root of your Cathedral Research project."
        exit 1
    fi
    
    # Check if git is available
    if ! command -v git &> /dev/null; then
        print_error "Git is not installed or not in PATH."
        exit 1
    fi
    
    # Check if node/npm is available
    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed or not in PATH."
        exit 1
    fi
    
    print_success "Environment checks passed"
}

# Backup current state
create_backup() {
    print_step "Creating backup of current state..."
    
    BACKUP_DIR="../cathedral-backup-$(date +%Y%m%d_%H%M%S)"
    cp -r . "$BACKUP_DIR"
    
    print_success "Backup created at: $BACKUP_DIR"
}

# Prepare the cathedral research for integration
prepare_cathedral() {
    print_step "Preparing Cathedral Research for integration..."
    
    # Ensure we're on master/main branch
    git checkout master 2>/dev/null || git checkout main 2>/dev/null || {
        print_error "Could not switch to master or main branch"
        exit 1
    }
    
    # Pull latest changes
    git pull origin $(git branch --show-current)
    
    # Run protect check
    if [ -f "devops/protect-check.js" ]; then
        print_step "Running DevOps protect check..."
        node devops/protect-check.js
    fi
    
    # Build all applications
    print_step "Building all applications..."
    npm install
    
    # Build each app individually
    for app in apps/*/; do
        if [ -d "$app" ] && [ -f "$app/package.json" ]; then
            app_name=$(basename "$app")
            print_step "Building $app_name..."
            cd "$app"
            npm install
            if grep -q '"build"' package.json; then
                npm run build || print_warning "Build failed for $app_name"
            fi
            cd ../..
        fi
    done
    
    print_success "Cathedral Research prepared"
}

# Clone or update main repository
setup_main_repo() {
    print_step "Setting up main repository connection..."
    
    MAIN_REPO_DIR="../$MAIN_REPO"
    
    if [ ! -d "$MAIN_REPO_DIR" ]; then
        print_step "Cloning main repository..."
        cd ..
        git clone "https://github.com/bekalah/$MAIN_REPO.git"
        cd "$CATHEDRAL_REPO"
    else
        print_step "Updating main repository..."
        cd "$MAIN_REPO_DIR"
        git pull origin main
        cd "../$CATHEDRAL_REPO"
    fi
    
    print_success "Main repository ready"
}

# Integration methods
integrate_with_submodule() {
    print_step "Integrating using Git submodule method..."
    
    cd "../$MAIN_REPO"
    
    # Add cathedral research as a submodule
    if [ ! -d "cathedral-research" ]; then
        git submodule add "https://github.com/bekalah/cathedral-research.git" cathedral-research
    else
        print_info "Submodule already exists, updating..."
        git submodule update --remote cathedral-research
    fi
    
    # Create integration configuration
    cat > cathedral-integration.json << 'EOF'
{
  "name": "Cathedral Research Integration",
  "type": "submodule",
  "source": "cathedral-research",
  "routes": {
    "/cathedral": "./cathedral-research/dist",
    "/apps": "./cathedral-research/dist/apps",
    "/research": "./cathedral-research/dist"
  },
  "deployments": {
    "github-pages": {
      "enabled": true,
      "baseUrl": "/cathedral-research"
    },
    "cloudflare": {
      "enabled": true,
      "domain": "cathedral.bekalah.com"
    },
    "azure": {
      "enabled": true,
      "domain": "research.bekalah.com"
    }
  }
}
EOF
    
    # Update .gitmodules with latest commit
    git add .gitmodules cathedral-research cathedral-integration.json
    git commit -m "🏛️ Add Cathedral Research as submodule with integration config"
    
    cd "../$CATHEDRAL_REPO"
    print_success "Submodule integration completed"
}

integrate_with_subtree() {
    print_step "Integrating using Git subtree method..."
    
    cd "../$MAIN_REPO"
    
    # Add cathedral research as a subtree
    if [ ! -d "cathedral-research" ]; then
        git subtree add --prefix=cathedral-research "https://github.com/bekalah/cathedral-research.git" master --squash
    else
        print_info "Subtree already exists, updating..."
        git subtree pull --prefix=cathedral-research "https://github.com/bekalah/cathedral-research.git" master --squash
    fi
    
    cd "../$CATHEDRAL_REPO"
    print_success "Subtree integration completed"
}

# Update main site navigation
update_main_navigation() {
    print_step "Updating main site navigation..."
    
    cd "../$MAIN_REPO"
    
    # Create or update navigation integration
    cat > _includes/cathedral-nav.html << 'EOF'
<!-- Cathedral Research Navigation Integration -->
<nav class="cathedral-navigation" aria-label="Cathedral Research">
  <div class="nav-section">
    <h3>🏛️ Cathedral Research</h3>
    <ul>
      <li><a href="/cathedral-research/apps/cathedral-hub/">Cathedral Hub</a></li>
      <li><a href="/cathedral-research/apps/stone-grimoire/">Stone Grimoire</a></li>
      <li><a href="/cathedral-research/apps/circuitum99/">Circuitum99</a></li>
      <li><a href="/cathedral-research/apps/arcanae-lab/">Arcanae Lab</a></li>
      <li><a href="/cathedral-research/apps/magical-mystery-house/">Magical Mystery House</a></li>
    </ul>
  </div>
  <div class="nav-section">
    <h4>Research Tools</h4>
    <ul>
      <li><a href="/cathedral-research/registry/apps.json">App Registry</a></li>
      <li><a href="/cathedral-research/packages/">Packages</a></li>
      <li><a href="/cathedral-research/research/">Research Data</a></li>
    </ul>
  </div>
</nav>

<style>
.cathedral-navigation {
  background: linear-gradient(135deg, #1a1240, #0a0a0f);
  border-radius: 0.5rem;
  padding: 1rem;
  margin: 1rem 0;
  color: white;
}

.cathedral-navigation h3, .cathedral-navigation h4 {
  color: #8B5CF6;
  margin-bottom: 0.5rem;
}

.cathedral-navigation ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.cathedral-navigation li {
  margin: 0.25rem 0;
}

.cathedral-navigation a {
  color: #E5E7EB;
  text-decoration: none;
  display: flex;
  align-items: center;
  padding: 0.25rem 0;
  transition: color 0.2s ease;
}

.cathedral-navigation a:hover {
  color: #8B5CF6;
}

.nav-section {
  margin-bottom: 1rem;
}

.nav-section:last-child {
  margin-bottom: 0;
}
</style>
EOF
    
    # Update _config.yml if it exists
    if [ -f "_config.yml" ]; then
        print_step "Updating Jekyll configuration..."
        
        # Add cathedral research plugins and includes
        if ! grep -q "cathedral-research" "_config.yml"; then
            cat >> _config.yml << 'EOF'

# Cathedral Research Integration
plugins:
  - jekyll-redirect-from

cathedral_research:
  enabled: true
  base_url: "/cathedral-research"
  apps:
    - name: "Cathedral Hub"
      path: "/apps/cathedral-hub/"
      description: "Central navigation portal"
    - name: "Stone Grimoire"
      path: "/apps/stone-grimoire/"
      description: "Interactive grimoire system"
    - name: "Circuitum99"
      path: "/apps/circuitum99/"
      description: "Circuit visualization"
    - name: "Arcanae Lab"
      path: "/apps/arcanae-lab/"
      description: "Arcane research lab"
    - name: "Magical Mystery House"
      path: "/apps/magical-mystery-house/"
      description: "Mystery exploration"

# Include cathedral research in collections
collections:
  cathedral_apps:
    output: true
    permalink: /cathedral/:name/
EOF
        fi
    fi
    
    cd "../$CATHEDRAL_REPO"
    print_success "Main site navigation updated"
}

# Setup GitHub Actions for integrated deployment
setup_integrated_actions() {
    print_step "Setting up integrated GitHub Actions..."
    
    cd "../$MAIN_REPO"
    
    mkdir -p .github/workflows
    
    cat > .github/workflows/deploy-with-cathedral.yml << 'EOF'
name: 🚀 Deploy Main Site with Cathedral Research

on:
  push:
    branches: [main, master]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build-and-deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    
    steps:
    - name: 📥 Checkout
      uses: actions/checkout@v4
      with:
        submodules: recursive
        fetch-depth: 0

    - name: 🔧 Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '20'
        cache: 'npm'

    - name: 🏗️ Build Cathedral Research
      run: |
        if [ -d "cathedral-research" ]; then
          echo "Building Cathedral Research applications..."
          cd cathedral-research
          npm install
          
          # Build each app
          for app in apps/*/; do
            if [ -d "$app" ] && [ -f "$app/package.json" ]; then
              app_name=$(basename "$app")
              echo "Building $app_name..."
              cd "$app"
              npm install
              if grep -q '"build"' package.json; then
                npm run build
              fi
              cd ../..
            fi
          done
          
          cd ..
        fi

    - name: 🔧 Setup Ruby
      uses: ruby/setup-ruby@v1
      with:
        ruby-version: '3.1'
        bundler-cache: true

    - name: 🏗️ Build Jekyll Site
      run: |
        bundle exec jekyll build
        
        # Copy cathedral research if it exists
        if [ -d "cathedral-research/dist" ]; then
          mkdir -p _site/cathedral-research
          cp -r cathedral-research/dist/* _site/cathedral-research/
        fi

    - name: 📄 Setup Pages
      uses: actions/configure-pages@v4

    - name: 📤 Upload artifact
      uses: actions/upload-pages-artifact@v3
      with:
        path: '_site'

    - name: 🚀 Deploy to GitHub Pages
      id: deployment
      uses: actions/deploy-pages@v4
EOF
    
    cd "../$CATHEDRAL_REPO"
    print_success "Integrated GitHub Actions setup completed"
}

# Setup Cloudflare integration
setup_cloudflare_integration() {
    print_step "Setting up Cloudflare integration..."
    
    cd "../$MAIN_REPO"
    
    # Create Cloudflare Pages configuration
    cat > wrangler.toml << 'EOF'
name = "bekalah-portfolio"
main = "src/index.js"
compatibility_date = "2024-01-15"

[site]
bucket = "./"

[[redirects]]
from = "/cathedral/*"
to = "/cathedral-research/:splat"
status = 301

[[redirects]]
from = "/research/*"
to = "/cathedral-research/:splat"
status = 301

[[headers]]
for = "/cathedral-research/*"
[headers.values]
"X-Content-Type-Options" = "nosniff"
"X-Frame-Options" = "DENY"
"X-XSS-Protection" = "1; mode=block"
"Referrer-Policy" = "strict-origin-when-cross-origin"
"Content-Security-Policy" = "default-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdnjs.cloudflare.com https://unpkg.com data: blob:; img-src 'self' data: blob: https:; media-src 'self' data: blob:;"

[[headers]]
for = "/cathedral-research/apps/*"
[headers.values]
"Cache-Control" = "public, max-age=86400, must-revalidate"

[env.production.vars]
CATHEDRAL_RESEARCH_ENABLED = "true"
CATHEDRAL_BASE_URL = "https://bekalah.com/cathedral-research"
EOF
    
    cd "../$CATHEDRAL_REPO"
    print_success "Cloudflare integration setup completed"
}

# Main integration function
perform_integration() {
    print_header
    
    echo "Choose integration method:"
    echo "1) Git Submodule (recommended for separate development)"
    echo "2) Git Subtree (for merged development)"
    echo "3) Both methods"
    echo "4) Skip integration setup"
    
    read -p "Enter your choice (1-4): " integration_choice
    
    case $integration_choice in
        1)
            integrate_with_submodule
            ;;
        2)
            integrate_with_subtree
            ;;
        3)
            integrate_with_submodule
            integrate_with_subtree
            ;;
        4)
            print_info "Skipping integration setup"
            ;;
        *)
            print_error "Invalid choice"
            exit 1
            ;;
    esac
}

# Setup deployment secrets reminder
print_secrets_reminder() {
    print_header
    echo -e "${YELLOW}🔑 IMPORTANT: Deployment Secrets Setup${NC}"
    echo ""
    echo "To enable multi-platform deployment, you need to add these secrets to your GitHub repository:"
    echo ""
    echo "🌐 For Cloudflare Pages:"
    echo "   - CLOUDFLARE_API_TOKEN: Your Cloudflare API token"
    echo "   - CLOUDFLARE_ACCOUNT_ID: Your Cloudflare account ID"
    echo ""
    echo "☁️ For Azure Static Web Apps:"
    echo "   - AZURE_STATIC_WEB_APPS_API_TOKEN: Your Azure deployment token"
    echo ""
    echo "📝 To add these secrets:"
    echo "   1. Go to your GitHub repository settings"
    echo "   2. Navigate to 'Secrets and variables' > 'Actions'"
    echo "   3. Click 'New repository secret'"
    echo "   4. Add each secret with the exact names above"
    echo ""
    echo "🔗 Domain Setup:"
    echo "   - Add CNAME records for cathedral.bekalah.com and research.bekalah.com"
    echo "   - Point them to your Cloudflare/Azure deployment URLs"
    echo ""
}

# Main execution
main() {
    print_header
    
    check_environment
    create_backup
    prepare_cathedral
    setup_main_repo
    perform_integration
    update_main_navigation
    setup_integrated_actions
    setup_cloudflare_integration
    
    print_success "🎉 Cathedral Research integration completed!"
    print_info "Your Cathedral Research monorepo is now integrated with your main site."
    print_info "The next steps are to push changes and configure deployment secrets."
    
    print_secrets_reminder
    
    echo ""
    echo -e "${GREEN}✅ Integration Summary:${NC}"
    echo "   📁 Backup created in: ../cathedral-backup-*"
    echo "   🔗 Main repo updated with cathedral integration"
    echo "   🚀 GitHub Actions configured for deployment"
    echo "   🌐 Cloudflare configuration created"
    echo "   📱 Navigation integration added"
    echo ""
    echo -e "${BLUE}🚀 Next Steps:${NC}"
    echo "   1. Review the changes in your main repository"
    echo "   2. Commit and push the integration changes"
    echo "   3. Add deployment secrets to GitHub repository settings"
    echo "   4. Configure custom domains in Cloudflare/Azure"
    echo "   5. Test the deployment pipeline"
    echo ""
    echo -e "${PURPLE}🏛️ Cathedral Research is ready to enhance your main site!${NC}"
}

# Run main function
main "$@"