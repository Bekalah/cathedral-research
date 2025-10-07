#!/usr/bin/env node
/**
 * ✨ Cathedral Universe Quality Assurance
 * Ensures all systems meet the highest standards
 */

import { execSync } from 'child_process';
import { existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('✨ Running Cathedral Universe Quality Assurance...');

const checks = [
  {
    name: 'TypeScript Compilation',
    command: 'pnpm run type-check',
    critical: true
  },
  {
    name: 'ESLint Code Quality',
    command: 'pnpm run lint',
    critical: true
  },
  {
    name: 'Build Verification',
    command: 'pnpm run build:verify',
    critical: true
  },
  {
    name: 'Dependency Audit',
    command: 'pnpm audit',
    critical: false
  }
];

let allPassed = true;

for (const check of checks) {
  try {
    console.log(`🔍 Running ${check.name}...`);
    execSync(check.command, { stdio: 'inherit' });
    console.log(`✅ ${check.name} passed`);
  } catch (error) {
    console.error(`❌ ${check.name} failed`);
    if (check.critical) {
      allPassed = false;
    }
  }
}

// Check for required files
const requiredFiles = [
  'index.html',
  'package.json',
  'pnpm-workspace.yaml',
  'apps/cathedral-hub/dist',
  'packages/p5-codex-engine/dist',
  'shared/styles'
];

console.log('📁 Checking required files...');
requiredFiles.forEach(file => {
  const filePath = join(__dirname, '..', file);
  if (existsSync(filePath)) {
    console.log(`✅ ${file} exists`);
  } else {
    console.warn(`⚠️ ${file} missing`);
    allPassed = false;
  }
});

if (allPassed) {
  console.log('🎉 All quality checks passed!');
  console.log('🏛️ Cathedral Universe is ready for immersive experiences');
} else {
  console.error('❌ Some quality checks failed');
  console.log('🔧 Please fix the issues above before deploying');
  process.exit(1);
}
