/**
 * 🌟💫 CATHEDRAL SYSTEM INTEGRATION ENGINE
 * 
 * Connects all Cathedral systems with stunning Björk × BIG × Burton × Oz visuals
 * Integrates with Codex 144:99, Liber Arcanae, and Circuitum99 systems
 * 
 * @author Rebecca Respawn
 * @version 1.0.0 - Full Cathedral Integration
 */

class CathedralSystemIntegration {
    constructor() {
        this.visualEnhancer = null;
        this.registryData = new Map();
        this.nodeConnections = new Map();
        this.activeQuests = new Map();
        this.synthStations = new Map();
        this.isInitialized = false;
        this.serverPort = 9876; // Alternative port to avoid conflicts
    }

    async initialize() {
        if (this.isInitialized) return;
        
        console.log('🏛️✨ Cathedral System Integration Starting...');
        
        try {
            // Initialize visual enhancement engine
            await this.initializeVisualEngine();
            
            // Load registry data
            await this.loadRegistryData();
            
            // Setup node connections
            this.setupNodeConnections();
            
            // Initialize synth stations
            this.initializeSynthStations();
            
            // Start alternative server if needed
            await this.startAlternativeServer();
            
            // Setup UI enhancements
            this.enhanceExistingUI();
            
            this.isInitialized = true;
            console.log('🎨✨ Cathedral Integration Complete - Visually Stunning Cathedral Active!');
            
        } catch (error) {
            console.warn('⚠️ Cathedral Integration Error:', error);
            console.log('🔄 Falling back to basic mode...');
            this.initializeBasicMode();
        }
    }

    async initializeVisualEngine() {
        // Initialize the visual enhancement engine
        if (typeof window !== 'undefined' && window.CathedralVisualEnhancer) {
            this.visualEnhancer = new window.CathedralVisualEnhancer();
            await this.visualEnhancer.initialize();
        } else {
            console.log('🎨 Loading visual enhancement engine...');
            // Load the engine if not already loaded
            const script = document.createElement('script');
            script.src = 'cathedral-visual-enhancement-engine.js';
            document.head.appendChild(script);
            
            return new Promise((resolve) => {
                script.onload = () => {
                    this.visualEnhancer = new window.CathedralVisualEnhancer();
                    this.visualEnhancer.initialize();
                    resolve();
                };
            });
        }
    }

    async loadRegistryData() {
        console.log('📊 Loading Cathedral Registry Data...');
        
        // Define registry file paths
        const registryFiles = {
            cards: './liber-arcanae/registry/cards.json',
            helix: './codex-14499/registry/helix_map.json',
            quests: './circuitum99/registry/quests.templates.json',
            synthStations: './synthesizer-labs/synth-stations.json',
            progression: './circuitum99/registry/progression.alchemy.json',
            palettes: './stone-cathedral/assets/palettes/style-palette-collection.json'
        };

        // Load each registry with fallback data
        for (const [key, path] of Object.entries(registryFiles)) {
            try {
                const response = await fetch(path);
                if (response.ok) {
                    const data = await response.json();
                    this.registryData.set(key, data);
                    console.log(`✅ Loaded ${key} registry: ${this.getDataSize(data)} items`);
                } else {
                    console.warn(`⚠️ Could not load ${key} registry, using fallback`);
                    this.registryData.set(key, this.getFallbackData(key));
                }
            } catch (error) {
                console.warn(`⚠️ Error loading ${key}:`, error);
                this.registryData.set(key, this.getFallbackData(key));
            }
        }
    }

    getDataSize(data) {
        if (Array.isArray(data)) return data.length;
        if (data.templates) return data.templates.length;
        if (data.cards) return data.cards.length;
        if (data.stations) return data.stations.length;
        if (Object.keys(data).length) return Object.keys(data).length;
        return 'unknown';
    }

