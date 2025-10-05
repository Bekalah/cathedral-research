import * as THREE from 'three';

/**
 * ParticleConfig - Configuration for particle systems
 */
export interface ParticleConfig {
  count?: number;
  size?: number;
  color?: THREE.Color | string | number;
  opacity?: number;
  speed?: number;
  lifetime?: number;
  spread?: number;
  gravity?: number;
  turbulence?: number;
}

/**
 * ParticleSystem - Advanced particle system for magical effects
 */
export class ParticleSystem {
  private scene: THREE.Scene;
  private particles: Map<string, ParticleEmitter> = new Map();
  private clock: THREE.Clock;

  constructor(scene: THREE.Scene) {
    this.scene = scene;
    this.clock = new THREE.Clock();
  }

  /**
   * Create magical spark particle system
   */
  createSparkSystem(position: THREE.Vector3, config: ParticleConfig = {}): ParticleEmitter {
    const emitterConfig = {
      count: config.count || 50,
      size: config.size || 0.02,
      color: config.color || 0xffaa00,
      opacity: config.opacity || 0.8,
      speed: config.speed || 2.0,
      lifetime: config.lifetime || 2.0,
      spread: config.spread || 1.0,
      gravity: config.gravity || -0.5,
      turbulence: config.turbulence || 0.3
    };

    const emitter = new SparkEmitter(position, emitterConfig);
    this.particles.set(`spark_${Date.now()}`, emitter);
    this.scene.add(emitter.getMesh());

    return emitter;
  }

  /**
   * Create mystical energy particle system
   */
  createEnergySystem(position: THREE.Vector3, config: ParticleConfig = {}): ParticleEmitter {
    const emitterConfig = {
      count: config.count || 30,
      size: config.size || 0.05,
      color: config.color || 0x88ccff,
      opacity: config.opacity || 0.6,
      speed: config.speed || 1.0,
      lifetime: config.lifetime || 3.0,
      spread: config.spread || 0.5,
      gravity: config.gravity || 0.1,
      turbulence: config.turbulence || 0.5
    };

    const emitter = new EnergyEmitter(position, emitterConfig);
    this.particles.set(`energy_${Date.now()}`, emitter);
    this.scene.add(emitter.getMesh());

    return emitter;
  }

  /**
   * Create floating mystical particles
   */
  createFloatingParticles(position: THREE.Vector3, config: ParticleConfig = {}): ParticleEmitter {
    const emitterConfig = {
      count: config.count || 20,
      size: config.size || 0.03,
      color: config.color || 0xff69b4,
      opacity: config.opacity || 0.4,
      speed: config.speed || 0.5,
      lifetime: config.lifetime || 5.0,
      spread: config.spread || 2.0,
      gravity: config.gravity || 0.0,
      turbulence: config.turbulence || 0.2
    };

    const emitter = new FloatingEmitter(position, emitterConfig);
    this.particles.set(`floating_${Date.now()}`, emitter);
    this.scene.add(emitter.getMesh());

    return emitter;
  }

  /**
   * Create magical trail effect
   */
  createTrailEffect(startPosition: THREE.Vector3, endPosition: THREE.Vector3, config: ParticleConfig = {}): ParticleEmitter {
    const emitterConfig = {
      count: config.count || 100,
      size: config.size || 0.01,
      color: config.color || 0x00ffff,
      opacity: config.opacity || 0.9,
      speed: config.speed || 3.0,
      lifetime: config.lifetime || 1.0,
      spread: config.spread || 0.1,
      gravity: config.gravity || 0.0,
      turbulence: config.turbulence || 0.1
    };

    const emitter = new TrailEmitter(startPosition, endPosition, emitterConfig);
    this.particles.set(`trail_${Date.now()}`, emitter);
    this.scene.add(emitter.getMesh());

    return emitter;
  }

  /**
   * Update all particle systems
   */
  update(deltaTime: number): void {
    const deadEmitters: string[] = [];

    this.particles.forEach((emitter, key) => {
      emitter.update(deltaTime);

      if (emitter.isDead()) {
        this.scene.remove(emitter.getMesh());
        deadEmitters.push(key);
      }
    });

    // Remove dead emitters
    deadEmitters.forEach(key => {
      this.particles.delete(key);
    });
  }

  /**
   * Clear all particle systems
   */
  clear(): void {
    this.particles.forEach(emitter => {
      this.scene.remove(emitter.getMesh());
    });
    this.particles.clear();
  }

  /**
   * Get active particle count
   */
  getActiveCount(): number {
    let count = 0;
    this.particles.forEach(emitter => {
      count += emitter.getParticleCount();
    });
    return count;
  }
}

/**
 * Base particle emitter class
 */
abstract class ParticleEmitter {
  protected position: THREE.Vector3;
  protected config: ParticleConfig;
  protected particles: Particle[] = [];
  protected mesh: THREE.Points;
  protected geometry: THREE.BufferGeometry;
  protected material: THREE.PointsMaterial;
  protected startTime: number = 0;

