/**
 * 🏛️✨ CATHEDRAL OPEN WORLD EXPLORER ENGINE
 * 
 * Health Lattice Web System with Fusion Project Integration
 * Based on Cathedral of Circuits architecture with trauma-informed design
 * 
 * Apps Integration:
 * - Cathedral Connection Map (Soul Reclamation Piano)
 * - Circuitum99 Alpha et Omega (Living Tarot)
 * - Sacred Geometry Labs (Emma Kunz style)
 * - Synthesis Laboratory (10 planetary synths)
 * - Wellness Observatory (Health Lattice)
 * - Fusion Laboratory (Project combining)
 * - Memory Palace (Session storage)
 * - Creation Engine (Art/music generation)
 */

class CathedralOpenWorldEngine {
    constructor() {
        this.playerPosition = { x: 0, y: 0, z: 0 };
        this.selectedHall = null;
        this.healthLattice = this.initializeHealthLattice();
        this.fusionProjects = this.initializeFusionProjects();
        this.sessionMemory = JSON.parse(localStorage.getItem('cathedralExplorerSession') || '{}');
        this.activeConnections = new Map();
        this.nodeHealth = new Map();
        this.creativeMoments = [];
        
        // Cathedral System Integration
        this.apps = this.initializeApps();
        this.synthStations = this.initializeSynthStations();
        this.wellness = this.initializeWellness();
        
        this.init();
    }

    init() {
        this.setupWorldNavigation();
        this.setupHealthLatticeVisualizer();
        this.createAtmosphericParticles();
        this.setupCustomCursor();
        this.startHealthMonitoring();
        this.loadSavedProgress();
        this.updateInfoPanel();
        
        console.log('🏛️✨ Cathedral Open World Explorer initialized');
        console.log('🕸️ Health Lattice Web active');
        console.log('⚗️ Fusion Laboratory ready');
    }

    initializeHealthLattice() {
        return {
            // Seven Dimensions of Consciousness Health
            creativity: { value: 75, connections: ['synthesis', 'geometry', 'fusion'], lastUpdate: Date.now() },
            balance: { value: 68, connections: ['wellness', 'memory'], lastUpdate: Date.now() },
            wisdom: { value: 82, connections: ['tarot', 'memory', 'connection'], lastUpdate: Date.now() },
            intuition: { value: 71, connections: ['tarot', 'connection'], lastUpdate: Date.now() },
            transformation: { value: 65, connections: ['fusion', 'creation'], lastUpdate: Date.now() },
            healing: { value: 88, connections: ['wellness', 'connection'], lastUpdate: Date.now() },
            flow: { value: 91, connections: ['synthesis', 'creation'], lastUpdate: Date.now() }
        };
    }

    initializeFusionProjects() {
        return {
            activeProjects: [],
            fusionHistory: [],
            availableTools: [
                'stable-diffusion-api',
                'dall-e-integration', 
                'midjourney-bridge',
                'suno-music-generation',
                'eleven-labs-voice',
                'github-copilot-code',
                'claude-writing',
                'runway-video'
            ],
            fusionTemplates: [
                { id: 'art-music', name: 'Visual Music Fusion', tools: ['art', 'music'], output: 'synesthetic' },
                { id: 'story-voice', name: 'Narrative Voice Fusion', tools: ['writing', 'voice'], output: 'audiobook' },
                { id: 'code-art', name: 'Generative Art Code', tools: ['code', 'art'], output: 'interactive' },
                { id: 'wellness-sound', name: 'Healing Frequency Art', tools: ['synthesis', 'geometry'], output: 'therapeutic' }
            ]
        };
    }

