import * as THREE from 'three';

/**
 * Vector3D - 3D vector representation
 */
export interface Vector3D {
  x: number;
  y: number;
  z: number;
}

/**
 * Matrix3D - 3x3 matrix for transformations
 */
export interface Matrix3D {
  m11: number; m12: number; m13: number;
  m21: number; m22: number; m23: number;
  m31: number; m32: number; m33: number;
}

/**
 * GeometricForm - Base interface for sacred geometric forms
 */
export interface GeometricForm {
  vertices: Vector3D[];
  edges: [number, number][];
  faces?: [number, number, number][];
  center: Vector3D;
  radius: number;
}

/**
 * SacredGeometryEngine - Core engine for sacred geometric calculations
 */
export class SacredGeometryEngine {
  private static readonly GOLDEN_RATIO = (1 + Math.sqrt(5)) / 2;
  private static readonly TAU = Math.PI * 2;

  /**
   * Calculate vertices for Platonic solids
   */
  static generatePlatonicVertices(type: 'tetrahedron' | 'cube' | 'octahedron' | 'dodecahedron' | 'icosahedron', size: number = 1.0): Vector3D[] {
    switch (type) {
      case 'tetrahedron':
        return this.generateTetrahedronVertices(size);
      case 'cube':
        return this.generateCubeVertices(size);
      case 'octahedron':
        return this.generateOctahedronVertices(size);
      case 'dodecahedron':
        return this.generateDodecahedronVertices(size);
      case 'icosahedron':
        return this.generateIcosahedronVertices(size);
      default:
        return this.generateOctahedronVertices(size);
    }
  }

  /**
   * Generate tetrahedron vertices
   */
  private static generateTetrahedronVertices(size: number): Vector3D[] {
    const vertices: Vector3D[] = [
      { x: size, y: size, z: size },
      { x: -size, y: -size, z: size },
      { x: -size, y: size, z: -size },
      { x: size, y: -size, z: -size }
    ];

    // Scale to proper size
    const scale = size / Math.sqrt(3);
    return vertices.map(v => ({
      x: v.x * scale,
      y: v.y * scale,
      z: v.z * scale
    }));
  }

  /**
   * Generate cube vertices
   */
  private static generateCubeVertices(size: number): Vector3D[] {
    const s = size / 2;
    return [
      { x: s, y: s, z: s },
      { x: -s, y: s, z: s },
      { x: -s, y: -s, z: s },
      { x: s, y: -s, z: s },
      { x: s, y: s, z: -s },
      { x: -s, y: s, z: -s },
      { x: -s, y: -s, z: -s },
      { x: s, y: -s, z: -s }
    ];
  }

  /**
   * Generate octahedron vertices
   */
  private static generateOctahedronVertices(size: number): Vector3D[] {
    return [
      { x: 0, y: size, z: 0 },
      { x: 0, y: -size, z: 0 },
      { x: size, y: 0, z: 0 },
      { x: -size, y: 0, z: 0 },
      { x: 0, y: 0, z: size },
      { x: 0, y: 0, z: -size }
    ];
  }

  /**
   * Generate dodecahedron vertices using golden ratio
   */
  private static generateDodecahedronVertices(size: number): Vector3D[] {
    const phi = this.GOLDEN_RATIO;
    const vertices: Vector3D[] = [];

    // Generate vertices using golden ratio coordinates
    const coords = [
      { x: 1, y: 1, z: 1 },
      { x: 1, y: 1, z: -1 },
      { x: 1, y: -1, z: 1 },
      { x: 1, y: -1, z: -1 },
      { x: -1, y: 1, z: 1 },
      { x: -1, y: 1, z: -1 },
      { x: -1, y: -1, z: 1 },
      { x: -1, y: -1, z: -1 },
      { x: 0, y: phi, z: 1/phi },
      { x: 0, y: phi, z: -1/phi },
      { x: 0, y: -phi, z: 1/phi },
      { x: 0, y: -phi, z: -1/phi },
      { x: phi, y: 1/phi, z: 0 },
      { x: phi, y: -1/phi, z: 0 },
      { x: -phi, y: 1/phi, z: 0 },
      { x: -phi, y: -1/phi, z: 0 },
      { x: 1/phi, y: 0, z: phi },
      { x: 1/phi, y: 0, z: -phi },
      { x: -1/phi, y: 0, z: phi },
      { x: -1/phi, y: 0, z: -phi }
    ];

    // Normalize and scale
    const scale = size / Math.sqrt(3);
    coords.forEach(coord => {
      const length = Math.sqrt(coord.x * coord.x + coord.y * coord.y + coord.z * coord.z);
      vertices.push({
        x: coord.x * scale / length,
        y: coord.y * scale / length,
        z: coord.z * scale / length
      });
    });

    return vertices;
  }

