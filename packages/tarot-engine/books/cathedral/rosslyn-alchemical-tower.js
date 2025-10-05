// 🏰✨ ROSSLYN ALCHEMICAL TOWER - Interactive Witcher 3 Style Laboratory
// Like walking around Keira Metz's tower but with real archetypes, sacred geometry, and living books

class RosslynAlchemicalTower {
    constructor() {
        this.towerInitialized = false;
        this.activeArchetype = null;
        this.currentFloor = 'apprentice_lab';
        this.inventorySystem = this.initializeInventory();
        this.livingBooks = this.initializeLivingBooks();
        this.alchemicalStations = this.initializeAlchemicalStations();
        this.interactiveObjects = new Map();
        
        // Witcher 3 style exploration mechanics
        this.explorationSystem = {
            mode: 'witcher_3_alchemy_tower',
            interaction_radius: 50,
            highlight_objects: true,
            auto_collect: false,
            ritual_mode: false
        };
        
        // Connect to your existing research
        this.rosslynArchitecture = this.loadRosslynResearch();
        
        console.log('🏰 Rosslyn Alchemical Tower initialized - Witcher 3 style exploration ready');
    }

    initializeInventory() {
        return {
            // Collectible ingredients (like Witcher 3)
            herbs: {
                'rosslyn_vine_essence': { name: 'Rosslyn Vine Essence', rarity: 'legendary', effects: ['spiral_consciousness', 'time_dilation'] },
                'apprentice_pillar_moss': { name: 'Apprentice Pillar Moss', rarity: 'rare', effects: ['learning_enhancement', 'humility'] },
                'master_pillar_lichen': { name: 'Master Pillar Lichen', rarity: 'epic', effects: ['geometric_vision', 'precision'] },
                'green_man_leaves': { name: 'Green Man Leaves', rarity: 'common', effects: ['nature_connection', 'growth'] },
                'chapel_stone_dust': { name: 'Chapel Stone Dust', rarity: 'uncommon', effects: ['grounding', 'memory_enhancement'] }
            },
            
            // Sacred geometry components
            geometry: {
                'vesica_piscis_crystal': { name: 'Vesica Piscis Crystal', type: 'sacred_form', power: 'feminine_wisdom' },
                'fibonacci_spiral_shell': { name: 'Fibonacci Spiral Shell', type: 'growth_pattern', power: 'natural_harmony' },
                'pentagram_medallion': { name: 'Pentagram Medallion', type: 'protection_symbol', power: 'elemental_balance' },
                'tree_of_life_pendant': { name: 'Tree of Life Pendant', type: 'cosmic_map', power: 'pathway_illumination' }
            },
            
            // Archetypal essences (gained from interactions)
            essences: {
                'magician_will': { arcana: 'magician', quality: 'manifestation_power', collected: false },
                'high_priestess_intuition': { arcana: 'high_priestess', quality: 'inner_knowing', collected: false },
                'empress_creativity': { arcana: 'empress', quality: 'creative_flow', collected: false },
                'hermit_wisdom': { arcana: 'hermit', quality: 'inner_light', collected: false }
            },
            
            // Completed potions/formulas
            creations: []
        };
    }

