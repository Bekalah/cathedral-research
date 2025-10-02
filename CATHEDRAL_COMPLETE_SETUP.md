# 🏰 Cathedral - Complete Setup Guide

## Quick Start (Copy-Paste Ready)

### Step 1: Clone and Setup Repository

```bash
# Navigate to your bekalah.github.io directory
cd ~/projects/bekalah.github.io

# Create cathedral subdirectory
mkdir -p cathedral
cd cathedral

# Initialize git (if not already a git repo)
git init
git remote add origin https://github.com/bekalah/cathedral.git

# Create project structure
mkdir -p .github/workflows
mkdir -p azure-functions/{audio-analysis,pattern-generator,realm-processor,save-state,health}
mkdir -p cloudflare/workers
mkdir -p src/{core/{audio,fractals,realm,tarot},services,ui,config}
mkdir -p public
mkdir -p tests/{unit,integration}
mkdir -p docs

# Initialize npm
npm init -y
```

### Step 2: Install Dependencies

```bash
# Production dependencies
npm install tone three mathjs papaparse

# Development dependencies
npm install -D vite @vitejs/plugin-legacy
```

### Step 3: Create Core Configuration Files

**`package.json`** (replace existing):

```json
{
  "name": "cathedral",
  "version": "0.1.0",
  "description": "Sound → Art → Fractals → Realms → CYOA Game",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "deploy": "npm run build && git add -A && git commit -m 'Deploy' && git push",
    "azure:dev": "cd azure-functions && func start",
    "test": "echo 'Tests coming soon'"
  },
  "dependencies": {
    "tone": "^14.7.77",
    "three": "^0.160.0",
    "mathjs": "^12.3.0",
    "papaparse": "^5.4.1"
  },
  "devDependencies": {
    "vite": "^5.0.0",
    "@vitejs/plugin-legacy": "^5.0.0"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/bekalah/cathedral.git"
  },
  "author": "bekalah",
  "license": "MIT"
}
```

**`vite.config.js`**:

```javascript
import { defineConfig } from 'vite';

export default defineConfig({
  base: '/cathedral/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:7071',
        changeOrigin: true,
        secure: false
      }
    }
  }
});
```

**`src/config/environment.js`**:

```javascript
// Auto-detect environment
const isDev = import.meta.env.DEV;
const isProd = import.meta.env.PROD;

export const ENV = {
  MODE: isDev ? 'development' : 'production',
  
  // Azure Functions
  AZURE_FUNCTION_URL: isDev 
    ? 'http://localhost:7071/api'
    : 'https://cathedral-functions.azurewebsites.net/api',
  
  // GitHub Pages
  GITHUB_PAGES_URL: 'https://bekalah.github.io/cathedral',
  
  // Cloudflare
  CLOUDFLARE_DOMAIN: isProd ? 'cathedral.yourdomain.com' : 'localhost:3000',
  
  // Azure Storage (if using)
  AZURE_STORAGE_URL: 'https://cathedralstore.blob.core.windows.net',
  
  // Feature flags
  ENABLE_ANALYTICS: isProd,
  ENABLE_DEBUG: isDev,
  ENABLE_CLOUDFLARE: isProd
};
```

**`public/index.html`**:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cathedral - Sound into Art into Fractals into Realms</title>
    <meta name="description" content="Transform sound into visual art, fractals, and explorable realms with a living tarot deck">
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: 'Courier New', monospace;
            background: #000;
            color: #0f0;
        }
        #loading {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            font-size: 2em;
        }
    </style>
</head>
<body>
    <div id="app">
        <div id="loading">⚡ Loading Cathedral...</div>
    </div>
    <script type="module" src="/src/main.js"></script>
</body>
</html>
```

**`src/main.js`**:

```javascript
import { ENV } from './config/environment.js';
import { azureClient } from './services/azure-client.js';

console.log('🏰 Cathedral initializing...');
console.log('Environment:', ENV.MODE);

