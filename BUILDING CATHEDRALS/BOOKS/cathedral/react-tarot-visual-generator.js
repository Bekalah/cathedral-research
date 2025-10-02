/**
 * 🃏✨ CATHEDRAL REACT TAROT VISUAL GENERATOR
 * 
 * Free, no-API-key tarot card visual generation system
 * Integrates: react-konva, p5.js, seedrandom, CSS variables, sacred geometry
 * 
 * @author Rebecca Respawn
 * @version 1.0.0 - Mathematical Visual Excellence
 */

import React, { useState, useEffect, useRef, useCallback, useMemo, lazy, Suspense } from 'react';
import { Stage, Layer, Rect, Circle, Line, Text, Image, Group } from 'react-konva';
import seedrandom from 'seedrandom';

// Lazy load heavy components
const P5Wrapper = lazy(() => import('@p5-wrapper/react'));
const AnimatedBackground = lazy(() => import('./components/AnimatedBackground'));

// ========== TAROT CARD CONFIGURATION DATA ==========

const MAJOR_ARCANA_CONFIG = [
    {
        id: 0,
        name: "The Fool",
        seed: "fool-beginning-journey",
        baseShape: "asymmetric",
        colorScheme: "warm-chaotic",
        baseHue: 45,
        symmetry: 1,
        complexity: 3,
        noiseScale: 0.02,
        noiseOctaves: 4,
        roughness: 0.8,
        sacredGeometry: "infinite-spiral",
        symbolism: "New beginnings, spontaneity, innocence"
    },
    {
        id: 1,
        name: "The Magician",
        seed: "magician-will-manifestation",
        baseShape: "geometric",
        colorScheme: "triadic",
        baseHue: 270,
        symmetry: 8,
        complexity: 7,
        noiseScale: 0.015,
        noiseOctaves: 3,
        roughness: 0.2,
        sacredGeometry: "octagon-star",
        symbolism: "Willpower, manifestation, skill"
    },
    {
        id: 2,
        name: "The High Priestess",
        seed: "priestess-intuition-mystery",
        baseShape: "mandala",
        colorScheme: "monochromatic",
        baseHue: 240,
        symmetry: 2,
        complexity: 5,
        noiseScale: 0.01,
        noiseOctaves: 2,
        roughness: 0.1,
        sacredGeometry: "vesica-piscis",
        symbolism: "Intuition, sacred knowledge, mystery"
    },
    {
        id: 3,
        name: "The Empress",
        seed: "empress-abundance-nature",
        baseShape: "organic",
        colorScheme: "analogous",
        baseHue: 120,
        symmetry: 5,
        complexity: 8,
        noiseScale: 0.025,
        noiseOctaves: 5,
        roughness: 0.4,
        sacredGeometry: "fibonacci-spiral",
        symbolism: "Abundance, nature, nurturing"
    },
    {
        id: 4,
        name: "The Emperor",
        seed: "emperor-authority-structure",
        baseShape: "geometric",
        colorScheme: "complementary",
        baseHue: 0,
        symmetry: 4,
        complexity: 4,
        noiseScale: 0.008,
        noiseOctaves: 2,
        roughness: 0.1,
        sacredGeometry: "square-mandala",
        symbolism: "Authority, structure, control"
    },
    {
        id: 5,
        name: "The Hierophant",
        seed: "hierophant-tradition-wisdom",
        baseShape: "traditional",
        colorScheme: "split-complementary",
        baseHue: 60,
        symmetry: 3,
        complexity: 6,
        noiseScale: 0.012,
        noiseOctaves: 3,
        roughness: 0.3,
        sacredGeometry: "triangle-trinity",
        symbolism: "Tradition, spiritual wisdom, conformity"
    },
    // ... Continue for all 22 Major Arcana
    {
        id: 21,
        name: "The World",
        seed: "world-completion-fulfillment",
        baseShape: "mandala",
        colorScheme: "rainbow",
        baseHue: 180,
        symmetry: 12,
        complexity: 10,
        noiseScale: 0.03,
        noiseOctaves: 6,
        roughness: 0.2,
        sacredGeometry: "flower-of-life",
        symbolism: "Completion, fulfillment, cosmic consciousness"
    }
];

// ========== COLOR PALETTE GENERATOR ==========

class ColorPaletteGenerator {
    constructor() {
        this.chroma = window.chroma || this.loadChroma();
    }

