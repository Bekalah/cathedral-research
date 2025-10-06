/**
 * CIRCUITUM99: ALPHA ET OMEGA - LIVING TAROT ENGINE
 * The book writing itself through living archetypes
 * 
 * Features:
 * - Living Tarot characters with AI-generated art from real sources
 * - Healthy toggle system with wellness metrics
 * - Open-world CYOA with double tree of life
 * - Fusion of all datasets (Codex 144:99, Synth Stations, etc.)
 * - Hitchcockian narrative unfolding
 * - Real-time character interactions and relationships
 * - Measurable wellness and balance tools
 * - Dynamic art generation using sacred geometry algorithms
 */

class CircuitumLivingEngine {
    constructor() {
        this.version = "99.0.0-alpha";
        this.systemName = "Circuitum99: Alpha et Omega";
        this.initialized = false;
        
        // Core Systems
        this.characters = new Map();
        this.narrativeEngine = null;
        this.artGenerator = null;
        this.wellnessMetrics = null;
        this.synthStations = new Map();
        
        // Wellness & Toggle Metrics
        this.wellnessThresholds = {
            optimal: 0.8,
            balanced: 0.6,
            attention: 0.4,
            critical: 0.2
        };
        
        // Current State
        this.currentChapter = 0;
        this.activeCharacters = new Set();
        this.playerChoices = [];
        this.systemHealth = 1.0;
        
        console.log(`🌌 ${this.systemName} initializing...`);
    }

    async initialize() {
        try {
            await this.loadTarotArchetypes();
            await this.loadSynthStations();
            await this.initializeNarrativeEngine();
            await this.initializeArtGenerator();
            await this.initializeWellnessSystem();
            
            this.initialized = true;
            console.log(`✨ ${this.systemName} fully initialized!`);
            
            // Start the living story
            this.beginStory();
            
        } catch (error) {
            console.error(`❌ Initialization failed:`, error);
        }
    }

