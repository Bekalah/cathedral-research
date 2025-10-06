import React, { useState, useEffect, useRef } from 'react';
import { AngelTechRPGSystem, RPGCharacter, ConsciousnessCircuit } from './AngelTechRPGSystem';

/**
 * Code 144:99 - Modular Angel Tech Sound Art RPG Experience
 * Integrates Antero Alli's consciousness work with Porter Robinson-level sound design
 * Creates immersive RPG journey through consciousness evolution
 */

// Enhanced sound archetypes for each consciousness circuit
const CIRCUIT_SOUNDSCAPES = {
  1: { // Bio-Survival
    name: 'Primal_Earth_Drone',
    frequencies: [40, 80, 120, 160],
    sounds: ['deep_cave_reverb', 'heartbeat_bass', 'protective_harmonics', 'grounding_drones'],
    porterStyle: 'massive_sub_bass_with_organic_textures',
    description: 'Deep, grounding frequencies that connect to primal survival instincts'
  },
  2: { // Emotional-Territorial
    name: 'Tribal_Emotional_Flow',
    frequencies: [110, 220, 440, 880],
    sounds: ['tribal_drums', 'emotional_swells', 'pack_communication', 'territorial_bass'],
    porterStyle: 'emotional_chord_progressions_with_tribal_percussion',
    description: 'Rhythmic patterns that evoke pack dynamics and emotional intelligence'
  },
  3: { // Semantic
    name: 'Information_Stream_Synthesis',
    frequencies: [256, 512, 1024, 2048],
    sounds: ['data_flows', 'symbolic_sequences', 'language_patterns', 'conceptual_harmonics'],
    porterStyle: 'complex_polyrhythms_with_melodic_information_cascades',
    description: 'Intricate patterns representing the flow of information and symbolic thinking'
  },
  4: { // Socio-Sexual
    name: 'Sacred_Union_Pulse',
    frequencies: [126.22, 210.42, 341.3, 528],
    sounds: ['life_force_pulse', 'sacred_rhythms', 'union_harmonics', 'creative_energy'],
    porterStyle: 'sensual_bass_with_euphoric_build_ups_and_emotional_release',
    description: 'Sensual rhythms that celebrate life force and creative sexual energy'
  },
  5: { // Neurosomatic
    name: 'Body_Temple_Resonance',
    frequencies: [396, 417, 528, 639],
    sounds: ['healing_tones', 'somatic_flows', 'body_awareness', 'bliss_harmonics'],
    porterStyle: 'healing_ambient_with_subtle_euphoric_builds_and_somatic_textures',
    description: 'Healing frequencies that awaken body consciousness and somatic intelligence'
  },
  6: { // Metaprogramming
    name: 'Reality_Programming_Matrix',
    frequencies: [741, 852, 963, 1074],
    sounds: ['neural_networks', 'reality_shifts', 'programming_sequences', 'consciousness_hacks'],
    porterStyle: 'glitchy_electronic_textures_with_reality_bending_effects_and_porter_chord_magic',
    description: 'Digital textures representing the ability to reprogram consciousness and reality'
  },
  7: { // Morphogenetic
    name: 'Ancestral_DNA_Symphony',
    frequencies: [1111, 1333, 1555, 1777],
    sounds: ['genetic_codes', 'evolutionary_harmonics', 'ancestral_memory', 'species_communication'],
    porterStyle: 'ethereal_pads_with_evolutionary_time_signatures_and_genetic_melodic_patterns',
    description: 'Ethereal soundscapes connecting to genetic memory and evolutionary consciousness'
  },
  8: { // Quantum Non-Local
    name: 'Cosmic_Unity_Field',
    frequencies: [2222, 3333, 4444, 5555],
    sounds: ['quantum_harmonics', 'unity_resonance', 'cosmic_consciousness', 'non_local_awareness'],
    porterStyle: 'transcendent_ambient_with_cosmic_scale_porter_emotional_architecture',
    description: 'Transcendent frequencies representing unity consciousness and cosmic awareness'
  }
};

