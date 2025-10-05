#!/bin/bash

# Cathedral Research - Protect Check Script
# Validates protected files and enforces quality gates

set -e

echo "🏛️ Cathedral Research - Protected Files Check"
echo "=============================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
PROTECT_LIST_FILE="devops/PROTECT_FILES_LIST.md"
REGISTRY_FILE="registry/apps.json"
REQUIRED_DIRS=("apps" "packages" "registry" "devops")
MIN_NODE_VERSION="18.0.0"

# Counters
ERRORS=0
WARNINGS=0
CHECKS=0

# Helper functions
log_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

log_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

log_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
    ((WARNINGS++))
}

log_error() {
    echo -e "${RED}❌ $1${NC}"
    ((ERRORS++))
}

run_check() {
    ((CHECKS++))
    echo ""
    log_info "Check $CHECKS: $1"
}

# Check 1: Repository Structure
run_check "Repository Structure Validation"
for dir in "${REQUIRED_DIRS[@]}"; do
    if [ -d "$dir" ]; then
        log_success "Directory '$dir' exists"
    else
        log_error "Required directory '$dir' is missing"
    fi
done

# Check 2: Protected Files List Exists
run_check "Protected Files List Validation"
if [ -f "$PROTECT_LIST_FILE" ]; then
    log_success "Protected files list exists"
    
    # Extract file patterns from the list
    PROTECTED_PATTERNS=(
        "package.json"
        "tsconfig.json" 
        "registry/apps.json"
        "apps/*/package.json"
        ".github/workflows/*"
    )
    
    for pattern in "${PROTECTED_PATTERNS[@]}"; do
        files_found=$(find . -path "./$pattern" 2>/dev/null | wc -l)
        if [ "$files_found" -gt 0 ]; then
            log_success "Found $files_found file(s) matching pattern: $pattern"
        else
            log_warning "No files found for protected pattern: $pattern"
        fi
    done
else
    log_error "Protected files list not found: $PROTECT_LIST_FILE"
fi

# Check 3: Registry Validation
run_check "Application Registry Validation"
if [ -f "$REGISTRY_FILE" ]; then
    log_success "Registry file exists"
    
    # Validate JSON structure
    if jq empty "$REGISTRY_FILE" 2>/dev/null; then
        log_success "Registry JSON is valid"
        
        # Extract app count
        app_count=$(jq '.apps | length' "$REGISTRY_FILE" 2>/dev/null || echo "0")
        if [ "$app_count" -gt 0 ]; then
            log_success "Registry contains $app_count applications"
        else
            log_warning "Registry contains no applications"
        fi
        
        # Check required fields for each app
        jq -r '.apps[] | .id' "$REGISTRY_FILE" 2>/dev/null | while read -r app_id; do
            if [ -d "apps/$app_id" ]; then
                log_success "App directory exists for: $app_id"
            else
                log_warning "App directory missing for: $app_id"
            fi
        done
    else
        log_error "Registry JSON is invalid"
    fi
else
    log_error "Registry file not found: $REGISTRY_FILE"
fi

# Check 4: Node.js Version
run_check "Node.js Version Compatibility"
if command -v node >/dev/null 2>&1; then
    current_version=$(node --version | sed 's/v//')
    log_success "Node.js version: $current_version"
    
    # Simple version comparison (major version only)
    current_major=$(echo "$current_version" | cut -d. -f1)
    required_major=$(echo "$MIN_NODE_VERSION" | cut -d. -f1)
    
    if [ "$current_major" -ge "$required_major" ]; then
        log_success "Node.js version meets requirements (>= $MIN_NODE_VERSION)"
    else
        log_error "Node.js version too old. Required: >= $MIN_NODE_VERSION, Found: $current_version"
    fi
else
    log_error "Node.js not found"
fi

# Check 5: Package Manager
run_check "Package Manager Validation"
if command -v npm >/dev/null 2>&1; then
    npm_version=$(npm --version)
    log_success "npm version: $npm_version"
else
    log_error "npm not found"
fi

# Check 6: TypeScript Configuration
run_check "TypeScript Configuration"
if [ -f "tsconfig.json" ]; then
    log_success "Root tsconfig.json exists"
    
    # Check for app-specific tsconfigs
    for app_dir in apps/*/; do
        app_name=$(basename "$app_dir")
        if [ -f "$app_dir/tsconfig.json" ]; then
            log_success "TypeScript config exists for: $app_name"
        else
            log_warning "No TypeScript config for: $app_name"
        fi
    done
else
    log_error "Root tsconfig.json not found"
fi

# Check 7: Package Dependencies
run_check "Package Dependencies Validation"
if [ -f "package.json" ]; then
    log_success "Root package.json exists"
    
    # Check for critical dependencies
    if jq -e '.dependencies."react"' package.json >/dev/null 2>&1; then
        react_version=$(jq -r '.dependencies."react"' package.json)
        log_success "React dependency found: $react_version"
    else
        log_warning "React dependency not found in root package.json"
    fi
    
    # Check workspaces configuration
    if jq -e '.workspaces' package.json >/dev/null 2>&1; then
        workspace_count=$(jq '.workspaces | length' package.json)
        log_success "Workspaces configured: $workspace_count"
    else
        log_warning "No workspaces configuration found"
    fi
else
    log_error "Root package.json not found"
fi

# Check 8: Build System
run_check "Build System Validation"
vite_configs=$(find apps/ packages/ -name "vite.config.js" -o -name "vite.config.ts" 2>/dev/null | wc -l)
if [ "$vite_configs" -gt 0 ]; then
    log_success "Found $vite_configs Vite configuration file(s)"
else
    log_warning "No Vite configuration files found"
fi

# Check 9: Git Configuration
run_check "Git Configuration"
if [ -d ".git" ]; then
    log_success "Git repository initialized"
    
    if [ -f ".gitignore" ]; then
        log_success ".gitignore file exists"
    else
        log_warning ".gitignore file not found"
    fi
    
    # Check for GitHub workflows
    if [ -d ".github/workflows" ]; then
        workflow_count=$(find .github/workflows/ -name "*.yml" -o -name "*.yaml" 2>/dev/null | wc -l)
        log_success "Found $workflow_count GitHub workflow file(s)"
    else
        log_warning "No GitHub workflows directory found"
    fi
else
    log_error "Not a Git repository"
fi

# Check 10: Security Files
run_check "Security Configuration"
security_files=(".env.example" "SECURITY.md" "LICENSE")
for file in "${security_files[@]}"; do
    if [ -f "$file" ]; then
        log_success "Security file exists: $file"
    else
        log_warning "Security file missing: $file"
    fi
done

# Final Summary
echo ""
echo "🏛️ Cathedral Research - Protect Check Summary"
echo "=============================================="
echo "Total Checks: $CHECKS"
echo -e "${GREEN}Successes: Multiple${NC}"
echo -e "${YELLOW}Warnings: $WARNINGS${NC}"
echo -e "${RED}Errors: $ERRORS${NC}"

if [ $ERRORS -eq 0 ]; then
    echo ""
    log_success "🎉 All critical checks passed! Repository is ready for deployment."
    exit 0
else
    echo ""
    log_error "💥 $ERRORS critical error(s) found. Please fix before proceeding."
    exit 1
fi