#!/usr/bin/env node

/**
 * 🏛️ Cathedral Research - GitHub Pages Deployment Preparation
 * Prepares sophisticated monorepo for bekalah.github.io deployment
 */

import fs from 'fs-extra'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '..')

async function prepareGitHubPages() {
  console.log('🏛️ Preparing Cathedral Research for bekalah.github.io deployment...')
  
  const deploymentDir = path.join(rootDir, 'gh-pages-deployment')
  
  // Clean deployment directory
  await fs.remove(deploymentDir)
  await fs.ensureDir(deploymentDir)
  
  console.log('📁 Creating deployment structure...')
  
  // Create app subdirectories
  const appDirs = ['cathedral', 'grimoire', 'lab', 'studio', 'cyoa', 'characters', 'registry', 'assets']
  for (const dir of appDirs) {
    await fs.ensureDir(path.join(deploymentDir, dir))
  }
  
  // Copy Cathedral Hub as main entry (if it exists)
  const cathedralHubDist = path.join(rootDir, 'apps/cathedral-hub/dist')
  if (await fs.pathExists(cathedralHubDist)) {
    console.log('🏛️ Copying Cathedral Hub as main entry...')
    await fs.copy(cathedralHubDist, deploymentDir)
  }
  
  // Copy application builds
  const appMappings = {
    'cathedral-of-circuits': 'cathedral',
    'stone-grimoire': 'grimoire',
    'arcanae-lab': 'lab',
    'synth-art-studio': 'studio',
    'cyoa-engine': 'cyoa'
  }
  
  for (const [appName, urlPath] of Object.entries(appMappings)) {
    const appDist = path.join(rootDir, `apps/${appName}/dist`)
    if (await fs.pathExists(appDist)) {
      console.log(`📦 Copying ${appName} to /${urlPath}...`)
      await fs.copy(appDist, path.join(deploymentDir, urlPath))
    }
  }
  
  // Copy character system
  const charactersDir = path.join(rootDir, 'shared/characters')
  if (await fs.pathExists(charactersDir)) {
    console.log('🎭 Copying complete Liber Arcanae character system...')
    await fs.copy(charactersDir, path.join(deploymentDir, 'characters'))
  }
  
  // Copy registry
  const registryDir = path.join(rootDir, 'registry')
  if (await fs.pathExists(registryDir)) {
    console.log('📋 Copying app registry...')
    await fs.copy(registryDir, path.join(deploymentDir, 'registry'))
  }
  
  // Copy assets
  const assetsDir = path.join(rootDir, 'assets')
  if (await fs.pathExists(assetsDir)) {
    console.log('🎨 Copying sophisticated assets...')
    await fs.copy(assetsDir, path.join(deploymentDir, 'assets'))
  }
  
  // Create .nojekyll file for GitHub Pages
  await fs.writeFile(path.join(deploymentDir, '.nojekyll'), '')
  
  // Create CNAME file if needed (for custom domain)
  // await fs.writeFile(path.join(deploymentDir, 'CNAME'), 'your-domain.com')
  
  // Create fallback index.html if none exists
  const indexPath = path.join(deploymentDir, 'index.html')
  if (!(await fs.pathExists(indexPath))) {
    console.log('📄 Creating fallback index.html...')
    await createFallbackIndex(indexPath)
  }
  
  // Create SPA routing configuration
  await createSPARouting(deploymentDir)
  
  console.log('✅ Cathedral Research prepared for bekalah.github.io deployment!')
  console.log(`📊 Deployment size: ${await calculateDeploymentSize(deploymentDir)}`)
}