// Enhanced archetype characters for RPG experience
const ARCHETYPE_CHARACTERS = {
  'consciousness_explorer': {
    name: 'The Consciousness Explorer',
    description: 'A seeker dedicated to exploring the full spectrum of human consciousness',
    startingCircuit: 1,
    specialAbilities: ['Circuit Navigation', 'Consciousness Mapping', 'Awareness Amplification'],
    soundResonance: 'adaptive',
    visualStyle: 'ethereal_explorer_with_circuit_symbols'
  },
  'sound_mystic': {
    name: 'The Sound Mystic',
    description: 'A master of using sound and frequency for consciousness transformation',
    startingCircuit: 3,
    specialAbilities: ['Frequency Mastery', 'Sound Healing', 'Harmonic Resonance'],
    soundResonance: 'enhanced',
    visualStyle: 'sound_wave_aura_with_frequency_patterns'
  },
  'reality_hacker': {
    name: 'The Reality Hacker',
    description: 'A consciousness programmer who specializes in reprogramming reality',
    startingCircuit: 6,
    specialAbilities: ['Reality Programming', 'Belief Hacking', 'Consciousness Debugging'],
    soundResonance: 'digital',
    visualStyle: 'matrix_code_with_reality_glitches'
  },
  'cosmic_sage': {
    name: 'The Cosmic Sage',
    description: 'An enlightened being who operates from unity consciousness',
    startingCircuit: 8,
    specialAbilities: ['Non-Local Awareness', 'Unity Transmission', 'Cosmic Intelligence'],
    soundResonance: 'cosmic',
    visualStyle: 'luminous_being_with_cosmic_patterns'
  },
  'healing_shaman': {
    name: 'The Healing Shaman',
    description: 'A somatic wisdom keeper who heals through body consciousness',
    startingCircuit: 5,
    specialAbilities: ['Somatic Healing', 'Body Wisdom', 'Energy Circulation'],
    soundResonance: 'healing',
    visualStyle: 'natural_healer_with_energy_flows'
  }
};

// Porter Robinson-style sound engine
export class PorterRobinsonSoundEngine {
  private audioContext: AudioContext | null = null;
  private currentSynthesis: any = null;
  private emotionalCurve: number = 0;

