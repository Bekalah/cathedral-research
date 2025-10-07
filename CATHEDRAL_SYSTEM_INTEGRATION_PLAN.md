# Cathedral System Integration Plan

## Purpose
This document provides a unified, actionable plan for deep integration of all immersive systems in the Cathedral monorepo. It is designed for agents, contributors, and maintainers to ensure discoverability, modular remixing, and robust creative output across all apps and packages.

---

## 1. Modular Tarot & Codex System
- **Source:** `packages/liber-arcanae-modular`
- **Features:**
  - Each tarot card is a self-contained module (`ArcanaeModule`)
  - Codex 144:99 node links, real dataset connectors, art/sound/game asset export
  - Interactive p5.js visualizations, Tone.js soundscapes
- **Action:**
  - Reference and extend `ArcanaeModule` for new archetypes, datasets, and creative logic
  - Ensure all new modules link to codex nodes and registry archetypes

## 2. System Interconnection & Event Routing
- **Source:** `packages/tesseract-bridge/ConnectionMatrix.js`
- **Features:**
  - Maps all engines, apps, tools, and their relationships
  - Event bus for cross-system communication and shared state
  - Health monitoring and diagnostics
- **Action:**
  - Register new systems and connections in the matrix
  - Use event bus for inter-app/game/tool communication
  - Monitor system health and resolve integration issues

## 3. Codex Node Schema & Archetype Logic
- **Source:** `packages/codex-engine/CODEX_SCHEMA.json`
- **Features:**
  - Node structure: numerology, geometry, element, overlays, teaching function
  - Archetype/worker logic for RPG/game and creative output
- **Action:**
  - Map new archetypes, game characters, and creative functions to codex nodes
  - Validate all node data against schema

## 4. Registry & Canonical Data
- **Source:** `registry/arcana/*.json`, `registry/rays/phenomenological_vector.json`
- **Features:**
  - Locked, append-only JSON for each archetype/tarot/ray
  - Lineage, guardian, harmonics, daimon, invocation, manifest
- **Action:**
  - Add new archetypes/rays via registry JSON, never overwrite existing
  - Reference registry data in all creative/game logic

## 5. App & Package Interconnection
- **Source:** `registry/apps.json`
- **Features:**
  - All apps/packages mapped for modular remixing and RPG/game logic
  - Professional creative output and dataset pipelines
- **Action:**
  - Document and validate cross-app connections
  - Expose APIs for asset/data pipelines and mod loader logic

## 6. Standards & Agent Instructions
- **Source:** `CATHEDRAL_GOLDEN_RULE.md`, `.github/copilot-instructions.md`, `PROTECT.md`, `SYSTEM_STANDARDS_PLAN.md`
- **Features:**
  - Permanent standards for ND-safety, trauma-aware, accessible, and real-source fidelity
  - Actionable instructions for all agents and contributors
- **Action:**
  - Reference Golden Rule and standards in all new code, docs, and workflows
  - Update copilot-instructions.md as new integration points are added

---

## Immediate Next Steps
1. Validate all archetype/worker logic and codex node mappings
2. Document cross-app communication and asset/data pipelines
3. Expose mod loader and remixing APIs for RPG/game integration
4. Update standards and agent instructions for full discoverability

---

_Last updated: 2025-10-07_
