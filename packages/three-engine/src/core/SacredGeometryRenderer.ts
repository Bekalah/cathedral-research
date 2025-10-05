import * as THREE from 'three';
import { MysticalMaterials } from './MysticalMaterials';
import { CathedralLighting } from './CathedralLighting';

/**
 * SacredGeometryRenderer
 * Renders sacred geometric forms with mystical properties
 */
export class SacredGeometryRenderer {
  private scene: THREE.Scene;
  private materials: MysticalMaterials;
  private lighting: CathedralLighting;
  private geometryCache: Map<string, THREE.BufferGeometry> = new Map();

  constructor(scene: THREE.Scene) {
    this.scene = scene;
    this.materials = new MysticalMaterials();
    this.lighting = new CathedralLighting(scene);
  }

  /**
   * Render Flower of Life pattern
   */
  renderFlowerOfLife(center: THREE.Vector3, radius: number, layers: number = 3): THREE.Group {
    const group = new THREE.Group();

    for (let layer = 1; layer <= layers; layer++) {
      const layerRadius = radius * (layer / layers);
      const circles = this.createFlowerOfLifeLayer(layerRadius, layer);

      circles.forEach(circle => {
        circle.position.copy(center);
        group.add(circle);
      });
    }

    // Add central point
    const centerGeometry = new THREE.SphereGeometry(0.05, 8, 8);
    const centerMaterial = this.materials.createAuraMaterial({
      color: 0x88ccff,
      intensity: 0.8,
      opacity: 0.8
    });
    const centerPoint = new THREE.Mesh(centerGeometry, centerMaterial);
    centerPoint.position.copy(center);
    group.add(centerPoint);

    this.scene.add(group);
    return group;
  }

  /**
   * Create a single layer of Flower of Life pattern
   */
  private createFlowerOfLifeLayer(radius: number, points: number): THREE.Mesh[] {
    const meshes: THREE.Mesh[] = [];
    const angleStep = (Math.PI * 2) / points;

    for (let i = 0; i < points; i++) {
      const angle = i * angleStep;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;

      const circleGeometry = new THREE.RingGeometry(radius * 0.95, radius * 1.05, 32);
      const circleMaterial = this.materials.createSacredGeometryMaterial();

      const circle = new THREE.Mesh(circleGeometry, circleMaterial);
      circle.rotation.x = -Math.PI / 2; // Lay flat
      circle.position.set(x, 0, z);

      meshes.push(circle);
    }

    return meshes;
  }

  /**
   * Render Metatron's Cube
   */
  renderMetatronsCube(center: THREE.Vector3, size: number): THREE.Group {
    const group = new THREE.Group();

    // Create the 13 spheres of Metatron's Cube
    const spherePositions = this.calculateMetatronPositions(size);

    spherePositions.forEach((position, index) => {
      const sphereGeometry = new THREE.SphereGeometry(0.1, 12, 12);
      const sphereMaterial = this.materials.createAuraMaterial({
        color: 0xff6b6b,
        intensity: 0.7,
        opacity: 0.8
      });

      const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
      sphere.position.copy(center).add(position);
      group.add(sphere);

      // Add connecting lines between spheres
      if (index > 0) {
        const lines = this.createMetatronConnections(spherePositions, index, center);
        lines.forEach(line => group.add(line));
      }
    });

    this.scene.add(group);
    return group;
  }

  /**
   * Calculate positions for Metatron's Cube spheres
   */
  private calculateMetatronPositions(size: number): THREE.Vector3[] {
    const positions: THREE.Vector3[] = [];
    const phi = (1 + Math.sqrt(5)) / 2; // Golden ratio

    // Central sphere
    positions.push(new THREE.Vector3(0, 0, 0));

    // Inner ring (6 spheres)
    for (let i = 0; i < 6; i++) {
      const angle = (i * Math.PI) / 3;
      positions.push(new THREE.Vector3(
        Math.cos(angle) * size,
        0,
        Math.sin(angle) * size
      ));
    }

    // Outer ring (6 spheres)
    for (let i = 0; i < 6; i++) {
      const angle = (i * Math.PI) / 3 + Math.PI / 6;
      positions.push(new THREE.Vector3(
        Math.cos(angle) * size * phi,
        0,
        Math.sin(angle) * size * phi
      ));
    }

    return positions;
  }

  /**
   * Create connecting lines for Metatron's Cube
   */
  private createMetatronConnections(positions: THREE.Vector3[], currentIndex: number, center: THREE.Vector3): THREE.Line[] {
    const lines: THREE.Line[] = [];

    for (let i = 0; i < currentIndex; i++) {
      const geometry = new THREE.BufferGeometry().setFromPoints([
        positions[currentIndex].clone().add(center),
        positions[i].clone().add(center)
      ]);

      const material = new THREE.LineBasicMaterial({
        color: 0x88ccff,
        transparent: true,
        opacity: 0.4
      });

      lines.push(new THREE.Line(geometry, material));
    }

    return lines;
  }

  /**
   * Render Sri Yantra pattern
   */
  renderSriYantra(center: THREE.Vector3, size: number): THREE.Group {
    const group = new THREE.Group();

    // Create multiple interlocking triangles and circles
    const triangles = this.createSriYantraTriangles(size);
    triangles.forEach(triangle => {
      triangle.position.copy(center);
      group.add(triangle);
    });

    // Add lotus petals around the edge
    const petals = this.createLotusPetals(size * 1.2);
    petals.forEach(petal => {
      petal.position.copy(center);
      group.add(petal);
    });

    this.scene.add(group);
    return group;
  }

