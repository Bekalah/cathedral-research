/**
 import { useState, useEffect, useRef } from 'react';
// import { Canvas, useFrame } from '@react-three/fiber';
// import { OrbitControls, Environment, Stats, PerspectiveCamera } from '@react-three/drei';athedral of Circuits - Fractal Art & Research Engine
 * Game of Thrones meets Thierry Mugler in a dramatic mystical experience
 */

import { useState, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Stats, PerspectiveCamera } from '@react-three/drei';
import './styles.css';

function App() {
  // Core application state
  const [_activeFractal, _setActiveFractal] = useState(null);
  const [selectedResearch, setSelectedResearch] = useState('fractal-analysis');
  const [generationMode, setGenerationMode] = useState('real-time');
  const [visualizationMode, setVisualizationMode] = useState('fractal');
  const [isGenerating, setIsGenerating] = useState(false);
  const [researchData, setResearchData] = useState(null);
  
  // Missing state variables
  const [activeRealm, setActiveRealm] = useState('fractal-cathedral');

  // Fractal research state
  const [fractalProfile, setFractalProfile] = useState(null);
  const [researchFindings, setResearchFindings] = useState([]);
  const [mysticalAnalysis, setMysticalAnalysis] = useState(null);
  const [_circuitMapping, setCircuitMapping] = useState(null);

  // UI state
  const [_showDetails, setShowDetails] = useState(false);
  const [activeTab, _setActiveTab] = useState('overview');
  const [complexityLevel, setComplexityLevel] = useState(5);

  // Refs for 3D scene management  
  const _sceneRef = useRef();
  const _cameraRef = useRef();

  // Dramatic realm configurations with Thierry Mugler aesthetic
  const dramaticRealms = [
    {
      id: 'fractal-cathedral',
      name: '🏛️ Fractal Cathedral',
      description: 'Dramatic fractal art and mathematical beauty',
      aesthetic: 'Game of Thrones meets Thierry Mugler',
      features: ['Fractal Generation', 'Mathematical Beauty', 'Dramatic Visuals', 'Sacred Circuits'],
      primaryColor: '#1a1a2e',
      secondaryColor: '#16213e',
      accentColor: '#e74c3c'
    },
    {
      id: 'circuit-temple',
      name: '⚡ Circuit Temple',
      description: 'Sacred mathematics and living circuit research',
      aesthetic: 'Gothic architecture meets digital mysticism',
      features: ['Circuit Mapping', 'Sacred Mathematics', 'Living Algorithms', 'Research Temple'],
      primaryColor: '#2c1810',
      secondaryColor: '#8b4513',
      accentColor: '#ffd700'
    },
    {
      id: 'mugler-sanctum',
      name: '👑 Mugler Sanctum',
      description: 'Dramatic couture mathematics and sculptural fractals',
      aesthetic: 'Thierry Mugler meets sacred geometry',
      features: ['Couture Fractals', 'Sculptural Mathematics', 'Dramatic Research', 'Fashion Mathematics'],
      primaryColor: '#4a0e4e',
      secondaryColor: '#8a2be2',
      accentColor: '#ff1493'
    },
    {
      id: 'thrones-hall',
      name: '⚔️ Thrones Hall',
      description: 'Game of Thrones politics meets fractal intrigue',
      aesthetic: 'Medieval intrigue meets mathematical beauty',
      features: ['Political Fractals', 'Intrigue Mathematics', 'Power Research', 'Strategic Beauty'],
      primaryColor: '#1a0a0a',
      secondaryColor: '#4a4a4a',
      accentColor: '#ff6b35'
    }
  ];

  // Initialize fractal research on component mount
  useEffect(() => {
    initializeFractalResearch();
  }, []);

  // Update research when fractal changes
  useEffect(() => {
    if (selectedResearch) {
      analyzeFractal(selectedResearch);
    }
  }, [selectedResearch, generationMode]);

  // Example: log initialization info for creative research
  useEffect(() => {
    console.log('Cathedral of Circuits initializing...');
  }, []);

  const initializeFractalResearch = async () => {
    try {
      console.log('⚡ Initializing Cathedral of Circuits research systems...');

      // Initialize with default fractal analysis
      const defaultAnalysis = generateDefaultFractalAnalysis();
      setFractalProfile(defaultAnalysis);

      // Generate initial research findings
      const findings = generateResearchFindings();
      setResearchFindings(findings);

      console.log('✨ Cathedral of Circuits research systems initialized');
    } catch (error) {
      console.error('❌ Failed to initialize fractal research:', error);
    }
  };

  const analyzeFractal = async (researchType) => {
    setIsGenerating(true);

    try {
      console.log(`⚡ Analyzing fractal research: ${researchType}`);

      // Generate fractal profile based on research type
      const profile = generateFractalProfile(researchType);
      setFractalProfile(profile);

      // Generate mystical analysis
      const analysis = generateMysticalAnalysis(profile);
      setMysticalAnalysis(analysis);

      // Generate circuit mapping
      const mapping = generateCircuitMapping(profile);
      setCircuitMapping(mapping);

      // Set research data for visualization
      setResearchData({
        profile: profile,
        analysis: analysis,
        mapping: mapping,
        findings: researchFindings,
        timestamp: Date.now()
      });

      console.log(`✅ Fractal analysis complete: ${researchType}`);

    } catch (error) {
      console.error('❌ Fractal analysis failed:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const generateDefaultFractalAnalysis = () => {
    return {
      id: 'mandelbrot-set',
      name: 'Mandelbrot Set',
      type: 'classic-fractal',
      complexity: 5,
      beauty: 0.95,
      mathematical: {
        formula: 'z = z² + c',
        iterations: 100,
        escapeRadius: 2,
        convergence: 'infinite'
      },
      aesthetic: {
        symmetry: 'bilateral',
        patterns: ['self-similar', 'infinite-detail', 'organic'],
        colors: ['deep-blue', 'electric-purple', 'sacred-gold']
      },
      mystical: {
        correspondences: ['sacred-geometry', 'divine-proportions', 'infinite-consciousness'],
        tarot: ['the-universe', 'the-magician'],
        element: 'ether',
        frequency: 963
      }
    };
  };

  const generateFractalProfile = (researchType) => {
    const profiles = {
      'fractal-analysis': {
        id: 'julia-set',
        name: 'Julia Set',
        type: 'complex-fractal',
        complexity: complexityLevel,
        beauty: 0.92,
        mathematical: {
          formula: 'z = z² + c (complex)',
          iterations: complexityLevel * 20,
          escapeRadius: 4,
          convergence: 'chaotic'
        },
        aesthetic: {
          symmetry: 'rotational',
          patterns: ['chaotic-beauty', 'infinite-variation', 'mathematical-art'],
          colors: ['crimson', 'obsidian', 'electric-blue']
        },
        mystical: {
          correspondences: ['chaos-theory', 'divine-chaos', 'creative-destruction'],
          tarot: ['the-tower', 'the-devil'],
          element: 'fire',
          frequency: 417
        }
      },
      'sacred-geometry': {
        id: 'sierpinski-triangle',
        name: 'Sierpinski Triangle',
        type: 'recursive-fractal',
        complexity: complexityLevel,
        beauty: 0.88,
        mathematical: {
          formula: 'recursive subdivision',
          iterations: complexityLevel,
          ratio: '1/2',
          convergence: 'self-similar'
        },
        aesthetic: {
          symmetry: 'triangular',
          patterns: ['recursive-beauty', 'mathematical-purity', 'sacred-geometry'],
          colors: ['sacred-white', 'divine-gold', 'temple-stone']
        },
        mystical: {
          correspondences: ['trinity', 'divine-triads', 'sacred-architecture'],
          tarot: ['the-empress', 'the-hierophant'],
          element: 'air',
          frequency: 528
        }
      },
      'circuit-mapping': {
        id: 'dragon-curve',
        name: 'Dragon Curve',
        type: 'space-filling-fractal',
        complexity: complexityLevel,
        beauty: 0.94,
        mathematical: {
          formula: 'recursive folding',
          iterations: complexityLevel,
          angle: '90°',
          convergence: 'space-filling'
        },
        aesthetic: {
          symmetry: 'asymmetric',
          patterns: ['organic-growth', 'natural-beauty', 'living-mathematics'],
          colors: ['forest-green', 'earth-brown', 'sky-blue']
        },
        mystical: {
          correspondences: ['dragon-energy', 'ley-lines', 'earth-mysteries'],
          tarot: ['the-emperor', 'strength'],
          element: 'earth',
          frequency: 396
        }
      }
    };

    return profiles[researchType] || profiles['fractal-analysis'];
  };

  const generateMysticalAnalysis = (profile) => {
    return {
      primaryElement: profile.mystical?.element || 'ether',
      frequencyResonance: profile.mystical?.frequency || 432,
      tarotCorrespondences: profile.mystical?.tarot || [],
      mysticalProperties: profile.mystical?.correspondences || [],
      mathematicalBeauty: profile.beauty || 0.9,
      consciousnessAlignment: Math.random() * 0.3 + 0.7,
      researchPotential: Math.random() * 0.4 + 0.6
    };
  };

  const generateCircuitMapping = (_profile) => {
    // Circuit mapping generation logic
    const mapping = {
      nodes: [],
      connections: [],
      energy: Math.random()
    };
    setCircuitMapping(mapping);
    return mapping;
  };

  const handleResearchSelection = (researchType) => {
    setSelectedResearch(researchType);
    setShowDetails(true);
  };

  const getComplexityColor = (level) => {
    const colors = {
      1: '#2ecc71', 2: '#27ae60', 3: '#3498db', 4: '#9b59b6', 5: '#e74c3c',
      6: '#e67e22', 7: '#f39c12', 8: '#f1c40f', 9: '#e8e8e8', 10: '#ffffff'
    };
    return colors[level] || '#95a5a6';
  };

  const _getFractalDescription = (id) => {
    const descriptions = {
      'mandelbrot': 'Classic Mandelbrot set with infinite complexity',
      'julia': 'Julia set variations with mystical properties',
      'sierpinski': 'Sierpinski triangle - ancient sacred geometry',
      'dragon': 'Dragon curve - serpentine mystical patterns'
    };
    return descriptions[id] || 'Mystical fractal patterns await discovery';
  };

  const exportResearchData = () => {
    const data = {
      fractalProfile,
      researchFindings,
      mysticalAnalysis,
      timestamp: new Date().toISOString()
    };
    console.log('Exporting research data:', data);
    // Export logic here
  };

  const generateCircuitMap = () => {
    console.log('Generating circuit map...');
    return {
      nodes: Math.floor(Math.random() * 100) + 50,
      connections: Math.floor(Math.random() * 200) + 100,
      pathways: Math.floor(Math.random() * 20) + 10,
      energyFlow: Math.random() * 0.5 + 0.5,
      mysticalCurrents: Math.floor(Math.random() * 15) + 5,
      sacredIntersections: Math.floor(Math.random() * 8) + 3
    };
  };

  const generateResearchFindings = () => {
    return [
      {
        id: 'fractal-consciousness',
        title: 'Fractal Consciousness Correlation',
        finding: 'Fractal complexity directly correlates with consciousness expansion potential',
        significance: 0.95,
        category: 'consciousness'
      },
      {
        id: 'mathematical-beauty',
        title: 'Mathematical Beauty Quotient',
        finding: 'Sacred geometry patterns exhibit measurable beauty beyond visual aesthetics',
        significance: 0.88,
        category: 'aesthetics'
      },
      {
        id: 'circuit-mysticism',
        title: 'Circuit Mysticism Integration',
        finding: 'Digital circuits can be mapped to mystical energy pathways',
        significance: 0.92,
        category: 'technology'
      }
    ];
  };

  return (
    <div className="cathedral-circuits-app">
      <header className="dramatic-header">
        <div className="header-overlay">
          <h1 className="dramatic-title">⚡ Cathedral of Circuits</h1>
          <p className="dramatic-subtitle">
            Fractal Art & Research Engine • Game of Thrones meets Thierry Mugler
          </p>

          <div className="realm-navigation">
            {dramaticRealms.map(realm => (
              <button
                key={realm.id}
                className={`dramatic-realm-btn ${activeRealm === realm.id ? 'active' : ''}`}
                onClick={() => setActiveRealm(realm.id)}
                style={{
                  borderColor: realm.accentColor,
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
          {/* Fractal Research Panel */}
          <section className="fractal-panel">
            <div className="panel-header">
              <h2>⚡ Fractal Research Engine</h2>
              <div className="mode-selector">
                <button
                  className={generationMode === 'real-time' ? 'active' : ''}
                  onClick={() => setGenerationMode('real-time')}
                >
                  Real-Time
                </button>
                <button
                  className={generationMode === 'batch' ? 'active' : ''}
                  onClick={() => setGenerationMode('batch')}
                >
                  Batch Analysis
                </button>
                <button
                  className={generationMode === 'deep-research' ? 'active' : ''}
                  onClick={() => setGenerationMode('deep-research')}
                >
                  Deep Research
                </button>
              </div>
            </div>

            <div className="research-types">
              {[
                { id: 'fractal-analysis', name: '🔬 Fractal Analysis', description: 'Complex mathematical beauty research' },
                { id: 'sacred-geometry', name: '🏛️ Sacred Geometry', description: 'Divine proportions and sacred mathematics' },
                { id: 'circuit-mapping', name: '⚡ Circuit Mapping', description: 'Digital to mystical energy pathways' },
                { id: 'consciousness-correlation', name: '🧠 Consciousness Research', description: 'Fractal consciousness expansion studies' }
              ].map(research => (
                <div
                  key={research.id}
                  className={`research-card ${selectedResearch === research.id ? 'selected' : ''}`}
                  onClick={() => handleResearchSelection(research.id)}
                >
                  <div className="research-header">
                    <span className="research-icon">{research.name.split(' ')[0]}</span>
                    <span className="research-title">{research.name.split(' ').slice(1).join(' ')}</span>
                  </div>
                  <div className="research-description">{research.description}</div>
                  <div className="research-complexity">
                    <span className="complexity-label">Complexity:</span>
                    <div className="complexity-bar">
                      <div
                        className="complexity-fill"
                        style={{
                          width: `${(complexityLevel / 10) * 100}%`,
                          backgroundColor: getComplexityColor(complexityLevel)
                        }}
                      />
                    </div>
                    <span className="complexity-value">{complexityLevel}/10</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 3D Visualization Panel */}
          <section className="visualization-panel">
            <div className="panel-header">
              <h2>🎨 Dramatic Visualization</h2>
              <div className="viz-controls">
                <button
                  className={visualizationMode === 'fractal' ? 'active' : ''}
                  onClick={() => setVisualizationMode('fractal')}
                >
                  Fractal
                </button>
                <button
                  className={visualizationMode === 'circuit' ? 'active' : ''}
                  onClick={() => setVisualizationMode('circuit')}
                >
                  Circuit
                </button>
                <button
                  className={visualizationMode === 'mystical' ? 'active' : ''}
                  onClick={() => setVisualizationMode('mystical')}
                >
                  Mystical
                </button>
              </div>
            </div>

            <div className="three-container">
              <Canvas className="research-canvas">
                <Environment preset="night" />
                <ambientLight intensity={0.3} />
                <directionalLight position={[10, 10, 5]} intensity={0.6} />
                <pointLight position={[-10, -10, -5]} intensity={0.4} color="#e74c3c" />

                {researchData && (
                  <FractalVisualization
                    data={researchData}
                    mode={visualizationMode}
                    complexity={complexityLevel}
                    isGenerating={isGenerating}
                  />
                )}

                <OrbitControls
                  enablePan={true}
                  enableZoom={true}
                  enableRotate={true}
                  maxDistance={100}
                  minDistance={5}
                />
                <Stats />
              </Canvas>
            </div>
          </section>

          {/* Research Analysis Panel */}
          <section className="analysis-panel">
            <div className="panel-header">
              <h2>🔬 Research Analysis</h2>
              <div className="complexity-control">
                <label>Complexity Level:</label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={complexityLevel}
                  onChange={(e) => setComplexityLevel(Number(e.target.value))}
                  className="complexity-slider"
                />
                <span className="complexity-display" style={{ color: getComplexityColor(complexityLevel) }}>
                  {complexityLevel}
                </span>
              </div>
            </div>

            <div className="analysis-content">
              {fractalProfile && (
                <div className="fractal-details">
                  {activeTab === 'overview' && (
                    <OverviewTab profile={fractalProfile} />
                  )}
                  {activeTab === 'mathematical' && (
                    <MathematicalTab profile={fractalProfile} />
                  )}
                  {activeTab === 'mystical' && (
                    <MysticalTab analysis={mysticalAnalysis} />
                  )}
                  {activeTab === 'findings' && (
                    <FindingsTab findings={researchFindings} />
                  )}
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Research Control Panel */}
        <div className="control-panel">
          <button
            className="research-action-btn primary"
            onClick={() => analyzeFractal(selectedResearch)}
            disabled={isGenerating}
          >
            {isGenerating ? '⚡ Analyzing...' : '⚡ Generate Fractal'}
          </button>

          <button
            className="research-action-btn secondary"
            onClick={() => exportResearchData()}
          >
            📊 Export Research
          </button>

          <button
            className="research-action-btn tertiary"
            onClick={() => generateCircuitMap()}
          >
            🗺️ Circuit Map
          </button>
        </div>
      </main>

      <footer className="dramatic-footer">
        <div className="footer-content">
          <p>
            Cathedral of Circuits • Fractal Art & Research Engine •
            Game of Thrones meets Thierry Mugler •
            Dramatic Mathematical Beauty
          </p>
          <div className="system-status">
            <span className="status-indicator active">⚡ Fractal Engine: Active</span>
            <span className="status-indicator">🔬 Research: {selectedResearch}</span>
            <span className="status-indicator">📊 Complexity: {complexityLevel}/10</span>
          </div>
        </div>
      </footer>

      <CymaticDemo />
      <div style={{marginTop:24, color:'#888'}}>
        <strong>Cathedral Research:</strong> Fractal Art & Research Engine • Game of Thrones meets Thierry Mugler
      </div>
    </div>
  );
}

// Helper component for fractal visualization
// Unused but preserved components for future functionality
const _FractalVisualization = ({ data, mode, complexity, _isGenerating }) => {
  const groupRef = useRef();

  if (!data) return null;

  return (
    <group ref={groupRef}>
      {/* Central fractal structure */}
      <mesh position={[0, 0, 0]}>
        <octahedronGeometry args={[3, complexity]} />
        <meshPhysicalMaterial
          color={mode === 'fractal' ? 0x1a1a2e : mode === 'circuit' ? 0x16213e : 0xe74c3c}
          metalness={0.4}
          roughness={0.2}
          emissive={mode === 'mystical' ? 0x2c1810 : 0x000000}
        />
      </mesh>

      {/* Fractal iterations */}
      {Array.from({ length: complexity }, (_, index) => {
        const scale = 1 - (index * 0.1);
        const angle = (index / complexity) * Math.PI * 2;

        return (
          <mesh
            key={index}
            position={[
              Math.cos(angle) * (4 + index),
              0,
              Math.sin(angle) * (4 + index)
            ]}
            scale={[scale, scale, scale]}
          >
            <tetrahedronGeometry args={[2]} />
            <meshBasicMaterial
              color={index % 2 === 0 ? 0xe74c3c : 0x16213e}
              transparent
              opacity={0.7 - (index * 0.05)}
            />
          </mesh>
        );
      })}

      {/* Mystical energy field */}
      {mode === 'mystical' && (
        <MysticalEnergyField complexity={complexity} />
      )}
    </group>
  );
};

// Helper component for mystical energy field
const _MysticalEnergyField = ({ complexity }) => {
  const fieldRef = useRef();

  useFrame((state) => {
    if (fieldRef.current) {
      fieldRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      fieldRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <group ref={fieldRef}>
      {Array.from({ length: complexity * 2 }, (_, index) => {
        const radius = 5 + (index * 0.5);
        const height = Math.sin(index) * 2;

        return (
          <mesh
            key={index}
            position={[
              Math.cos((index / (complexity * 2)) * Math.PI * 2) * radius,
              height,
              Math.sin((index / (complexity * 2)) * Math.PI * 2) * radius
            ]}
          >
            <sphereGeometry args={[0.3, 16, 16]} />
            <meshBasicMaterial
              color={index % 3 === 0 ? 0xe74c3c : index % 3 === 1 ? 0x16213e : 0x1a1a2e}
              transparent
              opacity={0.6}
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
    <div>
      <div className="fractal-header">
        <h3>{profile.name}</h3>
        <div className="fractal-badges">
          <span className="badge type">{profile.type}</span>
          <span className="badge complexity" style={{ backgroundColor: getComplexityColor(profile.complexity) }}>
            Complexity: {profile.complexity}/10
          </span>
          <span className="badge beauty">Beauty: {Math.round(profile.beauty * 100)}%</span>
        </div>
      </div>
      <div className="fractal-description">
        <p>{getFractalDescription(profile.id)}</p>
      </div>
      <div className="aesthetic-analysis">
        <h4>🎨 Aesthetic Properties</h4>
        <div className="aesthetic-grid">
          <div className="aesthetic-item">
            <strong>Symmetry:</strong> {profile.aesthetic?.symmetry}
          </div>
          <div className="aesthetic-item">
            <strong>Patterns:</strong> {profile.aesthetic?.patterns?.join(', ')}
          </div>
          <div className="aesthetic-item">
            <strong>Colors:</strong> {profile.aesthetic?.colors?.join(', ')}
          </div>
        </div>
      </div>
    </div>
  </div>
);

const _MathematicalTab = ({ profile }) => (
  <div className="mathematical-tab">
    <div>
      <h4>🧮 Mathematical Analysis</h4>
      <div className="math-properties">
        <div className="math-item">
          <strong>Formula:</strong>
          <code className="formula">{profile.mathematical?.formula}</code>
        </div>
        <div className="math-item">
          <strong>Iterations:</strong> {profile.mathematical?.iterations}
        </div>
        <div className="math-item">
          <strong>Convergence:</strong> {profile.mathematical?.convergence}
        </div>
        <div className="math-item">
          <strong>Escape Radius:</strong> {profile.mathematical?.escapeRadius}
        </div>
      </div>
      <div className="complexity-analysis">
        <h5>📊 Complexity Metrics</h5>
        <div className="complexity-visualization">
          <div className="complexity-factor">
            <span>Mathematical Depth</span>
            <div className="factor-bar">
              <div className="factor-fill math" style={{ width: `${profile.complexity * 10}%` }} />
            </div>
          </div>
          <div className="complexity-factor">
            <span>Visual Beauty</span>
            <div className="factor-bar">
              <div className="factor-fill beauty" style={{ width: `${profile.beauty * 100}%` }} />
            </div>
          </div>
          <div className="complexity-factor">
            <span>Research Value</span>
            <div className="factor-bar">
              <div className="factor-fill research" style={{ width: `${(profile.complexity * profile.beauty) * 100}%` }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const _MysticalTab = ({ analysis }) => (
  <div className="mystical-tab">
    <div>
      <h4>🔮 Mystical Analysis</h4>
      {analysis && (
        <div className="mystical-properties">
          <div className="mystical-item">
            <strong>Primary Element:</strong> {analysis.primaryElement}
          </div>
          <div className="mystical-item">
            <strong>Frequency Resonance:</strong> {analysis.frequencyResonance}Hz
          </div>
          <div className="mystical-item">
            <strong>Consciousness Alignment:</strong> {Math.round(analysis.consciousnessAlignment * 100)}%
          </div>
          <div className="mystical-item">
            <strong>Research Potential:</strong> {Math.round(analysis.researchPotential * 100)}%
          </div>
          <div className="mystical-correspondences">
            <h5>🔗 Mystical Correspondences</h5>
            <div className="correspondences-list">
              {analysis.mysticalProperties?.map((prop, index) => (
                <span key={index} className="correspondence-tag">{prop}</span>
              ))}
            </div>
          </div>
          <div className="tarot-connections">
            <h5>🃏 Tarot Connections</h5>
            <div className="tarot-list">
              {analysis.tarotCorrespondences?.map((tarot, index) => (
                <span key={index} className="tarot-tag">{tarot}</span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  </div>
);

const _FindingsTab = ({ findings }) => (
  <div className="findings-tab">
    <div>
      <h4>📊 Research Findings</h4>
      <div className="findings-list">
        {findings?.map((finding) => (
          <div key={finding.id} className="finding-item">
            <div className="finding-header">
              <span className="finding-title">{finding.title}</span>
              <span className="finding-significance" style={{ color: getComplexityColor(Math.floor(finding.significance * 10)) }}>
                {Math.round(finding.significance * 100)}% significance
              </span>
            </div>
            <div className="finding-content">{finding.finding}</div>
            <div className="finding-category">{finding.category}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// Helper functions for components
const getComplexityColor = (level) => {
  const colors = {
    1: '#2ecc71', 2: '#27ae60', 3: '#3498db', 4: '#9b59b6', 5: '#e74c3c',
    6: '#e67e22', 7: '#f39c12', 8: '#f1c40f', 9: '#e8e8e8', 10: '#ffffff'
  };
  return colors[level] || '#95a5a6';
};

const getFractalDescription = (id) => {
  const descriptions = {
    'mandelbrot': 'Classic Mandelbrot set with infinite complexity',
    'julia': 'Julia set variations with mystical properties',
    'sierpinski': 'Sierpinski triangle - ancient sacred geometry',
    'dragon': 'Dragon curve - serpentine mystical patterns'
  };
  return descriptions[id] || 'Mystical fractal patterns await discovery';
};

export default App;
