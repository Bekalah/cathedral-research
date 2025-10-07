#!/usr/bin/env node

/**
 * Cathedral Universe Consolidation Tool
 * Merges all scattered repositories into one immersive creative platform
 * Following established style guidelines and modular architecture
 */

import fs from 'fs-extra'
import path from 'path'
import { execSync } from 'child_process'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

class CathedralUniverseConsolidator {
  constructor() {
    this.sourceRepo = process.cwd() // cathedral-research
    this.targetRepo = path.resolve(process.cwd(), '../bekalah.github.io') // Assuming sibling directory
    this.backupDir = path.resolve(process.cwd(), '../cathedral-backup-' + Date.now())
  }

  async consolidateUniverse() {
    console.log('🏛️ Starting Cathedral Universe Consolidation...')
    
    try {
      // Step 1: Create backup
      await this.createBackup()
      
      // Step 2: Prepare target repository
      await this.prepareTargetRepository()
      
      // Step 3: Merge style systems
      await this.mergeStyleSystems()
      
      // Step 4: Consolidate packages
      await this.consolidatePackages()
      
      // Step 5: Merge applications
      await this.mergeApplications()
      
      // Step 6: Update configuration
      await this.updateConfiguration()
      
      // Step 7: Build unified system
      await this.buildUnifiedSystem()
      
      console.log('✨ Cathedral Universe Consolidation Complete!')
      console.log(`📁 Backup created at: ${this.backupDir}`)
      console.log(`🏛️ Unified universe ready at: ${this.targetRepo}`)
      
    } catch (error) {
      console.error('❌ Consolidation failed:', error)
      await this.restoreFromBackup()
    }
  }

  async createBackup() {
    console.log('📋 Creating backup of existing repositories...')
    
    // Backup source repository
    if (fs.existsSync(this.sourceRepo)) {
      await fs.copy(this.sourceRepo, path.join(this.backupDir, 'cathedral-research'))
    }
    
    // Backup target repository
    if (fs.existsSync(this.targetRepo)) {
      await fs.copy(this.targetRepo, path.join(this.backupDir, 'bekalah.github.io'))
    }
    
    console.log('✅ Backup created successfully')
  }

  async prepareTargetRepository() {
    console.log('🏗️ Preparing target repository structure...')
    
    // Ensure target repository exists
    if (!fs.existsSync(this.targetRepo)) {
      console.log('🔧 Creating new unified repository...')
      await fs.ensureDir(this.targetRepo)
      
      // Initialize as git repository
      execSync('git init', { cwd: this.targetRepo })
      execSync('git remote add origin https://github.com/Bekalah/bekalah.github.io.git', { cwd: this.targetRepo })
    }
    
    // Create unified directory structure
    const directories = [
      'apps',
      'packages', 
      'shared/styles',
      'shared/components',
      'shared/utils',
      'shared/assets',
      'tools',
      'docs',
      'research'
    ]
    
    for (const dir of directories) {
      await fs.ensureDir(path.join(this.targetRepo, dir))
    }
    
    console.log('✅ Repository structure prepared')
  }

  async mergeStyleSystems() {
    console.log('🎨 Merging style systems and design guides...')
    
    const styleSources = [
      'docs/CATHEDRAL_DESIGN_SYSTEM.md',
      'docs/VISUAL_STYLE_GUIDE.md', 
      'docs/STYLE_GUIDE.md',
      'shared/styles/cathedral-universe.scss'
    ]
    
    const targetStylesDir = path.join(this.targetRepo, 'shared/styles')
    
    // Copy all style files
    for (const styleFile of styleSources) {
      const sourcePath = path.join(this.sourceRepo, styleFile)
      if (fs.existsSync(sourcePath)) {
        const targetPath = path.join(targetStylesDir, path.basename(styleFile))
        await fs.copy(sourcePath, targetPath)
        console.log(`📄 Copied: ${styleFile}`)
      }
    }
    
    // Create unified style index
    const unifiedStyleIndex = `
/**
 * 🎨 Cathedral Universe - Unified Style System
 * Import all design system components
 */

// Core design system
@import 'cathedral-universe.scss';

// Component styles
@import 'components/sacred-buttons.scss';
@import 'components/glass-morphism.scss';
@import 'components/immersive-navigation.scss';
@import 'components/css-art-laboratory.scss';

// Application-specific styles
@import 'apps/cathedral-hub.scss';
@import 'apps/stone-grimoire.scss';
@import 'apps/arcanae-lab.scss';
@import 'apps/cathedral-of-circuits.scss';
@import 'apps/synth-art-studio.scss';
@import 'apps/cosmogenesis-engine.scss';
@import 'apps/cyoa-engine.scss';

// Utilities
@import 'utilities/animations.scss';
@import 'utilities/responsive.scss';
@import 'utilities/accessibility.scss';
`
    
    await fs.writeFile(path.join(targetStylesDir, 'index.scss'), unifiedStyleIndex)
    
    console.log('✅ Style systems merged successfully')
  }

