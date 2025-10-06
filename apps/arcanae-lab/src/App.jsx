/**
 * Arcanae Lab - High Fantasy Archetype Research Interface
 * Alexander McQueen meets Sacred Geometry in a couture mystical experience
 */

import { useState, useEffect, useRef } from 'react';
// import { Canvas } from '@react-three/fiber';
// import { OrbitControls, Environment, Stats, PerspectiveCamera } from '@react-three/drei';
import { mysticalCrossReference } from '../../../src/services/mystical-cross-reference.js';
import './styles.css';

// Utility functions available to all components
const getElementIcon = (element) => {
  const icons = {
    'fire': '🔥',
    'water': '🌊', 
    'air': '💨',
    'earth': '🌍',
    'aether': '✨',
    'spirit': '👁️'
  };
  return icons[element?.toLowerCase()] || '⚪';
};

const getRayColor = (rayNumber) => {
  const rayColors = {
    1: '#ff4444', // Will/Power - Red
    2: '#4444ff', // Love/Wisdom - Blue
    3: '#44ff44', // Active Intelligence - Green
    4: '#ffff44', // Harmony/Beauty - Yellow
    5: '#ff8844', // Concrete Knowledge - Orange
    6: '#ff44ff', // Devotion/Idealism - Magenta
    7: '#8844ff'  // Ceremonial Order - Violet
  };
  return rayColors[rayNumber] || '#888888';
};