  constructor() {
    if (typeof window !== 'undefined') {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  }

  /**
   * Create Porter Robinson-style emotional sound synthesis
   */
  async createEmotionalSynthesis(circuitId: number, intensity: number = 0.7): Promise<void> {
    if (!this.audioContext) return;

    const soundscape = CIRCUIT_SOUNDSCAPES[circuitId];
    if (!soundscape) return;

    console.log(`🎵 Creating Porter Robinson-style synthesis for: ${soundscape.name}`);

    // Create emotional chord progression (Porter Robinson signature)
    const chordProgression = this.generateEmotionalChords(circuitId);
    
    // Create consciousness-specific textures
    const consciousnessTextures = this.generateConsciousnessTextures(circuitId, intensity);
    
    // Create euphoric build-ups and emotional releases
    const emotionalArcs = this.generateEmotionalArcs(circuitId, intensity);

    // Combine all elements into Porter Robinson-style experience
    this.currentSynthesis = {
      chords: chordProgression,
      textures: consciousnessTextures,
      emotionalArcs: emotionalArcs,
      circuitId,
      intensity
    };
  }

  /**
   * Generate Porter Robinson-style emotional chord progressions
   */
  private generateEmotionalChords(circuitId: number): any {
    const soundscape = CIRCUIT_SOUNDSCAPES[circuitId];
    const baseFreqs = soundscape.frequencies;

    // Create emotional chord progressions based on circuit consciousness
    const chordMaps = {
      1: ['C', 'F', 'G', 'Am'], // Grounding, stable progressions
      2: ['Am', 'F', 'C', 'G'], // Emotional, pack-bonding progressions
      3: ['Dm', 'Bb', 'F', 'C'], // Complex, information-processing progressions
      4: ['F', 'Am', 'Bb', 'C'], // Sensual, life-force progressions
      5: ['C', 'Am', 'F', 'G'], // Healing, somatic progressions
      6: ['Fm', 'Ab', 'Bb', 'C'], // Reality-bending, programming progressions
      7: ['Em', 'Am', 'D', 'G'], // Evolutionary, ancestral progressions
      8: ['C', 'Cmaj7', 'Fmaj7', 'G'], // Unity, cosmic progressions
    };

    return {
      progression: chordMaps[circuitId] || chordMaps[1],
      baseFrequencies: baseFreqs,
      style: soundscape.porterStyle
    };
  }

  /**
   * Generate consciousness-specific sound textures
   */
  private generateConsciousnessTextures(circuitId: number, intensity: number): any {
    const soundscape = CIRCUIT_SOUNDSCAPES[circuitId];
    
    return {
      primary: soundscape.sounds[0],
      secondary: soundscape.sounds[1],
      ambient: soundscape.sounds[2],
      accent: soundscape.sounds[3],
      intensity: intensity,
      porterProcessing: this.getPorterProcessingStyle(circuitId)
    };
  }

  /**
   * Generate Porter Robinson-style emotional arcs
   */
  private generateEmotionalArcs(circuitId: number, intensity: number): any {
    return {
      intro: { duration: 30, buildType: 'gentle_rise', emotionalTarget: 0.3 },
      development: { duration: 60, buildType: 'complex_build', emotionalTarget: 0.7 },
      climax: { duration: 20, buildType: 'euphoric_peak', emotionalTarget: 1.0 },
      resolution: { duration: 40, buildType: 'emotional_release', emotionalTarget: 0.5 },
      circuitIntegration: { duration: 30, buildType: 'consciousness_integration', emotionalTarget: 0.8 }
    };
  }

  /**
   * Get Porter Robinson-style processing for each circuit
   */
  private getPorterProcessingStyle(circuitId: number): any {
    const processingStyles = {
      1: ['heavy_compression', 'sub_bass_saturation', 'cave_reverb'],
      2: ['emotional_sidechain', 'tribal_delay', 'pack_chorus'],
      3: ['complex_modulation', 'information_filters', 'symbolic_harmonizers'],
      4: ['sensual_saturation', 'life_force_compression', 'sacred_reverb'],
      5: ['healing_eq', 'somatic_delay', 'body_chorus'],
      6: ['reality_glitch', 'programming_filters', 'consciousness_modulators'],
      7: ['evolutionary_reverb', 'genetic_harmonizers', 'ancestral_echo'],
      8: ['cosmic_expansion', 'unity_compression', 'quantum_effects']
    };

    return processingStyles[circuitId] || processingStyles[1];
  }

  /**
   * Play circuit-specific sound experience
   */
  async playCircuitExperience(circuitId: number, duration: number = 180000): Promise<void> {
    if (!this.audioContext || !this.currentSynthesis) return;

    console.log(`🎵 Playing Porter Robinson-style consciousness experience for Circuit ${circuitId}`);
    
    // Simulate Porter Robinson-style sound experience
    // In a real implementation, this would trigger actual audio synthesis
    
    const soundscape = CIRCUIT_SOUNDSCAPES[circuitId];
    console.log(`🎼 Style: ${soundscape.porterStyle}`);
    console.log(`🔊 Frequencies: ${soundscape.frequencies.join('Hz, ')}Hz`);
    console.log(`🎭 Sounds: ${soundscape.sounds.join(', ')}`);
  }

  /**
   * Stop current sound experience
   */
  stopExperience(): void {
    if (this.currentSynthesis) {
      console.log('🔇 Stopping Porter Robinson-style consciousness experience');
      this.currentSynthesis = null;
    }
  }

  /**
   * Get current emotional state of the sound
   */
  getEmotionalState(): number {
    return this.emotionalCurve;
  }
}

/**
 * Code 144:99 Master System - Integrates Angel Tech with Sound Art RPG
 */
export class Code14499System {
  private angelTechRPG: AngelTechRPGSystem;
  private soundEngine: PorterRobinsonSoundEngine;
  private activeExperience: any = null;

  constructor() {
    this.angelTechRPG = new AngelTechRPGSystem();
    this.soundEngine = new PorterRobinsonSoundEngine();
  }

  /**
   * Create character with archetype
   */
  createCharacterWithArchetype(name: string, archetypeKey: string): RPGCharacter {
    const archetype = ARCHETYPE_CHARACTERS[archetypeKey];
    if (!archetype) {
      throw new Error(`Archetype ${archetypeKey} not found`);
    }

    const character = this.angelTechRPG.createCharacter(name, archetypeKey);
    
    // Set starting circuit based on archetype
    character.currentCircuit = archetype.startingCircuit;
    character.abilities = [...character.abilities, ...archetype.specialAbilities];

    console.log(`🧙‍♀️ Created ${archetype.name}: ${name}`);
    return character;
  }

