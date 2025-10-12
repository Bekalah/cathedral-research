#!/usr/bin/env bun

/**
 * 🏛️ Cathedral Packages Optimization Script
 * 
 * Organizes and optimizes the packages directory for better performance
 */

import { execSync } from 'bun';
import { readdir, stat, mkdir, rename, unlink } from 'fs/promises';
import { join, dirname } from 'path';

class PackageOptimizer {
  constructor() {
    this.baseDir = join(process.cwd(), 'packages');
    this.organizedStructure = {
      // Core shared libraries
      'shared': {
        'ui': 'Shared UI components',
        'utils': 'Utility functions', 
        'types': 'TypeScript type definitions',
        'constants': 'Application constants'
      },
      
      // Feature packages
      'features': {
        'auth': 'Authentication system',
        'api': 'API client libraries',
        'database': 'Database utilities',
        'analytics': 'Analytics and tracking'
      },
      
      // Tool packages
      'tools': {
        'build': 'Build tools and scripts',
        'dev': 'Development utilities',
        'testing': 'Testing frameworks',
        'deployment': 'Deployment configurations'
      }
    };
  }

  async analyzeCurrentStructure() {
    console.log('�� Analyzing current packages structure...');
    
    if (!(await this.directoryExists(this.baseDir))) {
      console.log('❌ Packages directory not found');
      return null;
    }
    
    const items = await readdir(this.baseDir);
    console.log(`📊 Found ${items.length} items in packages directory`);
    
    const analysis = {
      files: [],
      directories: [],
      nodeModules: [],
      duplicates: []
    };
    
    for (const item of items) {
      const itemPath = join(this.baseDir, item);
      const stats = await stat(itemPath);
      
      if (stats.isFile()) {
        analysis.files.push({
          name: item,
          size: stats.size,
          path: itemPath
        });
      } else if (stats.isDirectory()) {
        analysis.directories.push({
          name: item,
          path: itemPath,
          size: await this.getDirectorySize(itemPath)
        });
      }
    }
    
    return analysis;
  }

  async getDirectorySize(dirPath) {
    let totalSize = 0;
    
    try {
      const items = await readdir(dirPath);
      
      for (const item of items) {
        const itemPath = join(dirPath, item);
        const stats = await stat(itemPath);
        
        if (stats.isFile()) {
          totalSize += stats.size;
        } else if (stats.isDirectory()) {
          totalSize += await this.getDirectorySize(itemPath);
        }
      }
    } catch (error) {
      console.warn(`Warning: Could not read directory ${dirPath}`);
    }
    
    return totalSize;
  }

  async directoryExists(path) {
    try {
      await stat(path);
      return true;
    } catch {
      return false;
    }
  }

  async createOrganizedStructure() {
    console.log('��️ Creating organized directory structure...');
    
    for (const [category, subdirs] of Object.entries(this.organizedStructure)) {
      const categoryPath = join(this.baseDir, category);
      
      if (!(await this.directoryExists(categoryPath))) {
        await mkdir(categoryPath, { recursive: true });
        console.log(`✅ Created ${category}/`);
      }
      
      for (const subdir of Object.keys(subdirs)) {
        const subdirPath = join(categoryPath, subdir);
        
        if (!(await this.directoryExists(subdirPath))) {
          await mkdir(subdirPath, { recursive: true });
          console.log(`  ✅ Created ${category}/${subdir}/`);
        }
      }
    }
  }

  async moveExistingPackages(analysis) {
    console.log('�� Moving existing packages to organized structure...');
    
    for (const dir of analysis.directories) {
      // Skip if it's already a proper package
      if (this.isProperPackage(dir.name)) {
        console.log(`⏭️ Skipping ${dir.name} (already organized)`);
        continue;
      }
      
      // Determine where to move it
      const targetLocation = this.determineTargetLocation(dir.name);
      
      if (targetLocation) {
        const newPath = join(this.baseDir, targetLocation, dir.name);
        
        try {
          // Create target directory if it doesn't exist
          const targetDir = dirname(newPath);
          if (!(await this.directoryExists(targetDir))) {
            await mkdir(targetDir, { recursive: true });
          }
          
          // Move the directory
          await rename(dir.path, newPath);
          console.log(`✅ Moved ${dir.name} to ${targetLocation}/${dir.name}`);
        } catch (error) {
          console.error(`❌ Failed to move ${dir.name}:`, error.message);
        }
      } else {
        console.log(`⏭️ Keeping ${dir.name} in current location`);
      }
    }
  }

