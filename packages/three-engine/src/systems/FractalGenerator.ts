import * as THREE from 'three';

/**
 * FractalConfig - Configuration for fractal generation
 */
export interface FractalConfig {
  iterations?: number;
  size?: number;
  color?: THREE.Color | string | number;
  wireframe?: boolean;
  animate?: boolean;
  animationSpeed?: number;
}

/**
 * FractalGenerator - Generates mathematical fractals for mystical visualizations
 */
export class FractalGenerator {
  private scene: THREE.Scene;
  private fractals: Map<string, THREE.Object3D> = new Map();

  constructor(scene: THREE.Scene) {
    this.scene = scene;
  }

  /**
   * Generate Mandelbrot set visualization
   */
  generateMandelbrot(center: THREE.Vector3, config: FractalConfig = {}): THREE.Mesh {
    const fractalConfig = {
      iterations: config.iterations || 100,
      size: config.size || 2.0,
      color: config.color || 0x88ccff,
      wireframe: config.wireframe || false,
      animate: config.animate || false,
      animationSpeed: config.animationSpeed || 1.0
    };

    const geometry = this.createMandelbrotGeometry(fractalConfig);
    const material = new THREE.MeshPhongMaterial({
      color: fractalConfig.color,
      wireframe: fractalConfig.wireframe,
      transparent: true,
      opacity: 0.8,
      shininess: 100
    });

    const mandelbrot = new THREE.Mesh(geometry, material);
    mandelbrot.position.copy(center);
    mandelbrot.userData.fractalType = 'mandelbrot';
    mandelbrot.userData.config = fractalConfig;

    this.scene.add(mandelbrot);
    this.fractals.set(`mandelbrot_${Date.now()}`, mandelbrot);

    if (fractalConfig.animate) {
      this.animateMandelbrot(mandelbrot, fractalConfig);
    }

    return mandelbrot;
  }

  /**
   * Generate Julia set visualization
   */
  generateJuliaSet(center: THREE.Vector3, cReal: number = -0.7, cImag: number = 0.27015, config: FractalConfig = {}): THREE.Mesh {
    const fractalConfig = {
      iterations: config.iterations || 100,
      size: config.size || 2.0,
      color: config.color || 0xff6b6b,
      wireframe: config.wireframe || false,
      animate: config.animate || false,
      animationSpeed: config.animationSpeed || 1.0
    };

    const geometry = this.createJuliaGeometry(fractalConfig, cReal, cImag);
    const material = new THREE.MeshPhongMaterial({
      color: fractalConfig.color,
      wireframe: fractalConfig.wireframe,
      transparent: true,
      opacity: 0.8,
      shininess: 100
    });

    const julia = new THREE.Mesh(geometry, material);
    julia.position.copy(center);
    julia.userData.fractalType = 'julia';
    julia.userData.config = fractalConfig;
    julia.userData.cReal = cReal;
    julia.userData.cImag = cImag;

    this.scene.add(julia);
    this.fractals.set(`julia_${Date.now()}`, julia);

    if (fractalConfig.animate) {
      this.animateJuliaSet(julia, fractalConfig);
    }

    return julia;
  }

  /**
   * Generate Sierpinski tetrahedron
   */
  generateSierpinskiTetrahedron(center: THREE.Vector3, config: FractalConfig = {}): THREE.Group {
    const fractalConfig = {
      iterations: config.iterations || 4,
      size: config.size || 1.0,
      color: config.color || 0x6b6bff,
      wireframe: config.wireframe || true,
      animate: config.animate || false,
      animationSpeed: config.animationSpeed || 1.0
    };

    const group = new THREE.Group();
    this.createSierpinskiTetrahedronRecursive(group, center, fractalConfig.size, fractalConfig.iterations);

    group.position.copy(center);
    group.userData.fractalType = 'sierpinski';
    group.userData.config = fractalConfig;

    this.scene.add(group);
    this.fractals.set(`sierpinski_${Date.now()}`, group);

    if (fractalConfig.animate) {
      this.animateSierpinski(group, fractalConfig);
    }

    return group;
  }

