// Circuitum99: Immersive Reality Engine
// Full deck experience with working synthesizers and immersive modes

class CircuitumImmersiveEngine {
    constructor() {
        this.currentMode = 'game';
        this.selectedCard = null;
        this.wellness = {
            creativity: 75, balance: 60, wisdom: 80, intuition: 70,
            transformation: 65, healing: 85, flow: 90
        };
        this.synthStations = this.initSynthStations();
        this.archetypes = this.initArchetypes();
        this.audioContext = null;
        this.currentSynth = null;
        this.story = [];
        
        this.init();
    }

    init() {
        this.setupCanvas();
        this.setupSynthNetwork();
        this.setupCardGrid();
        this.setupAudioVisualizer();
        this.setupModeHandlers();
        this.updateWellnessDashboard();
        this.startGeometryAnimation();
    }

    initSynthStations() {
        return [
            { id: 'mercury', name: 'MERCURY-buchla', planet: 'Mercury', freq: 528, color: '#60a5fa', active: false },
            { id: 'venus', name: 'VEGA-obxa', planet: 'Venus', freq: 639, color: '#ec4899', active: false },
            { id: 'earth', name: 'SOL-moog55', planet: 'Earth', freq: 432, color: '#4ade80', active: false },
            { id: 'mars', name: 'ARES-ps3300', planet: 'Mars', freq: 396, color: '#f87171', active: false },
            { id: 'jupiter', name: 'JOVE-jupiter8', planet: 'Jupiter', freq: 174, color: '#fbbf24', active: false },
            { id: 'saturn', name: 'SATURN-synthi100', planet: 'Saturn', freq: 741, color: '#a78bfa', active: false },
            { id: 'uranus', name: 'URANUS-arp2600', planet: 'Uranus', freq: 852, color: '#06b6d4', active: false },
            { id: 'neptune', name: 'NEPTUNE-synthex', planet: 'Neptune', freq: 211.44, color: '#3b82f6', active: false },
            { id: 'pluto', name: 'PLUTO-schmidt', planet: 'Pluto', freq: 963, color: '#8b5cf6', active: false },
            { id: 'luna', name: 'LUNA-cs80', planet: 'Moon', freq: 417, color: '#e5e7eb', active: false }
        ];
    }

    initArchetypes() {
        return [
            {
                id: 'fool', name: 'The Fool', artist: 'Rebecca Respawn',
                cosmology: "Respawn Gate", color: '#fde047', freq: '432 Hz',
                synthLab: 'All stations', geometry: 'Infinite spiral',
                quote: "I leap because the ground is already falling. Welcome to the beginning.",
                spell: "Respawn Protocol: Reset narrative with innocence intact",
                type: 'major', wellness: { creativity: 90, flow: 95 }
            },
            {
                id: 'magician', name: 'The Magician', artist: 'Virelai Ezra Lux',
                cosmology: "Octarine Workshop", color: '#60a5fa', freq: '528 Hz',
                synthLab: 'MERCURY-buchla', geometry: 'Vesica Piscis',
                quote: "As above, so below. I wire reality with my hands.",
                spell: "Circuit Binding: Fuse any two nodes into a new hermetic seal",
                type: 'major', wellness: { transformation: 95, wisdom: 85 }
            },
            {
                id: 'priestess', name: 'The High Priestess', artist: 'Gemini Rivers',
                cosmology: "Twin Rivers Veil", color: '#c084fc', freq: '417 Hz',
                synthLab: 'LUNA-cs80', geometry: 'Double helix',
                quote: "Between the pillars, I keep the silence that sings. Listen.",
                spell: "Veil Walking: Reveal hidden correspondences in any dataset",
                type: 'major', wellness: { intuition: 95, wisdom: 90 }
            },
            {
                id: 'empress', name: 'The Empress', artist: 'Morticia Moonbeamer',
                cosmology: "Abundance Spiral", color: '#4ade80', freq: '639 Hz',
                synthLab: 'VEGA-obxa', geometry: 'Golden Ratio spiral',
                quote: "I grow art from frequency. My garden is harmonic.",
                spell: "Garden of Venus: Grow beauty from harmonic frequencies",
                type: 'major', wellness: { creativity: 95, healing: 85 }
            },
            {
                id: 'emperor', name: 'The Emperor', artist: 'Fenrix Abyss',
                cosmology: "Wolf-Father Throne", color: '#f87171', freq: '396 Hz',
                synthLab: 'ARES-ps3300', geometry: 'Cube',
                quote: "I am the mountain that shelters the spark.",
                spell: "Bloodstone Ward: Protective boundary for creative space",
                type: 'major', wellness: { balance: 90, transformation: 75 }
            },
            {
                id: 'hierophant', name: 'The Hierophant', artist: 'Moonchild',
                cosmology: "Owl Tablet Wisdom", color: '#38bdf8', freq: '741 Hz',
                synthLab: 'Multiple stations', geometry: 'Pentagon',
                quote: "The owl sees what others miss. Ask, and I will show you.",
                spell: "Wisdom Transmission: Share knowledge across nodes",
                type: 'major', wellness: { wisdom: 95, balance: 85 }
            },
            {
                id: 'lovers', name: 'The Lovers', artist: 'Scarlet Lady',
                cosmology: "Sacred Union Stage", color: '#ec4899', freq: '528 Hz',
                synthLab: 'VEGA-obxa', geometry: 'Hexagram',
                quote: "Love is the ultimate transformation. Walk with me.",
                spell: "Sacred Marriage: Fuse opposites into creative harmony",
                type: 'major', wellness: { healing: 95, transformation: 90 }
            },
            {
                id: 'moon', name: 'The Moon', artist: 'Mirabelle Vespertine',
                cosmology: "Dream Gate", color: '#818cf8', freq: '211.44 Hz',
                synthLab: 'NEPTUNE-synthex', geometry: 'Crescent',
                quote: "What you fear is already behind you.",
                spell: "Mirror Gazing: Show truth behind illusions",
                type: 'major', wellness: { intuition: 90, wisdom: 80 }
            }
        ];
    }