  isProperPackage(dirName) {
    const properPackages = [
      'ui-components', 'shared', 'features', 'tools',
      'art-engine', 'synthesis-engine', 'three-engine'
    ];
    
    return properPackages.includes(dirName);
  }

  determineTargetLocation(packageName) {
    // Map package names to categories
    const categoryMap = {
      'ui': 'shared/ui',
      'components': 'shared/ui',
      'utils': 'shared/utils',
      'types': 'shared/types',
      'constants': 'shared/constants',
      'auth': 'features/auth',
      'api': 'features/api',
      'database': 'features/database',
      'build': 'tools/build',
      'dev': 'tools/dev',
      'testing': 'tools/testing',
      'deployment': 'tools/deployment'
    };
    
    // Check for keyword matches
    for (const [keyword, location] of Object.entries(categoryMap)) {
      if (packageName.toLowerCase().includes(keyword)) {
        return location;
      }
    }
    
    return null; // Keep in current location
  }

  async cleanupUnnecessaryFiles(analysis) {
    console.log('🧹 Cleaning up unnecessary files...');
    
    const filesToRemove = [
      'package-lock.json', // Use pnpm-lock.yaml instead
      '*.log',
      '.DS_Store',
      'Thumbs.db'
    ];
    
    for (const file of analysis.files) {
      const shouldRemove = filesToRemove.some(pattern => {
        if (pattern.includes('*')) {
          const ext = pattern.replace('*', '');
          return file.name.endsWith(ext);
        }
        return file.name === pattern;
      });
      
      if (shouldRemove) {
        try {
          await unlink(file.path);
          console.log(`🗑️ Removed ${file.name}`);
        } catch (error) {
          console.error(`❌ Failed to remove ${file.name}:`, error.message);
        }
      }
    }
  }

  async generateReport(analysis) {
    console.log('\n📊 Optimization Report Generated');
    console.log('='.repeat(50));
    console.log(`Total files: ${analysis.files.length}`);
    console.log(`Total directories: ${analysis.directories.length}`);
    
    const totalSize = analysis.directories.reduce((sum, dir) => sum + dir.size, 0);
    console.log(`Total size: ${this.formatBytes(totalSize)}`);
    
    console.log('\nTop 10 largest directories:');
    analysis.directories
      .sort((a, b) => b.size - a.size)
      .slice(0, 10)
      .forEach((dir, index) => {
        console.log(`${index + 1}. ${dir.name}: ${this.formatBytes(dir.size)}`);
      });
  }

  formatBytes(bytes) {
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 Bytes';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  }

  async run() {
    console.log('🏛️ Starting Cathedral Packages Optimization...\n');
    
    try {
      // Analyze current structure
      const analysis = await this.analyzeCurrentStructure();
      if (!analysis) return;
      
      // Create organized structure
      await this.createOrganizedStructure();
      
      // Move existing packages
      await this.moveExistingPackages(analysis);
      
      // Clean up unnecessary files
      await this.cleanupUnnecessaryFiles(analysis);
      
      // Generate report
      await this.generateReport(analysis);
      
      console.log('\n✅ Optimization completed successfully!');
      console.log('🚀 Your packages directory is now properly organized.');
      
    } catch (error) {
      console.error('❌ Optimization failed:', error);
    }
  }
}

// Run optimization if this script is executed directly
if (import.meta.main) {
  const optimizer = new PackageOptimizer();
  optimizer.run();
}