  /**
   * Generate icosahedron vertices
   */
  private static generateIcosahedronVertices(size: number): Vector3D[] {
    const phi = this.GOLDEN_RATIO;
    const vertices: Vector3D[] = [];

    // Generate vertices using golden ratio
    const coords = [
      { x: 0, y: 1, z: phi },
      { x: 0, y: 1, z: -phi },
      { x: 0, y: -1, z: phi },
      { x: 0, y: -1, z: -phi },
      { x: 1, y: phi, z: 0 },
      { x: 1, y: -phi, z: 0 },
      { x: -1, y: phi, z: 0 },
      { x: -1, y: -phi, z: 0 },
      { x: phi, y: 0, z: 1 },
      { x: phi, y: 0, z: -1 },
      { x: -phi, y: 0, z: 1 },
      { x: -phi, y: 0, z: -1 }
    ];

    // Normalize and scale
    const scale = size / Math.sqrt(2 + phi);
    coords.forEach(coord => {
      const length = Math.sqrt(coord.x * coord.x + coord.y * coord.y + coord.z * coord.z);
      vertices.push({
        x: coord.x * scale / length,
        y: coord.y * scale / length,
        z: coord.z * scale / length
      });
    });

    return vertices;
  }

  /**
   * Generate Flower of Life pattern vertices
   */
  static generateFlowerOfLifeVertices(center: Vector3D, radius: number, layers: number = 3): Vector3D[] {
    const vertices: Vector3D[] = [];

    for (let layer = 1; layer <= layers; layer++) {
      const layerRadius = radius * (layer / layers);
      const pointsInLayer = layer * 6; // Hexagonal pattern

      for (let i = 0; i < pointsInLayer; i++) {
        const angle = (this.TAU * i) / pointsInLayer;
        vertices.push({
          x: center.x + Math.cos(angle) * layerRadius,
          y: center.y,
          z: center.z + Math.sin(angle) * layerRadius
        });
      }
    }

    return vertices;
  }

  /**
   * Generate Metatron's Cube vertices
   */
  static generateMetatronsCubeVertices(center: Vector3D, size: number): Vector3D[] {
    const vertices: Vector3D[] = [];
    const phi = this.GOLDEN_RATIO;

    // Central point
    vertices.push({ ...center });

    // Inner ring (6 points)
    for (let i = 0; i < 6; i++) {
      const angle = (this.TAU * i) / 6;
      vertices.push({
        x: center.x + Math.cos(angle) * size,
        y: center.y,
        z: center.z + Math.sin(angle) * size
      });
    }

    // Outer ring (6 points)
    for (let i = 0; i < 6; i++) {
      const angle = (this.TAU * i) / 6 + this.TAU / 12;
      vertices.push({
        x: center.x + Math.cos(angle) * size * phi,
        y: center.y,
        z: center.z + Math.sin(angle) * size * phi
      });
    }

    return vertices;
  }

