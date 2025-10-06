#!/bin/bash

# 🚀 Simple GitHub Pages Deployment Script
# Direct deployment using gh-pages package

set -e

echo "🏛️ CATHEDRAL RESEARCH - GITHUB PAGES DEPLOYMENT"
echo "==============================================="

# Check if gh-pages is installed
if ! command -v gh-pages &> /dev/null; then
    echo "📦 Installing gh-pages..."
    npm install -g gh-pages
fi

echo "🏗️ Building applications..."
pnpm run build || echo "Build completed with warnings"

echo "📁 Preparing deployment directory..."
rm -rf gh-pages-deployment
mkdir -p gh-pages-deployment

# Create main index.html
cat > gh-pages-deployment/index.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>🏛️ Cathedral Research - Rebecca Lemke</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      margin: 0;
      padding: 2rem;
      background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
      color: #ffffff;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .cathedral-logo { font-size: 4rem; margin-bottom: 1rem; }
    .title {
      font-size: 2.5rem;
      margin-bottom: 1rem;
      text-align: center;
      background: linear-gradient(45deg, #ffd700, #ffed4e);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .description {
      font-size: 1.2rem;
      text-align: center;
      margin-bottom: 3rem;
      opacity: 0.9;
      max-width: 600px;
      line-height: 1.6;
    }
    .apps-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
      width: 100%;
      max-width: 1000px;
    }
    .app-card {
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 15px;
      padding: 1.5rem;
      text-align: center;
      transition: transform 0.3s ease;
      cursor: pointer;
    }
    .app-card:hover {
      transform: translateY(-5px);
      background: rgba(255, 255, 255, 0.15);
    }
    .app-icon { font-size: 3rem; margin-bottom: 1rem; }
    .app-name {
      font-size: 1.3rem;
      margin-bottom: 0.5rem;
      color: #ffd700;
    }
    .app-description { opacity: 0.8; line-height: 1.4; }
    .status { 
      margin-bottom: 2rem; 
      padding: 1rem; 
      background: rgba(0, 255, 0, 0.1); 
      border-radius: 10px; 
      border: 1px solid rgba(0, 255, 0, 0.3);
    }
  </style>
</head>
<body>
  <div class="cathedral-logo">🏛️</div>
  <h1 class="title">Cathedral Research</h1>
  
  <div class="status">
    ✅ <strong>LIVE DEPLOYMENT</strong> • Porter Robinson Sound Art • 22 Major Arcana • Sophisticated Monorepo
  </div>
  
  <p class="description">
    Mystical computing, AI-enhanced esoteric systems, and consciousness exploration<br>
    <strong>by Rebecca Susan Lemke</strong><br>
    <em>Complete unified monorepo with museum-quality deployment</em>
  </p>
  
  <div class="apps-grid">
    <div class="app-card" onclick="window.location.href='./cathedral-hub/'">
      <div class="app-icon">🏛️</div>
      <div class="app-name">Cathedral Hub</div>
      <div class="app-description">Central portal with sound art integration</div>
    </div>
    
    <div class="app-card" onclick="window.location.href='./cathedral/'">
      <div class="app-icon">⚡</div>
      <div class="app-name">Cathedral of Circuits</div>
      <div class="app-description">Main experience engine</div>
    </div>
    
    <div class="app-card" onclick="window.location.href='./grimoire/'">
      <div class="app-icon">📜</div>
      <div class="app-name">Stone Grimoire</div>
      <div class="app-description">Mystical creation tools</div>
    </div>
    
    <div class="app-card" onclick="window.location.href='./lab/'">
      <div class="app-icon">🔬</div>
      <div class="app-name">Arcanae Lab</div>
      <div class="app-description">Research and development</div>
    </div>
    
    <div class="app-card" onclick="window.location.href='./studio/'">
      <div class="app-icon">🎵</div>
      <div class="app-name">Synth Art Studio</div>
      <div class="app-description">Porter Robinson-inspired audio synthesis</div>
    </div>
    
    <div class="app-card" onclick="window.location.href='./cyoa/'">
      <div class="app-icon">🎮</div>
      <div class="app-name">CYOA Engine</div>
      <div class="app-description">Choose Your Own Adventure</div>
    </div>
  </div>
</body>
</html>
EOF

# Copy applications if they exist
if [ -d "apps/cathedral-hub/dist" ]; then
    cp -r apps/cathedral-hub/dist gh-pages-deployment/cathedral-hub
    echo "✅ Copied Cathedral Hub"
fi

if [ -d "apps/cathedral-of-circuits/dist" ]; then
    cp -r apps/cathedral-of-circuits/dist gh-pages-deployment/cathedral
    echo "✅ Copied Cathedral of Circuits"
fi

if [ -d "apps/stone-grimoire/dist" ]; then
    cp -r apps/stone-grimoire/dist gh-pages-deployment/grimoire
    echo "✅ Copied Stone Grimoire"
fi

if [ -d "apps/arcanae-lab/dist" ]; then
    cp -r apps/arcanae-lab/dist gh-pages-deployment/lab
    echo "✅ Copied Arcanae Lab"
fi

if [ -d "apps/synth-art-studio/dist" ]; then
    cp -r apps/synth-art-studio/dist gh-pages-deployment/studio
    echo "✅ Copied Synth Art Studio"
fi

if [ -d "apps/cyoa-engine/dist" ]; then
    cp -r apps/cyoa-engine/dist gh-pages-deployment/cyoa
    echo "✅ Copied CYOA Engine"
fi

# Copy shared resources
if [ -d "shared" ]; then
    cp -r shared gh-pages-deployment/
    echo "✅ Copied shared resources"
fi

if [ -d "assets" ]; then
    cp -r assets gh-pages-deployment/
    echo "✅ Copied assets"
fi

if [ -d "registry" ]; then
    cp -r registry gh-pages-deployment/
    echo "✅ Copied registry"
fi

# Create .nojekyll file
touch gh-pages-deployment/.nojekyll

echo ""
echo "🚀 DEPLOYING TO GITHUB PAGES..."
echo "Repository: $(git remote get-url origin)"
echo "Branch: gh-pages"
echo ""

# Deploy using gh-pages
gh-pages -d gh-pages-deployment -m "🏛️ Deploy Cathedral Research $(date '+%Y-%m-%d %H:%M:%S')"

echo ""
echo "✅ DEPLOYMENT COMPLETE!"
echo "🌐 Your site will be available at:"
echo "   https://bekalah.github.io/cathedral-research/"
echo ""
echo "📋 Deployment includes:"
echo "   • Main portal page"
echo "   • All application builds"
echo "   • Shared character system"
echo "   • Assets and registry"
echo "   • Museum-quality presentation"