    initializeApps() {
        return {
            'cathedral-connection': {
                name: 'Cathedral Connection Map',
                description: 'Soul Reclamation Piano with archetypal beings',
                file: 'cathedral-connection-map/index.html',
                healthImpact: { healing: +15, wisdom: +10, intuition: +12 },
                traumaSafe: true,
                breathingGuide: true
            },
            'circuitum99': {
                name: 'Circuitum99: Alpha et Omega', 
                description: 'Living Tarot with 78 conscious archetypes',
                file: 'circuitum99-immersive-reality.html',
                healthImpact: { wisdom: +20, intuition: +18, transformation: +15 },
                synthIntegration: true,
                geometryGeneration: true
            },
            'synthesis-lab': {
                name: 'Synthesis Laboratory',
                description: '10 planetary synthesizers for healing frequencies',
                file: 'synthesis-laboratory.html',
                healthImpact: { flow: +25, creativity: +20, healing: +15 },
                frequencies: [174, 211.44, 396, 417, 432, 528, 639, 741, 852, 963],
                planetary: true
            },
            'geometry-lab': {
                name: 'Sacred Geometry Studio',
                description: 'Emma Kunz style pendulum art and healing patterns',
                file: 'sacred-geometry-lab.html',
                healthImpact: { creativity: +18, balance: +15, transformation: +12 },
                mathematicalPrecision: true,
                healingPatterns: true
            },
            'wellness-observatory': {
                name: 'Wellness Observatory',
                description: 'Health lattice monitoring and biometric integration',
                file: 'wellness-observatory.html',
                healthImpact: { balance: +20, healing: +22, flow: +10 },
                realTimeMonitoring: true,
                biometricIntegration: true
            },
            'fusion-laboratory': {
                name: 'Fusion Laboratory',
                description: 'Combine projects and tools into new realities',
                file: 'fusion-laboratory.html',
                healthImpact: { transformation: +25, creativity: +20 },
                projectCombining: true,
                infiniteExpansion: true
            }
        };
    }

    initializeSynthStations() {
        return [
            { id: 'mercury', name: 'MERCURY-buchla', planet: 'Mercury', freq: 528, color: '#60a5fa', active: false, healing: 'DNA repair' },
            { id: 'venus', name: 'VEGA-obxa', planet: 'Venus', freq: 639, color: '#ec4899', active: false, healing: 'Heart healing' },
            { id: 'earth', name: 'SOL-moog55', planet: 'Earth', freq: 432, color: '#4ade80', active: false, healing: 'Heart resonance' },
            { id: 'mars', name: 'ARES-ps3300', planet: 'Mars', freq: 396, color: '#f87171', active: false, healing: 'Fear liberation' },
            { id: 'jupiter', name: 'JOVE-jupiter8', planet: 'Jupiter', freq: 174, color: '#fbbf24', active: false, healing: 'Foundation' },
            { id: 'saturn', name: 'SATURN-synthi100', planet: 'Saturn', freq: 741, color: '#a78bfa', active: false, healing: 'Consciousness' },
            { id: 'uranus', name: 'URANUS-arp2600', planet: 'Uranus', freq: 852, color: '#06b6d4', active: false, healing: 'Spiritual order' },
            { id: 'neptune', name: 'NEPTUNE-synthex', planet: 'Neptune', freq: 211.44, color: '#3b82f6', active: false, healing: 'Illusion dissolution' },
            { id: 'pluto', name: 'PLUTO-schmidt', planet: 'Pluto', freq: 963, color: '#8b5cf6', active: false, healing: 'Crown activation' },
            { id: 'luna', name: 'LUNA-cs80', planet: 'Moon', freq: 417, color: '#e5e7eb', active: false, healing: 'Transmutation' }
        ];
    }

    initializeWellness() {
        return {
            creativity: 75,
            balance: 68, 
            wisdom: 82,
            intuition: 71,
            transformation: 65,
            healing: 88,
            flow: 91
        };
    }

