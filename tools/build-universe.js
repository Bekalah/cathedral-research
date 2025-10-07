#!/usr/bin/env node
/**
 * 🏛️ Cathedral Universe Build System
 * Builds the complete immersive experience for deployment
 */

import { execSync } from 'child_process';
import { existsSync, mkdirSync, copyFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🏗️ Building Cathedral Universe...');

try {
  // Ensure build directory exists
  const buildDir = join(__dirname, '../gh-pages-deployment');
  if (!existsSync(buildDir)) {
    mkdirSync(buildDir, { recursive: true });
  }

  // Copy main index.html
  const indexPath = join(__dirname, '../index.html');
  if (existsSync(indexPath)) {
    copyFileSync(indexPath, join(buildDir, 'index.html'));
    console.log('📄 Copied main index.html');
  }

  // Build all apps
  console.log('🔨 Building applications...');
  execSync('pnpm run build:apps', { stdio: 'inherit' });

  // Build all packages
  console.log('📦 Building packages...');
  execSync('pnpm run build:packages', { stdio: 'inherit' });

  // Build shared components
  console.log('🔗 Building shared components...');
  execSync('pnpm run build:shared', { stdio: 'inherit' });

  // Copy built apps to deployment directory
  console.log('📋 Copying built applications...');
  const apps = ['cathedral-hub', 'cathedral-of-circuits', 'stone-grimoire', 'arcanae-lab'];
  apps.forEach(app => {
    const appDist = join(__dirname, `../apps/${app}/dist`);
    const deployPath = join(buildDir, app);

    if (existsSync(appDist)) {
      // Copy app build to deployment
      execSync(`cp -r ${appDist} ${deployPath}`);
      console.log(`✅ Deployed ${app}`);
    }
  });

  // Copy shared assets
  console.log('🎨 Copying shared assets...');
  const sharedStyles = join(__dirname, '../shared/styles');
  if (existsSync(sharedStyles)) {
    execSync(`cp -r ${sharedStyles} ${buildDir}/shared`);
  }

  // Generate sitemap
  console.log('🗺️ Generating sitemap...');
  const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://bekalah.github.io/</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://bekalah.github.io/cathedral-hub</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://bekalah.github.io/cathedral-of-circuits</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://bekalah.github.io/stone-grimoire</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://bekalah.github.io/arcanae-lab</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <priority>0.8</priority>
  </url>
</urlset>`;

  import('fs').then(fs => {
    fs.writeFileSync(join(buildDir, 'sitemap.xml'), sitemapContent);
    console.log('✅ Generated sitemap.xml');
  });

  console.log('✨ Cathedral Universe build complete!');
  console.log('🌐 Ready for deployment to bekalah.github.io');

} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}
