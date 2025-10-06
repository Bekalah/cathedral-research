# Cathedral Data Registry

This README describes all core datasets in the Cathedral monorepo, their schemas, and how each app and engine uses them. Cross-linked for clarity and depth.

---

## Datasets

### codex144/nodes.json
- **Location:** /packages/data/codex144/
- **Schema:** Node ID, archetype, numerology, correspondences
- **Used by:** All apps (navigation, game logic, visualization)

### angels-72.json
- **Location:** /assets/angels-72/
- **Schema:** Angel name, attributes, codex link
- **Used by:** Tarot, soul, spirit layers

### demons-72.json
- **Location:** /packages/data/codex-144/
- **Schema:** Demon name, attributes, codex link
- **Used by:** Tarot, soul

### spine33.json
- **Location:** /packages/data/codex-144/
- **Schema:** Vertebrae number, symbolism, codex link
- **Used by:** Soul, body

### stylepacks.json
- **Location:** /assets/stylepacks/
- **Schema:** Palette, motif, texture, font
- **Used by:** All apps (visual theming)

### health-lattice-data.json
- **Location:** /assets/health-lattice/
- **Schema:** Node, metric, value, timestamp
- **Used by:** Museum, main

### grimoire-concepts.json
- **Location:** /assets/grimoire-concepts/
- **Schema:** Concept, correspondence, codex link
- **Used by:** Body, tarot, main

---

## Cross-App Usage
- All datasets are accessible via shared data contracts in `/packages/data/` and `/assets/`.
- Engines and apps import datasets for navigation, visualization, healing, and game logic.

---

## See Also
- `/docs/architecture/MASTER_PLAN.md`
- `/docs/integration/INTEGRATION_MASTER_PLAN.md`
