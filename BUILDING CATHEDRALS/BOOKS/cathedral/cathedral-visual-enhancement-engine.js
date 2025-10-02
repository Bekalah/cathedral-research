/**
 * 🎨✨ CATHEDRAL VISUAL ENHANCEMENT ENGINE
 * 
 * Björk × Bjarke Ingels × Alice in Wonderland × Tim Burton × Wizard of Oz
 * Living Cathedral with Fractal Node System + Real Gods/Goddesses
 * 
 * @author Rebecca Respawn
 * @version 1.0.0 - Living Visionary Implementation
 */

// ========== FRACTAL NODE SYSTEM ==========

class FractalNodeSystem {
    constructor(nodeNumber) {
        this.nodeNumber = nodeNumber;
        this.fractalType = this.deriveFractalType(nodeNumber);
        this.parameters = this.deriveParameters(nodeNumber);
        this.colorPalette = this.deriveColorPalette(nodeNumber);
        this.animationStyle = this.deriveAnimationStyle(nodeNumber);
    }

    deriveFractalType(num) {
        const patterns = {
            fibonacci: [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144],
            primes: [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47],
            squares: [1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144],
            triangular: [1, 3, 6, 10, 15, 21, 28, 36, 45, 55, 66, 78, 91]
        };

        if (patterns.fibonacci.includes(num)) return 'golden-spiral';
        if (patterns.primes.includes(num)) return 'asymmetric-tree';
        if (patterns.squares.includes(num)) return 'mandala-symmetry';
        if (patterns.triangular.includes(num)) return 'sierpinski-gasket';
        
        // Default based on digit sum
        const digitSum = num.toString().split('').reduce((a, b) => parseInt(a) + parseInt(b), 0);
        const types = ['julia-set', 'dragon-curve', 'barnsley-fern', 'apollonian-gasket'];
        return types[digitSum % types.length];
    }

    deriveParameters(num) {
        const base = {
            iterations: Math.min(5 + (num % 10), 15),
            complexity: (num % 7) + 1,
            scale: 0.5 + (num % 5) * 0.1,
            angle: (num * 23) % 360,
            branches: Math.min(2 + (num % 6), 8)
        };

        // Special mathematical relationships
        if (num === 144) return { ...base, symmetry: 12, goldenRatio: true };
        if (num === 99) return { ...base, dissolution: true, infinity: true };
        if (num === 21) return { ...base, fibonacci: true, angle: 137.5 }; // Golden angle
        
        return base;
    }

    deriveColorPalette(num) {
        const palettes = {
            fool: ['#87CEEB', '#FFFACD', '#FFD700', '#98FB98', '#DDA0DD', '#FF69B4'],
            magician: ['#FF0000', '#FFFF00', '#FFFFFF', '#000000', '#FFD700', '#C0C0C0'],
            priestess: ['#191970', '#C0C0C0', '#4B0082', '#F8F8FF', '#000000', '#E6E6FA'],
            world: ['#228B22', '#4169E1', '#00CED1', '#DC143C', '#9370DB', '#FFD700'],
            bjork: ['#FF69B4', '#00FFFF', '#FFD700', '#9370DB', '#20B2AA', '#FF6347'],
            burton: ['#2F2F2F', '#800080', '#FF69B4', '#00FFFF', '#FFD700', '#DC143C'],
            oz: ['#FFD700', '#228B22', '#DC143C', '#4169E1', '#FF69B4', '#FF8C00'],
            alice: ['#FF69B4', '#00FFFF', '#FFD700', '#9370DB', '#FF6347', '#20B2AA']
        };

        const digitSum = num.toString().split('').reduce((a, b) => parseInt(a) + parseInt(b), 0);
        const paletteNames = Object.keys(palettes);
        const palette = palettes[paletteNames[digitSum % paletteNames.length]];
        
        return palette.map(color => ({
            hex: color,
            hsl: this.hexToHsl(color),
            luminance: this.getLuminance(color)
        }));
    }

    deriveAnimationStyle(num) {
        const styles = [
            'breathing', 'flowing', 'crystalline', 'organic', 
            'geometric', 'liquid', 'plasma', 'particle'
        ];
        
        return {
            type: styles[num % styles.length],
            speed: 0.5 + (num % 5) * 0.3,
            intensity: 0.3 + (num % 7) * 0.1,
            direction: num % 2 === 0 ? 'clockwise' : 'counterclockwise'
        };
    }

    // Color utility functions
    hexToHsl(hex) {
        const r = parseInt(hex.slice(1, 3), 16) / 255;
        const g = parseInt(hex.slice(3, 5), 16) / 255;
        const b = parseInt(hex.slice(5, 7), 16) / 255;

        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;

        if (max === min) {
            h = s = 0;
        } else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }

