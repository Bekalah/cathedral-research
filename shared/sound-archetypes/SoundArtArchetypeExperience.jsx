/**
 * 🎨✨ SOUND ART ARCHETYPE INTEGRATION SYSTEM
 * 
 * This file creates the bridge between your existing audio systems
 * and the new Porter Robinson-inspired sound universes, integrating
 * everything into a cohesive, museum-quality interactive experience.
 */

import { useState, useEffect, useRef, useCallback } from 'react';
// eslint-disable-next-line no-unused-vars
import { Canvas, useFrame } from '@react-three/fiber';
// eslint-disable-next-line no-unused-vars
import { Html, Sphere, Box, Torus } from '@react-three/drei';

// Import your existing systems
import { SoundArchetypeUniverse } from './PorterRobinsonSoundSystem.js';
import { CHARACTER_REGISTRY } from '../characters/registry.js';
// Note: useAudioSynthesis import commented out until hooks package is properly set up
// import { useAudioSynthesis } from '../../packages/hooks/src/hooks/useAudioSynthesis';

/**
 * 🌌 MAIN SOUND ART INTERFACE
 * 
 * This creates a complete interactive experience where users can:
 * - Select sound archetypes inspired by Porter Robinson's approach
 * - Experience complete audiovisual universes
 * - Interact with each character's unique harmonic signature
 * - Journey through emotional narratives with sound
 */
