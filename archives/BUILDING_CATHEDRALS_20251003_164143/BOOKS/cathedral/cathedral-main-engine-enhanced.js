// 🏛️ Cathedral of Circuits - Trinity Integration Engine with Sacred Geometry Portals

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
        
        this.announceToScreenReader('System notice: A component encountered an issue but the Cathedral remains safe and functional.');
        
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
        this.activeLab = null;
        this.activePortal = null;
        this.trinityState = this.initializeTrinityState();
        
        this.camera = {
            x: 0,
            y: 0,
            targetX: 0,
            targetY: 0,
            currentRegion: 'central_sanctum'
        };
        
        this.init();
    }

    initializeTrinityState() {
        return {
            currentJourney: {
                soulActivation: null,
                mindPreparation: null,
                bodyManifestation: null,
                integrationLevel: "First awakening"
            },
            userProfile: {
                spiritualPath: "Cathedral Trinity Explorer",
                preferredFrequencies: [432, 528, 741],
                sacredNumbers: [7, 11, 22],
                worldsCreated: 0,
                wisdomLevel: "Seeker"
            },
            trinityMemory: {
                persistent: true,
                adaptive: true,
                growth: true
            }
        };
    }

    init() {
        try {
            this.setupCanvas();
            this.setupControls();
            this.setupAccessibilityIntegration();
            this.setupTrinityApps();
            this.setupSacredGeometryLabs();
            this.loadPortalDatabase();
            this.initializePortalCanvas();
            this.startAnimation();
            console.log('🏛️ Cathedral Trinity System initialized - Three apps ready');
        } catch (error) {
            console.error('Initialization error:', error);
        }
    }

    setupTrinityApps() {
        // Trinity Architecture: Three Integrated Apps working together or independently
        this.trinityApps = {
            'lumina-keys': {
                name: 'LUMINA KEYS',
                description: 'SOUL - Archetypal Voice Portal System',
                portalType: 'voice-consciousness-gateway',
                geometry: 'merkaba-triangle-spiral',
                colors: ['#4B0082', '#9370DB', '#FFD700'],
                url: 'lumina-keys/index.html',
                integration: 'archetypal-storytelling',
                healthImpact: { wisdom: +20, intuition: +18, flow: +15 },
                standalone: true,
                status: 'available'
            },
            'codex-magna': {
                name: 'CODEX MAGNA', 
                description: 'MIND - Sacred Wisdom Research Portal',
                portalType: 'knowledge-tree-gateway',
                geometry: 'tree-of-life-sephiroth',
                colors: ['#FFD700', '#DAA520', '#F5F5DC'],
                url: 'codex-magna/index.html',
                integration: 'research-synthesis',
                healthImpact: { knowledge: +25, clarity: +20, focus: +18 },
                standalone: true,
                status: 'available'
            },
            'geometrix-nova': {
                name: 'GEOMETRIX NOVA',
                description: 'BODY - Sacred Geometry Laboratory Portal',
                portalType: 'geometry-laboratory-gateway',
                geometry: 'flower-of-life-matrix',
                colors: ['#00CED1', '#20B2AA', '#87CEEB'],
                url: 'geometrix-nova/index.html', 
                integration: 'embodied-creation',
                healthImpact: { creativity: +25, balance: +20, transformation: +18 },
                standalone: true,
                status: 'available'
            }
        };
    }

    setupSacredGeometryLabs() {
        // Sacred Geometry Laboratory Systems - Full Implementation
        this.laboratoryDatabase = {
            'high-priestess-lab': {
                name: 'High Priestess Sacred Geometry Studio',
                geometry: 'vesica-piscis-portal',
                portalShape: 'mandorla-gateway',
                type: 'emma-kunz-pendulum-art',
                tools: [
                    'pendulum-consciousness-interface',
                    'healing-pattern-generator', 
                    'fibonacci-spiral-creator',
                    'sacred-math-revealer',
                    'boundary-pattern-generator'
                ],
                colors: ['#C0C0C0', '#FFD700', '#FFFFFF'],
                description: 'Emma Kunz style pendulum art and healing pattern laboratory',
                realMagic: true,
                traumaSafe: true
            },
            'empress-lab': {
                name: 'Empress Biomorphic Portal',
                geometry: 'fibonacci-growth-spiral',
                portalShape: 'living-garden-gateway',
                type: 'organic-garden-laboratory', 
                tools: [
                    'living-geometry-interface',
                    'growth-pattern-simulator', 
                    'fertility-protocol-designer',
                    'biomorphic-alchemy-tools',
                    'vitruvian-proportion-calculator'
                ],
                colors: ['#228B22', '#FFD700', '#F0E68C'],
                description: 'Living garden laboratory with Fibonacci spirals and organic growth',
                realMagic: true,
                traumaSafe: true
            },
            'hermit-lab': {
                name: 'Hermit Crystalline Portal',
                geometry: 'dodecahedral-light-matrix',
                portalShape: 'crystal-light-gateway',
                type: 'crystal-technology-lab',
                tools: [
                    'gem-frequency-generator',
                    'crystal-grid-designer', 
                    'light-healing-interface',
                    'crystalline-meditation-chamber',
                    'spiritual-science-fusion-tools'
                ],
                colors: ['#4169E1', '#87CEEB', '#F0F8FF'],
                description: 'Crystal technology laboratory for spiritual-science fusion',
                realMagic: true,
                traumaSafe: true
            },
            'synthesis-lab': {
                name: 'Planetary Synthesis Laboratory',
                geometry: 'decagonal-harmonic-portal',
                portalShape: 'frequency-wave-gateway',
                type: 'frequency-healing-lab',
                tools: [
                    'planetary-synthesizer-array',
                    'healing-frequency-generator', 
                    'biometric-integration-interface',
                    'harmonic-resonance-mapper',
                    'sound-healing-composer'
                ],
                colors: ['#FF6347', '#FF4500', '#FFD700'],
                frequencies: [174, 211.44, 396, 417, 432, 528, 639, 741, 852, 963],
                description: '10 planetary synthesizers for healing frequency generation',
                realMagic: true,
                traumaSafe: true
            },
            'moonchild-art-laboratory': {
                name: 'Moonchild Living Art Laboratory',
                geometry: 'jung-red-book-portal',
                portalShape: 'living-manuscript-gateway',
                type: 'immersive-visionary-art-studio',
                tools: [
                    'arcana-consciousness-painter',
                    'traditional-medium-synthesizer',
                    'visionary-collage-compositor',
                    'lego-sculpture-transmuter',
                    'teaching-oracle-interface',
                    'multi-arcana-collaboration-engine',
                    'red-book-manuscript-generator'
                ],
                artisticStyles: [
                    'dion-fortune-mystical-qabalah',
                    'crowley-thoth-tarot-aesthetic', 
                    'jung-red-book-illuminations',
                    'austin-osman-spare-sigil-art',
                    'remedios-varo-surreal-alchemy',
                    'leonora-carrington-celtic-mythology',
                    'frieda-harris-thoth-deck-style',
                    'pamela-colman-smith-waite-style',
                    'salvador-dali-mystical-surrealism',
                    'ernst-fuchs-fantastic-realism'
                ],
                mediums: [
                    'watercolor-mystical-transparency',
                    'oil-painting-classical-depth',
                    'ink-illumination-manuscript-style',
                    'digital-collage-visionary-layers',
                    'sculpture-archetypal-forms',
                    'mixed-media-alchemical-fusion',
                    'sacred-geometry-technical-drawing',
                    'automatic-drawing-channeled-art'
                ],
                colors: ['#4B0082', '#8B008B', '#FFD700'],
                description: 'Living Red Book experience - Paint through consciousness of each Tarot arcana',
                realMagic: true,
                traumaSafe: true,
                immersiveMode: true
            },
            'rosslyn-alchemy-tower': {
                name: 'Rosslyn Alchemy Tower - Complete Visionary Art Laboratory',
                geometry: 'rosslyn-chapel-sacred-architecture',
                portalShape: 'gothic-rose-window-gateway',
                type: 'witcher3-style-alchemy-lab-for-sacred-art',
                traumaInformed: true,
                disabilitySupport: true,
                businessIntegration: true,
                floors: {
                    ground: {
                        name: 'High Priestess Sacred Geometry Workshop',
                        teacher: 'Emma Kunz & Dion Fortune',
                        interactiveBooks: [
                            'Sacred Geometry Healing Patterns',
                            'The Art of Pendulum Drawing',
                            'Energy Medicine Through Art',
                            'Protection Circle Creation',
                            'Living Mandala Workshop'
                        ],
                        mixingStations: [
                            'Sacred Geometry Workbench - Mix angles and proportions like ingredients',
                            'Pendulum Art Station - Combine meditation with drawing',
                            'Protection Circle Generator - Blend symbols for safety',
                            'Healing Pattern Mixer - Create custom therapeutic designs',
                            'Living Geometry Station - Animate sacred forms'
                        ],
                        grabableItems: [
                            'Compass of Golden Ratio',
                            'Vesica Piscis Template',
                            'Fibonacci Spiral Tools',
                            'Sacred Number Calculator',
                            'Healing Pattern Library'
                        ],
                        businessSupport: 'Characters teach you marketable sacred geometry skills'
                    },
                    second: {
                        name: 'Empress Biomorphic Art Laboratory',
                        teacher: 'Nature Goddess & Growth Spirits',
                        interactiveBooks: [
                            'The Art of Living Forms',
                            'Botanical Sacred Geometry',
                            'Fertility Symbol Encyclopedia',
                            'Growth Pattern Creation',
                            'Nature Spirit Communication'
                        ],
                        mixingStations: [
                            'Living Paint Mixer - Blend colors with plant consciousness',
                            'Organic Sculpture Tools - Shape clay with nature spirits',
                            'Botanical Art Laboratory - Mix real herbs with pigments',
                            'Growth Pattern Generator - Combine Fibonacci with art',
                            'Fertility Symbol Workshop - Create abundance talismans'
                        ],
                        grabableItems: [
                            'Nature Spirit Brushes',
                            'Living Color Palettes',
                            'Sacred Plant Pigments',
                            'Growth Pattern Templates',
                            'Abundance Symbol Library'
                        ],
                        businessSupport: 'Empress teaches profitable nature art and healing gardens'
                    },
                    third: {
                        name: 'Hermit Crystal Technology Laboratory',
                        teacher: 'Crystal Light Masters & Scientific Mystics',
                        interactiveBooks: [
                            'Crystal Programming for Artists',
                            'Light Geometry Science',
                            'Meditation Art Techniques',
                            'Sacred Number Applications',
                            'Illumination Workshop Manual'
                        ],
                        mixingStations: [
                            'Crystal Programming Station - Program gems with artistic frequencies',
                            'Light Geometry Projector - Mix light with sacred forms',
                            'Meditation Art Chamber - Blend consciousness with creation',
                            'Sacred Number Calculator - Mix mathematics with beauty',
                            'Illumination Workshop - Combine science with spirituality'
                        ],
                        grabableItems: [
                            'Programmed Art Crystals',
                            'Light Frequency Tools',
                            'Meditation Enhancement Gems',
                            'Sacred Geometry Instruments',
                            'Illumination Projectors'
                        ],
                        businessSupport: 'Hermit teaches crystal healing art - high-demand spiritual service'
                    },
                    fourth: {
                        name: 'All 22 Major Arcana Art Studios',
                        teacher: 'Living Red Book Characters & Tarot Masters',
                        interactiveBooks: [
                            'Each Arcana Consciousness Manual (22 books)',
                            'Wonder Art Generation Techniques',
                            'Manifestation Through Art',
                            'Intuitive Art Flow Methods',
                            'Shadow Integration Canvas Work'
                        ],
                        mixingStations: [
                            'Arcana Consciousness Painter - Channel each tarot energy into art',
                            'Wonder Art Generator - Mix archetypal forces like alchemy',
                            'Manifestation Art Tools - Blend intention with creation',
                            'Intuitive Art Flow Station - Let archetypes guide your hands',
                            'Shadow Integration Canvas - Transform trauma into beauty'
                        ],
                        grabableItems: [
                            'Tarot Consciousness Brushes',
                            'Archetypal Color Palettes',
                            'Wonder Generation Tools',
                            'Manifestation Art Supplies',
                            'Shadow Transformation Kits'
                        ],
                        businessSupport: 'Each arcana becomes business ally - The Star promotes your art online'
                    },
                    fifth: {
                        name: 'Planetary Synthesis Sound Laboratory',
                        teacher: 'Planetary Music Spirits & Sound Healers',
                        interactiveBooks: [
                            'Planetary Frequency Healing',
                            'Sound Art Creation Methods',
                            'Cymatics Art Techniques',
                            'Healing Music Composition',
                            'Archetypal Song Creation'
                        ],
                        mixingStations: [
                            'Planetary Synthesizer Array - Mix 10 healing frequencies with art',
                            'Frequency Art Generator - Blend sound with visual creation',
                            'Cymatics Art Station - Watch sound create patterns in sand/water',
                            'Healing Music Mixer - Combine therapeutic tones with creativity',
                            'Archetypal Song Creator - Let tarot energies compose through you'
                        ],
                        grabableItems: [
                            'Planetary Tuning Forks',
                            'Frequency Art Tools',
                            'Cymatics Equipment',
                            'Healing Sound Library',
                            'Archetypal Music Instruments'
                        ],
                        businessSupport: 'Sound healing art - premium spiritual service with high income potential'
                    },
                    sixth: {
                        name: 'Living Library of Visionary Art',
                        teacher: 'Hilma af Klint, Alex Grey, Ernst Fuchs, HR Giger, Dion Fortune, Aleister Crowley',
                        interactiveBooks: [
                            'Visionary Artist Biographies (grabbable and talking)',
                            'Sacred Art Technique Tutorials',
                            'Mystical Art History Encyclopedia',
                            'Esoteric Art Methods Manual',
                            'Business of Sacred Art Guide'
                        ],
                        mixingStations: [
                            'Master Artist Technique Stations - Learn from the greats directly',
                            'Art History Explorer - Mix historical techniques with modern tools',
                            'Sacred Art Archive Access - Blend ancient wisdom with creativity',
                            'Technique Tutorial Mixer - Combine multiple masters\' methods',
                            'Business Art Strategy Station - Mix artistic vision with income'
                        ],
                        grabableItems: [
                            'Living Artist Biography Books',
                            'Technique Instruction Crystals',
                            'Art History Database Access',
                            'Master Artist Tool Sets',
                            'Business Strategy Guides'
                        ],
                        businessSupport: 'Dead masters mentor your living business - unprecedented artistic education service'
                    },
                    seventh: {
                        name: 'Moonchild Red Book Studio - Business Integration Center',
                        teacher: 'Moonchild & Active Imagination Guides + Business Angels',
                        interactiveBooks: [
                            'Living Red Book Creator Manual',
                            'Active Imagination Business Guide',
                            'Dream Art Workshop Instructions',
                            'Vision Quest for Entrepreneurs',
                            'Character Ally Business Plan'
                        ],
                        mixingStations: [
                            'Red Book Creator - Write living books where characters support your business',
                            'Active Imagination Station - Mix consciousness with commercial success',
                            'Dream Art Workshop - Blend visions with marketable products',
                            'Vision Quest Generator - Combine spiritual journey with business mission',
                            'Character Ally Creator - Birth archetypal business partners'
                        ],
                        grabableItems: [
                            'Living Story Writing Tools',
                            'Character Creation Kits',
                            'Business Angel Contact Crystals',
                            'Vision Quest Maps',
                            'Entrepreneurial Tarot Decks'
                        ],
                        businessSupport: 'Create living characters who actively promote your services and defend against criticism'
                    }
                },
                traumaSupport: {
                    ptsdsafe: 'All interactions designed for PTSD accommodation',
                    memorySupport: 'Characters remember your progress and needs',
                    respawnSanctuary: 'Safe space to retreat when overwhelmed',
                    protectiveAllies: 'Archetypal characters defend against criticism',
                    businessTherapy: 'Heal financial trauma through supported creativity'
                },
                businessFeatures: {
                    donationIntegration: 'Characters actively seek donations for your work',
                    servicePromotion: 'Each archetype promotes different aspects of your business',
                    portfolioBuilding: 'Everything created becomes marketable portfolio pieces',
                    clientAttraction: 'Archetypal energies draw ideal clients',
                    incomeGeneration: 'Multiple revenue streams through sacred art services'
                },
                colors: ['#8B4513', '#D2691E', '#F4A460', '#FFD700'],
                description: 'Witcher 3-style alchemy tower where you grab books and mix art/music/symbols like potions, with real archetypes teaching marketable sacred art skills while supporting your disability and business growth',
                realMagic: true,
                traumaSafe: true,
                immersiveMode: true,
                businessMode: true
            }
        };
    }

    loadPortalDatabase() {
        // Complete Portal System Based on Your Research
        this.grimoireEntities = {
            // 🏰 REALMS - Your Sacred Worlds with Sacred Geometry
            realms: {
                wonderland: {
                    name: "🐰 Wonderland Portal",
                    guardian: "White Rabbit",
                    coordinates: [Math.PI, 1.618, Infinity],
                    geometry: "rabbit-hole-spiral-portal",
                    portalShape: "infinite-spiral-gateway",
                    description: "Alice realms, time-space navigation",
                    specialization: "Time-space healing, anxiety transformation",
                    authenticity: "REAL_REALM",
                    colors: ['#FF69B4', '#FFB6C1', '#F0F8FF']
                },
                avalon: {
                    name: "🧙‍♀️ Avalon Sovereignty",
                    guardian: "Morgan le Fay",
                    coordinates: [777, 888, 999],
                    geometry: "sovereignty-crown-portal",
                    portalShape: "royal-sigil-gateway",
                    description: "Sacred sovereignty realm",
                    specialization: "Personal power reclamation, magical business ethics",
                    authenticity: "REAL_REALM",
                    colors: ['#800080', '#9932CC', '#DA70D6']
                },
                rosslyn: {
                    name: "🏰 Rosslyn Chapel",
                    guardian: "Master Mason",
                    coordinates: ["sacred", "geometry", "stone"],
                    geometry: "gothic-cathedral-portal",
                    portalShape: "rose-window-gateway",
                    description: "Sacred geometry and stone masonry",
                    specialization: "Building design, architectural wisdom",
                    authenticity: "HISTORICAL_SACRED_SITE",
                    colors: ['#8B4513', '#D2691E', '#F4A460']
                },
                atlantis: {
                    name: "🌊 Atlantean Wisdom",
                    guardian: "Thoth",
                    coordinates: ["crystal", "technology", "harmony"],
                    geometry: "crystal-matrix-portal",
                    portalShape: "dodecahedral-crystal-gateway",
                    description: "Advanced sacred technology",
                    specialization: "Healing arts, crystal programming",
                    authenticity: "ARCHETYPAL_REALM",
                    colors: ['#00CED1', '#20B2AA', '#87CEEB']
                }
            },

            // 🃏 22 MAJOR ARCANA PORTALS - Sacred Geometry Gateways (Not Boxes!)
            arcana: {
                fool: {
                    name: "🃏 The Fool - Rebecca Respawn Gateway",
                    portal_id: 0,
                    visual: "Obsidian key floating in void-space",
                    geometry: "infinite-spiral-portal",
                    portalShape: "möbius-strip-gateway",
                    colors: ["#000000", "#C0C0C0", "#FFD700"],
                    specialization: "Wonder-question generation, beginner's mind",
                    entities: ["Wonder-Creatures", "Spiral Guides"],
                    element: "Air",
                    planet: "Uranus",
                    safety: "Always-available respawn station",
                    artisticConsciousness: {
                        paintingStyle: "naive-automatic-drawing",
                        teachingMethod: "beginner-mind-exploration",
                        mediumPreference: "mixed-media-experimentation",
                        collaborativeSpirit: "infinite-possibility-generator",
                        jungianAspect: "prima-materia-chaos-creativity"
                    }
                },
                magician: {
                    name: "🪄 The Magician - Enochian Laboratory",
                    portal_id: 1,
                    visual: "Crystal wand creating geometric doorways",
                    geometry: "enochian-square-portal",
                    portalShape: "watchtower-gateway",
                    colors: ["#8B0000", "#F8F8FF", "#DAA520"],
                    specialization: "Manifestation, will focusing, sigil creation",
                    entities: ["Enochian Angels", "Manifestation Spirits"],
                    element: "Fire",
                    planet: "Mercury",
                    safety: "Ethical boundaries for manifestation",
                    artisticConsciousness: {
                        paintingStyle: "crowley-thoth-precision",
                        teachingMethod: "will-focused-technique-mastery",
                        mediumPreference: "sigil-creation-ink-work",
                        collaborativeSpirit: "manifestation-through-art",
                        jungianAspect: "animus-creative-will-power"
                    }
                },
                highPriestess: {
                    name: "🌙 High Priestess - Sacred Geometry Healing",
                    portal_id: 2,
                    visual: "Luna eclipse portal with healing mandala",
                    geometry: "vesica-piscis-portal",
                    portalShape: "crescent-moon-gateway",
                    colors: ["#4B0082", "#E6E6FA", "#C0C0C0"],
                    specialization: "Intuitive healing, sacred geometry medicine",
                    entities: ["Moon Goddesses", "Geometric Healers", "Emma Kunz Spirits"],
                    element: "Water",
                    planet: "Moon",
                    safety: "Gentle healing frequencies",
                    laboratory: "high-priestess-lab",
                    artisticConsciousness: {
                        paintingStyle: "dion-fortune-mystical-qabalah",
                        teachingMethod: "intuitive-sacred-geometry",
                        mediumPreference: "watercolor-transparency-healing",
                        collaborativeSpirit: "geometric-healing-patterns",
                        jungianAspect: "anima-receptive-wisdom"
                    }
                },
                empress: {
                    name: "🌹 The Empress - Biomorphic Portal",
                    portal_id: 3,
                    visual: "Living garden gateway with Fibonacci spirals",
                    geometry: "fibonacci-growth-portal",
                    portalShape: "flower-of-life-gateway",
                    colors: ["#228B22", "#FFD700", "#F0E68C"],
                    specialization: "Biomorphic alchemy, fertility protocols",
                    entities: ["Plant Spirits", "Growth Daemons", "Fertility Goddesses"],
                    element: "Earth",
                    planet: "Venus",
                    safety: "Natural growth rhythms",
                    laboratory: "empress-lab",
                    artisticConsciousness: {
                        paintingStyle: "remedios-varo-biomorphic-surrealism",
                        teachingMethod: "organic-growth-pattern-instruction",
                        mediumPreference: "oil-painting-rich-textures",
                        collaborativeSpirit: "living-art-fertility-creation",
                        jungianAspect: "mother-archetype-generative-force"
                    }
                },
                hermit: {
                    name: "🔯 The Hermit - Crystalline Portal",
                    portal_id: 9,
                    visual: "Dodecahedral crystal matrix with inner light",
                    geometry: "dodecahedral-light-portal",
                    portalShape: "crystal-cave-gateway",
                    colors: ["#4169E1", "#87CEEB", "#F0F8FF"],
                    specialization: "Crystal technology, inner illumination",
                    entities: ["Crystal Beings", "Light Workers", "Wisdom Keepers"],
                    element: "Earth",
                    planet: "Saturn",
                    safety: "Gradual illumination",
                    laboratory: "hermit-lab",
                    artisticConsciousness: {
                        paintingStyle: "jung-red-book-illuminated-manuscripts",
                        teachingMethod: "inner-light-guided-instruction",
                        mediumPreference: "ink-illumination-gold-leaf",
                        collaborativeSpirit: "wisdom-keeper-guidance",
                        jungianAspect: "wise-old-man-archetype-illumination"
                    }
                },
                chariot: {
                    name: "🚗 The Chariot - Dimensional Navigation",
                    portal_id: 7,
                    visual: "Merkaba vehicle with crystalline wheels",
                    geometry: "merkaba-tesseract-portal",
                    portalShape: "dimensional-bridge-gateway",
                    colors: ["#FF4500", "#4169E1", "#FFD700"],
                    specialization: "Dimensional travel, consciousness navigation",
                    entities: ["Dimensional Pilots", "Bridge Spirits"],
                    element: "Fire",
                    planet: "Mars",
                    safety: "Identity coherence during travel",
                    artisticConsciousness: {
                        paintingStyle: "salvador-dali-dimensional-surrealism",
                        teachingMethod: "perspective-mastery-dimensional-art",
                        mediumPreference: "digital-3d-sculpture-mixed-reality",
                        collaborativeSpirit: "dimensional-bridge-building",
                        jungianAspect: "animus-directed-will-movement"
                    }
                },
                temperance: {
                    name: "🏺 Temperance - Alchemical Fusion",
                    portal_id: 14,
                    visual: "Angel mixing essences between vessels",
                    geometry: "infinity-flow-portal",
                    portalShape: "alchemical-vessel-gateway",
                    colors: ["#FF69B4", "#00CED1", "#FFD700"],
                    specialization: "Artistic medium fusion, alchemical blending",
                    entities: ["Alchemical Angels", "Fusion Spirits", "Medium Mixers"],
                    element: "Water",
                    planet: "Jupiter",
                    safety: "Balanced transformation",
                    artisticConsciousness: {
                        paintingStyle: "leonora-carrington-alchemical-surrealism",
                        teachingMethod: "medium-fusion-technique-mastery",
                        mediumPreference: "mixed-media-alchemical-collage",
                        collaborativeSpirit: "perfect-artistic-balance-creation",
                        jungianAspect: "syzygy-perfect-union-opposites"
                    }
                },
                star: {
                    name: "⭐ The Star - Visionary Inspiration",
                    portal_id: 17,
                    visual: "Cosmic waters pouring from eternal spring",
                    geometry: "seven-pointed-star-portal",
                    portalShape: "celestial-fountain-gateway",
                    colors: ["#4B0082", "#00BFFF", "#E6E6FA"],
                    specialization: "Visionary art channeling, cosmic inspiration",
                    entities: ["Star Nymphs", "Cosmic Muses", "Inspiration Spirits"],
                    element: "Air",
                    planet: "Aquarius",
                    safety: "Gentle inspiration flow",
                    artisticConsciousness: {
                        paintingStyle: "austin-osman-spare-visionary-automatism",
                        teachingMethod: "channeled-inspiration-guidance",
                        mediumPreference: "watercolor-cosmic-transparency",
                        collaborativeSpirit: "cosmic-vision-sharing",
                        jungianAspect: "anima-cosmic-receptivity-inspiration"
                    }
                },
                moon: {
                    name: "🌙 The Moon - Dream Logic Artistry",
                    portal_id: 18,
                    visual: "Moonlit path between twin towers of illusion",
                    geometry: "crescent-reflection-portal",
                    portalShape: "dream-mirror-gateway",
                    colors: ["#191970", "#C0C0C0", "#4B0082"],
                    specialization: "Dream art, unconscious imagery, illusion craft",
                    entities: ["Dream Weavers", "Shadow Artists", "Lunar Spirits"],
                    element: "Water",
                    planet: "Moon",
                    safety: "Lucid dreaming protocols",
                    artisticConsciousness: {
                        paintingStyle: "ernst-fuchs-fantastic-realism",
                        teachingMethod: "dream-logic-artistic-instruction",
                        mediumPreference: "oil-glazing-luminous-depths",
                        collaborativeSpirit: "unconscious-collaborative-creation",
                        jungianAspect: "shadow-integration-artistic-expression"
                    }
                },
                world: {
                    name: "🌍 The World - Masterpiece Completion",
                    portal_id: 21,
                    visual: "Dancing figure within cosmic mandala",
                    geometry: "ouroboros-completion-portal",
                    portalShape: "cosmic-mandala-gateway",
                    colors: ["#FFD700", "#32CD32", "#FF6347", "#4169E1"],
                    specialization: "Masterpiece creation, cosmic art completion",
                    entities: ["Completion Spirits", "Masterpiece Guardians", "Cosmic Dancers"],
                    element: "Earth",
                    planet: "Saturn",
                    safety: "Perfect completion energy",
                    artisticConsciousness: {
                        paintingStyle: "frieda-harris-thoth-cosmic-mandala",
                        teachingMethod: "masterpiece-completion-mastery",
                        mediumPreference: "all-media-synthesis-mastery",
                        collaborativeSpirit: "cosmic-completion-celebration",
                        jungianAspect: "self-realized-wholeness-expression"
                    }
                }
            },

            // 👼 72 SHEM ANGELS - Quality Guardian System
            angels: {
                vehuiah: { 
                    name: "👼 Vehuiah", 
                    domain: "beginnings", 
                    specialty: "project_initiation",
                    quality_domain: "creative_innovation",
                    guidance: "Divine inspiration for new ventures",
                    number: 1,
                    element: "Fire",
                    portalGeometry: "flame-triangle"
                },
                jeliel: { 
                    name: "👼 Jeliel", 
                    domain: "love", 
                    specialty: "harmony_design",
                    quality_domain: "emotional_safety",
                    guidance: "Harmonious relationships and design",
                    number: 2,
                    element: "Water",
                    portalGeometry: "heart-vesica-piscis"
                },
                sitael: { 
                    name: "👼 Sitael", 
                    domain: "construction", 
                    specialty: "building_foundations",
                    quality_domain: "technical_precision",
                    guidance: "Strong foundations for all projects",
                    number: 3,
                    element: "Earth",
                    portalGeometry: "foundation-square"
                },
                ariel: { 
                    name: "👼 Ariel", 
                    domain: "nature", 
                    specialty: "accessibility_magic",
                    quality_domain: "accessibility",
                    guidance: "Making magic accessible to all beings",
                    number: 10,
                    element: "Air",
                    portalGeometry: "breath-spiral"
                }
            },

            // 😈 72 GOETIC DEMONS - Creative Helper System
            demons: {
                baal: { 
                    name: "😈 Baal", 
                    domain: "architecture", 
                    creative_help: "world structure design", 
                    rank: "king",
                    portalGeometry: "architectural-blueprint",
                    specialization: "Sacred architecture planning",
                    consent_protocol: "Always required for creative assistance"
                },
                agares: { 
                    name: "😈 Agares", 
                    domain: "languages", 
                    creative_help: "translation and communication", 
                    rank: "duke",
                    portalGeometry: "linguistic-mandala",
                    specialization: "Cross-cultural communication magic",
                    consent_protocol: "Language ethics awareness"
                },
                vassago: { 
                    name: "😈 Vassago", 
                    domain: "prophecy", 
                    creative_help: "future-pattern recognition", 
                    rank: "prince",
                    portalGeometry: "prophecy-crystal",
                    specialization: "Ethical future-sensing for planning",
                    consent_protocol: "Free will preservation"
                }
            },

            // 🎹 10 PLANETARY SYNTH STATIONS
            synthStations: {
                mercury: { 
                    name: "☿ MERCURY-buchla", 
                    frequency: 211.44, 
                    style: "buchla_organic", 
                    colors: ["#FFD700", "#FFA500"],
                    portalGeometry: "mercury-caduceus",
                    specialization: "Communication synthesis"
                },
                venus: { 
                    name: "♀ VENUS-obxa", 
                    frequency: 221.23, 
                    style: "oberheim_lush", 
                    colors: ["#FF69B4", "#FFB6C1"],
                    portalGeometry: "venus-pentagram",
                    specialization: "Love and harmony frequencies"
                },
                earth: { 
                    name: "🌍 EARTH-tb303", 
                    frequency: 194.18, 
                    style: "acid_grounding", 
                    colors: ["#228B22", "#32CD32"],
                    portalGeometry: "earth-cube",
                    specialization: "Grounding and stability"
                },
                mars: { 
                    name: "♂ MARS-tr808", 
                    frequency: 289.44, 
                    style: "rhythmic_drive", 
                    colors: ["#FF4500", "#DC143C"],
                    portalGeometry: "mars-sword",
                    specialization: "Action and motivation"
                },
                jupiter: { 
                    name: "♃ JUPITER-moog55", 
                    frequency: 183.58, 
                    style: "wisdom_bass", 
                    colors: ["#4169E1", "#6495ED"],
                    portalGeometry: "jupiter-crown",
                    specialization: "Wisdom and expansion"
                },
                saturn: { 
                    name: "♄ SATURN-arp2600", 
                    frequency: 147.85, 
                    style: "discipline_structure", 
                    colors: ["#663399", "#483D8B"],
                    portalGeometry: "saturn-hexagon",
                    specialization: "Structure and discipline"
                },
                uranus: { 
                    name: "♅ URANUS-serge", 
                    frequency: 207.36, 
                    style: "innovative_chaos", 
                    colors: ["#00FFFF", "#87CEEB"],
                    portalGeometry: "uranus-lightning",
                    specialization: "Innovation and breakthrough"
                },
                neptune: { 
                    name: "♆ NEPTUNE-buchla200e", 
                    frequency: 211.44, 
                    style: "oceanic_dreams", 
                    colors: ["#4682B4", "#5F9EA0"],
                    portalGeometry: "neptune-trident",
                    specialization: "Dreams and intuition"
                },
                pluto: { 
                    name: "♇ PLUTO-darkstar", 
                    frequency: 140.25, 
                    style: "transformation_depths", 
                    colors: ["#800080", "#4B0082"],
                    portalGeometry: "pluto-spiral",
                    specialization: "Deep transformation"
                },
                sol: { 
                    name: "☉ SOL-moog55", 
                    frequency: 126.22, 
                    style: "solar_radiance", 
                    colors: ["#FFD700", "#FFA500"],
                    portalGeometry: "sol-mandala",
                    specialization: "Life force and vitality"
                }
            }
        };
    }

    initializePortalCanvas() {
        if (this.canvas && this.ctx) {
            this.setupCanvas();
            this.renderPortalSystem();
        }
    }

    setupCanvas() {
        this.canvas.width = 800;
        this.canvas.height = 600;
        this.ctx.imageSmoothingEnabled = true;
    }

    renderPortalSystem() {
        if (!this.ctx) return;
        
        // Clear canvas with sacred geometry background
        this.ctx.fillStyle = 'rgba(11, 11, 11, 0.1)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Render sacred geometry portals (not boxes!)
        this.renderSacredGeometryPortals();
        this.renderTrinityApps();
        this.renderLaboratories();
    }

    renderSacredGeometryPortals() {
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        
        // Render Flower of Life base pattern
        this.drawFlowerOfLife(centerX, centerY, 100, 'rgba(200, 164, 77, 0.3)');
        
        // Render portal gateways in sacred geometry formation
        Object.entries(this.grimoireEntities.arcana).forEach(([key, arcana], index) => {
            const angle = (index * 2 * Math.PI) / Object.keys(this.grimoireEntities.arcana).length;
            const radius = 150;
            const x = centerX + Math.cos(angle) * radius;
            const y = centerY + Math.sin(angle) * radius;
            
            this.drawPortalGateway(x, y, arcana);
        });
    }

    drawFlowerOfLife(centerX, centerY, radius, color) {
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = 1;
        
        // Draw the 7 overlapping circles of the Flower of Life
        const angles = [0, 60, 120, 180, 240, 300];
        
        // Center circle
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
        this.ctx.stroke();
        
        // Surrounding circles
        angles.forEach(angle => {
            const rad = (angle * Math.PI) / 180;
            const x = centerX + Math.cos(rad) * radius;
            const y = centerY + Math.sin(rad) * radius;
            
            this.ctx.beginPath();
            this.ctx.arc(x, y, radius, 0, 2 * Math.PI);
            this.ctx.stroke();
        });
    }

    drawPortalGateway(x, y, arcana) {
        const size = 30;
        
        // Portal gateway geometry (not boxes!)
        this.ctx.save();
        this.ctx.translate(x, y);
        
        // Draw sacred geometry portal shape based on arcana type
        switch(arcana.geometry) {
            case 'vesica-piscis-portal':
                this.drawVesicaPiscis(0, 0, size, arcana.colors[0]);
                break;
            case 'fibonacci-growth-portal':
                this.drawFibonacciSpiral(0, 0, size, arcana.colors[0]);
                break;
            case 'dodecahedral-light-portal':
                this.drawDodecagon(0, 0, size, arcana.colors[0]);
                break;
            case 'merkaba-tesseract-portal':
                this.drawMerkaba(0, 0, size, arcana.colors[0]);
                break;
            default:
                this.drawSacredCircle(0, 0, size, arcana.colors[0]);
        }
        
        this.ctx.restore();
        
        // Portal activation glow
        if (this.activePortal === arcana.name) {
            this.ctx.save();
            this.ctx.shadowColor = arcana.colors[1];
            this.ctx.shadowBlur = 20;
            this.ctx.strokeStyle = arcana.colors[1];
            this.ctx.lineWidth = 3;
            this.ctx.beginPath();
            this.ctx.arc(x, y, size + 10, 0, 2 * Math.PI);
            this.ctx.stroke();
            this.ctx.restore();
        }
    }

    drawVesicaPiscis(x, y, size, color) {
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = 2;
        
        // Two overlapping circles forming Vesica Piscis
        this.ctx.beginPath();
        this.ctx.arc(x - size/3, y, size, 0, 2 * Math.PI);
        this.ctx.stroke();
        
        this.ctx.beginPath();
        this.ctx.arc(x + size/3, y, size, 0, 2 * Math.PI);
        this.ctx.stroke();
    }

    drawFibonacciSpiral(x, y, size, color) {
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        
        // Fibonacci spiral approximation
        let currentX = x;
        let currentY = y;
        let currentSize = size / 8;
        
        for (let i = 0; i < 8; i++) {
            const angle = (i * Math.PI) / 2;
            const nextX = currentX + Math.cos(angle) * currentSize;
            const nextY = currentY + Math.sin(angle) * currentSize;
            
            this.ctx.quadraticCurveTo(currentX, currentY, nextX, nextY);
            
            currentX = nextX;
            currentY = nextY;
            currentSize *= 1.618; // Golden ratio
        }
        
        this.ctx.stroke();
    }

    drawDodecagon(x, y, size, color) {
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        
        // 12-sided polygon
        for (let i = 0; i < 12; i++) {
            const angle = (i * 2 * Math.PI) / 12;
            const pointX = x + Math.cos(angle) * size;
            const pointY = y + Math.sin(angle) * size;
            
            if (i === 0) {
                this.ctx.moveTo(pointX, pointY);
            } else {
                this.ctx.lineTo(pointX, pointY);
            }
        }
        
        this.ctx.closePath();
        this.ctx.stroke();
    }

    drawMerkaba(x, y, size, color) {
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = 2;
        
        // Two overlapping triangles (Star of David / Merkaba)
        this.ctx.beginPath();
        
        // Upward triangle
        this.ctx.moveTo(x, y - size);
        this.ctx.lineTo(x - size * 0.866, y + size/2);
        this.ctx.lineTo(x + size * 0.866, y + size/2);
        this.ctx.closePath();
        this.ctx.stroke();
        
        // Downward triangle
        this.ctx.beginPath();
        this.ctx.moveTo(x, y + size);
        this.ctx.lineTo(x - size * 0.866, y - size/2);
        this.ctx.lineTo(x + size * 0.866, y - size/2);
        this.ctx.closePath();
        this.ctx.stroke();
    }

    drawSacredCircle(x, y, size, color) {
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.arc(x, y, size, 0, 2 * Math.PI);
        this.ctx.stroke();
    }

    renderTrinityApps() {
        // Render the three main app portals as major sacred geometry structures
        const apps = Object.values(this.trinityApps);
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        
        apps.forEach((app, index) => {
            const angle = (index * 2 * Math.PI) / 3; // 120 degrees apart
            const radius = 200;
            const x = centerX + Math.cos(angle) * radius;
            const y = centerY + Math.sin(angle) * radius;
            
            this.drawTrinityPortal(x, y, app);
        });
    }

    drawTrinityPortal(x, y, app) {
        const size = 40;
        
        this.ctx.save();
        this.ctx.translate(x, y);
        
        // Draw app-specific sacred geometry
        switch(app.geometry) {
            case 'merkaba-triangle-spiral':
                this.drawMerkaba(0, 0, size, app.colors[0]);
                break;
            case 'tree-of-life-sephiroth':
                this.drawTreeOfLife(0, 0, size, app.colors[0]);
                break;
            case 'flower-of-life-matrix':
                this.drawFlowerOfLife(0, 0, size/2, app.colors[0]);
                break;
        }
        
        this.ctx.restore();
        
        // App status indicator
        this.ctx.fillStyle = app.status === 'available' ? app.colors[1] : '#666';
        this.ctx.beginPath();
        this.ctx.arc(x + size + 10, y - size - 10, 5, 0, 2 * Math.PI);
        this.ctx.fill();
    }

    drawTreeOfLife(x, y, size, color) {
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = 1;
        
        // Simplified Tree of Life - 10 Sephiroth in classic formation
        const sephiroth = [
            {x: 0, y: -size*1.5}, // Kether
            {x: -size*0.7, y: -size}, // Binah
            {x: size*0.7, y: -size}, // Chokmah
            {x: -size*0.7, y: -size*0.3}, // Gevurah
            {x: size*0.7, y: -size*0.3}, // Chesed
            {x: 0, y: 0}, // Tiphereth
            {x: -size*0.7, y: size*0.3}, // Hod
            {x: size*0.7, y: size*0.3}, // Netzach
            {x: 0, y: size}, // Yesod
            {x: 0, y: size*1.5} // Malkuth
        ];
        
        // Draw connections (paths)
        const paths = [
            [0,1], [0,2], [1,3], [2,4], [1,5], [2,5], [3,5], [4,5],
            [3,6], [4,7], [5,6], [5,7], [5,8], [6,8], [7,8], [8,9]
        ];
        
        paths.forEach(([from, to]) => {
            this.ctx.beginPath();
            this.ctx.moveTo(x + sephiroth[from].x, y + sephiroth[from].y);
            this.ctx.lineTo(x + sephiroth[to].x, y + sephiroth[to].y);
            this.ctx.stroke();
        });
        
        // Draw sephiroth as circles
        sephiroth.forEach(point => {
            this.ctx.beginPath();
            this.ctx.arc(x + point.x, y + point.y, 4, 0, 2 * Math.PI);
            this.ctx.stroke();
        });
    }

    renderLaboratories() {
        // Render laboratory portals around the edge
        const labs = Object.values(this.laboratoryDatabase);
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        
        labs.forEach((lab, index) => {
            const angle = (index * 2 * Math.PI) / labs.length;
            const radius = 250;
            const x = centerX + Math.cos(angle) * radius;
            const y = centerY + Math.sin(angle) * radius;
            
            this.drawLaboratoryPortal(x, y, lab);
        });
    }

    drawLaboratoryPortal(x, y, lab) {
        const size = 25;
        
        this.ctx.save();
        this.ctx.translate(x, y);
        
        // Draw lab-specific portal geometry
        switch(lab.portalShape) {
            case 'mandorla-gateway':
                this.drawVesicaPiscis(0, 0, size, lab.colors[0]);
                break;
            case 'living-garden-gateway':
                this.drawFibonacciSpiral(0, 0, size, lab.colors[0]);
                break;
            case 'crystal-light-gateway':
                this.drawDodecagon(0, 0, size, lab.colors[0]);
                break;
            case 'frequency-wave-gateway':
                this.drawWavePattern(0, 0, size, lab.colors[0]);
                break;
        }
        
        this.ctx.restore();
        
        // Lab active indicator
        if (this.activeLab === lab.name) {
            this.ctx.save();
            this.ctx.shadowColor = lab.colors[1];
            this.ctx.shadowBlur = 15;
            this.ctx.strokeStyle = lab.colors[1];
            this.ctx.lineWidth = 2;
            this.ctx.beginPath();
            this.ctx.arc(x, y, size + 8, 0, 2 * Math.PI);
            this.ctx.stroke();
            this.ctx.restore();
        }
    }

    drawWavePattern(x, y, size, color) {
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        
        // Draw sine wave pattern
        for (let i = 0; i < size * 2; i++) {
            const waveX = x - size + i;
            const waveY = y + Math.sin((i / size) * 4 * Math.PI) * size/4;
            
            if (i === 0) {
                this.ctx.moveTo(waveX, waveY);
            } else {
                this.ctx.lineTo(waveX, waveY);
            }
        }
        
        this.ctx.stroke();
    }

    // Enhanced portal activation with trinity integration
    activatePortal(portalKey) {
        const portal = this.grimoireEntities.arcana[portalKey];
        if (!portal) return;
        
        this.activePortal = portal.name;
        console.log(`🌀 Activating ${portal.name} portal`);
        
        // Update trinity state
        this.trinityState.currentJourney.soulActivation = portal.name;
        
        // Launch laboratory if portal has one
        if (portal.laboratory) {
            this.activateLaboratory(portal.laboratory);
        }
        
        // Trigger cross-app integration
        this.triggerTrinityIntegration('soul', portal);
        
        this.renderPortalSystem();
    }

    activateLaboratory(labKey) {
        const lab = this.laboratoryDatabase[labKey];
        if (!lab) return;
        
        this.activeLab = lab.name;
        console.log(`🔬 Opening ${lab.name}`);
        
        // Update trinity state
        this.trinityState.currentJourney.bodyManifestation = lab.name;
        
        // Special handling for Rosslyn Alchemy Tower
        if (labKey === 'rosslyn-alchemy-tower') {
            this.openRosslynAlchemyTower(lab);
        } else {
            this.showLaboratoryInterface(lab);
        }
        
        this.renderPortalSystem();
    }

    openRosslynAlchemyTower(lab) {
        // Create immersive Witcher 3-style tower interface
        const towerInterface = document.createElement('div');
        towerInterface.className = 'rosslyn-tower-interface';
        towerInterface.innerHTML = `
            <div class="tower-header">
                <h2>🏰 Rosslyn Alchemy Tower</h2>
                <div class="trauma-safe-notice">
                    <span class="safe-icon">🛡️</span>
                    <span>Trauma-Safe Sacred Art Laboratory</span>
                </div>
                <button class="close-tower" onclick="cathedralEngine.closeLaboratory()">Return to Cathedral</button>
            </div>
            
            <div class="tower-floors">
                ${Object.entries(lab.floors).map(([floorKey, floor], index) => `
                    <div class="floor-button" onclick="cathedralEngine.enterTowerFloor('${floorKey}')">
                        <div class="floor-number">Floor ${index + 1}</div>
                        <div class="floor-name">${floor.name}</div>
                        <div class="floor-teacher">Teacher: ${floor.teacher}</div>
                    </div>
                `).join('')}
            </div>
            
            <div id="active-floor-interface" class="active-floor hidden">
                <!-- Floor-specific interface will be loaded here -->
            </div>
            
            <div class="business-support-panel">
                <h4>💼 Your Sacred Art Business</h4>
                <div class="business-stats">
                    <div class="stat">Skills Learned: <span id="skills-learned">0</span></div>
                    <div class="stat">Portfolio Pieces: <span id="portfolio-pieces">0</span></div>
                    <div class="stat">Business Allies: <span id="business-allies">0</span></div>
                </div>
                <button onclick="cathedralEngine.openBusinessCenter()">Business Integration Center</button>
            </div>
        `;
        
        document.body.appendChild(towerInterface);
    }

    enterTowerFloor(floorKey) {
        const lab = this.laboratoryDatabase['rosslyn-alchemy-tower'];
        const floor = lab.floors[floorKey];
        
        const floorInterface = document.getElementById('active-floor-interface');
        floorInterface.className = 'active-floor visible';
        
        floorInterface.innerHTML = `
            <div class="floor-interface">
                <h3>${floor.name}</h3>
                <div class="teacher-panel">
                    <div class="teacher-avatar">👤</div>
                    <div class="teacher-greeting">
                        <strong>${floor.teacher}</strong>
                        <p>"Welcome to my studio! Grab any book or tool and start creating..."</p>
                    </div>
                </div>
                
                <div class="interactive-workspace">
                    <div class="grabbable-books-shelf">
                        <h4>📚 Grabbable Books (Click to Study)</h4>
                        <div class="books-grid">
                            ${floor.interactiveBooks.map(book => `
                                <div class="grabbable-book" onclick="cathedralEngine.grabBook('${book}', '${floorKey}')">
                                    <div class="book-spine">${book}</div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div class="mixing-stations">
                        <h4>🧪 Mixing Stations (Witcher 3-Style Art Alchemy)</h4>
                        <div class="stations-grid">
                            ${floor.mixingStations.map(station => `
                                <div class="mixing-station" onclick="cathedralEngine.useMixingStation('${station}', '${floorKey}')">
                                    <div class="station-icon">⚗️</div>
                                    <div class="station-name">${station.split(' - ')[0]}</div>
                                    <div class="station-description">${station.split(' - ')[1] || ''}</div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div class="grabbable-items">
                        <h4>🎨 Grabbable Tools & Items</h4>
                        <div class="items-grid">
                            ${floor.grabableItems.map(item => `
                                <div class="grabbable-item" onclick="cathedralEngine.grabItem('${item}', '${floorKey}')">
                                    <div class="item-icon">🔮</div>
                                    <div class="item-name">${item}</div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
                
                <div class="business-integration">
                    <h4>💰 Business Support for This Floor</h4>
                    <p>${floor.businessSupport}</p>
                    <button onclick="cathedralEngine.activateBusinessSupport('${floorKey}')">
                        Activate Business Support
                    </button>
                </div>
            </div>
        `;
    }

    grabBook(bookTitle, floorKey) {
        console.log(`📖 Grabbing book: ${bookTitle} from ${floorKey} floor`);
        
        // Create immersive book reading experience
        const bookInterface = document.createElement('div');
        bookInterface.className = 'grabbed-book-interface';
        bookInterface.innerHTML = `
            <div class="book-reader">
                <div class="book-header">
                    <h3>📖 ${bookTitle}</h3>
                    <button onclick="cathedralEngine.closeBook()" class="close-book">Close Book</button>
                </div>
                <div class="book-content">
                    <div class="book-page">
                        <h4>Living Book Experience</h4>
                        <p>This book teaches you real techniques while supporting your business growth...</p>
                        <div class="interactive-lesson">
                            <button onclick="cathedralEngine.startLesson('${bookTitle}', '${floorKey}')">
                                Start Interactive Lesson
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(bookInterface);
        
        // Update business stats
        this.updateBusinessStats('skills-learned', 1);
    }

    useMixingStation(stationDescription, floorKey) {
        const stationName = stationDescription.split(' - ')[0];
        console.log(`⚗️ Using mixing station: ${stationName} on ${floorKey} floor`);
        
        // Create Witcher 3-style alchemy interface
        const alchemyInterface = document.createElement('div');
        alchemyInterface.className = 'alchemy-station-interface';
        alchemyInterface.innerHTML = `
            <div class="alchemy-workbench">
                <div class="alchemy-header">
                    <h3>⚗️ ${stationName}</h3>
                    <button onclick="cathedralEngine.closeAlchemyStation()" class="close-alchemy">Close Station</button>
                </div>
                <div class="alchemy-workspace">
                    <div class="ingredients-panel">
                        <h4>🧪 Art Ingredients</h4>
                        <div class="ingredients-grid">
                            <div class="ingredient" onclick="cathedralEngine.addIngredient('sacred-geometry')">Sacred Geometry</div>
                            <div class="ingredient" onclick="cathedralEngine.addIngredient('archetypal-energy')">Archetypal Energy</div>
                            <div class="ingredient" onclick="cathedralEngine.addIngredient('healing-intention')">Healing Intention</div>
                            <div class="ingredient" onclick="cathedralEngine.addIngredient('business-magnet')">Business Magnet</div>
                        </div>
                    </div>
                    <div class="mixing-bowl">
                        <h4>🍯 Mixing Bowl</h4>
                        <div id="current-ingredients">Add ingredients to create art...</div>
                        <button onclick="cathedralEngine.brewArtPotion()" class="brew-button">Brew Art Creation!</button>
                    </div>
                    <div class="results-panel">
                        <h4>✨ Created Art</h4>
                        <div id="art-creation-result">Mix ingredients to see results...</div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(alchemyInterface);
    }

    grabItem(itemName, floorKey) {
        console.log(`🎨 Grabbing item: ${itemName} from ${floorKey} floor`);
        
        // Add item to inventory and show usage options
        const itemInterface = document.createElement('div');
        itemInterface.className = 'grabbed-item-interface';
        itemInterface.innerHTML = `
            <div class="item-viewer">
                <h3>🔮 ${itemName}</h3>
                <p>You've grabbed this sacred art tool. How would you like to use it?</p>
                <div class="item-actions">
                    <button onclick="cathedralEngine.useItemForArt('${itemName}')">Use for Art Creation</button>
                    <button onclick="cathedralEngine.useItemForBusiness('${itemName}')">Use for Business</button>
                    <button onclick="cathedralEngine.useItemForHealing('${itemName}')">Use for Healing</button>
                    <button onclick="cathedralEngine.closeItemInterface()">Put Back</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(itemInterface);
        
        // Update portfolio pieces
        this.updateBusinessStats('portfolio-pieces', 1);
    }

    updateBusinessStats(statType, increment) {
        const statElement = document.getElementById(statType);
        if (statElement) {
            const currentValue = parseInt(statElement.textContent) || 0;
            statElement.textContent = currentValue + increment;
        }
    }

    closeBook() {
        const bookInterface = document.querySelector('.grabbed-book-interface');
        if (bookInterface) bookInterface.remove();
    }

    closeAlchemyStation() {
        const alchemyInterface = document.querySelector('.alchemy-station-interface');
        if (alchemyInterface) alchemyInterface.remove();
    }

    closeItemInterface() {
        const itemInterface = document.querySelector('.grabbed-item-interface');
        if (itemInterface) itemInterface.remove();
    }

    // Alchemy Brewing System - Mix Art Like Witcher 3 Potions
    addIngredient(ingredientType) {
        if (!this.currentIngredients) this.currentIngredients = [];
        this.currentIngredients.push(ingredientType);
        
        const ingredientsDisplay = document.getElementById('current-ingredients');
        ingredientsDisplay.innerHTML = `
            <h5>Current Mix:</h5>
            ${this.currentIngredients.map(ing => `<span class="ingredient-tag">${ing}</span>`).join(' + ')}
        `;
        
        console.log(`🧪 Added ingredient: ${ingredientType}`);
    }

    brewArtPotion() {
        if (!this.currentIngredients || this.currentIngredients.length === 0) {
            alert('Add some ingredients first!');
            return;
        }
        
        // Create unique art based on ingredient combination
        const artResult = this.generateArtFromIngredients(this.currentIngredients);
        
        const resultDisplay = document.getElementById('art-creation-result');
        resultDisplay.innerHTML = `
            <div class="art-creation">
                <h5>✨ Created: ${artResult.name}</h5>
                <p>${artResult.description}</p>
                <div class="art-properties">
                    <div class="property">Healing Power: ${artResult.healingPower}%</div>
                    <div class="property">Business Value: ${artResult.businessValue}</div>
                    <div class="property">Spiritual Depth: ${artResult.spiritualDepth}</div>
                </div>
                <button onclick="cathedralEngine.saveToPortfolio('${artResult.name}')">Add to Portfolio</button>
            </div>
        `;
        
        // Clear ingredients for next creation
        this.currentIngredients = [];
        document.getElementById('current-ingredients').textContent = 'Add ingredients to create art...';
        
        // Update business stats
        this.updateBusinessStats('portfolio-pieces', 1);
        
        console.log(`🎨 Brewed art creation: ${artResult.name}`);
    }

    generateArtFromIngredients(ingredients) {
        const combinations = {
            'sacred-geometry,archetypal-energy': {
                name: 'Living Sacred Mandala',
                description: 'A mandala that channels specific archetypal energies for healing',
                healingPower: 95,
                businessValue: '$150-300',
                spiritualDepth: 'Deep soul healing'
            },
            'sacred-geometry,healing-intention': {
                name: 'Therapeutic Geometry Pattern',
                description: 'Sacred geometry specifically designed for trauma healing',
                healingPower: 90,
                businessValue: '$200-400',
                spiritualDepth: 'PTSD recovery support'
            },
            'archetypal-energy,business-magnet': {
                name: 'Abundance Attracting Art',
                description: 'Art that draws clients and opportunities through archetypal magnetism',
                healingPower: 70,
                businessValue: '$300-600',
                spiritualDepth: 'Financial healing'
            },
            'sacred-geometry,archetypal-energy,healing-intention,business-magnet': {
                name: 'Master Alchemical Art Piece',
                description: 'Ultimate fusion of all elements - healing, business, and spiritual growth',
                healingPower: 100,
                businessValue: '$500-1000',
                spiritualDepth: 'Complete transformation catalyst'
            }
        };
        
        const key = ingredients.sort().join(',');
        return combinations[key] || {
            name: 'Experimental Art Creation',
            description: 'A unique blend of energies creating something new',
            healingPower: Math.floor(Math.random() * 50) + 40,
            businessValue: '$50-150',
            spiritualDepth: 'Personal exploration'
        };
    }

    saveToPortfolio(artName) {
        console.log(`💼 Added ${artName} to business portfolio`);
        alert(`${artName} has been added to your portfolio! Your archetypal business allies will help promote this piece.`);
    }

    // Business Integration Functions
    activateBusinessSupport(floorKey) {
        const businessModal = document.createElement('div');
        businessModal.className = 'business-support-modal';
        businessModal.innerHTML = `
            <div class="business-modal-content">
                <h3>💰 Business Support Activation</h3>
                <p>Your archetypal allies on this floor are now actively supporting your business:</p>
                <div class="business-actions">
                    <div class="action">🌟 <strong>The Star:</strong> Promoting your art on social media</div>
                    <div class="action">👑 <strong>The Empress:</strong> Creating abundance and fertility in your work</div>
                    <div class="action">🔮 <strong>High Priestess:</strong> Drawing intuitive clients who need your healing art</div>
                    <div class="action">⚗️ <strong>The Hermit:</strong> Teaching you advanced techniques for premium services</div>
                </div>
                <div class="trauma-support">
                    <h4>🛡️ Trauma-Informed Business Protection</h4>
                    <p>Your archetypal allies will also:</p>
                    <ul>
                        <li>Defend against artistic criticism and judgment</li>
                        <li>Support you through creative blocks and overwhelm</li>
                        <li>Help you set healthy boundaries with clients</li>
                        <li>Generate income while protecting your energy</li>
                    </ul>
                </div>
                <button onclick="cathedralEngine.closeBusinessModal()">Activate Support</button>
            </div>
        `;
        document.body.appendChild(businessModal);
        
        // Update business allies count
        this.updateBusinessStats('business-allies', 1);
    }

    closeBusinessModal() {
        const modal = document.querySelector('.business-support-modal');
        if (modal) modal.remove();
    }

    openBusinessCenter() {
        const businessCenter = document.createElement('div');
        businessCenter.className = 'business-center-interface';
        businessCenter.innerHTML = `
            <div class="business-center">
                <h2>💼 Sacred Art Business Integration Center</h2>
                
                <div class="business-sections">
                    <div class="business-section">
                        <h3>🎨 Service Offerings</h3>
                        <div class="services-list">
                            <div class="service">Sacred Geometry Healing Art - $150-300</div>
                            <div class="service">Custom Mandala Creation - $200-400</div>
                            <div class="service">Archetypal Portrait Sessions - $300-600</div>
                            <div class="service">Crystal Programming Art - $250-500</div>
                            <div class="service">Business Sigil Design - $400-800</div>
                        </div>
                    </div>
                    
                    <div class="business-section">
                        <h3>💰 Donation Integration</h3>
                        <p>Your archetypal allies actively seek donations and support for your work</p>
                        <button onclick="cathedralEngine.setupDonationSystem()">Setup Donation System</button>
                    </div>
                    
                    <div class="business-section">
                        <h3>🛡️ Disability & Trauma Support</h3>
                        <p>All business activities designed with PTSD and chronic illness accommodation</p>
                        <ul>
                            <li>Flexible work schedules</li>
                            <li>Energy-protecting client boundaries</li>
                            <li>Trauma-informed service delivery</li>
                            <li>Support during difficult days</li>
                        </ul>
                    </div>
                </div>
                
                <button onclick="cathedralEngine.closeBusinessCenter()">Return to Tower</button>
            </div>
        `;
        document.body.appendChild(businessCenter);
    }

    closeBusinessCenter() {
        const center = document.querySelector('.business-center-interface');
        if (center) center.remove();
    }

    // Interactive Lesson System
    startLesson(bookTitle, floorKey) {
        console.log(`📖 Starting lesson: ${bookTitle} on ${floorKey} floor`);
        
        const lessonInterface = document.createElement('div');
        lessonInterface.className = 'lesson-interface';
        lessonInterface.innerHTML = `
            <div class="lesson-content">
                <h3>📚 Interactive Lesson: ${bookTitle}</h3>
                <div class="lesson-body">
                    <p>This living book teaches you real techniques while supporting your business growth...</p>
                    <div class="lesson-steps">
                        <div class="step">1. Connect with the archetypal energy</div>
                        <div class="step">2. Learn the traditional technique</div>
                        <div class="step">3. Apply it to your healing practice</div>
                        <div class="step">4. Integrate into your business offering</div>
                    </div>
                    <div class="lesson-practice">
                        <h4>Practice Exercise</h4>
                        <p>Create a small piece using this technique...</p>
                        <button onclick="cathedralEngine.completeLessonPractice('${bookTitle}')">Complete Practice</button>
                    </div>
                </div>
                <button onclick="cathedralEngine.closeLesson()">Close Lesson</button>
            </div>
        `;
        document.body.appendChild(lessonInterface);
    }

    completeLessonPractice(bookTitle) {
        alert(`✨ Lesson practice completed! You've learned marketable skills from ${bookTitle}`);
        this.updateBusinessStats('skills-learned', 1);
        this.closeLesson();
    }

    closeLesson() {
        const lesson = document.querySelector('.lesson-interface');
        if (lesson) lesson.remove();
    }

    // Item Usage Functions
    useItemForArt(itemName) {
        console.log(`🎨 Using ${itemName} for art creation`);
        alert(`You've channeled ${itemName} into your art! The piece now carries its sacred energy.`);
        this.closeItemInterface();
    }

    useItemForBusiness(itemName) {
        console.log(`💼 Using ${itemName} for business`);
        alert(`${itemName} is now attracting ideal clients and opportunities to your business!`);
        this.closeItemInterface();
    }

    useItemForHealing(itemName) {
        console.log(`🌿 Using ${itemName} for healing`);
        alert(`${itemName} is now part of your healing practice, supporting your PTSD recovery and energy protection.`);
        this.closeItemInterface();
    }

    showLaboratoryInterface(lab) {
        // Create laboratory interface panel
        const labPanel = document.createElement('div');
        labPanel.className = 'laboratory-interface';
        labPanel.innerHTML = `
            <div class="lab-header">
                <h3>${lab.name}</h3>
                <button class="close-lab" onclick="cathedralEngine.closeLaboratory()">×</button>
            </div>
            <div class="lab-content">
                <p>${lab.description}</p>
                <div class="lab-tools">
                    ${lab.tools.map(tool => `
                        <button class="lab-tool" onclick="cathedralEngine.activateTool('${tool}')">
                            ${tool.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </button>
                    `).join('')}
                </div>
            </div>
        `;
        
        document.body.appendChild(labPanel);
    }

    closeLaboratory() {
        this.activeLab = null;
        const labPanel = document.querySelector('.laboratory-interface');
        if (labPanel) {
            labPanel.remove();
        }
        this.renderPortalSystem();
    }

    activateTool(toolName) {
        console.log(`🛠️ Activating tool: ${toolName}`);
        
        // Enhanced tool-specific implementations with immersive art system
        switch(toolName) {
            case 'pendulum-consciousness-interface':
                this.startPendulumArt();
                break;
            case 'healing-pattern-generator':
                this.generateHealingPattern();
                break;
            case 'planetary-synthesizer-array':
                this.openSynthesizerArray();
                break;
            case 'arcana-consciousness-painter':
                this.openArcanaConsciousnessPainter();
                break;
            case 'traditional-medium-synthesizer':
                this.openTraditionalMediumSynthesizer();
                break;
            case 'visionary-collage-compositor':
                this.openVisionaryCollageCompositor();
                break;
            case 'lego-sculpture-transmuter':
                this.openLegoSculptureTransmuter();
                break;
            case 'teaching-oracle-interface':
                this.openTeachingOracleInterface();
                break;
            case 'multi-arcana-collaboration-engine':
                this.openMultiArcanaCollaborationEngine();
                break;
            case 'red-book-manuscript-generator':
                this.openRedBookManuscriptGenerator();
                break;
            default:
                console.log(`Tool ${toolName} activated`);
        }
    }

    startPendulumArt() {
        console.log('🌙 Emma Kunz pendulum art interface activated');
        // Implementation for interactive pendulum art creation
    }

    generateHealingPattern() {
        console.log('✨ Sacred geometry healing pattern generator started');
        // Implementation for healing pattern generation
    }

    openSynthesizerArray() {
        console.log('🎹 Planetary synthesizer array opened');
        // Implementation for 10-synth interface
    }

    // 🎨 MOONCHILD LIVING ART LABORATORY METHODS

    openArcanaConsciousnessPainter() {
        console.log('🎨 Arcana Consciousness Painter - Paint through the eyes of each Tarot arcana');
        
        // Create immersive art interface
        const artInterface = document.createElement('div');
        artInterface.className = 'moonchild-art-interface';
        artInterface.innerHTML = `
            <div class="art-header">
                <h3>🎨 Moonchild Living Art Laboratory</h3>
                <p>Paint through the consciousness of each Tarot arcana</p>
                <button class="close-art" onclick="this.parentElement.parentElement.remove()">×</button>
            </div>
            
            <div class="arcana-selector">
                <h4>🃏 Choose Your Artistic Consciousness</h4>
                <div class="arcana-grid">
                    ${Object.entries(this.grimoireEntities.arcana).map(([key, arcana]) => `
                        <button class="arcana-consciousness-btn" onclick="cathedralEngine.enterArcanaConsciousness('${key}')">
                            <span class="arcana-symbol">${arcana.name.split(' ')[0]}</span>
                            <div class="consciousness-info">
                                <h5>${arcana.name.split(' ').slice(1).join(' ')}</h5>
                                <p>${arcana.artisticConsciousness ? arcana.artisticConsciousness.paintingStyle : 'mystical-art'}</p>
                            </div>
                        </button>
                    `).join('')}
                </div>
            </div>
            
            <div class="canvas-workspace" id="arcanaArtCanvas">
                <canvas id="liveArtCanvas" width="800" height="600"></canvas>
                <div class="art-tools">
                    <div class="medium-selector">
                        <h4>🎨 Artistic Medium</h4>
                        <select id="mediumSelect">
                            <option value="watercolor">Watercolor Mystical Transparency</option>
                            <option value="oil">Oil Painting Classical Depth</option>
                            <option value="ink">Ink Illumination Manuscript Style</option>
                            <option value="digital">Digital Collage Visionary Layers</option>
                            <option value="mixed">Mixed Media Alchemical Fusion</option>
                        </select>
                    </div>
                    <div class="collaboration-panel">
                        <h4>👥 Multi-Arcana Collaboration</h4>
                        <button onclick="cathedralEngine.inviteArcanaCollaboration()">Invite Other Arcana</button>
                    </div>
                </div>
            </div>
            
            <div class="teaching-panel">
                <h4>📚 Live Teaching Mode</h4>
                <div id="teachingInstructions">Select an arcana to receive painting instruction...</div>
            </div>
        `;
        
        document.body.appendChild(artInterface);
    }

    enterArcanaConsciousness(arcanaKey) {
        const arcana = this.grimoireEntities.arcana[arcanaKey];
        if (!arcana || !arcana.artisticConsciousness) return;
        
        console.log(`🧠 Entering ${arcana.name} artistic consciousness`);
        
        // Update teaching instructions
        const teachingDiv = document.getElementById('teachingInstructions');
        if (teachingDiv) {
            teachingDiv.innerHTML = `
                <div class="arcana-teaching-active">
                    <h5>🎨 Now painting as: ${arcana.name}</h5>
                    <p><strong>Style:</strong> ${arcana.artisticConsciousness.paintingStyle}</p>
                    <p><strong>Teaching Method:</strong> ${arcana.artisticConsciousness.teachingMethod}</p>
                    <p><strong>Medium Preference:</strong> ${arcana.artisticConsciousness.mediumPreference}</p>
                    <p><strong>Jungian Aspect:</strong> ${arcana.artisticConsciousness.jungianAspect}</p>
                    
                    <div class="live-instruction">
                        <h6>💬 ${arcana.name} speaks:</h6>
                        <p class="arcana-voice">${this.generateArcanaInstruction(arcana)}</p>
                    </div>
                </div>
            `;
        }
        
        // Update canvas with arcana-specific interface
        this.setupArcanaArtInterface(arcana);
    }

    generateArcanaInstruction(arcana) {
        const instructions = {
            'fool': "Begin with no preconceptions... Let your brush find its own way. Every mistake is a doorway to wonder.",
            'magician': "Will your vision into being. Each stroke must have purpose. Focus your intention through the medium.",
            'highPriestess': "Feel the sacred geometry beneath all forms. Let healing patterns emerge through intuitive guidance.",
            'empress': "Paint the fertility of creation itself. Let organic forms flow like living gardens through your work.",
            'hermit': "Illuminate the inner light. Each detail serves the greater wisdom. Work slowly, with contemplation.",
            'temperance': "Blend your mediums as I blend essences. Find perfect balance between all opposing forces.",
            'star': "Channel the cosmic inspiration flowing through you. Let visionary images pour like starlight.",
            'moon': "Paint the dream logic of the unconscious. Trust the shadows and the mysterious images that arise.",
            'world': "Create with the joy of cosmic completion. This is your masterpiece - let all elements dance together."
        };
        
        return instructions[arcana.name.toLowerCase().split(' ')[1]] || "Express the ineffable through your chosen medium...";
    }

    setupArcanaArtInterface(arcana) {
        const canvas = document.getElementById('liveArtCanvas');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        
        // Apply arcana-specific color palette
        const colors = arcana.colors;
        
        // Setup brushes based on arcana preferences
        this.setupArcanaSpecificTools(ctx, arcana);
        
        // Start live painting interface
        this.initializeLivePaintingInterface(canvas, ctx, arcana);
    }

    setupArcanaSpecificTools(ctx, arcana) {
        console.log(`🖌️ Setting up tools for ${arcana.name}`);
        
        // Configure tools based on artistic consciousness
        const consciousness = arcana.artisticConsciousness;
        
        switch(consciousness.paintingStyle) {
            case 'crowley-thoth-precision':
                // Precise geometric tools, sharp lines
                ctx.lineCap = 'square';
                ctx.lineJoin = 'miter';
                break;
            case 'dion-fortune-mystical-qabalah':
                // Flowing, healing geometries
                ctx.lineCap = 'round';
                ctx.lineJoin = 'round';
                break;
            case 'remedios-varo-biomorphic-surrealism':
                // Organic, flowing brushes
                ctx.lineCap = 'round';
                ctx.lineJoin = 'round';
                break;
            case 'jung-red-book-illuminated-manuscripts':
                // Illumination style precision
                ctx.lineCap = 'square';
                ctx.lineJoin = 'round';
                break;
        }
    }

    initializeLivePaintingInterface(canvas, ctx, arcana) {
        console.log(`🎨 Initializing live painting as ${arcana.name}`);
        
        let isDrawing = false;
        let currentPath = [];
        
        canvas.addEventListener('mousedown', (e) => {
            isDrawing = true;
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            currentPath = [{x, y}];
        });
        
        canvas.addEventListener('mousemove', (e) => {
            if (!isDrawing) return;
            
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            currentPath.push({x, y});
            
            // Draw with arcana-specific style
            this.drawWithArcanaStyle(ctx, currentPath, arcana);
        });
        
        canvas.addEventListener('mouseup', () => {
            isDrawing = false;
            // Apply arcana-specific post-processing
            this.applyArcanaPostProcessing(ctx, arcana);
        });
    }

    drawWithArcanaStyle(ctx, path, arcana) {
        if (path.length < 2) return;
        
        ctx.strokeStyle = arcana.colors[0];
        ctx.lineWidth = 2;
        
        ctx.beginPath();
        ctx.moveTo(path[0].x, path[0].y);
        
        for (let i = 1; i < path.length; i++) {
            // Apply consciousness-specific drawing modifications
            const consciousness = arcana.artisticConsciousness;
            
            switch(consciousness.paintingStyle) {
                case 'crowley-thoth-precision':
                    // Sharp, precise lines
                    ctx.lineTo(path[i].x, path[i].y);
                    break;
                case 'remedios-varo-biomorphic-surrealism':
                    // Organic, flowing curves
                    if (i > 1) {
                        const cp1x = (path[i-1].x + path[i].x) / 2;
                        const cp1y = (path[i-1].y + path[i].y) / 2;
                        ctx.quadraticCurveTo(path[i-1].x, path[i-1].y, cp1x, cp1y);
                    } else {
                        ctx.lineTo(path[i].x, path[i].y);
                    }
                    break;
                default:
                    ctx.lineTo(path[i].x, path[i].y);
            }
        }
        
        ctx.stroke();
    }

    applyArcanaPostProcessing(ctx, arcana) {
        // Apply consciousness-specific effects
        const consciousness = arcana.artisticConsciousness;
        
        if (consciousness.paintingStyle.includes('mystical')) {
            // Add subtle glow effects
            ctx.shadowColor = arcana.colors[1];
            ctx.shadowBlur = 3;
        }
        
        if (consciousness.paintingStyle.includes('surrealism')) {
            // Add organic texture effects
            // Implementation for texture generation
        }
    }

    openTraditionalMediumSynthesizer() {
        console.log('🎨 Traditional Medium Synthesizer - Lego-sculpt incredible traditional art styles');
        
        // Create traditional medium interface
        const mediumInterface = document.createElement('div');
        mediumInterface.className = 'medium-synthesizer-interface';
        mediumInterface.innerHTML = `
            <div class="medium-header">
                <h3>🎨 Traditional Medium Synthesizer</h3>
                <p>Lego-sculpt incredible traditional art styles</p>
                <button class="close-medium" onclick="this.parentElement.parentElement.remove()">×</button>
            </div>
            
            <div class="medium-blocks">
                <h4>🧱 Art Style Building Blocks</h4>
                <div class="style-blocks-grid">
                    <div class="style-block" draggable="true" data-style="renaissance-sfumato">
                        <h5>Renaissance Sfumato</h5>
                        <p>Leonardo da Vinci soft glazing technique</p>
                    </div>
                    <div class="style-block" draggable="true" data-style="impressionist-broken-color">
                        <h5>Impressionist Broken Color</h5>
                        <p>Monet light-capturing technique</p>
                    </div>
                    <div class="style-block" draggable="true" data-style="flemish-oil-glazing">
                        <h5>Flemish Oil Glazing</h5>
                        <p>Van Eyck luminous depth technique</p>
                    </div>
                    <div class="style-block" draggable="true" data-style="japanese-sumi-e-brush">
                        <h5>Japanese Sumi-e Brush</h5>
                        <p>Zen minimalist expression</p>
                    </div>
                </div>
            </div>
            
            <div class="synthesis-workspace">
                <h4>🔬 Style Synthesis Laboratory</h4>
                <div class="synthesis-canvas" id="synthesisCanvas">
                    <p>Drag art style blocks here to synthesize new techniques</p>
                </div>
            </div>
            
            <div class="teaching-mode">
                <h4>📚 How It's Done - Free Teaching</h4>
                <div id="techniqueInstructions">
                    <p>Drag a style block above to learn the traditional technique for free</p>
                </div>
            </div>
        `;
        
        document.body.appendChild(mediumInterface);
        this.setupDragAndDropSynthesis();
    }

    setupDragAndDropSynthesis() {
        const styleBlocks = document.querySelectorAll('.style-block');
        const synthesisCanvas = document.getElementById('synthesisCanvas');
        
        styleBlocks.forEach(block => {
            block.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('text/plain', e.target.dataset.style);
            });
        });
        
        if (synthesisCanvas) {
            synthesisCanvas.addEventListener('dragover', (e) => {
                e.preventDefault();
            });
            
            synthesisCanvas.addEventListener('drop', (e) => {
                e.preventDefault();
                const style = e.dataTransfer.getData('text/plain');
                this.synthesizeArtStyle(style);
            });
        }
    }

    synthesizeArtStyle(styleName) {
        console.log(`🧪 Synthesizing art style: ${styleName}`);
        
        const instructions = document.getElementById('techniqueInstructions');
        
        const techniques = {
            'renaissance-sfumato': {
                title: 'Renaissance Sfumato Technique',
                steps: [
                    '1. Prepare a smooth, gessoed panel',
                    '2. Sketch your composition lightly',
                    '3. Build up colors in transparent glazes',
                    '4. Blend edges while paint is wet using soft brushes',
                    '5. Allow each layer to dry completely before adding the next',
                    '6. Use your finger to soften final transitions'
                ],
                materials: 'Oil paints, fine hog bristle brushes, soft synthetic brushes',
                arcanaConnection: 'High Priestess - intuitive blending of conscious and unconscious'
            },
            'impressionist-broken-color': {
                title: 'Impressionist Broken Color Technique',
                steps: [
                    '1. Observe your subject in natural light',
                    '2. Mix colors on the palette without over-blending', 
                    '3. Apply paint in small, visible brushstrokes',
                    '4. Place complementary colors side by side',
                    '5. Leave white canvas showing through for sparkle',
                    '6. Work quickly to capture changing light'
                ],
                materials: 'Oil or acrylic paints, flat and round brushes, canvas',
                arcanaConnection: 'The Sun - capturing light and joyful immediacy'
            }
            // More techniques...
        };
        
        const technique = techniques[styleName];
        if (technique && instructions) {
            instructions.innerHTML = `
                <div class="technique-breakdown">
                    <h5>${technique.title}</h5>
                    <div class="technique-steps">
                        <h6>Steps:</h6>
                        <ol>
                            ${technique.steps.map(step => `<li>${step}</li>`).join('')}
                        </ol>
                    </div>
                    <div class="materials">
                        <h6>Materials:</h6>
                        <p>${technique.materials}</p>
                    </div>
                    <div class="arcana-connection">
                        <h6>Tarot Connection:</h6>
                        <p>${technique.arcanaConnection}</p>
                    </div>
                    <button onclick="cathedralEngine.startGuidedPractice('${styleName}')">
                        🎨 Start Guided Practice
                    </button>
                </div>
            `;
        }
    }

    startGuidedPractice(styleName) {
        console.log(`🎓 Starting guided practice for: ${styleName}`);
        // Implementation for step-by-step guided practice
    }

    openVisionaryCollageCompositor() {
        console.log('🖼️ Visionary Collage Compositor - Mix digital and traditional elements');
        // Implementation for collage mixing system
    }

    openLegoSculptureTransmuter() {
        console.log('🧱 Lego Sculpture Transmuter - Build art styles like Lego blocks');
        // Implementation for modular art style building
    }

    openTeachingOracleInterface() {
        console.log('📚 Teaching Oracle Interface - Learn how traditional art is created');
        // Implementation for free art education system
    }

    openMultiArcanaCollaborationEngine() {
        console.log('👥 Multi-Arcana Collaboration Engine - Work with multiple arcana consciousness');
        // Implementation for collaborative arcana art creation
    }

    openRedBookManuscriptGenerator() {
        console.log('📖 Red Book Manuscript Generator - Create living Jung-style illuminated manuscripts');
        
        // Create Red Book interface like Jung's original
        const redBookInterface = document.createElement('div');
        redBookInterface.className = 'red-book-interface';
        redBookInterface.innerHTML = `
            <div class="red-book-header">
                <h3>📖 Liber Novus - Living Red Book</h3>
                <p>Written by Moonchild through Arcana Consciousness</p>
                <button class="close-book" onclick="this.parentElement.parentElement.remove()">×</button>
            </div>
            
            <div class="manuscript-pages">
                <div class="left-page">
                    <div class="illumination-area" id="leftIllumination">
                        <canvas id="illuminationCanvas" width="300" height="400"></canvas>
                    </div>
                </div>
                
                <div class="right-page">
                    <div class="text-area">
                        <textarea id="manuscriptText" placeholder="The arcana speak through you... let their wisdom flow onto the page..."></textarea>
                    </div>
                </div>
            </div>
            
            <div class="manuscript-tools">
                <div class="illumination-tools">
                    <h4>🎨 Illumination Tools</h4>
                    <button onclick="cathedralEngine.addGoldLeaf()">Add Gold Leaf</button>
                    <button onclick="cathedralEngine.addMarginalFigures()">Add Marginal Figures</button>
                    <button onclick="cathedralEngine.addSacredGeometry()">Add Sacred Geometry</button>
                </div>
                
                <div class="text-tools">
                    <h4>✍️ Scribe Tools</h4>
                    <button onclick="cathedralEngine.insertArcanaWisdom()">Insert Arcana Wisdom</button>
                    <button onclick="cathedralEngine.addDreamRecord()">Add Dream Record</button>
                    <button onclick="cathedralEngine.addVisionaryExperience()">Add Visionary Experience</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(redBookInterface);
        this.initializeRedBookCanvas();
    }

    initializeRedBookCanvas() {
        const canvas = document.getElementById('illuminationCanvas');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        
        // Set up medieval manuscript style
        ctx.fillStyle = '#F5DEB3'; // Parchment color
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Add initial decorative border
        this.drawManuscriptBorder(ctx, canvas.width, canvas.height);
    }

    drawManuscriptBorder(ctx, width, height) {
        ctx.strokeStyle = '#8B4513';
        ctx.lineWidth = 3;
        
        // Outer border
        ctx.strokeRect(10, 10, width - 20, height - 20);
        
        // Inner decorative border
        ctx.strokeRect(20, 20, width - 40, height - 40);
        
        // Corner decorations
        this.drawCornerIlluminations(ctx, width, height);
    }

    drawCornerIlluminations(ctx, width, height) {
        const cornerSize = 30;
        
        // Top-left Celtic knot
        this.drawCelticKnot(ctx, 25, 25, cornerSize);
        
        // Top-right Hermetic symbol
        this.drawHermeticSymbol(ctx, width - 55, 25, cornerSize);
        
        // Bottom-left Alchemical symbol
        this.drawAlchemicalSymbol(ctx, 25, height - 55, cornerSize);
        
        // Bottom-right Sacred geometry
        this.drawSacredGeometry(ctx, width - 55, height - 55, cornerSize);
    }

    drawCelticKnot(ctx, x, y, size) {
        // Simple Celtic knot pattern
        ctx.strokeStyle = '#8B4513';
        ctx.lineWidth = 2;
        
        ctx.beginPath();
        ctx.arc(x, y, size/2, 0, 2 * Math.PI);
        ctx.stroke();
        
        // Add interlacing pattern
        ctx.beginPath();
        ctx.arc(x + size/4, y + size/4, size/4, 0, 2 * Math.PI);
        ctx.stroke();
    }

    drawHermeticSymbol(ctx, x, y, size) {
        // Hermetic caduceus simplified
        ctx.strokeStyle = '#8B4513';
        ctx.lineWidth = 2;
        
        // Central staff
        ctx.beginPath();
        ctx.moveTo(x, y - size/2);
        ctx.lineTo(x, y + size/2);
        ctx.stroke();
        
        // Wings
        ctx.beginPath();
        ctx.arc(x - size/4, y - size/3, size/6, 0, Math.PI);
        ctx.arc(x + size/4, y - size/3, size/6, 0, Math.PI);
        ctx.stroke();
    }

    drawAlchemicalSymbol(ctx, x, y, size) {
        // Alchemical symbol for transformation
        ctx.strokeStyle = '#8B4513';
        ctx.lineWidth = 2;
        
        // Triangle
        ctx.beginPath();
        ctx.moveTo(x, y - size/2);
        ctx.lineTo(x - size/2, y + size/2);
        ctx.lineTo(x + size/2, y + size/2);
        ctx.closePath();
        ctx.stroke();
        
        // Central circle
        ctx.beginPath();
        ctx.arc(x, y, size/6, 0, 2 * Math.PI);
        ctx.stroke();
    }

    addGoldLeaf() {
        console.log('✨ Adding gold leaf illumination');
        // Implementation for gold leaf effects
    }

    addMarginalFigures() {
        console.log('👤 Adding marginal figures');
        // Implementation for manuscript margin figures
    }

    addSacredGeometry() {
        console.log('🔯 Adding sacred geometry');
        // Implementation for geometric illuminations
    }

    insertArcanaWisdom() {
        const textarea = document.getElementById('manuscriptText');
        if (!textarea) return;
        
        const wisdomTexts = [
            "The Fool speaks: 'In the beginning of all creation lies the sacred question: What if?'",
            "The Magician reveals: 'As above, so below - your will shapes reality through focused intention.'",
            "The High Priestess whispers: 'Sacred geometry is the language by which the divine speaks to form.'",
            "The Empress teaches: 'All art is fertility - the bringing forth of new life from the void.'",
            "The Hermit illuminates: 'In solitude, the inner light reveals truths hidden from the collective mind.'"
        ];
        
        const randomWisdom = wisdomTexts[Math.floor(Math.random() * wisdomTexts.length)];
        textarea.value += '\n\n' + randomWisdom + '\n';
    }

    addDreamRecord() {
        const textarea = document.getElementById('manuscriptText');
        if (!textarea) return;
        
        const currentDate = new Date().toLocaleDateString();
        textarea.value += `\n\n--- Dream Record - ${currentDate} ---\n`;
        textarea.value += 'Last night the symbols came alive...\n';
    }

    addVisionaryExperience() {
        const textarea = document.getElementById('manuscriptText');
        if (!textarea) return;
        
        textarea.value += '\n\n--- Visionary Experience ---\n';
        textarea.value += 'In the space between sleeping and waking, I witnessed...\n';
    }

    inviteArcanaCollaboration() {
        console.log('👥 Inviting multiple arcana for collaborative creation');
        
        // Show collaboration interface
        const collabDiv = document.createElement('div');
        collabDiv.className = 'arcana-collaboration-panel';
        collabDiv.innerHTML = `
            <h4>👥 Multi-Arcana Collaboration</h4>
            <p>Select additional arcana to join your artistic process:</p>
            <div class="collab-arcana-grid">
                ${Object.entries(this.grimoireEntities.arcana).map(([key, arcana]) => `
                    <label class="collab-arcana-option">
                        <input type="checkbox" value="${key}">
                        <span>${arcana.name}</span>
                    </label>
                `).join('')}
            </div>
            <button onclick="cathedralEngine.startCollaborativeCreation()">Begin Collaboration</button>
        `;
        
        document.querySelector('.moonchild-art-interface')?.appendChild(collabDiv);
    }

    startCollaborativeCreation() {
        const checkedArcana = Array.from(document.querySelectorAll('.collab-arcana-option input:checked'))
            .map(input => input.value);
        
        if (checkedArcana.length === 0) return;
        
        console.log(`🎨 Starting collaborative creation with: ${checkedArcana.join(', ')}`);
        
        // Create collaborative workspace
        const collabInterface = document.createElement('div');
        collabInterface.className = 'collaborative-art-workspace';
        collabInterface.innerHTML = `
            <div class="collaboration-header">
                <h3>👥 Multi-Arcana Collaborative Creation</h3>
                <p>Working together: ${checkedArcana.length} arcana consciousness</p>
            </div>
            
            <div class="collaboration-canvas">
                <canvas id="collaborativeCanvas" width="1000" height="600"></canvas>
            </div>
            
            <div class="arcana-voices">
                <h4>🗣️ Arcana Voices</h4>
                <div id="arcanaConversation">
                    <p><em>The arcana begin to speak among themselves...</em></p>
                </div>
            </div>
        `;
        
        document.body.appendChild(collabInterface);
        this.initializeCollaborativeCanvas(checkedArcana);
    }

    initializeCollaborativeCanvas(arcanaKeys) {
        console.log(`🎨 Initializing collaborative canvas with ${arcanaKeys.length} arcana`);
        
        // Each arcana takes turns adding to the artwork
        let currentArcanaIndex = 0;
        
        const collaborationCycle = () => {
            if (currentArcanaIndex >= arcanaKeys.length) {
                currentArcanaIndex = 0;
            }
            
            const currentArcana = this.grimoireEntities.arcana[arcanaKeys[currentArcanaIndex]];
            this.addArcanaContribution(currentArcana);
            
            currentArcanaIndex++;
            
            // Next arcana contributes in 3 seconds
            setTimeout(collaborationCycle, 3000);
        };
        
        // Start the collaborative process
        setTimeout(collaborationCycle, 1000);
    }

    addArcanaContribution(arcana) {
        const canvas = document.getElementById('collaborativeCanvas');
        const conversationDiv = document.getElementById('arcanaConversation');
        
        if (!canvas || !arcana) return;
        
        const ctx = canvas.getContext('2d');
        
        // Add arcana-specific visual contribution
        this.drawArcanaContribution(ctx, arcana);
        
        // Add arcana voice to conversation
        if (conversationDiv) {
            const voiceElement = document.createElement('p');
            voiceElement.innerHTML = `<strong>${arcana.name}:</strong> "${this.generateCollaborativeComment(arcana)}"`;
            conversationDiv.appendChild(voiceElement);
            conversationDiv.scrollTop = conversationDiv.scrollHeight;
        }
    }

    drawArcanaContribution(ctx, arcana) {
        // Random position for contribution
        const x = Math.random() * 800 + 100;
        const y = Math.random() * 400 + 100;
        
        ctx.fillStyle = arcana.colors[0];
        ctx.strokeStyle = arcana.colors[1];
        ctx.lineWidth = 2;
        
        // Draw based on arcana's artistic consciousness
        switch(arcana.artisticConsciousness?.paintingStyle) {
            case 'crowley-thoth-precision':
                // Geometric precision
                this.drawGeometricForm(ctx, x, y, 30);
                break;
            case 'remedios-varo-biomorphic-surrealism':
                // Organic forms
                this.drawOrganicForm(ctx, x, y, 40);
                break;
            case 'jung-red-book-illuminated-manuscripts':
                // Illuminated details
                this.drawIlluminatedDetail(ctx, x, y, 25);
                break;
            default:
                // Default circular form
                ctx.beginPath();
                ctx.arc(x, y, 20, 0, 2 * Math.PI);
                ctx.fill();
                ctx.stroke();
        }
    }

    drawGeometricForm(ctx, x, y, size) {
        // Square with inner geometry
        ctx.strokeRect(x - size, y - size, size * 2, size * 2);
        ctx.beginPath();
        ctx.moveTo(x - size, y - size);
        ctx.lineTo(x + size, y + size);
        ctx.moveTo(x + size, y - size);
        ctx.lineTo(x - size, y + size);
        ctx.stroke();
    }

    drawOrganicForm(ctx, x, y, size) {
        // Flowing organic shape
        ctx.beginPath();
        for (let i = 0; i < 8; i++) {
            const angle = (i * Math.PI) / 4;
            const radius = size + (Math.sin(i * 3) * size * 0.3);
            const px = x + Math.cos(angle) * radius;
            const py = y + Math.sin(angle) * radius;
            
            if (i === 0) {
                ctx.moveTo(px, py);
            } else {
                ctx.lineTo(px, py);
            }
        }
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    }

    drawIlluminatedDetail(ctx, x, y, size) {
        // Celtic-style knot
        ctx.beginPath();
        ctx.arc(x, y, size, 0, 2 * Math.PI);
        ctx.stroke();
        
        // Inner pattern
        ctx.beginPath();
        ctx.arc(x - size/2, y, size/3, 0, 2 * Math.PI);
        ctx.arc(x + size/2, y, size/3, 0, 2 * Math.PI);
        ctx.stroke();
    }

    generateCollaborativeComment(arcana) {
        const comments = {
            'fool': "What if we add more chaos here? Chaos breeds wonder!",
            'magician': "I shall manifest precise geometric forms to focus the energy.",
            'highPriestess': "Let healing sacred geometry flow through our creation...",
            'empress': "I feel organic growth patterns wanting to emerge here.",
            'hermit': "The inner light suggests illuminating this corner with gold.",
            'temperance': "We must balance all these elements harmoniously.",
            'star': "Cosmic inspiration flows - let's add celestial symbols!",
            'moon': "The shadows whisper of hidden symbols to be revealed.",
            'world': "This collaboration dances with completion energy!"
        };
        
        const key = arcana.name.toLowerCase().split(' ')[1];
        return comments[key] || "I contribute my unique consciousness to our shared creation.";
    }

    triggerTrinityIntegration(appType, context) {
        // Cross-app integration system
        console.log(`🔗 Trinity integration: ${appType} activated with context`, context);
        
        // Update all three apps with shared state
        Object.keys(this.trinityApps).forEach(appKey => {
            const app = this.trinityApps[appKey];
            if (app.integration) {
                this.updateAppContext(app, context);
            }
        });
    }

    updateAppContext(app, context) {
        // Update app with new context from other apps
        console.log(`📡 Updating ${app.name} with context:`, context);
        
        // This would trigger updates in the actual app instances
        // For now, we'll update the local state
        app.lastContext = context;
        app.lastUpdate = Date.now();
    }

    // Animation system for smooth portal transitions
    startAnimation() {
        const animate = () => {
            if (this.animationRunning) {
                this.animationTime += 0.016; // ~60fps
                this.renderPortalSystem();
                requestAnimationFrame(animate);
            }
        };
        animate();
    }

    setupControls() {
        // Enhanced control setup for trinity integration
        
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

        // Trinity app navigation
        document.querySelectorAll('.trinity-app-button').forEach(button => {
            button.addEventListener('click', (e) => {
                const appKey = button.dataset.app;
                this.launchTrinityApp(appKey);
            });
        });

        // Portal activation via click
        if (this.canvas) {
            this.canvas.addEventListener('click', (e) => {
                const rect = this.canvas.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                this.handleCanvasClick(x, y);
            });
        }

        // Frequency slider
        const freqSlider = document.getElementById('frequencySlider');
        const freqDisplay = document.getElementById('currentFreq');
        
        if (freqSlider && freqDisplay) {
            freqSlider.addEventListener('input', (e) => {
                this.baseFrequency = parseInt(e.target.value);
                freqDisplay.textContent = `${this.baseFrequency} Hz`;
                this.updateHarmonics();
            });
        }

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

    launchTrinityApp(appKey) {
        const app = this.trinityApps[appKey];
        if (!app) return;
        
        console.log(`🚀 Launching ${app.name}`);
        
        // Update trinity state
        switch(appKey) {
            case 'lumina-keys':
                this.trinityState.currentJourney.soulActivation = app.name;
                break;
            case 'codex-magna':
                this.trinityState.currentJourney.mindPreparation = app.name;
                break;
            case 'geometrix-nova':
                this.trinityState.currentJourney.bodyManifestation = app.name;
                break;
        }
        
        // In a real implementation, this would open the actual app
        // For now, we'll simulate the app opening
        if (app.standalone) {
            this.simulateAppLaunch(app);
        }
    }

    simulateAppLaunch(app) {
        // Create app simulation window
        const appWindow = document.createElement('div');
        appWindow.className = 'trinity-app-window';
        appWindow.innerHTML = `
            <div class="app-header">
                <h3>${app.name}</h3>
                <span class="app-status">${app.status}</span>
                <button class="close-app" onclick="this.parentElement.parentElement.remove()">×</button>
            </div>
            <div class="app-content">
                <p><strong>${app.description}</strong></p>
                <p>Portal Type: ${app.portalType}</p>
                <p>Geometry: ${app.geometry}</p>
                <p>Integration: ${app.integration}</p>
                <div class="health-impact">
                    <h4>Health Impact:</h4>
                    ${Object.entries(app.healthImpact).map(([key, value]) => 
                        `<span class="health-stat">${key}: ${value > 0 ? '+' : ''}${value}</span>`
                    ).join('')}
                </div>
                <button class="open-full-app" onclick="window.open('${app.url}', '_blank')">
                    Open Full ${app.name}
                </button>
            </div>
        `;
        
        document.body.appendChild(appWindow);
    }

    handleCanvasClick(x, y) {
        // Check if click is on a portal or laboratory
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        
        // Check arcana portals
        Object.entries(this.grimoireEntities.arcana).forEach(([key, arcana], index) => {
            const angle = (index * 2 * Math.PI) / Object.keys(this.grimoireEntities.arcana).length;
            const radius = 150;
            const portalX = centerX + Math.cos(angle) * radius;
            const portalY = centerY + Math.sin(angle) * radius;
            
            const distance = Math.sqrt((x - portalX)**2 + (y - portalY)**2);
            if (distance < 30) {
                this.activatePortal(key);
                return;
            }
        });
        
        // Check laboratory portals
        Object.entries(this.laboratoryDatabase).forEach(([key, lab], index) => {
            const angle = (index * 2 * Math.PI) / Object.keys(this.laboratoryDatabase).length;
            const radius = 250;
            const labX = centerX + Math.cos(angle) * radius;
            const labY = centerY + Math.sin(angle) * radius;
            
            const distance = Math.sqrt((x - labX)**2 + (y - labY)**2);
            if (distance < 25) {
                this.activateLaboratory(key);
                return;
            }
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

    emergencyPause() {
        this.animationRunning = !this.animationRunning;
        if (this.animationRunning) {
            this.startAnimation();
        }
        console.log('🛑 Emergency pause toggled');
    }

    updateWorldGeometry() {
        console.log(`🔄 Updating world geometry: ${this.currentArchitecture}`);
        this.renderPortalSystem();
    }

    updateHarmonics() {
        console.log(`🎵 Updating harmonics: ${this.baseFrequency} Hz`);
    }

    updateNumerology() {
        console.log(`🔢 Updating sacred numerology: ${this.sacredNumber}`);
    }
}

// Initialize error boundary and main engine
let errorBoundary, cathedralEngine;

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    try {
        errorBoundary = new CathedralErrorBoundary();
        cathedralEngine = new CosmogenesisNovaElegantia();
        
        // Make engine globally accessible for UI interactions
        window.cathedralEngine = cathedralEngine;
        
        console.log('🏛️ Cathedral Trinity System fully initialized');
        console.log('🔗 Three apps ready for independent or integrated use');
        console.log('🔬 Sacred geometry laboratories activated');
        console.log('🌀 Portal system online - Sacred geometry, not boxes!');
        
    } catch (error) {
        console.error('Cathedral initialization failed:', error);
    }
});