  /**
   * Start immersive consciousness journey
   */
  async startConsciousnessJourney(characterId: string, circuitId: number): Promise<void> {
    const character = this.angelTechRPG.getConsciousnessState(characterId);
    if (!character) return;

    console.log(`🌟 Starting consciousness journey for ${character.character.name} in Circuit ${circuitId}`);

    // Create Porter Robinson-style sound experience
    await this.soundEngine.createEmotionalSynthesis(circuitId, 0.8);
    
    // Start circuit-specific sound experience
    await this.soundEngine.playCircuitExperience(circuitId);

    // Create immersive experience data
    this.activeExperience = {
      characterId,
      circuitId,
      startTime: Date.now(),
      soundscape: CIRCUIT_SOUNDSCAPES[circuitId],
      archetype: ARCHETYPE_CHARACTERS[character.character.archetypeId],
      progressionEvents: []
    };

    console.log(`🎵 Immersive Angel Tech journey initiated with Porter Robinson-style sound design`);
  }

  /**
   * Progress through consciousness experience with sound
   */
  async progressWithSound(characterId: string, experiencePoints: number): Promise<void> {
    if (!this.activeExperience) return;

    const success = this.angelTechRPG.progressCharacter(
      characterId, 
      this.activeExperience.circuitId, 
      experiencePoints
    );

    if (success) {
      // Update sound intensity based on progress
      const character = this.angelTechRPG.getConsciousnessState(characterId);
      if (character) {
        const progress = character.circuitProgress / 100;
        await this.soundEngine.createEmotionalSynthesis(this.activeExperience.circuitId, progress);
      }

      this.activeExperience.progressionEvents.push({
        timestamp: Date.now(),
        experiencePoints,
        emotionalState: this.soundEngine.getEmotionalState()
      });
    }
  }

  /**
   * Get available archetypes
   */
  getAvailableArchetypes(): any {
    return ARCHETYPE_CHARACTERS;
  }

  /**
   * Get circuit soundscapes
   */
  getCircuitSoundscapes(): any {
    return CIRCUIT_SOUNDSCAPES;
  }

