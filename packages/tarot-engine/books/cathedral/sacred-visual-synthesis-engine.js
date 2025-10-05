/**
 * 🎨 SACRED VISUAL SYNTHESIS ENGINE
 * 
 * Auto-generates artwork according to Codex 144:99 node mathematics
 * and archetypal resonance patterns. Each oracle card receives
 * algorithmically perfect visual representation based on:
 * - Sacred geometry (phi ratios, hexagrams, chakra geometry)
 * - Harmonic color frequencies mapped to healing frequencies
 * - Elemental symbolism (Fire/Water/Air/Earth)
 * - Archetypal iconography from historical visionary
 * 
 * @system Cathedral of Circuits Sacred Art Generator
 * @author Rebecca Respawn
 * @trauma_safety All generated art follows trauma-informed design principles
 */

class SacredVisualSynthesisEngine {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.goldenRatio = 1.618033988749;
        this.sacredNumbers = this.initializeSacredMathematics();
        this.colorFrequencyMap = this.initializeColorFrequencies();
        this.elementalSymbols = this.initializeElementalGeometry();
        this.chakraGeometry = this.initializeChakraPatterns();
        
        console.log('🎨 Sacred Visual Synthesis Engine initialized');
        console.log('📐 Golden Ratio:', this.goldenRatio);
        console.log('🌈 Color frequencies mapped to healing tones');
    }
    
    initializeSacredMathematics() {
        return {
            phi: 1.618033988749,
            pi: Math.PI,
            sqrt2: Math.sqrt(2),
            sqrt3: Math.sqrt(3),
            sqrt5: Math.sqrt(5),
            fibonacci: [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144],
            pentagram: Math.PI * 2 / 5,
            hexagram: Math.PI * 2 / 6,
            septagram: Math.PI * 2 / 7,
            octagram: Math.PI * 2 / 8
        };
    }
    
    initializeColorFrequencies() {
        // Maps healing frequencies to RGB colors using sacred mathematics
        return {
            '396Hz': { r: 140, g: 26, b: 26, chakra: 'root', element: 'earth' },      // Liberation Red
            '417Hz': { r: 255, g: 106, b: 0, chakra: 'sacral', element: 'fire' },    // Creative Orange  
            '528Hz': { r: 255, g: 215, b: 0, chakra: 'solar', element: 'fire' },     // Miracle Gold
            '639Hz': { r: 0, g: 128, b: 0, chakra: 'heart', element: 'water' },      // Love Green
            '741Hz': { r: 75, g: 181, b: 217, chakra: 'throat', element: 'air' },    // Truth Blue
            '852Hz': { r: 122, g: 51, b: 255, chakra: 'third_eye', element: 'air' }, // Intuition Violet
            '963Hz': { r: 255, g: 255, b: 255, chakra: 'crown', element: 'spirit' }  // Unity White
        };
    }
    
    initializeElementalGeometry() {
        return {
            fire: {
                baseShape: 'triangle',
                direction: 'upward',
                patterns: ['flame', 'solar_rays', 'phoenix'],
                colors: ['#FF6A00', '#FF0000', '#FFD700'],
                sacred_ratio: this.goldenRatio
            },
            water: {
                baseShape: 'triangle', 
                direction: 'downward',
                patterns: ['wave', 'chalice', 'lotus'],
                colors: ['#0080FF', '#800080', '#FFB6C1'],
                sacred_ratio: this.goldenRatio
            },
            air: {
                baseShape: 'circle',
                direction: 'spiral',
                patterns: ['feather', 'sword', 'star'],
                colors: ['#4169E1', '#87CEEB', '#F0F8FF'],
                sacred_ratio: this.goldenRatio
            },
            earth: {
                baseShape: 'square',
                direction: 'grounded',
                patterns: ['mountain', 'tree', 'crystal'],
                colors: ['#8B4513', '#228B22', '#006400'],
                sacred_ratio: this.goldenRatio
            }
        };
    }
    
    initializeChakraPatterns() {
        return {
            root: { petals: 4, color: '#8B0000', geometry: 'square', frequency: '396Hz' },
            sacral: { petals: 6, color: '#FF6A00', geometry: 'hexagon', frequency: '417Hz' },
            solar: { petals: 10, color: '#FFD700', geometry: 'decagon', frequency: '528Hz' },
            heart: { petals: 12, color: '#008000', geometry: 'dodecagon', frequency: '639Hz' },
            throat: { petals: 16, color: '#4169E1', geometry: 'hexadecagon', frequency: '741Hz' },
            third_eye: { petals: 2, color: '#7A33FF', geometry: 'vesica_piscis', frequency: '852Hz' },
            crown: { petals: 1000, color: '#FFFFFF', geometry: 'infinite_lotus', frequency: '963Hz' }
        };
    }
    
    async generateOracleCardArt(cardData, dimensions = { width: 400, height: 600 }) {
        // Main function to generate complete oracle card artwork
        console.log(`🎨 Generating sacred art for ${cardData.visionary_anchor}`);
        
        this.setupCanvas(dimensions);
        
        // Extract archetypal properties
        const element = this.extractElement(cardData);
        const chakra = this.extractChakra(cardData.chakra);
        const frequency = cardData.healing_frequency;
        const phiRatio = cardData.phi_ratio || this.goldenRatio;
        const codexNode = cardData.codex_node || 1;
        
        // Generate layered composition
        await this.generateBackground(element, frequency, dimensions);
        await this.generateSacredGeometry(codexNode, phiRatio, chakra, dimensions);
        await this.generateElementalSymbols(element, cardData, dimensions);
        await this.generateArchetypalIconography(cardData, dimensions);
        await this.generateHarmonicOverlay(frequency, dimensions);
        await this.generateTraumaSafeFrame(dimensions);
        
        return this.canvas.toDataURL('image/png');
    }
    
    setupCanvas(dimensions) {
        if (!this.canvas) {
            this.canvas = document.createElement('canvas');
            this.ctx = this.canvas.getContext('2d');
        }
        
        this.canvas.width = dimensions.width;
        this.canvas.height = dimensions.height;
        
        // Enable high-DPI rendering
        const dpr = window.devicePixelRatio || 1;
        this.canvas.style.width = dimensions.width + 'px';
        this.canvas.style.height = dimensions.height + 'px';
        this.canvas.width = dimensions.width * dpr;
        this.canvas.height = dimensions.height * dpr;
        this.ctx.scale(dpr, dpr);
    }
    
    async generateBackground(element, frequency, dimensions) {
        const colorData = this.colorFrequencyMap[frequency];
        const elementData = this.elementalSymbols[element];
        
        // Create gradient based on elemental energy and healing frequency
        const gradient = this.ctx.createRadialGradient(
            dimensions.width / 2, dimensions.height / 2, 0,
            dimensions.width / 2, dimensions.height / 2, dimensions.width / 2
        );
        
        const primaryColor = `rgba(${colorData.r}, ${colorData.g}, ${colorData.b}, 0.8)`;
        const secondaryColor = elementData.colors[0] + '40'; // 25% opacity
        
        gradient.addColorStop(0, primaryColor);
        gradient.addColorStop(1, secondaryColor);
        
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, dimensions.width, dimensions.height);
        
        // Add subtle texture pattern
        await this.addSacredTexture(element, dimensions);
    }
    
    async generateSacredGeometry(codexNode, phiRatio, chakra, dimensions) {
        const centerX = dimensions.width / 2;
        const centerY = dimensions.height / 2;
        const baseRadius = Math.min(dimensions.width, dimensions.height) * 0.3;
        
        // Generate geometry based on codex node number
        const geometryType = this.getGeometryFromCodexNode(codexNode);
        
        this.ctx.save();
        this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
        this.ctx.lineWidth = 2;
        
        switch (geometryType) {
            case 'flower_of_life':
                await this.drawFlowerOfLife(centerX, centerY, baseRadius * phiRatio);
                break;
            case 'metatrons_cube':
                await this.drawMetatronsCube(centerX, centerY, baseRadius * phiRatio);
                break;
            case 'sri_yantra':
                await this.drawSriYantra(centerX, centerY, baseRadius * phiRatio);
                break;
            case 'golden_spiral':
                await this.drawGoldenSpiral(centerX, centerY, baseRadius * phiRatio);
                break;
            case 'vesica_piscis':
                await this.drawVesicaPiscis(centerX, centerY, baseRadius * phiRatio);
                break;
            default:
                await this.drawChakraGeometry(centerX, centerY, baseRadius * phiRatio, chakra);
        }
        
        this.ctx.restore();
    }
    
    async generateElementalSymbols(element, cardData, dimensions) {
        const elementData = this.elementalSymbols[element];
        const centerX = dimensions.width / 2;
        const centerY = dimensions.height * 0.75; // Lower third
        const symbolSize = Math.min(dimensions.width, dimensions.height) * 0.15;
        
        this.ctx.save();
        this.ctx.fillStyle = elementData.colors[0];
        this.ctx.strokeStyle = elementData.colors[1] || elementData.colors[0];
        this.ctx.lineWidth = 3;
        
        switch (element) {
            case 'fire':
                await this.drawFireTriangle(centerX, centerY, symbolSize);
                break;
            case 'water':
                await this.drawWaterTriangle(centerX, centerY, symbolSize);
                break;
            case 'air':
                await this.drawAirCircle(centerX, centerY, symbolSize);
                break;
            case 'earth':
                await this.drawEarthSquare(centerX, centerY, symbolSize);
                break;
        }
        
        this.ctx.restore();
    }
    
    async generateArchetypalIconography(cardData, dimensions) {
        // Generate symbols specific to the visionary
        const iconography = this.getArchetypalIconography(cardData.visionary_anchor);
        const centerX = dimensions.width / 2;
        const centerY = dimensions.height * 0.25; // Upper third
        
        this.ctx.save();
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        this.ctx.font = `${dimensions.width * 0.08}px serif`;
        this.ctx.textAlign = 'center';
        
        // Draw visionary's symbolic representation
        if (iconography.symbol) {
            this.ctx.fillText(iconography.symbol, centerX, centerY);
        }
        
        // Add secondary symbols
        if (iconography.tools) {
            iconography.tools.forEach((tool, index) => {
                const angle = (Math.PI * 2 / iconography.tools.length) * index;
                const x = centerX + Math.cos(angle) * (dimensions.width * 0.2);
                const y = centerY + Math.sin(angle) * (dimensions.width * 0.1);
                
                this.ctx.save();
                this.ctx.font = `${dimensions.width * 0.04}px serif`;
                this.ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
                this.ctx.fillText(tool, x, y);
                this.ctx.restore();
            });
        }
        
        this.ctx.restore();
    }
    
    async generateHarmonicOverlay(frequency, dimensions) {
        // Generate visual representation of healing frequency
        const colorData = this.colorFrequencyMap[frequency];
        const centerX = dimensions.width / 2;
        const centerY = dimensions.height / 2;
        
        // Create concentric circles representing frequency waves
        const baseRadius = Math.min(dimensions.width, dimensions.height) * 0.1;
        const frequencyValue = parseInt(frequency.replace('Hz', ''));
        const waveCount = Math.floor(frequencyValue / 100); // Scale frequency to visible waves
        
        this.ctx.save();
        this.ctx.strokeStyle = `rgba(${colorData.r}, ${colorData.g}, ${colorData.b}, 0.3)`;
        this.ctx.lineWidth = 1;
        
        for (let i = 1; i <= waveCount; i++) {
            this.ctx.beginPath();
            this.ctx.arc(centerX, centerY, baseRadius * i * 0.5, 0, Math.PI * 2);
            this.ctx.stroke();
        }
        
        this.ctx.restore();
    }
    
    async generateTraumaSafeFrame(dimensions) {
        // Add trauma-safe visual frame with breathing space
        const frameWidth = dimensions.width * 0.02;
        
        this.ctx.save();
        this.ctx.strokeStyle = 'rgba(248, 245, 239, 0.8)'; // Warm white
        this.ctx.lineWidth = frameWidth;
        this.ctx.setLineDash([frameWidth * 2, frameWidth]); // Gentle dashed pattern
        
        this.ctx.strokeRect(
            frameWidth, frameWidth,
            dimensions.width - frameWidth * 2,
            dimensions.height - frameWidth * 2
        );
        
        this.ctx.restore();
    }
    
    // Helper methods for sacred geometry
    async drawFlowerOfLife(centerX, centerY, radius) {
        // Draw the classical flower of life pattern
        const positions = [
            { x: 0, y: 0 },
            { x: radius, y: 0 },
            { x: radius/2, y: radius * Math.sqrt(3)/2 },
            { x: -radius/2, y: radius * Math.sqrt(3)/2 },
            { x: -radius, y: 0 },
            { x: -radius/2, y: -radius * Math.sqrt(3)/2 },
            { x: radius/2, y: -radius * Math.sqrt(3)/2 }
        ];
        
        positions.forEach(pos => {
            this.ctx.beginPath();
            this.ctx.arc(centerX + pos.x, centerY + pos.y, radius * 0.6, 0, Math.PI * 2);
            this.ctx.stroke();
        });
    }
    
    async drawGoldenSpiral(centerX, centerY, radius) {
        // Draw fibonacci spiral using golden ratio
        this.ctx.beginPath();
        let currentRadius = radius / this.goldenRatio;
        let angle = 0;
        
        for (let i = 0; i < 100; i++) {
            const x = centerX + Math.cos(angle) * currentRadius;
            const y = centerY + Math.sin(angle) * currentRadius;
            
            if (i === 0) {
                this.ctx.moveTo(x, y);
            } else {
                this.ctx.lineTo(x, y);
            }
            
            angle += 0.1;
            currentRadius *= 1.01; // Gradually expand
        }
        
        this.ctx.stroke();
    }
    
    async drawVesicaPiscis(centerX, centerY, radius) {
        // Draw the vesica piscis (sacred geometry of two circles)
        const offset = radius * 0.5;
        
        this.ctx.beginPath();
        this.ctx.arc(centerX - offset, centerY, radius, 0, Math.PI * 2);
        this.ctx.stroke();
        
        this.ctx.beginPath();
        this.ctx.arc(centerX + offset, centerY, radius, 0, Math.PI * 2);
        this.ctx.stroke();
    }
    
    // Elemental symbol methods
    async drawFireTriangle(centerX, centerY, size) {
        this.ctx.beginPath();
        this.ctx.moveTo(centerX, centerY - size);
        this.ctx.lineTo(centerX - size, centerY + size);
        this.ctx.lineTo(centerX + size, centerY + size);
        this.ctx.closePath();
        this.ctx.fill();
        this.ctx.stroke();
    }
    
    async drawWaterTriangle(centerX, centerY, size) {
        this.ctx.beginPath();
        this.ctx.moveTo(centerX, centerY + size);
        this.ctx.lineTo(centerX - size, centerY - size);
        this.ctx.lineTo(centerX + size, centerY - size);
        this.ctx.closePath();
        this.ctx.fill();
        this.ctx.stroke();
    }
    
    async drawAirCircle(centerX, centerY, size) {
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, size, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.stroke();
        
        // Add horizontal line through center
        this.ctx.beginPath();
        this.ctx.moveTo(centerX - size, centerY);
        this.ctx.lineTo(centerX + size, centerY);
        this.ctx.stroke();
    }
    
    async drawEarthSquare(centerX, centerY, size) {
        this.ctx.fillRect(centerX - size, centerY - size, size * 2, size * 2);
        this.ctx.strokeRect(centerX - size, centerY - size, size * 2, size * 2);
    }
    
    // Utility methods
    extractElement(cardData) {
        // Determine element from card suit or properties
        if (cardData.id && cardData.id.includes('WANDS')) return 'fire';
        if (cardData.id && cardData.id.includes('CUPS')) return 'water';
        if (cardData.id && cardData.id.includes('SWORDS')) return 'air';
        if (cardData.id && cardData.id.includes('PENTACLES')) return 'earth';
        
        // Fallback to chakra-based element
        const chakra = cardData.chakra?.toLowerCase();
        if (['root', 'sacral'].includes(chakra)) return 'earth';
        if (['solar', 'heart'].includes(chakra)) return 'fire';
        if (['throat', 'third_eye'].includes(chakra)) return 'air';
        if (['crown'].includes(chakra)) return 'water';
        
        return 'fire'; // Default
    }
    
    extractChakra(chakraName) {
        const chakraMap = {
            'root': 'root',
            'sacral': 'sacral', 
            'solar plexus': 'solar',
            'heart': 'heart',
            'throat': 'throat',
            'third eye': 'third_eye',
            'crown': 'crown'
        };
        
        return chakraMap[chakraName?.toLowerCase()] || 'heart';
    }
    
    getGeometryFromCodexNode(nodeNumber) {
        // Map codex node numbers to sacred geometry patterns
        const geometryMap = {
            1: 'vesica_piscis',
            7: 'flower_of_life',
            13: 'metatrons_cube',
            21: 'sri_yantra',
            34: 'golden_spiral',
            55: 'flower_of_life',
            89: 'metatrons_cube',
            144: 'sri_yantra'
        };
        
        // Find closest fibonacci number
        const fibonacci = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144];
        const closest = fibonacci.reduce((prev, curr) => 
            Math.abs(curr - nodeNumber) < Math.abs(prev - nodeNumber) ? curr : prev
        );
        
        return geometryMap[closest] || 'flower_of_life';
    }
    
    getArchetypalIconography(visionaryName) {
        const iconographyMap = {
            'Artemisia Gentileschi': {
                symbol: '🎨',
                tools: ['⚔️', '🖌️', '🎭']
            },
            'Marguerite Porete': {
                symbol: '💖',
                tools: ['📿', '⛪', '🕊️']
            },
            'Giordano Bruno': {
                symbol: '🌌',
                tools: ['📚', '🔭', '⭐']
            },
            'Sitting Bull': {
                symbol: '🦬',
                tools: ['🪶', '🗻', '🌾']
            }
        };
        
        return iconographyMap[visionaryName] || {
            symbol: '✨',
            tools: ['📜', '🕯️', '⚡']
        };
    }
    
    async addSacredTexture(element, dimensions) {
        // Add subtle texture patterns based on element
        this.ctx.save();
        this.ctx.globalAlpha = 0.1;
        
        const patternSize = 20;
        for (let x = 0; x < dimensions.width; x += patternSize) {
            for (let y = 0; y < dimensions.height; y += patternSize) {
                if (Math.random() > 0.7) { // Sparse pattern
                    this.ctx.fillStyle = 'white';
                    this.ctx.fillRect(x, y, 2, 2);
                }
            }
        }
        
        this.ctx.restore();
    }
}

// Export for use in Cathedral system
window.SacredVisualSynthesisEngine = SacredVisualSynthesisEngine;