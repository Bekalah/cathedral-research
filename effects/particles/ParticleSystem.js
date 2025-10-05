// Advanced Particle System for Cathedral Engine
import * as THREE from 'three';

export class ParticleSystem {
  constructor(options = {}) {
    this.options = {
      count: 10000,
      spread: 100,
      speed: 0.5,
      size: 2.0,
      color: new THREE.Color(0x00ffff),
      opacity: 0.8,
      texture: null,
      behavior: 'float', // float, spiral, wave, explosion, vortex
      ...options
    };

    this.particles = null;
    this.geometry = null;
    this.material = null;
    this.velocities = new Float32Array(this.options.count * 3);
    this.ages = new Float32Array(this.options.count);
    this.time = 0;

    this.init();
  }

  init() {
    this.geometry = new THREE.BufferGeometry();
    
    // Position attribute
    const positions = new Float32Array(this.options.count * 3);
    for (let i = 0; i < this.options.count; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * this.options.spread;
      positions[i3 + 1] = (Math.random() - 0.5) * this.options.spread;
      positions[i3 + 2] = (Math.random() - 0.5) * this.options.spread;

      // Initialize velocities
      this.velocities[i3] = (Math.random() - 0.5) * this.options.speed;
      this.velocities[i3 + 1] = (Math.random() - 0.5) * this.options.speed;
      this.velocities[i3 + 2] = (Math.random() - 0.5) * this.options.speed;

      // Initialize ages
      this.ages[i] = Math.random();
    }

    this.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    this.geometry.setAttribute('velocity', new THREE.BufferAttribute(this.velocities, 3));
    this.geometry.setAttribute('age', new THREE.BufferAttribute(this.ages, 1));

    // Size attribute for varying particle sizes
    const sizes = new Float32Array(this.options.count);
    for (let i = 0; i < this.options.count; i++) {
      sizes[i] = this.options.size * (0.5 + Math.random() * 0.5);
    }
    this.geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    // Create material
    this.material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color: { value: this.options.color },
        opacity: { value: this.options.opacity },
        texture: { value: this.options.texture },
        pointSize: { value: this.options.size }
      },
      vertexShader: `
        attribute float size;
        attribute float age;
        attribute vec3 velocity;
        uniform float time;
        uniform float pointSize;
        
        varying float vAge;
        varying vec3 vVelocity;
        
        void main() {
          vAge = age;
          vVelocity = velocity;
          
          vec3 pos = position;
          
          // Add time-based movement
          pos += velocity * time;
          
          // Apply behavior patterns
          pos.y += sin(time * 2.0 + position.x * 0.1) * 2.0;
          pos.x += cos(time * 1.5 + position.z * 0.1) * 1.0;
          
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_Position = projectionMatrix * mvPosition;
          
          // Size based on distance and age
          gl_PointSize = size * pointSize * (300.0 / -mvPosition.z) * (0.5 + age * 0.5);
        }
      `,
      fragmentShader: `
        uniform vec3 color;
        uniform float opacity;
        uniform sampler2D texture;
        
        varying float vAge;
        varying vec3 vVelocity;
        
        void main() {
          vec2 uv = gl_PointCoord;
          float dist = distance(uv, vec2(0.5));
          
          if (dist > 0.5) discard;
          
          // Create soft circular particles
          float alpha = 1.0 - smoothstep(0.0, 0.5, dist);
          alpha *= opacity;
          
          // Age-based fade
          alpha *= (0.3 + vAge * 0.7);
          
          // Speed-based brightness
          float speed = length(vVelocity);
          vec3 finalColor = color * (0.8 + speed * 0.2);
          
          gl_FragColor = vec4(finalColor, alpha);
        }
      `,
      blending: THREE.AdditiveBlending,
      depthTest: false,
      transparent: true,
      vertexColors: false
    });

    this.particles = new THREE.Points(this.geometry, this.material);
  }

  update(deltaTime) {
    this.time += deltaTime;
    this.material.uniforms.time.value = this.time;

    // Update positions based on behavior
    const positions = this.geometry.attributes.position.array;
    const velocities = this.geometry.attributes.velocity.array;
    const ages = this.geometry.attributes.age.array;

    for (let i = 0; i < this.options.count; i++) {
      const i3 = i * 3;
      
      // Update age
      ages[i] += deltaTime * 0.1;
      if (ages[i] > 1.0) {
        ages[i] = 0.0;
        // Reset position
        positions[i3] = (Math.random() - 0.5) * this.options.spread;
        positions[i3 + 1] = (Math.random() - 0.5) * this.options.spread;
        positions[i3 + 2] = (Math.random() - 0.5) * this.options.spread;
      }

      // Apply behavior-specific updates
      switch (this.options.behavior) {
        case 'spiral':
          const angle = this.time + i * 0.1;
          velocities[i3] = Math.cos(angle) * this.options.speed;
          velocities[i3 + 2] = Math.sin(angle) * this.options.speed;
          break;
        case 'wave':
          velocities[i3 + 1] = Math.sin(this.time * 2.0 + i * 0.1) * this.options.speed;
          break;
        case 'vortex':
          const centerDist = Math.sqrt(positions[i3] ** 2 + positions[i3 + 2] ** 2);
          const vortexAngle = Math.atan2(positions[i3 + 2], positions[i3]) + deltaTime;
          velocities[i3] = Math.cos(vortexAngle) * this.options.speed * (1.0 + centerDist * 0.01);
          velocities[i3 + 2] = Math.sin(vortexAngle) * this.options.speed * (1.0 + centerDist * 0.01);
          break;
      }
    }

    this.geometry.attributes.position.needsUpdate = true;
    this.geometry.attributes.velocity.needsUpdate = true;
    this.geometry.attributes.age.needsUpdate = true;
  }

  setColor(color) {
    this.material.uniforms.color.value = color;
  }

  setOpacity(opacity) {
    this.material.uniforms.opacity.value = opacity;
  }

  setBehavior(behavior) {
    this.options.behavior = behavior;
  }

  getObject3D() {
    return this.particles;
  }

  dispose() {
    if (this.geometry) this.geometry.dispose();
    if (this.material) this.material.dispose();
  }
}