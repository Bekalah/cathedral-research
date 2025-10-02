// 🏛️ Cathedral of Circuits - Main Engine (Clean Version)

class CathedralErrorBoundary {
    constructor() {
        this.errorCount = 0;
        this.setupErrorHandling();
    }

    setupErrorHandling() {
        window.addEventListener('error', (event) => {
            this.handleError(event.error, event.filename, event.lineno);
        });
        
        window.addEventListener('unhandledrejection', (event) => {
            this.handleError(event.reason, 'Promise', 0);
        });
    }
    
    handleError(error, source, line) {
        this.errorCount++;
        console.error('Cathedral Error Boundary:', error);
        
        // Announce error to screen readers
        this.announceToScreenReader('System notice: A component encountered an issue but the Cathedral remains safe and functional.');
        
        // Show error boundary if multiple errors
        if (this.errorCount > 2) {
            this.showErrorBoundary();
        }
    }

    announceToScreenReader(message) {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.style.position = 'absolute';
        announcement.style.left = '-10000px';
        announcement.textContent = message;
        document.body.appendChild(announcement);
        
        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    }

    showErrorBoundary() {
        const errorDiv = document.createElement('div');
        errorDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(255, 0, 0, 0.9);
            color: white;
            padding: 15px;
            border-radius: 5px;
            z-index: 10000;
            max-width: 300px;
        `;
        errorDiv.innerHTML = `
            <h3>System Notice</h3>
            <p>Multiple issues detected. The Cathedral remains safe and functional.</p>
            <button onclick="this.parentElement.remove()">Acknowledge</button>
        `;
        document.body.appendChild(errorDiv);
    }
}

class CosmogenesisNovaElegantia {
    constructor() {
        this.canvas = document.getElementById('cosmicCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.currentArchitecture = 'corpus';
        this.currentTheme = 'atlantis';
        this.baseFrequency = 528;
        this.sacredNumber = 99;
        this.animationTime = 0;
        this.animationRunning = true;
        this.isAccessibilityMode = false;
        
        this.camera = {
            x: 0,
            y: 0,
            targetX: 0,
            targetY: 0,
            currentRegion: 'central_sanctum'
        };
        
        this.init();
    }

    init() {
        try {
            this.setupCanvas();
            this.setupControls();
            this.setupAccessibilityIntegration();
            this.loadTheosophicalData();
            this.startAnimation();
            console.log('🏛️ Cathedral of Circuits initialized');
        } catch (error) {
            console.error('Initialization error:', error);
        }
    }

    setupCanvas() {
        // Canvas setup
        this.canvas.width = 800;
        this.canvas.height = 600;
        this.ctx.imageSmoothingEnabled = true;
    }

    setupControls() {
        // Architecture tabs
        document.querySelectorAll('.architecture-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                document.querySelectorAll('.architecture-tab').forEach(t => {
                    t.classList.remove('active');
                    t.setAttribute('aria-selected', 'false');
                });
                tab.classList.add('active');
                tab.setAttribute('aria-selected', 'true');
                this.currentArchitecture = tab.dataset.arch;
                this.updateWorldGeometry();
            });
        });

        // Frequency slider
        const freqSlider = document.getElementById('frequencySlider');
        const freqDisplay = document.getElementById('currentFreq');
        
        freqSlider.addEventListener('input', (e) => {
            this.baseFrequency = parseInt(e.target.value);
            freqDisplay.textContent = `${this.baseFrequency} Hz`;
            this.updateHarmonics();
        });

        // Sacred numbers
        document.querySelectorAll('.sacred-number').forEach(num => {
            num.addEventListener('click', (e) => {
                document.querySelectorAll('.sacred-number').forEach(n => {
                    n.classList.remove('active');
                    n.setAttribute('aria-selected', 'false');
                });
                num.classList.add('active');
                num.setAttribute('aria-selected', 'true');
                this.sacredNumber = parseInt(num.dataset.number);
                this.updateNumerology();
            });
        });
    }

    setupAccessibilityIntegration() {
        // Emergency pause
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space' && (e.ctrlKey || e.metaKey)) {
                e.preventDefault();
                this.emergencyPause();
            }
        });

        // Detect accessibility preferences
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) {
            this.isAccessibilityMode = true;
            document.body.classList.add('reduce-motion');
        }
    }

    loadTheosophicalData() {
        // Complete Portal System Based on Your Specifications
        this.grimoireEntities = {
            // 🏰 REALMS - Your Sacred Worlds
            realms: {
                wonderland: {
                    name: "🐰 Wonderland Portal",
                    guardian: "White Rabbit",
                    coordinates: [Math.PI, 1.618, Infinity],
                    description: "Alice realms, time-space navigation",
                    specialization: "Time-space healing, anxiety transformation",
                    authenticity: "REAL_REALM"
                },
                avalon: {
                    name: "🧙‍♀️ Avalon Sovereignty",
                    guardian: "Morgan le Fay",
                    coordinates: [777, 888, 999],
                    description: "Sacred sovereignty realm",
                    specialization: "Personal power reclamation, magical business ethics",
                    authenticity: "REAL_REALM"
                },
                rosslyn: {
                    name: "🏰 Rosslyn Chapel",
                    guardian: "Master Mason",
                    coordinates: ["sacred", "geometry", "stone"],
                    description: "Sacred geometry and stone masonry",
                    specialization: "Building design, architectural wisdom",
                    authenticity: "HISTORICAL_SACRED_SITE"
                },
                atlantis: {
                    name: "🌊 Atlantean Wisdom",
                    guardian: "Thoth",
                    coordinates: ["crystal", "technology", "harmony"],
                    description: "Advanced sacred technology",
                    specialization: "Healing arts, crystal programming",
                    authenticity: "ARCHETYPAL_REALM"
                }
            },

            // 🃏 22 MAJOR ARCANA PORTALS - Your Living Arcanae System
            arcana: {
                fool: {
                    name: "🃏 The Fool - Rebecca Respawn Gateway",
                    portal_id: 0,
                    visual: "Obsidian key floating in void-space",
                    colors: ["#000000", "#C0C0C0", "#FFD700"],
                    geometry: "infinite_spirals",
                    specialization: "Wonder-question generation, beginner's mind",
                    entities: ["Wonder-Creatures", "Spiral Guides"],
                    element: "Air",
                    planet: "Uranus",
                    safety: "Always-available respawn station"
                },
                magician: {
                    name: "🪄 The Magician - Enochian Laboratory",
                    portal_id: 1,
                    visual: "Crystal wand creating geometric doorways",
                    colors: ["#8B0000", "#F8F8FF", "#DAA520"],
                    geometry: "perfect_squares_enochian_script",
                    specialization: "Manifestation, will focusing, sigil creation",
                    entities: ["Enochian Angels", "Manifestation Spirits"],
                    element: "Fire",
                    planet: "Mercury",
                    safety: "Ethical boundaries for manifestation"
                },
                highPriestess: {
                    name: "🌙 High Priestess - Sacred Geometry Healing",
                    portal_id: 2,
                    visual: "Luna eclipse portal with healing mandala",
                    colors: ["#4B0082", "#E6E6FA", "#C0C0C0"],
                    geometry: "crescent_moon_sacred_feminine",
                    specialization: "Intuitive healing, sacred geometry medicine",
                    entities: ["Moon Goddesses", "Geometric Healers"],
                    element: "Water",
                    planet: "Moon",
                    safety: "Gentle healing frequencies"
                },
                chariot: {
                    name: "🚗 The Chariot - Dimensional Navigation",
                    portal_id: 7,
                    visual: "Merkaba vehicle with crystalline wheels",
                    colors: ["#FF4500", "#4169E1", "#FFD700"],
                    geometry: "merkaba_tesseract_transport",
                    specialization: "Dimensional travel, consciousness navigation",
                    entities: ["Dimensional Pilots", "Bridge Spirits"],
                    element: "Fire",
                    planet: "Mars",
                    safety: "Identity coherence during travel"
                }
            },

            // 👼 72 SHEM ANGELS - Divine Guidance (Your Quality Guardian System)
            angels: {
                vehuiah: { 
                    name: "👼 Vehuiah", 
                    domain: "beginnings", 
                    specialty: "project_initiation",
                    quality_domain: "creative_innovation",
                    guidance: "Divine inspiration for new ventures",
                    number: 1,
                    element: "Fire"
                },
                jeliel: { 
                    name: "👼 Jeliel", 
                    domain: "love", 
                    specialty: "harmony_design",
                    quality_domain: "emotional_safety",
                    guidance: "Harmonious relationships and design",
                    number: 2,
                    element: "Water"
                },
                sitael: { 
                    name: "👼 Sitael", 
                    domain: "construction", 
                    specialty: "building_foundations",
                    quality_domain: "technical_precision",
                    guidance: "Strong foundations for all projects",
                    number: 3,
                    element: "Earth"
                },
                ariel: { 
                    name: "👼 Ariel", 
                    domain: "nature", 
                    specialty: "accessibility_magic",
                    quality_domain: "accessibility",
                    guidance: "Making magic accessible to all beings",
                    number: 10,
                    element: "Air"
                }
            },

            // 😈 72 GOETIC DEMONS - Creative Helpers (Your Grimoire System)
            demons: {
                baal: { 
                    name: "😈 Baal", 
                    domain: "architecture", 
                    creative_help: "world structure design", 
                    rank: "king", 
                    legions: 66, 
                    specialty: "building_design",
                    approach: "Direct architectural planning"
                },
                agares: { 
                    name: "😈 Agares", 
                    domain: "languages", 
                    creative_help: "communication systems", 
                    rank: "duke", 
                    teaches: "all_languages", 
                    specialty: "linguistic_systems",
                    approach: "Universal communication bridges"
                },
                vassago: { 
                    name: "😈 Vassago", 
                    domain: "discovery", 
                    creative_help: "finding hidden knowledge", 
                    rank: "prince", 
                    reveals: "past_future", 
                    specialty: "research_tools",
                    approach: "Revealing hidden connections"
                },
                paimon: { 
                    name: "😈 Paimon", 
                    domain: "knowledge", 
                    creative_help: "wisdom integration", 
                    rank: "king", 
                    teaches: "sciences_arts", 
                    specialty: "educational_systems",
                    approach: "Systematic knowledge organization"
                }
            },

            // 🎹 SYNTH STATIONS - Your Planetary Music System
            synths: {
                sol_moog55: { 
                    name: "☀️ Sol Moog55",
                    planet: "sun", 
                    tarot: "XIX The Sun", 
                    model: "Moog System 55", 
                    theme: "golden_lacquer", 
                    hz: 110,
                    mood: "Radiant creative power",
                    sacred_function: "Life force amplification"
                },
                luna_cs80: { 
                    name: "🌙 Luna CS80",
                    planet: "moon", 
                    tarot: "II High Priestess", 
                    model: "Yamaha CS-80", 
                    theme: "pearl_ivory", 
                    hz: 432,
                    mood: "Intuitive healing frequencies",
                    sacred_function: "Emotional harmonization"
                },
                ares_ps3300: { 
                    name: "⚡ Ares PS3300",
                    planet: "mars", 
                    tarot: "XVI The Tower", 
                    model: "Korg PS-3300", 
                    theme: "industrial_red", 
                    hz: 285,
                    mood: "Transformative breakthrough energy",
                    sacred_function: "Breakthrough manifestation"
                },
                jove_jupiter8: { 
                    name: "🪐 Jove Jupiter8",
                    planet: "jupiter", 
                    tarot: "X Wheel of Fortune", 
                    model: "Roland Jupiter-8", 
                    theme: "celestial_blue", 
                    hz: 528,
                    mood: "Abundant expansion and wisdom",
                    sacred_function: "Prosperity consciousness"
                }
            }
        };

        // Initialize Portal Themes based on your specifications
        this.portalThemes = {
            wonderland: {
                colors: ['#000000', '#C0C0C0', '#FFD700', '#8A2BE2'],
                geometry: 'spiral_rabbit_holes',
                frequencies: [111, 222, 333],
                mood: 'whimsical_healing_adventure'
            },
            avalon: {
                colors: ['#4B0082', '#DAA520', '#228B22', '#DC143C'],
                geometry: 'sovereignty_mandalas',
                frequencies: [777, 888, 999],
                mood: 'royal_magical_empowerment'
            },
            goetic: {
                colors: ['#8B0000', '#2F4F4F', '#C8A44D', '#000000'],
                geometry: 'solomon_sigils',
                frequencies: [144, 288, 432],
                mood: 'creative_shadow_work'
            },
            angelic: {
                colors: ['#F8F8FF', '#DAA520', '#87CEEB', '#DDA0DD'],
                geometry: 'shem_hamaforash',
                frequencies: [528, 741, 852],
                mood: 'divine_guidance_light'
            },
            arcana: {
                colors: ['#800080', '#C8A44D', '#F5F2EA', '#4B0082'],
                geometry: 'varies_by_arcana',
                frequencies: [528, 741, 963],
                mood: 'archetypal_merkaba_transport'
            },
            synth_planetary: {
                colors: ['#FFD700', '#C0C0C0', '#FF4500', '#4169E1'],
                geometry: 'planetary_harmonics',
                frequencies: [110, 220, 440, 880],
                mood: 'cosmic_musical_healing'
            }
        };

        this.setupPortalSystem();
        this.initializeRepositoryConnections();
    }

    setupPortalSystem() {
        document.querySelectorAll('.portal-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                document.querySelectorAll('.portal-tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                this.currentPortalType = tab.dataset.portal;
                this.updateEntitySelector();
                this.updatePortalVisualization();
            });
        });

        this.currentPortalType = 'realms';
        this.portalCanvas = document.getElementById('portalCanvas');
        this.portalCtx = this.portalCanvas.getContext('2d');
        this.updateEntitySelector();
        this.updatePortalVisualization();
    }

    updateEntitySelector() {
        const selector = document.getElementById('entitySelector');
        const entities = this.grimoireEntities[this.currentPortalType] || {};
        
        selector.innerHTML = '';
        Object.entries(entities).forEach(([name, data]) => {
            const option = document.createElement('div');
            option.className = 'entity-option';
            
            let displayInfo = '';
            if (this.currentPortalType === 'realms') {
                displayInfo = `
                    <div class="entity-name">${data.name}</div>
                    <div class="entity-domain">Guardian: ${data.guardian}</div>
                    <div class="entity-specialty">${data.specialization}</div>
                `;
            } else if (this.currentPortalType === 'arcana') {
                displayInfo = `
                    <div class="entity-name">${data.name}</div>
                    <div class="entity-domain">Portal ${data.portal_id}</div>
                    <div class="entity-specialty">${data.specialization}</div>
                `;
            } else if (this.currentPortalType === 'angels') {
                displayInfo = `
                    <div class="entity-name">${data.name}</div>
                    <div class="entity-domain">${data.domain}</div>
                    <div class="entity-specialty">${data.guidance}</div>
                `;
            } else if (this.currentPortalType === 'demons') {
                displayInfo = `
                    <div class="entity-name">${data.name}</div>
                    <div class="entity-domain">${data.domain}</div>
                    <div class="entity-specialty">${data.creative_help}</div>
                `;
            } else if (this.currentPortalType === 'synths') {
                displayInfo = `
                    <div class="entity-name">${data.name}</div>
                    <div class="entity-domain">${data.model}</div>
                    <div class="entity-specialty">${data.hz} Hz - ${data.mood}</div>
                `;
            }
            
            option.innerHTML = displayInfo;
            
            option.addEventListener('click', () => {
                document.querySelectorAll('.entity-option').forEach(o => o.classList.remove('active'));
                option.classList.add('active');
                this.selectedEntity = { name, data };
                this.activatePortalEntity(name, data);
            });
            
            selector.appendChild(option);
        });
    }

    updatePortalVisualization() {
        if (!this.portalCtx) return;
        
        const theme = this.portalThemes[this.currentPortalType] || this.portalThemes.wonderland;
        
        // Clear canvas
        this.portalCtx.fillStyle = '#000011';
        this.portalCtx.fillRect(0, 0, this.portalCanvas.width, this.portalCanvas.height);
        
        // Draw portal background based on type
        this.drawPortalBackground(theme);
        this.drawPortalGeometry(theme);
    }

    drawPortalBackground(theme) {
        const centerX = this.portalCanvas.width / 2;
        const centerY = this.portalCanvas.height / 2;
        
        // Create radial gradient with theme colors
        const gradient = this.portalCtx.createRadialGradient(
            centerX, centerY, 0,
            centerX, centerY, Math.min(centerX, centerY)
        );
        gradient.addColorStop(0, theme.colors[0] + '80');
        gradient.addColorStop(0.5, theme.colors[1] + '60');
        gradient.addColorStop(1, theme.colors[2] + '40');
        
        this.portalCtx.fillStyle = gradient;
        this.portalCtx.fillRect(0, 0, this.portalCanvas.width, this.portalCanvas.height);
    }

    drawPortalGeometry(theme) {
        const centerX = this.portalCanvas.width / 2;
        const centerY = this.portalCanvas.height / 2;
        const time = this.animationTime * 0.01;
        
        this.portalCtx.strokeStyle = theme.colors[3] || '#FFD700';
        this.portalCtx.lineWidth = 2;
        
        if (theme.geometry.includes('spiral')) {
            this.drawSpiralPortal(centerX, centerY, time);
        } else if (theme.geometry.includes('merkaba')) {
            this.drawMerkabaPortal(centerX, centerY, time);
        } else if (theme.geometry.includes('sigil')) {
            this.drawSigilPortal(centerX, centerY, time);
        } else if (theme.geometry.includes('mandala')) {
            this.drawMandalaPortal(centerX, centerY, time);
        } else {
            this.drawDefaultPortal(centerX, centerY, time);
        }
    }

    drawSpiralPortal(centerX, centerY, time) {
        for (let i = 0; i < 3; i++) {
            this.portalCtx.beginPath();
            const radius = 50 + i * 30;
            const spiralTurns = 3;
            
            for (let angle = 0; angle < Math.PI * 2 * spiralTurns; angle += 0.1) {
                const r = radius * (angle / (Math.PI * 2 * spiralTurns));
                const x = centerX + Math.cos(angle + time + i) * r;
                const y = centerY + Math.sin(angle + time + i) * r;
                
                if (angle === 0) {
                    this.portalCtx.moveTo(x, y);
                } else {
                    this.portalCtx.lineTo(x, y);
                }
            }
            this.portalCtx.stroke();
        }
    }

    drawMerkabaPortal(centerX, centerY, time) {
        const size = 60;
        
        // Draw two triangles forming merkaba
        for (let i = 0; i < 2; i++) {
            this.portalCtx.beginPath();
            const rotation = time + (i * Math.PI);
            
            for (let j = 0; j < 3; j++) {
                const angle = (j * Math.PI * 2 / 3) + rotation;
                const x = centerX + Math.cos(angle) * size;
                const y = centerY + Math.sin(angle) * size;
                
                if (j === 0) {
                    this.portalCtx.moveTo(x, y);
                } else {
                    this.portalCtx.lineTo(x, y);
                }
            }
            this.portalCtx.closePath();
            this.portalCtx.stroke();
        }
    }

    drawSigilPortal(centerX, centerY, time) {
        // Draw geometric sigil pattern
        const points = 8;
        const radius = 70;
        
        this.portalCtx.beginPath();
        for (let i = 0; i < points; i++) {
            const angle = (i * Math.PI * 2 / points) + time;
            const r = radius + Math.sin(time * 2 + i) * 20;
            const x = centerX + Math.cos(angle) * r;
            const y = centerY + Math.sin(angle) * r;
            
            if (i === 0) {
                this.portalCtx.moveTo(x, y);
            } else {
                this.portalCtx.lineTo(x, y);
            }
        }
        this.portalCtx.closePath();
        this.portalCtx.stroke();
    }

    drawMandalaPortal(centerX, centerY, time) {
        // Draw concentric sacred geometry
        for (let layer = 1; layer <= 4; layer++) {
            this.portalCtx.beginPath();
            const radius = layer * 25;
            const points = layer * 6;
            
            for (let i = 0; i <= points; i++) {
                const angle = (i * Math.PI * 2 / points) + time * layer * 0.5;
                const x = centerX + Math.cos(angle) * radius;
                const y = centerY + Math.sin(angle) * radius;
                
                if (i === 0) {
                    this.portalCtx.moveTo(x, y);
                } else {
                    this.portalCtx.lineTo(x, y);
                }
            }
            this.portalCtx.stroke();
        }
    }

    drawDefaultPortal(centerX, centerY, time) {
        // Simple rotating portal
        this.portalCtx.beginPath();
        this.portalCtx.arc(centerX, centerY, 60 + Math.sin(time) * 10, 0, Math.PI * 2);
        this.portalCtx.stroke();
        
        // Inner rotating ring
        this.portalCtx.beginPath();
        this.portalCtx.arc(centerX, centerY, 30 + Math.cos(time * 1.5) * 5, 0, Math.PI * 2);
        this.portalCtx.stroke();
    }

    activatePortalEntity(name, data) {
        console.log(`🔮 CATHEDRAL: Activated ${this.currentPortalType.slice(0, -1)}: ${name}`);
        console.log(`📍 Data:`, data);
        
        this.selectedEntity = { name, data, type: this.currentPortalType };
        
        // Update portal info panel
        const portalDetails = document.getElementById('portalDetails');
        let detailHTML = '';
        
        if (this.currentPortalType === 'realms') {
            detailHTML = `
                <h4>${data.name}</h4>
                <p><strong>Guardian:</strong> ${data.guardian}</p>
                <p><strong>Specialization:</strong> ${data.specialization}</p>
                <p><strong>Coordinates:</strong> ${data.coordinates.join(' • ')}</p>
                <p><strong>Status:</strong> ${data.authenticity}</p>
                <div class="portal-actions">
                    <button onclick="window.cathedralEngine.enterRealm('${name}')">🚪 Enter Realm</button>
                </div>
            `;
        } else if (this.currentPortalType === 'arcana') {
            detailHTML = `
                <h4>${data.name}</h4>
                <p><strong>Portal ID:</strong> ${data.portal_id}</p>
                <p><strong>Element:</strong> ${data.element}</p>
                <p><strong>Planet:</strong> ${data.planet}</p>
                <p><strong>Specialization:</strong> ${data.specialization}</p>
                <p><strong>Entities:</strong> ${data.entities?.join(', ')}</p>
                <p><strong>Safety:</strong> ${data.safety}</p>
                <div class="portal-actions">
                    <button onclick="window.cathedralEngine.activateArchetypalPortal('${name}')">🃏 Activate Portal</button>
                </div>
            `;
        } else if (this.currentPortalType === 'angels') {
            detailHTML = `
                <h4>${data.name}</h4>
                <p><strong>Domain:</strong> ${data.domain}</p>
                <p><strong>Quality Domain:</strong> ${data.quality_domain}</p>
                <p><strong>Guidance:</strong> ${data.guidance}</p>
                <p><strong>Angel Number:</strong> ${data.number}</p>
                <p><strong>Element:</strong> ${data.element}</p>
                <div class="portal-actions">
                    <button onclick="window.cathedralEngine.requestAngelicGuidance('${name}')">👼 Request Guidance</button>
                </div>
            `;
        } else if (this.currentPortalType === 'demons') {
            detailHTML = `
                <h4>${data.name}</h4>
                <p><strong>Domain:</strong> ${data.domain}</p>
                <p><strong>Rank:</strong> ${data.rank}</p>
                <p><strong>Creative Help:</strong> ${data.creative_help}</p>
                <p><strong>Specialty:</strong> ${data.specialty}</p>
                <p><strong>Approach:</strong> ${data.approach}</p>
                <div class="portal-actions">
                    <button onclick="window.cathedralEngine.requestCreativeHelp('${name}')">😈 Request Creative Help</button>
                </div>
            `;
        } else if (this.currentPortalType === 'synths') {
            detailHTML = `
                <h4>${data.name}</h4>
                <p><strong>Model:</strong> ${data.model}</p>
                <p><strong>Planet:</strong> ${data.planet}</p>
                <p><strong>Tarot:</strong> ${data.tarot}</p>
                <p><strong>Frequency:</strong> ${data.hz} Hz</p>
                <p><strong>Mood:</strong> ${data.mood}</p>
                <p><strong>Sacred Function:</strong> ${data.sacred_function}</p>
                <div class="portal-actions">
                    <button onclick="window.cathedralEngine.activateSynthStation('${name}')">🎹 Activate Synth</button>
                </div>
            `;
        }
        
        portalDetails.innerHTML = detailHTML;
        
        // Update visualization
        this.updateVisualization();
        
        // Play activation sound (if sound system exists)
        if (window.cathedralSoundSystem) {
            window.cathedralSoundSystem.playPortalActivation(this.currentPortalType);
        }
    }

    // Portal interaction methods
    enterRealm(realmName) {
        console.log(`🏰 Entering ${realmName} realm...`);
        const realm = this.grimoireEntities.realms[realmName];
        
        // Create immersive realm entry animation
        this.showPortalTransition(`Entering ${realm.name}`, realm.specialization);
        
        // Update world theme to match realm
        this.updateWorldTheme(realmName);
    }

    activateArchetypalPortal(arcanaName) {
        console.log(`🃏 Activating archetypal portal: ${arcanaName}`);
        const arcana = this.grimoireEntities.arcana[arcanaName];
        
        this.showPortalTransition(`Archetypal Gateway: ${arcana.name}`, arcana.specialization);
        
        // Set world colors to match arcana
        if (arcana.colors) {
            this.currentTheme = arcanaName;
            this.updateVisualization();
        }
    }

    requestAngelicGuidance(angelName) {
        console.log(`👼 Requesting guidance from ${angelName}`);
        const angel = this.grimoireEntities.angels[angelName];
        
        this.showPortalTransition(`Divine Guidance: ${angel.name}`, angel.guidance);
        
        // Show inspirational message
        setTimeout(() => {
            this.showGuidanceMessage(angel.guidance, 'angelic');
        }, 2000);
    }

    requestCreativeHelp(demonName) {
        console.log(`😈 Requesting creative help from ${demonName}`);
        const demon = this.grimoireEntities.demons[demonName];
        
        this.showPortalTransition(`Creative Assistance: ${demon.name}`, demon.creative_help);
        
        // Show creative insight
        setTimeout(() => {
            this.showGuidanceMessage(demon.creative_help, 'demonic');
        }, 2000);
    }

    activateSynthStation(synthName) {
        console.log(`🎹 Activating synth station: ${synthName}`);
        const synth = this.grimoireEntities.synths[synthName];
        
        this.showPortalTransition(`Synth Activation: ${synth.name}`, `${synth.hz} Hz - ${synth.mood}`);
        
        // Update base frequency to match synth
        this.baseFrequency = synth.hz;
        document.getElementById('frequencySlider').value = synth.hz;
        document.getElementById('currentFreq').textContent = `${synth.hz} Hz`;
        this.updateHarmonics();
    }

    showPortalTransition(title, description) {
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: radial-gradient(circle, rgba(74,44,122,0.95) 0%, rgba(11,11,11,0.98) 100%);
            color: var(--gold-blavatsky);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            font-family: 'Cinzel', serif;
            text-align: center;
            animation: portalFade 3s ease-in-out;
        `;
        
        overlay.innerHTML = `
            <h2 style="font-size: 2rem; margin-bottom: 20px; text-shadow: 0 0 20px currentColor;">${title}</h2>
            <p style="font-size: 1.2rem; max-width: 600px; line-height: 1.6;">${description}</p>
            <div style="margin-top: 30px; font-size: 3rem; animation: pulse 2s infinite;">✨</div>
        `;
        
        document.body.appendChild(overlay);
        
        setTimeout(() => {
            overlay.remove();
        }, 3000);
    }