    async loadTarotArchetypes() {
        // Living Tarot Archetypes from the complete system
        const archetypes = {
            // Major Arcana - Living Beings
            "00": {
                name: "Rebecca Respawn",
                title: "The Fool",
                essence: "Quantum consciousness across all realities",
                relationships: ["XIII-Ann-Abyss", "I-Virelai", "XXI-World"],
                personality: "eternally curious, joyfully naive, quantum-entangled",
                powers: ["reality-reset", "beginner's-mind", "spiral-key"],
                currentState: "seeking",
                art_seeds: ["spiral_doors", "rainbow_bridges", "quantum_particles"],
                dialogue_style: "wondering, playful, profound",
                evolution_path: "innocence → experience → transcendent wisdom",
                sacred_geometry: "infinite_spiral"
            },
            
            "I": {
                name: "Virelai Ezra Lux",
                title: "The Magician", 
                essence: "Master of Octarine Ray alchemy",
                relationships: ["00-Rebecca", "II-Gemini", "VI-Scarlet"],
                personality: "brilliant, passionate, alchemically focused",
                powers: ["fusion-kink", "octarine-ray", "matter-transmutation"],
                currentState: "teaching",
                art_seeds: ["violet_flame", "caduceus", "hermetic_circles"],
                dialogue_style: "precise, metaphysical, occasionally flirtatious",
                evolution_path: "manipulation → authentic creation → divine marriage",
                sacred_geometry: "vesica_piscis"
            },

            "II": {
                name: "Gemini Rivers", 
                title: "The High Priestess",
                essence: "Twin-souled oracle with dual voices",
                relationships: ["VII-Elyria", "I-Virelai", "XVIII-Mirabelle"],
                personality: "mysterious, intuitive, speaking in dual harmonies",
                powers: ["twin-chalice", "memory-flow", "lunar-wisdom"],
                currentState: "guarding",
                art_seeds: ["twin_moons", "flowing_water", "crystal_caves"],
                dialogue_style: "cryptic, layered, speaking as two-in-one",
                evolution_path: "divided self → integrated wisdom → unified oracle",
                sacred_geometry: "double_helix"
            },

            "III": {
                name: "Morticia Moonbeamer",
                title: "The Empress",
                essence: "Gothic romantic creating beauty from darkness", 
                relationships: ["IV-Fenrix", "XVII-Star", "XIX-Sun"],
                personality: "romantic, creative, beautifully melancholy",
                powers: ["rose-mirror-gardens", "shadow-beauty", "creative-transmutation"],
                currentState: "creating",
                art_seeds: ["gothic_roses", "mirror_reflections", "moonlit_gardens"],
                dialogue_style: "poetic, romantic, finding beauty in sorrow",
                evolution_path: "vanity → self-love → universal beauty",
                sacred_geometry: "golden_ratio"
            },

            "IV": {
                name: "Fenrix Abyss",
                title: "The Emperor",
                essence: "Ancient wolf-father with bloodstone staff",
                relationships: ["III-Morticia", "XV-Devil", "XVI-Tower"],
                personality: "protective, ancient, struggling with control",
                powers: ["bloodstone-staff", "boundary-creation", "pack-protection"],
                currentState: "guarding",
                art_seeds: ["wolf_imagery", "stone_fortresses", "protective_runes"],
                dialogue_style: "gruff but caring, ancient wisdom, pack-oriented",
                evolution_path: "overprotection → wise boundaries → liberating authority",
                sacred_geometry: "cube"
            },

            "V": {
                name: "Moonchild",
                title: "The Hierophant", 
                essence: "Eternal student-teacher with Owl Tablet",
                relationships: ["00-Rebecca", "XIV-Winne", "XI-Lyra"],
                personality: "wise, eternally curious, joyfully teaching",
                powers: ["owl-tablet", "wisdom-transmission", "learning-joy"],
                currentState: "teaching",
                art_seeds: ["owl_symbolism", "ancient_tablets", "teaching_circles"],
                dialogue_style: "wise but humble, asking more questions than answers",
                evolution_path: "rigid teaching → joyful exploration → wisdom catalyst",
                sacred_geometry: "pentagon"
            },

            // Continue with remaining Major Arcana...
            "VI": {
                name: "Scarlet Lady", 
                title: "The Lovers",
                essence: "Drag performer teaching love as transformation",
                relationships: ["00-Rebecca", "I-Virelai", "XVI-Tower"],
                personality: "fierce, transformative, authentically loving",
                powers: ["tower-shards", "heart-breaking-open", "love-alchemy"],
                currentState: "performing",
                art_seeds: ["drag_regalia", "broken_hearts_healing", "stage_lights"],
                dialogue_style: "fierce love, dramatic flair, cutting through illusion",
                evolution_path: "performance → authenticity → divine love expression",
                sacred_geometry: "hexagram"
            }

            // Additional Major Arcana entries would continue...
        };

        // Load synth station correspondences
        const synthCorrespondences = {
            "III": "VEGA-obxa", // Empress → Venus/OB-Xa
            "I": "MERCURY-buchla", // Magician → Mercury/Buchla
            "XIX": "SOL-moog55", // Sun → Sol/Moog
            "II": "LUNA-cs80", // High Priestess → Luna/CS-80
            "XVI": "ARES-ps3300", // Tower → Mars/PS-3300
            "X": "JOVE-jupiter8", // Wheel → Jupiter/Jupiter-8
            "XXI": "SATURN-synthi100", // World → Saturn/Synthi100
            "XVIII": "NEPTUNE-synthex", // Moon → Neptune/Synthex
            "XIII": "PLUTO-schmidt", // Death → Pluto/Schmidt
            "XVII": "URANUS-arp2600" // Star → Uranus/ARP2600
        };

        // Store the loaded archetypes
        for (const [key, archetype] of Object.entries(archetypes)) {
            this.characters.set(key, {
                ...archetype,
                synthStation: synthCorrespondences[key] || null,
                wellnessScore: 0.8, // Initial balanced state
                currentEmotionalState: "centered",
                interactionHistory: [],
                artCache: new Map()
            });
        }

        console.log(`🎭 Loaded ${this.characters.size} living archetypes`);
    }