async function createFallbackIndex(indexPath) {
  const indexContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>🏛️ Cathedral Research - Rebecca Lemke</title>
  <meta name="description" content="Mystical computing, AI-enhanced esoteric systems, and consciousness exploration">
  <meta name="author" content="Rebecca Susan Lemke">
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
    .cathedral-logo {
      font-size: 4rem;
      margin-bottom: 1rem;
      animation: glow 2s ease-in-out infinite alternate;
    }
    @keyframes glow {
      from { text-shadow: 0 0 20px #ffd700; }
      to { text-shadow: 0 0 30px #ffd700, 0 0 40px #ffd700; }
    }
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
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1.5rem;
      width: 100%;
      max-width: 1200px;
    }
    .app-card {
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 15px;
      padding: 1.5rem;
      text-align: center;
      transition: all 0.3s ease;
      cursor: pointer;
    }
    .app-card:hover {
      transform: translateY(-5px);
      background: rgba(255, 255, 255, 0.15);
      border-color: #ffd700;
    }
    .app-icon {
      font-size: 3rem;
      margin-bottom: 1rem;
    }
    .app-name {
      font-size: 1.3rem;
      margin-bottom: 0.5rem;
      color: #ffd700;
      font-weight: 600;
    }
    .app-description {
      opacity: 0.8;
      line-height: 1.4;
    }
    .footer {
      margin-top: 3rem;
      text-align: center;
      opacity: 0.7;
      font-size: 0.9rem;
    }
  </style>
</head>
<body>
  <div class="cathedral-logo">🏛️</div>
  <h1 class="title">Cathedral Research</h1>
  <p class="description">
    Mystical computing, AI-enhanced esoteric systems, and consciousness exploration
    featuring the complete Liber Arcanae with 22 Major Arcana characters
  </p>
  
  <div class="apps-grid">
    <div class="app-card" onclick="window.location.href='/cathedral-research/cathedral'">
      <div class="app-icon">🏛️</div>
      <div class="app-name">Cathedral of Circuits</div>
      <div class="app-description">Main experience engine with sacred geometry</div>
    </div>
    
    <div class="app-card" onclick="window.location.href='/cathedral-research/grimoire'">
      <div class="app-icon">📜</div>
      <div class="app-name">Stone Grimoire</div>
      <div class="app-description">Mystical creation tools and synthesis</div>
    </div>
    
    <div class="app-card" onclick="window.location.href='/cathedral-research/lab'">
      <div class="app-icon">🔬</div>
      <div class="app-name">Arcanae Lab</div>
      <div class="app-description">Research and development workshop</div>
    </div>
    
    <div class="app-card" onclick="window.location.href='/cathedral-research/studio'">
      <div class="app-icon">🎵</div>
      <div class="app-name">Synth Art Studio</div>
      <div class="app-description">Audio-visual synthesis and creation</div>
    </div>
    
    <div class="app-card" onclick="window.location.href='/cathedral-research/cyoa'">
      <div class="app-icon">🎮</div>
      <div class="app-name">CYOA Engine</div>
      <div class="app-description">Choose Your Own Adventure experiences</div>
    </div>
    
    <div class="app-card" onclick="window.location.href='/cathedral-research/characters'">
      <div class="app-icon">🎭</div>
      <div class="app-name">Liber Arcanae</div>
      <div class="app-description">22 Major Arcana characters with 3D sculpting</div>
    </div>
  </div>
  
  <div class="footer">
    <p>Created by Rebecca Susan Lemke • Museum-quality digital art and mystical computing</p>
  </div>
</body>
</html>`
  
  await fs.writeFile(indexPath, indexContent)
}

async function createSPARouting(deploymentDir) {
  // Create 404.html for GitHub Pages SPA routing
  const notFoundPath = path.join(deploymentDir, '404.html')
  const indexContent = await fs.readFile(path.join(deploymentDir, 'index.html'), 'utf8')
  
  // Simple SPA routing script
  const spaScript = `
  <script>
    // Simple SPA routing for GitHub Pages
    (function() {
      var redirect = sessionStorage.redirect;
      delete sessionStorage.redirect;
      if (redirect && redirect != location.href) {
        history.replaceState(null, null, redirect);
      }
    })();
  </script>
  `
  
  const spaIndexContent = indexContent.replace('</head>', spaScript + '</head>')
  await fs.writeFile(notFoundPath, spaIndexContent)
}

async function calculateDeploymentSize(deploymentDir) {
  const stats = await fs.stat(deploymentDir)
  const sizeInMB = (await getDirSize(deploymentDir) / (1024 * 1024)).toFixed(2)
  return `${sizeInMB} MB`
}

async function getDirSize(dirPath) {
  const items = await fs.readdir(dirPath)
  let totalSize = 0
  
  for (const item of items) {
    const itemPath = path.join(dirPath, item)
    const stats = await fs.stat(itemPath)
    
    if (stats.isDirectory()) {
      totalSize += await getDirSize(itemPath)
    } else {
      totalSize += stats.size
    }
  }
  
  return totalSize
}

// Run the preparation
prepareGitHubPages().catch(console.error)