  /**
   * Generate Koch snowflake
   */
  generateKochSnowflake(center: THREE.Vector3, config: FractalConfig = {}): THREE.Line {
    const fractalConfig = {
      iterations: config.iterations || 5,
      size: config.size || 1.0,
      color: config.color || 0x88ccff,
      wireframe: config.wireframe || false,
      animate: config.animate || false,
      animationSpeed: config.animationSpeed || 1.0
    };

    const points = this.generateKochPoints(fractalConfig.iterations, fractalConfig.size);
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({
      color: fractalConfig.color,
      transparent: true,
      opacity: 0.8
    });

    const snowflake = new THREE.Line(geometry, material);
    snowflake.position.copy(center);
    snowflake.userData.fractalType = 'koch';
    snowflake.userData.config = fractalConfig;

    this.scene.add(snowflake);
    this.fractals.set(`koch_${Date.now()}`, snowflake);

    if (fractalConfig.animate) {
      this.animateKochSnowflake(snowflake, fractalConfig);
    }

    return snowflake;
  }

  /**
   * Generate Dragon curve
   */
  generateDragonCurve(center: THREE.Vector3, config: FractalConfig = {}): THREE.Line {
    const fractalConfig = {
      iterations: config.iterations || 12,
      size: config.size || 0.5,
      color: config.color || 0xff69b4,
      wireframe: config.wireframe || false,
      animate: config.animate || false,
      animationSpeed: config.animationSpeed || 1.0
    };

    const points = this.generateDragonPoints(fractalConfig.iterations, fractalConfig.size);
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({
      color: fractalConfig.color,
      transparent: true,
      opacity: 0.8
    });

    const dragon = new THREE.Line(geometry, material);
    dragon.position.copy(center);
    dragon.userData.fractalType = 'dragon';
    dragon.userData.config = fractalConfig;

    this.scene.add(dragon);
    this.fractals.set(`dragon_${Date.now()}`, dragon);

    if (fractalConfig.animate) {
      this.animateDragonCurve(dragon, fractalConfig);
    }

    return dragon;
  }

  /**
   * Create Mandelbrot geometry
   */
  private createMandelbrotGeometry(config: FractalConfig): THREE.BufferGeometry {
    const width = 200;
    const height = 200;
    const positions: number[] = [];
    const colors: number[] = [];

    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        const x = (j - width / 2) / (width / 4) * (config.size || 2.0);
        const y = (i - height / 2) / (height / 4) * (config.size || 2.0);

        const iterations = this.mandelbrotIterations(x, y, config.iterations || 100);
        const heightValue = iterations / (config.iterations || 100);

        positions.push(x, heightValue * 0.5, y);

        // Color based on iteration count
        const hue = iterations / (config.iterations || 100);
        const color = new THREE.Color().setHSL(hue, 0.8, 0.6);
        colors.push(color.r, color.g, color.b);
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

    return geometry;
  }

  /**
   * Calculate Mandelbrot iterations for a point
   */
  private mandelbrotIterations(x: number, y: number, maxIterations: number): number {
    let zx = 0;
    let zy = 0;
    let iteration = 0;

    while (zx * zx + zy * zy < 4 && iteration < maxIterations) {
      const xtemp = zx * zx - zy * zy + x;
      zy = 2 * zx * zy + y;
      zx = xtemp;
      iteration++;
    }

    return iteration;
  }

  /**
   * Create Julia set geometry
   */
  private createJuliaGeometry(config: FractalConfig, cReal: number, cImag: number): THREE.BufferGeometry {
    const width = 200;
    const height = 200;
    const positions: number[] = [];
    const colors: number[] = [];

    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        const x = (j - width / 2) / (width / 4) * (config.size || 2.0);
        const y = (i - height / 2) / (height / 4) * (config.size || 2.0);

        const iterations = this.juliaIterations(x, y, cReal, cImag, config.iterations || 100);
        const heightValue = iterations / (config.iterations || 100);

        positions.push(x, heightValue * 0.3, y);

        // Color based on iteration count
        const hue = iterations / (config.iterations || 100);
        const color = new THREE.Color().setHSL(hue, 0.8, 0.6);
        colors.push(color.r, color.g, color.b);
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

    return geometry;
  }

  /**
   * Calculate Julia set iterations for a point
   */
  private juliaIterations(x: number, y: number, cReal: number, cImag: number, maxIterations: number): number {
    let zx = x;
    let zy = y;
    let iteration = 0;

    while (zx * zx + zy * zy < 4 && iteration < maxIterations) {
      const xtemp = zx * zx - zy * zy + cReal;
      zy = 2 * zx * zy + cImag;
      zx = xtemp;
      iteration++;
    }

    return iteration;
  }