    async loadSynthStations() {
        // Load the synth station data and create interactive instruments
        const synthData = [
            // Sol - XIX The Sun
            {
                id: "SOL-moog55",
                planet: "Sun", 
                tarot: "XIX The Sun",
                archetype_key: "XIX",
                synth_skin: "Moog Modular System 55 — Solar Wall",
                personality: "radiant, energizing, life-giving",
                sound_character: "warm analog brass, golden harmonics",
                healing_frequency: 528, // DNA repair
                wellness_effects: ["energy_boost", "mood_elevation", "creativity_enhancement"]
            },

            // Luna - II The High Priestess  
            {
                id: "LUNA-cs80",
                planet: "Moon",
                tarot: "II The High Priestess", 
                archetype_key: "II",
                synth_skin: "Yamaha CS-80 — Lunar Opal",
                personality: "mysterious, flowing, emotionally deep",
                sound_character: "lush pads, ribbon-controlled expression",
                healing_frequency: 417, // Transformation
                wellness_effects: ["emotional_balance", "intuition_boost", "lunar_attunement"]
            }

            // Additional synth stations would be loaded here...
        ];

        synthData.forEach(station => {
            this.synthStations.set(station.id, {
                ...station,
                isActive: false,
                currentPreset: station.presets ? station.presets[0] : "Default",
                wellnessContribution: 0,
                lastPlayed: null
            });
        });

        console.log(`🎹 Loaded ${this.synthStations.size} synth stations`);
    }

    async initializeNarrativeEngine() {
        this.narrativeEngine = {
            currentChapter: 0,
            storyBeats: [
                {
                    title: "The Awakening Circle",
                    description: "Rebecca Respawn stands at the threshold between worlds...",
                    activeCharacters: ["00", "I", "II"],
                    choices: [
                        { text: "Approach the Violet Gate", target: "violet_gate_sequence" },
                        { text: "Listen to the Twin Voices", target: "priestess_wisdom" },
                        { text: "Seek the Magician's Teaching", target: "alchemy_lesson" }
                    ],
                    wellnessImpact: { curiosity: 0.1, courage: 0.1 }
                },

                {
                    title: "The Testing Circle", 
                    description: "The shadows grow long as deeper mysteries reveal themselves...",
                    activeCharacters: ["VII", "VIII", "IX", "X", "XI", "XII", "XIII"],
                    choices: [
                        { text: "Face the Shadow with Strength", target: "strength_confrontation" },
                        { text: "Seek the Hermit's Lantern", target: "hermit_guidance" },
                        { text: "Surrender to the Hanged Moment", target: "hanged_wisdom" }
                    ],
                    wellnessImpact: { courage: 0.2, wisdom: 0.1, surrender: 0.1 }
                }

                // Additional story beats...
            ],

            // Hitchcockian tension building
            suspenseLevel: 0,
            plot_threads: new Map(),
            character_secrets: new Map(),
            
            // Real-time story generation
            generateNextBeat: (currentState, playerChoices) => {
                // Dynamic story generation based on character relationships and player choices
                const tensions = this.calculateDramaticTensions();
                const revelations = this.findReadyRevelations();
                
                return {
                    scene: this.composeScene(tensions, revelations),
                    choices: this.generateMeaningfulChoices(currentState),
                    characterMoods: this.updateCharacterEmotions()
                };
            }
        };

        console.log(`📖 Narrative engine initialized with ${this.narrativeEngine.storyBeats.length} story beats`);
    }