// Test Azure connection
async function init() {
    const app = document.getElementById('app');
    
    try {
        // Health check
        const isHealthy = await azureClient.healthCheck();
        
        app.innerHTML = `
            <div style="padding: 40px; max-width: 1200px; margin: 0 auto;">
                <h1>⚡ Cathedral</h1>
                <p>Sound → Art → Fractals → Realms → CYOA</p>
                
                <div style="margin-top: 20px; padding: 20px; background: #111; border: 2px solid #0f0;">
                    <h2>System Status</h2>
                    <p>Environment: ${ENV.MODE}</p>
                    <p>Azure Functions: ${isHealthy ? '✅ Connected' : '❌ Disconnected'}</p>
                    <p>GitHub Pages: ✅ Active</p>
                </div>
                
                <div style="margin-top: 20px;">
                    <button onclick="location.href='/cathedral/spectral-tool.html'" 
                            style="padding: 15px 30px; font-size: 18px; cursor: pointer; background: #0f0; border: none; color: #000;">
                        🎵 Launch Spectral Imaging Tool
                    </button>
                </div>
            </div>
        `;
    } catch (error) {
        console.error('Initialization failed:', error);
        app.innerHTML = `
            <div style="padding: 40px; color: #f00;">
                <h1>❌ Initialization Failed</h1>
                <p>${error.message}</p>
                <p>Check console for details.</p>
            </div>
        `;
    }
}

init();
```

### Step 4: Setup Azure Functions

```bash
# Install Azure Functions Core Tools
npm install -g azure-functions-core-tools@4

# Login to Azure
az login

# Create resource group
az group create \
  --name CathedralRG \
  --location eastus

# Create storage account
az storage account create \
  --name cathedralstore \
  --resource-group CathedralRG \
  --location eastus \
  --sku Standard_LRS

# Create Function App
az functionapp create \
  --resource-group CathedralRG \
  --consumption-plan-location eastus \
  --runtime node \
  --runtime-version 20 \
  --functions-version 4 \
  --name cathedral-functions \
  --storage-account cathedralstore

# Create Cosmos DB
az cosmosdb create \
  --name cathedral-cosmos \
  --resource-group CathedralRG \
  --locations regionName=eastus

# Create database
az cosmosdb sql database create \
  --account-name cathedral-cosmos \
  --resource-group CathedralRG \
  --name CathedralDB

# Create container
az cosmosdb sql container create \
  --account-name cathedral-cosmos \
  --resource-group CathedralRG \
  --database-name CathedralDB \
  --name AudioPatterns \
  --partition-key-path "/id" \
  --throughput 400
```

**Create `azure-functions/host.json`**:

```json
{
  "version": "2.0",
  "logging": {
    "applicationInsights": {
      "samplingSettings": {
        "isEnabled": true,
        "maxTelemetryItemsPerSecond": 20
      }
    }
  },
  "extensionBundle": {
    "id": "Microsoft.Azure.Functions.ExtensionBundle",
    "version": "[4.*, 5.0.0)"
  }
}
```

**Create `azure-functions/package.json`**:

```json
{
  "name": "cathedral-azure-functions",
  "version": "1.0.0",
  "description": "Azure Functions for Cathedral",
  "scripts": {
    "start": "func start",
    "test": "echo \"No tests yet\""
  },
  "dependencies": {},
  "devDependencies": {}
}
```

**Create `azure-functions/audio-analysis/function.json`**:

```json
{
  "bindings": [
    {
      "authLevel": "function",
      "type": "httpTrigger",
      "direction": "in",
      "name": "req",
      "methods": ["post", "options"],
      "route": "audio-analysis"
    },
    {
      "type": "http",
      "direction": "out",
      "name": "res"
    },
    {
      "type": "cosmosDB",
      "direction": "out",
      "name": "patternDocument",
      "databaseName": "CathedralDB",
      "collectionName": "AudioPatterns",
      "createIfNotExists": false,
      "connectionStringSetting": "CosmosDbConnectionString"
    }
  ]
}
```

**Create `azure-functions/health/function.json`**:

```json
{
  "bindings": [
    {
      "authLevel": "anonymous",
      "type": "httpTrigger",
      "direction": "in",
      "name": "req",
      "methods": ["get"],
      "route": "health"
    },
    {
      "type": "http",
      "direction": "out",
      "name": "res"
    }
  ]
}
```

**Create `azure-functions/health/index.js`**:

```javascript
module.exports = async function (context, req) {
    context.res = {
        status: 200,
        body: { status: 'healthy', timestamp: new Date().toISOString() },
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    };
};
```

### Step 5: Get Azure Connection Strings

```bash
# Get Cosmos DB connection string
az cosmosdb keys list \
  --name cathedral-cosmos \
  --resource-group CathedralRG \
  --type connection-strings \
  --query "connectionStrings[0].connectionString" \
  --output tsv

# Get Storage connection string
az storage account show-connection-string \
  --name cathedralstore \
  --resource-group CathedralRG \
  --output tsv