  /**
   * Create Sri Yantra triangular components
   */
  private createSriYantraTriangles(size: number): THREE.Mesh[] {
    const triangles: THREE.Mesh[] = [];

    // Upward triangles (masculine energy)
    const upwardTriangleGeometry = new THREE.BufferGeometry();
    const upwardVertices = new Float32Array([
      -size, 0, 0,
      size, 0, 0,
      0, size * 1.5, 0
    ]);
    upwardTriangleGeometry.setAttribute('position', new THREE.BufferAttribute(upwardVertices, 3));

    const upwardMaterial = this.materials.createSacredGeometryMaterial();
    const upwardTriangle = new THREE.Mesh(upwardTriangleGeometry, upwardMaterial);
    triangles.push(upwardTriangle);

    // Downward triangles (feminine energy)
    const downwardTriangleGeometry = new THREE.BufferGeometry();
    const downwardVertices = new Float32Array([
      -size, 0, 0,
      size, 0, 0,
      0, -size * 1.5, 0
    ]);
    downwardTriangleGeometry.setAttribute('position', new THREE.BufferAttribute(downwardVertices, 3));

    const downwardMaterial = this.materials.createSacredGeometryMaterial();
    const downwardTriangle = new THREE.Mesh(downwardTriangleGeometry, downwardMaterial);
    triangles.push(downwardTriangle);

    return triangles;
  }

  /**
   * Create lotus petal decorations
   */
  private createLotusPetals(radius: number): THREE.Mesh[] {
    const petals: THREE.Mesh[] = [];
    const petalCount = 16;

    for (let i = 0; i < petalCount; i++) {
      const angle = (i / petalCount) * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;

      const petalGeometry = new THREE.SphereGeometry(0.1, 8, 6, 0, Math.PI * 2, 0, Math.PI / 2);
      const petalMaterial = this.materials.createAuraMaterial({
        color: 0xff69b4,
        intensity: 0.6,
        opacity: 0.8
      });

      const petal = new THREE.Mesh(petalGeometry, petalMaterial);
      petal.position.set(x, 0, z);
      petal.rotation.z = angle;

      petals.push(petal);
    }

    return petals;
  }

  /**
   * Render Platonic Solids
   */
  renderPlatonicSolid(center: THREE.Vector3, type: 'tetrahedron' | 'cube' | 'octahedron' | 'dodecahedron' | 'icosahedron', size: number): THREE.Mesh {
    let geometry: THREE.BufferGeometry;

    switch (type) {
      case 'tetrahedron':
        geometry = new THREE.TetrahedronGeometry(size);
        break;
      case 'cube':
        geometry = new THREE.BoxGeometry(size, size, size);
        break;
      case 'octahedron':
        geometry = new THREE.OctahedronGeometry(size);
        break;
      case 'dodecahedron':
        geometry = new THREE.DodecahedronGeometry(size);
        break;
      case 'icosahedron':
        geometry = new THREE.IcosahedronGeometry(size);
        break;
      default:
        geometry = new THREE.OctahedronGeometry(size);
    }

    const material = this.materials.createSacredGeometryMaterial();
    const solid = new THREE.Mesh(geometry, material);
    solid.position.copy(center);

    // Add wireframe overlay
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0x444444,
      wireframe: true,
      transparent: true,
      opacity: 0.3
    });
    const wireframe = new THREE.Mesh(geometry, wireframeMaterial);
    wireframe.position.copy(center);
    solid.add(wireframe);

    this.scene.add(solid);
    return solid;
  }

  /**
   * Animate sacred geometry with mystical energy patterns
   */
  animateSacredGeometry(object: THREE.Object3D, animationType: 'pulse' | 'rotate' | 'breathe' | 'flow'): void {
    const animate = () => {
      requestAnimationFrame(animate);

      const time = Date.now() * 0.001;

      switch (animationType) {
        case 'pulse':
          object.scale.setScalar(1 + Math.sin(time * 2) * 0.1);
          break;
        case 'rotate':
          object.rotation.y = time * 0.5;
          break;
        case 'breathe':
          const breatheScale = 1 + Math.sin(time) * 0.05;
          object.scale.setScalar(breatheScale);
          break;
        case 'flow':
          object.rotation.x = Math.sin(time * 0.3) * 0.2;
          object.rotation.y = time * 0.2;
          break;
      }
    };
    animate();
  }

  /**
   * Clear all sacred geometry from scene
   */
  clearSacredGeometry(): void {
    const objectsToRemove: THREE.Object3D[] = [];

    this.scene.traverse((object) => {
      if (object.userData && object.userData.sacredGeometry) {
        objectsToRemove.push(object);
      }
    });

    objectsToRemove.forEach(object => {
      this.scene.remove(object);
      const mesh = object as THREE.Mesh;
      if (mesh.geometry) mesh.geometry.dispose();
      if (mesh.material) {
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach((material: THREE.Material) => material.dispose());
        } else {
          mesh.material.dispose();
        }
      }
    });
  }
}

export default SacredGeometryRenderer;