    loadChroma() {
        // Fallback if chroma.js not loaded
        console.warn('Chroma.js not found, using fallback colors');
        return {
            hsl: (h, s, l) => `hsl(${h}, ${s}%, ${l}%)`,
            scale: (colors) => ({
                colors: (count) => colors
            })
        };
    }

    generatePalette(config) {
        const { baseHue, colorScheme } = config;
        
        switch (colorScheme) {
            case 'monochromatic':
                return this.generateMonochromatic(baseHue);
            case 'analogous':
                return this.generateAnalogous(baseHue);
            case 'triadic':
                return this.generateTriadic(baseHue);
            case 'complementary':
                return this.generateComplementary(baseHue);
            case 'split-complementary':
                return this.generateSplitComplementary(baseHue);
            case 'warm-chaotic':
                return this.generateWarmChaotic(baseHue);
            case 'rainbow':
                return this.generateRainbow();
            default:
                return this.generateMonochromatic(baseHue);
        }
    }

    generateMonochromatic(hue) {
        return {
            primary: `hsl(${hue}, 70%, 50%)`,
            secondary: `hsl(${hue}, 60%, 70%)`,
            accent: `hsl(${hue}, 80%, 30%)`,
            background: `hsl(${hue}, 30%, 90%)`,
            text: `hsl(${hue}, 40%, 20%)`,
            gradient: [
                `hsl(${hue}, 70%, 60%)`,
                `hsl(${hue}, 60%, 50%)`,
                `hsl(${hue}, 50%, 40%)`
            ]
        };
    }

    generateAnalogous(hue) {
        return {
            primary: `hsl(${hue}, 70%, 50%)`,
            secondary: `hsl(${(hue + 30) % 360}, 65%, 55%)`,
            accent: `hsl(${(hue - 30 + 360) % 360}, 75%, 45%)`,
            background: `hsl(${hue}, 20%, 95%)`,
            text: `hsl(${hue}, 60%, 15%)`,
            gradient: [
                `hsl(${hue}, 70%, 50%)`,
                `hsl(${(hue + 15) % 360}, 65%, 50%)`,
                `hsl(${(hue + 30) % 360}, 60%, 50%)`
            ]
        };
    }

    generateTriadic(hue) {
        return {
            primary: `hsl(${hue}, 70%, 50%)`,
            secondary: `hsl(${(hue + 120) % 360}, 65%, 55%)`,
            accent: `hsl(${(hue + 240) % 360}, 75%, 45%)`,
            background: `hsl(${hue}, 15%, 95%)`,
            text: `hsl(${hue}, 50%, 20%)`,
            gradient: [
                `hsl(${hue}, 70%, 50%)`,
                `hsl(${(hue + 120) % 360}, 65%, 50%)`,
                `hsl(${(hue + 240) % 360}, 60%, 50%)`
            ]
        };
    }

    generateComplementary(hue) {
        const complement = (hue + 180) % 360;
        return {
            primary: `hsl(${hue}, 70%, 50%)`,
            secondary: `hsl(${complement}, 65%, 55%)`,
            accent: `hsl(${hue}, 85%, 35%)`,
            background: `hsl(${hue}, 10%, 95%)`,
            text: `hsl(${complement}, 60%, 20%)`,
            gradient: [
                `hsl(${hue}, 70%, 50%)`,
                `hsl(${complement}, 65%, 50%)`,
                `hsl(${hue}, 60%, 40%)`
            ]
        };
    }

    generateSplitComplementary(hue) {
        const comp1 = (hue + 150) % 360;
        const comp2 = (hue + 210) % 360;
        return {
            primary: `hsl(${hue}, 70%, 50%)`,
            secondary: `hsl(${comp1}, 65%, 55%)`,
            accent: `hsl(${comp2}, 75%, 45%)`,
            background: `hsl(${hue}, 15%, 95%)`,
            text: `hsl(${hue}, 50%, 20%)`,
            gradient: [
                `hsl(${hue}, 70%, 50%)`,
                `hsl(${comp1}, 65%, 50%)`,
                `hsl(${comp2}, 60%, 50%)`
            ]
        };
    }

