import { useState, useEffect, useRef, useCallback, useMemo } from 'react';

/**
 * useSacredGeometry - Advanced sacred geometry calculation hook
 *
 * Mathematical Foundation:
 * - Platonic solids: Regular polyhedra with identical faces, angles, and vertices
 * - Archimedean solids: Semi-regular polyhedra with multiple polygon types
 * - Golden ratio: φ = (1 + √5)/2 ≈ 1.618033988749
 * - Fibonacci sequence: Each number is sum of previous two (1, 1, 2, 3, 5, 8, 13...)
 * - Fractal geometry: Self-similar patterns at different scales
 * - Sacred numbers: 3, 7, 12, 33, 99, 144 representing cosmic principles
 *
 * Inspired by:
 * - Metatron's Cube: Sacred geometry pattern containing all Platonic solids
 * - Flower of Life: Overlapping circles creating sacred proportions
 * - Sri Yantra: Complex mandala representing cosmic creation
 * - Kabbalistic Tree of Life: 10 sephiroth connected by 22 paths
 */

export interface SacredGeometryConfig {
  // Geometric parameters
  type: 'platonic' | 'archimedean' | 'flower-of-life' | 'metatron-cube' | 'sri-yantra' | 'tree-of-life' | 'fractal';
  size: number;
  complexity: number;
  iterations: number;

  // Mathematical parameters
  goldenRatio: boolean;
  fibonacci: boolean;
  symmetry: number;

  // Visual parameters
  showWireframe: boolean;
  showFaces: boolean;
  showVertices: boolean;
  animationSpeed: number;

  // Mystical parameters
  chakra: 'root' | 'sacral' | 'solar' | 'heart' | 'throat' | 'third-eye' | 'crown';
  element: 'earth' | 'water' | 'fire' | 'air' | 'ether';
  frequency: number; // Associated frequency in Hz
}

export interface GeometricForm {
  vertices: Vector3D[];
  edges: [number, number][];
  faces: [number, number, number][];
  center: Vector3D;
  radius: number;
  volume: number;
  surfaceArea: number;
  sacredRatio: number;
}

export interface Vector3D {
  x: number;
  y: number;
  z: number;
}

export interface SacredGeometryState {
  currentForm: GeometricForm | null;
  isGenerating: boolean;
  progress: number;
  sacredProperties: {
    goldenRatio: number;
    fibonacciSequence: number[];
    harmonicRatios: number[];
    sacredNumbers: number[];
  };
  animationPhase: number;
}

/**
 * useSacredGeometry - Advanced sacred geometry calculation hook
 *
 * Provides mathematical precision for:
 * - Platonic solids (tetrahedron, cube, octahedron, dodecahedron, icosahedron)
 * - Golden ratio calculations and Fibonacci sequences
 * - Fractal generation with self-similarity
 * - Sacred number harmonics and proportions
 * - Real-time geometric transformations
 */