  constructor(position: THREE.Vector3, config: ParticleConfig) {
    this.position = position.clone();
    this.config = config;
    this.geometry = new THREE.BufferGeometry();
    this.material = new THREE.PointsMaterial({
      size: config.size || 0.01,
      color: config.color || 0xffffff,
      transparent: true,
      opacity: config.opacity || 1.0,
      blending: THREE.AdditiveBlending
    });

    this.mesh = new THREE.Points(this.geometry, this.material);
    this.mesh.position.copy(position);

    this.initializeParticles();
    this.startTime = Date.now();
  }

  protected abstract initializeParticles(): void;
  protected abstract updateParticle(particle: Particle, deltaTime: number): void;

  update(deltaTime: number): void {
    const positions = new Float32Array(this.particles.length * 3);
    const colors = new Float32Array(this.particles.length * 3);
    const sizes = new Float32Array(this.particles.length);

    this.particles.forEach((particle, index) => {
      this.updateParticle(particle, deltaTime);

      const i3 = index * 3;
      positions[i3] = particle.position.x;
      positions[i3 + 1] = particle.position.y;
      positions[i3 + 2] = particle.position.z;

      colors[i3] = particle.color.r;
      colors[i3 + 1] = particle.color.g;
      colors[i3 + 2] = particle.color.b;

      sizes[index] = particle.size * (1 - particle.life / particle.maxLife);
    });

    this.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    this.geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    this.geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
  }

  getMesh(): THREE.Points {
    return this.mesh;
  }

  getParticleCount(): number {
    return this.particles.length;
  }

  isDead(): boolean {
    const elapsed = (Date.now() - this.startTime) / 1000;
    return elapsed > (this.config.lifetime || 5.0) && this.particles.length === 0;
  }
}

/**
 * Spark emitter for magical spark effects
 */
class SparkEmitter extends ParticleEmitter {
  protected initializeParticles(): void {
    for (let i = 0; i < (this.config.count || 50); i++) {
      const particle = new Particle();
      particle.position = new THREE.Vector3(
        (Math.random() - 0.5) * (this.config.spread || 1.0),
        (Math.random() - 0.5) * (this.config.spread || 1.0),
        (Math.random() - 0.5) * (this.config.spread || 1.0)
      );

      particle.velocity = new THREE.Vector3(
        (Math.random() - 0.5) * (this.config.speed || 2.0),
        Math.random() * (this.config.speed || 2.0),
        (Math.random() - 0.5) * (this.config.speed || 2.0)
      );

      particle.color = new THREE.Color(this.config.color || 0xffaa00);
      particle.size = (this.config.size || 0.02) * (0.5 + Math.random() * 0.5);
      particle.life = 0;
      particle.maxLife = this.config.lifetime || 2.0;

      this.particles.push(particle);
    }
  }

  protected updateParticle(particle: Particle, deltaTime: number): void {
    particle.life += deltaTime;

    // Update position
    particle.position.add(particle.velocity.clone().multiplyScalar(deltaTime));

    // Apply gravity
    particle.velocity.y += (this.config.gravity || -0.5) * deltaTime;

    // Apply turbulence
    if (this.config.turbulence) {
      particle.velocity.x += (Math.random() - 0.5) * (this.config.turbulence || 0.3) * deltaTime;
      particle.velocity.z += (Math.random() - 0.5) * (this.config.turbulence || 0.3) * deltaTime;
    }

    // Fade out over time
    const lifeRatio = particle.life / particle.maxLife;
    particle.color.multiplyScalar(1 - lifeRatio * 0.5);
  }
}

/**
 * Energy emitter for mystical energy effects
 */
class EnergyEmitter extends ParticleEmitter {
  protected initializeParticles(): void {
    for (let i = 0; i < (this.config.count || 30); i++) {
      const particle = new Particle();
      particle.position = new THREE.Vector3(
        (Math.random() - 0.5) * (this.config.spread || 0.5),
        (Math.random() - 0.5) * (this.config.spread || 0.5),
        (Math.random() - 0.5) * (this.config.spread || 0.5)
      );

      particle.velocity = new THREE.Vector3(
        (Math.random() - 0.5) * (this.config.speed || 1.0),
        (Math.random() - 0.5) * (this.config.speed || 1.0),
        (Math.random() - 0.5) * (this.config.speed || 1.0)
      );

      particle.color = new THREE.Color(this.config.color || 0x88ccff);
      particle.size = (this.config.size || 0.05) * (0.8 + Math.random() * 0.4);
      particle.life = Math.random() * (this.config.lifetime || 3.0);
      particle.maxLife = this.config.lifetime || 3.0;

      this.particles.push(particle);
    }
  }