    generateWarmChaotic(baseHue) {
        const rng = seedrandom('warm-chaos');
        return {
            primary: `hsl(${baseHue + rng() * 60 - 30}, ${60 + rng() * 40}%, ${40 + rng() * 20}%)`,
            secondary: `hsl(${baseHue + rng() * 120 - 60}, ${50 + rng() * 50}%, ${50 + rng() * 30}%)`,
            accent: `hsl(${baseHue + rng() * 90 - 45}, ${70 + rng() * 30}%, ${30 + rng() * 25}%)`,
            background: `hsl(${baseHue}, ${10 + rng() * 20}%, ${85 + rng() * 10}%)`,
            text: `hsl(${baseHue}, ${30 + rng() * 30}%, ${10 + rng() * 20}%)`,
            gradient: Array.from({ length: 5 }, () => 
                `hsl(${baseHue + rng() * 180 - 90}, ${60 + rng() * 40}%, ${40 + rng() * 30}%)`
            )
        };
    }

    generateRainbow() {
        return {
            primary: `hsl(0, 70%, 50%)`,
            secondary: `hsl(120, 65%, 55%)`,
            accent: `hsl(240, 75%, 45%)`,
            background: `hsl(0, 10%, 95%)`,
            text: `hsl(0, 50%, 20%)`,
            gradient: [
                `hsl(0, 70%, 50%)`,   // Red
                `hsl(60, 70%, 50%)`,  // Yellow
                `hsl(120, 70%, 50%)`, // Green
                `hsl(180, 70%, 50%)`, // Cyan
                `hsl(240, 70%, 50%)`, // Blue
                `hsl(300, 70%, 50%)`  // Magenta
            ]
        };
    }
}

// ========== SACRED GEOMETRY GENERATOR ==========

class SacredGeometryGenerator {
    constructor() {
        this.phi = (1 + Math.sqrt(5)) / 2; // Golden ratio
    }

    generate(type, config, rng) {
        switch (type) {
            case 'flower-of-life':
                return this.generateFlowerOfLife(config, rng);
            case 'fibonacci-spiral':
                return this.generateFibonacciSpiral(config, rng);
            case 'vesica-piscis':
                return this.generateVesicaPiscis(config, rng);
            case 'octagon-star':
                return this.generateOctagonStar(config, rng);
            case 'square-mandala':
                return this.generateSquareMandala(config, rng);
            case 'triangle-trinity':
                return this.generateTriangleTrinity(config, rng);
            case 'infinite-spiral':
                return this.generateInfiniteSpiral(config, rng);
            default:
                return this.generateBasicMandala(config, rng);
        }
    }

    generateFlowerOfLife(config, rng) {
        const { symmetry, complexity } = config;
        const circles = [];
        const radius = 50;
        const centerX = 0;
        const centerY = 0;
        
        // Central circle
        circles.push({ x: centerX, y: centerY, r: radius });
        
        // First ring of 6 circles
        for (let i = 0; i < 6; i++) {
            const angle = (i * Math.PI * 2) / 6;
            const x = centerX + radius * Math.cos(angle);
            const y = centerY + radius * Math.sin(angle);
            circles.push({ x, y, r: radius });
        }
        
        // Additional rings based on complexity
        for (let ring = 2; ring <= complexity; ring++) {
            const circlesInRing = ring * 6;
            const ringRadius = radius * ring;
            
            for (let i = 0; i < circlesInRing; i++) {
                const angle = (i * Math.PI * 2) / circlesInRing;
                const x = centerX + ringRadius * Math.cos(angle);
                const y = centerY + ringRadius * Math.sin(angle);
                circles.push({ x, y, r: radius * (0.8 + rng() * 0.4) });
            }
        }
        
        return { type: 'circles', elements: circles };
    }

    generateFibonacciSpiral(config, rng) {
        const { complexity } = config;
        const points = [];
        let a = 0;
        let b = 1;
        
        for (let i = 0; i < complexity * 10; i++) {
            const angle = i * 0.1618 * Math.PI * 2; // Golden angle
            const radius = Math.sqrt(a) * 10;
            const x = radius * Math.cos(angle);
            const y = radius * Math.sin(angle);
            
            points.push({ x, y, size: Math.min(a / 10, 20) });
            
            // Next Fibonacci number
            const next = a + b;
            a = b;
            b = next;
        }
        
        return { type: 'spiral', elements: points };
    }