        return [h * 360, s * 100, l * 100];
    }

    getLuminance(hex) {
        const r = parseInt(hex.slice(1, 3), 16) / 255;
        const g = parseInt(hex.slice(3, 5), 16) / 255;
        const b = parseInt(hex.slice(5, 7), 16) / 255;
        return 0.299 * r + 0.587 * g + 0.114 * b;
    }
}

// ========== FRACTAL RENDERERS ==========

class FractalRenderer {
    constructor(canvas, nodeSystem) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.nodeSystem = nodeSystem;
        this.animationFrame = null;
        this.time = 0;
    }

    render() {
        const { fractalType } = this.nodeSystem;
        
        switch (fractalType) {
            case 'golden-spiral':
                this.renderGoldenSpiral();
                break;
            case 'asymmetric-tree':
                this.renderAsymmetricTree();
                break;
            case 'mandala-symmetry':
                this.renderMandalaSymmetry();
                break;
            case 'sierpinski-gasket':
                this.renderSierpinskiGasket();
                break;
            case 'julia-set':
                this.renderJuliaSet();
                break;
            case 'dragon-curve':
                this.renderDragonCurve();
                break;
            case 'barnsley-fern':
                this.renderBarnsleyFern();
                break;
            case 'apollonian-gasket':
                this.renderApollonianGasket();
                break;
            default:
                this.renderGoldenSpiral();
        }
    }

    renderGoldenSpiral() {
        const { ctx, canvas } = this;
        const { parameters, colorPalette, animationStyle } = this.nodeSystem;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const phi = 1.618033988749;
        
        for (let i = 0; i < parameters.iterations; i++) {
            const angle = (i * Math.PI * 2 / phi) + (this.time * animationStyle.speed);
            const radius = Math.pow(phi, i / 4) * parameters.scale * 10;
            
            const x = centerX + Math.cos(angle) * radius;
            const y = centerY + Math.sin(angle) * radius;
            
            const colorIndex = i % colorPalette.length;
            const alpha = 0.7 * (1 - i / parameters.iterations);
            
            ctx.beginPath();
            ctx.arc(x, y, 3 + i * 0.5, 0, Math.PI * 2);
            ctx.fillStyle = colorPalette[colorIndex].hex + Math.floor(alpha * 255).toString(16).padStart(2, '0');
            ctx.fill();
            
            // Connect with spiral line
            if (i > 0) {
                const prevAngle = ((i-1) * Math.PI * 2 / phi) + (this.time * animationStyle.speed);
                const prevRadius = Math.pow(phi, (i-1) / 4) * parameters.scale * 10;
                const prevX = centerX + Math.cos(prevAngle) * prevRadius;
                const prevY = centerY + Math.sin(prevAngle) * prevRadius;
                
                ctx.beginPath();
                ctx.moveTo(prevX, prevY);
                ctx.lineTo(x, y);
                ctx.strokeStyle = colorPalette[colorIndex].hex + '60';
                ctx.lineWidth = 1;
                ctx.stroke();
            }
        }
    }

    renderAsymmetricTree() {
        const { ctx, canvas } = this;
        const { parameters, colorPalette, animationStyle } = this.nodeSystem;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        const drawBranch = (x, y, length, angle, depth) => {
            if (depth === 0) return;
            
            const wobble = Math.sin(this.time * animationStyle.speed + depth) * 0.1;
            const endX = x + Math.cos(angle + wobble) * length;
            const endY = y + Math.sin(angle + wobble) * length;
            
            const colorIndex = depth % colorPalette.length;
            const alpha = depth / parameters.iterations;
            
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(endX, endY);
            ctx.strokeStyle = colorPalette[colorIndex].hex + Math.floor(alpha * 255).toString(16).padStart(2, '0');
            ctx.lineWidth = depth * 0.5;
            ctx.stroke();
            
            // Asymmetric branching
            const leftAngle = angle - Math.PI / 6 - (depth * 0.1);
            const rightAngle = angle + Math.PI / 4 + (depth * 0.05);
            const newLength = length * (0.7 + Math.sin(this.time + depth) * 0.1);
            
            drawBranch(endX, endY, newLength, leftAngle, depth - 1);
            drawBranch(endX, endY, newLength * 0.8, rightAngle, depth - 1);
        };
        
        drawBranch(canvas.width / 2, canvas.height * 0.9, 60, -Math.PI / 2, parameters.iterations);
    }

    renderMandalaSymmetry() {
        const { ctx, canvas } = this;
        const { parameters, colorPalette, animationStyle } = this.nodeSystem;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const symmetry = parameters.symmetry || 8;
        
        for (let ring = 1; ring <= parameters.iterations; ring++) {
            for (let i = 0; i < symmetry; i++) {
                const baseAngle = (i * Math.PI * 2 / symmetry);
                const animatedAngle = baseAngle + (this.time * animationStyle.speed * (ring % 2 === 0 ? 1 : -1));
                const radius = ring * 15;
                
                const x = centerX + Math.cos(animatedAngle) * radius;
                const y = centerY + Math.sin(animatedAngle) * radius;
                
                const colorIndex = (ring + i) % colorPalette.length;
                const scale = 1 + Math.sin(this.time * 2 + ring + i) * 0.3;
                
                // Draw mandala petals
                ctx.save();
                ctx.translate(x, y);
                ctx.rotate(animatedAngle);
                ctx.scale(scale, scale);
                
                ctx.beginPath();
                ctx.ellipse(0, 0, 8, 4, 0, 0, Math.PI * 2);
                ctx.fillStyle = colorPalette[colorIndex].hex + '80';
                ctx.fill();
                
                ctx.restore();
            }
        }
    }

    renderSierpinskiGasket() {
        const { ctx, canvas } = this;
        const { parameters, colorPalette } = this.nodeSystem;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        const points = [
            [canvas.width / 2, 50],
            [50, canvas.height - 50],
            [canvas.width - 50, canvas.height - 50]
        ];
        
        let currentPoint = [canvas.width / 2, canvas.height / 2];
        
        for (let i = 0; i < parameters.iterations * 100; i++) {
            const targetIndex = Math.floor(Math.random() * 3);
            const target = points[targetIndex];
            
            currentPoint = [
                (currentPoint[0] + target[0]) / 2,
                (currentPoint[1] + target[1]) / 2
            ];
            
            const colorIndex = i % colorPalette.length;
            const alpha = Math.min(1, i / 1000);
            
            ctx.beginPath();
            ctx.arc(currentPoint[0], currentPoint[1], 1, 0, Math.PI * 2);
            ctx.fillStyle = colorPalette[colorIndex].hex + Math.floor(alpha * 255).toString(16).padStart(2, '0');
            ctx.fill();
        }
    }

    renderJuliaSet() {
        const { ctx, canvas } = this;
        const { colorPalette, animationStyle } = this.nodeSystem;
        
        const imageData = ctx.createImageData(canvas.width, canvas.height);
        const data = imageData.data;
        
        const c = {
            real: -0.7 + Math.sin(this.time * animationStyle.speed) * 0.1,
            imag: 0.27015 + Math.cos(this.time * animationStyle.speed) * 0.1
        };
        
        for (let x = 0; x < canvas.width; x++) {
            for (let y = 0; y < canvas.height; y++) {
                let real = (x - canvas.width / 2) * 4 / canvas.width;
                let imag = (y - canvas.height / 2) * 4 / canvas.height;
                
                let iterations = 0;
                const maxIterations = 100;
                
                while (iterations < maxIterations && real * real + imag * imag < 4) {
                    const tempReal = real * real - imag * imag + c.real;
                    imag = 2 * real * imag + c.imag;
                    real = tempReal;
                    iterations++;
                }
                
                const pixelIndex = (y * canvas.width + x) * 4;
                
                if (iterations === maxIterations) {
                    data[pixelIndex] = 0;
                    data[pixelIndex + 1] = 0;
                    data[pixelIndex + 2] = 0;
                    data[pixelIndex + 3] = 255;
                } else {
                    const colorIndex = iterations % colorPalette.length;
                    const color = colorPalette[colorIndex];
                    const rgb = this.hexToRgb(color.hex);
                    
                    data[pixelIndex] = rgb.r;
                    data[pixelIndex + 1] = rgb.g;
                    data[pixelIndex + 2] = rgb.b;
                    data[pixelIndex + 3] = 255;
                }
            }
        }
        
        ctx.putImageData(imageData, 0, 0);
    }

    renderDragonCurve() {
        const { ctx, canvas } = this;
        const { parameters, colorPalette, animationStyle } = this.nodeSystem;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        let sequence = [1];
        for (let i = 0; i < parameters.iterations; i++) {
            const newSequence = [...sequence, 1];
            for (let j = sequence.length - 1; j >= 0; j--) {
                newSequence.push(1 - sequence[j]);
            }
            sequence = newSequence;
        }
        
        let x = canvas.width * 0.3;
        let y = canvas.height * 0.5;
        let direction = 0;
        const step = Math.min(canvas.width, canvas.height) / Math.pow(2, parameters.iterations + 2);
        
        ctx.beginPath();
        ctx.moveTo(x, y);
        
        for (let i = 0; i < sequence.length && i < 1000; i++) {
            const turn = sequence[i] === 1 ? Math.PI / 2 : -Math.PI / 2;
            direction += turn;
            
            const wobble = Math.sin(this.time * animationStyle.speed + i * 0.1) * 0.1;
            x += Math.cos(direction + wobble) * step;
            y += Math.sin(direction + wobble) * step;
            
            ctx.lineTo(x, y);
            
            const colorIndex = Math.floor(i / 10) % colorPalette.length;
            ctx.strokeStyle = colorPalette[colorIndex].hex + '80';
            ctx.lineWidth = 2;
        }
        
        ctx.stroke();
    }

    renderBarnsleyFern() {
        const { ctx, canvas } = this;
        const { parameters, colorPalette } = this.nodeSystem;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        let x = 0, y = 0;
        
        for (let i = 0; i < parameters.iterations * 1000; i++) {
            const r = Math.random();
            let newX, newY;
            
            if (r < 0.01) {
                newX = 0;
                newY = 0.16 * y;
            } else if (r < 0.86) {
                newX = 0.85 * x + 0.04 * y;
                newY = -0.04 * x + 0.85 * y + 1.6;
            } else if (r < 0.93) {
                newX = 0.2 * x - 0.26 * y;
                newY = 0.23 * x + 0.22 * y + 1.6;
            } else {
                newX = -0.15 * x + 0.28 * y;
                newY = 0.26 * x + 0.24 * y + 0.44;
            }
            
            x = newX;
            y = newY;
            
            const screenX = canvas.width / 2 + x * canvas.width / 12;
            const screenY = canvas.height - y * canvas.height / 12;
            
            if (i > 100) { // Skip initial transient
                const colorIndex = Math.floor(y * 2) % colorPalette.length;
                const alpha = Math.min(1, i / 5000);
                
                ctx.beginPath();
                ctx.arc(screenX, screenY, 1, 0, Math.PI * 2);
                ctx.fillStyle = colorPalette[colorIndex].hex + Math.floor(alpha * 255).toString(16).padStart(2, '0');
                ctx.fill();
            }
        }
    }

    renderApollonianGasket() {
        const { ctx, canvas } = this;
        const { parameters, colorPalette, animationStyle } = this.nodeSystem;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const maxRadius = Math.min(canvas.width, canvas.height) / 3;
        
        const circles = [
            { x: centerX, y: centerY, radius: maxRadius, curvature: -1/maxRadius }
        ];
        
        const pulse = 1 + Math.sin(this.time * animationStyle.speed) * 0.1;
        
        for (let generation = 0; generation < parameters.iterations; generation++) {
            const newCircles = [];
            
            for (let i = 0; i < circles.length && newCircles.length < 100; i++) {
                const circle = circles[i];
                if (circle.radius < 2) continue;
                
                const numSubCircles = Math.min(6, parameters.complexity);
                for (let j = 0; j < numSubCircles; j++) {
                    const angle = (j * Math.PI * 2 / numSubCircles) + generation * 0.1;
                    const distance = circle.radius * 0.6;
                    const newRadius = circle.radius * 0.3 * pulse;
                    
                    const newX = circle.x + Math.cos(angle) * distance;
                    const newY = circle.y + Math.sin(angle) * distance;
                    
                    newCircles.push({
                        x: newX,
                        y: newY,
                        radius: newRadius,
                        generation: generation
                    });
                }
            }
            
            circles.push(...newCircles);
        }
        
        circles.forEach((circle, index) => {
            const colorIndex = (circle.generation || 0) % colorPalette.length;
            const alpha = 0.7 * (1 - (circle.generation || 0) / parameters.iterations);
            
            ctx.beginPath();
            ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
            ctx.strokeStyle = colorPalette[colorIndex].hex + Math.floor(alpha * 255).toString(16).padStart(2, '0');
            ctx.lineWidth = Math.max(1, circle.radius * 0.05);
            ctx.stroke();
        });
    }

    hexToRgb(hex) {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return { r, g, b };
    }

    startAnimation() {
        const animate = () => {
            this.time += 0.02;
            this.render();
            this.animationFrame = requestAnimationFrame(animate);
        };
        animate();
    }

    stopAnimation() {
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
            this.animationFrame = null;
        }
    }
}