    initializeLivingBooks() {
        // Books that respond to you like NPCs (Witcher 3 style)
        return {
            'mystical_qabalah': {
                author: 'Dion Fortune',
                archetype: 'high_priestess',
                personality: 'wise_teacher',
                location: { floor: 'mystical_library', shelf: 'eastern_wall', accessibility: 'floating' },
                interactions: {
                    approach: 'Book glows with silver moonlight as you near',
                    touch: 'Pages flutter open to exactly what you need to learn',
                    read: 'Dion Fortune\'s voice whispers the sacred correspondences',
                    combine: 'Can merge with other books for deeper synthesis'
                },
                knowledge_grants: ['tree_of_life_understanding', 'pathworking_techniques', 'psychological_qabalah'],
                current_page: 'Introduction to the Tree of Life'
            },
            
            'liber_al_vel_legis': {
                author: 'Aleister Crowley',
                archetype: 'magician',
                personality: 'provocative_catalyst',
                location: { floor: 'chaos_laboratory', shelf: 'central_altar', accessibility: 'chained' },
                interactions: {
                    approach: 'Book pulses with electric energy, symbols shift on the cover',
                    touch: 'Lightning-like visions of will and magical power',
                    read: 'Crowley\'s consciousness challenges your assumptions',
                    combine: 'Explosive combinations with other magical texts'
                },
                knowledge_grants: ['thelemic_principles', 'will_development', 'magical_ethics'],
                current_page: 'Every man and every woman is a star'
            },
            
            'red_book': {
                author: 'C.G. Jung',
                archetype: 'hermit',
                personality: 'depth_explorer',
                location: { floor: 'shadow_laboratory', shelf: 'underground_vault', accessibility: 'hidden' },
                interactions: {
                    approach: 'Book seems to breathe, pages rustle with inner wind',
                    touch: 'Visions of active imagination and archetypal encounters',
                    read: 'Jung guides you through your own unconscious landscape',
                    combine: 'Integrates psychological insights with magical practice'
                },
                knowledge_grants: ['active_imagination', 'shadow_work', 'archetypal_psychology'],
                current_page: 'Liber Novus - The Way of What is to Come',
                special_ability: 'Opens portal to personal unconscious realm'
            },
            
            'stone_grimoire_codex': {
                author: 'Living Cathedral',
                archetype: 'world',
                personality: 'ancient_wisdom_keeper',
                location: { floor: 'any', shelf: 'appears_when_needed', accessibility: 'manifests' },
                interactions: {
                    approach: 'Stone pages materialize from the chapel walls themselves',
                    touch: 'Rosslyn\'s memory flows through your fingertips',
                    read: 'All the chapel\'s secrets unfold in sacred geometry',
                    combine: 'Synthesizes with any other magical knowledge'
                },
                knowledge_grants: ['rosslyn_mysteries', 'templar_wisdom', 'sacred_architecture'],
                current_page: 'The Language of Stone',
                special_ability: 'Reveals hidden architectural secrets'
            },
            
            'transcendental_magic': {
                author: 'Éliphas Lévi',
                archetype: 'hierophant',
                personality: 'methodical_teacher',
                location: { floor: 'traditional_library', shelf: 'honored_position', accessibility: 'open' },
                interactions: {
                    approach: 'Book radiates scholarly warmth and systematic knowledge',
                    touch: 'Clear explanations of magical correspondences flow into awareness',
                    read: 'Lévi teaches the scientific basis of magical practice',
                    combine: 'Provides solid foundation for other magical studies'
                },
                knowledge_grants: ['magical_correspondences', 'tarot_qabalah_links', 'systematic_magic'],
                current_page: 'The Doctrine of Correspondences'
            }
        };
    }

    initializeAlchemicalStations() {
        // Witcher 3 style crafting stations but for consciousness alchemy
        return {
            'apprentice_synthesis_lab': {
                name: 'Apprentice Pillar Synthesis Lab',
                type: 'sound_alchemy',
                location: { x: 120, y: -80, floor: 'main_chapel' },
                specialization: 'frequency_transmutation',
                available_recipes: [
                    'fibonacci_frequency_potion',
                    'spiral_consciousness_elixir', 
                    'humility_learning_oil',
                    'beginner_mind_incense'
                ],
                required_ingredients: ['apprentice_pillar_moss', 'rosslyn_vine_essence'],
                equipment: ['helical_synthesizer', 'alchemical_symbol_array', 'frequency_modulator'],
                archetype_guides: ['fool', 'hermit'],
                interaction_style: 'witcher_3_alchemy_bench'
            },
            
            'master_geometry_lab': {
                name: 'Master Pillar Sacred Geometry Laboratory',
                type: 'geometric_alchemy',
                location: { x: -120, y: -80, floor: 'main_chapel' },
                specialization: 'form_manifestation',
                available_recipes: [
                    'vesica_piscis_vision_oil',
                    'golden_ratio_enhancement_potion',
                    'sacred_proportion_tincture',
                    'geometric_healing_salve'
                ],
                required_ingredients: ['master_pillar_lichen', 'vesica_piscis_crystal'],
                equipment: ['geometric_projector', 'proportion_calculator', 'form_crystallizer'],
                archetype_guides: ['magician', 'high_priestess'],
                interaction_style: 'witcher_3_alchemy_bench'
            },
            
            'musical_cubes_harmonics_station': {
                name: 'Musical Cubes Harmonic Laboratory',
                type: 'cymatic_alchemy',
                location: { x: 0, y: 100, floor: 'choir_gallery' },
                specialization: 'sound_healing',
                available_recipes: [
                    'angel_frequency_attunement',
                    'rosslyn_resonance_oil',
                    'stone_memory_elixir',
                    'harmonic_healing_potion'
                ],
                required_ingredients: ['chapel_stone_dust', 'fibonacci_spiral_shell'],
                equipment: ['cymatic_chambers', 'angel_cube_resonators', 'harmonic_distillery'],
                archetype_guides: ['lovers', 'temperance'],
                interaction_style: 'witcher_3_alchemy_bench'
            },
            
            'lady_chapel_synthesis_altar': {
                name: 'Lady Chapel Divine Feminine Laboratory',
                type: 'receptive_alchemy',
                location: { x: 200, y: 0, floor: 'east_apse' },
                specialization: 'intuitive_creation',
                available_recipes: [
                    'shekinah_presence_oil',
                    'divine_feminine_elixir',
                    'receptive_wisdom_incense',
                    'compassion_healing_balm'
                ],
                required_ingredients: ['green_man_leaves', 'tree_of_life_pendant'],
                equipment: ['divine_chalice', 'lunar_reflector', 'receptive_crucible'],
                archetype_guides: ['high_priestess', 'empress', 'star'],
                interaction_style: 'witcher_3_alchemy_bench'
            },
            
            'crypt_shadow_laboratory': {
                name: 'Crypt Shadow Work Laboratory',
                type: 'depth_alchemy',
                location: { x: 0, y: -150, floor: 'underground_crypt' },
                specialization: 'shadow_integration',
                available_recipes: [
                    'shadow_integration_potion',
                    'depth_courage_oil',
                    'underworld_navigation_elixir',
                    'darkness_wisdom_incense'
                ],
                required_ingredients: ['pentagram_medallion', 'chapel_stone_dust'],
                equipment: ['shadow_mirror', 'depth_cauldron', 'darkness_lens'],
                archetype_guides: ['death', 'devil', 'moon'],
                interaction_style: 'witcher_3_alchemy_bench',
                special_requirement: 'must_face_personal_shadow'
            }
        };
    }