function App() {
  // Core application state
  const [_activeCard, _setActiveCard] = useState(null);
  const [selectedArchetype, setSelectedArchetype] = useState('the-fool');
  const [researchMode, setResearchMode] = useState('exploration');
  const [visualizationMode, setVisualizationMode] = useState('archetype');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [researchData, setResearchData] = useState(null);

  // Mystical research state
  const [archetypeProfile, setArchetypeProfile] = useState(null);
  const [relatedArchetypes, setRelatedArchetypes] = useState([]);
  const [mysticalInsights, setMysticalInsights] = useState([]);
  const [harmonicAnalysis, setHarmonicAnalysis] = useState(null);

  // UI state
  const [_showDetails, setShowDetails] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [_filterElement, _setFilterElement] = useState('all');
  const [activeRealm, setActiveRealm] = useState('hermetic');

  // Refs for 3D scene management (currently unused but prepared for Three.js integration)
  const _sceneRef = useRef();
  const _cameraRef = useRef();

  // Action handlers
  const exportResearchData = () => {
    const researchData = {
      profile: archetypeProfile,
      analysis: harmonicAnalysis,
      crossReference: mysticalCrossReference,
      timestamp: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(researchData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `cathedral-research-${Date.now()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const generateSymbolFusion = () => {
    // Advanced symbol fusion logic for future Three.js integration
    console.log('Generating symbol fusion...', { archetypeProfile, harmonicAnalysis });
    setShowDetails(prev => !prev);
  };

  // Utility functions for visual elements
  const getElementIcon = (element) => {
    const icons = {
      'fire': '🔥',
      'water': '🌊', 
      'air': '💨',
      'earth': '🌍',
      'aether': '✨',
      'spirit': '👁️'
    };
    return icons[element?.toLowerCase()] || '⚪';
  };

  const getRayColor = (rayNumber) => {
    const rayColors = {
      1: '#ff4444', // Will/Power - Red
      2: '#4444ff', // Love/Wisdom - Blue  
      3: '#ffff44', // Active Intelligence - Yellow
      4: '#44ff44', // Harmony/Beauty - Green
      5: '#ff8844', // Concrete Knowledge - Orange
      6: '#ff44ff', // Devotion/Idealism - Magenta
      7: '#8844ff'  // Ceremonial Order - Violet
    };
    return rayColors[rayNumber] || '#888888';
  };

  // Enhanced realm configurations with high fantasy couture aesthetic
  const coutureRealms = [
    {
      id: 'archetype-lab',
      name: '🏛️ Archetype Atelier',
      description: 'Couture exploration of living tarot archetypes',
      aesthetic: 'Alexander McQueen meets Hilma af Klint',
      features: ['Living Archetypes', 'Couture Symbolism', 'Harmonic Research', 'Sacred Couture'],
      primaryColor: '#9b59b6',
      secondaryColor: '#e74c3c'
    },
    {
      id: 'harmonic-chamber',
      name: '🎼 Harmonic Sanctum',
      description: 'Sacred sound and frequency research laboratory',
      aesthetic: 'Gothic cathedral meets musical mathematics',
      features: ['Solfeggio Harmonics', 'Crystal Frequencies', 'Sound Geometry', 'Vibrational Research'],
      primaryColor: '#3498db',
      secondaryColor: '#2ecc71'
    },
    {
      id: 'symbol-fusion',
      name: '🔮 Symbol Fusion Atelier',
      description: 'Advanced archetypal research and symbol creation',
      aesthetic: 'Illuminated manuscript meets digital couture',
      features: ['Symbol Generation', 'Archetype Fusion', 'Research Export', 'Pattern Analysis'],
      primaryColor: '#e67e22',
      secondaryColor: '#f39c12'
    },
    {
      id: 'consciousness-forge',
      name: '🧠 Consciousness Atelier',
      description: 'Living deities and consciousness exploration laboratory',
      aesthetic: 'Temple of living gods meets research facility',
      features: ['Living Deities', 'Consciousness Mapping', 'Archetype Networks', 'Divine Interfaces'],
      primaryColor: '#1abc9c',
      secondaryColor: '#16a085'
    }
  ];

  // Initialize archetype research on component mount
  useEffect(() => {
    initializeArchetypeResearch();
  }, []);

  // Update research when archetype changes
  useEffect(() => {
    if (selectedArchetype) {
      analyzeArchetype(selectedArchetype);
    }
  }, [selectedArchetype, researchMode]);

  const initializeArchetypeResearch = async () => {
    try {
      console.log('🔬 Initializing Arcanae Lab research systems...');

      // Get initial archetype profile
      const profile = mysticalCrossReference.generateMysticalProfile('the-fool');
      setArchetypeProfile(profile);

      // Get related archetypes
      const related = mysticalCrossReference.findRelated('the-fool', 'all');
      setRelatedArchetypes(related);

      console.log('✨ Arcanae Lab research systems initialized');
    } catch (error) {
      console.error('❌ Failed to initialize archetype research:', error);
    }
  };

  const analyzeArchetype = async (archetypeId) => {
    setIsAnalyzing(true);

    try {
      console.log(`🔬 Analyzing archetype: ${archetypeId}`);

      // Generate comprehensive mystical profile
      const profile = mysticalCrossReference.generateMysticalProfile(archetypeId);
      setArchetypeProfile(profile);

      // Find related archetypes
      const related = mysticalCrossReference.findRelated(archetypeId, 'all');
      setRelatedArchetypes(related);

      // Generate mystical insights
      const insights = mysticalCrossReference.generateMysticalInsight(archetypeId);
      setMysticalInsights(insights || []);

      // Generate harmonic analysis
      const harmonic = generateHarmonicAnalysis(profile);
      setHarmonicAnalysis(harmonic);

      // Set research data for visualization
      setResearchData({
        archetype: profile,
        related: related,
        insights: insights,
        harmonic: harmonic,
        timestamp: Date.now()
      });

      console.log(`✅ Archetype analysis complete: ${archetypeId}`);

    } catch (error) {
      console.error('❌ Archetype analysis failed:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const generateHarmonicAnalysis = (profile) => {
    if (!profile || !profile.card) return null;

    const card = profile.card;
    const analysis = {
      primaryFrequency: card.crystal?.frequency || 432,
      harmonicSeries: [],
      elementalResonance: {},
      rayCompatibility: {},
      ritualTiming: {}
    };

    // Generate harmonic series based on card properties
    const baseFreq = card.crystal?.frequency || 432;
    for (let i = 1; i <= 7; i++) {
      analysis.harmonicSeries.push({
        harmonic: i,
        frequency: baseFreq * i,
        purpose: getHarmonicPurpose(i, card.element),
        strength: Math.max(0.1, 1 / i)
      });
    }

    // Analyze elemental resonance
    analysis.elementalResonance = {
      primary: card.element,
      strength: 0.9,
      compatible: findCompatibleElements(card.element),
      challenging: findChallengingElements(card.element)
    };

    // Analyze ray compatibility
    if (card.ray?.number) {
      analysis.rayCompatibility = {
        primary: card.ray.number,
        color: card.ray.color,
        frequency: card.ray.frequency,
        compatibleRays: findCompatibleRays(card.ray.number)
      };
    }

    return analysis;
  };

  const getHarmonicPurpose = (harmonic, _element) => {
    const purposes = {
      1: 'Foundation and grounding',
      2: 'Balance and harmony',
      3: 'Creativity and expression',
      4: 'Structure and stability',
      5: 'Knowledge and wisdom',
      6: 'Devotion and healing',
      7: 'Integration and completion'
    };

    return purposes[harmonic] || 'Mystical resonance';
  };

  const findCompatibleElements = (element) => {
    const compatibility = {
      fire: ['air', 'earth'],
      earth: ['fire', 'water'],
      air: ['fire', 'water'],
      water: ['earth', 'air']
    };

    return compatibility[element] || [];
  };

  const findChallengingElements = (element) => {
    const challenges = {
      fire: ['water'],
      earth: ['air'],
      air: ['earth'],
      water: ['fire']
    };

    return challenges[element] || [];
  };

  const findCompatibleRays = (rayNumber) => {
    // Rays that work well together
    const compatible = {
      1: [3, 5, 7],
      2: [4, 6],
      3: [1, 5, 7],
      4: [2, 6],
      5: [1, 3, 7],
      6: [2, 4],
      7: [1, 3, 5]
    };

    return compatible[rayNumber] || [];
  };

  const handleArchetypeSelection = (archetypeId) => {
    setSelectedArchetype(archetypeId);
    setShowDetails(true);
  };

  return (
    <div className="arcanae-lab-app">
      <header className="couture-header">
        <div className="header-overlay">
          <h1 className="couture-title">🔮 Arcanae Lab</h1>
          <p className="couture-subtitle">
            High Fantasy Archetype Research • Alexander McQueen meets Sacred Geometry
          </p>

          <div className="realm-navigation">
            {coutureRealms.map(realm => (
              <button
                key={realm.id}
                className={`couture-realm-btn ${activeRealm === realm.id ? 'active' : ''}`}
                onClick={() => setActiveRealm(realm.id)}
                style={{
                  borderColor: realm.primaryColor,
                  backgroundColor: activeRealm === realm.id ? realm.primaryColor : 'transparent'
                }}
              >
                {realm.name}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="research-main">
        <div className="research-grid">
          {/* Archetype Selection Panel */}
          <section className="archetype-panel">
            <div className="panel-header">
              <h2>🏛️ Archetype Atelier</h2>
              <div className="mode-selector">
                <button
                  className={researchMode === 'exploration' ? 'active' : ''}
                  onClick={() => setResearchMode('exploration')}
                >
                  Exploration
                </button>
                <button
                  className={researchMode === 'analysis' ? 'active' : ''}
                  onClick={() => setResearchMode('analysis')}
                >
                  Deep Analysis
                </button>
                <button
                  className={researchMode === 'synthesis' ? 'active' : ''}
                  onClick={() => setResearchMode('synthesis')}
                >
                  Synthesis
                </button>
              </div>
            </div>

            <div className="archetype-grid">
              {mysticalCrossReference.data?.tarot?.majorArcana?.map((card, _index) => (
                <div
                  key={card.id}
                  className={`archetype-card ${selectedArchetype === card.id ? 'selected' : ''}`}
                  onClick={() => handleArchetypeSelection(card.id)}
                >
                  <div className="card-header">
                    <span className="card-number">{card.number}</span>
                    <span className="element-icon">{getElementIcon(card.element)}</span>
                  </div>
                  <div className="card-name">{card.name}</div>
                  <div className="card-element" style={{ color: getRayColor(card.ray?.number) }}>
                    {card.element} • Ray {card.ray?.number}
                  </div>
                  <div className="card-entities">
                    {card.angel} ↔ {card.demon}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 3D Visualization Panel */}
          <section className="visualization-panel">
            <div className="panel-header">
              <h2>🎨 Couture Visualization</h2>
              <div className="viz-controls">
                <button
                  className={visualizationMode === 'archetype' ? 'active' : ''}
                  onClick={() => setVisualizationMode('archetype')}
                >
                  Archetype
                </button>
                <button
                  className={visualizationMode === 'harmonic' ? 'active' : ''}
                  onClick={() => setVisualizationMode('harmonic')}
                >
                  Harmonic
                </button>
                <button
                  className={visualizationMode === 'network' ? 'active' : ''}
                  onClick={() => setVisualizationMode('network')}
                >
                  Network
                </button>
              </div>
            </div>

            <div className="three-container">
              <Canvas className="research-canvas">
                <Environment preset="studio" />
                <ambientLight intensity={0.4} />
                <directionalLight position={[10, 10, 5]} intensity={0.8} />
                <pointLight position={[-10, -10, -5]} intensity={0.4} color="#9b59b6" />

                {researchData && (
                  <ArchetypeVisualization
                    data={researchData}
                    mode={visualizationMode}
                    isAnalyzing={isAnalyzing}
                  />
                )}

                <OrbitControls
                  enablePan={true}
                  enableZoom={true}
                  enableRotate={true}
                  maxDistance={50}
                  minDistance={2}
                />
                <Stats />
              </Canvas>
            </div>
          </section>

          {/* Research Details Panel */}
          <section className="research-panel">
            <div className="panel-header">
              <h2>🔬 Research Analysis</h2>
              <div className="tab-selector">
                <button
                  className={activeTab === 'overview' ? 'active' : ''}
                  onClick={() => setActiveTab('overview')}
                >
                  Overview
                </button>
                <button
                  className={activeTab === 'harmonic' ? 'active' : ''}
                  onClick={() => setActiveTab('harmonic')}
                >
                  Harmonic
                </button>
                <button
                  className={activeTab === 'relationships' ? 'active' : ''}
                  onClick={() => setActiveTab('relationships')}
                >
                  Relationships
                </button>
                <button
                  className={activeTab === 'insights' ? 'active' : ''}
                  onClick={() => setActiveTab('insights')}
                >
                  Insights
                </button>
              </div>
            </div>

            <div className="research-content">
              {archetypeProfile && (
                <div className="research-details">
                  {activeTab === 'overview' && (
                    <OverviewTab profile={archetypeProfile} />
                  )}
                  {activeTab === 'harmonic' && (
                    <HarmonicTab analysis={harmonicAnalysis} />
                  )}
                  {activeTab === 'relationships' && (
                    <RelationshipsTab related={relatedArchetypes} />
                  )}
                  {activeTab === 'insights' && (
                    <InsightsTab insights={mysticalInsights} />
                  )}
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Floating Action Panel */}
        <div className="action-panel">
          <button
            className="research-action-btn primary"
            onClick={() => analyzeArchetype(selectedArchetype)}
            disabled={isAnalyzing}
          >
            {isAnalyzing ? '🔬 Analyzing...' : '🔬 Deep Analysis'}
          </button>

          <button
            className="research-action-btn secondary"
            onClick={() => exportResearchData()}
          >
            📊 Export Research
          </button>

          <button
            className="research-action-btn tertiary"
            onClick={() => generateSymbolFusion()}
          >
            🔮 Symbol Fusion
          </button>
        </div>
      </main>

      <footer className="couture-footer">
        <div className="footer-content">
          <p>
            Arcanae Lab • High Fantasy Archetype Research •
            Alexander McQueen meets Sacred Geometry •
            Research-Grade Consciousness Computing
          </p>
          <div className="system-status">
            <span className="status-indicator active">🔬 Research Engine: Active</span>
            <span className="status-indicator">🏛️ Archetypes: {mysticalCrossReference.data?.tarot?.majorArcana?.length || 0}</span>
            <span className="status-indicator">🔗 Connections: {relatedArchetypes.length}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Helper component for archetype visualization
const _ArchetypeVisualization = ({ data, mode, _isAnalyzing }) => {
  const groupRef = useRef();

  if (!data) return null;

  return (
    <group ref={groupRef}>
      {/* Central archetype manifestation */}
      <mesh position={[0, 0, 0]}>
        <octahedronGeometry args={[2, 1]} />
        <meshPhysicalMaterial
          color={data.archetype?.card?.ray?.color ? parseInt(data.archetype.card.ray.color.replace('#', ''), 16) : 0x9b59b6}
          metalness={0.3}
          roughness={0.2}
          emissive={0x2c1810}
        />
      </mesh>

      {/* Related archetype connections */}
      {data.related?.slice(0, 5).map((related, index) => {
        const angle = (index / 5) * Math.PI * 2;
        const radius = 4;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;

        return (
          <group key={related.card?.id || index}>
            <mesh position={[x, 0, z]}>
              <tetrahedronGeometry args={[1]} />
              <meshBasicMaterial
                color={related.card?.ray?.color ? parseInt(related.card.ray.color.replace('#', ''), 16) : 0x88ccff}
                transparent
                opacity={0.7}
              />
            </mesh>

            {/* Connection line */}
            <line>
              <bufferGeometry>
                <bufferAttribute
                  attach="attributes-position"
                  count={2}
                  array={new Float32Array([0, 0, 0, x, 0, z])}
                  itemSize={3}
                />
              </bufferGeometry>
              <lineBasicMaterial color={0xffffff} transparent opacity={0.3} />
            </line>
          </group>
        );
      })}

      {/* Harmonic field visualization */}
      {mode === 'harmonic' && data.harmonic && (
        <HarmonicFieldVisualization analysis={data.harmonic} />
      )}
    </group>
  );
};

// Helper component for harmonic field visualization
const _HarmonicFieldVisualization = ({ analysis }) => {
  return (
    <group>
      {analysis?.harmonicSeries?.map((harmonic, index) => {
        const radius = 6 + (index * 2);
        const height = harmonic.strength * 3;

        return (
          <mesh
            key={harmonic.harmonic}
            position={[0, height / 2, 0]}
          >
            <cylinderGeometry args={[radius, radius, height, 32]} />
            <meshBasicMaterial
              color={harmonic.harmonic % 2 === 0 ? 0x9b59b6 : 0xe74c3c}
              transparent
              opacity={0.2}
            />
          </mesh>
        );
      })}
    </group>
  );
};

// Tab content components
const _OverviewTab = ({ profile }) => (
  <div className="overview-tab">
    <div className="archetype-header">
      <h3>{profile.card?.name}</h3>
      <div className="archetype-badges">
        <span className="badge element">{getElementIcon(profile.card?.element)} {profile.card?.element}</span>
        <span className="badge ray" style={{ backgroundColor: getRayColor(profile.card?.ray?.number) }}>
          Ray {profile.card?.ray?.number}
        </span>
        <span className="badge crystal">{profile.card?.crystal?.name}</span>
      </div>
    </div>

    <div className="correspondences-grid">
      <div className="correspondence-item">
        <strong>Angel:</strong> {profile.card?.angel}
      </div>
      <div className="correspondence-item">
        <strong>Demon:</strong> {profile.card?.demon}
      </div>
      <div className="correspondence-item">
        <strong>Crystal:</strong> {profile.card?.crystal?.name} ({profile.card?.crystal?.formula})
      </div>
      <div className="correspondence-item">
        <strong>Frequency:</strong> {profile.card?.crystal?.frequency}Hz
      </div>
      <div className="correspondence-item">
        <strong>Tara:</strong> {profile.card?.tara}
      </div>
    </div>

    <div className="psyche-analysis">
      <h4>🧠 Psychological Profile</h4>
      <div className="psyche-grid">
        <div className="psyche-item">
          <strong>Wetiko:</strong> {profile.card?.psyche?.wetiko}
        </div>
        <div className="psyche-item">
          <strong>IFS Part:</strong> {profile.card?.psyche?.part}
        </div>
        <div className="psyche-item">
          <strong>Medicine:</strong> {profile.card?.psyche?.medicine}
        </div>
      </div>
    </div>
  </div>
);

const _HarmonicTab = ({ analysis }) => (
  <div className="harmonic-tab">
    <h4>🎼 Harmonic Analysis</h4>

    {analysis?.harmonicSeries?.map((harmonic) => (
      <div key={harmonic.harmonic} className="harmonic-item">
        <div className="harmonic-header">
          <span className="harmonic-number">{harmonic.harmonic}° Harmonic</span>
          <span className="frequency">{harmonic.frequency}Hz</span>
        </div>
        <div className="harmonic-purpose">{harmonic.purpose}</div>
        <div className="harmonic-strength">
          <div
            className="strength-bar"
            style={{ width: `${harmonic.strength * 100}%` }}
          />
        </div>
      </div>
    ))}

    {analysis?.elementalResonance && (
      <div className="resonance-analysis">
        <h5>⚡ Elemental Resonance</h5>
        <div className="resonance-grid">
          <div className="resonance-item">
            <strong>Primary:</strong> {analysis.elementalResonance.primary}
          </div>
          <div className="resonance-item">
            <strong>Compatible:</strong> {analysis.elementalResonance.compatible.join(', ')}
          </div>
          <div className="resonance-item">
            <strong>Challenging:</strong> {analysis.elementalResonance.challenging.join(', ')}
          </div>
        </div>
      </div>
    )}
  </div>
);

const _RelationshipsTab = ({ related }) => (
  <div className="relationships-tab">
    <h4>🔗 Archetype Relationships</h4>

    <div className="relationships-list">
      {related?.map((relationship, index) => (
        <div key={index} className="relationship-item">
          <div className="relationship-header">
            <span className="related-name">{relationship.card?.name}</span>
            <span className="relationship-type">{relationship.relationship}</span>
            <span className="relationship-strength">{Math.round(relationship.strength * 100)}%</span>
          </div>
          <div className="relationship-details">
            {relationship.card?.element} • Ray {relationship.card?.ray?.number} • {relationship.card?.angel}
          </div>
        </div>
      ))}
    </div>
  </div>
);

const _InsightsTab = ({ insights }) => (
  <div className="insights-tab">
    <h4>💡 Mystical Insights</h4>

    <div className="insights-list">
      {insights?.map((insight, index) => (
        <div key={index} className="insight-item">
          <div className="insight-type">{insight.type}</div>
          <div className="insight-content">{insight.insight}</div>
        </div>
      ))}
    </div>
  </div>
);

export default App;