// ========== VISUAL ENHANCEMENT SYSTEM ==========

class CathedralVisualEnhancer {
    constructor() {
        this.fractalLayers = new Map();
        this.particleSystems = new Map();
        this.isInitialized = false;
        this.globalAnimationFrame = null;
    }

    initialize() {
        if (this.isInitialized) return;
        
        this.createGlobalStyles();
        this.initializeParticleSystems();
        this.setupResponsiveHandlers();
        this.isInitialized = true;
        
        console.log('🎨✨ Cathedral Visual Enhancement Engine Initialized');
    }

    createGlobalStyles() {
        const styleSheet = document.createElement('style');
        styleSheet.textContent = `
            /* ========== CATHEDRAL VISUAL ENHANCEMENTS ========== */
            
            :root {
                /* Björk Aesthetic */
                --bjork-organic: radial-gradient(circle, #FF69B4 0%, #00FFFF 50%, #FFD700 100%);
                --bjork-breath: cubic-bezier(0.4, 0.0, 0.2, 1);
                
                /* Bjarke Ingels BIG Architecture */
                --big-geometry: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
                --big-precision: linear-gradient(135deg, #2C3E50 0%, #34495E 100%);
                
                /* Alice in Wonderland Whimsy */
                --alice-curious: rotate(0deg) scale(1) skew(0deg);
                --alice-mad-hatter: hue-rotate(180deg) saturate(1.5);
                
                /* Tim Burton Gothic */
                --burton-shadow: drop-shadow(0 0 20px rgba(128, 0, 128, 0.7));
                --burton-spiral: path('M 0 0 Q 50 25 100 0 T 200 0');
                
                /* Wizard of Oz Magic */
                --oz-rainbow: linear-gradient(90deg, #FF0000, #FF8C00, #FFD700, #00FF00, #0000FF, #8B00FF);
                --oz-emerald: radial-gradient(circle, #50C878 0%, #228B22 100%);
                
                /* Living Cathedral Breathing */
                --cathedral-breath: 4s ease-in-out infinite alternate;
                --sacred-pulse: 2s ease-in-out infinite;
                --divine-flow: 6s linear infinite;
                
                /* Fractal Mathematics */
                --golden-ratio: 1.618;
                --phi-angle: 137.5deg;
                --fibonacci-spiral: cubic-bezier(0.618, 0, 0.382, 1);
            }
            
            /* ========== LIVING CATHEDRAL BASE ========== */
            
            .cathedral-container {
                position: relative;
                min-height: 100vh;
                background: 
                    radial-gradient(circle at 20% 80%, rgba(255, 105, 180, 0.1) 0%, transparent 50%),
                    radial-gradient(circle at 80% 20%, rgba(0, 255, 255, 0.1) 0%, transparent 50%),
                    radial-gradient(circle at 40% 40%, rgba(255, 215, 0, 0.05) 0%, transparent 50%),
                    linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 25%, #16213e 50%, #0f0f23 100%);
                overflow: hidden;
                animation: var(--cathedral-breath);
            }
            
            .cathedral-container::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="sacred" patternUnits="userSpaceOnUse" width="50" height="50"><circle cx="25" cy="25" r="2" fill="%23FFD700" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23sacred)"/></svg>');
                pointer-events: none;
                opacity: 0.3;
                animation: var(--divine-flow);
            }
            
            /* ========== FRACTAL ENHANCEMENT LAYERS ========== */
            
            .fractal-layer {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
                z-index: 1;
                opacity: 0.6;
                mix-blend-mode: screen;
                transition: opacity 0.5s ease;
            }
            
            .fractal-canvas {
                width: 100%;
                height: 100%;
                filter: 
                    blur(0.5px) 
                    brightness(1.2) 
                    contrast(1.1) 
                    saturate(1.3);
                animation: var(--sacred-pulse);
            }
            
            /* ========== BJÖRK ORGANIC BREATHING ========== */
            
            .bjork-element {
                background: var(--bjork-organic);
                border-radius: 50% 40% 60% 30%;
                animation: bjork-breathe var(--cathedral-breath);
                filter: var(--burton-shadow);
                transform-origin: center center;
            }
            
            @keyframes bjork-breathe {
                0% { 
                    transform: scale(1) rotate(0deg);
                    border-radius: 50% 40% 60% 30%;
                }
                50% { 
                    transform: scale(1.05) rotate(2deg);
                    border-radius: 40% 60% 30% 50%;
                }
                100% { 
                    transform: scale(1) rotate(0deg);
                    border-radius: 60% 30% 50% 40%;
                }
            }
            
            /* ========== BIG ARCHITECTURAL PRECISION ========== */
            
            .big-structure {
                background: var(--big-precision);
                clip-path: var(--big-geometry);
                border: 1px solid rgba(255, 215, 0, 0.3);
                transition: all 0.3s var(--bjork-breath);
                backdrop-filter: blur(10px);
            }
            
            .big-structure:hover {
                transform: scale(1.02) translateY(-2px);
                box-shadow: 0 10px 30px rgba(255, 215, 0, 0.2);
                clip-path: polygon(20% 0%, 80% 0%, 100% 45%, 80% 100%, 20% 100%, 0% 55%);
            }
            
            /* ========== ALICE WONDERLAND WHIMSY ========== */
            
            .alice-curious {
                transform: var(--alice-curious);
                transition: transform 0.8s var(--fibonacci-spiral);
                filter: var(--alice-mad-hatter);
            }
            
            .alice-curious:hover {
                transform: rotate(5deg) scale(1.1) skew(2deg, 1deg);
                filter: hue-rotate(90deg) saturate(2) brightness(1.2);
            }
            
            .alice-tea-party {
                animation: alice-float 8s ease-in-out infinite;
                transform-style: preserve-3d;
            }
            
            @keyframes alice-float {
                0%, 100% { transform: translateY(0px) rotateX(0deg) rotateY(0deg); }
                25% { transform: translateY(-10px) rotateX(5deg) rotateY(2deg); }
                50% { transform: translateY(-5px) rotateX(-2deg) rotateY(-3deg); }
                75% { transform: translateY(-8px) rotateX(3deg) rotateY(1deg); }
            }
            
            /* ========== TIM BURTON GOTHIC ========== */
            
            .burton-gothic {
                filter: var(--burton-shadow);
                background: linear-gradient(45deg, #2F2F2F 0%, #800080 50%, #2F2F2F 100%);
                border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
                animation: burton-sway 6s ease-in-out infinite;
            }
            
            @keyframes burton-sway {
                0%, 100% { 
                    transform: rotate(-1deg) skewX(1deg);
                    border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
                }
                50% { 
                    transform: rotate(1deg) skewX(-1deg);
                    border-radius: 70% 30% 30% 70% / 70% 70% 30% 30%;
                }
            }
            
            /* ========== WIZARD OF OZ MAGIC ========== */
            
            .oz-rainbow {
                background: var(--oz-rainbow);
                background-size: 400% 400%;
                animation: oz-shimmer 8s ease-in-out infinite;
            }
            
            @keyframes oz-shimmer {
                0%, 100% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
            }
            
            .oz-emerald-city {
                background: var(--oz-emerald);
                box-shadow: 
                    0 0 20px rgba(80, 200, 120, 0.5),
                    inset 0 0 20px rgba(34, 139, 34, 0.3);
                animation: emerald-glow var(--sacred-pulse);
            }
            
            @keyframes emerald-glow {
                0%, 100% { 
                    box-shadow: 
                        0 0 20px rgba(80, 200, 120, 0.5),
                        inset 0 0 20px rgba(34, 139, 34, 0.3);
                }
                50% { 
                    box-shadow: 
                        0 0 40px rgba(80, 200, 120, 0.8),
                        inset 0 0 40px rgba(34, 139, 34, 0.6);
                }
            }
            
            /* ========== PARTICLE SYSTEM STYLES ========== */
            
            .particle {
                position: absolute;
                border-radius: 50%;
                pointer-events: none;
                opacity: 0.7;
                animation: particle-float 10s linear infinite;
            }
            
            @keyframes particle-float {
                0% {
                    transform: translateY(100vh) scale(0);
                    opacity: 0;
                }
                10% {
                    opacity: 0.7;
                    transform: translateY(90vh) scale(1);
                }
                90% {
                    opacity: 0.7;
                    transform: translateY(10vh) scale(1);
                }
                100% {
                    opacity: 0;
                    transform: translateY(0vh) scale(0);
                }
            }
            
            /* ========== RESPONSIVE CATHEDRAL ========== */
            
            @media (max-width: 768px) {
                .cathedral-container {
                    background-size: 100% 100%;
                }
                
                .fractal-canvas {
                    filter: blur(1px) brightness(1.1) contrast(1.05) saturate(1.2);
                }
                
                .big-structure:hover {
                    transform: scale(1.01) translateY(-1px);
                }
            }
            
            @media (prefers-reduced-motion: reduce) {
                .cathedral-container,
                .fractal-canvas,
                .bjork-element,
                .alice-tea-party,
                .burton-gothic,
                .oz-rainbow,
                .oz-emerald-city,
                .particle {
                    animation: none;
                }
                
                .alice-curious,
                .big-structure {
                    transition: none;
                }
            }
            
            /* ========== PERFORMANCE OPTIMIZATIONS ========== */
            
            .fractal-layer {
                will-change: opacity;
                contain: layout style paint;
            }
            
            .fractal-canvas {
                will-change: filter;
                contain: layout style paint;
            }
            
            .particle {
                will-change: transform, opacity;
                contain: layout style paint;
            }
        `;
        
        document.head.appendChild(styleSheet);
    }