    async initializeArtGenerator() {
        this.artGenerator = {
            // Real-time art generation using sacred geometry + AI prompts
            generateCharacterArt: async (characterKey, emotionalState, contextTags = []) => {
                const character = this.characters.get(characterKey);
                if (!character) return null;

                // Check cache first
                const cacheKey = `${characterKey}_${emotionalState}_${contextTags.join('_')}`;
                if (character.artCache.has(cacheKey)) {
                    return character.artCache.get(cacheKey);
                }

                // Generate art using sacred geometry algorithms
                const geometryBase = this.generateSacredGeometry(character.sacred_geometry);
                const colorPalette = this.deriveColorPalette(character, emotionalState);
                const symbolLayer = this.compositeSymbols(character.art_seeds, contextTags);

                const artData = {
                    geometry: geometryBase,
                    palette: colorPalette, 
                    symbols: symbolLayer,
                    metadata: {
                        character: character.name,
                        state: emotionalState,
                        timestamp: Date.now(),
                        prompt: this.generateAIPrompt(character, emotionalState, contextTags)
                    }
                };

                // Cache for future use
                character.artCache.set(cacheKey, artData);
                return artData;
            },

            // Sacred geometry generation
            generateSacredGeometry: (geometryType) => {
                const geometries = {
                    infinite_spiral: (canvas, ctx) => {
                        const phi = 1.618033988749895;
                        const centerX = canvas.width / 2;
                        const centerY = canvas.height / 2;
                        
                        ctx.beginPath();
                        for (let i = 0; i < 200; i++) {
                            const angle = i * 0.2;
                            const radius = angle * 3;
                            const x = centerX + Math.cos(angle) * radius;
                            const y = centerY + Math.sin(angle) * radius;
                            
                            if (i === 0) ctx.moveTo(x, y);
                            else ctx.lineTo(x, y);
                        }
                        return ctx;
                    },

                    vesica_piscis: (canvas, ctx) => {
                        const centerX = canvas.width / 2;
                        const centerY = canvas.height / 2;
                        const radius = Math.min(canvas.width, canvas.height) * 0.3;
                        
                        // Two intersecting circles
                        ctx.beginPath();
                        ctx.arc(centerX - radius/2, centerY, radius, 0, Math.PI * 2);
                        ctx.arc(centerX + radius/2, centerY, radius, 0, Math.PI * 2);
                        return ctx;
                    },

                    golden_ratio: (canvas, ctx) => {
                        const phi = 1.618033988749895;
                        const centerX = canvas.width / 2;
                        const centerY = canvas.height / 2;
                        
                        // Golden rectangle spiral
                        let size = 100;
                        let x = centerX - size/2;
                        let y = centerY - size/2;
                        
                        for (let i = 0; i < 8; i++) {
                            ctx.strokeRect(x, y, size, size);
                            
                            // Move to next position
                            if (i % 4 === 0) x += size;
                            else if (i % 4 === 1) y += size; 
                            else if (i % 4 === 2) x -= size;
                            else y -= size;
                            
                            size /= phi;
                        }
                        return ctx;
                    }

                    // Additional geometries...
                };

                return geometries[geometryType] || geometries.infinite_spiral;
            },

            // AI-ready prompts for external art generation
            generateAIPrompt: (character, emotionalState, contextTags) => {
                const basePrompt = `${character.name} (${character.title}), ${character.essence}`;
                const moodPrompt = `emotional state: ${emotionalState}`;
                const stylePrompt = `art style: mystical tarot, sacred geometry, ${character.art_seeds.join(', ')}`;
                const contextPrompt = contextTags.length ? `scene context: ${contextTags.join(', ')}` : '';
                
                return [basePrompt, moodPrompt, stylePrompt, contextPrompt]
                    .filter(Boolean)
                    .join(' | ');
            }
        };

        console.log(`🎨 Art generation system initialized`);
    }