    generateVesicaPiscis(config, rng) {
        const { symmetry } = config;
        const shapes = [];
        const radius = 80;
        const separation = radius * 0.8;
        
        // Two overlapping circles
        shapes.push({
            type: 'circle',
            x: -separation / 2,
            y: 0,
            radius: radius
        });
        
        shapes.push({
            type: 'circle',
            x: separation / 2,
            y: 0,
            radius: radius
        });
        
        // Add additional vesica patterns based on symmetry
        for (let i = 1; i < symmetry; i++) {
            const angle = (i * Math.PI * 2) / symmetry;
            const x1 = (separation / 2) * Math.cos(angle) - (separation / 4) * Math.cos(angle);
            const y1 = (separation / 2) * Math.sin(angle) - (separation / 4) * Math.sin(angle);
            const x2 = (separation / 2) * Math.cos(angle) + (separation / 4) * Math.cos(angle);
            const y2 = (separation / 2) * Math.sin(angle) + (separation / 4) * Math.sin(angle);
            
            shapes.push({
                type: 'circle',
                x: x1,
                y: y1,
                radius: radius * 0.7
            });
            
            shapes.push({
                type: 'circle',
                x: x2,
                y: y2,
                radius: radius * 0.7
            });
        }
        
        return { type: 'vesica', elements: shapes };
    }

    generateOctagonStar(config, rng) {
        const { symmetry, complexity } = config;
        const shapes = [];
        const outerRadius = 100;
        const innerRadius = outerRadius * 0.6;
        
        // Generate star points
        const points = [];
        for (let i = 0; i < 16; i++) { // 8 outer + 8 inner points
            const angle = (i * Math.PI) / 8;
            const radius = i % 2 === 0 ? outerRadius : innerRadius;
            points.push({
                x: radius * Math.cos(angle),
                y: radius * Math.sin(angle)
            });
        }
        
        shapes.push({
            type: 'polygon',
            points: points
        });
        
        // Add nested patterns based on complexity
        for (let level = 1; level < complexity; level++) {
            const scale = 1 - (level * 0.15);
            const nestedPoints = points.map(p => ({
                x: p.x * scale,
                y: p.y * scale
            }));
            
            shapes.push({
                type: 'polygon',
                points: nestedPoints,
                rotation: (level * Math.PI) / 16
            });
        }
        
        return { type: 'star', elements: shapes };
    }

    generateSquareMandala(config, rng) {
        const { symmetry, complexity } = config;
        const shapes = [];
        const size = 100;
        
        // Central square
        shapes.push({
            type: 'square',
            x: 0,
            y: 0,
            size: size,
            rotation: 0
        });
        
        // Rotated squares
        for (let i = 1; i <= complexity; i++) {
            const scale = 1 + (i * 0.2);
            const rotation = (i * Math.PI) / 8;
            
            shapes.push({
                type: 'square',
                x: 0,
                y: 0,
                size: size * scale,
                rotation: rotation
            });
        }
        
        // Corner details based on symmetry
        for (let corner = 0; corner < 4; corner++) {
            const angle = (corner * Math.PI) / 2;
            const distance = size * 0.7;
            const x = distance * Math.cos(angle);
            const y = distance * Math.sin(angle);
            
            shapes.push({
                type: 'circle',
                x: x,
                y: y,
                radius: size * 0.15
            });
        }
        
        return { type: 'mandala', elements: shapes };
    }

    generateTriangleTrinity(config, rng) {
        const { symmetry, complexity } = config;
        const shapes = [];
        const size = 80;
        
        // Three interlocking triangles
        for (let i = 0; i < 3; i++) {
            const rotation = (i * Math.PI * 2) / 3;
            const points = [
                { x: 0, y: -size },
                { x: size * Math.cos(Math.PI / 6), y: size * Math.sin(Math.PI / 6) },
                { x: -size * Math.cos(Math.PI / 6), y: size * Math.sin(Math.PI / 6) }
            ].map(p => ({
                x: p.x * Math.cos(rotation) - p.y * Math.sin(rotation),
                y: p.x * Math.sin(rotation) + p.y * Math.cos(rotation)
            }));
            
            shapes.push({
                type: 'triangle',
                points: points,
                strokeOnly: true
            });
        }
        
        // Add nested complexity
        for (let level = 1; level < complexity; level++) {
            const scale = 1 - (level * 0.2);
            for (let i = 0; i < 3; i++) {
                const rotation = (i * Math.PI * 2) / 3 + (level * Math.PI / 6);
                const points = [
                    { x: 0, y: -size * scale },
                    { x: size * scale * Math.cos(Math.PI / 6), y: size * scale * Math.sin(Math.PI / 6) },
                    { x: -size * scale * Math.cos(Math.PI / 6), y: size * scale * Math.sin(Math.PI / 6) }
                ].map(p => ({
                    x: p.x * Math.cos(rotation) - p.y * Math.sin(rotation),
                    y: p.x * Math.sin(rotation) + p.y * Math.cos(rotation)
                }));
                
                shapes.push({
                    type: 'triangle',
                    points: points,
                    strokeOnly: true,
                    alpha: 1 - (level * 0.2)
                });
            }
        }
        
        return { type: 'trinity', elements: shapes };
    }