  /**
   * Create Sierpinski tetrahedron recursively
   */
  private createSierpinskiTetrahedronRecursive(group: THREE.Group, center: THREE.Vector3, size: number, iterations: number): void {
    if (iterations <= 0) {
      const geometry = new THREE.TetrahedronGeometry(size);
      const material = new THREE.MeshBasicMaterial({
        color: 0x6b6bff,
        wireframe: true,
        transparent: true,
        opacity: 0.8
      });

      const tetrahedron = new THREE.Mesh(geometry, material);
      tetrahedron.position.copy(center);
      group.add(tetrahedron);
      return;
    }

    const newSize = size / 2;

    // Create 4 smaller tetrahedrons
    const positions = [
      new THREE.Vector3(0, size / 2, 0),
      new THREE.Vector3(-size / 2, -size / 4, size * Math.sqrt(3) / 4),
      new THREE.Vector3(size / 2, -size / 4, size * Math.sqrt(3) / 4),
      new THREE.Vector3(0, -size / 4, -size * Math.sqrt(3) / 2)
    ];

    positions.forEach(pos => {
      const newCenter = center.clone().add(pos.clone().multiplyScalar(newSize / size));
      this.createSierpinskiTetrahedronRecursive(group, newCenter, newSize, iterations - 1);
    });
  }

  /**
   * Generate Koch snowflake points
   */
  private generateKochPoints(iterations: number, size: number): THREE.Vector3[] {
    const points: THREE.Vector3[] = [];

    // Start with equilateral triangle
    const vertices = [
      new THREE.Vector3(-size, -size * Math.sqrt(3) / 3, 0),
      new THREE.Vector3(size, -size * Math.sqrt(3) / 3, 0),
      new THREE.Vector3(0, size * Math.sqrt(3) / 1.5, 0),
      new THREE.Vector3(-size, -size * Math.sqrt(3) / 3, 0) // Close the triangle
    ];

    let currentVertices = [...vertices];

    for (let iter = 0; iter < iterations; iter++) {
      const newVertices: THREE.Vector3[] = [];

      for (let i = 0; i < currentVertices.length - 1; i++) {
        const p1 = currentVertices[i];
        const p2 = currentVertices[i + 1];

        // Calculate Koch curve points
        const dx = p2.x - p1.x;
        const dy = p2.y - p1.y;
        const length = Math.sqrt(dx * dx + dy * dy);

        // Points dividing the line into thirds
        const p12 = new THREE.Vector3(
          p1.x + dx / 3,
          p1.y + dy / 3,
          0
        );

        const p23 = new THREE.Vector3(
          p1.x + 2 * dx / 3,
          p1.y + 2 * dy / 3,
          0
        );

        // Peak point of the Koch curve
        const angle = Math.atan2(dy, dx) + Math.PI / 3;
        const peak = new THREE.Vector3(
          p12.x + (length / 3) * Math.cos(angle),
          p12.y + (length / 3) * Math.sin(angle),
          0
        );

        newVertices.push(p1, p12, peak, p23);
      }

      newVertices.push(currentVertices[currentVertices.length - 1]);
      currentVertices = newVertices;
    }

    return currentVertices;
  }

  /**
   * Generate Dragon curve points
   */
  private generateDragonPoints(iterations: number, size: number): THREE.Vector3[] {
    const points: THREE.Vector3[] = [new THREE.Vector3(0, 0, 0)];
    let direction = new THREE.Vector3(size, 0, 0);
    let sign = 1;

    for (let i = 0; i < iterations; i++) {
      const newPoints: THREE.Vector3[] = [];

      for (let j = 0; j < points.length - 1; j++) {
        const p1 = points[j];
        const p2 = points[j + 1];

        // Calculate midpoint
        const midpoint = new THREE.Vector3(
          (p1.x + p2.x) / 2,
          (p1.y + p2.y) / 2,
          0
        );

        // Perpendicular vector
        const dx = p2.x - p1.x;
        const dy = p2.y - p1.y;
        const perpX = -dy * sign;
        const perpY = dx * sign;

        // Normalize and scale
        const length = Math.sqrt(perpX * perpX + perpY * perpY);
        const scale = size / Math.pow(Math.sqrt(2), i + 1);

        const newPoint = new THREE.Vector3(
          midpoint.x + (perpX / length) * scale,
          midpoint.y + (perpY / length) * scale,
          0
        );

        newPoints.push(p1, newPoint);
      }

      newPoints.push(points[points.length - 1]);
      points.length = 0;
      points.push(...newPoints);

      sign = -sign;
    }

    return points;
  }