    enhanceElement(element, nodeNumber = 0) {
        if (!element) return;
        
        // Ensure cathedral container exists
        if (!element.classList.contains('cathedral-container')) {
            element.classList.add('cathedral-container');
        }
        
        // Create fractal enhancement
        this.addFractalLayer(element, nodeNumber);
        
        // Add particle system
        this.addParticleSystem(element, nodeNumber);
        
        // Apply aesthetic styles based on element type
        this.applyAestheticStyles(element, nodeNumber);
        
        console.log(`🎨 Enhanced element with node ${nodeNumber} fractals`);
    }

    addFractalLayer(parentElement, nodeNumber) {
        const fractalLayer = document.createElement('div');
        fractalLayer.className = 'fractal-layer';
        fractalLayer.dataset.nodeNumber = nodeNumber;
        
        const canvas = document.createElement('canvas');
        canvas.className = 'fractal-canvas';
        canvas.width = 800;
        canvas.height = 600;
        
        fractalLayer.appendChild(canvas);
        parentElement.appendChild(fractalLayer);
        
        // Create and start fractal system
        const nodeSystem = new FractalNodeSystem(nodeNumber);
        const renderer = new FractalRenderer(canvas, nodeSystem);
        
        this.fractalLayers.set(nodeNumber, {
            element: fractalLayer,
            canvas: canvas,
            renderer: renderer,
            nodeSystem: nodeSystem
        });
        
        renderer.startAnimation();
        
        // Add blend mode cycling
        this.addBlendModeCycling(fractalLayer);
    }

