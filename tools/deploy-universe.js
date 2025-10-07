#!/usr/bin/env node
/**
 * 🚀 Cathedral Universe Deployment System
 * Deploys the complete immersive experience to bekalah.github.io
 */

import { execSync } from 'child_process';
import { existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🚀 Deploying Cathedral Universe to bekalah.github.io...');

try {
  // Check if build exists
  const buildDir = join(__dirname, '../gh-pages-deployment');
  if (!existsSync(buildDir)) {
    console.log('📦 Build not found, building first...');
    execSync('pnpm run build:universe', { stdio: 'inherit' });
  }

  // Deploy to GitHub Pages
  console.log('🌐 Deploying to GitHub Pages...');
  execSync('gh-pages -d gh-pages-deployment -m "✨ Deploy Cathedral Universe - Immersive Creative Platform"', {
    stdio: 'inherit'
  });

  console.log('🎉 Cathedral Universe successfully deployed!');
  console.log('🌍 Live at: https://bekalah.github.io');
  console.log('🏛️ Immersive experience ready for exploration');

} catch (error) {
  console.error('❌ Deployment failed:', error.message);

  if (error.message.includes('gh-pages')) {
    console.log('💡 Make sure you have gh-pages installed: npm install -g gh-pages');
  }

  process.exit(1);
}