# Get Function App URL
az functionapp show \
  --name cathedral-functions \
  --resource-group CathedralRG \
  --query defaultHostName \
  --output tsv
```

### Step 6: Configure Azure Function App Settings

```bash
# Set Cosmos DB connection
az functionapp config appsettings set \
  --name cathedral-functions \
  --resource-group CathedralRG \
  --settings "CosmosDbConnectionString=YOUR_COSMOS_CONNECTION_STRING"

# Set CORS
az functionapp cors add \
  --name cathedral-functions \
  --resource-group CathedralRG \
  --allowed-origins "https://bekalah.github.io" "http://localhost:3000"
```

### Step 7: Setup GitHub Secrets

Go to: https://github.com/bekalah/cathedral/settings/secrets/actions

Add these secrets:

- `AZURE_FUNCTION_URL`: `https://cathedral-functions.azurewebsites.net`
- `AZURE_COSMOS_CONNECTION`: (from step 5)
- `AZURE_STORAGE_CONNECTION`: (from step 5)
- `AZURE_CREDENTIALS`: (JSON from `az ad sp create-for-rbac`)
- `AZURE_FUNCTIONAPP_PUBLISH_PROFILE`: (download from Azure Portal)

### Step 8: Setup Cloudflare (Optional)

```bash
# Install Wrangler
npm install -g wrangler

# Login
wrangler login

# Create worker
cd cloudflare/workers
wrangler init cathedral-worker

# Deploy
wrangler deploy
```

Add secrets to Cloudflare Worker:

```bash
wrangler secret put AZURE_FUNCTION_URL
wrangler secret put AZURE_FUNCTION_KEY
```

### Step 9: Deploy Everything

```bash
# Deploy Azure Functions
cd azure-functions
func azure functionapp publish cathedral-functions

# Build and deploy frontend
cd ..
npm run build

# Commit and push
git add -A
git commit -m "Initial Cathedral deployment"
git push origin main
```

### Step 10: Configure GitHub Pages

1. Go to: https://github.com/bekalah/cathedral/settings/pages
2. Source: Deploy from a branch
3. Branch: `main` / `dist` folder
4. Save

**Or use GitHub Actions (already configured in workflows)**

### Step 11: Test Everything

```bash
# Start local Azure Functions
cd azure-functions
npm start  # runs on http://localhost:7071

# In new terminal, start frontend
cd ..
npm run dev  # runs on http://localhost:3000

# Open browser
open http://localhost:3000
```

### Step 12: Verify Deployment

Visit:

- Frontend: https://bekalah.github.io/cathedral
- Azure Functions: https://cathedral-functions.azurewebsites.net/api/health
- Cloudflare (if configured): https://your-worker.workers.dev

## Troubleshooting

### Azure Functions not responding

```bash
# Check logs
az functionapp log tail \
  --name cathedral-functions \
  --resource-group CathedralRG

# Restart app
az functionapp restart \
  --name cathedral-functions \
  --resource-group CathedralRG
```

### GitHub Pages not updating

```bash
# Check Actions
# Go to: https://github.com/bekalah/cathedral/actions

# Force rebuild
git commit --allow-empty -m "Trigger rebuild"
git push
```

### CORS issues

```bash
# Update CORS settings
az functionapp cors add \
  --name cathedral-functions \
  --resource-group CathedralRG \
  --allowed-origins "*"
```

## Next Steps

1. ✅ Copy the spectral imaging tool HTML to `public/spectral-tool.html`
2. ✅ Copy audio analysis function to `azure-functions/audio-analysis/index.js`
3. ✅ Copy azure client to `src/services/azure-client.js`
4. ✅ Copy Cloudflare worker to `cloudflare/workers/edge-router.js`
5. Build fractal generation system
6. Build realm generation system
7. Build tarot character system
8. Build CYOA narrative engine

## Useful Commands

```bash
# Development
npm run dev              # Start local dev server
npm run azure:dev        # Start local Azure Functions

# Deployment
npm run build           # Build for production
npm run deploy          # Build + git push
git push                # Triggers auto-deployment

# Azure
az functionapp list     # List your function apps
az cosmosdb list        # List your Cosmos DB accounts
az group delete --name CathedralRG  # Delete everything (careful!)

# Cloudflare
wrangler tail           # View worker logs
wrangler dev            # Test worker locally
```

🎉 **You're ready to build Cathedral!**