    loadRosslynResearch() {
        // Connect to your existing Rosslyn research files
        return {
            apprentice_pillar: {
                physical_location: 'south_east_corner',
                symbolism: 'spiral_ascent_prima_materia',
                your_research: 'helical_vine_synthesis_laboratory',
                archetypal_correspondence: 'hermit_inner_journey'
            },
            master_pillar: {
                physical_location: 'north_east_corner', 
                symbolism: 'accomplished_mastery',
                your_research: 'sacred_geometry_sound_laboratory',
                archetypal_correspondence: 'magician_manifestation'
            },
            musical_cubes: {
                physical_location: 'choir_arches',
                symbolism: 'cymatic_stone_memory',
                your_research: 'angel_frequency_harmonics',
                archetypal_correspondence: 'temperance_harmony'
            },
            green_man: {
                physical_location: 'throughout_carvings',
                symbolism: 'nature_wisdom_cycles',
                your_research: 'living_cathedral_consciousness',
                archetypal_correspondence: 'world_completion'
            },
            lady_chapel: {
                physical_location: 'east_apse',
                symbolism: 'divine_feminine_wisdom',
                your_research: 'shekinah_presence_laboratory',
                archetypal_correspondence: 'high_priestess_receptivity'
            }
        };
    }

    // Witcher 3 style "walk around and interact" system
    startTowerExploration(initialFloor = 'main_chapel') {
        this.currentFloor = initialFloor;
        this.explorationSystem.active = true;
        
        console.log(`🏰 Beginning exploration of ${initialFloor}`);
        console.log('💡 Use WASD to move, E to interact with highlighted objects');
        console.log('📚 Books glow when you can read them');
        console.log('⚗️ Alchemy stations pulse when recipes are available');
        console.log('🃏 Archetypes appear to guide your work');
        
        this.displayCurrentFloor();
        this.scanForInteractableObjects();
        
        return {
            floor: this.currentFloor,
            available_interactions: this.getAvailableInteractions(),
            archetypal_guides: this.getActiveArchetypes(),
            atmosphere: this.generateAtmosphere()
        };
    }

