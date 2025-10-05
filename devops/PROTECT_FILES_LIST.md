# Cathedral Research - Protected Files List
# Files that require special CI protection and validation

## Core Configuration Files
package.json
tsconfig.json
vite.config.js
jest.config.js
.github/workflows/*

## Registry and Manifests  
registry/apps.json
apps/*/package.json
apps/*/manifest.json
packages/*/package.json

## Critical Application Files
apps/cathedral-hub/src/App.tsx
apps/stone-grimoire/src/App.tsx
apps/cathedral-of-circuits/src/main.jsx

## Package Entry Points
packages/*/src/index.ts
packages/*/src/index.js

## Build and Deployment
.github/workflows/deploy.yml
Dockerfile
docker-compose.yml

## Documentation
README.md
CHANGELOG.md
docs/architecture.md

## Security and Environment
.env.example
.gitignore
.gitattributes

## Monorepo Structure
.vscode/settings.json
.husky/*
.github/CODEOWNERS

# Protection Rules:
# 1. Changes to these files require review
# 2. Automated tests must pass
# 3. Version compatibility checks required
# 4. Deployment readiness validation
# 5. Cross-app dependency impact analysis