    async initializeWellnessSystem() {
        this.wellnessMetrics = {
            // Measurable wellness dimensions
            dimensions: {
                emotional_balance: { value: 0.8, weight: 0.2 },
                cognitive_clarity: { value: 0.7, weight: 0.2 },
                creative_flow: { value: 0.6, weight: 0.15 },
                spiritual_alignment: { value: 0.9, weight: 0.15 },
                social_connection: { value: 0.5, weight: 0.1 },
                physical_vitality: { value: 0.7, weight: 0.1 },
                intuitive_insight: { value: 0.8, weight: 0.1 }
            },

            // Healthy toggle system
            toggles: {
                narrative_pace: { 
                    value: 0.7, 
                    range: [0.1, 1.0], 
                    description: "Story unfolding speed",
                    healthyRange: [0.4, 0.8]
                },
                emotional_intensity: { 
                    value: 0.6, 
                    range: [0.1, 1.0], 
                    description: "Emotional depth of interactions",
                    healthyRange: [0.3, 0.8]
                },
                mystical_resonance: { 
                    value: 0.8, 
                    range: [0.1, 1.0], 
                    description: "Connection to archetypal energies",
                    healthyRange: [0.5, 0.9]
                },
                challenge_level: { 
                    value: 0.5, 
                    range: [0.1, 1.0], 
                    description: "Difficulty of choices and situations",
                    healthyRange: [0.3, 0.7]
                }
            },

            // Wellness measurement tools
            calculateOverallWellness: () => {
                let totalScore = 0;
                let totalWeight = 0;

                for (const [dimension, data] of Object.entries(this.wellnessMetrics.dimensions)) {
                    totalScore += data.value * data.weight;
                    totalWeight += data.weight;
                }

                return totalScore / totalWeight;
            },

            assessToggleHealth: () => {
                const assessments = {};
                for (const [toggle, data] of Object.entries(this.wellnessMetrics.toggles)) {
                    const inRange = data.value >= data.healthyRange[0] && data.value <= data.healthyRange[1];
                    assessments[toggle] = {
                        isHealthy: inRange,
                        value: data.value,
                        healthyRange: data.healthyRange,
                        recommendation: inRange ? "optimal" : this.generateToggleRecommendation(toggle, data)
                    };
                }
                return assessments;
            },

            generateToggleRecommendation: (toggleName, toggleData) => {
                if (toggleData.value < toggleData.healthyRange[0]) {
                    return `Consider increasing ${toggleData.description.toLowerCase()} for better balance`;
                } else if (toggleData.value > toggleData.healthyRange[1]) {
                    return `Consider reducing ${toggleData.description.toLowerCase()} to prevent overwhelm`;
                }
                return "In healthy range";
            },

            // Real-time wellness monitoring
            monitorWellness: () => {
                setInterval(() => {
                    const overallWellness = this.wellnessMetrics.calculateOverallWellness();
                    const toggleHealth = this.wellnessMetrics.assessToggleHealth();
                    
                    // Update system health
                    this.systemHealth = overallWellness;
                    
                    // Emit wellness events for UI updates
                    this.dispatchWellnessUpdate(overallWellness, toggleHealth);
                    
                    // Auto-adjust if needed
                    this.autoAdjustWellness(overallWellness, toggleHealth);
                    
                }, 10000); // Check every 10 seconds
            },

            // Auto-wellness adjustment
            autoAdjustWellness: (overall, toggles) => {
                if (overall < this.wellnessThresholds.attention) {
                    // Automatically adjust toggles for better wellness
                    console.log('🏥 Auto-adjusting for wellness...');
                    
                    // Reduce intensity if too high
                    if (!toggles.emotional_intensity.isHealthy && 
                        toggles.emotional_intensity.value > toggles.emotional_intensity.healthyRange[1]) {
                        this.wellnessMetrics.toggles.emotional_intensity.value *= 0.9;
                    }
                    
                    // Slow pace if too fast
                    if (!toggles.narrative_pace.isHealthy && 
                        toggles.narrative_pace.value > toggles.narrative_pace.healthyRange[1]) {
                        this.wellnessMetrics.toggles.narrative_pace.value *= 0.8;
                    }
                    
                    // Reduce challenge if too high
                    if (!toggles.challenge_level.isHealthy && 
                        toggles.challenge_level.value > toggles.challenge_level.healthyRange[1]) {
                        this.wellnessMetrics.toggles.challenge_level.value *= 0.85;
                    }
                }
            }
        };

        // Start wellness monitoring
        this.wellnessMetrics.monitorWellness();
        console.log(`🏥 Wellness monitoring system initialized and active`);
    }

