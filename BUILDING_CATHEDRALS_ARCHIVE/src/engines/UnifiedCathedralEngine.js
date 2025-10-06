// Unified Cathedral Engine - Single Source of Truth
import * as THREE from 'three';

export class UnifiedCathedralEngine {
  constructor(container) {
    this.container = container;
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.time = 0;
    this.isRunning = false;
    this.effects = new Map();
    
    this.init();
  }

  init() {
    this.setupScene();
    this.setupCamera();
    this.setupRenderer();
    this.setupLighting();
    this.setupControls();
    this.createBasicScene();
    this.start();
  }

  setupScene() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x000022);
    this.scene.fog = new THREE.Fog(0x000022, 10, 50);
  }

  setupCamera() {
    this.camera = new THREE.PerspectiveCamera(75, this.getAspect(), 0.1, 1000);
    this.camera.position.set(0, 5, 10);
  }

  setupRenderer() {
    this.renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(this.getWidth(), this.getHeight());
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    
    if (this.container) {
      this.container.appendChild(this.renderer.domElement);
    }
  }

  setupLighting() {
    // Ambient
    const ambient = new THREE.AmbientLight(0x404040, 0.3);
    this.scene.add(ambient);

    // Main directional
    const directional = new THREE.DirectionalLight(0xffffff, 1.0);
    directional.position.set(10, 10, 5);
    directional.castShadow = true;
    directional.shadow.mapSize.width = 1024;
    directional.shadow.mapSize.height = 1024;
    this.scene.add(directional);

    // Accent point light (modular color)
    this.accentLight = new THREE.PointLight(0x4169e1, 0.5, 30);
    this.accentLight.position.set(0, 8, 0);
    this.scene.add(this.accentLight);
  }

  setupControls() {
    // Simple mouse interaction without external dependencies
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', () => this.handleResize());
      window.addEventListener('mousemove', (e) => this.handleMouse(e));
    }
  }

  createBasicScene() {
    // Central object
    const geometry = new THREE.IcosahedronGeometry(1, 1);
    const material = new THREE.MeshStandardMaterial({ 
      color: 0x4169e1,
      metalness: 0.7,
      roughness: 0.3,
      wireframe: false
    });
    
    this.centerObject = new THREE.Mesh(geometry, material);
    this.centerObject.castShadow = true;
    this.scene.add(this.centerObject);

    // Floor
    const floorGeometry = new THREE.PlaneGeometry(20, 20);
    const floorMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x222222,
      metalness: 0.1,
      roughness: 0.9
    });
    
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -3;
    floor.receiveShadow = true;
    this.scene.add(floor);
  }

  // Modular effects system
  addEffect(type, options = {}) {
    switch (type) {
      case 'particles':
        this.addParticleEffect(options);
        break;
      case 'glow':
        this.addGlowEffect(options);
        break;
      case 'orbits':
        this.addOrbitingObjects(options);
        break;
      default:
        console.warn('Unknown effect type:', type);
    }
  }

  addParticleEffect(options) {
    const count = options.count || 500;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 15;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Use modular color - NOT matrix green unless specifically requested
    const color = options.color || 0x4169e1; // Default to blue
    const material = new THREE.PointsMaterial({
      color: color,
      size: options.size || 0.05,
      transparent: true,
      opacity: options.opacity || 0.6,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(geometry, material);
    this.scene.add(particles);
    this.effects.set('particles', particles);
  }

  addGlowEffect(options) {
    const color = options.color || 0x4169e1;
    const count = options.count || 8;
    
    for (let i = 0; i < count; i++) {
      const glowGeometry = new THREE.SphereGeometry(0.1, 8, 8);
      const glowMaterial = new THREE.MeshBasicMaterial({
        color: color,
        transparent: true,
        opacity: 0.4
      });

      const glow = new THREE.Mesh(glowGeometry, glowMaterial);
      const angle = (i / count) * Math.PI * 2;
      glow.position.set(
        Math.cos(angle) * 3,
        Math.sin(this.time + i) * 2,
        Math.sin(angle) * 3
      );

      this.scene.add(glow);
    }
  }

  addOrbitingObjects(options) {
    const count = options.count || 5;
    const orbiters = [];
    
    for (let i = 0; i < count; i++) {
      const geometry = new THREE.SphereGeometry(0.2, 8, 8);
      const material = new THREE.MeshStandardMaterial({
        color: options.color || 0x4169e1,
        metalness: 0.8,
        roughness: 0.2
      });
      
      const orbiter = new THREE.Mesh(geometry, material);
      orbiters.push({ mesh: orbiter, angle: (i / count) * Math.PI * 2, speed: 0.5 + Math.random() * 0.5 });
      this.scene.add(orbiter);
    }
    
    this.effects.set('orbiters', orbiters);
  }

  removeEffect(type) {
    if (this.effects.has(type)) {
      const effect = this.effects.get(type);
      if (Array.isArray(effect)) {
        effect.forEach(item => this.scene.remove(item.mesh || item));
      } else {
        this.scene.remove(effect);
      }
      this.effects.delete(type);
    }
  }

  // Animation and lifecycle
  start() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.animate();
  }

  stop() {
    this.isRunning = false;
  }

  animate() {
    if (!this.isRunning) return;

    if (typeof requestAnimationFrame !== 'undefined') {
      requestAnimationFrame(() => this.animate());
    }

    this.time += 0.016;
    this.update();
    this.render();
  }

  update() {
    // Update center object
    if (this.centerObject) {
      this.centerObject.rotation.y = this.time * 0.5;
      this.centerObject.rotation.x = Math.sin(this.time) * 0.3;
      this.centerObject.position.y = Math.sin(this.time * 2) * 0.5;
    }

    // Update camera orbit
    this.camera.position.x = Math.cos(this.time * 0.2) * 12;
    this.camera.position.z = Math.sin(this.time * 0.2) * 12;
    this.camera.lookAt(0, 0, 0);

    // Update effects
    if (this.effects.has('orbiters')) {
      const orbiters = this.effects.get('orbiters');
      orbiters.forEach(orbiter => {
        orbiter.angle += 0.016 * orbiter.speed;
        orbiter.mesh.position.x = Math.cos(orbiter.angle) * 5;
        orbiter.mesh.position.z = Math.sin(orbiter.angle) * 5;
        orbiter.mesh.position.y = Math.sin(orbiter.angle * 2) * 2;
      });
    }

    // Update particles animation
    if (this.effects.has('particles')) {
      const particles = this.effects.get('particles');
      particles.rotation.y = this.time * 0.1;
    }
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }

  // Utilities
  handleResize() {
    this.camera.aspect = this.getAspect();
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.getWidth(), this.getHeight());
  }

  handleMouse(event) {
    if (this.centerObject) {
      const mouseX = (event.clientX / this.getWidth()) * 2 - 1;
      const mouseY = -(event.clientY / this.getHeight()) * 2 + 1;
      
      this.centerObject.rotation.z = mouseX * 0.5;
      this.accentLight.intensity = 0.5 + Math.abs(mouseY) * 0.5;
    }
  }

  getWidth() {
    return (typeof window !== 'undefined') ? window.innerWidth : 800;
  }

  getHeight() {
    return (typeof window !== 'undefined') ? window.innerHeight : 600;
  }

  getAspect() {
    return this.getWidth() / this.getHeight();
  }

  // Cleanup
  dispose() {
    this.stop();
    
    if (this.renderer) {
      this.renderer.dispose();
      if (this.container && this.renderer.domElement) {
        this.container.removeChild(this.renderer.domElement);
      }
    }

    // Clean up scene
    this.scene.traverse((object) => {
      if (object.geometry) object.geometry.dispose();
      if (object.material) {
        if (object.material.length) {
          object.material.forEach(material => material.dispose());
        } else {
          object.material.dispose();
        }
      }
    });

    this.effects.clear();
  }
}

export default UnifiedCathedralEngine;
