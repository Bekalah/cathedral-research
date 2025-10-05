#!/usr/bin/env node

/**
 * Cathedral Research - DevOps Protect Check
 * Validates critical files and configurations before deployment
 */

import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const ROOT_DIR = path.resolve(__dirname, '..')

class ProtectCheck {
  constructor() {
    this.errors = []
    this.warnings = []
    this.protectedFiles = []
  }

  async loadProtectedFiles() {
    try {
      const protectListPath = path.join(__dirname, 'PROTECT_FILES_LIST.txt')
      const content = await fs.readFile(protectListPath, 'utf-8')
      
      this.protectedFiles = content
        .split('\n')
        .map(line => line.trim())
        .filter(line => line && !line.startsWith('#'))
      
      console.log(`📋 Loaded ${this.protectedFiles.length} protected file patterns`)
    } catch (error) {
      this.errors.push(`Failed to load protected files list: ${error.message}`)
    }
  }

  async checkFileExists(filePath) {
    try {
      const fullPath = path.resolve(ROOT_DIR, filePath)
      await fs.access(fullPath)
      return true
    } catch {
      return false
    }
  }

  async validateProtectedFiles() {
    console.log('🔍 Validating protected files...')
    
    for (const filePattern of this.protectedFiles) {
      // Handle glob patterns
      if (filePattern.includes('*')) {
        await this.validateGlobPattern(filePattern)
      } else {
        // Direct file check
        const exists = await this.checkFileExists(filePattern)
        if (!exists) {
          this.warnings.push(`Protected file missing: ${filePattern}`)
        } else {
          console.log(`✅ ${filePattern}`)
        }
      }
    }
  }

  async validateGlobPattern(pattern) {
    // Simple glob handling for common patterns
    if (pattern.includes('apps/*/')) {
      const appsDir = path.resolve(ROOT_DIR, 'apps')
      try {
        const apps = await fs.readdir(appsDir)
        const fileName = pattern.split('/').pop()
        
        for (const app of apps) {
          const appPath = `apps/${app}/${fileName}`
          const exists = await this.checkFileExists(appPath)
          if (!exists) {
            this.warnings.push(`Protected file missing: ${appPath}`)
          } else {
            console.log(`✅ ${appPath}`)
          }
        }
      } catch (error) {
        this.warnings.push(`Could not validate pattern ${pattern}: ${error.message}`)
      }
    } else if (pattern.includes('packages/*/')) {
      const packagesDir = path.resolve(ROOT_DIR, 'packages')
      try {
        const packages = await fs.readdir(packagesDir)
        const fileName = pattern.split('/').pop()
        
        for (const pkg of packages) {
          const pkgPath = `packages/${pkg}/${fileName}`
          const exists = await this.checkFileExists(pkgPath)
          if (!exists) {
            this.warnings.push(`Protected file missing: ${pkgPath}`)
          } else {
            console.log(`✅ ${pkgPath}`)
          }
        }
      } catch (error) {
        this.warnings.push(`Could not validate pattern ${pattern}: ${error.message}`)
      }
    }
  }

  async validatePackageJson() {
    console.log('📦 Validating package.json...')
    
    try {
      const pkgPath = path.resolve(ROOT_DIR, 'package.json')
      const pkgContent = await fs.readFile(pkgPath, 'utf-8')
      const pkg = JSON.parse(pkgContent)
      
      // Check required fields
      const requiredFields = ['name', 'version', 'workspaces', 'scripts']
      for (const field of requiredFields) {
        if (!pkg[field]) {
          this.errors.push(`Missing required field in package.json: ${field}`)
        }
      }
      
      // Validate workspaces
      if (pkg.workspaces && Array.isArray(pkg.workspaces)) {
        for (const workspace of pkg.workspaces) {
          const workspaceExists = await this.checkFileExists(workspace.replace('/*', ''))
          if (!workspaceExists) {
            this.warnings.push(`Workspace directory missing: ${workspace}`)
          }
        }
      }
      
      console.log('✅ package.json validation passed')
    } catch (error) {
      this.errors.push(`Failed to validate package.json: ${error.message}`)
    }
  }

