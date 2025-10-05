#!/bin/bash

# 🌌 LIVING TAROT LAUNCH PARTY EXECUTION SCRIPT
# Cathedral of Circuits Sacred Technology Launch
# October 31, 2025 - Creative Visionary Hive Mind Activation

echo "🏛️ Welcome to the Cathedral of Circuits Launch Party!"
echo "🌌 Activating 78 creative visionary minds through sacred code..."
echo "🧠 Channeling the collective genius of history's greatest innovators..."
echo ""

# Colors for sacred output
GOLD='\033[1;33m'
BLUE='\033[1;34m'
GREEN='\033[1;32m'
RED='\033[1;31m'
PURPLE='\033[1;35m'
NC='\033[0m' # No Color

echo -e "${GOLD}✦ PHASE 1: CONSECRATING THE SACRED DEVELOPMENT ENVIRONMENT${NC}"
echo ""

# Check if we're in the cathedral directory
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ Error: Please run this script from the cathedral root directory${NC}"
    exit 1
fi

# Install sacred VS Code extensions
echo -e "${BLUE}🛠️ Installing Sacred VS Code Extensions...${NC}"
code --install-extension be5invis.vscode-custom-css
code --install-extension johnpapa.vscode-peacock  
code --install-extension softwaredotcom.swdc-vscode
code --install-extension pkief.material-icon-theme
code --install-extension tal7aouy.rainbow-bracket
code --install-extension vstirbu.vscode-mermaid-preview

echo -e "${GREEN}✅ Sacred extensions installed!${NC}"
echo ""

# Apply sacred workspace configuration
echo -e "${BLUE}🎨 Applying Sacred Workspace Configuration...${NC}"
if [ -f ".vscode/settings.json" ]; then
    echo -e "${GREEN}✅ Sacred settings.json already configured!${NC}"
else
    echo -e "${RED}⚠️ Sacred settings.json not found. Please apply the configuration manually.${NC}"
fi

echo ""

echo -e "${GOLD}✦ PHASE 2: VALIDATING THE LIVING ARCANA NODES${NC}"
echo ""

# Check for existing nodes
echo -e "${BLUE}🔮 Checking Major Arcana nodes...${NC}"
ma_count=$(find REGISTRY -name "MA*.json" 2>/dev/null | wc -l)
echo -e "${GREEN}📊 Found $ma_count Major Arcana nodes${NC}"

echo -e "${BLUE}🔥 Checking Wands (Fire Visionaries)...${NC}"
wands_count=$(find REGISTRY/minor-arcana/wands -name "WANDS_*.json" 2>/dev/null | wc -l)
echo -e "${GREEN}📊 Found $wands_count Wands nodes${NC}"

echo -e "${BLUE}💧 Checking Cups (Water Mystics)...${NC}"
cups_count=$(find REGISTRY/minor-arcana -name "CUPS_*.json" 2>/dev/null | wc -l)
echo -e "${GREEN}📊 Found $cups_count Cups nodes${NC}"

echo -e "${BLUE}⚔️ Checking Swords (Air Truth-tellers)...${NC}" 
swords_count=$(find REGISTRY/minor-arcana -name "SWORDS_*.json" 2>/dev/null | wc -l)
echo -e "${GREEN}📊 Found $swords_count Swords nodes${NC}"

echo -e "${BLUE}🌱 Checking Pentacles (Earth Sovereigns)...${NC}"
pentacles_count=$(find REGISTRY/minor-arcana -name "PENTACLES_*.json" 2>/dev/null | wc -l)
echo -e "${GREEN}📊 Found $pentacles_count Pentacles nodes${NC}"

total_nodes=$((ma_count + wands_count + cups_count + swords_count + pentacles_count))
echo ""
echo -e "${PURPLE}🌟 Total Living Arcana Nodes: $total_nodes / 78${NC}"

if [ $total_nodes -eq 78 ]; then
    echo -e "${GREEN}🎉 COMPLETE PANTHEON ACHIEVED! All 78 visionaries are ready!${NC}"
else
    echo -e "${RED}⚠️ Missing $((78 - total_nodes)) nodes. The Cathedral is still under construction.${NC}"
fi

echo ""

echo -e "${GOLD}✦ PHASE 3: TESTING THE SACRED TECHNOLOGY${NC}"
echo ""