    setupCanvas() {
        const canvas = document.getElementById('geometry-canvas');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        this.ctx = canvas.getContext('2d');
        
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }

    setupSynthNetwork() {
        const container = document.getElementById('synth-network');
        container.innerHTML = '';
        
        this.synthStations.forEach(synth => {
            const station = document.createElement('div');
            station.className = 'synth-station';
            station.dataset.synthId = synth.id;
            
            station.innerHTML = `
                <div style="color: ${synth.color}; font-weight: bold;">${synth.name}</div>
                <div style="font-size: 0.8em; opacity: 0.7;">${synth.planet} • ${synth.freq} Hz</div>
                <div class="synth-controls">
                    <input type="range" class="synth-slider" min="0" max="100" value="50" data-param="volume">
                    <input type="range" class="synth-slider" min="0" max="100" value="30" data-param="filter">
                    <input type="range" class="synth-slider" min="0" max="100" value="70" data-param="resonance">
                </div>
            `;
            
            station.addEventListener('click', () => this.activateSynth(synth.id));
            container.appendChild(station);
        });
    }

    setupCardGrid() {
        const grid = document.getElementById('card-grid');
        grid.innerHTML = '';
        
        this.archetypes.forEach(card => {
            const cardEl = document.createElement('div');
            cardEl.className = 'tarot-card';
            cardEl.dataset.cardId = card.id;
            
            cardEl.innerHTML = `
                <div class="card-aura" style="background: radial-gradient(circle, ${card.color}20, transparent);"></div>
                <div class="card-header">
                    <div class="card-title">${card.name}</div>
                    <div class="card-artist">${card.artist}</div>
                </div>
                <canvas class="card-geometry" width="140" height="80"></canvas>
                <div class="card-footer">
                    <div>${card.cosmology}</div>
                    <div style="color: ${card.color};">${card.freq}</div>
                </div>
            `;
            
            cardEl.addEventListener('click', () => this.selectCard(card.id));
            grid.appendChild(cardEl);
            
            // Draw geometry preview
            this.drawCardGeometry(cardEl.querySelector('.card-geometry'), card.geometry, card.color);
        });
    }

