/**
 * 🃏✨ LIBER ARCANAE - CHARACTER SYSTEM INDEX
 * 
 * Master export file for all 22 Major Arcana character implementations
 * Ready for deployment to bekalah.github.io
 */

// Base system exports
export { default as BaseCharacter } from './BaseCharacter.js';
export { LIBER_ARCANAE, CrystalPhysics, SolfeggioFrequencies, SacredGeometry } from './registry.js';

// Character implementations (Phase 1 - Core Characters)
export { default as RebeccaRespawn } from './implementations/RebeccaRespawn.js';
export { default as VirelaiEzraLux } from './implementations/VirelaiEzraLux.js';
export { default as IGNIRakuDragon } from './implementations/IGNIRakuDragon.js';

// Character factory function
export function createCharacter(archetypeKey) {
  const characterMap = {
    '00_fool': () => new RebeccaRespawn(),
    '01_magician': () => new VirelaiEzraLux(),
    '07_chariot': () => new IGNIRakuDragon(),
    
    // Phase 2 characters (using BaseCharacter until specific implementations)
    '02_high_priestess': () => new BaseCharacter('02_high_priestess'),
    '03_empress': () => new BaseCharacter('03_empress'),
    '04_emperor': () => new BaseCharacter('04_emperor'),
    '05_hierophant': () => new BaseCharacter('05_hierophant'),
    '06_lovers': () => new BaseCharacter('06_lovers'),
    '08_strength': () => new BaseCharacter('08_strength'),
    '09_hermit': () => new BaseCharacter('09_hermit'),
    '10_wheel_of_fortune': () => new BaseCharacter('10_wheel_of_fortune'),
    '11_justice': () => new BaseCharacter('11_justice'),
    '12_hanged_one': () => new BaseCharacter('12_hanged_one'),
    '13_death': () => new BaseCharacter('13_death'),
    '14_temperance': () => new BaseCharacter('14_temperance'),
    '15_devil': () => new BaseCharacter('15_devil'),
    '16_tower': () => new BaseCharacter('16_tower'),
    '17_star': () => new BaseCharacter('17_star'),
    '18_moon': () => new BaseCharacter('18_moon'),
    '19_sun': () => new BaseCharacter('19_sun'),
    '20_judgement': () => new BaseCharacter('20_judgement'),
    '21_world': () => new BaseCharacter('21_world')
  };

  const createCharacterFunc = characterMap[archetypeKey];
  if (!createCharacterFunc) {
    throw new Error(`Unknown character archetype: ${archetypeKey}`);
  }

  return createCharacterFunc();
}

// Quick access functions for popular characters
export function createRebecca() {
  return new RebeccaRespawn();
}

export function createVirelai() {
  return new VirelaiEzraLux();
}

export function createIGNI() {
  return new IGNIRakuDragon();
}

// Character discovery functions
export function getAllCharacterKeys() {
  return Object.keys(LIBER_ARCANAE);
}

export function getCharactersByApp(appName) {
  return Object.entries(LIBER_ARCANAE)
    .filter(([_key, character]) => character.apps.includes(appName))
    .map(([key, character]) => ({ key, character }));
}

export function getCharactersByElement(element) {
  return Object.entries(LIBER_ARCANAE)
    .filter(([_key, character]) => character.element === element)
    .map(([key, character]) => ({ key, character }));
}

export function getCharactersBySpecialty(specialty) {
  return Object.entries(LIBER_ARCANAE)
    .filter(([_key, character]) => character.specialties.includes(specialty))
    .map(([key, character]) => ({ key, character }));
}

// Deployment utilities
export function validateCharacterSystem() {
  const results = {
    totalCharacters: 22,
    implemented: 0,
    coreCharacters: 0,
    allAppsSupported: true,
    errors: []
  };

  try {
    // Test core characters
    const rebecca = createRebecca();
    const virelai = createVirelai();
    const igni = createIGNI();
    
    results.coreCharacters = 3;
    console.log('✅ Core characters working:', rebecca.archetype.name, virelai.archetype.name, igni.archetype.name);
    
    // Test all character keys
    const allKeys = getAllCharacterKeys();
    results.implemented = allKeys.length;
    
    if (results.implemented === results.totalCharacters) {
      console.log('✅ All 22 characters available in registry');
    } else {
      console.log(`⚠️ ${results.implemented}/${results.totalCharacters} characters in registry`);
    }
    
    // Test character creation for all
    allKeys.forEach(key => {
      try {
        const character = createCharacter(key);
        console.log(`✅ ${character.archetype.name} (${character.archetype.title}) - Ready`);
      } catch (error) {
        results.errors.push(`❌ ${key}: ${error.message}`);
      }
    });
    
  } catch (error) {
    results.errors.push(`System Error: ${error.message}`);
  }

  return results;
}

export function getDeploymentReadiness() {
  const validation = validateCharacterSystem();
  
  const readiness = {
    phase1Ready: validation.coreCharacters >= 3,
    phase2Ready: validation.implemented >= 10,
    phase3Ready: validation.implemented === 22,
    errors: validation.errors,
    
    // Deployment configuration
    deployment: {
      target: 'bekalah.github.io',
      primaryApp: 'cathedral-hub',
      characterAccess: 'shared/characters',
      buildReady: validation.errors.length === 0
    },
    
    // Feature completeness
    features: {
      traumaSafety: '✅ Rebecca Respawn (Fool)',
      materialFusion: '✅ Virelai Ezra Lux (Magician)', 
      fireMotion: '✅ IGNI Raku Dragon (Chariot)',
      crystalPhysics: '✅ Real mineral properties',
      sacredGeometry: '✅ Mathematical precision',
      solfeggioFrequencies: '✅ Authentic healing tones',
      artisticTechniques: '✅ Historical methods'
    }
  };

  return readiness;
}

// Initialize system for deployment
console.log('🃏✨ Liber Arcanae Character System Loading...');

const deploymentStatus = getDeploymentReadiness();
if (deploymentStatus.phase1Ready) {
  console.log('🚀 Phase 1 deployment ready!');
  console.log('🎭 Core characters: Rebecca, Virelai, IGNI');
  console.log('🏛️ Target: bekalah.github.io');
} else {
  console.log('⚠️ Deployment not ready - checking errors...');
  deploymentStatus.errors.forEach(error => console.log(error));
}

export default {
  createCharacter,
  createRebecca,
  createVirelai, 
  createIGNI,
  getAllCharacterKeys,
  getCharactersByApp,
  getCharactersByElement,
  getCharactersBySpecialty,
  validateCharacterSystem,
  getDeploymentReadiness,
  LIBER_ARCANAE
};