    generateInfiniteSpiral(config, rng) {
        const { complexity } = config;
        const points = [];
        
        for (let i = 0; i < complexity * 100; i++) {
            const t = i * 0.1;
            const r = t * 2;
            const angle = t;
            
            const x = r * Math.cos(angle);
            const y = r * Math.sin(angle);
            
            points.push({
                x: x,
                y: y,
                size: Math.max(1, 10 - (i * 0.05))
            });
        }
        
        return { type: 'infinite-spiral', elements: points };
    }

    generateBasicMandala(config, rng) {
        const { symmetry, complexity } = config;
        const shapes = [];
        const radius = 80;
        
        // Central circle
        shapes.push({
            type: 'circle',
            x: 0,
            y: 0,
            radius: radius * 0.2
        });
        
        // Symmetrical pattern
        for (let ring = 1; ring <= complexity; ring++) {
            const ringRadius = radius * (ring / complexity);
            
            for (let i = 0; i < symmetry * ring; i++) {
                const angle = (i * Math.PI * 2) / (symmetry * ring);
                const x = ringRadius * Math.cos(angle);
                const y = ringRadius * Math.sin(angle);
                
                shapes.push({
                    type: 'circle',
                    x: x,
                    y: y,
                    radius: radius * 0.1 * (1 - ring * 0.1)
                });
            }
        }
        
        return { type: 'mandala', elements: shapes };
    }
}

// ========== KONVA TAROT CARD COMPONENT ==========

