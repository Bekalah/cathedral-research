import React, { useState, useRef, useEffect } from 'react';

// Living Cathedral Angel Tech Interface - Organic & Immersive Design
interface CircuitState {
  level: number;
  activated: boolean;
  experience: string;
  frequency: number;
  archetypeConnection: string;
  mastery: number;
  sacredKnowledge: string;
}

interface CharacterStats {
  circuits: Record<string, CircuitState>;
  archetypeAffinity: string;
  name: string;
  codexNode: number;
  consciousnessLevel: number;
}

const Code14499Interface: React.FC = () => {
  const [character, setCharacter] = useState<CharacterStats>({
    name: '',
    circuits: {
      'Bio-Survival': { 
        level: 1, 
        activated: true, 
        experience: 'The primordial foundation - survival consciousness anchored in material reality', 
        frequency: 256,
        archetypeConnection: 'The Fool - Sacred Beginnings',
        mastery: 0,
        sacredKnowledge: 'Without secure foundations, no cathedral can rise to mystical heights'
      },
      'Emotional-Territorial': { 
        level: 1, 
        activated: false, 
        experience: 'Mammalian emotional intelligence and pack dynamics consciousness', 
        frequency: 288,
        archetypeConnection: 'The Emperor - Sacred Authority',
        mastery: 0,
        sacredKnowledge: 'Emotional mastery transforms reactive patterns into conscious choice'
      },
      'Semantic': { 
        level: 1, 
        activated: false, 
        experience: 'Symbolic consciousness - language, mathematics, and meaning construction', 
        frequency: 324,
        archetypeConnection: 'The Hierophant - Sacred Knowledge',
        mastery: 0,
        sacredKnowledge: 'Words are spells that shape reality - choose them with reverence'
      },
      'Social-Sexual': { 
        level: 1, 
        activated: false, 
        experience: 'Adult social consciousness and sacred creative life force energy', 
        frequency: 364,
        archetypeConnection: 'The Lovers - Sacred Union',
        mastery: 0,
        sacredKnowledge: 'Sexual energy is creative force seeking conscious expression'
      },
      'Neurosomatic': { 
        level: 1, 
        activated: false, 
        experience: 'Body-brain unity consciousness and hedonic awareness integration', 
        frequency: 432,
        archetypeConnection: 'The Star - Cosmic Attunement',
        mastery: 0,
        sacredKnowledge: 'The body is a sacred temple containing infinite wisdom'
      },
      'Metaprogramming': { 
        level: 1, 
        activated: false, 
        experience: 'Consciousness programming consciousness itself - reality hacking', 
        frequency: 486,
        archetypeConnection: 'The Magician - Will Directing',
        mastery: 0,
        sacredKnowledge: 'The mind that observes thought can reprogram any pattern'
      },
      'Morphogenetic': { 
        level: 1, 
        activated: false, 
        experience: 'Genetic memory consciousness and evolutionary pattern recognition', 
        frequency: 546,
        archetypeConnection: 'The World - Completion',
        mastery: 0,
        sacredKnowledge: 'DNA carries the memory of every evolutionary breakthrough'
      },
      'Quantum-Nonlocal': { 
        level: 1, 
        activated: false, 
        experience: 'Non-local quantum consciousness and cosmic unity awareness', 
        frequency: 614,
        archetypeConnection: 'The High Priestess - Divine Intuition',
        mastery: 0,
        sacredKnowledge: 'Consciousness is the fundamental fabric from which reality emerges'
      },
    },
    archetypeAffinity: 'The Fool',
    codexNode: 0,
    consciousnessLevel: 1
  });

  const [selectedCircuit, setSelectedCircuit] = useState<string | null>(null);
  const [soundContext, setSoundContext] = useState<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setSoundContext(new (window.AudioContext || (window as any).webkitAudioContext)());
    }
  }, []);

  const playCircuitTone = (frequency: number) => {
    if (soundContext && oscillatorRef.current === null) {
      const oscillator = soundContext.createOscillator();
      const gainNode = soundContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(soundContext.destination);
      
      oscillator.frequency.value = frequency;
      oscillator.type = 'sine';
      gainNode.gain.setValueAtTime(0, soundContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.08, soundContext.currentTime + 0.2);
      gainNode.gain.exponentialRampToValueAtTime(0.001, soundContext.currentTime + 2.5);
      
      oscillator.start();
      oscillatorRef.current = oscillator;
      
      setTimeout(() => {
        if (oscillatorRef.current) {
          oscillatorRef.current.stop();
          oscillatorRef.current = null;
        }
      }, 2600);
    }
  };

  const activateCircuit = (circuitName: string) => {
    setCharacter(prev => {
      const newMastery = Math.min(prev.circuits[circuitName].mastery + 1, 144);
      
      return {
        ...prev,
        circuits: {
          ...prev.circuits,
          [circuitName]: {
            ...prev.circuits[circuitName],
            activated: true,
            level: Math.min(prev.circuits[circuitName].level + 1, 144),
            mastery: newMastery
          }
        },
        codexNode: prev.codexNode + 1,
        consciousnessLevel: Math.floor(Object.values(prev.circuits).reduce((sum, c) => sum + c.mastery, 0) / 144) + 1
      };
    });
    
    playCircuitTone(character.circuits[circuitName].frequency);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'radial-gradient(ellipse at center, #0B0B0B 0%, #7A33FF 25%, #C8A44D 50%, #F5F2EA 100%)',
      color: '#E8E8F0',
      fontFamily: "'Cinzel', 'Georgia', serif",
      position: 'relative',
      overflow: 'hidden',
      padding: '0'
    }}>
      {/* Sacred Flowing Background */}
      <div style={{
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        background: `
          radial-gradient(circle at 20% 20%, rgba(122,51,255,0.3) 0%, transparent 50%),
          radial-gradient(circle at 80% 80%, rgba(200,164,77,0.2) 0%, transparent 50%),
          radial-gradient(circle at 40% 70%, rgba(245,242,234,0.1) 0%, transparent 40%)
        `,
        zIndex: 0,
        animation: 'breathe 8s ease-in-out infinite'
      }} />

      {/* Floating Sacred Mathematics */}
      <div style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        background: 'rgba(11,11,11,0.8)',
        border: '2px solid rgba(200,164,77,0.4)',
        borderRadius: '50px',
        padding: '1rem 2rem',
        backdropFilter: 'blur(20px)',
        fontSize: '0.9rem',
        color: '#C8A44D',
        fontFamily: "'Cinzel', serif",
        zIndex: 100,
        boxShadow: '0 0 30px rgba(122,51,255,0.3)'
      }}>
        <div>Node: {character.codexNode}/144</div>
        <div>Level: {character.consciousnessLevel}</div>
      </div>

      <div style={{
        position: 'relative',
        zIndex: 1,
        width: '100%',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'auto'
      }}>
        {/* Living Cathedral Header */}
        <div style={{
          textAlign: 'center',
          padding: '3rem 2rem',
          background: `
            linear-gradient(135deg, 
              rgba(122,51,255,0.6) 0%, 
              rgba(200,164,77,0.4) 50%, 
              transparent 100%)
          `,
          backdropFilter: 'blur(20px)',
          marginBottom: '2rem'
        }}>
          <h1 style={{ 
            fontSize: 'clamp(2.5rem, 8vw, 5rem)', 
            marginBottom: '1rem',
            fontFamily: "'Cinzel', serif",
            fontWeight: 700,
            letterSpacing: '4px',
            textTransform: 'uppercase',
            background: 'linear-gradient(135deg, #C8A44D, #F5F2EA, #7A33FF)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            filter: 'drop-shadow(0 0 20px rgba(200,164,77,0.8))'
          }}>
            CODEX 144:99
          </h1>
          <p style={{ 
            fontSize: 'clamp(1rem, 3vw, 1.8rem)', 
            opacity: 0.9,
            letterSpacing: '2px',
            fontStyle: 'italic'
          }}>
            Living Angel Tech Cathedral
          </p>
        </div>

        {/* Character Genesis - Organic Flow */}
        <div style={{
          maxWidth: '90%',
          margin: '0 auto 3rem auto',
          background: 'rgba(245,242,234,0.05)',
          borderRadius: '50px',
          padding: '3rem',
          backdropFilter: 'blur(15px)',
          border: '1px solid rgba(200,164,77,0.2)'
        }}>
          <h2 style={{ 
            fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', 
            marginBottom: '2rem',
            textAlign: 'center',
            color: '#C8A44D',
            fontFamily: "'Cinzel', serif"
          }}>
            Sacred Character Genesis
          </h2>
          
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column',
            gap: '2rem',
            alignItems: 'center'
          }}>
            <input
              type="text"
              placeholder="Enter your sacred name of power..."
              value={character.name}
              onChange={(e) => setCharacter(prev => ({ ...prev, name: e.target.value }))}
              style={{
                background: 'rgba(11,11,11,0.6)',
                border: '2px solid rgba(122,51,255,0.4)',
                borderRadius: '30px',
                padding: '1rem 2rem',
                fontSize: '1.2rem',
                color: '#F5F2EA',
                width: '100%',
                maxWidth: '500px',
                fontFamily: "'Cinzel', serif",
                textAlign: 'center',
                backdropFilter: 'blur(10px)'
              }}
            />

            <select
              value={character.archetypeAffinity}
              onChange={(e) => setCharacter(prev => ({ ...prev, archetypeAffinity: e.target.value }))}
              style={{
                background: 'rgba(11,11,11,0.6)',
                border: '2px solid rgba(122,51,255,0.4)',
                borderRadius: '30px',
                padding: '1rem 2rem',
                fontSize: '1.2rem',
                color: '#F5F2EA',
                width: '100%',
                maxWidth: '500px',
                fontFamily: "'Cinzel', serif",
                textAlign: 'center',
                backdropFilter: 'blur(10px)'
              }}
            >
              <option value="The Fool">The Fool - Infinite Sacred Potential</option>
              <option value="The Magician">The Magician - Divine Will Manifest</option>
              <option value="The High Priestess">The High Priestess - Sacred Intuitive Wisdom</option>
              <option value="The Empress">The Empress - Creative Sacred Matrix</option>
              <option value="The Emperor">The Emperor - Divine Sacred Authority</option>
              <option value="The Hierophant">The Hierophant - Sacred Mystical Tradition</option>
              <option value="The Lovers">The Lovers - Sacred Union and Choice</option>
              <option value="The Chariot">The Chariot - Focused Sacred Will</option>
            </select>
          </div>
        </div>

        {/* Living Sacred Circles - 8 Circuits as Organic Mandalas */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '2rem',
          padding: '0 2rem 4rem 2rem',
          justifyItems: 'center'
        }}>
          {Object.entries(character.circuits).map(([circuitName, circuit], index) => {
            const angle = (index / 8) * 2 * Math.PI;
            const isSelected = selectedCircuit === circuitName;
            
            return (
              <div
                key={circuitName}
                style={{
                  width: '320px',
                  height: '320px',
                  borderRadius: '50%',
                  background: `
                    radial-gradient(circle at center, 
                      rgba(122,51,255,${circuit.activated ? 0.4 : 0.2}) 0%, 
                      rgba(200,164,77,${circuit.mastery / 144 * 0.3}) 40%, 
                      rgba(11,11,11,0.8) 80%)
                  `,
                  border: isSelected 
                    ? '4px solid #C8A44D' 
                    : '2px solid rgba(122,51,255,0.3)',
                  cursor: 'pointer',
                  transition: 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                  backdropFilter: 'blur(15px)',
                  boxShadow: isSelected
                    ? '0 0 60px rgba(200,164,77,0.6), 0 0 30px rgba(122,51,255,0.4)'
                    : '0 0 20px rgba(122,51,255,0.2)',
                  transform: isSelected ? 'scale(1.05)' : 'scale(1)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '2rem',
                  textAlign: 'center',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onClick={() => {
                  setSelectedCircuit(circuitName);
                  activateCircuit(circuitName);
                }}
              >
                {/* Sacred Geometry Pattern */}
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '80%',
                  height: '80%',
                  borderRadius: '50%',
                  border: '1px solid rgba(200,164,77,0.3)',
                  opacity: 0.5
                }} />
                
                {/* Mastery Indicator */}
                <div style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: `conic-gradient(
                    rgba(200,164,77,0.8) 0deg, 
                    rgba(200,164,77,0.8) ${(circuit.mastery / 144) * 360}deg, 
                    transparent ${(circuit.mastery / 144) * 360}deg
                  )`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.8rem',
                  color: '#F5F2EA',
                  fontWeight: 'bold'
                }}>
                  {circuit.mastery}
                </div>

                <h3 style={{
                  fontSize: '1.3rem',
                  marginBottom: '1rem',
                  color: '#F5F2EA',
                  fontFamily: "'Cinzel', serif",
                  letterSpacing: '1px'
                }}>
                  {circuitName}
                </h3>

                <p style={{
                  fontSize: '0.9rem',
                  lineHeight: '1.4',
                  color: '#E8E8F0',
                  opacity: 0.9,
                  marginBottom: '1rem'
                }}>
                  {circuit.experience}
                </p>

                <div style={{
                  fontSize: '0.8rem',
                  color: '#7A33FF',
                  fontStyle: 'italic',
                  marginBottom: '0.5rem'
                }}>
                  {circuit.archetypeConnection}
                </div>

                <div style={{
                  fontSize: '0.8rem',
                  color: '#C8A44D',
                  fontFamily: "'Cinzel', serif"
                }}>
                  {circuit.frequency}Hz
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Circuit Sacred Knowledge */}
        {selectedCircuit && (
          <div style={{
            maxWidth: '800px',
            margin: '0 auto 3rem auto',
            background: `
              radial-gradient(ellipse at center, 
                rgba(122,51,255,0.3) 0%, 
                rgba(200,164,77,0.2) 50%, 
                rgba(11,11,11,0.9) 100%)
            `,
            borderRadius: '30px',
            padding: '3rem',
            border: '2px solid rgba(200,164,77,0.4)',
            backdropFilter: 'blur(20px)',
            textAlign: 'center'
          }}>
            <h3 style={{
              fontSize: '2rem',
              marginBottom: '1.5rem',
              color: '#C8A44D',
              fontFamily: "'Cinzel', serif"
            }}>
              {selectedCircuit} Sacred Wisdom
            </h3>
            <p style={{
              fontSize: '1.2rem',
              lineHeight: '1.6',
              color: '#F5F2EA',
              fontStyle: 'italic',
              marginBottom: '1rem'
            }}>
              "{character.circuits[selectedCircuit].sacredKnowledge}"
            </p>
          </div>
        )}

        {/* Character Profile - Flowing Design */}
        <div style={{
          maxWidth: '900px',
          margin: '0 auto 2rem auto',
          background: 'rgba(245,242,234,0.1)',
          borderRadius: '40px',
          padding: '2rem',
          backdropFilter: 'blur(15px)',
          border: '1px solid rgba(200,164,77,0.3)',
          textAlign: 'center'
        }}>
          <h2 style={{
            fontSize: '1.8rem',
            marginBottom: '1.5rem',
            color: '#C8A44D',
            fontFamily: "'Cinzel', serif"
          }}>
            Sacred Character Profile
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
            fontSize: '1.1rem',
            color: '#F5F2EA'
          }}>
            <div>
              <strong style={{ color: '#7A33FF' }}>Name:</strong><br />
              {character.name || 'Unnamed Initiate'}
            </div>
            <div>
              <strong style={{ color: '#7A33FF' }}>Archetype:</strong><br />
              {character.archetypeAffinity}
            </div>
            <div>
              <strong style={{ color: '#7A33FF' }}>Active Circuits:</strong><br />
              {Object.values(character.circuits).filter(c => c.activated).length}/8
            </div>
            <div>
              <strong style={{ color: '#7A33FF' }}>Consciousness Level:</strong><br />
              {character.consciousnessLevel}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes breathe {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.02); }
        }
        
        input::placeholder, select option {
          color: rgba(232,232,240,0.6);
          font-style: italic;
        }
        
        select option {
          background: #0B0B0B;
          color: #F5F2EA;
        }
      `}</style>
    </div>
  );
};

export default Code14499Interface;