    setupWorldNavigation() {
        const cathedralSpace = document.getElementById('cathedralSpace');
        const world = document.getElementById('cathedralWorld');
        
        const isMoving = false;
        const lastMousePosition = { x: 0, y: 0 };

        // Mouse movement navigation
        document.addEventListener('mousemove', (e) => {
            const mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
            const mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
            
            // Smooth camera movement based on mouse position
            const translateX = mouseX * 50;
            const translateY = mouseY * 50;
            const rotateY = mouseX * 5;
            const rotateX = -mouseY * 5;
            
            cathedralSpace.style.transform = `
                translate3d(${translateX}px, ${translateY}px, 0)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
            `;

            // Update health lattice based on exploration
            this.updateHealthFromMovement(mouseX, mouseY);
        });

        // Keyboard navigation (WASD)
        document.addEventListener('keydown', (e) => {
            const moveSpeed = 20;
            switch(e.key.toLowerCase()) {
                case 'w':
                    this.playerPosition.y -= moveSpeed;
                    this.triggerWellnessUpdate('flow', 2);
                    break;
                case 's':
                    this.playerPosition.y += moveSpeed;
                    break;
                case 'a':
                    this.playerPosition.x -= moveSpeed;
                    break;
                case 'd':
                    this.playerPosition.x += moveSpeed;
                    break;
            }
            this.updatePlayerPosition();
        });

        // Zoom on scroll
        document.addEventListener('wheel', (e) => {
            const zoomDelta = e.deltaY * 0.01;
            this.playerPosition.z += zoomDelta;
            this.playerPosition.z = Math.max(-200, Math.min(200, this.playerPosition.z));
            this.updatePlayerPosition();
        });

        // Hall interaction
        document.querySelectorAll('.cathedral-hall').forEach(hall => {
            hall.addEventListener('click', () => {
                const hallType = hall.dataset.hall;
                this.enterHall(hallType);
            });

            hall.addEventListener('mouseenter', () => {
                this.previewHall(hall.dataset.hall);
            });
        });
    }

    setupHealthLatticeVisualizer() {
        const lattice = document.getElementById('healthLattice');
        lattice.innerHTML = '';

        // Create connection lines between related wellness dimensions
        const connections = [
            { from: 'creativity', to: 'transformation', strength: 0.8 },
            { from: 'wisdom', to: 'intuition', strength: 0.9 },
            { from: 'balance', to: 'healing', strength: 0.7 },
            { from: 'flow', to: 'creativity', strength: 0.8 },
            { from: 'healing', to: 'transformation', strength: 0.6 },
            { from: 'intuition', to: 'wisdom', strength: 0.9 },
            { from: 'balance', to: 'flow', strength: 0.7 }
        ];

        connections.forEach((conn, index) => {
            const line = document.createElement('div');
            line.className = 'lattice-connection';
            line.style.top = `${20 + index * 80}px`;
            line.style.left = `${Math.random() * 80}%`;
            line.style.width = `${Math.random() * 200 + 100}px`;
            line.style.transform = `rotate(${Math.random() * 360}deg)`;
            line.style.animationDelay = `${index * 0.5}s`;
            
            lattice.appendChild(line);

            // Store connection data
            this.activeConnections.set(`${conn.from}-${conn.to}`, {
                strength: conn.strength,
                element: line,
                lastPulse: Date.now()
            });
        });

        this.updateLatticeVisualization();
    }

    updateLatticeVisualization() {
        // Update lattice based on current wellness state
        this.activeConnections.forEach((connection, key) => {
            const [from, to] = key.split('-');
            const fromValue = this.healthLattice[from]?.value || 50;
            const toValue = this.healthLattice[to]?.value || 50;
            const avgHealth = (fromValue + toValue) / 2;
            
            if (connection.element) {
                connection.element.style.opacity = (avgHealth / 100) * 0.6;
                connection.element.style.background = `linear-gradient(90deg, 
                    transparent, 
                    hsl(${avgHealth * 1.2}, 70%, 60%), 
                    transparent)`;
            }
        });
    }

