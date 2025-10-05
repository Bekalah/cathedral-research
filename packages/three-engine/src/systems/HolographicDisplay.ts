import * as THREE from 'three';

/**
 * HolographicConfig - Configuration for holographic displays
 */
export interface HolographicConfig {
  width?: number;
  height?: number;
  depth?: number;
  color?: THREE.Color | string | number;
  opacity?: number;
  animate?: boolean;
  animationSpeed?: number;
  layers?: number;
  distortion?: number;
}

/**
 * HolographicDisplay - Creates advanced holographic 3D effects
 */
export class HolographicDisplay {
  private scene: THREE.Scene;
  private holograms: Map<string, THREE.Object3D> = new Map();

  constructor(scene: THREE.Scene) {
    this.scene = scene;
  }

  /**
   * Create holographic cube display
   */
  createHolographicCube(center: THREE.Vector3, config: HolographicConfig = {}): THREE.Group {
    const holoConfig = {
      width: config.width || 2.0,
      height: config.height || 2.0,
      depth: config.depth || 2.0,
      color: config.color || 0x00ffff,
      opacity: config.opacity || 0.3,
      animate: config.animate || false,
      animationSpeed: config.animationSpeed || 1.0,
      layers: config.layers || 5,
      distortion: config.distortion || 0.1
    };

    const group = new THREE.Group();

    // Create multiple layers for holographic effect
    for (let i = 0; i < holoConfig.layers; i++) {
      const layerOffset = (i - holoConfig.layers / 2) * 0.1;
      const layer = this.createHolographicLayer(holoConfig, layerOffset, i);
      layer.position.copy(center);
      group.add(layer);
    }

    group.position.copy(center);
    group.userData.holographicType = 'cube';
    group.userData.config = holoConfig;

    this.scene.add(group);
    this.holograms.set(`holo_cube_${Date.now()}`, group);

    if (holoConfig.animate) {
      this.animateHolographicCube(group, holoConfig);
    }

    return group;
  }

  /**
   * Create holographic sphere display
   */
  createHolographicSphere(center: THREE.Vector3, config: HolographicConfig = {}): THREE.Group {
    const holoConfig = {
      width: config.width || 2.0,
      height: config.height || 2.0,
      depth: config.depth || 2.0,
      color: config.color || 0xff6b6b,
      opacity: config.opacity || 0.4,
      animate: config.animate || false,
      animationSpeed: config.animationSpeed || 1.0,
      layers: config.layers || 8,
      distortion: config.distortion || 0.05
    };

    const group = new THREE.Group();

    for (let i = 0; i < holoConfig.layers; i++) {
      const layerOffset = (i - holoConfig.layers / 2) * 0.05;
      const layer = this.createHolographicSphereLayer(holoConfig, layerOffset, i);
      layer.position.copy(center);
      group.add(layer);
    }

    group.position.copy(center);
    group.userData.holographicType = 'sphere';
    group.userData.config = holoConfig;

    this.scene.add(group);
    this.holograms.set(`holo_sphere_${Date.now()}`, group);

    if (holoConfig.animate) {
      this.animateHolographicSphere(group, holoConfig);
    }

    return group;
  }

  /**
   * Create holographic data display (like sci-fi interface)
   */
  createHolographicDataDisplay(center: THREE.Vector3, config: HolographicConfig = {}): THREE.Group {
    const holoConfig = {
      width: config.width || 3.0,
      height: config.height || 2.0,
      depth: config.depth || 0.5,
      color: config.color || 0x88ccff,
      opacity: config.opacity || 0.6,
      animate: config.animate || true,
      animationSpeed: config.animationSpeed || 2.0,
      layers: config.layers || 3,
      distortion: config.distortion || 0.02
    };

    const group = new THREE.Group();

    // Create data panels
    const panels = this.createDataPanels(holoConfig);
    panels.forEach(panel => {
      panel.position.copy(center);
      group.add(panel);
    });

    // Add floating data points
    const dataPoints = this.createFloatingDataPoints(center, holoConfig);
    dataPoints.forEach(point => group.add(point));

    group.position.copy(center);
    group.userData.holographicType = 'data';
    group.userData.config = holoConfig;

    this.scene.add(group);
    this.holograms.set(`holo_data_${Date.now()}`, group);

    if (holoConfig.animate) {
      this.animateHolographicData(group, holoConfig);
    }

    return group;
  }

