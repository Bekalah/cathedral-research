#!/usr/bin/env node
/**
 * 🔄 Cathedral Universe Sync System
 * Keeps all systems synchronized and up-to-date
 */

import { execSync } from 'child_process';
import { existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🔄 Syncing Cathedral Universe systems...');

try {
  // Update all dependencies
  console.log('📦 Updating dependencies...');
  execSync('pnpm update --latest', { stdio: 'inherit' });

  // Clean and reinstall to ensure consistency
  console.log('🧹 Cleaning and reinstalling...');
  execSync('pnpm install --frozen-lockfile', { stdio: 'inherit' });

  // Run type checking
  console.log('🔍 Running type checks...');
  execSync('pnpm run type-check', { stdio: 'inherit' });

  // Run linting
  console.log('✨ Running linting...');
  execSync('pnpm run lint', { stdio: 'inherit' });

  // Build all packages
  console.log('🔨 Building all packages...');
  execSync('pnpm run build:packages', { stdio: 'inherit' });

  // Build all apps
  console.log('🏗️ Building all applications...');
  execSync('pnpm run build:apps', { stdio: 'inherit' });

  // Verify everything is working
  console.log('✅ Verifying system integrity...');
  execSync('pnpm run build:verify', { stdio: 'inherit' });

  console.log('🎉 Cathedral Universe synchronization complete!');
  console.log('✨ All systems are now synchronized and ready');

} catch (error) {
  console.error('❌ Universe sync failed:', error.message);
  console.log('🔧 Run individual sync steps manually if needed');
  process.exit(1);
}