  async consolidatePackages() {
    console.log('📦 Consolidating packages...')
    
    const packages = [
      'p5-codex-engine',
      'liber-arcanae-modular',
      'three-engine',
      'art-engine',
      'codex-musical-system',
      'synthesis-engine',
      'tarot-engine',
      'consciousness-engine',
      'learning-engine',
      'hooks'
    ]
    
    for (const pkg of packages) {
      const sourcePath = path.join(this.sourceRepo, 'packages', pkg)
      const targetPath = path.join(this.targetRepo, 'packages', pkg)
      
      if (fs.existsSync(sourcePath)) {
        await fs.copy(sourcePath, targetPath)
        console.log(`📦 Merged package: ${pkg}`)
      }
    }
    
    console.log('✅ Packages consolidated successfully')
  }

  async mergeApplications() {
    console.log('🚀 Merging applications...')
    
    const apps = [
      'cathedral-hub',
      'cathedral-of-circuits', 
      'stone-grimoire',
      'arcanae-lab',
      'synth-art-studio',
      'cosmogenesis-engine',
      'cyoa-engine'
    ]
    
    for (const app of apps) {
      const sourcePath = path.join(this.sourceRepo, 'apps', app)
      const targetPath = path.join(this.targetRepo, 'apps', app)
      
      if (fs.existsSync(sourcePath)) {
        await fs.copy(sourcePath, targetPath)
        console.log(`🚀 Merged app: ${app}`)
      }
    }
    
    console.log('✅ Applications merged successfully')
  }

  async updateConfiguration() {
    console.log('⚙️ Updating configuration files...')
    
    // Copy unified package.json
    const sourcePackageJson = path.join(this.sourceRepo, 'package.json')
    const targetPackageJson = path.join(this.targetRepo, 'package.json')
    
    if (fs.existsSync(sourcePackageJson)) {
      const packageData = await fs.readJson(sourcePackageJson)
      
      // Update paths and metadata for main repository
      packageData.name = '@bekalah/cathedral-universe'
      packageData.homepage = 'https://bekalah.github.io'
      packageData.repository.url = 'https://github.com/Bekalah/bekalah.github.io.git'
      packageData.cathedral.deployment.path = '/'
      packageData.cathedral.deployment.domain = 'bekalah.github.io'
      
      await fs.writeJson(targetPackageJson, packageData, { spaces: 2 })
    }
    
    // Copy other config files
    const configFiles = [
      'pnpm-workspace.yaml',
      'tsconfig.json',
      'vite.config.js',
      '.gitignore',
      'README.md'
    ]
    
    for (const configFile of configFiles) {
      const sourcePath = path.join(this.sourceRepo, configFile)
      const targetPath = path.join(this.targetRepo, configFile)
      
      if (fs.existsSync(sourcePath)) {
        await fs.copy(sourcePath, targetPath)
        console.log(`⚙️ Updated: ${configFile}`)
      }
    }
    
    // Create unified README
    const unifiedReadme = await this.createUnifiedReadme()
    await fs.writeFile(path.join(this.targetRepo, 'README.md'), unifiedReadme)
    
    console.log('✅ Configuration updated successfully')
  }

  async createUnifiedReadme() {
    return `# 🏛️ Cathedral Universe - Immersive Creative Platform

**Where consciousness becomes sacred space**

## ✨ Overview

Cathedral Universe is a unified immersive creative platform that combines:

- 🎨 **Modular Liber Arcanae** - Complete tarot system with p5.js integration
- 🔢 **Codex 144:99** - Sacred mathematics and geometry engine  
- 🌌 **Real Dataset Integration** - Professional art tools with live data
- 🎮 **Interactive Applications** - Seven complete creative environments
- 🏗️ **Museum-Quality Design** - Ernst Fuchs + Alex Grey + Iris van Herpen aesthetics

## 🚀 Quick Start

\`\`\`bash
# Install dependencies
pnpm install

# Start the universe
pnpm run dev:universe

# Build for production
pnpm run build
\`\`\`

## 🏛️ Applications

- **Cathedral Hub** - Central navigation portal
- **Cathedral of Circuits** - Fractal art and research engine
- **Stone Grimoire** - Ancient wisdom interface
- **Arcanae Lab** - Scientific mysticism workspace
- **Synth Art Studio** - Haute couture creation lab
- **Cosmogenesis Engine** - Universe generation system
- **CYOA Engine** - Interactive narrative builder

## 📦 Packages

- **P5 Codex Engine** - Modular p5.js + sacred mathematics
- **Liber Arcanae Modular** - Complete tarot system
- **Three Engine** - Advanced 3D rendering
- **Dataset Connectors** - Real-world data integration
- **Art Engine Pro** - Professional art generation tools

## 🎨 Design System

Unified aesthetic following the Cathedral Design System:
- **Vienna Deep** color palette for foundations
- **Chakra Precision** for energy states  
- **Couture Luxe** for interactive elements
- **Sacred Geometry** grid system
- **Immersive Glass Morphism** components

## 🔧 Development

\`\`\`bash
# Work on specific apps
pnpm run dev:hub          # Cathedral Hub
pnpm run dev:studio       # Synth Art Studio
pnpm run dev:lab          # Arcanae Lab

# Work on packages
pnpm run p5:codex         # P5 Codex Engine
pnpm run liber:arcanae    # Modular Tarot System

# Quality assurance
pnpm run quality:immersive
pnpm run style:verify
pnpm run accessibility:check
\`\`\`

## 📊 Data Integration

Connect to real datasets for professional art generation:
- NASA imagery and space data
- Weather and climate patterns
- Art museum collections
- Scientific research data
- Cultural heritage databases

## 🎯 Professional Exports

Generate high-quality assets for:
- Print-ready artwork (300+ DPI)
- Vector graphics (SVG, AI)
- 3D models (OBJ, FBX, GLTF)
- Game assets (Unity, Unreal)
- Web-optimized media

## 🛡️ Accessibility

Built with trauma-informed design principles:
- Reduced motion options
- High contrast modes
- Screen reader compatibility
- Calm interaction patterns
- Emergency exit options

## 📜 License

MIT - Sacred geometry for all beings

---

*"In the Cathedral of Consciousness, every pixel is a prayer, every interaction a sacred geometry, every creation a fragment of the infinite."*
`
  }