    addBlendModeCycling(element) {
        const blendModes = ['screen', 'overlay', 'soft-light', 'color-dodge', 'multiply'];
        let currentIndex = 0;
        
        setInterval(() => {
            element.style.mixBlendMode = blendModes[currentIndex];
            currentIndex = (currentIndex + 1) % blendModes.length;
        }, 5000);
    }

    addParticleSystem(parentElement, nodeNumber) {
        const particleContainer = document.createElement('div');
        particleContainer.className = 'particle-system';
        particleContainer.style.position = 'absolute';
        particleContainer.style.top = '0';
        particleContainer.style.left = '0';
        particleContainer.style.width = '100%';
        particleContainer.style.height = '100%';
        particleContainer.style.pointerEvents = 'none';
        particleContainer.style.zIndex = '2';
        
        parentElement.appendChild(particleContainer);
        
        // Create particles based on node properties
        const nodeSystem = new FractalNodeSystem(nodeNumber);
        const particleCount = Math.min(20, 5 + (nodeNumber % 15));
        
        for (let i = 0; i < particleCount; i++) {
            setTimeout(() => {
                this.createParticle(particleContainer, nodeSystem, i);
            }, i * 200);
        }
        
        this.particleSystems.set(nodeNumber, particleContainer);
    }

    createParticle(container, nodeSystem, index) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const { colorPalette, animationStyle } = nodeSystem;
        const color = colorPalette[index % colorPalette.length];
        