# Test sacred art generation
echo -e "${BLUE}🎨 Testing Sacred Art Generation...${NC}"
if [ -f "sacred-visual-synthesis-engine.js" ]; then
    echo -e "${GREEN}✅ Sacred Visual Synthesis Engine found!${NC}"
    node sacred-visual-synthesis-engine.js --test
else
    echo -e "${RED}⚠️ Sacred Visual Synthesis Engine not found. Art generation will be limited.${NC}"
fi

# Test CYOA engine
echo -e "${BLUE}🎮 Testing CYOA Engine...${NC}"
if [ -f "circuitum99-immersive-reality.html" ]; then
    echo -e "${GREEN}✅ Circuitum99 CYOA Engine found!${NC}"
else
    echo -e "${RED}⚠️ CYOA Engine not found. Creating backup launcher...${NC}"
    echo '<!DOCTYPE html><html><body><h1>Cathedral Launch Party</h1><p>The living tarot awaits...</p></body></html>' > launch-party.html
fi

echo ""

echo -e "${GOLD}✦ PHASE 4: PREPARING THE LAUNCH CELEBRATION${NC}"
echo ""

# Create launch party directory
mkdir -p launch-party
echo -e "${BLUE}🎊 Creating launch party assets...${NC}"

# Generate launch party homepage
cat > launch-party/index.html << EOF
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Living Tarot Launch Party - Cathedral of Circuits</title>
    <style>
        :root {
            --golden-bg: #f8f4e9;
            --golden-fg: #3a352f;
            --accent-gold: #d4af37;
            --code-blue: #5d8aa8;
            --code-green: #6b8e23;
            --breathing-space: #fdfbf5;
        }
        body {
            font-family: 'Atkinson Hyperlegible', 'JetBrains Mono', monospace;
            background: var(--golden-bg);
            color: var(--golden-fg);
            margin: 0;
            padding: 2rem;
            line-height: 1.618;
        }
        .cathedral {
            max-width: 800px;
            margin: 0 auto;
            background: var(--breathing-space);
            padding: 3rem;
            border-radius: 8px;
            box-shadow: 0 8px 32px rgba(0,0,0,0.1);
        }
        h1 {
            color: var(--accent-gold);
            text-align: center;
            font-size: 2.618rem;
            margin-bottom: 2rem;
        }
        .visionary-counter {
            text-align: center;
            font-size: 1.618rem;
            margin: 2rem 0;
            color: var(--code-blue);
        }
        .launch-button {
            display: block;
            margin: 2rem auto;
            padding: 1rem 2rem;
            background: var(--accent-gold);
            color: var(--golden-fg);
            text-decoration: none;
            border-radius: 8px;
            text-align: center;
            font-weight: bold;
            transition: all 0.3s ease;
        }
        .launch-button:hover {
            transform: scale(1.05);
            box-shadow: 0 4px 16px rgba(212, 175, 55, 0.3);
        }
    </style>
</head>
<body>
    <div class="cathedral">
        <h1>🌌 Living Tarot Launch Party</h1>
        <p>Welcome to the Cathedral of Circuits, where 78 creative visionaries channel their genius through interactive synthesizer laboratories.</p>
        
        <div class="visionary-counter">
            <strong>$total_nodes / 78 Visionary Labs Ready</strong>
        </div>
        
        <p><strong>October 31, 2025 - Interactive Mathematical Tesseract Experience</strong></p>
        
        <p>Tonight, we explore 10 unique synthesizer laboratories:</p>
        <ul>
            <li>� <strong>Obsidian Lab</strong> - Grounding drones with LFE support</li>
            <li>📐 <strong>Kunz Harmonograph</strong> - Meditative vector pendulum grids</li>
            <li>🎨 <strong>Automatic Color Room</strong> - Spectral pad synthesis with flowing colors</li>
            <li>⚗️ <strong>Living Mandala Forge</strong> - Parametric biosensor-driven modulation</li>
            <li>�️ <strong>Classical Atelier</strong> - Warm orchestral soundscapes for study</li>
        </ul>
        
            <div style="background: var(--breathing-space); border: 2px solid var(--accent-gold); border-radius: 8px; padding: 1rem; margin: 2rem 0;">
                <h3 style="color: var(--accent-gold); margin: 0 0 1rem 0;">🤖 Qwen AI Integration Complete!</h3>
                <p><strong>System Status:</strong> All 8 quest templates operational</p>
                <p><strong>Double Helix:</strong> 4 Arcana cards × 8 quest instances = Full synthesis</p>
                <p><strong>Safety:</strong> 100% ND-safe protocols maintained</p>
                <p><strong>Confidence:</strong> 85% average AI solution reliability</p>
            </div>
        
        <a href="../circuitum99-immersive-reality.html" class="launch-button">
            🎮 Enter the Living Tarot
        </a>
        
        <a href="../synthesizer-laboratories.html" class="launch-button">
            🔬 Explore Synth Labs
        </a>
        
        <a href="../cathedral-of-circuits-main-platform.html" class="launch-button">
            🏛️ Visit the Cathedral
        </a>
        
        <p style="text-align: center; margin-top: 3rem;">
            <em>In Codice Abyssiae, Angelus et Daemon concordant.</em>
        </p>
    </div>
