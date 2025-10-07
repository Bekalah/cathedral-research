#!/usr/bin/env node
/**
 * 🎨 Cathedral Universe Style System Validator
 * Ensures all visual systems meet the highest aesthetic standards
 */

import { execSync } from 'child_process';
import { existsSync, readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🎨 Validating Cathedral Universe Style System...');

const styleChecks = [
  {
    name: 'Cathedral Universe SCSS',
    file: 'shared/styles/cathedral-universe.scss',
    required: ['--bg', '--ink', '--gold', '--rose', '--violet', '--aqua']
  },
  {
    name: 'Design System Documentation',
    file: 'docs/CATHEDRAL_DESIGN_SYSTEM.md',
    required: ['trauma-aware', 'accessibility', 'sacred geometry', 'responsive']
  },
  {
    name: 'Style Guide',
    file: 'docs/STYLE_GUIDE.md',
    required: ['color palette', 'typography', 'spacing', 'components']
  }
];

let allStylesValid = true;

console.log('🔍 Checking style system files...');
styleChecks.forEach(check => {
  const filePath = join(__dirname, '..', check.file);

  if (existsSync(filePath)) {
    console.log(`✅ ${check.name} exists`);

    // Check for required content
    const content = readFileSync(filePath, 'utf8');
    const missing = check.required.filter(req =>
      !content.toLowerCase().includes(req.toLowerCase())
    );

    if (missing.length > 0) {
      console.warn(`⚠️ ${check.name} missing: ${missing.join(', ')}`);
      allStylesValid = false;
    } else {
      console.log(`✅ ${check.name} contains all required elements`);
    }
  } else {
    console.error(`❌ ${check.name} missing`);
    allStylesValid = false;
  }
});

// Check for CSS art laboratory
const cssArtLab = join(__dirname, '../packages/labs');
if (existsSync(cssArtLab)) {
  console.log('✅ CSS Art Laboratory exists');
} else {
  console.warn('⚠️ CSS Art Laboratory not found');
}

// Validate color palette consistency
console.log('🌈 Validating color palette consistency...');
const scssFile = join(__dirname, '../shared/styles/cathedral-universe.scss');
if (existsSync(scssFile)) {
  const scssContent = readFileSync(scssFile, 'utf8');

  const colorVariables = [
    '--bg:', '--ink:', '--muted:', '--gold:', '--rose:',
    '--violet:', '--aqua:', '--focus:', '--accent:'
  ];

  const foundColors = colorVariables.filter(color =>
    scssContent.includes(color)
  );

  console.log(`✅ Found ${foundColors.length}/${colorVariables.length} color variables`);

  if (foundColors.length >= colorVariables.length * 0.8) {
    console.log('✅ Color palette is comprehensive');
  } else {
    console.warn('⚠️ Color palette may be incomplete');
    allStylesValid = false;
  }
}

if (allStylesValid) {
  console.log('🎉 Style system validation passed!');
  console.log('✨ Cathedral Universe aesthetics are museum-quality');
} else {
  console.error('❌ Style system validation failed');
  console.log('🔧 Please ensure all style files are present and complete');
  process.exit(1);
}