    createAtmosphericParticles() {
        const particles = document.getElementById('particles');
        particles.innerHTML = '';

        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.animationDelay = `${Math.random() * 15}s`;
            particle.style.animationDuration = `${15 + Math.random() * 10}s`;
            
            // Different colors based on wellness state
            const wellnessAvg = Object.values(this.wellness).reduce((a, b) => a + b, 0) / 7;
            particle.style.background = `hsl(${wellnessAvg * 1.5}, 70%, 60%)`;
            
            particles.appendChild(particle);
        }
    }

    setupCustomCursor() {
        const cursor = document.getElementById('customCursor');
        
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = `${e.clientX - 10}px`;
            cursor.style.top = `${e.clientY - 10}px`;
        });

        // Cursor effects based on hover targets
        document.addEventListener('mouseover', (e) => {
            if (e.target.classList.contains('cathedral-hall')) {
                cursor.style.transform = 'scale(1.5)';
                cursor.style.borderColor = '#06b6d4';
            } else {
                cursor.style.transform = 'scale(1)';
                cursor.style.borderColor = '#8b5cf6';
            }
        });
    }

    enterHall(hallType) {
        this.selectedHall = hallType;
        const app = this.apps[hallType];
        
        if (!app) {
            console.warn(`Hall type ${hallType} not found`);
            return;
        }

        // Update wellness based on hall entry
        Object.entries(app.healthImpact || {}).forEach(([dimension, impact]) => {
            this.updateWellnessDimension(dimension, impact);
        });

        // Create immersive entry effect
        this.createHallEntryEffect(hallType);
        
        // Update info panel
        this.updateInfoPanel(hallType);
        
        // Save progress
        this.saveSession();

        console.log(`🚪 Entered ${app.name}`);
    }

    createHallEntryEffect(hallType) {
        const world = document.getElementById('cathedralWorld');
        
        // Create portal effect
        const portal = document.createElement('div');
        portal.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            width: 100px;
            height: 100px;
            background: radial-gradient(circle, rgba(139, 92, 246, 0.8), transparent);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            z-index: 1000;
            pointer-events: none;
            animation: portalExpand 2s ease-out forwards;
        `;
        
        const style = document.createElement('style');
        style.textContent = `
            @keyframes portalExpand {
                0% { width: 100px; height: 100px; opacity: 0.8; }
                50% { width: 500px; height: 500px; opacity: 0.6; }
                100% { width: 2000px; height: 2000px; opacity: 0; }
            }
        `;
        document.head.appendChild(style);
        document.body.appendChild(portal);
        
        setTimeout(() => {
            portal.remove();
            style.remove();
            
            // Launch specific hall application
            this.launchHallApplication(hallType);
        }, 2000);
    }

    launchHallApplication(hallType) {
        const app = this.apps[hallType];
        if (!app) return;

        // Open in new tab or iframe based on type
        if (app.file) {
            // Check if file exists locally
            const appUrl = `./${app.file}`;
            window.open(appUrl, '_blank', 'width=1200,height=800');
        } else {
            // Create inline experience
            this.createInlineHallExperience(hallType);
        }
    }

    createInlineHallExperience(hallType) {
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.95);
            z-index: 2000;
            display: flex;
            align-items: center;
            justify-content: center;
            backdrop-filter: blur(20px);
        `;

        const content = document.createElement('div');
        content.style.cssText = `
            background: linear-gradient(135deg, #1e1b4b, #3730a3);
            border: 2px solid #8b5cf6;
            border-radius: 20px;
            padding: 40px;
            max-width: 800px;
            max-height: 80vh;
            overflow-y: auto;
            color: #e6d3a7;
            text-align: center;
        `;

        const app = this.apps[hallType];
        content.innerHTML = `
            <h2 style="font-size: 2em; margin-bottom: 20px; color: #8b5cf6;">
                ${app.name}
            </h2>
            <p style="font-size: 1.2em; margin-bottom: 30px; line-height: 1.6;">
                ${app.description}
            </p>
            <div style="background: rgba(0, 0, 0, 0.5); padding: 20px; border-radius: 10px; margin-bottom: 20px;">
                <h3>🌟 Experience Preview</h3>
                <p>This hall contains advanced features that will enhance your consciousness journey. 
                Full implementation connects to your complete Cathedral system.</p>
            </div>
            <button onclick="this.closest('.hall-overlay').remove()" 
                    style="background: #8b5cf6; color: white; border: none; padding: 15px 30px; 
                           border-radius: 10px; font-size: 1.1em; cursor: pointer; margin-right: 15px;">
                Continue Exploring
            </button>
            <button onclick="this.closest('.hall-overlay').remove(); cathedralExplorer.launchHallApplication('${hallType}')" 
                    style="background: #06b6d4; color: white; border: none; padding: 15px 30px; 
                           border-radius: 10px; font-size: 1.1em; cursor: pointer;">
                Enter Full Experience
            </button>
        `;

        overlay.className = 'hall-overlay';
        overlay.appendChild(content);
        document.body.appendChild(overlay);
    }

    previewHall(hallType) {
        const app = this.apps[hallType];
        if (!app) return;

        this.updateInfoPanel(hallType, true);
    }

    updateInfoPanel(hallType = null, preview = false) {
        const infoContent = document.getElementById('infoContent');
        
        if (!hallType) {
            infoContent.innerHTML = `
                <h3>🏰 Welcome to the Cathedral of Living Circuits</h3>
                <p>A vast, open world where your creative tools come alive. Move freely through spacious halls, each containing different aspects of your digital consciousness.</p>
                <div style="margin-top: 15px; font-size: 0.9em; opacity: 0.8;">
                    🕸️ Health Lattice: <span style="color: #10b981;">${this.getOverallWellness()}% connected</span><br>
                    ⚗️ Active Fusions: ${this.fusionProjects.activeProjects.length}<br>
                    🎵 Synth Stations: ${this.synthStations.filter(s => s.active).length}/10 active
                </div>
            `;
            return;
        }

        const app = this.apps[hallType];
        const actionText = preview ? 'Preview' : 'Entered';
        
        infoContent.innerHTML = `
            <h3>🚪 ${actionText}: ${app.name}</h3>
            <p>${app.description}</p>
            <div style="margin-top: 15px;">
                <strong>🌟 Wellness Impact:</strong><br>
                ${Object.entries(app.healthImpact || {}).map(([dim, impact]) => 
                    `<span style="color: ${impact > 0 ? '#10b981' : '#f87171'};">
                        ${dim}: ${impact > 0 ? '+' : ''}${impact}
                    </span>`
                ).join(' • ')}
            </div>
            ${app.traumaSafe ? '<div style="margin-top: 10px; color: #10b981;">✅ Trauma-Safe Design</div>' : ''}
            ${app.breathingGuide ? '<div style="color: #06b6d4;">🫁 Breathing Guide Available</div>' : ''}
        `;
    }

    updateWellnessDimension(dimension, change) {
        if (this.wellness[dimension] !== undefined) {
            this.wellness[dimension] = Math.max(0, Math.min(100, this.wellness[dimension] + change));
            this.healthLattice[dimension].value = this.wellness[dimension];
            this.healthLattice[dimension].lastUpdate = Date.now();
            
            // Trigger lattice update
            this.updateLatticeVisualization();
            
            // Log significant changes
            if (Math.abs(change) > 5) {
                this.creativeMoments.push({
                    timestamp: Date.now(),
                    dimension,
                    change,
                    context: this.selectedHall || 'exploration'
                });
            }
        }
    }

    updateHealthFromMovement(mouseX, mouseY) {
        // Gentle wellness updates from exploration
        const movementIntensity = Math.abs(mouseX) + Math.abs(mouseY);
        
        if (movementIntensity > 0.1) {
            this.updateWellnessDimension('flow', 0.1);
            
            // Different areas of screen affect different dimensions
            if (mouseX > 0.3) this.updateWellnessDimension('creativity', 0.05);
            if (mouseX < -0.3) this.updateWellnessDimension('wisdom', 0.05);
            if (mouseY > 0.3) this.updateWellnessDimension('balance', 0.05);
            if (mouseY < -0.3) this.updateWellnessDimension('intuition', 0.05);
        }
    }

    triggerWellnessUpdate(dimension, amount) {
        this.updateWellnessDimension(dimension, amount);
        
        // Visual feedback
        this.createWellnessFlash(dimension);
    }

    createWellnessFlash(dimension) {
        const flash = document.createElement('div');
        flash.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            width: 100px;
            height: 100px;
            background: radial-gradient(circle, rgba(16, 185, 129, 0.6), transparent);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            z-index: 500;
            pointer-events: none;
            animation: wellnessFlash 1s ease-out forwards;
        `;
        
        document.body.appendChild(flash);
        setTimeout(() => flash.remove(), 1000);
    }

    startHealthMonitoring() {
        setInterval(() => {
            this.updateLatticeVisualization();
            this.checkHealthConnections();
            this.saveSession();
        }, 5000);
    }

    checkHealthConnections() {
        // Identify strong and weak connections in the health lattice
        this.activeConnections.forEach((connection, key) => {
            const [from, to] = key.split('-');
            const fromValue = this.healthLattice[from]?.value || 50;
            const toValue = this.healthLattice[to]?.value || 50;
            
            // Strengthen connections when both dimensions are high
            if (fromValue > 80 && toValue > 80) {
                connection.strength = Math.min(1.0, connection.strength + 0.01);
            }
            
            // Weaken connections when dimensions are imbalanced
            if (Math.abs(fromValue - toValue) > 30) {
                connection.strength = Math.max(0.1, connection.strength - 0.005);
            }
        });
    }

    getOverallWellness() {
        const total = Object.values(this.wellness).reduce((a, b) => a + b, 0);
        return Math.round(total / 7);
    }

    saveSession() {
        this.sessionMemory = {
            playerPosition: this.playerPosition,
            wellness: this.wellness,
            healthLattice: this.healthLattice,
            selectedHall: this.selectedHall,
            creativeMoments: this.creativeMoments.slice(-50), // Keep last 50
            lastActive: Date.now(),
            fusionProjects: this.fusionProjects
        };
        
        localStorage.setItem('cathedralExplorerSession', JSON.stringify(this.sessionMemory));
    }

    loadSavedProgress() {
        if (this.sessionMemory.wellness) {
            this.wellness = { ...this.wellness, ...this.sessionMemory.wellness };
        }
        
        if (this.sessionMemory.healthLattice) {
            this.healthLattice = { ...this.healthLattice, ...this.sessionMemory.healthLattice };
        }
        
        if (this.sessionMemory.creativeMoments) {
            this.creativeMoments = this.sessionMemory.creativeMoments;
        }
        
        if (this.sessionMemory.fusionProjects) {
            this.fusionProjects = { ...this.fusionProjects, ...this.sessionMemory.fusionProjects };
        }
    }

    updatePlayerPosition() {
        const cathedralSpace = document.getElementById('cathedralSpace');
        cathedralSpace.style.transform += ` translate3d(${this.playerPosition.x}px, ${this.playerPosition.y}px, ${this.playerPosition.z}px)`;
    }

    // Fusion Project System
    createFusionProject(tools, name) {
        const project = {
            id: Date.now().toString(),
            name: name || `Fusion-${Date.now()}`,
            tools,
            created: new Date().toISOString(),
            status: 'active',
            outputs: []
        };
        
        this.fusionProjects.activeProjects.push(project);
        this.updateWellnessDimension('transformation', 10);
        this.updateWellnessDimension('creativity', 8);
        
        console.log('⚗️ Created fusion project:', project);
        return project;
    }

    // Export functions for global access
    getSystemStatus() {
        return {
            wellness: this.wellness,
            overallHealth: this.getOverallWellness(),
            activeConnections: this.activeConnections.size,
            fusionProjects: this.fusionProjects.activeProjects.length,
            creativeMoments: this.creativeMoments.length
        };
    }
}

// Global functions for HTML interaction
function enterFullscreen() {
    if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
    }
}

function toggleHealthLattice() {
    const lattice = document.getElementById('healthLattice');
    lattice.style.opacity = lattice.style.opacity === '0.5' ? '0.2' : '0.5';
}

function createFusionProject() {
    const name = prompt('Name your fusion project:');
    if (name && window.cathedralExplorer) {
        window.cathedralExplorer.createFusionProject(['art', 'music'], name);
    }
}

function exportSessionData() {
    if (window.cathedralExplorer) {
        const data = window.cathedralExplorer.getSystemStatus();
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'cathedral-session-data.json';
        a.click();
    }
}

// Initialize when DOM loaded
document.addEventListener('DOMContentLoaded', () => {
    window.cathedralExplorer = new CathedralOpenWorldEngine();
    
    // Add breathing animation to show the system is alive
    const addBreathingStyle = () => {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes wellnessFlash {
                0% { transform: translate(-50%, -50%) scale(1); opacity: 0.6; }
                50% { transform: translate(-50%, -50%) scale(1.5); opacity: 0.8; }
                100% { transform: translate(-50%, -50%) scale(2); opacity: 0; }
            }
            
            .cathedral-hall {
                animation: gentleBreathing 4s ease-in-out infinite;
            }
            
            @keyframes gentleBreathing {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.02); }
            }
            
            .health-lattice .lattice-connection {
                animation: pulse-connection 3s ease-in-out infinite;
            }
        `;
        document.head.appendChild(style);
    };
    
    addBreathingStyle();
    
    console.log('🏛️✨ Cathedral Open World Explorer ready');
    console.log('🕸️ Health Lattice Web monitoring your creative consciousness');
    console.log('⚗️ Fusion Laboratory awaiting your projects');
    console.log('🎮 Navigate with mouse movement, WASD keys, or scroll to zoom');
});