const KonvaTarotCard = React.memo(({ cardConfig, width = 300, height = 400, selected = false }) => {
    const stageRef = useRef();
    const [palette, setPalette] = useState(null);
    const [geometry, setGeometry] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const colorGenerator = useMemo(() => new ColorPaletteGenerator(), []);
    const geometryGenerator = useMemo(() => new SacredGeometryGenerator(), []);

    useEffect(() => {
        if (!cardConfig) return;

        setIsLoading(true);
        
        // Generate deterministic visuals
        const rng = seedrandom(cardConfig.seed);
        const generatedPalette = colorGenerator.generatePalette(cardConfig);
        const generatedGeometry = geometryGenerator.generate(
            cardConfig.sacredGeometry,
            cardConfig,
            rng
        );

        setPalette(generatedPalette);
        setGeometry(generatedGeometry);
        setIsLoading(false);

        // Update CSS variables for reactive theming
        const root = document.documentElement;
        root.style.setProperty('--card-primary', generatedPalette.primary);
        root.style.setProperty('--card-secondary', generatedPalette.secondary);
        root.style.setProperty('--card-accent', generatedPalette.accent);
        root.style.setProperty('--card-background', generatedPalette.background);
        root.style.setProperty('--card-text', generatedPalette.text);

    }, [cardConfig, colorGenerator, geometryGenerator]);

    const renderGeometry = useCallback(() => {
        if (!geometry || !palette) return null;

        const centerX = width / 2;
        const centerY = height / 2;

        return geometry.elements.map((element, index) => {
            const key = `geo-${index}`;
            
            switch (element.type || geometry.type) {
                case 'circles':
                case 'circle':
                    return (
                        <Circle
                            key={key}
                            x={centerX + (element.x || 0)}
                            y={centerY + (element.y || 0)}
                            radius={element.radius || element.r || 20}
                            fill={palette.gradient[index % palette.gradient.length]}
                            stroke={palette.accent}
                            strokeWidth={2}
                            opacity={element.alpha || 0.7}
                        />
                    );
                    
                case 'spiral':
                case 'infinite-spiral':
                    return (
                        <Circle
                            key={key}
                            x={centerX + element.x}
                            y={centerY + element.y}
                            radius={element.size || 3}
                            fill={palette.gradient[index % palette.gradient.length]}
                            opacity={0.8 - (index * 0.001)}
                        />
                    );
                    
                case 'polygon':
                case 'triangle':
                    const points = element.points.flatMap(p => [
                        centerX + p.x,
                        centerY + p.y
                    ]);
                    return (
                        <Line
                            key={key}
                            points={points}
                            closed={true}
                            fill={element.strokeOnly ? undefined : palette.gradient[index % palette.gradient.length]}
                            stroke={palette.accent}
                            strokeWidth={2}
                            opacity={element.alpha || 0.7}
                        />
                    );
                    
                case 'square':
                    return (
                        <Rect
                            key={key}
                            x={centerX + (element.x || 0) - (element.size || 20) / 2}
                            y={centerY + (element.y || 0) - (element.size || 20) / 2}
                            width={element.size || 40}
                            height={element.size || 40}
                            fill={palette.gradient[index % palette.gradient.length]}
                            stroke={palette.accent}
                            strokeWidth={2}
                            rotation={(element.rotation || 0) * 180 / Math.PI}
                            offsetX={(element.size || 40) / 2}
                            offsetY={(element.size || 40) / 2}
                            opacity={element.alpha || 0.7}
                        />
                    );
                    
                default:
                    return null;
            }
        });
    }, [geometry, palette, width, height]);

    const handleCardClick = useCallback(() => {
        console.log(`Selected card: ${cardConfig.name}`);
        
        // Trigger performance measurement
        if (window.cathedralMonitor) {
            window.cathedralMonitor.recordInteraction('tarot-card-select', 
                { cardName: cardConfig.name, cardId: cardConfig.id },
                { clientX: width/2, clientY: height/2 }
            );
        }
    }, [cardConfig, width, height]);

    if (isLoading) {
        return (
            <div style={{ width, height, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div className="loading-spinner">Loading...</div>
            </div>
        );
    }

    return (
        <div 
            className={`tarot-card ${selected ? 'selected' : ''}`}
            style={{
                width,
                height,
                border: selected ? `3px solid ${palette?.accent}` : '1px solid #ccc',
                borderRadius: '12px',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                transform: selected ? 'scale(1.05)' : 'scale(1)',
                boxShadow: selected ? `0 8px 25px ${palette?.accent}40` : '0 2px 10px rgba(0,0,0,0.1)'
            }}
            onClick={handleCardClick}
        >
            <Stage
                ref={stageRef}
                width={width}
                height={height}
                style={{
                    background: `linear-gradient(135deg, ${palette?.background}, ${palette?.secondary}20)`
                }}
            >
                <Layer>
                    {/* Background gradient */}
                    <Rect
                        width={width}
                        height={height}
                        fillLinearGradientStartPoint={{ x: 0, y: 0 }}
                        fillLinearGradientEndPoint={{ x: width, y: height }}
                        fillLinearGradientColorStops={[
                            0, palette?.background || '#f0f0f0',
                            0.5, palette?.secondary + '20' || '#e0e0e020',
                            1, palette?.primary + '10' || '#d0d0d010'
                        ]}
                    />
                    
                    {/* Sacred geometry */}
                    <Group>
                        {renderGeometry()}
                    </Group>
                    
                    {/* Card name */}
                    <Text
                        x={10}
                        y={height - 40}
                        text={cardConfig.name}
                        fontSize={16}
                        fontFamily="serif"
                        fill={palette?.text || '#333'}
                        fontStyle="bold"
                    />
                    
                    {/* Card number */}
                    <Text
                        x={width - 30}
                        y={10}
                        text={`${cardConfig.id}`}
                        fontSize={14}
                        fontFamily="serif"
                        fill={palette?.accent || '#666'}
                        align="right"
                    />
                </Layer>
            </Stage>
        </div>
    );
});

// ========== P5.JS BACKGROUND COMPONENT ==========

const P5TarotBackground = ({ cardConfig }) => {
    const sketch = useCallback((p5) => {
        let rng;
        let palette;
        let noiseOffset = 0;

        p5.setup = () => {
            p5.createCanvas(window.innerWidth, window.innerHeight);
            p5.colorMode(p5.HSB, 360, 100, 100, 100);
            
            // Initialize with card data
            if (cardConfig) {
                rng = seedrandom(cardConfig.seed + '-background');
                palette = new ColorPaletteGenerator().generatePalette(cardConfig);
            }
        };

        p5.draw = () => {
            if (!cardConfig || !palette) return;
            
            p5.background(0, 0, 5); // Very dark background
            
            // Generative noise background
            for (let x = 0; x < p5.width; x += 20) {
                for (let y = 0; y < p5.height; y += 20) {
                    const noiseVal = p5.noise(
                        x * cardConfig.noiseScale,
                        y * cardConfig.noiseScale,
                        noiseOffset
                    );
                    
                    const hue = (cardConfig.baseHue + noiseVal * 60) % 360;
                    const saturation = 30 + noiseVal * 40;
                    const brightness = 10 + noiseVal * 20;
                    const alpha = noiseVal * 30;
                    
                    p5.fill(hue, saturation, brightness, alpha);
                    p5.noStroke();
                    p5.circle(x, y, noiseVal * 15);
                }
            }
            
            noiseOffset += 0.005;
        };

        p5.updateWithProps = (props) => {
            if (props.cardConfig && props.cardConfig !== cardConfig) {
                cardConfig = props.cardConfig;
                rng = seedrandom(cardConfig.seed + '-background');
                palette = new ColorPaletteGenerator().generatePalette(cardConfig);
            }
        };

        p5.windowResized = () => {
            p5.resizeCanvas(window.innerWidth, window.innerHeight);
        };

    }, [cardConfig]);

    return (
        <Suspense fallback={<div>Loading background...</div>}>
            <P5Wrapper sketch={sketch} cardConfig={cardConfig} />
        </Suspense>
    );
};

// ========== MAIN TAROT VISUAL SYSTEM COMPONENT ==========

const TarotVisualSystem = () => {
    const [selectedCard, setSelectedCard] = useState(null);
    const [viewMode, setViewMode] = useState('grid'); // 'grid', 'single', 'spread'
    const [performanceMode, setPerformanceMode] = useState('high'); // 'high', 'medium', 'low'
    const [isBackgroundEnabled, setIsBackgroundEnabled] = useState(true);

    useEffect(() => {
        // Performance monitoring integration
        if (window.cathedralMonitor) {
            const marker = window.cathedralMonitor.markOperation('tarot-system-init');
            
            // Simulate initialization time
            setTimeout(() => {
                marker.end();
            }, 100);
        }
    }, []);

    const handleCardSelect = useCallback((card) => {
        setSelectedCard(card);
        
        // Performance tracking
        if (window.cathedralMonitor) {
            window.cathedralMonitor.recordInteraction('card-selection', card, {
                clientX: window.innerWidth / 2,
                clientY: window.innerHeight / 2
            });
        }
    }, []);

    const getCardSize = useMemo(() => {
        switch (performanceMode) {
            case 'low':
                return { width: 150, height: 200 };
            case 'medium':
                return { width: 200, height: 267 };
            case 'high':
            default:
                return { width: 300, height: 400 };
        }
    }, [performanceMode]);

    const renderGridView = () => (
        <div 
            className="tarot-grid"
            style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '20px',
                padding: '20px',
                maxWidth: '1400px',
                margin: '0 auto'
            }}
        >
            {MAJOR_ARCANA_CONFIG.map((card) => (
                <KonvaTarotCard
                    key={card.id}
                    cardConfig={card}
                    width={getCardSize.width}
                    height={getCardSize.height}
                    selected={selectedCard?.id === card.id}
                    onClick={() => handleCardSelect(card)}
                />
            ))}
        </div>
    );

    const renderSingleView = () => (
        <div 
            className="tarot-single"
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '40px'
            }}
        >
            {selectedCard && (
                <>
                    <KonvaTarotCard
                        cardConfig={selectedCard}
                        width={400}
                        height={533}
                        selected={true}
                    />
                    <div style={{ marginTop: '20px', textAlign: 'center', maxWidth: '600px' }}>
                        <h2 style={{ color: 'var(--card-primary)' }}>{selectedCard.name}</h2>
                        <p style={{ color: 'var(--card-text)', fontSize: '16px', lineHeight: '1.6' }}>
                            {selectedCard.symbolism}
                        </p>
                        <div style={{ marginTop: '15px', fontSize: '14px', color: 'var(--card-accent)' }}>
                            Sacred Geometry: {selectedCard.sacredGeometry.replace('-', ' ').toUpperCase()}
                        </div>
                    </div>
                </>
            )}
            
            <div style={{ marginTop: '30px' }}>
                <button 
                    onClick={() => setViewMode('grid')}
                    style={{
                        padding: '10px 20px',
                        background: 'var(--card-primary)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer'
                    }}
                >
                    Back to Grid
                </button>
            </div>
        </div>
    );

    const renderSpreadView = () => (
        <div 
            className="tarot-spread"
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '40px',
                minHeight: '80vh'
            }}
        >
            {/* Three-card spread example */}
            <div style={{ display: 'flex', gap: '30px' }}>
                {MAJOR_ARCANA_CONFIG.slice(0, 3).map((card, index) => (
                    <div key={card.id} style={{ textAlign: 'center' }}>
                        <KonvaTarotCard
                            cardConfig={card}
                            width={getCardSize.width}
                            height={getCardSize.height}
                            selected={selectedCard?.id === card.id}
                            onClick={() => handleCardSelect(card)}
                        />
                        <div style={{ marginTop: '10px', fontSize: '14px', color: 'var(--card-accent)' }}>
                            {['Past', 'Present', 'Future'][index]}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div className="tarot-visual-system">
            {/* Performance Background */}
            {isBackgroundEnabled && selectedCard && (
                <div style={{ position: 'fixed', top: 0, left: 0, zIndex: -1 }}>
                    <P5TarotBackground cardConfig={selectedCard} />
                </div>
            )}

            {/* Controls */}
            <div 
                className="tarot-controls"
                style={{
                    position: 'fixed',
                    top: '20px',
                    right: '20px',
                    zIndex: 1000,
                    background: 'rgba(255, 255, 255, 0.9)',
                    padding: '15px',
                    borderRadius: '8px',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
                }}
            >
                <div style={{ marginBottom: '10px' }}>
                    <label>View Mode: </label>
                    <select 
                        value={viewMode} 
                        onChange={(e) => setViewMode(e.target.value)}
                        style={{ marginLeft: '10px' }}
                    >
                        <option value="grid">Grid View</option>
                        <option value="single">Single Card</option>
                        <option value="spread">Three-Card Spread</option>
                    </select>
                </div>
                
                <div style={{ marginBottom: '10px' }}>
                    <label>Performance: </label>
                    <select 
                        value={performanceMode} 
                        onChange={(e) => setPerformanceMode(e.target.value)}
                        style={{ marginLeft: '10px' }}
                    >
                        <option value="high">High Quality</option>
                        <option value="medium">Medium Quality</option>
                        <option value="low">Low Quality</option>
                    </select>
                </div>
                
                <div>
                    <label>
                        <input
                            type="checkbox"
                            checked={isBackgroundEnabled}
                            onChange={(e) => setIsBackgroundEnabled(e.target.checked)}
                            style={{ marginRight: '8px' }}
                        />
                        Animated Background
                    </label>
                </div>
            </div>

            {/* Main Content */}
            <div className="tarot-content">
                {viewMode === 'grid' && renderGridView()}
                {viewMode === 'single' && renderSingleView()}
                {viewMode === 'spread' && renderSpreadView()}
            </div>

            {/* Performance Display */}
            {window.cathedralMonitor && (
                <div 
                    style={{
                        position: 'fixed',
                        bottom: '20px',
                        left: '20px',
                        background: 'rgba(0, 0, 0, 0.8)',
                        color: 'white',
                        padding: '10px',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontFamily: 'monospace'
                    }}
                >
                    🚀 Performance Monitor Active
                </div>
            )}

            {/* CSS Variables for Theming */}
            <style jsx>{`
                .tarot-card {
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                }
                
                .tarot-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
                }
                
                .tarot-card.selected {
                    box-shadow: 0 15px 40px var(--card-accent, #007bff);
                }
                
                .loading-spinner {
                    width: 40px;
                    height: 40px;
                    border: 3px solid #f3f3f3;
                    border-top: 3px solid var(--card-primary, #007bff);
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                }
                
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                
                .tarot-grid {
                    animation: fadeIn 0.6s ease-out;
                }
                
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                @media (prefers-reduced-motion: reduce) {
                    .tarot-card,
                    .tarot-grid {
                        transition: none;
                        animation: none;
                    }
                }
            `}</style>
        </div>
    );
};

// ========== EXPORT ==========

export default TarotVisualSystem;
export {
    MAJOR_ARCANA_CONFIG,
    ColorPaletteGenerator,
    SacredGeometryGenerator,
    KonvaTarotCard,
    P5TarotBackground
};