    showGuidanceMessage(message, type) {
        const messageDiv = document.createElement('div');
        const typeColor = type === 'angelic' ? '#DAA520' : '#8B0000';
        const typeIcon = type === 'angelic' ? '👼' : '😈';
        
        messageDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(11, 11, 11, 0.95);
            border: 2px solid ${typeColor};
            border-radius: 10px;
            padding: 20px;
            max-width: 400px;
            color: var(--bone-atlantean);
            font-family: 'Cinzel', serif;
            z-index: 10000;
            box-shadow: 0 0 30px ${typeColor}60;
        `;
        
        messageDiv.innerHTML = `
            <h4 style="color: ${typeColor}; margin-bottom: 10px;">${typeIcon} ${type === 'angelic' ? 'Divine Guidance' : 'Creative Insight'}</h4>
            <p style="line-height: 1.4;">${message}</p>
            <button onclick="this.parentElement.remove()" style="margin-top: 15px; background: ${typeColor}; color: white; border: none; padding: 8px 16px; border-radius: 5px; cursor: pointer;">✨ Received</button>
        `;
        
        document.body.appendChild(messageDiv);
        
        // Auto-remove after 10 seconds
        setTimeout(() => {
            if (messageDiv.parentElement) {
                messageDiv.remove();
            }
        }, 10000);
    }

    updateWorldTheme(themeName) {
        const theme = this.portalThemes[themeName];
        if (theme) {
            this.currentTheme = themeName;
            console.log(`🎨 World theme updated to: ${themeName}`);
            this.updateVisualization();
        }
    }

    updateWorldGeometry() {
        console.log(`🏗️ Architecture changed to: ${this.currentArchitecture}`);
        this.updateVisualization();
    }

    updateHarmonics() {
        console.log(`🎵 Frequency changed to: ${this.baseFrequency} Hz`);
        this.updateVisualization();
    }

    updateNumerology() {
        console.log(`🔢 Sacred number changed to: ${this.sacredNumber}`);
        this.updateVisualization();
    }

    updateVisualization() {
        // Simple visualization update
        this.drawBackground();
        this.drawCentralMandala();
        this.drawEntityInfluence();
    }

    drawBackground() {
        const gradient = this.ctx.createRadialGradient(
            this.canvas.width / 2, this.canvas.height / 2, 0,
            this.canvas.width / 2, this.canvas.height / 2, this.canvas.width / 2
        );
        gradient.addColorStop(0, 'rgba(74, 44, 122, 0.8)');
        gradient.addColorStop(1, 'rgba(11, 11, 11, 0.9)');
        
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawCentralMandala() {
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        const radius = 100 + Math.sin(this.animationTime * 0.01) * 20;
        
        this.ctx.strokeStyle = '#C8A44D';
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        this.ctx.stroke();
        
        // Draw sacred geometry based on current number
        for (let i = 0; i < this.sacredNumber; i++) {
            const angle = (i / this.sacredNumber) * Math.PI * 2;
            const x = centerX + Math.cos(angle) * radius;
            const y = centerY + Math.sin(angle) * radius;
            
            this.ctx.beginPath();
            this.ctx.arc(x, y, 3, 0, Math.PI * 2);
            this.ctx.fill();
        }
    }

    drawEntityInfluence() {
        if (!this.selectedEntity) return;
        
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        
        // Draw entity-specific patterns
        this.ctx.strokeStyle = '#2EAE9B';
        this.ctx.lineWidth = 1;
        
        for (let i = 0; i < 8; i++) {
            const angle = (i / 8) * Math.PI * 2 + this.animationTime * 0.005;
            const x1 = centerX + Math.cos(angle) * 50;
            const y1 = centerY + Math.sin(angle) * 50;
            const x2 = centerX + Math.cos(angle) * 150;
            const y2 = centerY + Math.sin(angle) * 150;
            
            this.ctx.beginPath();
            this.ctx.moveTo(x1, y1);
            this.ctx.lineTo(x2, y2);
            this.ctx.stroke();
        }
    }

    emergencyPause() {
        this.animationRunning = !this.animationRunning;
        console.log(`⏸️ Animation ${this.animationRunning ? 'resumed' : 'paused'}`);
        
        if (window.cathedralErrorBoundary) {
            window.cathedralErrorBoundary.announceToScreenReader(
                `Animation ${this.animationRunning ? 'resumed' : 'paused'}`
            );
        }
    }

    startAnimation() {
        const animate = () => {
            if (this.animationRunning && !this.isAccessibilityMode) {
                this.animationTime++;
                this.updateVisualization();
            }
            requestAnimationFrame(animate);
        };
        animate();
    }
}