  async validateRegistry() {
    console.log('🏛️ Validating app registry...')
    
    try {
      const registryPath = path.resolve(ROOT_DIR, 'registry/apps.json')
      const registryContent = await fs.readFile(registryPath, 'utf-8')
      const registry = JSON.parse(registryContent)
      
      // Check registry structure
      if (!registry.apps || !Array.isArray(registry.apps)) {
        this.errors.push('Registry missing apps array')
        return
      }
      
      // Validate each app
      for (const app of registry.apps) {
        const requiredFields = ['id', 'name', 'version', 'status', 'port', 'path']
        for (const field of requiredFields) {
          if (!app[field]) {
            this.errors.push(`App ${app.id || 'unknown'} missing field: ${field}`)
          }
        }
        
        // Check if app directory exists
        if (app.path) {
          const appExists = await this.checkFileExists(app.path.substring(1)) // Remove leading /
          if (!appExists) {
            this.warnings.push(`App directory missing: ${app.path}`)
          }
        }
      }
      
      console.log(`✅ Registry validation passed (${registry.apps.length} apps)`)
    } catch (error) {
      this.errors.push(`Failed to validate registry: ${error.message}`)
    }
  }

  async validateGitHubWorkflows() {
    console.log('⚡ Validating GitHub workflows...')
    
    try {
      const workflowsDir = path.resolve(ROOT_DIR, '.github/workflows')
      const workflows = await fs.readdir(workflowsDir)
      
      if (workflows.length === 0) {
        this.warnings.push('No GitHub workflows found')
        return
      }
      
      for (const workflow of workflows) {
        if (workflow.endsWith('.yml') || workflow.endsWith('.yaml')) {
          const workflowPath = path.join(workflowsDir, workflow)
          const content = await fs.readFile(workflowPath, 'utf-8')
          
          // Basic YAML validation
          if (!content.includes('name:') || !content.includes('on:')) {
            this.warnings.push(`Workflow ${workflow} may be malformed`)
          }
          
          console.log(`✅ ${workflow}`)
        }
      }
    } catch (error) {
      this.errors.push(`Failed to validate workflows: ${error.message}`)
    }
  }

  async validateTypeScriptConfigs() {
    console.log('🔧 Validating TypeScript configurations...')
    
    try {
      // Check root tsconfig
      const rootTsConfig = await this.checkFileExists('tsconfig.json')
      if (!rootTsConfig) {
        this.errors.push('Root tsconfig.json missing')
      } else {
        console.log('✅ tsconfig.json')
      }
      
      // Check app tsconfigs
      const appsDir = path.resolve(ROOT_DIR, 'apps')
      const apps = await fs.readdir(appsDir)
      
      for (const app of apps) {
        const appTsConfig = await this.checkFileExists(`apps/${app}/tsconfig.json`)
        if (!appTsConfig) {
          this.warnings.push(`TypeScript config missing: apps/${app}/tsconfig.json`)
        } else {
          console.log(`✅ apps/${app}/tsconfig.json`)
        }
      }
    } catch (error) {
      this.warnings.push(`Could not validate TypeScript configs: ${error.message}`)
    }
  }

  async run() {
    console.log('🏛️ Cathedral Research - DevOps Protect Check\n')
    
    await this.loadProtectedFiles()
    await this.validateProtectedFiles()
    await this.validatePackageJson()
    await this.validateRegistry()
    await this.validateGitHubWorkflows()
    await this.validateTypeScriptConfigs()
    
    // Report results
    console.log('\n📊 Protect Check Results:')
    console.log(`✅ Protected files validated: ${this.protectedFiles.length}`)
    console.log(`⚠️  Warnings: ${this.warnings.length}`)
    console.log(`❌ Errors: ${this.errors.length}`)
    
    if (this.warnings.length > 0) {
      console.log('\n⚠️  Warnings:')
      this.warnings.forEach(warning => console.log(`   • ${warning}`))
    }
    
    if (this.errors.length > 0) {
      console.log('\n❌ Errors:')
      this.errors.forEach(error => console.log(`   • ${error}`))
      process.exit(1)
    }
    
    if (this.warnings.length > 0) {
      console.log('\n✨ Protect check completed with warnings')
      process.exit(0)
    }
    
    console.log('\n✨ All protect checks passed!')
    process.exit(0)
  }
}

// Run the protect check
const checker = new ProtectCheck()
checker.run().catch(error => {
  console.error('💥 Protect check failed:', error)
  process.exit(1)
})