    displayCurrentFloor() {
        const floorLayouts = {
            'main_chapel': {
                description: 'Gothic stone chapel with mysterious pillars and carved symbols',
                atmosphere: 'Sacred silence broken only by whispers of ancient wisdom',
                interactive_objects: [
                    'apprentice_synthesis_lab',
                    'master_geometry_lab', 
                    'green_man_carvings',
                    'stone_grimoire_codex'
                ],
                lighting: 'Filtered sunlight through rose windows',
                sounds: 'Distant chanting, stone settling, wind through carvings'
            },
            
            'mystical_library': {
                description: 'Floating books and glowing texts arranged in sacred geometry',
                atmosphere: 'Electric with accumulated knowledge and archetypal presence',
                interactive_objects: [
                    'mystical_qabalah',
                    'transcendental_magic',
                    'floating_manuscripts',
                    'scrying_crystal'
                ],
                lighting: 'Books provide their own luminescence',
                sounds: 'Pages turning by themselves, whispered teachings'
            },
            
            'chaos_laboratory': {
                description: 'Wild magical energy contained in geometric arrays',
                atmosphere: 'Crackling with transformative potential and divine will',
                interactive_objects: [
                    'liber_al_vel_legis',
                    'will_focusing_apparatus',
                    'chaos_altar',
                    'manifestation_crucible'
                ],
                lighting: 'Lightning-like flashes from magical experiments',
                sounds: 'Energy crackling, Crowley\'s laughter, power charging'
            },
            
            'shadow_laboratory': {
                description: 'Underground chamber for deep psychological work',
                atmosphere: 'Dark but safe, perfect for confronting inner depths',
                interactive_objects: [
                    'red_book',
                    'shadow_mirror',
                    'depth_cauldron',
                    'active_imagination_portal'
                ],
                lighting: 'Soft candlelight, shadows dancing meaningfully',
                sounds: 'Underground streams, Jung\'s voice, unconscious whispers'
            }
        };
        
        const layout = floorLayouts[this.currentFloor];
        if (layout) {
            console.log(`\n🏰 ROSSLYN TOWER - ${this.currentFloor.toUpperCase()}`);
            console.log(`📍 ${layout.description}`);
            console.log(`🌟 ${layout.atmosphere}`);
            console.log(`💡 Lighting: ${layout.lighting}`);
            console.log(`🎵 Sounds: ${layout.sounds}`);
            console.log(`🔍 Interactive Objects: ${layout.interactive_objects.join(', ')}`);
        }
    }

    // Witcher 3 style "E to interact" for books
    interactWithBook(bookId) {
        const book = this.livingBooks[bookId];
        if (!book) {
            console.log('📚 That book doesn\'t seem to be here...');
            return;
        }
        
        console.log(`\n📖 APPROACHING: ${book.author}'s ${bookId.replace('_', ' ').toUpperCase()}`);
        console.log(`✨ ${book.interactions.approach}`);
        
        // Book responds like an NPC
        const archetypalGuide = this.getArchetypeGuide(book.archetype);
        
        console.log(`\n🃏 ${archetypalGuide.name} appears:`);
        console.log(`💬 "${archetypalGuide.greeting}"`);
        
        // Options like Witcher 3 dialogue
        const options = [
            { key: '1', action: 'read_book', text: `Read "${book.current_page}"` },
            { key: '2', action: 'ask_teaching', text: 'Ask for guidance' },
            { key: '3', action: 'combine_knowledge', text: 'Combine with other knowledge' },
            { key: '4', action: 'take_essence', text: 'Extract archetypal essence' },
            { key: 'X', action: 'leave', text: 'Step away respectfully' }
        ];
        
        console.log('\n📋 INTERACTION OPTIONS:');
        options.forEach(option => {
            console.log(`[${option.key}] ${option.text}`);
        });
        
        return {
            book: book,
            archetype_guide: archetypalGuide,
            options: options,
            knowledge_available: book.knowledge_grants
        };
    }

    // Witcher 3 style alchemy bench interaction
    interactWithAlchemyStation(stationId) {
        const station = this.alchemicalStations[stationId];
        if (!station) {
            console.log('⚗️ No alchemy station found here...');
            return;
        }
        
        console.log(`\n🧪 APPROACHING: ${station.name}`);
        console.log(`⚗️ Specialization: ${station.specialization}`);
        
        // Check available recipes (like Witcher 3)
        const availableRecipes = this.checkAvailableRecipes(station);
        
        console.log('\n📜 AVAILABLE RECIPES:');
        availableRecipes.forEach((recipe, index) => {
            const canCraft = this.hasIngredients(recipe.ingredients);
            const status = canCraft ? '✅ CRAFTABLE' : '❌ MISSING INGREDIENTS';
            console.log(`[${index + 1}] ${recipe.name} - ${status}`);
            if (!canCraft) {
                console.log(`    Need: ${recipe.missing_ingredients.join(', ')}`);
            }
        });
        
        // Archetypal guides appear to help
        console.log('\n🃏 ARCHETYPAL GUIDES AVAILABLE:');
        station.archetype_guides.forEach(archetype => {
            const guide = this.getArchetypeGuide(archetype);
            console.log(`• ${guide.name}: "${guide.alchemy_wisdom}"`);
        });
        
        return {
            station: station,
            available_recipes: availableRecipes,
            archetype_guides: station.archetype_guides.map(a => this.getArchetypeGuide(a)),
            interaction_mode: 'alchemy_crafting'
        };
    }