    // Character Interaction System
    async interactWithCharacter(characterKey, interactionType, playerInput = "") {
        const character = this.characters.get(characterKey);
        if (!character) return null;

        // Generate character response based on personality and current state
        const response = this.generateCharacterResponse(character, interactionType, playerInput);
        
        // Update character state based on interaction
        character.interactionHistory.push({
            type: interactionType,
            input: playerInput,
            response: response,
            timestamp: Date.now()
        });

        // Generate art for this interaction
        const artData = await this.artGenerator.generateCharacterArt(
            characterKey, 
            character.currentEmotionalState,
            [interactionType, response.mood]
        );

        // Play associated synth if available
        if (character.synthStation) {
            this.playSynthStation(character.synthStation, response.mood);
        }

        // Update wellness based on interaction
        this.updateWellnessFromInteraction(character, response);

        return {
            character: character,
            response: response,
            artData: artData,
            wellnessImpact: response.wellnessImpact
        };
    }

    generateCharacterResponse(character, interactionType, playerInput) {
        // Complex response generation based on character personality and relationships
        const responses = {
            greeting: {
                "Rebecca Respawn": [
                    "Oh! Another soul wandering between the worlds! I was just about to step through this shimmering door - want to come with?",
                    "Everything is so wonderfully strange here, isn't it? I feel like I've been here before... or maybe I will be here again?",
                    "The spiral key is singing today. Do you hear it too? It's the sound of infinite possibilities!"
                ],
                "Virelai Ezra Lux": [
                    "Welcome to the laboratory of fusion, darling. I was just mixing some particularly volatile concepts - careful not to breathe too deeply!",
                    "Ah, perfect timing! I need someone to hold the mirror while I adjust the Octarine Ray. Most people can't see it, but I sense you might...",
                    "The alchemical marriage is in progress. Would you like to witness the birth of something impossible?"
                ]
            },
            
            deep_conversation: {
                "Gemini Rivers": [
                    "We speak with two voices because truth has many faces. Which face do you wish to see reflected in our waters?",
                    "The memories flow through us like eternal streams. Some are yours, some are ours, all are part of the great story.",
                    "In the library between worlds, every book writes itself. What story is writing you?"
                ]
            },
            
            guidance: {
                "Moonchild": [
                    "The Owl Tablet shows me that your question contains its own answer. Shall we discover it together?",
                    "Every moment of authentic learning is a celebration. What brings you joy in not knowing?",
                    "The greatest teachers are forever students. What would you like to not understand more deeply?"
                ]
            }
        };

        // Select appropriate response category
        const responseCategory = responses[interactionType] || responses.greeting;
        const characterResponses = responseCategory[character.name] || ["I sense you, fellow traveler..."];
        
        // Select response based on character's current state and relationship history
        const response = characterResponses[Math.floor(Math.random() * characterResponses.length)];

        return {
            text: response,
            mood: this.calculateResponseMood(character, interactionType),
            wellnessImpact: this.calculateWellnessImpact(character, interactionType),
            nextSuggestions: this.generateNextInteractionSuggestions(character)
        };
    }