export const useSacredGeometry = (config: SacredGeometryConfig) => {
  const [state, setState] = useState<SacredGeometryState>({
    currentForm: null,
    isGenerating: false,
    progress: 0,
    sacredProperties: {
      goldenRatio: (1 + Math.sqrt(5)) / 2,
      fibonacciSequence: [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144],
      harmonicRatios: [1, 1.5, 2, 2.5, 3, 4, 5, 6, 8],
      sacredNumbers: [3, 7, 12, 22, 33, 99, 144]
    },
    animationPhase: 0
  });

  const animationFrameRef = useRef<number | null>(null);
  const generationWorkerRef = useRef<Worker | null>(null);

  // Generate Platonic solid vertices
  const generatePlatonicVertices = useCallback((type: string, size: number): Vector3D[] => {
    const phi = (1 + Math.sqrt(5)) / 2; // Golden ratio

    switch (type) {
      case 'tetrahedron':
        return [
          { x: size, y: size, z: size },
          { x: -size, y: -size, z: size },
          { x: -size, y: size, z: -size },
          { x: size, y: -size, z: -size }
        ].map(v => ({
          x: v.x * Math.sqrt(3) / 3,
          y: v.y * Math.sqrt(3) / 3,
          z: v.z * Math.sqrt(3) / 3
        }));

      case 'cube':
        const s = size / 2;
        return [
          { x: s, y: s, z: s }, { x: -s, y: s, z: s },
          { x: -s, y: -s, z: s }, { x: s, y: -s, z: s },
          { x: s, y: s, z: -s }, { x: -s, y: s, z: -s },
          { x: -s, y: -s, z: -s }, { x: s, y: -s, z: -s }
        ];

      case 'octahedron':
        return [
          { x: 0, y: size, z: 0 }, { x: 0, y: -size, z: 0 },
          { x: size, y: 0, z: 0 }, { x: -size, y: 0, z: 0 },
          { x: 0, y: 0, z: size }, { x: 0, y: 0, z: -size }
        ];

      case 'dodecahedron':
        const vertices: Vector3D[] = [];
        const coords = [
          { x: 1, y: 1, z: 1 }, { x: 1, y: 1, z: -1 }, { x: 1, y: -1, z: 1 }, { x: 1, y: -1, z: -1 },
          { x: -1, y: 1, z: 1 }, { x: -1, y: 1, z: -1 }, { x: -1, y: -1, z: 1 }, { x: -1, y: -1, z: -1 },
          { x: 0, y: phi, z: 1/phi }, { x: 0, y: phi, z: -1/phi }, { x: 0, y: -phi, z: 1/phi }, { x: 0, y: -phi, z: -1/phi },
          { x: phi, y: 1/phi, z: 0 }, { x: phi, y: -1/phi, z: 0 }, { x: -phi, y: 1/phi, z: 0 }, { x: -phi, y: -1/phi, z: 0 },
          { x: 1/phi, y: 0, z: phi }, { x: 1/phi, y: 0, z: -phi }, { x: -1/phi, y: 0, z: phi }, { x: -1/phi, y: 0, z: -phi }
        ];

        coords.forEach(coord => {
          const length = Math.sqrt(coord.x * coord.x + coord.y * coord.y + coord.z * coord.z);
          vertices.push({
            x: coord.x * size / length,
            y: coord.y * size / length,
            z: coord.z * size / length
          });
        });
        return vertices;

      case 'icosahedron':
        const icosaVertices: Vector3D[] = [];
        const phi_coords = [
          { x: 0, y: 1, z: phi }, { x: 0, y: 1, z: -phi }, { x: 0, y: -1, z: phi }, { x: 0, y: -1, z: -phi },
          { x: 1, y: phi, z: 0 }, { x: 1, y: -phi, z: 0 }, { x: -1, y: phi, z: 0 }, { x: -1, y: -phi, z: 0 },
          { x: phi, y: 0, z: 1 }, { x: phi, y: 0, z: -1 }, { x: -phi, y: 0, z: 1 }, { x: -phi, y: 0, z: -1 }
        ];

        phi_coords.forEach(coord => {
          const length = Math.sqrt(coord.x * coord.x + coord.y * coord.y + coord.z * coord.z);
          icosaVertices.push({
            x: coord.x * size / length,
            y: coord.y * size / length,
            z: coord.z * size / length
          });
        });
        return icosaVertices;

      default:
        return generateOctahedronVertices(size);
    }
  }, []);

  // Generate octahedron as default
  const generateOctahedronVertices = useCallback((size: number): Vector3D[] => {
    return [
      { x: 0, y: size, z: 0 }, { x: 0, y: -size, z: 0 },
      { x: size, y: 0, z: 0 }, { x: -size, y: 0, z: 0 },
      { x: 0, y: 0, z: size }, { x: 0, y: 0, z: -size }
    ];
  }, []);

  // Generate Flower of Life pattern
  const generateFlowerOfLife = useCallback((center: Vector3D, radius: number, layers: number): Vector3D[] => {
    const vertices: Vector3D[] = [];

    for (let layer = 1; layer <= layers; layer++) {
      const layerRadius = radius * (layer / layers);
      const pointsInLayer = layer * 6;

      for (let i = 0; i < pointsInLayer; i++) {
        const angle = (i / pointsInLayer) * 2 * Math.PI;
        vertices.push({
          x: center.x + Math.cos(angle) * layerRadius,
          y: center.y,
          z: center.z + Math.sin(angle) * layerRadius
        });
      }
    }

    return vertices;
  }, []);

  // Generate Metatron's Cube
  const generateMetatronsCube = useCallback((center: Vector3D, size: number): Vector3D[] => {
    const vertices: Vector3D[] = [];
    const phi = (1 + Math.sqrt(5)) / 2;

    // Central point
    vertices.push({ ...center });

    // Inner ring (6 points)
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2;
      vertices.push({
        x: center.x + Math.cos(angle) * size,
        y: center.y,
        z: center.z + Math.sin(angle) * size
      });
    }

    // Outer ring (6 points)
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2 + Math.PI / 12;
      vertices.push({
        x: center.x + Math.cos(angle) * size * phi,
        y: center.y,
        z: center.z + Math.sin(angle) * size * phi
      });
    }

    return vertices;
  }, []);

  // Generate fractal pattern
  const generateFractal = useCallback((center: Vector3D, iterations: number, size: number): Vector3D[] => {
    const vertices: Vector3D[] = [];

    // Simple fractal tree generation
    const generateTree = (x: number, y: number, z: number, angle: number, depth: number, length: number) => {
      if (depth === 0) return;

      const endX = x + Math.cos(angle) * length;
      const endY = y;
      const endZ = z + Math.sin(angle) * length;

      vertices.push({ x: endX, y: endY, z: endZ });

      // Recursive branches
      generateTree(endX, endY, endZ, angle - 0.5, depth - 1, length * 0.7);
      generateTree(endX, endY, endZ, angle + 0.5, depth - 1, length * 0.7);
    };

    generateTree(center.x, center.y, center.z, 0, iterations, size);
    return vertices;
  }, []);

  // Calculate sacred properties
  const calculateSacredProperties = useCallback((vertices: Vector3D[]) => {
    const center = calculateCentroid(vertices);
    const radius = calculateBoundingSphereRadius(vertices, center);
    const volume = calculateVolume(vertices);
    const surfaceArea = calculateSurfaceArea(vertices);

    // Calculate golden ratio
    const goldenRatio = (1 + Math.sqrt(5)) / 2;

    // Generate Fibonacci sequence
    const fibonacciSequence = generateFibonacci(12);

    // Calculate harmonic ratios
    const harmonicRatios = fibonacciSequence.map((_, i) =>
      i > 0 ? fibonacciSequence[i] / fibonacciSequence[i - 1] : 1
    );

    return {
      center,
      radius,
      volume,
      surfaceArea,
      goldenRatio,
      fibonacciSequence,
      harmonicRatios,
      sacredRatio: radius / goldenRatio
    };
  }, []);

  // Calculate centroid
  const calculateCentroid = useCallback((vertices: Vector3D[]): Vector3D => {
    const sum = vertices.reduce(
      (acc, v) => ({ x: acc.x + v.x, y: acc.y + v.y, z: acc.z + v.z }),
      { x: 0, y: 0, z: 0 }
    );

    return {
      x: sum.x / vertices.length,
      y: sum.y / vertices.length,
      z: sum.z / vertices.length
    };
  }, []);

  // Calculate bounding sphere radius
  const calculateBoundingSphereRadius = useCallback((vertices: Vector3D[], center: Vector3D): number => {
    let maxDistance = 0;

    vertices.forEach(vertex => {
      const distance = Math.sqrt(
        Math.pow(vertex.x - center.x, 2) +
        Math.pow(vertex.y - center.y, 2) +
        Math.pow(vertex.z - center.z, 2)
      );
      maxDistance = Math.max(maxDistance, distance);
    });

    return maxDistance;
  }, []);

  // Calculate approximate volume
  const calculateVolume = useCallback((vertices: Vector3D[]): number => {
    if (vertices.length < 4) return 0;

    let minX = Infinity, maxX = -Infinity;
    let minY = Infinity, maxY = -Infinity;
    let minZ = Infinity, maxZ = -Infinity;

    vertices.forEach(v => {
      minX = Math.min(minX, v.x);
      maxX = Math.max(maxX, v.x);
      minY = Math.min(minY, v.y);
      maxY = Math.max(maxY, v.y);
      minZ = Math.min(minZ, v.z);
      maxZ = Math.max(maxZ, v.z);
    });

    return (maxX - minX) * (maxY - minY) * (maxZ - minZ);
  }, []);

  // Calculate approximate surface area
  const calculateSurfaceArea = useCallback((vertices: Vector3D[]): number => {
    const radius = calculateBoundingSphereRadius(vertices, calculateCentroid(vertices));
    return 4 * Math.PI * radius * radius;
  }, [calculateBoundingSphereRadius, calculateCentroid]);

  // Generate Fibonacci sequence
  const generateFibonacci = useCallback((count: number): number[] => {
    const sequence = [1, 1];
    for (let i = 2; i < count; i++) {
      sequence[i] = sequence[i - 1] + sequence[i - 2];
    }
    return sequence;
  }, []);

  // Generate geometric form
  const generateForm = useCallback(async (type: string, size: number, center: Vector3D = { x: 0, y: 0, z: 0 }): Promise<GeometricForm> => {
    setState(prev => ({ ...prev, isGenerating: true, progress: 0 }));

    let vertices: Vector3D[] = [];

    switch (type) {
      case 'flower-of-life':
        vertices = generateFlowerOfLife(center, size, config.complexity);
        break;
      case 'metatron-cube':
        vertices = generateMetatronsCube(center, size);
        break;
      case 'fractal':
        vertices = generateFractal(center, config.iterations, size);
        break;
      default:
        vertices = generatePlatonicVertices(type, size);
        break;
    }

    // Simulate progressive generation
    for (let i = 0; i <= 100; i += 10) {
      setState(prev => ({ ...prev, progress: i }));
      await new Promise(resolve => setTimeout(resolve, 10));
    }

    const sacredProperties = calculateSacredProperties(vertices);
    const form: GeometricForm = {
      vertices,
      edges: generateEdges(vertices),
      faces: generateFaces(vertices),
      center,
      radius: sacredProperties.radius,
      volume: sacredProperties.volume,
      surfaceArea: sacredProperties.surfaceArea,
      sacredRatio: sacredProperties.goldenRatio
    };

    setState(prev => ({
      ...prev,
      currentForm: form,
      isGenerating: false,
      progress: 100,
      sacredProperties: {
        goldenRatio: sacredProperties.goldenRatio,
        fibonacciSequence: sacredProperties.fibonacciSequence,
        harmonicRatios: sacredProperties.harmonicRatios,
        sacredNumbers: [3, 7, 12, 22, 33, 99, 144]
      }
    }));

    return form;
  }, [config, generatePlatonicVertices, generateFlowerOfLife, generateMetatronsCube, generateFractal, calculateSacredProperties]);

  // Generate edges for wireframe
  const generateEdges = useCallback((vertices: Vector3D[]): [number, number][] => {
    const edges: [number, number][] = [];

    // Connect each vertex to the next in a cycle
    for (let i = 0; i < vertices.length; i++) {
      edges.push([i, (i + 1) % vertices.length]);
    }

    return edges;
  }, []);

  // Generate faces for surface rendering
  const generateFaces = useCallback((vertices: Vector3D[]): [number, number, number][] => {
    const faces: [number, number, number][] = [];

    // Simple triangulation
    for (let i = 0; i < vertices.length - 2; i++) {
      faces.push([0, i + 1, i + 2]);
    }

    return faces;
  }, []);

  // Animation loop
  useEffect(() => {
    if (!config.animationSpeed) return;

    const animate = () => {
      setState(prev => ({
        ...prev,
        animationPhase: prev.animationPhase + config.animationSpeed * 0.01
      }));
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [config.animationSpeed]);

  // Generate form on config change
  useEffect(() => {
    if (config.type) {
      generateForm(config.type, config.size);
    }
  }, [config, generateForm]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return {
    // State
    ...state,

    // Methods
    generateForm,
    generatePlatonicVertices,
    generateFlowerOfLife,
    generateMetatronsCube,
    generateFractal,
    calculateSacredProperties,

    // Utilities
    calculateCentroid,
    calculateBoundingSphereRadius,
    generateFibonacci,

    // Animation
    animationPhase: state.animationPhase
  };
};

export default useSacredGeometry;
