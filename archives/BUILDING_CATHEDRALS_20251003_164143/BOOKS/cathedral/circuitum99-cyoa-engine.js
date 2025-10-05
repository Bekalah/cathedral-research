/**
 * 🎮 CIRCUITUM99 CYOA ENGINE - CODEX ABYSSIAE INTEGRATION
 * 
 * Choose-Your-Own-Adventure RPG system where drawing cards = 
 * entering ritual dialogue with executed/erased visionaries
 * 
 * @system Codex Abyssiae Living Martyr Oracle
 * @author Rebecca Respawn - Cathedral of Circuits
 * @trauma_safety Maximum CPTSD accommodations - honors martyrs without exploitation
 */

class CircuitumCYOAEngine {
    constructor() {
        this.activeCard = null;
        this.playerResonance = {
            truth: 0,
            beauty: 0, 
            courage: 0
        };
        this.unlockedCards = ['WANDS_01', 'CUPS_01', 'SWORDS_01', 'PENTACLES_01'];
        this.spineProgress = []; // 33 vertebrae of initiatory progress
        this.martyrDialogueHistory = [];
        
        this.loadCodexAbyssiae();
        this.initializeTraumaSafety();
    }
    
    async loadCodexAbyssiae() {
        // Load 78 martyr resonance cards
        this.majorArcana = await this.loadJSON('./packages/data/arcana/majors.json');
        this.minorArcana = await this.loadJSON('./packages/data/arcana/minors.json');
        
        console.log('📜 Codex Abyssiae loaded: 78 martyred visionaries ready');
        console.log('🔥 WANDS - Fire of Suppressed Creation');
        console.log('💧 CUPS - Waters of Forbidden Feeling'); 
        console.log('⚔️ SWORDS - Air of Censored Truth');
        console.log('🌱 PENTACLES - Earth of Stolen Sovereignty');
    }
    