        const size = 2 + Math.random() * 6;
        const left = Math.random() * 100;
        const duration = 8 + Math.random() * 10;
        const delay = Math.random() * 5;
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.backgroundColor = color.hex;
        particle.style.left = `${left}%`;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`;
        particle.style.boxShadow = `0 0 ${size * 2}px ${color.hex}80`;
        
        container.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
                // Create new particle to maintain count
                setTimeout(() => {
                    this.createParticle(container, nodeSystem, index);
                }, Math.random() * 2000);
            }
        }, (duration + delay) * 1000);
    }

    applyAestheticStyles(element, nodeNumber) {
        const styles = [
            'bjork-element',
            'big-structure', 
            'alice-curious',
            'burton-gothic',
            'oz-emerald-city'
        ];
        
        // Apply style based on node characteristics
        const digitSum = nodeNumber.toString().split('').reduce((a, b) => parseInt(a) + parseInt(b), 0);
        const styleClass = styles[digitSum % styles.length];
        
        // Find child elements to enhance
        const enhanceableElements = element.querySelectorAll('.tarot-card, .card, .node, .button, .panel');
        enhanceableElements.forEach((child, index) => {
            const childStyleClass = styles[(digitSum + index) % styles.length];
            child.classList.add(childStyleClass);
            
            // Add hover effects
            this.addHoverEffects(child, nodeNumber);
        });
    }

    addHoverEffects(element, nodeNumber) {
        const nodeSystem = new FractalNodeSystem(nodeNumber);
        const { colorPalette } = nodeSystem;
        
        element.addEventListener('mouseenter', () => {
            const randomColor = colorPalette[Math.floor(Math.random() * colorPalette.length)];
            element.style.boxShadow = `0 0 30px ${randomColor.hex}80`;
            element.style.transform = 'scale(1.02) translateY(-2px) rotateX(2deg)';
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.boxShadow = '';
            element.style.transform = '';
        });
    }

    initializeParticleSystems() {
        // Global particle effects
        this.createGlobalParticles();
        
        // Sacred geometry overlay
        this.createSacredGeometryOverlay();
    }

    createGlobalParticles() {
        const globalContainer = document.createElement('div');
        globalContainer.id = 'global-particles';
        globalContainer.style.position = 'fixed';
        globalContainer.style.top = '0';
        globalContainer.style.left = '0';
        globalContainer.style.width = '100vw';
        globalContainer.style.height = '100vh';
        globalContainer.style.pointerEvents = 'none';
        globalContainer.style.zIndex = '1000';
        
        document.body.appendChild(globalContainer);
        
        // Create ambient particles
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                this.createGlobalParticle(globalContainer, i);
            }, i * 100);
        }
    }

    createGlobalParticle(container, index) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const colors = ['#FFD700', '#FF69B4', '#00FFFF', '#9370DB', '#20B2AA', '#FF6347'];
        const color = colors[index % colors.length];
        
        const size = 1 + Math.random() * 3;
        const left = Math.random() * 100;
        const duration = 15 + Math.random() * 20;
        const delay = Math.random() * 10;
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.backgroundColor = color;
        particle.style.left = `${left}%`;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`;
        particle.style.opacity = '0.4';
        