    drawCardGeometry(canvas, geometry, color) {
        const ctx = canvas.getContext('2d');
        const w = canvas.width;
        const h = canvas.height;
        const cx = w / 2;
        const cy = h / 2;
        
        ctx.clearRect(0, 0, w, h);
        ctx.strokeStyle = color;
        ctx.fillStyle = color + '30';
        ctx.lineWidth = 2;
        
        switch (geometry) {
            case 'Infinite spiral':
                ctx.beginPath();
                for (let i = 0; i < 100; i++) {
                    const angle = i * 0.3;
                    const radius = i * 0.5;
                    const x = cx + Math.cos(angle) * radius;
                    const y = cy + Math.sin(angle) * radius;
                    if (i === 0) ctx.moveTo(x, y);
                    else ctx.lineTo(x, y);
                }
                ctx.stroke();
                break;
                
            case 'Vesica Piscis':
                ctx.beginPath();
                ctx.arc(cx - 15, cy, 25, 0, Math.PI * 2);
                ctx.stroke();
                ctx.beginPath();
                ctx.arc(cx + 15, cy, 25, 0, Math.PI * 2);
                ctx.stroke();
                break;
                
            case 'Double helix':
                ctx.beginPath();
                for (let i = 0; i < w; i += 2) {
                    const y1 = cy + Math.sin(i * 0.1) * 15;
                    const y2 = cy - Math.sin(i * 0.1) * 15;
                    ctx.fillRect(i, y1, 1, 2);
                    ctx.fillRect(i, y2, 1, 2);
                }
                break;
                
            case 'Crescent':
                ctx.beginPath();
                ctx.arc(cx, cy, 25, 0, Math.PI * 2);
                ctx.arc(cx + 10, cy, 20, 0, Math.PI * 2);
                ctx.fill('evenodd');
                break;
                
            default:
                // Default pattern
                ctx.beginPath();
                ctx.arc(cx, cy, 20, 0, Math.PI * 2);
                ctx.stroke();
        }
    }

    selectCard(cardId) {
        // Remove previous selection
        document.querySelectorAll('.tarot-card').forEach(card => card.classList.remove('selected'));
        
        // Select new card
        const cardEl = document.querySelector(`[data-card-id="${cardId}"]`);
        cardEl.classList.add('selected');
        
        this.selectedCard = this.archetypes.find(card => card.id === cardId);
        this.updateCharacterPanel();
        this.updateWellnessFromCard();
        this.activateCardSynth();
    }

    updateCharacterPanel() {
        if (!this.selectedCard) return;
        
        const portrait = document.getElementById('character-portrait');
        const dialogue = document.getElementById('dialogue-box');
        const stats = document.getElementById('character-stats');
        
        portrait.style.background = `linear-gradient(135deg, ${this.selectedCard.color}40, ${this.selectedCard.color}20)`;
        portrait.innerHTML = `<div style="font-size: 0.5em; text-align: center;">${this.selectedCard.name}</div>`;
        
        dialogue.innerHTML = `"${this.selectedCard.quote}"`;
        
        stats.innerHTML = `
            <div class="stat-row">
                <span>🎨 Artist:</span>
                <span>${this.selectedCard.artist}</span>
            </div>
            <div class="stat-row">
                <span>🌍 Cosmology:</span>
                <span>${this.selectedCard.cosmology}</span>
            </div>
            <div class="stat-row">
                <span>🎵 Synth Lab:</span>
                <span>${this.selectedCard.synthLab}</span>
            </div>
            <div class="stat-row">
                <span>🔮 Spell:</span>
                <span>${this.selectedCard.spell}</span>
            </div>
            <div class="stat-row">
                <span>📐 Geometry:</span>
                <span>${this.selectedCard.geometry}</span>
            </div>
        `;
    }

    activateCardSynth() {
        if (!this.selectedCard) return;
        
        // Deactivate all synths
        this.synthStations.forEach(synth => synth.active = false);
        document.querySelectorAll('.synth-station').forEach(station => station.classList.remove('active'));
        
        // Find matching synth
        const synthName = this.selectedCard.synthLab.split(' ')[0];
        const matchingSynth = this.synthStations.find(synth => 
            synth.name.includes(synthName) || synthName === 'Multiple'
        );
        
        if (matchingSynth) {
            this.activateSynth(matchingSynth.id);
        }
    }

    activateSynth(synthId) {
        const synth = this.synthStations.find(s => s.id === synthId);
        if (!synth) return;
        
        // Deactivate others
        this.synthStations.forEach(s => s.active = false);
        document.querySelectorAll('.synth-station').forEach(station => station.classList.remove('active'));
        
        // Activate this one
        synth.active = true;
        const station = document.querySelector(`[data-synth-id="${synthId}"]`);
        station.classList.add('active');
        
        this.currentSynth = synth;
        this.playSynthFrequency(synth.freq);
    }