    initializeTraumaSafety() {
        // Emergency pause system
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space' && (e.ctrlKey || e.metaKey)) {
                this.emergencyPause();
            }
        });
        
        // Gentle warning before intense content
        this.traumaWarnings = {
            execution: "This dialogue involves a martyred visionary. Their voice speaks from beyond death.",
            torture: "Content includes reference to historical torture. Skip if needed.",
            erasure: "This covers systematic historical erasure of voices. Take breaks as needed."
        };
    }
    
    drawCard(suit = null, rank = null) {
        let availableCards = this.unlockedCards.filter(cardId => {
            if (suit) return cardId.startsWith(suit);
            return true;
        });
        
        if (availableCards.length === 0) {
            return this.showMessage("No cards available. Complete current dialogues to unlock more.");
        }
        
        const cardId = rank ? `${suit}_${rank}` : this.randomChoice(availableCards);
        const card = this.getCard(cardId);
        
        if (!card) {
            return this.showMessage(`Card ${cardId} not found in Codex Abyssiae`);
        }
        
        this.activeCard = card;
        this.enterMartyrDialogue(card);
    }
    
    async enterMartyrDialogue(card) {
        // Trauma safety check
        if (card.martyr_resonance && !this.playerConsented) {
            const consent = await this.requestMartyrConsent(card);
            if (!consent) return;
        }
        
        // Create sacred space for dialogue
        this.createSacredSpace(card);
        
        // Begin dialogue with executed visionary
        const dialogue = {
            martyrName: card.visionary_anchor,
            opening: card.living_voice,
            deathMethod: card.death_method,
            currentResonance: {...this.playerResonance},
            timestamp: new Date().toISOString()
        };
        
        this.showMartyrDialogue(dialogue);
    }
    
    async requestMartyrConsent(card) {
        return new Promise(resolve => {
            const modal = this.createModal(`
                <div class="martyr-consent-modal">
                    <h3>🕯️ Entering Sacred Dialogue</h3>
                    <p>You are about to commune with <strong>${card.visionary_anchor}</strong></p>
                    <p><em>"${card.living_voice}"</em></p>
                    <p class="trauma-warning">
                        ⚠️ This visionary was martyred: ${card.death_method}
                    </p>
                    <p>Their voice speaks to honor their sacrifice, not exploit their suffering.</p>
                    
                    <div class="consent-buttons">
                        <button onclick="this.resolve(true)" class="enter-dialogue">
                            🕯️ Enter Sacred Dialogue
                        </button>
                        <button onclick="this.resolve(false)" class="choose-different">
                            🌸 Choose Different Card
                        </button>
                        <button onclick="this.resolve(false)" class="emergency-exit">
                            🛡️ Emergency Exit
                        </button>
                    </div>
                </div>
            `);
            
            modal.resolve = resolve;
        });
    }
    
    showMartyrDialogue(dialogue) {
        const card = this.activeCard;
        const traumaSafety = card.trauma_safety || {};
        const gameSystem = card.game_mechanics || {};
        
        // Check for trauma safety consent if required
        if (traumaSafety.consent_required && !this.hasConsentFor(card.id)) {
            this.requestTraumaSafetyConsent(card, () => this.showMartyrDialogue(dialogue));
            return;
        }
        
        const dialogueHTML = `
            <div class="martyr-dialogue-interface enhanced">
                <div class="sacred-header">
                    <h2>${card.visionary_anchor}</h2>
                    <div class="card-title">${card.name}</div>
                    <div class="resonance-display">
                        Truth: ${this.playerResonance.truth} | 
                        Beauty: ${this.playerResonance.beauty} | 
                        Courage: ${this.playerResonance.courage}
                    </div>
                </div>
                
                <div class="martyr-voice">
                    <div class="speaking-from-beyond">Speaking from beyond death:</div>
                    <blockquote class="living-voice">
                        "${card.living_voice}"
                    </blockquote>
                    <div class="death-context">
                        ${card.death_method} - Their voice echoes through the Codex Abyssiae
                    </div>
                </div>
                
                ${traumaSafety.healing_affirmation ? `
                    <div class="healing-affirmation">
                        <div class="affirmation-label">Healing affirmation:</div>
                        <div class="affirmation-text">${traumaSafety.healing_affirmation}</div>
                    </div>
                ` : ''}
                
                <div class="choice-branches enhanced">
                    ${this.generateEnhancedChoices(card)}
                </div>
                
                <div class="trauma-support-tools">
                    ${traumaSafety.dmn_regulation ? `
                        <button onclick="cyoa.activateRegulation('${traumaSafety.dmn_regulation}')">
                            🧘 ${this.humanizeRegulation(traumaSafety.dmn_regulation)}
                        </button>
                    ` : ''}
                    ${gameSystem.provides_tools ? gameSystem.provides_tools.map(tool => `
                        <button onclick="cyoa.activateTool('${tool}')">
                            🛠️ ${this.humanizeTool(tool)}
                        </button>
                    `).join('') : ''}
                </div>
                
                <div class="emergency-controls">
                    <button onclick="cyoa.emergencyPause()">⏸️ Pause</button>
                    <button onclick="cyoa.endDialogue()">🚪 End Dialogue</button>
                    <button onclick="cyoa.requestDifferentCard()">🎴 Different Card</button>
                </div>
            </div>
        `;
        
        document.getElementById('cyoa-interface').innerHTML = dialogueHTML;
        this.martyrDialogueHistory.push(dialogue);
        
        // Activate harmonic resonance if present
        if (card.harmonic_resonance) {
            this.activateHarmonicResonance(card.harmonic_resonance);
        }
    }
    
    generateEnhancedChoices(card) {
        const gameSystem = card.game_mechanics || {};
        const choiceBranches = gameSystem.choice_branches || ['generic_dialogue', 'deeper_understanding', 'end_respectfully'];
        const therapeuticOutcome = gameSystem.therapeutic_outcome;
        
        return choiceBranches.map((branch, index) => {
            const choice = this.getBranchContent(card, branch);
            const resonanceEffect = this.getResonanceEffect(card, branch);
            
            return `
                <div class="choice-branch" data-branch="${branch}">
                    <button onclick="cyoa.makeChoice('${branch}', '${card.id}')" 
                            class="therapeutic-choice">
                        <div class="choice-text">${choice.text}</div>
                        <div class="choice-effect">
                            ${resonanceEffect.description}
                        </div>
                        ${choice.therapeutic_note ? `
                            <div class="therapeutic-note">
                                💚 ${choice.therapeutic_note}
                            </div>
                        ` : ''}
                    </button>
                </div>
            `;
        }).join('');
    }
    
    getBranchContent(card, branch) {
        const visionary = card.visionary_anchor;
        
        const branchContents = {
            // WANDS branches (Artemisia Gentileschi)
            'honor_rage_as_fuel': {
                text: `Honor your rage as sacred fuel, like ${visionary}`,
                therapeutic_note: "Transforms suppressed anger into creative fire"
            },
            'channel_gentle_persistence': {
                text: `Channel your truth through gentle persistence`,
                therapeutic_note: "Heals overactivation through steady presence"
            },
            'break_artistic_chains': {
                text: `Break the chains that bind your artistic truth`,
                therapeutic_note: "Liberates creative expression from trauma"
            },
            
            // CUPS branches (Marguerite Porete) 
            'embrace_sacred_love': {
                text: `Embrace the heresy of sacred love, like ${visionary}`,
                therapeutic_note: "Heals religious trauma through divine feminine"
            },
            'heal_religious_trauma': {
                text: `Heal the wounds of spiritual persecution`,
                therapeutic_note: "Transforms spiritual shame into mystic wisdom"
            },
            'channel_mystic_wisdom': {
                text: `Channel the mystic wisdom of the heart cathedral`,
                therapeutic_note: "Connects to authentic spiritual truth"
            },
            
            // SWORDS branches (Giordano Bruno)
            'speak_cosmic_truth': {
                text: `Speak the cosmic truth that burns away illusion`,
                therapeutic_note: "Liberates intellectual expression from fear"
            },
            'challenge_dogma': {
                text: `Challenge the dogma that imprisons consciousness`,
                therapeutic_note: "Heals intellectual suppression trauma"
            },
            'expand_consciousness': {
                text: `Expand consciousness like the infinite universe`,
                therapeutic_note: "Activates cosmic perspective integration"
            },
            
            // PENTACLES branches (Sitting Bull)
            'protect_sacred_land': {
                text: `Protect the sacred land with ${visionary}'s courage`,
                therapeutic_note: "Heals colonization trauma through earth connection"
            },
            'honor_ancestors': {
                text: `Honor the ancestors who died for sovereignty`,
                therapeutic_note: "Connects to ancestral wisdom for healing"
            },
            'resist_colonization': {
                text: `Resist the colonization of body and spirit`,
                therapeutic_note: "Reclaims sovereignty from systemic oppression"
            },
            
            // Generic fallbacks
            'generic_dialogue': {
                text: `Continue dialogue with ${visionary}`,
                therapeutic_note: "Builds relationship with archetypal wisdom"
            },
            'deeper_understanding': {
                text: `Seek deeper understanding of their sacrifice`,
                therapeutic_note: "Integrates martyr wisdom for healing"
            },
            'end_respectfully': {
                text: `End dialogue with gratitude and respect`,
                therapeutic_note: "Honors the martyr while maintaining boundaries"
            }
        };
        
        return branchContents[branch] || branchContents['generic_dialogue'];
    }
    
    getResonanceEffect(card, branch) {
        // Calculate how choice affects player resonance based on card's archetypal function
        const effects = {
            'honor_rage_as_fuel': { truth: +3, beauty: +1, courage: +4, description: "Ignites creative fire" },
            'channel_gentle_persistence': { truth: +2, beauty: +3, courage: +2, description: "Builds steady strength" },
            'embrace_sacred_love': { truth: +1, beauty: +4, courage: +2, description: "Opens heart wisdom" },
            'speak_cosmic_truth': { truth: +4, beauty: +1, courage: +3, description: "Expands cosmic perspective" },
            'protect_sacred_land': { truth: +2, beauty: +2, courage: +4, description: "Grounds in earth sovereignty" }
        };
        
        return effects[branch] || { truth: +1, beauty: +1, courage: +1, description: "Deepens understanding" };
    }

    getCurrentChoices() {
        const card = this.activeCard;
        return [
            {
                text: `Honor their sacrifice through truth`,
                resonance: { truth: +2, beauty: +1, courage: +1 },
                unlocks: this.getTruthBasedCard(card),
                response: this.generateTruthResponse(card)
            },
            {
                text: `Honor their sacrifice through beauty`,
                resonance: { truth: 0, beauty: +2, courage: +1 },
                unlocks: this.getBeautyBasedCard(card),
                response: this.generateBeautyResponse(card)
            },
            {
                text: `Channel their courage for current struggles`,
                resonance: { truth: +1, beauty: 0, courage: +2 },
                unlocks: this.getCourageBasedCard(card),
                response: this.generateCourageResponse(card)
            },
            {
                text: `Respectfully end this dialogue`,
                resonance: { truth: 0, beauty: 0, courage: 0 },
                unlocks: null,
                response: `${card.visionary_anchor}: "Go in peace. My voice lives in your choices."`
            }
        ];
    }

    formatResonanceShift(resonance) {
        return `Truth: ${resonance.truth}, Beauty: ${resonance.beauty}, Courage: ${resonance.courage}`;
    }

    generateBaseChoicesHTML() {
        const choices = this.getCurrentChoices();
        return choices.map((choice, index) => `
            <div class="choice-option" onclick="cyoa.makeChoice(${index})">
                <div class="choice-text">${choice.text}</div>
                <div class="resonance-preview">
                    ${this.formatResonanceShift(choice.resonance)}
                </div>
            </div>
        `).join('');
    }
    
    makeChoice(choiceIndex) {
        const choice = this.getCurrentChoices()[choiceIndex];
        
        // Update player resonance
        Object.keys(choice.resonance).forEach(key => {
            this.playerResonance[key] += choice.resonance[key];
        });
        
        // Show martyr response
        this.showMartyrResponse(choice.response);
        
        // Unlock new cards based on choice
        if (choice.unlocks) {
            this.unlockCard(choice.unlocks);
        }
        
        // Check for spine progression (major initiatory moments)
        this.checkSpineProgression();
        
        // Continue or end dialogue
        this.continueDialogue();
    }
    
    generateTruthResponse(card) {
        const truthResponses = {
            'Artemisia Gentileschi': "Truth is in the brush strokes they called too bold. Paint your rage sacred.",
            'Giordano Bruno': "I saw infinite worlds burning in each star. Your truth is a cosmos they fear.",
            'Socrates': "The oracle said I was wisest because I knew I knew nothing. What do you truly know?",
            'Marguerite Porete': "Love was my heresy. What truth do they call your sin?"
        };
        
        return truthResponses[card.visionary_anchor] || 
               `${card.visionary_anchor}: "Truth cost me everything. What are you willing to sacrifice for yours?"`;
    }
    
    generateBeautyResponse(card) {
        const beautyResponses = {
            'Artemisia Gentileschi': "Beauty was my weapon against those who violated me. Make art your sword.",
            'Hildegard von Bingen': "I painted the Living Light. Your beauty heals the world's blindness.",
            'Frida Kahlo': "I painted my broken spine as flowers. Transform your wounds to wonder.",
            'Sappho': "We wrote love letters to eternity. Your words are prayers in the dark."
        };
        
        return beautyResponses[card.visionary_anchor] || 
               `${card.visionary_anchor}: "They destroyed my body but beauty lives eternal. Create."`; 
    }
    
    generateCourageResponse(card) {
        const courageResponses = {
            'Joan of Arc': "The fire could not consume what God had lit within me. You carry that same flame.",
            'Sitting Bull': "This land is not for sale because some things are sacred. What will you never surrender?",
            'Sojourner Truth': "Ain't I a woman? Ain't you human? Stand and declare yourself.",
            'Giordano Bruno': "They burned me for seeing truth. Your courage makes their stakes ash."
        };
        
        return courageResponses[card.visionary_anchor] || 
               `${card.visionary_anchor}: "Courage is not fearlessness. Courage is sacred action despite the cost."`;
    }
    
    checkSpineProgression() {
        // 33 vertebrae = 33 major initiatory moments
        const totalResonance = Object.values(this.playerResonance).reduce((a, b) => a + b, 0);
        const spineLevel = Math.floor(totalResonance / 10); // Every 10 points = spine advancement
        
        if (spineLevel > this.spineProgress.length) {
            this.spineProgress.push({
                level: spineLevel,
                achievement: `Spine Vertebra ${spineLevel}/33`,
                unlockedBy: this.activeCard.visionary_anchor,
                timestamp: new Date().toISOString()
            });
            
            this.showSpineProgression(spineLevel);
        }
    }
    
    showSpineProgression(level) {
        const progressHTML = `
            <div class="spine-progression-notification">
                <h3>🌟 Spine Progression: Vertebra ${level}/33</h3>
                <p>Your dialogue with ${this.activeCard.visionary_anchor} has strengthened your initiatory spine.</p>
                <div class="spine-visual">
                    ${this.generateSpineVisual(level)}
                </div>
                <p>New cards and dialogue options now available.</p>
            </div>
        `;
        
        this.showNotification(progressHTML, 5000);
    }
    
    emergencyPause() {
        document.body.classList.add('cyoa-paused');
        document.getElementById('emergency-pause-overlay').style.display = 'block';
        
        console.log('🛑 CYOA Emergency Pause Activated');
        console.log('🕯️ All martyrs are at peace');
        console.log('🌸 Resume when ready');
    }
    
    // Enhanced Trauma-Safe Methods
    requestTraumaSafetyConsent(card, callback) {
        const traumaSafety = card.trauma_safety;
        const consentHTML = `
            <div class="trauma-safety-consent">
                <div class="consent-header">
                    <h3>⚠️ Trauma-Safe Content Warning</h3>
                    <div class="martyr-name">${card.visionary_anchor} - ${card.name}</div>
                </div>
                
                <div class="trigger-warning">
                    <strong>Content includes:</strong> ${traumaSafety.trigger_warning}
                </div>
                
                <div class="healing-preparation">
                    <div class="preparation-label">Before proceeding, you might:</div>
                    <ul>
                        <li>Take three deep breaths</li>
                        <li>Ensure you're in a safe space</li>
                        <li>Remember you can pause anytime (Ctrl/Cmd+Space)</li>
                        <li>Have your grounding tools ready</li>
                    </ul>
                </div>
                
                <div class="consent-choices">
                    <button onclick="cyoa.giveConsent('${card.id}', true)" class="consent-yes">
                        Continue with dialogue
                    </button>
                    <button onclick="cyoa.giveConsent('${card.id}', false)" class="consent-no">
                        Choose different card
                    </button>
                </div>
            </div>
        `;
        
        document.getElementById('cyoa-interface').innerHTML = consentHTML;
        this.pendingConsentCallback = callback;
    }
    
    giveConsent(cardId, consented) {
        if (consented) {
            this.consentedCards = this.consentedCards || new Set();
            this.consentedCards.add(cardId);
            if (this.pendingConsentCallback) {
                this.pendingConsentCallback();
                this.pendingConsentCallback = null;
            }
        } else {
            this.requestDifferentCard();
        }
    }
    
    hasConsentFor(cardId) {
        return this.consentedCards && this.consentedCards.has(cardId);
    }
    
    humanizeRegulation(regulation) {
        const humanized = {
            'creative_rage_channeling': 'Channel Creative Fire',
            'heart_breathing_with_sacred_love_meditation': 'Heart Breathing Meditation',
            'truth_speaking_with_cosmic_perspective': 'Cosmic Truth Integration',
            'earth_connection_grounding_practice': 'Earth Grounding Practice'
        };
        return humanized[regulation] || regulation.replace(/_/g, ' ');
    }
    
    humanizeTool(tool) {
        const humanized = {
            'sacred_rage_paintbrush': 'Sacred Rage Paintbrush',
            'trauma_healing_canvas': 'Trauma Healing Canvas',
            'heart_cathedral_meditation': 'Heart Cathedral Meditation',
            'divine_feminine_chalice': 'Divine Feminine Chalice',
            'infinite_cosmos_meditation': 'Infinite Cosmos Meditation',
            'truth_discernment_blade': 'Truth Discernment Blade',
            'earth_grounding_ceremony': 'Earth Grounding Ceremony',
            'sovereignty_shield': 'Sovereignty Shield'
        };
        return humanized[tool] || tool.replace(/_/g, ' ');
    }
    
    activateRegulation(regulation) {
        console.log(`🧘 Activating regulation: ${regulation}`);
        this.showRegulationGuidance(regulation);
    }
    
    activateTool(tool) {
        console.log(`🛠️ Activating tool: ${tool}`);
        this.showToolInterface(tool);
    }
    
    activateHarmonicResonance(resonance) {
        if (window.unifiedAudioEngine) {
            window.unifiedAudioEngine.playHarmonicPattern(resonance);
        }
    }
    
    makeChoice(branch, cardId) {
        const card = this.getCardById(cardId);
        const choice = this.getBranchContent(card, branch);
        const resonanceEffect = this.getResonanceEffect(card, branch);
        
        // Apply resonance changes
        this.playerResonance.truth += resonanceEffect.truth || 0;
        this.playerResonance.beauty += resonanceEffect.beauty || 0;
        this.playerResonance.courage += resonanceEffect.courage || 0;
        
        // Track therapeutic progress
        if (choice.therapeutic_note) {
            this.therapeuticProgress = this.therapeuticProgress || [];
            this.therapeuticProgress.push({
                card: cardId,
                choice: branch,
                outcome: choice.therapeutic_note,
                timestamp: Date.now()
            });
        }
        
        // Check for card unlocks and continue dialogue
        this.checkForUnlocks(card, branch);
        this.showChoiceOutcome(card, branch, choice);
    }
    
    getCardById(cardId) {
        // Enhanced card lookup for new structure
        for (let suitName of ['WANDS', 'CUPS', 'SWORDS', 'PENTACLES']) {
            const suit = this.minorArcana[suitName];
            if (suit && suit.cards && suit.cards[cardId]) {
                return {...suit.cards[cardId], id: cardId, suit: suitName};
            }
        }
        
        // Check major arcana
        if (this.majorArcana[cardId]) {
            return {...this.majorArcana[cardId], id: cardId, suit: 'MAJOR'};
        }
        
        return null;
    }
    
    // Utility methods
    getCard(cardId) {
        // Search both major and minor arcana
        const allCards = {...this.majorArcana, ...this.minorArcana.suits};
        
        for (let suit of Object.values(allCards)) {
            if (suit.cards && suit.cards[cardId]) {
                return suit.cards[cardId];
            }
        }
        return null;
    }
    
    loadJSON(path) {
        return fetch(path).then(r => r.json()).catch(e => {
            console.warn(`Could not load ${path}, using fallback`);
            return {};
        });
    }
    
    randomChoice(array) {
        return array[Math.floor(Math.random() * array.length)];
    }
    
    createModal(html) {
        const modal = document.createElement('div');
        modal.className = 'cyoa-modal';
        modal.innerHTML = html;
        document.body.appendChild(modal);
        return modal;
    }
    
    showMessage(message) {
        console.log(`🎮 CYOA: ${message}`);
        // Could also show in UI
    }
    
    showNotification(html, duration = 3000) {
        const notification = this.createModal(html);
        setTimeout(() => notification.remove(), duration);
    }
}