    getFallbackData(type) {
        const fallbacks = {
            cards: {
                cards: [
                    { id: 0, name: "The Fool", historical_figure: "Rebecca Respawn", realm: "Void", stage: "Beginning" },
                    { id: 1, name: "The Magician", historical_figure: "John Dee", realm: "Fire", stage: "Manifestation" },
                    { id: 2, name: "High Priestess", historical_figure: "Dion Fortune", realm: "Water", stage: "Receptivity" },
                    { id: 21, name: "The World", historical_figure: "Cosmic Dancer", realm: "Spirit", stage: "Completion" }
                ]
            },
            helix: {
                links: [
                    { arcana_id: 0, codex_node: 144, connection_type: "void-manifestation" },
                    { arcana_id: 1, codex_node: 99, connection_type: "fire-dissolution" },
                    { arcana_id: 2, codex_node: 72, connection_type: "water-wisdom" },
                    { arcana_id: 21, codex_node: 1, connection_type: "completion-unity" }
                ]
            },
            quests: {
                templates: [
                    { id: "first-step", name: "The First Step", stage: "Void", rewards: ["Trait:InfinitePotential"] },
                    { id: "reality-engineering", name: "Engineering New Reality", stage: "Void", rewards: ["Tool:RealityShaper"] }
                ]
            },
            synthStations: {
                stations: [
                    { id: "station-01-obsidian", name: "Obsidian Lab", style_realm: "obsidian-mandala", eeg_focus: "delta/theta" },
                    { id: "station-02-kunz", name: "Emma Kunz Geometric Lab", style_realm: "geometric-healing", eeg_focus: "alpha" }
                ]
            }
        };
        
        return fallbacks[type] || { message: "Fallback data", items: [] };
    }

    setupNodeConnections() {
        console.log('🔗 Setting up Node Connections...');
        
        const cards = this.registryData.get('cards')?.cards || [];
        const helix = this.registryData.get('helix')?.links || [];
        
        // Create enhanced node mappings
        cards.forEach((card, index) => {
            const nodeNumber = this.deriveNodeNumber(card, index);
            const helixConnection = helix.find(h => h.arcana_id === card.id);
            
            const nodeData = {
                arcana: card,
                nodeNumber: nodeNumber,
                codexNode: helixConnection?.codex_node || (144 - index * 7),
                connectionType: helixConnection?.connection_type || 'mystery',
                visualStyle: this.deriveVisualStyle(card, nodeNumber),
                fractalType: this.deriveFractalType(nodeNumber),
                historicalFigure: card.historical_figure || `Archetype ${index}`
            };
            
            this.nodeConnections.set(card.id, nodeData);
            
            // Apply visual enhancement if engine is ready
            if (this.visualEnhancer) {
                this.enhanceNodeVisuals(nodeData);
            }
        });
        
        console.log(`🎨 Connected ${this.nodeConnections.size} archetypal nodes`);
    }

    deriveNodeNumber(card, index) {
        // Use card ID if available, otherwise derive from properties
        if (typeof card.id === 'number') return card.id;
        
        // Derive from name/properties
        const nameHash = this.hashString(card.name || `card-${index}`);
        return (nameHash % 144) + 1; // Keep in 1-144 range
    }

