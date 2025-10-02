# 🏛️ CATHEDRAL RESEARCH ARCHIVE - REDIRECT TO MAIN

## ⚠️ IMPORTANT: THIS IS NOT THE MAIN REPOSITORY ⚠️

**You are currently in the RESEARCH ARCHIVE, not the production system.**

---

## 🎯 MAIN CATHEDRAL REPOSITORY
**Production Location:** `/Users/rebeccalemke/cathedral/`

```bash
cd /Users/rebeccalemke/cathedral
```

---

## 📁 PROPER FILE ORGANIZATION

### Production Structure (USE THIS):
```
/Users/rebeccalemke/cathedral/
├── packages/              # Modular Trinity components
│   ├── circuitum99/       # Soul: RPG + Tarot system
│   ├── stone-grimoire/    # Body: Art + Teaching realm  
│   ├── cosmogenesis-learning-engine/ # Spirit: Brain expansion
│   ├── tesseract-bridge/  # Cross-app integration
│   └── liber-arcanae/     # RPG engine + datasets
├── apps/                  # Standalone applications
├── infrastructure/        # Deployment + DevOps
├── automation/           # Build + maintenance scripts
├── data/                 # Datasets + content
├── docs/                 # Documentation
└── archive/              # Deprecated code
```

### Research Archive (CONSOLIDATE TO MAIN):
```
cathedral-research/        # Archive location - consolidate to main
├── BUILDING CATHEDRALS/   # → Move to /infrastructure/
├── research/              # → Archive old, move useful to /data/
└── scattered files        # → Organize by function to main repo
```

---

## 🔄 AI/DEVELOPER WORKFLOW

### If Working in Research Folder:
1. **STOP** - Navigate to main repository first
2. **Check** if component exists in `/packages/`
3. **Use modular standards** - each package standalone + integrated
4. **Follow Trinity Architecture** - Soul/Body/Spirit design

### Commands to Switch:
```bash
# Navigate to main repository
cd /Users/rebeccalemke/cathedral

# Check current packages
ls packages/

# Start development in proper location
npm run dev
```

---

## 🏗️ MODULAR CODE STANDARDS

### Package Design Rules:
- **Standalone:** Each package works independently
- **Integrated:** Uses tesseract-bridge for cross-app features
- **Trinity Architecture:** Soul (Circuitum99) + Body (Stone Grimoire) + Spirit (Cosmogenesis)
- **Modern Tooling:** Vite, TypeScript, modular CSS

### File Organization:
```
packages/[component]/
├── index.html             # Entry point
├── src/
│   ├── main.js           # Core logic
│   ├── components/       # Reusable modules
│   └── integration/      # Bridge connections
├── data/                 # Component datasets
├── docs/                 # Component documentation
└── package.json          # Dependencies + scripts
```

---

## 🚀 DEPLOYMENT STANDARDS

### Build Pipeline:
```bash
# From main repository root
npm run build              # Build all packages
npm run deploy             # Deploy to production
npm run test               # Run integration tests
```

### Infrastructure Location:
- **Deployment scripts:** `/infrastructure/deployment/`
- **Automation:** `/automation/`
- **Monitoring:** `/monitoring/`

---

## 📋 QUICK CHECKLIST

- [ ] Am I in `/Users/rebeccalemke/cathedral/`?
- [ ] Does this component exist in `/packages/`?
- [ ] Am I following Trinity Architecture?
- [ ] Is code modular + integrated?
- [ ] Are builds working from main repo?

---

## 🆘 EMERGENCY RESET

If confused about file locations:

```bash
# Navigate to main
cd /Users/rebeccalemke/cathedral

# Check structure
tree -L 2

# See available packages
ls packages/

# Start fresh development
npm install && npm run dev
```

---

**Remember: Research folder = Archive. Main cathedral = Production.**
**Always work in main repository for active development.**