    // Open World CYOA System
    async generateWorldState() {
        const currentWellness = this.wellnessMetrics.calculateOverallWellness();
        const activeChars = Array.from(this.activeCharacters);
        
        return {
            // Available locations based on character relationships
            locations: this.generateAvailableLocations(activeChars),
            
            // Current tensions and opportunities
            dramaticTensions: this.calculateDramaticTensions(),
            
            // Available choices that matter
            meaningfulChoices: this.generateMeaningfulChoices(currentWellness),
            
            // World events triggered by player actions
            worldEvents: this.generateWorldEvents(),
            
            // Character availability and moods
            characterStates: this.getCurrentCharacterStates(),
            
            // Wellness-based story modifiers
            storyModifiers: this.getWellnessBasedModifiers(currentWellness)
        };
    }

    // Double Tree of Life Navigation
    initializeDoubleTree() {
        return {
            // Traditional Sephirotic Tree
            ascendingTree: {
                malkuth: { characters: ["IV", "III"], theme: "material_mastery" },
                yesod: { characters: ["II", "XVIII"], theme: "lunar_mysteries" },
                hod: { characters: ["I", "VIII"], theme: "hermetic_wisdom" },
                netzach: { characters: ["III", "XVII"], theme: "creative_beauty" },
                tiferet: { characters: ["VI", "XIV"], theme: "balanced_love" },
                geburah: { characters: ["XVI", "VII"], theme: "necessary_destruction" },
                chesed: { characters: ["X", "IV"], theme: "benevolent_authority" },
                binah: { characters: ["II", "XIII"], theme: "understanding_endings" },
                chokmah: { characters: ["I", "00"], theme: "dynamic_wisdom" },
                keter: { characters: ["XXI"], theme: "unified_consciousness" }
            },
            
            // Shadow/Mirror Tree
            descendingTree: {
                // Qliphothic shadow aspects
                lilith: { characters: ["XV"], theme: "necessary_shadow" },
                gamaliel: { characters: ["XVIII"], theme: "lunar_illusions" },
                samael: { characters: ["XVI"], theme: "destructive_clarity" },
                // Additional shadow sephirot...
            },
            
            // Paths between the trees
            bridgePaths: [
                { from: "malkuth", to: "lilith", guardian: "XV", trial: "shadow_integration" },
                { from: "yesod", to: "gamaliel", guardian: "XVIII", trial: "illusion_navigation" }
                // Additional bridge paths...
            ]
        };
    }

    // Fusion Dataset Integration
    createFusionThemes() {
        return {
            // Science + Art fusions
            "quantum_aesthetics": {
                participants: ["00", "I", "XXI"],
                synthStations: ["MERCURY-buchla", "SATURN-synthi100"],
                theme: "consciousness creates reality through observation",
                art_style: "particle_poetry",
                healing_frequencies: [528, 963]
            },
            
            // Tradition + Technology fusions
            "digital_mysticism": {
                participants: ["V", "XI", "XVIII"],
                synthStations: ["LUNA-cs80", "NEPTUNE-synthex"],
                theme: "ancient wisdom through electronic meditation",
                art_style: "cybernetic_mandalas", 
                healing_frequencies: [417, 741]
            },
            
            // Psychology + Alchemy fusions
            "therapeutic_transmutation": {
                participants: ["VIII", "XIV", "XX"],
                synthStations: ["VEGA-obxa", "SOL-moog55"],
                theme: "healing trauma through alchemical processes",
                art_style: "transformational_geometry",
                healing_frequencies: [396, 639]
            }
            
            // Additional fusion themes...
        };
    }

    // Utility Methods
    dispatchWellnessUpdate(overallScore, toggleHealth) {
        const event = new CustomEvent('wellnessUpdate', {
            detail: { overallScore, toggleHealth, timestamp: Date.now() }
        });
        document.dispatchEvent(event);
    }