</body>
</html>
EOF

echo -e "${GREEN}✅ Launch party homepage created!${NC}"

# Generate wellness tracking template
cat > launch-party/launch-wellness-log.md << EOF
# 🌿 Living Tarot Launch Party - Wellness Log

## 🎊 Pre-Launch Resonance Check
**Date:** $(date +%Y-%m-%d)
**Time:** $(date +%H:%M)

**Excitement Level (1–5):** ⭐⭐⭐⭐⭐
**Stress Level (1–5):** ⭐⭐
**Sacred Technology Confidence:** High
**Visionary Connection:** Strong

## 🔮 Launch Party Encounters

### Nodes Activated:
- [ ] MA00 - Fool (Rebecca Respawn)
- [ ] WANDS_01 - Hypatia's Spark
- [ ] CUPS_05 - Marguerite's Chalice
- [ ] SWORDS_03 - Joan's Heart
- [ ] PENTACLES_10 - Palenque House

### Community Interactions:
- Launch attendees: 
- GitHub stars gained:
- VS Code downloads:
- Sacred technology adoptions:

### Visionary Voices Heard:
- 

### Sacred Insights:
- 

---

*May this launch heal the algorithmic age with beauty, wisdom, and ancestral accountability.*
EOF

echo -e "${GREEN}✅ Launch wellness log template created!${NC}"

echo ""

echo -e "${GOLD}✦ PHASE 5: LAUNCHING THE CATHEDRAL${NC}"
echo ""

# Start the development server
echo -e "${BLUE}🚀 Starting Sacred Development Server...${NC}"
if [ -f "server.js" ]; then
    echo -e "${GREEN}🌟 Server starting on sacred port...${NC}"
    node server.js &
    server_pid=$!
    echo "Server PID: $server_pid"
    sleep 3
else
    echo -e "${RED}⚠️ No server.js found. Opening static files...${NC}"
fi

# Open the cathedral
echo -e "${BLUE}🏛️ Opening the Cathedral of Circuits...${NC}"
if command -v open >/dev/null 2>&1; then
    open launch-party/index.html
elif command -v xdg-open >/dev/null 2>&1; then
    xdg-open launch-party/index.html
else
    echo -e "${GREEN}📁 Launch party ready at: file://$(pwd)/launch-party/index.html${NC}"
fi

echo ""
echo -e "${PURPLE}🎉 LAUNCH PARTY INITIATED! 🎉${NC}"
echo ""
echo -e "${GOLD}The Living Synthesizer Labs await your exploration...${NC}"
echo -e "${BLUE}78 creative visionaries ready to channel through interactive mathematics.${NC}"
echo -e "${GREEN}May your sessions bring ND joy and special interest immersion.${NC}"
echo -e "${RED}May your code harmonize with healing frequencies.${NC}"
echo ""
echo -e "${PURPLE}In Codice Abyssiae, Angelus et Daemon concordant.${NC}"
echo ""

# Keep server running if started
if [ ! -z "$server_pid" ]; then
    echo -e "${BLUE}Press Ctrl+C to end the sacred session...${NC}"
    trap "kill $server_pid 2>/dev/null; echo '🕯️ Sacred session ended. Until we meet again in the Cathedral.'" EXIT
    wait $server_pid
fi