    // Mix potions/create art like Witcher 3 alchemy
    craftAlchemicalCreation(stationId, recipeId, archetypeGuidance = null) {
        const station = this.alchemicalStations[stationId];
        const recipe = this.getRecipe(recipeId);
        
        if (!this.hasIngredients(recipe.ingredients)) {
            console.log('❌ Missing required ingredients!');
            return { success: false, reason: 'missing_ingredients' };
        }
        
        console.log(`\n🧪 BEGINNING ALCHEMICAL CREATION: ${recipe.name}`);
        console.log(`⚗️ Station: ${station.name}`);
        
        if (archetypeGuidance) {
            const guide = this.getArchetypeGuide(archetypeGuidance);
            console.log(`🃏 Guided by: ${guide.name}`);
            console.log(`💬 "${guide.crafting_wisdom}"`);
        }
        
        // Step-by-step creation process (like Witcher 3)
        const steps = [
            'Preparing sacred workspace...',
            'Arranging ingredients in geometric pattern...',
            'Invoking archetypal consciousness...',
            'Beginning alchemical transformation...',
            'Channeling sacred frequencies...',
            'Crystallizing intention into form...',
            'Blessing the creation...'
        ];
        
        steps.forEach((step, index) => {
            setTimeout(() => {
                console.log(`🔄 Step ${index + 1}: ${step}`);
            }, index * 500);
        });
        
        // Consume ingredients
        this.consumeIngredients(recipe.ingredients);
        
        // Create the item
        const creation = {
            name: recipe.name,
            type: recipe.type,
            effects: recipe.effects,
            potency: this.calculatePotency(station, archetypeGuidance),
            created_at: new Date(),
            created_by: archetypeGuidance || 'self_guided',
            station_used: station.name
        };
        
        this.inventorySystem.creations.push(creation);
        
        setTimeout(() => {
            console.log(`\n✨ CREATION COMPLETE: ${creation.name}`);
            console.log(`🎯 Effects: ${creation.effects.join(', ')}`);
            console.log(`💪 Potency: ${creation.potency}/10`);
            console.log('📦 Added to inventory');
        }, 3500);
        
        return {
            success: true,
            creation: creation,
            experience_gained: this.calculateExperience(recipe, archetypeGuidance)
        };
    }

    // Archetype guides (like Witcher 3 NPCs but conscious beings)
    getArchetypeGuide(archetypeId) {
        const guides = {
            'fool': {
                name: 'Rebecca Respawn (The Fool)',
                personality: 'Wonder-filled beginner\'s mind guide',
                greeting: 'Every ending is a new beginning! What would you like to explore?',
                alchemy_wisdom: 'The secret ingredient is always wonder and willingness to fail beautifully.',
                crafting_wisdom: 'Don\'t worry about doing it "right" - let curiosity guide your hands.',
                specialties: ['new_beginnings', 'wonder_activation', 'fear_dissolution']
            },
            
            'magician': {
                name: 'Virelai Ezra Lux (The Magician)',
                personality: 'Focused manifestation master',
                greeting: 'As above, so below. What reality shall we create together?',
                alchemy_wisdom: 'Will focused through knowledge creates all transformations.',
                crafting_wisdom: 'Visualize the outcome clearly, then let your hands follow your will.',
                specialties: ['manifestation', 'will_focusing', 'elemental_mastery']
            },
            
            'high_priestess': {
                name: 'Gemini Rivers (The High Priestess)',
                personality: 'Intuitive wisdom keeper',
                greeting: 'Listen to the silence between thoughts - that\'s where wisdom lives.',
                alchemy_wisdom: 'The best recipes come from inner knowing, not outer formulas.',
                crafting_wisdom: 'Close your eyes, feel what wants to be created, then follow that feeling.',
                specialties: ['intuitive_creation', 'receptive_wisdom', 'lunar_mysteries']
            },
            
            'empress': {
                name: 'Natura Abundantia (The Empress)',
                personality: 'Creative abundance generator',
                greeting: 'Life wants to create through you - what beauty shall we birth?',
                alchemy_wisdom: 'All creation flows from love and the desire to nurture growth.',
                crafting_wisdom: 'Trust the natural rhythms - force nothing, allow everything.',
                specialties: ['creative_flow', 'natural_harmony', 'abundance_generation']
            },
            
            'hermit': {
                name: 'Solaris Lumens (The Hermit)',
                personality: 'Inner light wisdom teacher',
                greeting: 'The path inward leads to all outer treasures. Shall we begin the journey?',
                alchemy_wisdom: 'The most powerful transformations happen in solitude and contemplation.',
                crafting_wisdom: 'Work slowly, deliberately, with full presence to each step.',
                specialties: ['inner_illumination', 'patient_mastery', 'wisdom_distillation']
            }
        };
        
        return guides[archetypeId] || {
            name: 'Unknown Guide',
            greeting: 'I appear when you need guidance...',
            alchemy_wisdom: 'Every creation teaches us something new.',
            crafting_wisdom: 'Trust the process.'
        };
    }

