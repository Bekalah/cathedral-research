# Cathedral Master Plan

A layered, interconnected map of the Cathedral of Circuits monorepo, apps, engines, and datasets. This document consolidates all architecture, integration, and data flows for clarity and depth.

---

## Layer Overview
- **Soul:** circuitum99 (Book game, 99 gates, 144 lattice)
- **Body:** stone-grimoire (Geometry, chapels, archive, octagram halls)
- **Spirit:** cathedral-main (Consciousness, ND-friendly, accessibility)
- **Brain:** cosmogenesis-learning-engine (Learning, evolution, spiral map)
- **Navigation:** magical-mystery-house (Portal, extended universe)
- **Tarot:** liber-arcanae (Living deck, archetypal navigation)
- **Synth Lab:** synthesis-laboratory (10 rooms, music/art creation)
- **Museum:** master-catalog-browser (Spiritual resources, trauma safety)
- **Visualizer:** cosmogenesis-visualizer (World building, sacred geometry)

---

## App Map
- Each app is a modular layer, connected via shared data contracts and integration engines.
- See `/apps/` for all app folders and `/packages/` for shared engines/data.

---

## Data Contracts
| Dataset                | Location                        | Description                       | Used By                |
|------------------------|---------------------------------|------------------------------------|------------------------|
| codex144/nodes.json    | /packages/data/codex144/        | Sacred mathematics registry        | All apps               |
| angels-72.json         | /assets/angels-72/              | Shem ha-Mephorash registry         | Tarot, soul, spirit    |
| demons-72.json         | /packages/data/codex-144/       | Goetia system                     | Tarot, soul            |
| spine33.json           | /packages/data/codex-144/       | Vertebrae architecture            | Soul, body             |
| stylepacks.json        | /assets/stylepacks/              | Museum-quality skins               | All apps               |
| health-lattice-data.json| /assets/health-lattice/         | Wellness tracking                  | Museum, main           |
| grimoire-concepts.json | /assets/grimoire-concepts/      | Universal correspondences          | Body, tarot, main      |

---

## Engine Systems
- **Ambient Engine:** ND-safe audio, cathedral reverb
- **Cymatic Engine:** Visual patterns responding to sound
- **Style Engine:** Cultural flavor packs and theming
- **Cathedral Engine:** Room management and transitions
- **Ritual Engine:** Banish/Center/Depart protocols
- **Tesseract Bridge:** Cross-component communication

---

## Integration Flows
1. **Foundation:** Create monorepo structure, import all apps/packages, set up shared data contracts
2. **Integration:** Connect all apps via Tesseract Bridge, ensure shared data access, activate protection seals
3. **Advanced:** Deploy trauma-safe, ND-friendly, and accessibility features; museum-grade documentation
4. **Deployment:** Unified build system, CI/CD workflows, Cloudflare deployment

---

## Trauma-Safe & ND Features
- All UI layers follow trauma-informed, ND-friendly, and accessibility standards
- See `/docs/architecture/trauma-safety.md` for protocols

---

## Accessibility Matrix
| App/Layer              | Keyboard | Screen Reader | Color Contrast | Trauma-Safe |
|-----------------------|----------|--------------|---------------|-------------|
| cathedral-main        |   ✅     |     ✅       |      ✅        |     ✅      |
| circuitum99           |   ✅     |     ✅       |      ✅        |     ✅      |
| stone-grimoire        |   ✅     |     ✅       |      ✅        |     ✅      |
| cosmogenesis          |   ✅     |     ✅       |      ✅        |     ✅      |
| synth-lab             |   ✅     |     ✅       |      ✅        |     ✅      |
| museum                |   ✅     |     ✅       |      ✅        |     ✅      |

---

## See Also
- `/docs/integration/INTEGRATION_MASTER_PLAN.md`
- `/docs/api/`
- `/assets/data/README.md`