  /**
   * Animate Mandelbrot set
   */
  private animateMandelbrot(mandelbrot: THREE.Mesh, config: FractalConfig): void {
    const animate = () => {
      requestAnimationFrame(animate);

      const time = Date.now() * 0.001 * (config.animationSpeed || 1.0);
      const material = mandelbrot.material as THREE.MeshPhongMaterial;

      // Animate color
      const hue = (Math.sin(time) * 0.5 + 0.5) % 1;
      material.color.setHSL(hue, 0.8, 0.6);

      // Animate position
      mandelbrot.rotation.y = time * 0.2;
      mandelbrot.position.y = Math.sin(time * 0.5) * 0.1;
    };
    animate();
  }

  /**
   * Animate Julia set
   */
  private animateJuliaSet(julia: THREE.Mesh, config: FractalConfig): void {
    const animate = () => {
      requestAnimationFrame(animate);

      const time = Date.now() * 0.001 * (config.animationSpeed || 1.0);
      const material = julia.material as THREE.MeshPhongMaterial;

      // Animate the complex constant
      const cReal = Math.cos(time * 0.3) * 0.7;
      const cImag = Math.sin(time * 0.4) * 0.27;

      // Update geometry with new Julia constant
      const geometry = this.createJuliaGeometry(config, cReal, cImag);
      julia.geometry.dispose();
      julia.geometry = geometry;

      // Animate material
      const hue = (time * 0.1) % 1;
      material.color.setHSL(hue, 0.8, 0.6);

      julia.rotation.z = time * 0.3;
    };
    animate();
  }

  /**
   * Animate Sierpinski tetrahedron
   */
  private animateSierpinski(sierpinski: THREE.Group, config: FractalConfig): void {
    const animate = () => {
      requestAnimationFrame(animate);

      const time = Date.now() * 0.001 * (config.animationSpeed || 1.0);

      sierpinski.rotation.x = time * 0.2;
      sierpinski.rotation.y = time * 0.3;
      sierpinski.rotation.z = time * 0.1;

      // Pulsing scale effect
      const scale = 1 + Math.sin(time * 2) * 0.1;
      sierpinski.scale.setScalar(scale);
    };
    animate();
  }

  /**
   * Animate Koch snowflake
   */
  private animateKochSnowflake(snowflake: THREE.Line, config: FractalConfig): void {
    const animate = () => {
      requestAnimationFrame(animate);

      const time = Date.now() * 0.001 * (config.animationSpeed || 1.0);
      const material = snowflake.material as THREE.LineBasicMaterial;

      // Animate color
      const hue = (time * 0.2) % 1;
      material.color.setHSL(hue, 0.8, 0.6);

      // Animate rotation
      snowflake.rotation.z = time * 0.5;
    };
    animate();
  }

  /**
   * Animate Dragon curve
   */
  private animateDragonCurve(dragon: THREE.Line, config: FractalConfig): void {
    const animate = () => {
      requestAnimationFrame(animate);

      const time = Date.now() * 0.001 * (config.animationSpeed || 1.0);
      const material = dragon.material as THREE.LineBasicMaterial;

      // Animate color with mystical pulsing
      const pulse = Math.sin(time * 3) * 0.5 + 0.5;
      material.color.setHSL(0.9, 0.8, pulse);

      // Animate rotation
      dragon.rotation.z = time * 0.2;
    };
    animate();
  }

  /**
   * Clear all fractals from scene
   */
  clear(): void {
    this.fractals.forEach(fractal => {
      this.scene.remove(fractal);

      if (fractal instanceof THREE.Mesh) {
        fractal.geometry.dispose();
        if (Array.isArray(fractal.material)) {
          fractal.material.forEach((material: THREE.Material) => material.dispose());
        } else {
          fractal.material.dispose();
        }
      }
    });

    this.fractals.clear();
  }

  /**
   * Get active fractal count
   */
  getActiveCount(): number {
    return this.fractals.size;
  }
}

export default FractalGenerator;
