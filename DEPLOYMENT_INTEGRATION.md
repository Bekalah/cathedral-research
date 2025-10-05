# Cathedral Research - Deployment Integration Guide

## Overview
This guide explains how to integrate the Cathedral Research monorepo with the main bekalah.github.io site and deploy across multiple platforms.

## Repository Structure
```
bekalah.github.io/           # Main portfolio site
└── cathedral-research/      # This monorepo (as submodule or subtree)
    ├── apps/
    │   ├── cathedral-hub/   # Central navigation portal  
    │   ├── stone-grimoire/  # Mystical creation engine
    │   └── ...other apps
    ├── registry/            # App metadata and manifests
    └── devops/             # Deployment and protection scripts
```

## Integration Methods

### Option 1: Git Submodule (Recommended)
```bash
# In your main bekalah.github.io repo:
git submodule add https://github.com/Bekalah/cathedral-research.git cathedral
git submodule update --init --recursive
```

### Option 2: Git Subtree
```bash
# In your main bekalah.github.io repo:
git subtree add --prefix=cathedral https://github.com/Bekalah/cathedral-research.git master --squash
```

## Deployment Configurations

### 1. GitHub Pages (Primary)
- **Main Site**: `https://bekalah.github.io`
- **Cathedral Hub**: `https://bekalah.github.io/cathedral`
- **Apps**: `https://bekalah.github.io/cathedral/[app-name]`

**GitHub Actions Workflow** (add to main site):
```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main, master]
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          submodules: recursive
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build Cathedral Research
        run: |
          cd cathedral
          npm ci
          npm run build
      
      - name: Build main site
        run: npm run build
      
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

### 2. Cloudflare Pages
- **URL**: `https://cathedral-research.pages.dev`
- **Custom Domain**: `https://cathedral.bekalah.com`

**Cloudflare Configuration**:
```yaml
# wrangler.toml
name = "cathedral-research"
compatibility_date = "2024-10-01"

[build]
command = "npm run build"
destination = "dist"

[env.production]
vars = { NODE_ENV = "production" }

[[redirects]]
from = "/cathedral/*"
to = "/apps/:splat"
status = 200

[[redirects]]
from = "/"
to = "/apps/cathedral-hub"
status = 200
```

### 3. Azure Static Web Apps
- **URL**: `https://cathedral-research.azurestaticapps.net`
- **Custom Domain**: `https://research.bekalah.com`

**Azure Configuration** (`staticwebapp.config.json`):
```json
{
  "routes": [
    {
      "route": "/cathedral/*",
      "rewrite": "/apps/cathedral-hub/index.html"
    },
    {
      "route": "/api/*",
      "allowedRoles": ["authenticated"]
    }
  ],
  "navigationFallback": {
    "rewrite": "/apps/cathedral-hub/index.html",
    "exclude": ["/api/*", "*.{css,scss,sass,js,ts,tsx,jsx,json,png,jpg,jpeg,gif,svg,ico,woff,woff2,ttf,eot}"]
  },
  "globalHeaders": {
    "Cache-Control": "public, max-age=31536000, immutable"
  }
}
```

## Multi-Platform Deployment Workflow

### GitHub Actions for All Platforms
```yaml
name: Multi-Platform Deployment

on:
  push:
    branches: [master]
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run protect check
        run: npm run protect-check
      
      - name: Build all apps
        run: npm run build
      
      - name: Upload GitHub Pages artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist
      
      - name: Deploy to Cloudflare Pages
        uses: cloudflare/pages-action@v1
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          projectName: cathedral-research
          directory: ./dist
      
      - name: Deploy to Azure Static Web Apps
        uses: Azure/static-web-apps-deploy@v1
        with:
          azure_static_web_apps_api_token: ${{ secrets.AZURE_STATIC_WEB_APPS_API_TOKEN }}
          repo_token: ${{ secrets.GITHUB_TOKEN }}
          action: "upload"
          app_location: "./dist"
          skip_app_build: true

  deploy-github:
    needs: build
    if: github.ref == 'refs/heads/master'
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

## Environment Configuration

### Development URLs
- **Hub**: `http://localhost:3000`
- **Stone Grimoire**: `http://localhost:3002`
- **Cathedral Circuits**: `http://localhost:3001`

### Production URLs
- **GitHub**: `https://bekalah.github.io/cathedral`
- **Cloudflare**: `https://cathedral.bekalah.com`
- **Azure**: `https://research.bekalah.com`

## Integration Steps

1. **Add to Main Site**:
   ```bash
   cd /path/to/bekalah.github.io
   git submodule add https://github.com/Bekalah/cathedral-research.git cathedral
   ```

2. **Update Main Site Navigation**:
   ```html
   <nav>
     <a href="/cathedral">🏛️ Cathedral Research</a>
     <a href="/cathedral/grimoire">📚 Stone Grimoire</a>
     <a href="/cathedral/lab">🔬 Arcanae Lab</a>
   </nav>
   ```

3. **Configure Build Process**:
   ```json
   {
     "scripts": {
       "build": "npm run build:main && npm run build:cathedral",
       "build:cathedral": "cd cathedral && npm ci && npm run build"
     }
   }
   ```

## Secrets Configuration

Add these secrets to your GitHub repository:

- `CLOUDFLARE_API_TOKEN`: Cloudflare API token
- `CLOUDFLARE_ACCOUNT_ID`: Cloudflare account ID  
- `AZURE_STATIC_WEB_APPS_API_TOKEN`: Azure deployment token

## Custom Domains

### Cloudflare Setup
1. Add CNAME record: `cathedral.bekalah.com` → `cathedral-research.pages.dev`
2. Configure SSL/TLS settings
3. Set up redirects and caching rules

### Azure Setup  
1. Add custom domain in Azure portal
2. Configure DNS records
3. Enable HTTPS and CDN

## Monitoring & Analytics

- **GitHub Pages**: Built-in analytics
- **Cloudflare**: Web Analytics and Speed Insights
- **Azure**: Application Insights integration

## Next Steps

1. Choose integration method (submodule recommended)
2. Set up deployment secrets
3. Configure custom domains
4. Test deployment pipeline
5. Set up monitoring and analytics

This creates a robust multi-platform deployment strategy with the Cathedral Research monorepo integrated into your main portfolio site.