  async buildUnifiedSystem() {
    console.log('🔨 Building unified system...')
    
    try {
      // Install dependencies
      console.log('📦 Installing dependencies...')
      execSync('pnpm install', { cwd: this.targetRepo, stdio: 'inherit' })
      
      // Build packages first
      console.log('🏗️ Building packages...')
      execSync('pnpm run build:packages', { cwd: this.targetRepo, stdio: 'inherit' })
      
      // Build applications
      console.log('🚀 Building applications...')
      execSync('pnpm run build:apps', { cwd: this.targetRepo, stdio: 'inherit' })
      
      // Verify build
      console.log('✅ Verifying build...')
      execSync('pnpm run build:verify', { cwd: this.targetRepo, stdio: 'inherit' })
      
      console.log('✅ Unified system built successfully')
      
    } catch (error) {
      console.error('❌ Build failed:', error.message)
      throw error
    }
  }

  async restoreFromBackup() {
    console.log('🔄 Restoring from backup...')
    
    try {
      if (fs.existsSync(this.backupDir)) {
        // Restore original repositories
        if (fs.existsSync(path.join(this.backupDir, 'cathedral-research'))) {
          await fs.remove(this.sourceRepo)
          await fs.copy(path.join(this.backupDir, 'cathedral-research'), this.sourceRepo)
        }
        
        if (fs.existsSync(path.join(this.backupDir, 'bekalah.github.io'))) {
          await fs.remove(this.targetRepo)
          await fs.copy(path.join(this.backupDir, 'bekalah.github.io'), this.targetRepo)
        }
        
        console.log('✅ Backup restored successfully')
      }
    } catch (error) {
      console.error('❌ Backup restoration failed:', error)
    }
  }

  async deployToGitHub() {
    console.log('🚀 Deploying to GitHub...')
    
    try {
      // Add all changes
      execSync('git add .', { cwd: this.targetRepo })
      
      // Commit changes
      const commitMessage = `🏛️ Cathedral Universe Consolidation - ${new Date().toISOString()}`
      execSync(`git commit -m "${commitMessage}"`, { cwd: this.targetRepo })
      
      // Push to main branch
      execSync('git push origin main', { cwd: this.targetRepo })
      
      console.log('✅ Deployed to GitHub successfully')
      console.log('🌐 Live at: https://bekalah.github.io')
      
    } catch (error) {
      console.error('❌ Deployment failed:', error)
    }
  }
}

// Run consolidation if called directly
if (import.meta.url === new URL(process.argv[1], 'file:').href) {
  const consolidator = new CathedralUniverseConsolidator()
  
  console.log('🏛️ Cathedral Universe Consolidation Tool')
  console.log('='*50)
  
  consolidator.consolidateUniverse()
    .then(() => {
      console.log('\\n🎉 Consolidation complete!')
      console.log('\\n📋 Next steps:')
      console.log('1. Review the unified repository')
      console.log('2. Test all applications and packages')
      console.log('3. Deploy to GitHub: node tools/deploy-universe.js')
      console.log('4. Verify live site: https://bekalah.github.io')
      
      // Optionally deploy immediately
      const deploy = process.argv.includes('--deploy')
      if (deploy) {
        return consolidator.deployToGitHub()
      }
    })
    .catch(error => {
      console.error('\\n❌ Consolidation failed:', error)
      process.exit(1)
    })
}

export { CathedralUniverseConsolidator }