  protected updateParticle(particle: Particle, deltaTime: number): void {
    particle.life += deltaTime;

    // Orbital motion
    const time = particle.life * 2;
    const radius = particle.position.length();
    particle.position.x = Math.cos(time) * radius;
    particle.position.z = Math.sin(time) * radius;

    // Slow vertical drift
    particle.position.y += (this.config.speed || 1.0) * 0.3 * deltaTime;

    // Color pulsing
    const pulse = Math.sin(particle.life * 3) * 0.5 + 0.5;
    particle.color.setHSL(0.6, 0.8, pulse);
  }
}

/**
 * Floating emitter for ambient mystical particles
 */
class FloatingEmitter extends ParticleEmitter {
  protected initializeParticles(): void {
    for (let i = 0; i < (this.config.count || 20); i++) {
      const particle = new Particle();
      particle.position = new THREE.Vector3(
        (Math.random() - 0.5) * (this.config.spread || 2.0),
        (Math.random() - 0.5) * (this.config.spread || 2.0),
        (Math.random() - 0.5) * (this.config.spread || 2.0)
      );

      particle.velocity = new THREE.Vector3(
        (Math.random() - 0.5) * (this.config.speed || 0.5),
        (Math.random() - 0.5) * (this.config.speed || 0.5),
        (Math.random() - 0.5) * (this.config.speed || 0.5)
      );

      particle.color = new THREE.Color(this.config.color || 0xff69b4);
      particle.size = (this.config.size || 0.03) * (0.6 + Math.random() * 0.8);
      particle.life = Math.random() * (this.config.lifetime || 5.0);
      particle.maxLife = this.config.lifetime || 5.0;

      this.particles.push(particle);
    }
  }

  protected updateParticle(particle: Particle, deltaTime: number): void {
    particle.life += deltaTime;

    // Gentle floating motion
    particle.position.add(particle.velocity.clone().multiplyScalar(deltaTime));

    // Slow rotation around center
    const distance = particle.position.length();
    if (distance > 0.1) {
      const angle = deltaTime * 0.5;
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);

      const x = particle.position.x * cos - particle.position.z * sin;
      const z = particle.position.x * sin + particle.position.z * cos;
      particle.position.x = x;
      particle.position.z = z;
    }

    // Subtle color variation
    const hue = (particle.life * 0.1 + Math.sin(particle.life * 2) * 0.1) % 1;
    particle.color.setHSL(hue, 0.6, 0.7);
  }
}

/**
 * Trail emitter for magical trail effects
 */
class TrailEmitter extends ParticleEmitter {
  private endPosition: THREE.Vector3;
  private trailLength: number;

  constructor(startPosition: THREE.Vector3, endPosition: THREE.Vector3, config: ParticleConfig) {
    super(startPosition, config);
    this.endPosition = endPosition.clone();
    this.trailLength = startPosition.distanceTo(endPosition);
  }

  protected initializeParticles(): void {
    for (let i = 0; i < (this.config.count || 100); i++) {
      const particle = new Particle();

      // Distribute particles along the trail
      const t = i / (this.config.count || 100);
      particle.position = new THREE.Vector3().lerpVectors(this.position, this.endPosition, t);
      particle.position.add(new THREE.Vector3(
        (Math.random() - 0.5) * (this.config.spread || 0.1),
        (Math.random() - 0.5) * (this.config.spread || 0.1),
        (Math.random() - 0.5) * (this.config.spread || 0.1)
      ));

      particle.velocity = new THREE.Vector3(
        (Math.random() - 0.5) * (this.config.speed || 3.0),
        (Math.random() - 0.5) * (this.config.speed || 3.0),
        (Math.random() - 0.5) * (this.config.speed || 3.0)
      );

      particle.color = new THREE.Color(this.config.color || 0x00ffff);
      particle.size = (this.config.size || 0.01) * (0.5 + Math.random() * 0.5);
      particle.life = t * (this.config.lifetime || 1.0);
      particle.maxLife = this.config.lifetime || 1.0;

      this.particles.push(particle);
    }
  }

  protected updateParticle(particle: Particle, deltaTime: number): void {
    particle.life += deltaTime;

    // Move particles along trail direction
    const direction = new THREE.Vector3().subVectors(this.endPosition, this.position).normalize();
    particle.position.add(direction.clone().multiplyScalar((this.config.speed || 3.0) * deltaTime));

    // Add slight upward drift
    particle.velocity.y += 0.1 * deltaTime;

    // Fade based on distance from start
    const distance = particle.position.distanceTo(this.position);
    const fade = Math.max(0, 1 - (distance / this.trailLength));
    particle.color.multiplyScalar(fade);
  }
}

/**
 * Individual particle representation
 */
class Particle {
  position: THREE.Vector3 = new THREE.Vector3();
  velocity: THREE.Vector3 = new THREE.Vector3();
  color: THREE.Color = new THREE.Color();
  size: number = 1.0;
  life: number = 0;
  maxLife: number = 1.0;
}

export default ParticleSystem;