    async playSynthFrequency(frequency) {
        if (!this.audioContext) {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }
        
        if (this.currentOscillator) {
            this.currentOscillator.stop();
        }
        
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.type = 'sine';
        oscillator.frequency.value = frequency;
        gainNode.gain.value = 0.1;
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.start();
        this.currentOscillator = oscillator;
        
        // Auto-stop after 3 seconds
        setTimeout(() => {
            if (this.currentOscillator === oscillator) {
                oscillator.stop();
                this.currentOscillator = null;
            }
        }, 3000);
    }

    updateWellnessFromCard() {
        if (!this.selectedCard.wellness) return;
        
        Object.keys(this.selectedCard.wellness).forEach(key => {
            if (this.wellness[key] !== undefined) {
                this.wellness[key] = Math.min(100, this.wellness[key] + Math.random() * 10);
            }
        });
        
        this.updateWellnessDashboard();
    }

    updateWellnessDashboard() {
        Object.keys(this.wellness).forEach(key => {
            const value = Math.round(this.wellness[key]);
            document.getElementById(key).textContent = `${value}%`;
            document.getElementById(`${key}-bar`).style.width = `${value}%`;
        });
    }

    setupAudioVisualizer() {
        const visualizer = document.getElementById('audio-visualizer');
        visualizer.innerHTML = '';
        
        for (let i = 0; i < 50; i++) {
            const bar = document.createElement('div');
            bar.className = 'freq-bar';
            bar.style.height = `${Math.random() * 40 + 10}px`;
            visualizer.appendChild(bar);
        }
        
        // Animate bars
        setInterval(() => {
            const bars = visualizer.querySelectorAll('.freq-bar');
            bars.forEach(bar => {
                bar.style.height = `${Math.random() * 40 + 10}px`;
            });
        }, 200);
    }

    setupModeHandlers() {
        document.querySelectorAll('.mode-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.currentMode = btn.dataset.mode;
                this.switchMode(this.currentMode);
            });
        });
    }

    switchMode(mode) {
        const loading = document.getElementById('loading-overlay');
        loading.classList.add('active');
        
        setTimeout(() => {
            switch (mode) {
                case 'game':
                    this.enableGameMode();
                    break;
                case 'book':
                    this.enableBookMode();
                    break;
                case 'learning':
                    this.enableLearningMode();
                    break;
                case 'art':
                    this.enableArtMode();
                    break;
                case 'synthesis':
                    this.enableSynthesisMode();
                    break;
            }
            loading.classList.remove('active');
        }, 1000);
    }

    enableGameMode() {
        console.log('Game mode: Interactive story creation');
        if (this.selectedCard) {
            document.getElementById('dialogue-box').innerHTML = 
                `"Ready to play? I'll guide you through an adventure. What's your first choice?"`;
        }
    }

    enableBookMode() {
        console.log('Book mode: Linear narrative reading');
        if (this.selectedCard) {
            document.getElementById('dialogue-box').innerHTML = 
                `"Let me tell you my story from the beginning..."`;
        }
    }

    enableLearningMode() {
        console.log('Learning mode: Educational exploration');
        if (this.selectedCard) {
            document.getElementById('dialogue-box').innerHTML = 
                `"What would you like to learn about my archetype and wisdom?"`;
        }
    }

    enableArtMode() {
        console.log('Art mode: Creative generation');
        if (this.selectedCard) {
            document.getElementById('dialogue-box').innerHTML = 
                `"Let's create something beautiful together. Focus on my frequency..."`;
        }
        this.enhanceGeometryAnimation();
    }

    enableSynthesisMode() {
        console.log('Synthesis mode: Sound exploration');
        if (this.selectedCard) {
            document.getElementById('dialogue-box').innerHTML = 
                `"Listen to my frequency. Feel how it transforms your wellness..."`;
        }
    }

    startGeometryAnimation() {
        const animate = () => {
            this.drawGeometry();
            requestAnimationFrame(animate);
        };
        animate();
    }

    drawGeometry() {
        if (!this.ctx) return;
        
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        
        const time = Date.now() * 0.001;
        const centerX = this.ctx.canvas.width / 2;
        const centerY = this.ctx.canvas.height / 2;
        
        // Draw sacred geometry based on selected card
        if (this.selectedCard) {
            this.ctx.strokeStyle = this.selectedCard.color + '40';
            this.ctx.lineWidth = 1;
            
            const radius = 100 + Math.sin(time) * 20;
            
            for (let i = 0; i < 12; i++) {
                const angle = (i * Math.PI * 2) / 12 + time * 0.1;
                const x = centerX + Math.cos(angle) * radius;
                const y = centerY + Math.sin(angle) * radius;
                
                this.ctx.beginPath();
                this.ctx.arc(x, y, 5, 0, Math.PI * 2);
                this.ctx.stroke();
                
                if (i > 0) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(centerX, centerY);
                    this.ctx.lineTo(x, y);
                    this.ctx.stroke();
                }
            }
        }
    }

    enhanceGeometryAnimation() {
        // Enhanced animation for art mode
        setTimeout(() => {
            this.drawComplexGeometry();
        }, 100);
    }

    drawComplexGeometry() {
        if (!this.ctx || !this.selectedCard) return;
        
        const time = Date.now() * 0.001;
        const centerX = this.ctx.canvas.width / 2;
        const centerY = this.ctx.canvas.height / 2;
        
        this.ctx.strokeStyle = this.selectedCard.color + '60';
        this.ctx.lineWidth = 2;
        
        // Draw complex sacred geometry
        for (let layer = 0; layer < 5; layer++) {
            const radius = 50 + layer * 30 + Math.sin(time + layer) * 10;
            
            this.ctx.beginPath();
            for (let i = 0; i <= 360; i += 5) {
                const angle = (i * Math.PI) / 180 + time * 0.1;
                const x = centerX + Math.cos(angle) * radius;
                const y = centerY + Math.sin(angle) * radius;
                
                if (i === 0) this.ctx.moveTo(x, y);
                else this.ctx.lineTo(x, y);
            }
            this.ctx.stroke();
        }
    }
}