  /**
   * Export complete experience data
   */
  exportExperience(characterId: string): string | null {
    const character = this.angelTechRPG.exportCharacter(characterId);
    if (!character) return null;

    const experienceData = {
      character: JSON.parse(character),
      soundExperience: this.activeExperience,
      timestamp: new Date().toISOString(),
      system: 'Code144:99_AngelTech_PorterRobinson_RPG'
    };

    return JSON.stringify(experienceData, null, 2);
  }
}

/**
 * React Component for Code 144:99 Interface
 */
export const Code14499Interface: React.FC = () => {
  const [system] = useState(() => new Code14499System());
  const [currentCharacter, setCurrentCharacter] = useState<RPGCharacter | null>(null);
  const [selectedArchetype, setSelectedArchetype] = useState<string>('consciousness_explorer');
  const [activeCircuit, setActiveCircuit] = useState<number>(1);
  const [soundPlaying, setSoundPlaying] = useState<boolean>(false);
  const [characterName, setCharacterName] = useState<string>('');

  const archetypes = system.getAvailableArchetypes();
  const soundscapes = system.getCircuitSoundscapes();

  const createCharacter = async () => {
    if (!characterName.trim()) return;
    
    const character = system.createCharacterWithArchetype(characterName, selectedArchetype);
    setCurrentCharacter(character);
    setActiveCircuit(character.currentCircuit);
  };

  const startJourney = async (circuitId: number) => {
    if (!currentCharacter) return;
    
    setSoundPlaying(true);
    await system.startConsciousnessJourney(currentCharacter.id, circuitId);
    setActiveCircuit(circuitId);
    
    // Simulate journey duration
    setTimeout(() => setSoundPlaying(false), 10000);
  };

  const progressJourney = async () => {
    if (!currentCharacter) return;
    
    await system.progressWithSound(currentCharacter.id, 15);
    // Update character state
    const updatedState = system.angelTechRPG.getConsciousnessState(currentCharacter.id);
    if (updatedState) {
      setCurrentCharacter(updatedState.character);
    }
  };

  return (
    <div className="code-14499-interface">
      <header className="system-header">
        <h1>🌟 Code 144:99 🌟</h1>
        <h2>Modular Angel Tech Sound Art RPG</h2>
        <p>Antero Alli Consciousness Circuits × Porter Robinson Sound Design × RPG Experience</p>
      </header>

      {!currentCharacter ? (
        <div className="character-creation">
          <h3>Create Your Consciousness Explorer</h3>
          
          <div className="name-input">
            <label>Character Name:</label>
            <input
              type="text"
              value={characterName}
              onChange={(e) => setCharacterName(e.target.value)}
              placeholder="Enter your seeker's name..."
            />
          </div>

          <div className="archetype-selection">
            <label>Choose Your Archetype:</label>
            <div className="archetype-grid">
              {Object.entries(archetypes).map(([key, archetype]) => (
                <div
                  key={key}
                  className={`archetype-card ${selectedArchetype === key ? 'selected' : ''}`}
                  onClick={() => setSelectedArchetype(key)}
                >
                  <h4>{archetype.name}</h4>
                  <p>{archetype.description}</p>
                  <div className="abilities">
                    {archetype.specialAbilities.map((ability, index) => (
                      <span key={index} className="ability-tag">{ability}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button onClick={createCharacter} disabled={!characterName.trim()}>
            Begin Consciousness Journey
          </button>
        </div>
      ) : (
        <div className="journey-interface">
          <div className="character-status">
            <h3>🧙‍♀️ {currentCharacter.name}</h3>
            <p><strong>Archetype:</strong> {archetypes[currentCharacter.archetypeId]?.name}</p>
            <p><strong>Level:</strong> {currentCharacter.level}</p>
            <p><strong>Current Circuit:</strong> {activeCircuit}</p>
          </div>

          <div className="consciousness-circuits">
            <h4>Consciousness Circuits</h4>
            <div className="circuit-grid">
              {Object.entries(soundscapes).map(([circuitId, soundscape]) => {
                const id = parseInt(circuitId);
                const progress = currentCharacter.consciousness.circuits[id] || 0;
                
                return (
                  <div
                    key={id}
                    className={`circuit-card ${activeCircuit === id ? 'active' : ''}`}
                    onClick={() => startJourney(id)}
                  >
                    <h5>Circuit {id}</h5>
                    <h6>{soundscape.name}</h6>
                    <p>{soundscape.description}</p>
                    
                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={{ width: `${progress}%` }}
                      />
                      <span>{progress}%</span>
                    </div>

                    <div className="frequencies">
                      {soundscape.frequencies.map((freq, index) => (
                        <span key={index} className="freq-tag">{freq}Hz</span>
                      ))}
                    </div>

                    <div className="porter-style">
                      <em>{soundscape.porterStyle}</em>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="sound-experience">
            <h4>Porter Robinson-Style Sound Art Experience</h4>
            
            {soundPlaying ? (
              <div className="sound-visualization">
                <div className="playing-indicator">
                  🎵 Consciousness Journey in Progress... 🎵
                </div>
                <div className="sound-waves">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="sound-wave"
                      style={{ animationDelay: `${i * 0.1}s` }}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div className="experience-controls">
                <button onClick={() => startJourney(activeCircuit)}>
                  🎵 Start Sound Journey
                </button>
                <button onClick={progressJourney}>
                  ⚡ Progress Consciousness
                </button>
              </div>
            )}
          </div>

          <div className="character-abilities">
            <h4>Abilities & Powers</h4>
            <div className="abilities-grid">
              {currentCharacter.abilities.map((ability, index) => (
                <span key={index} className="ability-badge">{ability}</span>
              ))}
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .code-14499-interface {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          font-family: 'Courier New', monospace;
          padding: 20px;
        }

        .system-header {
          text-align: center;
          margin-bottom: 40px;
          padding: 20px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 15px;
          backdrop-filter: blur(10px);
        }

        .system-header h1 {
          font-size: 3em;
          margin: 0;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
        }

        .character-creation {
          max-width: 800px;
          margin: 0 auto;
          padding: 30px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 15px;
          backdrop-filter: blur(10px);
        }

        .name-input {
          margin-bottom: 30px;
        }

        .name-input input {
          width: 100%;
          padding: 15px;
          border: none;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.2);
          color: white;
          font-size: 16px;
        }

        .name-input input::placeholder {
          color: rgba(255, 255, 255, 0.7);
        }

        .archetype-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          margin: 20px 0;
        }

        .archetype-card {
          padding: 20px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.3s ease;
          border: 2px solid transparent;
        }

        .archetype-card.selected {
          border-color: #4ecdc4;
          background: rgba(78, 205, 196, 0.2);
          transform: scale(1.02);
        }

        .archetype-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        }

        .abilities {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 10px;
        }

        .ability-tag {
          background: rgba(78, 205, 196, 0.8);
          color: white;
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 0.8em;
        }

        .circuit-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
          margin: 20px 0;
        }

        .circuit-card {
          padding: 20px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.3s ease;
          border: 2px solid transparent;
        }

        .circuit-card.active {
          border-color: #4ecdc4;
          background: rgba(78, 205, 196, 0.2);
          box-shadow: 0 0 20px rgba(78, 205, 196, 0.3);
        }

        .circuit-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        }

        .progress-bar {
          width: 100%;
          height: 15px;
          background: rgba(0, 0, 0, 0.3);
          border-radius: 8px;
          overflow: hidden;
          position: relative;
          margin: 10px 0;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #4ecdc4, #44a08d);
          transition: width 0.3s ease;
        }

        .progress-bar span {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 0.8em;
          font-weight: bold;
        }

        .frequencies {
          display: flex;
          flex-wrap: wrap;
          gap: 5px;
          margin: 10px 0;
        }

        .freq-tag {
          background: rgba(103, 126, 234, 0.8);
          color: white;
          padding: 2px 6px;
          border-radius: 8px;
          font-size: 0.7em;
        }

        .porter-style {
          margin-top: 10px;
          font-style: italic;
          color: rgba(255, 255, 255, 0.8);
          font-size: 0.9em;
        }

        .sound-visualization {
          text-align: center;
          padding: 30px;
        }

        .playing-indicator {
          font-size: 1.5em;
          margin-bottom: 20px;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }

        .sound-waves {
          display: flex;
          justify-content: center;
          gap: 5px;
          height: 60px;
          align-items: end;
        }

        .sound-wave {
          width: 8px;
          background: linear-gradient(to top, #4ecdc4, #667eea);
          animation: wave 1s infinite ease-in-out;
          border-radius: 4px 4px 0 0;
        }

        @keyframes wave {
          0%, 100% { height: 20px; }
          50% { height: 60px; }
        }

        .experience-controls {
          display: flex;
          gap: 20px;
          justify-content: center;
          margin: 20px 0;
        }

        .experience-controls button {
          background: linear-gradient(45deg, #4ecdc4, #44a08d);
          color: white;
          border: none;
          padding: 15px 30px;
          border-radius: 25px;
          cursor: pointer;
          font-size: 16px;
          transition: all 0.3s ease;
        }

        .experience-controls button:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(78, 205, 196, 0.4);
        }

        .abilities-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin: 15px 0;
        }

        .ability-badge {
          background: linear-gradient(45deg, #667eea, #764ba2);
          color: white;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 0.9em;
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        button {
          background: linear-gradient(45deg, #4ecdc4, #44a08d);
          color: white;
          border: none;
          padding: 15px 30px;
          border-radius: 25px;
          cursor: pointer;
          font-size: 16px;
          transition: all 0.3s ease;
          margin-top: 20px;
        }

        button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(78, 205, 196, 0.4);
        }

        button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .journey-interface {
          max-width: 1400px;
          margin: 0 auto;
        }

        .character-status,
        .consciousness-circuits,
        .sound-experience,
        .character-abilities {
          background: rgba(255, 255, 255, 0.1);
          padding: 25px;
          border-radius: 15px;
          margin-bottom: 25px;
          backdrop-filter: blur(10px);
        }
      `}</style>
    </div>
  );
};

export default Code14499System;