  /**
   * Generate Sri Yantra pattern vertices
   */
  static generateSriYantraVertices(center: Vector3D, size: number): Vector3D[] {
    const vertices: Vector3D[] = [];

    // Generate multiple layers of triangles
    const layers = 5;
    for (let layer = 1; layer <= layers; layer++) {
      const layerSize = size * (layer / layers);

      // Upward triangles (masculine energy)
      vertices.push(
        { x: center.x, y: center.y + layerSize * 1.5, z: center.z },
        { x: center.x - layerSize, y: center.y, z: center.z },
        { x: center.x + layerSize, y: center.y, z: center.z }
      );

      // Downward triangles (feminine energy)
      vertices.push(
        { x: center.x, y: center.y - layerSize * 1.5, z: center.z },
        { x: center.x - layerSize, y: center.y, z: center.z },
        { x: center.x + layerSize, y: center.y, z: center.z }
      );
    }

    return vertices;
  }

  /**
   * Calculate sacred geometry properties
   */
  static calculateSacredProperties(vertices: Vector3D[]): {
    center: Vector3D;
    radius: number;
    volume: number;
    surfaceArea: number;
  } {
    const center = this.calculateCentroid(vertices);
    const radius = this.calculateBoundingSphereRadius(vertices, center);
    const volume = this.calculateVolume(vertices);
    const surfaceArea = this.calculateSurfaceArea(vertices);

    return { center, radius, volume, surfaceArea };
  }

  /**
   * Calculate centroid of vertices
   */
  private static calculateCentroid(vertices: Vector3D[]): Vector3D {
    const sum = vertices.reduce(
      (acc, v) => ({ x: acc.x + v.x, y: acc.y + v.y, z: acc.z + v.z }),
      { x: 0, y: 0, z: 0 }
    );

    return {
      x: sum.x / vertices.length,
      y: sum.y / vertices.length,
      z: sum.z / vertices.length
    };
  }

  /**
   * Calculate bounding sphere radius
   */
  private static calculateBoundingSphereRadius(vertices: Vector3D[], center: Vector3D): number {
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
  }

  /**
   * Calculate approximate volume (for convex shapes)
   */
  private static calculateVolume(vertices: Vector3D[]): number {
    // Simplified volume calculation using bounding box
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
  }

  /**
   * Calculate approximate surface area
   */
  private static calculateSurfaceArea(vertices: Vector3D[]): number {
    // Simplified surface area calculation
    const radius = this.calculateBoundingSphereRadius(vertices, this.calculateCentroid(vertices));
    return 4 * Math.PI * radius * radius;
  }

  /**
   * Apply sacred geometry transformations
   */
  static applyTransformation(vertices: Vector3D[], transformation: 'rotate' | 'scale' | 'translate' | 'spiral', parameters: any): Vector3D[] {
    switch (transformation) {
      case 'rotate':
        return this.rotateVertices(vertices, parameters.axis, parameters.angle);
      case 'scale':
        return this.scaleVertices(vertices, parameters.factor);
      case 'translate':
        return this.translateVertices(vertices, parameters.offset);
      case 'spiral':
        return this.applySpiralTransformation(vertices, parameters.turns, parameters.height);
      default:
        return vertices;
    }
  }

  /**
   * Rotate vertices around an axis
   */
  private static rotateVertices(vertices: Vector3D[], axis: Vector3D, angle: number): Vector3D[] {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    const { x, y, z } = axis;

    // Normalize axis
    const length = Math.sqrt(x * x + y * y + z * z);
    const nx = x / length;
    const ny = y / length;
    const nz = z / length;

    return vertices.map(vertex => {
      const vx = vertex.x;
      const vy = vertex.y;
      const vz = vertex.z;

      // Rodrigues' rotation formula
      const dot = vx * nx + vy * ny + vz * nz;
      const crossX = ny * vz - nz * vy;
      const crossY = nz * vx - nx * vz;
      const crossZ = nx * vy - ny * vx;

      return {
        x: vx * cos + crossX * sin + nx * dot * (1 - cos),
        y: vy * cos + crossY * sin + ny * dot * (1 - cos),
        z: vz * cos + crossZ * sin + nz * dot * (1 - cos)
      };
    });
  }