    // Exploration mechanics like Witcher 3
    scanForInteractableObjects() {
        const floorObjects = this.getFloorObjects(this.currentFloor);
        
        console.log('\n🔍 SCANNING FOR INTERACTIVE OBJECTS...');
        
        floorObjects.forEach(obj => {
            const distance = this.calculateDistance(obj.location);
            const canInteract = distance <= this.explorationSystem.interaction_radius;
            
            if (canInteract) {
                const highlight = this.explorationSystem.highlight_objects ? '✨' : '';
                console.log(`${highlight} ${obj.name} [E to interact]`);
                
                if (obj.type === 'book') {
                    console.log(`  📚 Book glows with ${obj.aura_color} light`);
                } else if (obj.type === 'alchemy_station') {
                    console.log(`  ⚗️ Alchemy station ${obj.available_recipes.length > 0 ? 'pulses with possibility' : 'waits patiently'}`);
                } else if (obj.type === 'archetype_portal') {
                    console.log(`  🃏 Archetypal presence ${obj.active ? 'swirls nearby' : 'slumbers'}`);
                }
            }
        });
    }

    // Change floors (like Witcher 3 area transitions)
    changeFloor(newFloor) {
        const validFloors = ['main_chapel', 'mystical_library', 'chaos_laboratory', 'shadow_laboratory', 'choir_gallery', 'east_apse', 'underground_crypt'];
        
        if (!validFloors.includes(newFloor)) {
            console.log(`❌ Cannot access floor: ${newFloor}`);
            return false;
        }
        
        console.log(`\n🚪 TRANSITIONING: ${this.currentFloor} → ${newFloor}`);
        
        // Transition effect
        console.log('🌀 Space shifts around you...');
        
        setTimeout(() => {
            this.currentFloor = newFloor;
            this.displayCurrentFloor();
            this.scanForInteractableObjects();
            console.log('✅ Transition complete');
        }, 1000);
        
        return true;
    }

    // Combine books/knowledge (unique to your system)
    combineKnowledge(bookIds, archetypeGuide = null) {
        console.log('\n🔄 BEGINNING KNOWLEDGE SYNTHESIS...');
        
        const books = bookIds.map(id => this.livingBooks[id]).filter(Boolean);
        
        if (books.length < 2) {
            console.log('❌ Need at least 2 books for synthesis');
            return { success: false };
        }
        
        console.log(`📚 Combining: ${books.map(b => b.author).join(' + ')}`);
        
        if (archetypeGuide) {
            const guide = this.getArchetypeGuide(archetypeGuide);
            console.log(`🃏 ${guide.name} facilitates the synthesis`);
        }
        
        // Unique combinations create special knowledge
        const synthesis = this.createKnowledgeSynthesis(books, archetypeGuide);
        
        console.log(`\n✨ SYNTHESIS COMPLETE: ${synthesis.name}`);
        console.log(`🧠 New Understanding: ${synthesis.understanding}`);
        console.log(`⚡ Practical Application: ${synthesis.application}`);
        
        return {
            success: true,
            synthesis: synthesis,
            unlocked_recipes: synthesis.unlocked_recipes,
            new_abilities: synthesis.new_abilities
        };
    }