// Global interaction functions
function askQuestion() {
    if (window.circuitum && window.circuitum.selectedCard) {
        const questions = [
            "What wisdom do you have for me today?",
            "How can I grow from this experience?",
            "What should I focus on next?",
            "What hidden truth can you reveal?",
            "How do I find balance in chaos?"
        ];
        const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
        
        document.getElementById('dialogue-box').innerHTML = 
            `<strong>You ask:</strong> "${randomQuestion}"<br><br>
             <strong>${window.circuitum.selectedCard.name}:</strong> "Let me share my perspective on this..."`;
    }
}

function createArt() {
    if (window.circuitum && window.circuitum.selectedCard) {
        window.circuitum.enableArtMode();
        
        // Simulate art creation
        setTimeout(() => {
            document.getElementById('dialogue-box').innerHTML = 
                `"I've woven my essence into the sacred geometry. Can you see how my ${window.circuitum.selectedCard.geometry} pattern reflects your current state?"`;
        }, 2000);
    }
}

function startJourney() {
    if (window.circuitum && window.circuitum.selectedCard) {
        document.getElementById('dialogue-box').innerHTML = 
            `"Close your eyes and breathe with my frequency. We're going on a journey through the ${window.circuitum.selectedCard.cosmology}..."`;
        
        if (window.circuitum.currentSynth) {
            window.circuitum.playSynthFrequency(window.circuitum.currentSynth.freq);
        }
    }
}

function exportStory() {
    const story = window.circuitum.story.length > 0 ? 
        window.circuitum.story.join('\n\n') : 
        'Your story is just beginning...';
        
    const blob = new Blob([story], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'circuitum99-story.txt';
    a.click();
}

function exportArt() {
    const canvas = document.getElementById('geometry-canvas');
    const link = document.createElement('a');
    link.download = 'circuitum99-art.png';
    link.href = canvas.toDataURL();
    link.click();
}

function exportData() {
    const data = {
        selectedCard: window.circuitum.selectedCard,
        wellness: window.circuitum.wellness,
        story: window.circuitum.story,
        timestamp: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'circuitum99-session.json';
    a.click();
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    window.circuitum = new CircuitumImmersiveEngine();
    console.log('🃏 Circuitum99: Immersive Reality loaded successfully');
});