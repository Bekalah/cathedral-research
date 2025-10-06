/**
 * 🃏✨ CHARACTER PORTAL COMPONENT
 * 
 * Integration of Liber Arcanae character system into Cathedral Hub
 * Provides access to all 22 Major Arcana sculpting tools
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text, Sphere } from '@react-three/drei';

// Import our character system
import { 
  createCharacter, 
  createRebecca, 
  createVirelai, 
  createIGNI,
  getAllCharacterKeys,
  getCharactersByApp,
  LIBER_ARCANAE 
} from '../../../shared/characters/index.js';

interface CharacterPortalProps {
  onCharacterSelect?: (character: any) => void;
  selectedApp?: string;
}

const CharacterPortal: React.FC<CharacterPortalProps> = ({ 
  onCharacterSelect,
  selectedApp = 'cathedral-hub'
}) => {
  const [characters, setCharacters] = useState<any[]>([]);
  const [selectedCharacter, setSelectedCharacter] = useState<string | null>(null);
  const [activeCharacter, setActiveCharacter] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCharacters();
  }, [selectedApp]);

  const loadCharacters = async () => {
    try {
      setLoading(true);
      
      // Get characters for current app
      const appCharacters = getCharactersByApp(selectedApp);
      
      // Add all characters if cathedral-hub (main portal)
      if (selectedApp === 'cathedral-hub') {
        const allKeys = getAllCharacterKeys();
        const allCharacters = allKeys.map(key => ({
          key,
          character: LIBER_ARCANAE[key]
        }));
        setCharacters(allCharacters);
      } else {
        setCharacters(appCharacters);
      }
      
      setLoading(false);
    } catch (error) {
      console.error('Failed to load characters:', error);
      setLoading(false);
    }
  };

  const handleCharacterSelect = async (characterKey: string) => {
    try {
      setSelectedCharacter(characterKey);
      
      // Create character instance
      let character;
      switch (characterKey) {
        case '00_fool':
          character = createRebecca();
          break;
        case '01_magician':
          character = createVirelai();
          break;
        case '07_chariot':
          character = createIGNI();
          break;
        default:
          character = createCharacter(characterKey);
      }
      
      // Activate character
      const sculptingTool = character.activate();
      setActiveCharacter({ character, tool: sculptingTool });
      
      // Notify parent component
      if (onCharacterSelect) {
        onCharacterSelect({ character, tool: sculptingTool });
      }
      
      console.log(`🎭 ${character.archetype.name} activated and ready!`);
      
    } catch (error) {
      console.error('Failed to activate character:', error);
    }
  };

  const CharacterCard: React.FC<{ characterData: any }> = ({ characterData }) => {
    const { key, character } = characterData;
    const isSelected = selectedCharacter === key;
    const isCore = ['00_fool', '01_magician', '07_chariot'].includes(key);
    
    return (
      <motion.div
        className={`character-card ${isSelected ? 'selected' : ''} ${isCore ? 'core' : ''}`}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.05, y: -5 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => handleCharacterSelect(key)}
      >
        <div className="character-header">
          <div className="character-number">{key.split('_')[0]}</div>
          <div className="character-element" data-element={character.element}>
            {getElementIcon(character.element)}
          </div>
        </div>
        
        <div className="character-portrait">
          <CharacterVisualization character={character} />
        </div>
        
        <div className="character-info">
          <h3 className="character-name">{character.name}</h3>
          <h4 className="character-title">{character.title}</h4>
          <p className="character-class">{character.class}</p>
          
          <div className="character-details">
            <div className="character-crystal">
              🔮 {character.crystal.name}
            </div>
            <div className="character-frequency">
              🎵 {character.frequency}Hz
            </div>
          </div>
          
          <div className="character-specialties">
            {character.specialties.slice(0, 2).map((specialty: string, index: number) => (
              <span key={index} className="specialty-tag">
                {specialty.replace(/-/g, ' ')}
              </span>
            ))}
          </div>
          
          {isCore && <div className="core-badge">⭐ Core Character</div>}
        </div>
        
        <div className="character-apps">
          <strong>Apps:</strong> {character.apps.join(', ')}
        </div>
      </motion.div>
    );
  };

  const CharacterVisualization: React.FC<{ character: any }> = ({ character }) => {
    return (
      <div className="character-3d">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} intensity={0.6} />
          
          {/* Crystal representation */}
          <Sphere args={[1, 32, 32]} position={[0, 0, 0]}>
            <meshStandardMaterial 
              color={getCrystalColor(character.crystal.name)}
              transparent
              opacity={0.7}
              roughness={0.1}
              metalness={0.8}
            />
          </Sphere>
          
          {/* Character frequency visualization */}
          <mesh rotation={[0, 0, 0]}>
            <torusGeometry args={[1.5, 0.1, 8, 32]} />
            <meshStandardMaterial 
              color={getFrequencyColor(character.frequency)}
              emissive={getFrequencyColor(character.frequency)}
              emissiveIntensity={0.2}
            />
          </mesh>
          
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />
        </Canvas>
      </div>
    );
  };

  const ActiveCharacterPanel: React.FC = () => {
    if (!activeCharacter) return null;
    
    const { character, tool } = activeCharacter;
    
    return (
      <motion.div
        className="active-character-panel"
        initial={{ opacity: 0, x: 300 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 300 }}
      >
        <div className="panel-header">
          <h2>🎭 {character.archetype.name}</h2>
          <p>{character.archetype.title}</p>
          <button 
            className="deactivate-btn"
            onClick={() => {
              character.deactivate();
              setActiveCharacter(null);
              setSelectedCharacter(null);
            }}
          >
            Deactivate
          </button>
        </div>
        
        <div className="panel-content">
          <div className="character-guidance">
            <h3>💫 Guidance</h3>
            <p>{character.getGuidance('general')}</p>
          </div>
          
          <div className="character-techniques">
            <h3>🎨 Techniques</h3>
            <ul>
              {character.archetype.artistic_techniques.map((technique: string, index: number) => (
                <li key={index}>{technique}</li>
              ))}
            </ul>
          </div>
          
          <div className="character-tools">
            <h3>🔧 Sculpting Tools</h3>
            <p>Specialized {character.archetype.class} ready for creation</p>
            
            {/* Quick action buttons based on character */}
            <div className="quick-actions">
              {character.archetype.key === '00_fool' && (
                <button onClick={() => character.createRespawnStation('Portal Entry')}>
                  🌀 Create Respawn Station
                </button>
              )}
              
              {character.archetype.key === '01_magician' && (
                <button onClick={() => character.activateOctarineRay()}>
                  ✨ Activate Octarine Ray
                </button>
              )}
              
              {character.archetype.key === '07_chariot' && (
                <button onClick={() => character.initializeDragonKiln()}>
                  🔥 Initialize Dragon Kiln
                </button>
              )}
            </div>
          </div>
          
          <div className="character-status">
            <h3>📊 Status</h3>
            <div className="status-grid">
              <div>Active: {character.isActive ? '✅' : '❌'}</div>
              <div>Frequency: {character.archetype.frequency}Hz</div>
              <div>Crystal: {character.archetype.crystal.name}</div>
              <div>Element: {character.archetype.element}</div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  if (loading) {
    return (
      <div className="character-portal loading">
        <motion.div
          className="loading-spinner"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          🃏
        </motion.div>
        <p>Loading Liber Arcanae...</p>
      </div>
    );
  }

  return (
    <div className="character-portal">
      <div className="portal-header">
        <h2>🃏✨ Liber Arcanae - Character Portal</h2>
        <p>Choose your mystical sculptor and begin creating impossible art</p>
        <div className="portal-stats">
          {characters.length} Characters Available • 
          {activeCharacter ? ` ${activeCharacter.character.archetype.name} Active` : ' None Active'}
        </div>
      </div>
      
      <div className="portal-layout">
        <div className="characters-grid">
          <AnimatePresence>
            {characters.map((characterData, index) => (
              <CharacterCard
                key={characterData.key}
                characterData={characterData}
              />
            ))}
          </AnimatePresence>
        </div>
        
        <AnimatePresence>
          <ActiveCharacterPanel />
        </AnimatePresence>
      </div>
      
      <div className="portal-footer">
        <p>
          🎭 Each character offers unique sculpting tools based on real artistic traditions
          • 🔮 Crystal physics integration • 🎵 Healing frequencies • 📐 Sacred geometry
        </p>
      </div>
    </div>
  );
};

// Helper functions
function getElementIcon(element: string): string {
  const icons = {
    'Fire': '🔥',
    'Water': '🌊', 
    'Earth': '🌍',
    'Air': '💨',
    'Spirit': '✨',
    'Void': '🌀'
  };
  return icons[element as keyof typeof icons] || '⚡';
}

function getCrystalColor(crystalName: string): string {
  const colors = {
    'Clear Quartz': '#FFFFFF',
    'Labradorite': '#4A5568',
    'Moonstone': '#E2E8F0',
    'Rose Quartz': '#F7FAFC',
    'Bloodstone': '#2D3748',
    'Sodalite': '#3182CE',
    'Rhodonite': '#E53E3E',
    'Black Onyx': '#1A202C',
    'Carnelian': '#DD6B20',
    'Amethyst': '#805AD5'
  };
  return colors[crystalName as keyof typeof colors] || '#718096';
}

function getFrequencyColor(frequency: number): string {
  if (frequency <= 285) return '#E53E3E'; // Red - Root
  if (frequency <= 396) return '#DD6B20'; // Orange - Sacral  
  if (frequency <= 417) return '#D69E2E'; // Yellow - Solar
  if (frequency <= 528) return '#38A169'; // Green - Heart
  if (frequency <= 639) return '#3182CE'; // Blue - Throat
  if (frequency <= 741) return '#805AD5'; // Indigo - Third Eye
  if (frequency <= 852) return '#B794F6'; // Violet - Crown
  return '#E2E8F0'; // White - Soul Star
}

export default CharacterPortal;