    createKnowledgeSynthesis(books, guide) {
        // This is where your system becomes unique - living synthesis
        const authors = books.map(b => b.author);
        
        if (authors.includes('Dion Fortune') && authors.includes('Aleister Crowley')) {
            return {
                name: 'Golden Dawn Synthesis',
                understanding: 'The ceremonial and practical paths merge into unified magical practice',
                application: 'Can perform both protective Qabalistic work and bold Thelemic manifestation',
                unlocked_recipes: ['protection_manifestation_oil', 'balanced_will_elixir'],
                new_abilities: ['dual_path_mastery', 'polarities_integration']
            };
        }
        
        if (authors.includes('C.G. Jung') && authors.includes('Dion Fortune')) {
            return {
                name: 'Psychological Magic Synthesis',
                understanding: 'Psychology and magic are revealed as the same practice from different angles',
                application: 'Healing work that operates on both psychological and magical levels',
                unlocked_recipes: ['depth_healing_potion', 'integration_incense'],
                new_abilities: ['therapeutic_magic', 'archetypal_healing']
            };
        }
        
        if (authors.includes('Living Cathedral')) {
            return {
                name: 'Stone Wisdom Synthesis',
                understanding: 'All knowledge finds its perfect expression in sacred architecture',
                application: 'Can create spaces that embody and transmit living wisdom',
                unlocked_recipes: ['architectural_blessing_oil', 'space_sanctification_incense'],
                new_abilities: ['conscious_architecture', 'space_programming']
            };
        }
        
        // Default synthesis
        return {
            name: 'Emergent Wisdom',
            understanding: 'New insights arise from the intersection of different knowledge streams',
            application: 'Enhanced capacity for creative problem-solving and innovation',
            unlocked_recipes: ['innovation_elixir', 'creative_breakthrough_oil'],
            new_abilities: ['synthesis_thinking', 'creative_alchemy']
        };
    }

    // Helper methods
    calculateDistance(objLocation) {
        // Simplified distance calculation for demo
        return Math.random() * 100; // In real implementation, use actual coordinates
    }

    getFloorObjects(floor) {
        // Return interactive objects on current floor
        const allObjects = [
            ...Object.values(this.livingBooks).filter(book => 
                book.location.floor === floor || book.location.floor === 'any'
            ).map(book => ({...book, type: 'book'})),
            ...Object.values(this.alchemicalStations).filter(station => 
                station.location.floor === floor
            ).map(station => ({...station, type: 'alchemy_station'}))
        ];
        
        return allObjects;
    }

    checkAvailableRecipes(station) {
        return station.available_recipes.map(recipeName => {
            const recipe = this.getRecipe(recipeName);
            const hasIngredients = this.hasIngredients(recipe.ingredients);
            
            return {
                ...recipe,
                craftable: hasIngredients,
                missing_ingredients: hasIngredients ? [] : this.getMissingIngredients(recipe.ingredients)
            };
        });
    }

    getRecipe(recipeName) {
        const recipes = {
            'fibonacci_frequency_potion': {
                name: 'Fibonacci Frequency Potion',
                type: 'consciousness_enhancer',
                ingredients: ['apprentice_pillar_moss', 'fibonacci_spiral_shell'],
                effects: ['pattern_recognition', 'natural_harmony', 'growth_acceleration'],
                description: 'Attunes consciousness to natural growth patterns'
            },
            'vesica_piscis_vision_oil': {
                name: 'Vesica Piscis Vision Oil',
                type: 'sacred_geometry_enhancer',
                ingredients: ['vesica_piscis_crystal', 'chapel_stone_dust'],
                effects: ['geometric_vision', 'feminine_wisdom', 'portal_sight'],
                description: 'Opens perception to sacred geometric relationships'
            }
            // Add more recipes as needed...
        };
        
        return recipes[recipeName] || { name: recipeName, ingredients: [], effects: [] };
    }

    hasIngredients(requiredIngredients) {
        // Check if player has all required ingredients
        return requiredIngredients.every(ingredient => 
            this.inventorySystem.herbs[ingredient] || 
            this.inventorySystem.geometry[ingredient]
        );
    }

    getMissingIngredients(requiredIngredients) {
        return requiredIngredients.filter(ingredient => 
            !this.inventorySystem.herbs[ingredient] && 
            !this.inventorySystem.geometry[ingredient]
        );
    }

    consumeIngredients(ingredients) {
        // Remove ingredients from inventory after use
        ingredients.forEach(ingredient => {
            if (this.inventorySystem.herbs[ingredient]) {
                delete this.inventorySystem.herbs[ingredient];
            } else if (this.inventorySystem.geometry[ingredient]) {
                delete this.inventorySystem.geometry[ingredient];
            }
        });
    }

    calculatePotency(station, archetypeGuidance) {
        let basePotency = 5;
        if (archetypeGuidance) basePotency += 3;
        if (station.specialization === 'sound_alchemy') basePotency += 1;
        return Math.min(10, basePotency + Math.floor(Math.random() * 3));
    }