  /**
   * Create holographic portal effect
   */
  createHolographicPortal(center: THREE.Vector3, config: HolographicConfig = {}): THREE.Group {
    const holoConfig = {
      width: config.width || 2.0,
      height: config.height || 2.0,
      depth: config.depth || 0.1,
      color: config.color || 0x6b6bff,
      opacity: config.opacity || 0.5,
      animate: config.animate || true,
      animationSpeed: config.animationSpeed || 1.5,
      layers: config.layers || 10,
      distortion: config.distortion || 0.03
    };

    const group = new THREE.Group();

    // Create portal rings
    for (let i = 0; i < holoConfig.layers; i++) {
      const ringRadius = (holoConfig.width / 2) * (i / holoConfig.layers);
      const ring = this.createPortalRing(ringRadius, holoConfig, i);
      ring.position.copy(center);
      group.add(ring);
    }

    // Add central vortex effect
    const vortex = this.createVortexEffect(center, holoConfig);
    group.add(vortex);

    group.position.copy(center);
    group.userData.holographicType = 'portal';
    group.userData.config = holoConfig;

    this.scene.add(group);
    this.holograms.set(`holo_portal_${Date.now()}`, group);

    if (holoConfig.animate) {
      this.animateHolographicPortal(group, holoConfig);
    }

    return group;
  }

  /**
   * Create a single holographic layer for cube
   */
  private createHolographicLayer(config: HolographicConfig, offset: number, layerIndex: number): THREE.Mesh {
    const geometry = new THREE.BoxGeometry(
      config.width + offset * 0.5,
      config.height + offset * 0.5,
      config.depth + offset * 0.5
    );

    // Create holographic material with distortion
    const material = this.createHolographicMaterial(config, layerIndex);

    const layer = new THREE.Mesh(geometry, material);
    layer.position.z += offset;

    return layer;
  }

  /**
   * Create a single holographic sphere layer
   */
  private createHolographicSphereLayer(config: HolographicConfig, offset: number, layerIndex: number): THREE.Mesh {
    const width = config.width || 2.0;
    const height = config.height || 2.0;
    const depth = config.depth || 2.0;
    const radius = Math.max(width, height, depth) / 2 + Math.abs(offset) * 0.3;
    const geometry = new THREE.SphereGeometry(radius, 32, 32);

    const material = this.createHolographicMaterial(config, layerIndex);

    const layer = new THREE.Mesh(geometry, material);
    layer.position.z += offset;

    return layer;
  }