    hashString(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32-bit integer
        }
        return Math.abs(hash);
    }

    deriveVisualStyle(card, nodeNumber) {
        const styles = {
            bjork: ['organic', 'breathing', 'fluid'],
            big: ['geometric', 'architectural', 'precise'],
            alice: ['whimsical', 'curious', 'floating'],
            burton: ['gothic', 'shadow', 'spiral'],
            oz: ['rainbow', 'emerald', 'magical']
        };
        
        const realm = card.realm?.toLowerCase() || 'mystery';
        const digitSum = nodeNumber.toString().split('').reduce((a, b) => parseInt(a) + parseInt(b), 0);
        
        // Select style based on realm and numerology
        if (realm.includes('void') || realm.includes('mystery')) return 'alice';
        if (realm.includes('fire') || realm.includes('energy')) return 'bjork';
        if (realm.includes('water') || realm.includes('emotion')) return 'oz';
        if (realm.includes('earth') || realm.includes('structure')) return 'big';
        if (realm.includes('spirit') || realm.includes('shadow')) return 'burton';
        
        // Fallback to numerology
        const styleKeys = Object.keys(styles);
        return styleKeys[digitSum % styleKeys.length];
    }

    deriveFractalType(nodeNumber) {
        // Same logic as in the visual enhancement engine
        const patterns = {
            fibonacci: [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144],
            primes: [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47],
            squares: [1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144],
            triangular: [1, 3, 6, 10, 15, 21, 28, 36, 45, 55, 66, 78, 91]
        };

        if (patterns.fibonacci.includes(nodeNumber)) return 'golden-spiral';
        if (patterns.primes.includes(nodeNumber)) return 'asymmetric-tree';
        if (patterns.squares.includes(nodeNumber)) return 'mandala-symmetry';
        if (patterns.triangular.includes(nodeNumber)) return 'sierpinski-gasket';
        
        const digitSum = nodeNumber.toString().split('').reduce((a, b) => parseInt(a) + parseInt(b), 0);
        const types = ['julia-set', 'dragon-curve', 'barnsley-fern', 'apollonian-gasket'];
        return types[digitSum % types.length];
    }

    enhanceNodeVisuals(nodeData) {
        if (!this.visualEnhancer) return;
        
        // Find elements to enhance
        const selectors = [
            `[data-card-id="${nodeData.arcana.id}"]`,
            `[data-node="${nodeData.nodeNumber}"]`,
            `.tarot-card[data-arcana="${nodeData.arcana.name?.toLowerCase().replace(/\s+/g, '-')}"]`,
            `.card-${nodeData.arcana.id}`,
            `.node-${nodeData.nodeNumber}`
        ];
        
        selectors.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(element => {
                this.visualEnhancer.enhanceElement(element, nodeData.nodeNumber);
                this.applyThematicStyles(element, nodeData);
            });
        });
    }

    applyThematicStyles(element, nodeData) {
        const { visualStyle, fractalType, historicalFigure } = nodeData;
        
        // Add style classes
        element.classList.add(`${visualStyle}-element`);
        element.classList.add(`fractal-${fractalType}`);
        
        // Add data attributes for enhanced interactions
        element.dataset.historicalFigure = historicalFigure;
        element.dataset.nodeNumber = nodeData.nodeNumber;
        element.dataset.codexNode = nodeData.codexNode;
        element.dataset.fractalType = fractalType;
        
        // Add enhanced hover effects
        this.addThematicHoverEffects(element, nodeData);
    }

    addThematicHoverEffects(element, nodeData) {
        element.addEventListener('mouseenter', () => {
            // Fractal intensity increase
            if (this.visualEnhancer) {
                this.visualEnhancer.setFractalOpacity(nodeData.nodeNumber, 0.9);
            }
            
            // Visual feedback
            element.style.transform = 'scale(1.05) translateY(-5px) rotateX(5deg)';
            element.style.boxShadow = `0 10px 30px rgba(255, 215, 0, 0.4)`;
            element.style.filter = 'brightness(1.2) saturate(1.3)';
            
            // Audio feedback (if available)
            this.playAudioFeedback(nodeData);
        });
        
        element.addEventListener('mouseleave', () => {
            // Return fractal to normal
            if (this.visualEnhancer) {
                this.visualEnhancer.setFractalOpacity(nodeData.nodeNumber, 0.6);
            }
            
            // Reset visual state
            element.style.transform = '';
            element.style.boxShadow = '';
            element.style.filter = '';
        });
        
        element.addEventListener('click', () => {
            this.handleNodeInteraction(nodeData, element);
        });
    }

    playAudioFeedback(nodeData) {
        // Audio feedback based on node properties
        if (window.AudioContext || window.webkitAudioContext) {
            try {
                const audioContext = new (window.AudioContext || window.webkitAudioContext)();
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();
                
                // Derive frequency from node number (musical)
                const baseFreq = 220; // A3
                const harmonic = 1 + (nodeData.nodeNumber % 12) / 12;
                oscillator.frequency.setValueAtTime(baseFreq * harmonic, audioContext.currentTime);
                
                oscillator.type = 'sine';
                gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
                
                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);
                
                oscillator.start();
                oscillator.stop(audioContext.currentTime + 0.3);
                
            } catch (error) {
                console.log('🔇 Audio feedback not available:', error);
            }
        }
    }

    handleNodeInteraction(nodeData, element) {
        console.log(`🎭 Interacting with ${nodeData.historicalFigure} (Node ${nodeData.nodeNumber})`);
        
        // Visual response
        element.style.animation = 'cathedral-activation 1s ease-out';
        
        // Fractal burst effect
        if (this.visualEnhancer) {
            this.visualEnhancer.updateNodeFractal(nodeData.nodeNumber, {
                intensity: 1.5,
                speed: 2.0
            });
            
            setTimeout(() => {
                this.visualEnhancer.updateNodeFractal(nodeData.nodeNumber, {
                    intensity: 1.0,
                    speed: 1.0
                });
            }, 2000);
        }
        
        // Trigger quest or dialogue (if implemented)
        this.triggerNodeDialogue(nodeData);
    }

    triggerNodeDialogue(nodeData) {
        // Create modal or dialogue interface
        const dialogue = this.createDialogueInterface(nodeData);
        document.body.appendChild(dialogue);
        
        // Animate in
        setTimeout(() => {
            dialogue.style.opacity = '1';
            dialogue.style.transform = 'scale(1)';
        }, 10);
    }

    createDialogueInterface(nodeData) {
        const modal = document.createElement('div');
        modal.className = 'cathedral-dialogue-modal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            opacity: 0;
            transform: scale(0.8);
            transition: all 0.3s ease;
            backdrop-filter: blur(5px);
        `;
        
        const content = document.createElement('div');
        content.className = 'dialogue-content';
        content.style.cssText = `
            background: linear-gradient(135deg, rgba(26, 26, 46, 0.95), rgba(22, 33, 62, 0.95));
            border: 2px solid rgba(255, 215, 0, 0.5);
            border-radius: 20px;
            padding: 40px;
            max-width: 600px;
            max-height: 80vh;
            overflow-y: auto;
            text-align: center;
            color: #e6d3a7;
            font-family: 'Cinzel', serif;
            box-shadow: 0 20px 60px rgba(255, 215, 0, 0.2);
        `;
        
        content.innerHTML = `
            <h2 style="color: #FFD700; margin-bottom: 20px; font-size: 2rem;">
                ${nodeData.historicalFigure}
            </h2>
            <div style="font-size: 1.2rem; margin-bottom: 20px; opacity: 0.8;">
                ${nodeData.arcana.name} • Node ${nodeData.nodeNumber}
            </div>
            <div style="background: rgba(255, 215, 0, 0.1); padding: 20px; border-radius: 10px; margin: 20px 0;">
                "Welcome, seeker. I am ${nodeData.historicalFigure}, guardian of the ${nodeData.arcana.name} path. 
                What wisdom do you seek from my tradition?"
            </div>
            <div style="display: flex; gap: 15px; justify-content: center; margin-top: 30px;">
                <button class="dialogue-btn" data-action="wisdom">Seek Wisdom</button>
                <button class="dialogue-btn" data-action="quest">Begin Quest</button>
                <button class="dialogue-btn" data-action="fusion">Explore Fusion</button>
                <button class="dialogue-btn" data-action="close">Gracefully Exit</button>
            </div>
        `;
        
        // Add button styles
        const buttons = content.querySelectorAll('.dialogue-btn');
        buttons.forEach(btn => {
            btn.style.cssText = `
                padding: 12px 24px;
                background: linear-gradient(135deg, #8b5cf6, #06b6d4);
                border: none;
                border-radius: 10px;
                color: white;
                font-family: inherit;
                font-weight: bold;
                cursor: pointer;
                transition: all 0.3s ease;
            `;
            
            btn.addEventListener('mouseenter', () => {
                btn.style.transform = 'translateY(-2px)';
                btn.style.boxShadow = '0 5px 15px rgba(139, 92, 246, 0.4)';
            });
            
            btn.addEventListener('mouseleave', () => {
                btn.style.transform = '';
                btn.style.boxShadow = '';
            });
            
            btn.addEventListener('click', (e) => {
                const action = e.target.dataset.action;
                this.handleDialogueAction(action, nodeData, modal);
            });
        });
        
        modal.appendChild(content);
        
        // Close on backdrop click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeDialogue(modal);
            }
        });
        
        return modal;
    }

    handleDialogueAction(action, nodeData, modal) {
        switch (action) {
            case 'wisdom':
                this.showWisdomContent(nodeData, modal);
                break;
            case 'quest':
                this.startQuest(nodeData, modal);
                break;
            case 'fusion':
                this.exploreFusion(nodeData, modal);
                break;
            case 'close':
                this.closeDialogue(modal);
                break;
        }
    }

    showWisdomContent(nodeData, modal) {
        const content = modal.querySelector('.dialogue-content');
        content.innerHTML = `
            <h2 style="color: #FFD700; margin-bottom: 20px;">Wisdom of ${nodeData.historicalFigure}</h2>
            <div style="text-align: left; line-height: 1.6; margin: 20px 0;">
                <p><strong>Archetypal Path:</strong> ${nodeData.arcana.name}</p>
                <p><strong>Sacred Number:</strong> ${nodeData.nodeNumber}</p>
                <p><strong>Codex Connection:</strong> Node ${nodeData.codexNode}</p>
                <p><strong>Fractal Pattern:</strong> ${nodeData.fractalType}</p>
                <p><strong>Visual Style:</strong> ${nodeData.visualStyle}</p>
            </div>
            <div style="background: rgba(255, 215, 0, 0.1); padding: 20px; border-radius: 10px; margin: 20px 0;">
                <em>"Each number contains infinite potential. Through meditation on sacred geometry and archetypal wisdom, 
                we discover the patterns that connect all existence."</em>
            </div>
            <button class="dialogue-btn" data-action="close" style="padding: 12px 24px; background: linear-gradient(135deg, #8b5cf6, #06b6d4); border: none; border-radius: 10px; color: white; cursor: pointer;">
                Thank You
            </button>
        `;
        
        const btn = content.querySelector('.dialogue-btn');
        btn.addEventListener('click', () => this.closeDialogue(modal));
    }

    startQuest(nodeData, modal) {
        const quests = this.registryData.get('quests')?.templates || [];
        const relevantQuests = quests.filter(q => 
            q.name?.includes(nodeData.arcana.name) || 
            q.stage?.toLowerCase() === nodeData.arcana.realm?.toLowerCase()
        );
        
        const questList = relevantQuests.length > 0 
            ? relevantQuests.map(q => `<li>${q.name}: ${q.effects?.join(', ') || 'Transformation'}</li>`).join('')
            : '<li>The First Step: Begin your journey with infinite potential</li><li>Sacred Geometry: Discover the patterns within</li>';
        
        const content = modal.querySelector('.dialogue-content');
        content.innerHTML = `
            <h2 style="color: #FFD700; margin-bottom: 20px;">Quests with ${nodeData.historicalFigure}</h2>
            <div style="text-align: left;">
                <p>Available quests on the ${nodeData.arcana.name} path:</p>
                <ul style="margin: 20px 0; padding-left: 20px;">
                    ${questList}
                </ul>
            </div>
            <div style="background: rgba(255, 215, 0, 0.1); padding: 20px; border-radius: 10px; margin: 20px 0;">
                <em>"Every quest begins with a single step into the unknown. Choose your path wisely, for each choice 
                shapes not only your journey, but your very being."</em>
            </div>
            <div style="display: flex; gap: 15px; justify-content: center;">
                <button class="dialogue-btn" data-action="close">Begin Journey</button>
                <button class="dialogue-btn" data-action="close">Return Later</button>
            </div>
        `;
        
        const buttons = content.querySelectorAll('.dialogue-btn');
        buttons.forEach(btn => {
            btn.style.cssText = 'padding: 12px 24px; background: linear-gradient(135deg, #8b5cf6, #06b6d4); border: none; border-radius: 10px; color: white; cursor: pointer;';
            btn.addEventListener('click', () => this.closeDialogue(modal));
        });
    }

    exploreFusion(nodeData, modal) {
        const otherNodes = Array.from(this.nodeConnections.values())
            .filter(n => n.arcana.id !== nodeData.arcana.id)
            .slice(0, 3);
        
        const fusionOptions = otherNodes.map(n => 
            `<li>${nodeData.historicalFigure} + ${n.historicalFigure}: 
            ${nodeData.fractalType} × ${n.fractalType} synthesis</li>`
        ).join('');
        
        const content = modal.querySelector('.dialogue-content');
        content.innerHTML = `
            <h2 style="color: #FFD700; margin-bottom: 20px;">Fusion Possibilities</h2>
            <div style="text-align: left;">
                <p>Explore synthesis with other archetypal masters:</p>
                <ul style="margin: 20px 0; padding-left: 20px;">
                    ${fusionOptions}
                </ul>
            </div>
            <div style="background: rgba(255, 215, 0, 0.1); padding: 20px; border-radius: 10px; margin: 20px 0;">
                <em>"In fusion, we discover that apparent opposites are actually complementary forces. 
                The dance of archetypes reveals the unity underlying all diversity."</em>
            </div>
            <button class="dialogue-btn" data-action="close" style="padding: 12px 24px; background: linear-gradient(135deg, #8b5cf6, #06b6d4); border: none; border-radius: 10px; color: white; cursor: pointer;">
                Explore Fusion Labs
            </button>
        `;
        
        const btn = content.querySelector('.dialogue-btn');
        btn.addEventListener('click', () => this.closeDialogue(modal));
    }

    closeDialogue(modal) {
        modal.style.opacity = '0';
        modal.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            if (modal.parentNode) {
                modal.parentNode.removeChild(modal);
            }
        }, 300);
    }

    initializeSynthStations() {
        const stations = this.registryData.get('synthStations')?.stations || [];
        
        stations.forEach(station => {
            this.synthStations.set(station.id, {
                ...station,
                isActive: false,
                currentParams: {
                    frequency: 440,
                    amplitude: 0.5,
                    waveform: 'sine'
                }
            });
        });
        
        console.log(`🎵 Initialized ${this.synthStations.size} synthesizer stations`);
    }

    async startAlternativeServer() {
        // Check if we can start a server on alternative port
        try {
            // This would be handled by your main server.js, but we can suggest alternatives
            console.log(`🌐 Cathedral available on multiple ports:`);
            console.log(`   Primary: http://localhost:8080 (if available)`);
            console.log(`   Alternative: http://localhost:${this.serverPort}`);
            console.log(`   File System: ${window.location.origin}${window.location.pathname}`);
            
            // Update any hardcoded localhost references in the UI
            this.updatePortReferences();
            
        } catch (error) {
            console.log('ℹ️ Using file system mode for Cathedral');
        }
    }

    updatePortReferences() {
        // Update any links or references to use current location
        const links = document.querySelectorAll('a[href*="localhost:8080"], a[href*="localhost:3000"]');
        links.forEach(link => {
            const href = link.getAttribute('href');
            if (href.includes('localhost')) {
                // Convert to relative path
                const path = href.split('/').slice(3).join('/');
                link.setAttribute('href', path || './');
            }
        });
    }

    enhanceExistingUI() {
        console.log('🎨 Enhancing existing UI elements...');
        
        // Find and enhance common UI elements
        const enhanceableSelectors = [
            '.tarot-card',
            '.card',
            '.node',
            '.archetype',
            '.synth-station',
            '[data-card-id]',
            '[data-arcana]',
            '.cathedral-container',
            '.main-interface',
            '.character-panel'
        ];
        
        enhanceableSelectors.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach((element, index) => {
                // Derive node number from element properties
                const nodeNumber = this.deriveElementNodeNumber(element, index);
                
                // Apply enhancements
                if (this.visualEnhancer) {
                    this.visualEnhancer.enhanceElement(element, nodeNumber);
                }
                
                // Add cathedral styling
                element.classList.add('cathedral-enhanced');
                this.addCathedralStyling(element, nodeNumber);
            });
        });
        
        // Enhance the main container
        const mainContainer = document.body;
        if (mainContainer && this.visualEnhancer) {
            this.visualEnhancer.enhanceElement(mainContainer, 144); // Master node
        }
        
        // Add global keyboard shortcuts
        this.addKeyboardShortcuts();
        
        console.log('✨ UI Enhancement Complete - Cathedral is now visually stunning!');
    }

    deriveElementNodeNumber(element, index) {
        // Try to get node number from element attributes
        if (element.dataset.cardId) return parseInt(element.dataset.cardId) || index;
        if (element.dataset.nodeNumber) return parseInt(element.dataset.nodeNumber) || index;
        if (element.dataset.arcana) return this.hashString(element.dataset.arcana) % 144;
        
        // Use element properties
        const text = element.textContent || element.alt || element.title || `element-${index}`;
        return (this.hashString(text) % 144) + 1;
    }

    addCathedralStyling(element, nodeNumber) {
        // Add base cathedral styling
        const styles = {
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            cursor: 'pointer',
            position: 'relative'
        };
        
        Object.assign(element.style, styles);
        
        // Add data attributes
        element.dataset.cathedralNode = nodeNumber;
        element.dataset.enhanced = 'true';
        
        // Add subtle glow effect
        const glowColors = ['#FFD700', '#FF69B4', '#00FFFF', '#9370DB', '#20B2AA'];
        const color = glowColors[nodeNumber % glowColors.length];
        
        element.addEventListener('mouseenter', () => {
            element.style.boxShadow = `0 0 20px ${color}40`;
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.boxShadow = '';
        });
    }

    addKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + Space: Toggle fractal visibility
            if ((e.ctrlKey || e.metaKey) && e.code === 'Space') {
                e.preventDefault();
                this.toggleAllFractals();
            }
            
            // Ctrl/Cmd + Shift + F: Full fractal mode
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.code === 'KeyF') {
                e.preventDefault();
                this.toggleFullFractalMode();
            }
            
            // Ctrl/Cmd + Shift + P: Performance mode
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.code === 'KeyP') {
                e.preventDefault();
                this.togglePerformanceMode();
            }
        });
        
        console.log('⌨️ Keyboard shortcuts active:');
        console.log('   Ctrl/Cmd + Space: Toggle fractals');
        console.log('   Ctrl/Cmd + Shift + F: Full fractal mode');
        console.log('   Ctrl/Cmd + Shift + P: Performance mode');
    }

    toggleAllFractals() {
        this.nodeConnections.forEach((nodeData, id) => {
            if (this.visualEnhancer) {
                this.visualEnhancer.toggleFractal(nodeData.nodeNumber);
            }
        });
    }

    toggleFullFractalMode() {
        const isFullMode = document.body.classList.toggle('cathedral-full-fractal-mode');
        
        if (isFullMode) {
            // Enhance all fractals
            this.nodeConnections.forEach((nodeData, id) => {
                if (this.visualEnhancer) {
                    this.visualEnhancer.setFractalOpacity(nodeData.nodeNumber, 1.0);
                }
            });
            console.log('🌟 Full Fractal Mode Activated');
        } else {
            // Return to normal
            this.nodeConnections.forEach((nodeData, id) => {
                if (this.visualEnhancer) {
                    this.visualEnhancer.setFractalOpacity(nodeData.nodeNumber, 0.6);
                }
            });
            console.log('🎨 Normal Fractal Mode Restored');
        }
    }

    togglePerformanceMode() {
        const isPerformanceMode = document.body.classList.toggle('cathedral-performance-mode');
        
        if (isPerformanceMode) {
            // Reduce visual effects for performance
            this.visualEnhancer?.pauseAnimations();
            console.log('⚡ Performance Mode Activated');
        } else {
            // Restore full visuals
            this.visualEnhancer?.resumeAnimations();
            console.log('🎨 Full Visual Mode Restored');
        }
    }

    initializeBasicMode() {
        console.log('🔄 Initializing Basic Cathedral Mode...');
        
        // Basic styling without complex fractals
        this.addBasicCathedralStyling();
        
        // Simple interactions
        this.addBasicInteractions();
        
        console.log('✅ Basic Cathedral Mode Active');
    }

    addBasicCathedralStyling() {
        const basicStyles = document.createElement('style');
        basicStyles.textContent = `
            .cathedral-basic {
                background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 25%, #16213e 50%, #0f0f23 100%);
                color: #e6d3a7;
                font-family: 'Cinzel', serif;
                min-height: 100vh;
                position: relative;
            }
            
            .cathedral-basic .enhanced-element {
                transition: all 0.3s ease;
                border: 1px solid rgba(255, 215, 0, 0.3);
                border-radius: 10px;
                padding: 10px;
                margin: 5px;
                background: rgba(255, 255, 255, 0.05);
            }
            
            .cathedral-basic .enhanced-element:hover {
                transform: translateY(-2px);
                box-shadow: 0 5px 15px rgba(255, 215, 0, 0.3);
                border-color: rgba(255, 215, 0, 0.6);
            }
        `;
        
        document.head.appendChild(basicStyles);
        document.body.classList.add('cathedral-basic');
    }

    addBasicInteractions() {
        const enhanceableElements = document.querySelectorAll('.tarot-card, .card, .node');
        enhanceableElements.forEach((element, index) => {
            element.classList.add('enhanced-element');
            
            element.addEventListener('click', () => {
                element.style.animation = 'pulse 0.5s ease-out';
                console.log(`🎭 Interacted with element ${index}`);
            });
        });
    }

    // Public API
    getNodeData(cardId) {
        return this.nodeConnections.get(cardId);
    }

    getAllNodes() {
        return Array.from(this.nodeConnections.values());
    }

    enhanceNewElement(element, nodeNumber) {
        if (this.visualEnhancer) {
            this.visualEnhancer.enhanceElement(element, nodeNumber);
        }
        this.addCathedralStyling(element, nodeNumber);
    }

    getSystemStatus() {
        return {
            initialized: this.isInitialized,
            visualEngineActive: !!this.visualEnhancer,
            nodesConnected: this.nodeConnections.size,
            synthStations: this.synthStations.size,
            registriesLoaded: this.registryData.size
        };
    }
}

// ========== AUTO-INITIALIZATION ==========

if (typeof window !== 'undefined') {
    window.CathedralSystemIntegration = CathedralSystemIntegration;
    window.cathedralSystem = new CathedralSystemIntegration();
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            window.cathedralSystem.initialize();
        });
    } else {
        window.cathedralSystem.initialize();
    }
    
    console.log('🏛️✨ Cathedral System Integration loaded - Preparing stunning visual experience...');
}

// Node.js export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CathedralSystemIntegration;
}