  /**
   * Scale vertices from center
   */
  private static scaleVertices(vertices: Vector3D[], factor: number): Vector3D[] {
    const center = this.calculateCentroid(vertices);

    return vertices.map(vertex => ({
      x: center.x + (vertex.x - center.x) * factor,
      y: center.y + (vertex.y - center.y) * factor,
      z: center.z + (vertex.z - center.z) * factor
    }));
  }

  /**
   * Translate vertices
   */
  private static translateVertices(vertices: Vector3D[], offset: Vector3D): Vector3D[] {
    return vertices.map(vertex => ({
      x: vertex.x + offset.x,
      y: vertex.y + offset.y,
      z: vertex.z + offset.z
    }));
  }

  /**
   * Apply spiral transformation
   */
  private static applySpiralTransformation(vertices: Vector3D[], turns: number, height: number): Vector3D[] {
    const center = this.calculateCentroid(vertices);

    return vertices.map((vertex, index) => {
      const distance = Math.sqrt(
        Math.pow(vertex.x - center.x, 2) +
        Math.pow(vertex.z - center.z, 2)
      );

      const angle = Math.atan2(vertex.z - center.z, vertex.x - center.x);
      const spiralAngle = angle + (distance * turns * this.TAU) / Math.max(...vertices.map(v =>
        Math.sqrt(Math.pow(v.x - center.x, 2) + Math.pow(v.z - center.z, 2))
      ));

      const spiralHeight = (vertex.y - center.y) + (index / vertices.length) * height;

      return {
        x: center.x + Math.cos(spiralAngle) * distance,
        y: center.y + spiralHeight,
        z: center.z + Math.sin(spiralAngle) * distance
      };
    });
  }

  /**
   * Generate sacred geometry harmonics
   */
  static generateHarmonics(baseFrequency: number, harmonics: number): number[] {
    const harmonicSeries: number[] = [];

    for (let i = 1; i <= harmonics; i++) {
      harmonicSeries.push(baseFrequency * i);
    }

    return harmonicSeries;
  }

  /**
   * Calculate golden ratio proportions
   */
  static calculateGoldenRatioProportions(totalLength: number): { sections: number[], ratios: number[] } {
    const phi = this.GOLDEN_RATIO;
    const sections: number[] = [];
    const ratios: number[] = [];

    // Generate golden ratio divisions
    let remaining = totalLength;
    let current = totalLength / phi;

    while (current > totalLength * 0.01) {
      sections.push(current);
      ratios.push(current / totalLength);
      remaining -= current;
      current = remaining / phi;
    }

    return { sections, ratios };
  }

  /**
   * Convert Vector3D to THREE.Vector3
   */
  static vector3DToThree(vector: Vector3D): THREE.Vector3 {
    return new THREE.Vector3(vector.x, vector.y, vector.z);
  }

  /**
   * Convert THREE.Vector3 to Vector3D
   */
  static threeToVector3D(vector: THREE.Vector3): Vector3D {
    return { x: vector.x, y: vector.y, z: vector.z };
  }

  /**
   * Generate complete geometric form data
   */
  static generateGeometricForm(type: string, size: number, center: Vector3D = { x: 0, y: 0, z: 0 }): GeometricForm {
    const vertices = this.generatePlatonicVertices(type as any, size);

    return {
      vertices,
      edges: this.generateEdges(vertices),
      faces: this.generateFaces(vertices),
      center,
      radius: this.calculateBoundingSphereRadius(vertices, center)
    };
  }

  /**
   * Generate edges for wireframe rendering
   */
  private static generateEdges(vertices: Vector3D[]): [number, number][] {
    // Simple edge generation - connect each vertex to the next
    const edges: [number, number][] = [];

    for (let i = 0; i < vertices.length; i++) {
      edges.push([i, (i + 1) % vertices.length]);
    }

    return edges;
  }

  /**
   * Generate faces for surface rendering
   */
  private static generateFaces(vertices: Vector3D[]): [number, number, number][] {
    // Simple face generation - create triangular faces
    const faces: [number, number, number][] = [];

    for (let i = 0; i < vertices.length - 2; i++) {
      faces.push([0, i + 1, i + 2]);
    }

    return faces;
  }
}

export default SacredGeometryEngine;