export const SoundArtArchetypeExperience = () => {
  const [currentUniverse, setCurrentUniverse] = useState(null);
  const [selectedArchetype, setSelectedArchetype] = useState('nurture');
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [emotionalIntensity, setEmotionalIntensity] = useState(0.5);
  const [isPlaying, setIsPlaying] = useState(false);
  const [visualMode, setVisualMode] = useState('immersive');
  
  const soundSystemRef = useRef(null);
  
  // Your existing audio synthesis hook (commented out until hooks package is set up)
  // const {
  //   audioContext,
  //   masterGain,
  //   createSynthesizerNode,
  //   playSolfeggioFrequency,
  //   createAmbientTexture
  // } = useAudioSynthesis();

  /**
   * Initialize the sound archetype system
   */
  useEffect(() => {
    const initializeSoundSystem = async () => {
      try {
        soundSystemRef.current = new SoundArchetypeUniverse();
        console.log('🎵 Sound Archetype System initialized');
      } catch (error) {
        console.error('Failed to initialize sound system:', error);
      }
    };
    
    initializeSoundSystem();
    
    return () => {
      if (soundSystemRef.current?.activeUniverse) {
        soundSystemRef.current.activeUniverse.stop();
      }
    };
  }, []);

  /**
   * Handle archetype selection and universe creation
   */
  const selectArchetype = useCallback(async (archetypeKey) => {
    if (!soundSystemRef.current) return;
    
    try {
      setSelectedArchetype(archetypeKey);
      
      // Stop current universe if playing
      if (currentUniverse) {
        await currentUniverse.stop();
      }
      
      // Create new universe
      const universe = await soundSystemRef.current.createSoundUniverse(archetypeKey);
      setCurrentUniverse(universe);
      
      console.log(`🌌 Switched to ${archetypeKey} universe`);
    } catch (error) {
      console.error('Failed to select archetype:', error);
    }
  }, [currentUniverse]);

  /**
   * Handle character selection and integrate with sound
   */
  const selectCharacter = useCallback((characterKey) => {
    const character = CHARACTER_REGISTRY[characterKey];
    if (!character || !currentUniverse) return;
    
    setSelectedCharacter(character);
    
    // Integrate character frequency with current universe
    if (currentUniverse.harmonicLayers) {
      currentUniverse.harmonicLayers.forEach(layer => {
        if (layer.isActive) {
          const characterFreq = character.frequency || 432;
          layer.oscillator.frequency.setValueAtTime(
            characterFreq,
            currentUniverse.audioContext.currentTime
          );
        }
      });
    }
    
    console.log(`👤 Selected character: ${character.archetype} with frequency ${character.frequency}Hz`);
  }, [currentUniverse]);

  /**
   * Play/pause the current universe
   */
  const togglePlayback = useCallback(async () => {
    if (!currentUniverse) return;
    
    try {
      if (isPlaying) {
        await currentUniverse.stop();
        setIsPlaying(false);
      } else {
        await currentUniverse.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error('Playback error:', error);
    }
  }, [currentUniverse, isPlaying]);

  /**
   * Handle emotional intensity changes
   */
  const handleEmotionalIntensity = useCallback((intensity) => {
    setEmotionalIntensity(intensity);
    
    if (currentUniverse) {
      currentUniverse.adjustEmotionalIntensity(intensity);
    }
  }, [currentUniverse]);

  /**
   * Get available archetypes for UI
   */
  const availableArchetypes = soundSystemRef.current ? 
    soundSystemRef.current.getAvailableArchetypes() : [];

  return (
    <div className="sound-art-experience">
      {/* 🎛️ CONTROL INTERFACE */}
      <SoundControlInterface
        archetypes={availableArchetypes}
        selectedArchetype={selectedArchetype}
        onSelectArchetype={selectArchetype}
        characters={Object.values(CHARACTER_REGISTRY)}
        selectedCharacter={selectedCharacter}
        onSelectCharacter={selectCharacter}
        isPlaying={isPlaying}
        onTogglePlayback={togglePlayback}
        emotionalIntensity={emotionalIntensity}
        onEmotionalIntensity={handleEmotionalIntensity}
        visualMode={visualMode}
        onVisualMode={setVisualMode}
      />

      {/* 🌌 3D VISUAL UNIVERSE */}
      <div className="visual-universe" style={{ height: '70vh', width: '100%' }}>
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          
          <SoundVisualizer
            universe={currentUniverse}
            character={selectedCharacter}
            emotionalIntensity={emotionalIntensity}
            visualMode={visualMode}
          />
          
          <InteractionSphere
            onInteraction={(gestureType, intensity, position) => {
              if (currentUniverse?.gestureProcessor) {
                currentUniverse.gestureProcessor.processGesture(gestureType, intensity, position);
              }
            }}
          />
        </Canvas>
      </div>

      {/* 📊 REAL-TIME FEEDBACK */}
      <SoundAnalysisDisplay
        universe={currentUniverse}
        character={selectedCharacter}
        emotionalIntensity={emotionalIntensity}
      />
    </div>
  );
};

/**
 * 🎛️ SOUND CONTROL INTERFACE
 * Beautiful, Porter Robinson-inspired control interface
 */
// Utility Components (available for future use)
function _SoundControlInterface({
  archetypes,
  selectedArchetype,
  onSelectArchetype,
  characters,
  selectedCharacter,
  onSelectCharacter,
  isPlaying,
  onTogglePlayback,
  emotionalIntensity,
  onEmotionalIntensity,
  visualMode,
  onVisualMode
}) {
  return (
    <div className="sound-controls" style={{
      padding: '20px',
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
      color: 'white',
      borderRadius: '15px',
      margin: '20px',
      boxShadow: '0 10px 30px rgba(0, 255, 136, 0.2)'
    }}>
      {/* Archetype Selection */}
      <div className="archetype-section" style={{ marginBottom: '20px' }}>
        <h3 style={{ color: '#00ff88', marginBottom: '15px' }}>🌌 Sound Universes</h3>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {archetypes.map(archetype => (
            <button
              key={archetype.key}
              onClick={() => onSelectArchetype(archetype.key)}
              style={{
                padding: '10px 15px',
                background: selectedArchetype === archetype.key 
                  ? 'linear-gradient(45deg, #00ff88, #00cc66)' 
                  : 'rgba(255, 255, 255, 0.1)',
                border: 'none',
                borderRadius: '8px',
                color: 'white',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontSize: '14px'
              }}
            >
              <div style={{ fontWeight: 'bold' }}>{archetype.name}</div>
              <div style={{ fontSize: '12px', opacity: 0.8 }}>{archetype.inspiration}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Character Selection */}
      <div className="character-section" style={{ marginBottom: '20px' }}>
        <h3 style={{ color: '#ff0080', marginBottom: '15px' }}>👤 Liber Arcanae Characters</h3>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', maxHeight: '150px', overflowY: 'auto' }}>
          {characters.slice(0, 10).map(character => (
            <button
              key={character.archetype}
              onClick={() => onSelectCharacter(character.archetype)}
              style={{
                padding: '8px 12px',
                background: selectedCharacter?.archetype === character.archetype
                  ? 'linear-gradient(45deg, #ff0080, #cc0066)'
                  : 'rgba(255, 255, 255, 0.1)',
                border: 'none',
                borderRadius: '6px',
                color: 'white',
                cursor: 'pointer',
                fontSize: '12px',
                transition: 'all 0.3s ease'
              }}
            >
              {character.archetype}
            </button>
          ))}
        </div>
      </div>

      {/* Playback Controls */}
      <div className="playback-section" style={{ marginBottom: '20px' }}>
        <h3 style={{ color: '#ffaa00', marginBottom: '15px' }}>🎵 Playback</h3>
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          <button
            onClick={onTogglePlayback}
            style={{
              padding: '15px 25px',
              background: isPlaying 
                ? 'linear-gradient(45deg, #ff4444, #cc0000)' 
                : 'linear-gradient(45deg, #00ff88, #00cc66)',
              border: 'none',
              borderRadius: '10px',
              color: 'white',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 'bold',
              transition: 'all 0.3s ease'
            }}
          >
            {isPlaying ? '⏸️ Pause Universe' : '▶️ Play Universe'}
          </button>
          
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: '#ffaa00' }}>
              💫 Emotional Intensity
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={emotionalIntensity}
              onChange={(e) => onEmotionalIntensity(parseFloat(e.target.value))}
              style={{
                width: '100%',
                appearance: 'none',
                height: '8px',
                borderRadius: '4px',
                background: 'linear-gradient(90deg, #333 0%, #ffaa00 100%)',
                outline: 'none'
              }}
            />
          </div>
        </div>
      </div>

      {/* Visual Mode Selection */}
      <div className="visual-section">
        <h3 style={{ color: '#88aaff', marginBottom: '15px' }}>🎨 Visual Mode</h3>
        <div style={{ display: 'flex', gap: '10px' }}>
          {['immersive', 'minimal', 'geometric', 'organic'].map(mode => (
            <button
              key={mode}
              onClick={() => onVisualMode(mode)}
              style={{
                padding: '8px 15px',
                background: visualMode === mode 
                  ? 'linear-gradient(45deg, #88aaff, #6688dd)' 
                  : 'rgba(255, 255, 255, 0.1)',
                border: 'none',
                borderRadius: '6px',
                color: 'white',
                cursor: 'pointer',
                fontSize: '14px',
                textTransform: 'capitalize'
              }}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * 🌈 SOUND VISUALIZER
 * Real-time 3D visualization of the sound universe
 */
function _SoundVisualizer({ universe, character, emotionalIntensity, visualMode }) {
  const meshRef = useRef();
  
  // Animation loop
  useFrame((state, delta) => {
    if (!meshRef.current || !universe) return;
    
    // Rotate based on emotional intensity
    meshRef.current.rotation.x += delta * emotionalIntensity * 0.5;
    meshRef.current.rotation.y += delta * emotionalIntensity * 0.3;
    
    // Scale based on audio activity
    const scale = 1 + (emotionalIntensity * 0.5);
    meshRef.current.scale.setScalar(scale);
    
    // Color modulation
    if (meshRef.current.material) {
      const time = state.clock.elapsedTime;
      const hue = (time * 0.1 + emotionalIntensity) % 1;
      meshRef.current.material.color.setHSL(hue, 0.8, 0.6);
    }
  });
  
  // Choose geometry based on visual mode
  const renderGeometry = () => {
    switch (visualMode) {
      case 'minimal':
        return <Box ref={meshRef} args={[1, 1, 1]} />;
      case 'geometric':
        return <Torus ref={meshRef} args={[1, 0.3, 16, 100]} />;
      case 'organic':
        return <Sphere ref={meshRef} args={[1, 32, 32]} />;
      default: // immersive
        return (
          <group ref={meshRef}>
            <Sphere args={[1, 32, 32]} />
            <Torus args={[1.5, 0.1, 8, 50]} rotation={[Math.PI / 2, 0, 0]} />
            <Torus args={[1.5, 0.1, 8, 50]} rotation={[0, Math.PI / 2, 0]} />
          </group>
        );
    }
  };
  
  return (
    <group>
      <meshStandardMaterial
        color={character?.archetype?.color || '#00ff88'}
        emissive={character?.archetype?.color || '#00ff88'}
        emissiveIntensity={emotionalIntensity * 0.3}
        roughness={0.3}
        metalness={0.7}
      />
      {renderGeometry()}
      
      {/* Character information display */}
      {character && (
        <Html position={[0, 2, 0]} center>
          <div style={{
            background: 'rgba(0, 0, 0, 0.8)',
            padding: '10px',
            borderRadius: '8px',
            color: 'white',
            textAlign: 'center',
            minWidth: '200px'
          }}>
            <h4 style={{ margin: '0 0 5px 0', color: '#00ff88' }}>
              {character.archetype}
            </h4>
            <p style={{ margin: '0', fontSize: '12px', opacity: 0.8 }}>
              Frequency: {character.frequency}Hz
            </p>
          </div>
        </Html>
      )}
    </group>
  );
}

/**
 * 🎯 INTERACTION SPHERE
 * Invisible sphere that captures user interaction
 */
function _InteractionSphere({ onInteraction }) {
  const meshRef = useRef();
  const [isHovered, setIsHovered] = useState(false);
  
  const handlePointerDown = (event) => {
    onInteraction('tap', 1.0, {
      x: event.point.x,
      y: event.point.y,
      z: event.point.z
    });
  };
  
  const handlePointerMove = (event) => {
    if (event.buttons > 0) { // If dragging
      onInteraction('drag', 0.5, {
        x: event.point.x / 2,
        y: event.point.y / 2,
        z: event.point.z / 2
      });
    }
  };
  
  return (
    <Sphere
      ref={meshRef}
      args={[3, 32, 32]}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
    >
      <meshBasicMaterial
        transparent
        opacity={isHovered ? 0.1 : 0}
        color="#ffffff"
      />
    </Sphere>
  );
}

/**
 * 📊 SOUND ANALYSIS DISPLAY
 * Real-time display of sound system status
 */
function _SoundAnalysisDisplay({ universe, character, emotionalIntensity }) {
  const [audioData, setAudioData] = useState({
    activeLayers: 0,
    currentSection: 'beginning',
    tempo: 120,
    frequency: 432
  });
  
  useEffect(() => {
    if (!universe) return;
    
    const interval = setInterval(() => {
      setAudioData({
        activeLayers: universe.harmonicLayers ? universe.harmonicLayers.size : 0,
        currentSection: universe.emotionalNarrative?.currentSection || 'beginning',
        tempo: universe.rhythmEngine?.tempo || 120,
        frequency: character?.frequency || 432
      });
    }, 100);
    
    return () => clearInterval(interval);
  }, [universe, character]);
  
  return (
    <div className="sound-analysis" style={{
      padding: '15px',
      background: 'rgba(0, 0, 0, 0.8)',
      color: 'white',
      margin: '20px',
      borderRadius: '10px',
      display: 'flex',
      gap: '20px',
      flexWrap: 'wrap'
    }}>
      <div className="analysis-item">
        <div style={{ color: '#00ff88', fontSize: '12px' }}>ACTIVE LAYERS</div>
        <div style={{ fontSize: '18px', fontWeight: 'bold' }}>{audioData.activeLayers}</div>
      </div>
      
      <div className="analysis-item">
        <div style={{ color: '#ff0080', fontSize: '12px' }}>NARRATIVE SECTION</div>
        <div style={{ fontSize: '14px', textTransform: 'capitalize' }}>{audioData.currentSection}</div>
      </div>
      
      <div className="analysis-item">
        <div style={{ color: '#ffaa00', fontSize: '12px' }}>TEMPO</div>
        <div style={{ fontSize: '18px', fontWeight: 'bold' }}>{Math.round(audioData.tempo)} BPM</div>
      </div>
      
      <div className="analysis-item">
        <div style={{ color: '#88aaff', fontSize: '12px' }}>FREQUENCY</div>
        <div style={{ fontSize: '18px', fontWeight: 'bold' }}>{audioData.frequency}Hz</div>
      </div>
      
      <div className="analysis-item">
        <div style={{ color: '#ffffff', fontSize: '12px' }}>EMOTIONAL INTENSITY</div>
        <div style={{ 
          fontSize: '18px', 
          fontWeight: 'bold',
          color: `hsl(${emotionalIntensity * 120}, 80%, 60%)`
        }}>
          {Math.round(emotionalIntensity * 100)}%
        </div>
      </div>
    </div>
  );
}

export default SoundArtArchetypeExperience;