// Unified Cathedral Engine - Advanced Graphics Pipeline
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass.js';
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass.js';

export class UnifiedCathedralEngine {
  constructor(container) {
    this.container = container;
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.composer = null;
    this.time = 0;
    this.isRunning = false;
    this.effects = new Map();
    this.lights = [];
    this.particleSystems = [];
    this.postProcessing = {
      bloom: true,
      film: true,
      glitch: false
    };

    this.init();
  }

  init() {
    this.setupScene();
    this.setupCamera();
    this.setupRenderer();
    this.setupPostProcessing();
    this.setupAdvancedLighting();
    this.setupControls();
    this.createAdvancedScene();
    this.start();
  }

  setupScene() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x000011);
    this.scene.fog = new THREE.FogExp2(0x000011, 0.02);
  }

  setupCamera() {
    this.camera = new THREE.PerspectiveCamera(75, this.getAspect(), 0.1, 2000);
    this.camera.position.set(0, 8, 15);
  }

  setupRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
      stencil: false,
      depth: true
    });
    this.renderer.setSize(this.getWidth(), this.getHeight());
    this.renderer.setPixelRatio(Math.min((typeof window !== 'undefined' ? window.devicePixelRatio : 1), 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.shadowMap.autoUpdate = true;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.2;

    if (this.container) {
      this.container.appendChild(this.renderer.domElement);
    }
  }

  setupPostProcessing() {
    // Create effect composer for post-processing
    this.composer = new EffectComposer(this.renderer);

    // Render pass
    const renderPass = new RenderPass(this.scene, this.camera);
    this.composer.addPass(renderPass);

    // Bloom pass for HDR glows
    if (this.postProcessing.bloom) {
      const bloomPass = new UnrealBloomPass(
        new THREE.Vector2(this.getWidth(), this.getHeight()),
        1.5, // strength
        0.4, // radius
        0.85 // threshold
      );
      bloomPass.renderToScreen = false;
      this.composer.addPass(bloomPass);
    }

    // Film grain pass
    if (this.postProcessing.film) {
      const filmPass = new FilmPass(0.15, 0.5, 1500, false);
      filmPass.renderToScreen = false;
      this.composer.addPass(filmPass);
    }

    // Glitch pass (optional)
    if (this.postProcessing.glitch) {
      const glitchPass = new GlitchPass();
      glitchPass.renderToScreen = false;
      this.composer.addPass(glitchPass);
    }

    // Final output pass
    const outputPass = new THREE.ShaderPass(
      new THREE.ShaderMaterial({
        uniforms: {
          tDiffuse: { value: null },
          opacity: { value: 1.0 }
        },
        vertexShader: `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform float opacity;
          uniform sampler2D tDiffuse;
          varying vec2 vUv;
          void main() {
            vec4 texel = texture2D(tDiffuse, vUv);
            gl_FragColor = opacity * texel;
          }
        `
      }),
      'tDiffuse'
    );
    outputPass.renderToScreen = true;
    this.composer.addPass(outputPass);
  }

  setupAdvancedLighting() {
    // Remove default lights, create sophisticated lighting rig

    // 1. HDR Environment Light (creates realistic reflections)
    const pmremGenerator = new THREE.PMREMGenerator(this.renderer);
    const envTexture = new THREE.TextureLoader().load(
      'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iZ3JhZGllbnQiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPgogICAgICA8c3RvcCBvZmZzZXQ9IjAlIiBzdHlsZT0ic3RvcC1jb2xvcjojMDAwMDU1O3N0b3Atb3BhY2l0eToxIiAvPgogICAgICA8c3RvcCBvZmZzZXQ9IjUwJSIgc3R5bGU9InN0b3AtY29sb3I6IzMzMzM3NztzdG9wLW9wYWNpdHk6MSIgLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdHlsZT0ic3RvcC1jb2xvcjojMDAwMDMzO3N0b3Atb3BhY2l0eToxIiAvPgogICAgPC9saW5lYXJHcmFkaWVudD4KICA8L2RlZnM+CiAgPHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmFkaWVudCkiLz4KPC9zdmc+',
      (texture) => {
        const envMap = pmremGenerator.fromEquirectangular(texture).texture;
        this.scene.environment = envMap;
        texture.dispose();
        pmremGenerator.dispose();
      }
    );

    // 2. Key Light (main illumination)
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.0);
    keyLight.position.set(10, 15, 8);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 2048;
    keyLight.shadow.mapSize.height = 2048;
    keyLight.shadow.camera.near = 0.5;
    keyLight.shadow.camera.far = 50;
    keyLight.shadow.camera.left = -20;
    keyLight.shadow.camera.right = 20;
    keyLight.shadow.camera.top = 20;
    keyLight.shadow.camera.bottom = -20;
    keyLight.shadow.bias = -0.0001;
    this.scene.add(keyLight);
    this.lights.push(keyLight);

    // 3. Fill Light (softer, secondary illumination)
    const fillLight = new THREE.DirectionalLight(0x4488ff, 0.8);
    fillLight.position.set(-8, 10, -8);
    this.scene.add(fillLight);
    this.lights.push(fillLight);

    // 4. Rim Light (creates edge definition)
    const rimLight = new THREE.DirectionalLight(0xff8844, 1.2);
    rimLight.position.set(0, 5, -15);
    this.scene.add(rimLight);
    this.lights.push(rimLight);

    // 5. Ambient Light (base illumination)
    const ambientLight = new THREE.AmbientLight(0x111122, 0.4);
    this.scene.add(ambientLight);
    this.lights.push(ambientLight);

    // 6. Accent Point Lights (magical effects)
    const accentColors = [0x4169e1, 0xff6b6b, 0xfeca57, 0x48dbfb];
    accentColors.forEach((color, index) => {
      const accentLight = new THREE.PointLight(color, 1.5, 25);
      const angle = (index / accentColors.length) * Math.PI * 2;
      accentLight.position.set(
        Math.cos(angle) * 8,
        5 + Math.sin(angle * 2) * 2,
        Math.sin(angle) * 8
      );
      accentLight.castShadow = false;
      this.scene.add(accentLight);
      this.lights.push(accentLight);
    });
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

  createAdvancedScene() {
    // Create sophisticated central geometry with multiple materials
    const geometries = [
      new THREE.IcosahedronGeometry(2, 2),
      new THREE.OctahedronGeometry(1.5, 1),
      new THREE.TetrahedronGeometry(1.8, 1)
    ];

    // Advanced PBR materials for different surfaces
    const materials = [
      this.createCrystalMaterial(),
      this.createMetalMaterial(),
      this.createEnergyMaterial(),
      this.createOrganicMaterial()
    ];

    // Create central cathedral structure
    this.centerObject = new THREE.Group();

    geometries.forEach((geometry, index) => {
      const material = materials[index % materials.length];
      const mesh = new THREE.Mesh(geometry, material);

      // Position in 3D space
      mesh.position.set(
        (Math.random() - 0.5) * 3,
        (Math.random() - 0.5) * 3,
        (Math.random() - 0.5) * 3
      );

      mesh.castShadow = true;
      mesh.receiveShadow = true;
      this.centerObject.add(mesh);
    });

    this.scene.add(this.centerObject);

    // Create advanced floor with multiple materials
    this.createAdvancedFloor();

    // Add environmental details
    this.createEnvironmentalDetails();
  }

  // Advanced PBR Material Creation
  createCrystalMaterial() {
    return new THREE.MeshPhysicalMaterial({
      color: 0x88ccff,
      metalness: 0.1,
      roughness: 0.0,
      transmission: 0.9,
      thickness: 0.5,
      ior: 1.5,
      transparent: true,
      opacity: 0.8,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      envMapIntensity: 2.0
    });
  }

  createMetalMaterial() {
    return new THREE.MeshStandardMaterial({
      color: 0x444444,
      metalness: 1.0,
      roughness: 0.2,
      envMapIntensity: 1.5
    });
  }

  createEnergyMaterial() {
    return new THREE.MeshBasicMaterial({
      color: 0x4169e1,
      transparent: true,
      opacity: 0.7
    });
  }

  createOrganicMaterial() {
    return new THREE.MeshStandardMaterial({
      color: 0x88ff88,
      metalness: 0.0,
      roughness: 0.8,
      envMapIntensity: 0.5
    });
  }

  createAdvancedFloor() {
    // Create a more sophisticated floor with multiple sections
    const floorGroup = new THREE.Group();

    // Main floor
    const mainFloorGeometry = new THREE.CircleGeometry(15, 64);
    const mainFloorMaterial = new THREE.MeshStandardMaterial({
      color: 0x111111,
      metalness: 0.8,
      roughness: 0.2,
      envMapIntensity: 1.0
    });

    const mainFloor = new THREE.Mesh(mainFloorGeometry, mainFloorMaterial);
    mainFloor.rotation.x = -Math.PI / 2;
    mainFloor.position.y = -3;
    mainFloor.receiveShadow = true;
    floorGroup.add(mainFloor);

    // Decorative rings
    for (let i = 1; i <= 3; i++) {
      const ringGeometry = new THREE.RingGeometry(i * 3, i * 3 + 0.5, 64);
      const ringMaterial = new THREE.MeshStandardMaterial({
        color: 0x4169e1,
        metalness: 0.9,
        roughness: 0.1,
        emissive: 0x4169e1,
        emissiveIntensity: 0.2
      });

      const ring = new THREE.Mesh(ringGeometry, ringMaterial);
      ring.rotation.x = -Math.PI / 2;
      ring.position.y = -2.9;
      floorGroup.add(ring);
    }

    this.scene.add(floorGroup);
  }

  createEnvironmentalDetails() {
    // Add floating geometric elements
    const detailElements = new THREE.Group();

    for (let i = 0; i < 12; i++) {
      const geometry = new THREE.OctahedronGeometry(0.3, 0);
      const material = new THREE.MeshStandardMaterial({
        color: Math.random() * 0xffffff,
        metalness: 0.8,
        roughness: 0.2,
        emissive: Math.random() * 0x333333
      });

      const element = new THREE.Mesh(geometry, material);
      element.position.set(
        (Math.random() - 0.5) * 30,
        Math.random() * 10,
        (Math.random() - 0.5) * 30
      );

      detailElements.add(element);
    }

    this.scene.add(detailElements);
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
        if (typeof console !== 'undefined') {
          console.warn('Unknown effect type:', type);
        }
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

    if (typeof window !== 'undefined' && window.requestAnimationFrame) {
      window.requestAnimationFrame(() => this.animate());
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
    return (typeof window !== 'undefined' && window.innerWidth) ? window.innerWidth : 800;
  }

  getHeight() {
    return (typeof window !== 'undefined' && window.innerHeight) ? window.innerHeight : 600;
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
