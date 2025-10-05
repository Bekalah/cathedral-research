// Arcana Toggle Token Generator
// Generates art/music/research/atelier tokens from Arcana card selections

import fs from 'node:fs';

// Load style and synthesizer data
const loadStyles = () => {
  try {
    return JSON.parse(fs.readFileSync('stone-cathedral/assets/styles/style-pack-collection.json', 'utf8')).styles;
  } catch (e) {
    console.warn('⚠️ Style collection not found, using defaults');
    return [];
  }
};

const loadSynthStations = () => {
  try {
    return JSON.parse(fs.readFileSync('synthesizer-labs/synth-stations.json', 'utf8')).synthStations;
  } catch (e) {
    console.warn('⚠️ Synthesizer stations not found, using defaults');
    return [];
  }
};

function applyArcanaToggle(card) {
  const styles = loadStyles();
  const synthStations = loadSynthStations();
  
  // Find matching style based on card's art realms
  const matchingStyle = styles.find(style => 
    card.living.art_realms.includes(style.id)
  ) || styles.find(style => 
    style.element === card.element && style.stage === card.stage
  );

  // Find synthesizer stations for this card
  const cardSynthStations = synthStations.filter(station =>
    card.living.art_realms.some(realm => realm === station.style_realm)
  );

  // Generate art tokens
  const art = {
    palette: card.resonances?.color_lab || 'lab(50% 0 0)',
    geometrySeed: `${card.id}:${card.stage}:${card.numerology}`,
    glow: card.element === 'Fire' ? 1 : 0,
    styleRealm: matchingStyle?.id || 'living-mandala',
    shader_seed: matchingStyle?.shader_seed || 'default-001',
    texture: matchingStyle?.texture || 'default',
    degree_rotation: card.resonances?.degree || 0,
    sacred_geometry: getSacredGeometry(card),
    nd_safe: {
      motion_reduction: true,
      contrast_safe: true,
      no_strobe: true
    }
  };

  // Generate music tokens
  const music = {
    mode: getMusicalMode(card.element),
    bpm: getStageBPM(card.stage),
    solfeggio: getSolfeggioFreq(card.numerology),
    synthesizer_stations: cardSynthStations.map(s => s.id),
    harmonic_series: getHarmonicSeries(card.resonances?.degree || 0),
    binaural_safe: true,
    volume_limit: -6, // ND-safe default
    eeg_target: getEEGTarget(card.stage)
  };

  // Generate research tokens
  const research = { 
    kabbalah: card.rank === 'Major',
    sources: card.provenance?.source_refs || [],
    degree_study: card.resonances?.degree,
    planetary_lore: card.resonances?.planet,
    angelic_contact: card.resonances?.angel,
    daemon_work: card.resonances?.daemon,
    elemental_study: card.element,
    stage_work: card.stage,
    safe_sources: filterSafeSources(card.provenance?.source_refs || [])
  };

  // Generate atelier tokens
  const atelier = { 
    trialStage: card.stage, 
    suit: card.suit || 'Major',
    exercises: card.living.atelier_exercises,
    temple_functions: card.living.temple_functions,
    reiki_tokens: card.living.reiki_grid_tokens,
    calm_mode: true,
    intensity_level: getIntensityLevel(card.stage),
    safety_protocols: getSafetyProtocols(card)
  };

  // Generate synthesizer integration
  const synthesizer = {
    primary_station: cardSynthStations[0]?.id || 'station-08-nihonga',
    available_stations: cardSynthStations.map(s => s.id),
    safety_level: getSafetyLevel(card),
    eeg_focus: cardSynthStations[0]?.EEG_focus || 'alpha',
    lfe_enabled: cardSynthStations.some(s => s.lfe?.enable),
    contraindication_check: true
  };

  // Generate cathedral environment
  const cathedral = {
    zones: card.living.cathedral_zones,
    lighting: getCathedralLighting(card),
    ambience: getCathedralAmbience(card),
    accessibility: {
      motion_reduced: true,
      high_contrast: true,
      calm_mode: true
    }
  };

  return { art, music, research, atelier, synthesizer, cathedral };
}