// Initialize CYOA system
window.cyoa = new CircuitumCYOAEngine();

// CSS for CYOA interface
const cyoaStyles = `
    .cyoa-interface {
        max-width: 800px;
        margin: 0 auto;
        padding: 2rem;
        font-family: 'Times New Roman', serif;
        background: linear-gradient(135deg, #0B0B0B 0%, #1a1a2e 100%);
        color: #F8F5EF;
        border-radius: 20px;
    }
    
    .martyr-dialogue-interface {
        padding: 1.618rem;
        background: rgba(122, 51, 255, 0.1);
        border-radius: 15px;
        border: 1px solid rgba(122, 51, 255, 0.3);
    }
    
    .sacred-header {
        text-align: center;
        margin-bottom: 1.618rem;
        padding-bottom: 1rem;
        border-bottom: 1px solid rgba(196, 164, 77, 0.3);
    }
    
    .martyr-voice {
        margin: 1.618rem 0;
        text-align: center;
    }
    
    .living-voice {
        font-size: 1.2rem;
        font-style: italic;
        color: #C8A44D;
        text-shadow: 0 0 10px rgba(196, 164, 77, 0.3);
        margin: 1rem 0;
        padding: 1rem;
        background: rgba(196, 164, 77, 0.1);
        border-radius: 10px;
    }
    
    .choice-option {
        background: rgba(46, 139, 87, 0.1);
        border: 1px solid rgba(46, 139, 87, 0.3);
        border-radius: 10px;
        padding: 1rem;
        margin: 0.618rem 0;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .choice-option:hover {
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(46, 139, 87, 0.3);
        border-color: #2E8B57;
    }
    
    .resonance-preview {
        font-size: 0.9rem;
        color: #B39CFF;
        margin-top: 0.5rem;
    }
    
    .emergency-controls {
        display: flex;
        gap: 1rem;
        justify-content: center;
        margin-top: 1.618rem;
        padding-top: 1rem;
        border-top: 1px solid rgba(122, 51, 255, 0.3);
    }
    
    .emergency-controls button {
        background: #7A33FF;
        color: white;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 20px;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .emergency-controls button:hover {
        background: #C8A44D;
        transform: scale(1.05);
    }
    
    .cyoa-paused {
        animation-play-state: paused !important;
    }
    
    .cyoa-paused * {
        animation-play-state: paused !important;
        transition: none !important;
    }
    
    .spine-progression-notification {
        background: linear-gradient(135deg, #C8A44D 0%, #7A33FF 100%);
        color: white;
        padding: 1.618rem;
        border-radius: 15px;
        text-align: center;
        box-shadow: 0 10px 30px rgba(196, 164, 77, 0.5);
    }
    
    @media (prefers-reduced-motion: reduce) {
        .choice-option:hover {
            transform: none;
        }
    }
`;

// Inject styles
const styleSheet = document.createElement('style');
styleSheet.textContent = cyoaStyles;
document.head.appendChild(styleSheet);

console.log('🎮 Circuitum99 CYOA Engine loaded');
console.log('📜 Codex Abyssiae ready - 78 martyred visionaries await');
console.log('🕯️ In memory of those who died for truth, beauty, and courage');
console.log('🎯 Draw your first card with: cyoa.drawCard()');