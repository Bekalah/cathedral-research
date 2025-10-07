# Cathedral Monorepo — AI Coding Agent Instructions

## Big Picture Architecture
- This is a unified monorepo for mystical computing, art, music, and consciousness research.
- Major apps: `arcanae-lab`, `cathedral-hub`, `cathedral-of-circuits`, `stone-grimoire`, `synth-art-studio`, `cyoa-engine` (see `apps/`).
- Core packages: `liber-arcanae-modular`, `codex-engine`, `sound-kernel`, `art-engine`, `three-engine`, etc. (see `packages/`).
- Registry and standards: `registry/`, `CATHEDRAL_GOLDEN_RULE.md`, `arcanae-lab/data/style-requests.json`.
- Data flows: Apps and packages communicate via shared JSON data, modular APIs, and asset pipelines. Codex nodes, archetypes, and musical motifs are defined in JSON and referenced across modules.

## Developer Workflows
- Always run `./scripts/system-health-check.sh` before any update, build, or deployment. This script verifies builds, connections, and standards.
- Install dependencies: `pnpm install` (pnpm is required).
- Build all apps: `pnpm run build` (or `pnpm run build:apps` for just apps).
- Start dev server: `pnpm run dev` (or `pnpm run dev:hub`, etc. for individual apps).
- Quality checks: `pnpm run quality:check` (lint, type-check, standards).
- Deploy: `pnpm run deploy` (GitHub Pages), or see `.github/workflows/` for CI/CD.

## Project-Specific Conventions
- All code must be ND-safe, trauma-aware, and accessible (see `PROTECT.md`, `SYSTEM_STANDARDS_PLAN.md`).
- Data (archetypes, codex nodes, motifs) is stored in JSON, not hardcoded.
- Modular architecture: UI and logic are componentized and reusable. Use shared hooks and packages.
- Real-source fidelity: Any claim of "inspired by" or "modeled after" must match the real reference in detail and quality (see Golden Rule).
- All creative, technical, and aesthetic work must follow `CATHEDRAL_GOLDEN_RULE.md`.

## Integration Points & External Dependencies
- Apps/packages connect via shared data, asset pipelines, and registry files.
- External dependencies: Vite, React, Three.js, Tone.js, pnpm, GitHub Actions.
- Codex modules and musical systems use JSON schemas (`CODEX_SCHEMA.json`) and enrichment scripts.
- System health check script (`scripts/system-health-check.sh`) is the entry point for all updates.

## Key Files & Directories
- `README.md` — Main project overview, quick start, and standards.
- `CATHEDRAL_GOLDEN_RULE.md` — Permanent master standard for all work.
- `scripts/system-health-check.sh` — Run first for any update.
- `apps/` — Main applications.
- `packages/` — Core packages and engines.
- `registry/` — Archetype, ray, and codex registries.
- `arcanae-lab/data/style-requests.json` — Style and material standards.
- `.github/workflows/` — CI/CD and deploy workflows.

## Example Patterns
- Modular archetype and codex logic: See `liber-arcanae-modular`, `codex-engine`, and `arcanae-lab` for JSON-driven archetype and tarot logic.
- Asset/data pipelines: See `assets/`, `arcanae-lab/data/`, and enrichment scripts in `codex-engine`.
- ND-safe UI: All UI components must respect accessibility and ND-safety (see `PROTECT.md`).

---

For any coding agent, always reference `CATHEDRAL_GOLDEN_RULE.md` and run `scripts/system-health-check.sh` before making changes. When in doubt, check the main `README.md` and standards files for guidance.