// Helper functions
function getSacredGeometry(card) {
  const geometries = {
    'Fire': 'triangle',
    'Water': 'circle', 
    'Air': 'octagon',
    'Earth': 'square',
    'Aether': 'dodecagon'
  };
  return geometries[card.element] || 'circle';
}

function getMusicalMode(element) {
  const modes = {
    'Water': 'dorian',
    'Air': 'lydian', 
    'Fire': 'mixolydian',
    'Earth': 'aeolian',
    'Aether': 'ionian'
  };
  return modes[element] || 'aeolian';
}

function getStageBPM(stage) {
  const bpms = {
    'Nigredo': 54,
    'Albedo': 60,
    'Citrinitas': 72,
    'Rubedo': 60,
    'Void': 48
  };
  return bpms[stage] || 60;
}

function getSolfeggioFreq(numerology) {
  const freqs = [174, 285, 396, 417, 528, 639, 741, 852, 963];
  return freqs[numerology % freqs.length];
}

function getHarmonicSeries(degree) {
  // Map degree to harmonic ratios
  const base = 256; // Base frequency
  const harmonic = Math.floor((degree / 360) * 16) + 1;
  return base * harmonic;
}

function getEEGTarget(stage) {
  const targets = {
    'Nigredo': 'delta/theta',
    'Albedo': 'theta/alpha',
    'Citrinitas': 'alpha/beta',
    'Rubedo': 'theta/alpha',
    'Void': 'theta'
  };
  return targets[stage] || 'alpha';
}

function getIntensityLevel(stage) {
  const levels = {
    'Nigredo': 0.6,
    'Albedo': 0.8,
    'Citrinitas': 0.9,
    'Rubedo': 0.7,
    'Void': 1.0
  };
  return levels[stage] || 0.8;
}

function getSafetyLevel(card) {
  if (card.stage === 'Nigredo') return 'high';
  if (card.element === 'Fire') return 'medium';
  return 'standard';
}

function getSafetyProtocols(card) {
  return {
    contraindication_check: true,
    calm_mode_default: true,
    emergency_stop: true,
    intensity_limiter: true,
    session_timer: card.stage === 'Nigredo' ? 30 : 60
  };
}

function getCathedralLighting(card) {
  return {
    primary_color: card.resonances?.color_lab || 'lab(50% 0 0)',
    intensity: getIntensityLevel(card.stage),
    flicker_safe: true,
    transition_smooth: true
  };
}

function getCathedralAmbience(card) {
  return {
    reverb_level: card.element === 'Water' ? 0.7 : 0.4,
    spatial_depth: card.stage === 'Void' ? 1.0 : 0.6,
    volume_limit: -6,
    binaural_safe: true
  };
}

function filterSafeSources(sources) {
  // Filter for beginner-friendly, trauma-informed sources
  const safeSources = sources.filter(source => 
    !source.toLowerCase().includes('crowley') ||
    source.includes('Case') ||
    source.includes('Fortune') ||
    source.includes('healing')
  );
  return safeSources.length > 0 ? safeSources : ['Paul Foster Case: The Tarot'];
}

// Test with Death card
const testCard = {
  id: "XIII",
  name: "Death",
  element: "Water",
  stage: "Nigredo", 
  numerology: 13,
  rank: "Major",
  suit: null,
  resonances: {
    color_lab: "lab(20% 5 -5)",
    degree: 210,
    planet: "Pluto",
    zodiac: "Scorpio",
    angel: "Shem-42",
    daemon: "Transformer-Shadow"
  },
  living: {
    art_realms: ["obsidian-mandala", "black-madonna-void"],
    cathedral_zones: ["foundation-crypt", "abyss-mirror"],
    temple_functions: ["healing", "transformation"],
    reiki_grid_tokens: {"grounding": 0.8, "transformation": 1.0},
    atelier_exercises: ["grounding_meditation", "shadow_integration"]
  },
  provenance: {
    source_refs: ["Fortune: Mystical Qabalah", "Paul Foster Case: The Tarot"]
  }
};

console.log("🔮 Testing Arcana Toggle Generator - Death Card");
console.log("=" .repeat(60));
const tokens = applyArcanaToggle(testCard);
console.log(JSON.stringify(tokens, null, 2));