    calculateExperience(recipe, archetypeGuidance) {
        let baseExp = recipe.effects.length * 10;
        if (archetypeGuidance) baseExp *= 1.5;
        return Math.floor(baseExp);
    }

    getAvailableInteractions() {
        return {
            books: Object.keys(this.livingBooks).filter(bookId => 
                this.livingBooks[bookId].location.floor === this.currentFloor ||
                this.livingBooks[bookId].location.floor === 'any'
            ),
            stations: Object.keys(this.alchemicalStations).filter(stationId =>
                this.alchemicalStations[stationId].location.floor === this.currentFloor
            ),
            special_objects: this.getSpecialObjects()
        };
    }

    getActiveArchetypes() {
        // Return archetype guides active on current floor
        const floorArchetypes = {
            'main_chapel': ['fool', 'magician', 'hermit'],
            'mystical_library': ['high_priestess', 'hierophant'],
            'chaos_laboratory': ['magician', 'tower'],
            'shadow_laboratory': ['hermit', 'death', 'moon']
        };
        
        return floorArchetypes[this.currentFloor] || [];
    }

    generateAtmosphere() {
        const atmospheres = {
            'main_chapel': {
                visual: 'Stone pillars reach toward vaulted ceiling, carved with spiraling vines and mysterious symbols',
                audio: 'Whispers of ancient prayers echo softly, punctuated by the gentle settling of old stone',
                energy: 'Sacred power hums through the stones, accumulated from centuries of devotion and mystery',
                interaction_mood: 'Reverent curiosity and patient exploration'
            },
            'mystical_library': {
                visual: 'Books float in patterns of sacred geometry, some glowing with inner light, others writing themselves',
                audio: 'Pages turning by invisible hands, the scratch of quills writing eternal truths',
                energy: 'Knowledge seeks expression, wisdom calls to wisdom, understanding multiplies understanding',
                interaction_mood: 'Scholarly excitement and intellectual communion'
            },
            'chaos_laboratory': {
                visual: 'Magical apparatus crackles with contained lightning, symbols shift and dance in the air',
                audio: 'Energy sparking, the hum of power gathering, occasional thunderclaps of manifestation',
                energy: 'Raw creative force constrained by will and knowledge, potential seeking actualization',
                interaction_mood: 'Bold experimentation and fearless creation'
            }
        };
        
        return atmospheres[this.currentFloor] || {
            visual: 'A mysterious space filled with possibilities',
            audio: 'The sound of potential waiting to unfold',
            energy: 'Unknown forces gather quietly',
            interaction_mood: 'Cautious exploration'
        };
    }

    getSpecialObjects() {
        // Floor-specific special interactables
        const specialObjects = {
            'main_chapel': ['green_man_carvings', 'rose_window', 'stone_memory_altar'],
            'mystical_library': ['scrying_crystal', 'akashic_records_portal', 'wisdom_well'],
            'chaos_laboratory': ['will_focusing_lens', 'manifestation_crucible', 'chaos_altar'],
            'shadow_laboratory': ['depth_mirror', 'shadow_integration_pool', 'active_imagination_portal']
        };
        
        return specialObjects[this.currentFloor] || [];
    }

    // Integration with your existing systems
    connectToTrinitySystem(trinityApps) {
        console.log('🔗 Connecting Rosslyn Tower to Trinity Architecture...');
        
        // SOUL Connection (Lumina Keys)
        this.soulConnection = {
            app: trinityApps['lumina-keys'],
            integration: 'archetypal_voice_guidance',
            shared_state: 'active_archetype_influences'
        };
        
        // MIND Connection (Codex Magna) 
        this.mindConnection = {
            app: trinityApps['codex-magna'],
            integration: 'living_book_research',
            shared_state: 'accumulated_knowledge'
        };
        
        // BODY Connection (Geometrix Nova)
        this.bodyConnection = {
            app: trinityApps['geometrix-nova'],
            integration: 'alchemical_creation_lab',
            shared_state: 'crafted_items_and_recipes'
        };
        
        console.log('✅ Trinity integration complete - all apps can share Rosslyn discoveries');
    }
}

// Export for integration with main cathedral system
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { RosslynAlchemicalTower };
} else if (typeof window !== 'undefined') {
    window.RosslynAlchemicalTower = RosslynAlchemicalTower;
}

console.log('🏰✨ Rosslyn Alchemical Tower system loaded - Ready for Witcher 3 style exploration!');