  /**
   * Create holographic material with advanced shader effects
   */
  private createHolographicMaterial(config: HolographicConfig, layerIndex: number): THREE.ShaderMaterial {
    const vertexShader = `
      varying vec3 vPosition;
      varying vec3 vNormal;
      varying vec2 vUv;

      void main() {
        vPosition = position;
        vNormal = normal;
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      uniform float time;
      uniform vec3 baseColor;
      uniform float opacity;
      uniform float distortion;
      uniform int layerIndex;

      varying vec3 vPosition;
      varying vec3 vNormal;
      varying vec2 vUv;

      // Noise function for distortion
      float noise(vec3 p) {
        return fract(sin(dot(p, vec3(12.9898, 78.233, 45.164))) * 43758.5453);
      }

      void main() {
        vec3 viewDirection = normalize(cameraPosition - vPosition);
        float fresnel = pow(1.0 - abs(dot(viewDirection, vNormal)), 2.0);

        // Create holographic scanlines effect
        float scanlines = sin(vUv.y * 50.0 + time * 2.0) * 0.5 + 0.5;

        // Add distortion based on layer
        float distortAmount = distortion * float(layerIndex);
        vec2 distortedUv = vUv + vec2(
          noise(vPosition + time * 0.5) * distortAmount,
          noise(vPosition + time * 0.3) * distortAmount
        );

        // Create rainbow holographic effect
        float hue = (distortedUv.x + distortedUv.y) * 0.5 + time * 0.1 + float(layerIndex) * 0.1;
        vec3 holoColor = hsv2rgb(vec3(hue, 0.8, 1.0));

        // Combine effects
        float alpha = fresnel * scanlines * opacity;
        vec3 finalColor = mix(baseColor, holoColor, fresnel * 0.5);

        gl_FragColor = vec4(finalColor, alpha);
      }
    `;

    // HSV to RGB conversion
    const hsv2rgb = `
      vec3 hsv2rgb(vec3 c) {
        vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
        vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
        return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
      }
    `;

    return new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader: hsv2rgb + fragmentShader,
      uniforms: {
        time: { value: 0 },
        baseColor: { value: new THREE.Color(config.color || 0x00ffff) },
        opacity: { value: config.opacity || 0.5 },
        distortion: { value: config.distortion || 0.1 },
        layerIndex: { value: layerIndex }
      },
      transparent: true,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending
    });
  }

  /**
   * Create data display panels
   */
  private createDataPanels(config: HolographicConfig): THREE.Mesh[] {
    const panels: THREE.Mesh[] = [];

    // Main central panel
    const mainPanelGeometry = new THREE.PlaneGeometry(config.width, config.height);
    const mainPanelMaterial = this.createHolographicMaterial(config, 0);
    const mainPanel = new THREE.Mesh(mainPanelGeometry, mainPanelMaterial);
    panels.push(mainPanel);

    // Side panels
    for (let i = 0; i < 2; i++) {
      const sidePanelGeometry = new THREE.PlaneGeometry(config.width * 0.6, config.height * 0.8);
      const sidePanelMaterial = this.createHolographicMaterial(config, i + 1);
      const sidePanel = new THREE.Mesh(sidePanelGeometry, sidePanelMaterial);

      sidePanel.position.x = (i === 0 ? -1 : 1) * config.width * 0.7;
      sidePanel.position.z = -0.2;
      panels.push(sidePanel);
    }

    return panels;
  }

  /**
   * Create floating data points
   */
  private createFloatingDataPoints(center: THREE.Vector3, config: HolographicConfig): THREE.Mesh[] {
    const points: THREE.Mesh[] = [];
    const pointCount = 20;

    for (let i = 0; i < pointCount; i++) {
      const geometry = new THREE.SphereGeometry(0.02, 8, 8);
      const material = this.createHolographicMaterial(config, i);

      const point = new THREE.Mesh(geometry, material);

      // Random position around the display
      const width = config.width || 3.0;
      const height = config.height || 2.0;
      point.position.set(
        (Math.random() - 0.5) * width * 1.5,
        (Math.random() - 0.5) * height * 1.5,
        (Math.random() - 0.5) * 1.0
      );

      point.position.add(center);
      points.push(point);
    }

    return points;
  }

  /**
   * Create portal ring
   */
  private createPortalRing(radius: number, config: HolographicConfig, layerIndex: number): THREE.Mesh {
    const geometry = new THREE.RingGeometry(radius * 0.8, radius, 32);
    const material = this.createHolographicMaterial(config, layerIndex);

    const ring = new THREE.Mesh(geometry, material);
    ring.rotation.x = -Math.PI / 2; // Lay flat

    return ring;
  }

  /**
   * Create vortex effect for portal center
   */
  private createVortexEffect(center: THREE.Vector3, config: HolographicConfig): THREE.Mesh {
    const geometry = new THREE.CylinderGeometry(0.1, 0.1, 0.5, 16);
    const material = this.createHolographicMaterial(config, 0);

    const vortex = new THREE.Mesh(geometry, material);
    vortex.position.copy(center);
    vortex.position.y += 0.1;

    return vortex;
  }

  /**
   * Animate holographic cube
   */
  private animateHolographicCube(cube: THREE.Group, config: HolographicConfig): void {
    const animate = () => {
      requestAnimationFrame(animate);

      const time = Date.now() * 0.001 * (config.animationSpeed || 1.0);

      cube.rotation.x = time * 0.2;
      cube.rotation.y = time * 0.3;

      // Animate individual layers
      const layers = config.layers || 5;
      cube.children.forEach((layer, index) => {
        const offset = (index - layers / 2) * 0.1;
        layer.position.z = offset + Math.sin(time * 2 + index) * 0.05;

        // Update material uniforms
        const mesh = layer as THREE.Mesh;
        if (mesh.material && (mesh.material as THREE.ShaderMaterial).uniforms) {
          const uniforms = (mesh.material as THREE.ShaderMaterial).uniforms;
          uniforms.time.value = time;
        }
      });
    };
    animate();
  }

  /**
   * Animate holographic sphere
   */
  private animateHolographicSphere(sphere: THREE.Group, config: HolographicConfig): void {
    const animate = () => {
      requestAnimationFrame(animate);

      const time = Date.now() * 0.001 * (config.animationSpeed || 1.0);

      sphere.rotation.x = time * 0.3;
      sphere.rotation.z = time * 0.2;

      // Pulsing effect
      const scale = 1 + Math.sin(time * 3) * 0.1;
      sphere.scale.setScalar(scale);

      // Animate layers
      sphere.children.forEach((layer, index) => {
        const mesh = layer as THREE.Mesh;
        if (mesh.material && (mesh.material as THREE.ShaderMaterial).uniforms) {
          const uniforms = (mesh.material as THREE.ShaderMaterial).uniforms;
          uniforms.time.value = time + index * 0.1;
        }
      });
    };
    animate();
  }

  /**
   * Animate holographic data display
   */
  private animateHolographicData(dataDisplay: THREE.Group, config: HolographicConfig): void {
    const animate = () => {
      requestAnimationFrame(animate);

      const time = Date.now() * 0.001 * (config.animationSpeed || 2.0);

      // Animate data points
      dataDisplay.children.forEach((child, index) => {
        if (child.userData.isDataPoint) {
          // Floating motion for data points
          child.position.y += Math.sin(time * 2 + index) * 0.01;
          child.position.x += Math.cos(time * 1.5 + index) * 0.005;

          // Rotation for data points
          child.rotation.x = time + index;
          child.rotation.y = time * 0.7 + index;
        }

        // Update material uniforms
        const mesh = child as THREE.Mesh;
        if (mesh.material && (mesh.material as THREE.ShaderMaterial).uniforms) {
          const uniforms = (mesh.material as THREE.ShaderMaterial).uniforms;
          uniforms.time.value = time;
        }
      });

      // Animate main panels
      dataDisplay.rotation.y = Math.sin(time * 0.5) * 0.1;
    };
    animate();
  }

  /**
   * Animate holographic portal
   */
  private animateHolographicPortal(portal: THREE.Group, config: HolographicConfig): void {
    const animate = () => {
      requestAnimationFrame(animate);

      const time = Date.now() * 0.001 * (config.animationSpeed || 1.5);

      // Rotate rings at different speeds
      portal.children.forEach((ring, index) => {
        if (ring instanceof THREE.Mesh && ring.geometry instanceof THREE.RingGeometry) {
          ring.rotation.z = time * (0.5 + index * 0.2);
        }

        // Update material uniforms
        const mesh = ring as THREE.Mesh;
        if (mesh.material && (mesh.material as THREE.ShaderMaterial).uniforms) {
          const uniforms = (mesh.material as THREE.ShaderMaterial).uniforms;
          uniforms.time.value = time;
        }
      });

      // Animate vortex
      const vortex = portal.children.find(child => child.userData.isVortex);
      if (vortex) {
        vortex.scale.y = 1 + Math.sin(time * 4) * 0.3;

        const vortexMesh = vortex as THREE.Mesh;
        if (vortexMesh.material && (vortexMesh.material as THREE.ShaderMaterial).uniforms) {
          const uniforms = (vortexMesh.material as THREE.ShaderMaterial).uniforms;
          uniforms.time.value = time;
        }
      }
    };
    animate();
  }

  /**
   * Clear all holographic displays
   */
  clear(): void {
    this.holograms.forEach(hologram => {
      this.scene.remove(hologram);

      hologram.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.geometry.dispose();
          if (Array.isArray(child.material)) {
            child.material.forEach((material: THREE.Material) => material.dispose());
          } else {
            child.material.dispose();
          }
        }
      });
    });

    this.holograms.clear();
  }

  /**
   * Get active hologram count
   */
  getActiveCount(): number {
    return this.holograms.size;
  }
}

export default HolographicDisplay;
