// Cathedral Effects Library - Master Index
// Organized collection of visual effects for easy selection and implementation

export { ParticleSystem } from './particles/ParticleSystem.js';
export { HolographicMaterial } from './materials/HolographicMaterial.js';
export { RealityBendingEffects } from './reality/RealityBendingEffects.js';
export { WonderlandEffects } from './wonderland/WonderlandEffects.js';
export { MatrixEffects } from './matrix/MatrixEffects.js';
export { QuantumEffects } from './quantum/QuantumEffects.js';
export { ConsciousnessEffects } from './consciousness/ConsciousnessEffects.js';
export { CrystallineEffects } from './crystalline/CrystallineEffects.js';
export { GeometricEffects } from './geometric/GeometricEffects.js';
export { AudioVisualEffects } from './audiovisual/AudioVisualEffects.js';

// Effect Categories
export const EFFECT_CATEGORIES = {
  PARTICLES: 'particles',
  MATERIALS: 'materials', 
  REALITY: 'reality',
  WONDERLAND: 'wonderland',
  MATRIX: 'matrix',
  QUANTUM: 'quantum',
  CONSCIOUSNESS: 'consciousness',
  CRYSTALLINE: 'crystalline',
  GEOMETRIC: 'geometric',
  AUDIOVISUAL: 'audiovisual'
};

// Effect Manager for easy switching
export class EffectManager {
  constructor() {
    this.activeEffects = new Map();
    this.effectRegistry = new Map();
    this.registerDefaultEffects();
  }

  registerDefaultEffects() {
    this.effectRegistry.set('particles', () => import('./particles/ParticleSystem.js'));
    this.effectRegistry.set('holographic', () => import('./materials/HolographicMaterial.js'));
    this.effectRegistry.set('reality-bending', () => import('./reality/RealityBendingEffects.js'));
    this.effectRegistry.set('wonderland', () => import('./wonderland/WonderlandEffects.js'));
    this.effectRegistry.set('matrix', () => import('./matrix/MatrixEffects.js'));
    this.effectRegistry.set('quantum', () => import('./quantum/QuantumEffects.js'));
    this.effectRegistry.set('consciousness', () => import('./consciousness/ConsciousnessEffects.js'));
    this.effectRegistry.set('crystalline', () => import('./crystalline/CrystallineEffects.js'));
    this.effectRegistry.set('geometric', () => import('./geometric/GeometricEffects.js'));
    this.effectRegistry.set('audiovisual', () => import('./audiovisual/AudioVisualEffects.js'));
  }

  async loadEffect(effectName) {
    if (this.activeEffects.has(effectName)) {
      return this.activeEffects.get(effectName);
    }

    const effectLoader = this.effectRegistry.get(effectName);
    if (!effectLoader) {
      throw new Error(`Effect "${effectName}" not found in registry`);
    }

    const effectModule = await effectLoader();
    this.activeEffects.set(effectName, effectModule);
    return effectModule;
  }

  async createEffect(effectName, options = {}) {
    const effectModule = await this.loadEffect(effectName);
    const EffectClass = Object.values(effectModule)[0]; // Get first export
    return new EffectClass(options);
  }

  listAvailableEffects() {
    return Array.from(this.effectRegistry.keys());
  }

  unloadEffect(effectName) {
    this.activeEffects.delete(effectName);
  }

  clearAllEffects() {
    this.activeEffects.clear();
  }
}

// Global effect manager instance
export const effectManager = new EffectManager();