        container.appendChild(particle);
        
        // Remove and recreate
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
                setTimeout(() => {
                    this.createGlobalParticle(container, index);
                }, Math.random() * 5000);
            }
        }, (duration + delay) * 1000);
    }

    createSacredGeometryOverlay() {
        const overlay = document.createElement('div');
        overlay.id = 'sacred-geometry-overlay';
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100vw';
        overlay.style.height = '100vh';
        overlay.style.pointerEvents = 'none';
        overlay.style.zIndex = '999';
        overlay.style.opacity = '0.1';
        overlay.style.mixBlendMode = 'soft-light';
        
        const canvas = document.createElement('canvas');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        overlay.appendChild(canvas);
        
        document.body.appendChild(overlay);
        
        // Render sacred geometry
        const ctx = canvas.getContext('2d');
        this.renderSacredGeometryOverlay(ctx, canvas.width, canvas.height);
    }

    renderSacredGeometryOverlay(ctx, width, height) {
        const centerX = width / 2;
        const centerY = height / 2;
        
        // Flower of Life
        ctx.strokeStyle = '#FFD700';
        ctx.lineWidth = 1;
        
        const radius = Math.min(width, height) / 8;
        const circles = [];
        
        // Central circle
        circles.push({ x: centerX, y: centerY });
        
        // Six surrounding circles
        for (let i = 0; i < 6; i++) {
            const angle = (i * Math.PI * 2) / 6;
            circles.push({
                x: centerX + Math.cos(angle) * radius,
                y: centerY + Math.sin(angle) * radius
            });
        }
        
        // Draw circles
        circles.forEach(circle => {
            ctx.beginPath();
            ctx.arc(circle.x, circle.y, radius, 0, Math.PI * 2);
            ctx.stroke();
        });
    }

    setupResponsiveHandlers() {
        window.addEventListener('resize', () => {
            this.handleResize();
        });
        
        // Visibility change handler for performance
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.pauseAnimations();
            } else {
                this.resumeAnimations();
            }
        });
    }

    handleResize() {
        // Update canvas sizes
        this.fractalLayers.forEach(layer => {
            const canvas = layer.canvas;
            canvas.width = canvas.parentElement.clientWidth;
            canvas.height = canvas.parentElement.clientHeight;
        });
        
        // Update sacred geometry overlay
        const overlay = document.getElementById('sacred-geometry-overlay');
        if (overlay) {
            const canvas = overlay.querySelector('canvas');
            if (canvas) {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
                const ctx = canvas.getContext('2d');
                this.renderSacredGeometryOverlay(ctx, canvas.width, canvas.height);
            }
        }
    }

    pauseAnimations() {
        this.fractalLayers.forEach(layer => {
            layer.renderer.stopAnimation();
        });
    }

    resumeAnimations() {
        this.fractalLayers.forEach(layer => {
            layer.renderer.startAnimation();
        });
    }

    // Public API methods
    enhanceNode(nodeNumber, targetElement = document.body) {
        this.enhanceElement(targetElement, nodeNumber);
    }

    setFractalOpacity(nodeNumber, opacity) {
        const layer = this.fractalLayers.get(nodeNumber);
        if (layer) {
            layer.element.style.opacity = opacity;
        }
    }

    toggleFractal(nodeNumber) {
        const layer = this.fractalLayers.get(nodeNumber);
        if (layer) {
            const isVisible = layer.element.style.display !== 'none';
            layer.element.style.display = isVisible ? 'none' : 'block';
        }
    }

    updateNodeFractal(nodeNumber, newParameters) {
        const layer = this.fractalLayers.get(nodeNumber);
        if (layer) {
            layer.nodeSystem.parameters = { ...layer.nodeSystem.parameters, ...newParameters };
            layer.renderer.render();
        }
    }

    destroy() {
        // Clean up animations
        this.fractalLayers.forEach(layer => {
            layer.renderer.stopAnimation();
        });
        
        // Remove global containers
        const globalParticles = document.getElementById('global-particles');
        const sacredOverlay = document.getElementById('sacred-geometry-overlay');
        
        if (globalParticles) globalParticles.remove();
        if (sacredOverlay) sacredOverlay.remove();
        
        // Clear maps
        this.fractalLayers.clear();
        this.particleSystems.clear();
        
        console.log('🎨 Cathedral Visual Enhancement Engine destroyed');
    }
}

// ========== EXPORT FOR CATHEDRAL INTEGRATION ==========

// Auto-initialize if in browser environment
if (typeof window !== 'undefined') {
    window.CathedralVisualEnhancer = CathedralVisualEnhancer;
    window.FractalNodeSystem = FractalNodeSystem;
    window.FractalRenderer = FractalRenderer;
    
    // Global instance
    window.cathedralEnhancer = new CathedralVisualEnhancer();
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            window.cathedralEnhancer.initialize();
        });
    } else {
        window.cathedralEnhancer.initialize();
    }
}

// Node.js export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        CathedralVisualEnhancer,
        FractalNodeSystem, 
        FractalRenderer
    };
}

console.log('🎨✨ Cathedral Visual Enhancement Engine loaded - Ready for Björk × BIG × Alice × Burton × Oz magic!');