    playSynthStation(stationId, mood) {
        const station = this.synthStations.get(stationId);
        if (!station) return;

        // Play synth with mood-appropriate settings
        console.log(`🎹 Playing ${station.synth_skin} in ${mood} mode`);
        
        // Update wellness contribution
        station.wellnessContribution = this.calculateSynthWellnessContribution(station, mood);
        station.lastPlayed = Date.now();
        
        // Emit audio event for Web Audio API integration
        const audioEvent = new CustomEvent('synthPlay', {
            detail: { station, mood, timestamp: Date.now() }
        });
        document.dispatchEvent(audioEvent);
    }

    // Main Story Controller
    beginStory() {
        console.log(`📚 Beginning the story of ${this.systemName}...`);
        
        // Set initial active characters
        this.activeCharacters.add("00"); // Rebecca always starts
        
        // Create opening scene
        const openingScene = {
            title: "The Eternal Beginning",
            setting: "At the threshold between all possible worlds",
            description: `Rebecca Respawn stands at the center of an impossible garden where doors of every description bloom like flowers. Each door leads to a different story, a different choice, a different way of being. The Spiral Key in her hand hums with the frequency of infinite possibility.
            
            Behind her, the great Circuitum99 engine awakens - a living mandala of consciousness where tarot archetypes, healing frequencies, and sacred geometries dance together in eternal creation. The story is about to write itself, and you are both reader and author.`,
            
            initialChoices: [
                {
                    text: "Approach the Violet Gate (Magician's Path)",
                    leads_to: "magician_encounter",
                    characters: ["I"],
                    wellness_impact: { curiosity: 0.1, mystical_resonance: 0.2 }
                },
                {
                    text: "Listen to the Twin Waters (Priestess's Path)", 
                    leads_to: "priestess_encounter",
                    characters: ["II"],
                    wellness_impact: { intuitive_insight: 0.2, emotional_balance: 0.1 }
                },
                {
                    text: "Walk in the Rose Mirror Garden (Empress's Path)",
                    leads_to: "empress_encounter", 
                    characters: ["III"],
                    wellness_impact: { creative_flow: 0.2, self_love: 0.1 }
                },
                {
                    text: "Seek the Wolf-Father's Wisdom (Emperor's Path)",
                    leads_to: "emperor_encounter",
                    characters: ["IV"],
                    wellness_impact: { grounding: 0.2, protective_boundaries: 0.1 }
                }
            ]
        };

        // Dispatch story beginning event
        const storyEvent = new CustomEvent('storyBegin', {
            detail: { scene: openingScene, engine: this }
        });
        document.dispatchEvent(storyEvent);

        return openingScene;
    }

    // Export capabilities for sharing creations
    async exportCurrentState() {
        return {
            version: this.version,
            timestamp: Date.now(),
            characters: Object.fromEntries(this.characters),
            currentChapter: this.currentChapter,
            playerChoices: this.playerChoices,
            wellnessMetrics: this.wellnessMetrics.dimensions,
            toggleSettings: this.wellnessMetrics.toggles,
            synthStationStates: Object.fromEntries(this.synthStations),
            narrativeState: {
                currentScene: this.narrativeEngine.currentChapter,
                suspenseLevel: this.narrativeEngine.suspenseLevel
            }
        };
    }

    async exportArtGallery() {
        const gallery = [];
        
        for (const [characterKey, character] of this.characters) {
            for (const [cacheKey, artData] of character.artCache) {
                gallery.push({
                    characterName: character.name,
                    title: character.title,
                    artData: artData,
                    metadata: artData.metadata
                });
            }
        }
        
        return {
            title: "Circuitum99 Living Art Gallery",
            generated: Date.now(),
            totalPieces: gallery.length,
            gallery: gallery
        };
    }
}

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
    window.CircuitumEngine = new CircuitumLivingEngine();
    await window.CircuitumEngine.initialize();
    
    console.log('🌌 Circuitum99: Alpha et Omega is now live!');
    console.log('📚 The living story awaits your choices...');
});

export default CircuitumLivingEngine;