/**
 * 🎮 CYOA Engine - Choose Your Own Adventure with Haute Couture Science Art
 * Aesthetic: Iris van Herpen meets Hilma af Klint meets Interactive RPG
 */

import { useState, useRef } from 'react';
// import { Canvas } from '@react-three/fiber';
// import { OrbitControls, Environment } from '@react-three/drei';
// import { WaterDragon } from '../../packages/labs/src/elements/visuals/WaterDragon';
// import { FireDragon } from '../../packages/labs/src/elements/visuals/FireDragon';
import { ELEMENTS, fuseElements } from '../../packages/labs/src/elements/ElementalCore';
import './CYOAEngine.css';

// Sample CYOA story data with sophisticated content
const FRACTAL_MYSTERIES_STORY = {
  title: "The Fractal Mysteries",
  description: "A Choose Your Own Adventure through computational art and sacred geometry",
  startNode: "cathedral-entrance",
  nodes: {
    "cathedral-entrance": {
      id: "cathedral-entrance",
      title: "🏛️ The Cathedral of Circuits",
      content: `You stand before a magnificent structure where mathematics and mysticism converge. The Cathedral rises before you like a biomimetic dream—Iris van Herpen's fluid architecture made manifest in sacred geometry. Three gates shimmer with different energies, each pulsing with the rhythm of universal constants.
      
The Mathematical Gate glows with the cool precision of complex numbers, fractals spiraling in infinite regression. The Audio Gate resonates with harmonic frequencies that seem to touch your soul. The Quantum Gate shimmers with probability clouds, particles dancing between existence and potential.`,
      scienceType: "overview",
      elementalFusion: null,
      choices: [
        {
          id: "mathematical-gate",
          text: "🔢 Enter through the Mathematical Gate",
          description: "Explore the realm of complex numbers and fractal beauty",
          nextNode: "julia-chamber",
          element: "water",
          scienceUnlock: "complex-numbers"
        },
        {
          id: "audio-gate", 
          text: "🎵 Enter through the Audio Gate",
          description: "Dive into spectral analysis and harmonic synthesis",
          nextNode: "synthesis-hall",
          element: "fire",
          scienceUnlock: "audio-science"
        },
        {
          id: "quantum-gate",
          text: "⚛️ Enter through the Quantum Gate",
          description: "Venture into wave functions and probability",
          nextNode: "quantum-garden",
          element: "aether",
          scienceUnlock: "quantum-mechanics"
        }
      ]
    },
    "julia-chamber": {
      id: "julia-chamber",
      title: "🌊 The Julia Set Chamber",
      content: `You step through the Mathematical Gate and find yourself in a space that defies conventional geometry. The chamber flows around you like liquid mathematics—walls of complex numbers cascade in Iris van Herpen-inspired formations.
      
Here, each point represents a complex number, and their interactions create fractal patterns that breathe with mathematical life. The water element responds to your presence, its aqueous dragons forming Julia sets in real-time, their movements governed by the equation z² + c.
      
The beauty is overwhelming—this is where chaos theory meets haute couture.`,
      scienceType: "fractal",
      elementalFusion: "water",
      choices: [
        {
          id: "deeper-math",
          text: "📐 Dive deeper into the mathematics",
          description: "Explore the Mandelbrot core and infinite complexity",
          nextNode: "mandelbrot-core",
          element: "earth",
          requirements: ["mathematical-thinking"]
        },
        {
          id: "artistic-exploration",
          text: "🎨 Focus on the artistic patterns",
          description: "Let intuition guide you through fractal beauty",
          nextNode: "fractal-gallery",
          element: "air",
          artReward: "procedural-art-tools"
        },
        {
          id: "fusion-experiment",
          text: "⚗️ Attempt elemental fusion",
          description: "Combine water with another element",
          nextNode: "fusion-laboratory",
          element: "aether",
          fusionEnabled: true
        }
      ]
    },
    "synthesis-hall": {
      id: "synthesis-hall", 
      title: "🔥 The Synthesis Hall",
      content: `Through the Audio Gate, you enter a space alive with sound and flame. The Synthesis Hall embodies Alexander McQueen's dramatic vision—savage beauty in sonic form. Fire dragons spiral through the air, their movements creating spectral patterns that visualize the very fabric of sound.
      
Each flame responds to frequency, amplitude, and harmonic content. You watch in wonder as audio signals become visual poetry, spectrograms painting themselves across the walls in real-time. The mathematics of Fourier transforms manifest as living art.
      
This is computational couture at its most dramatic—where sound becomes sculpture.`,
      scienceType: "synthesis",
      elementalFusion: "fire", 
      choices: [
        {
          id: "frequency-analysis",
          text: "📊 Analyze the frequency spectrum",
          description: "Dive deep into spectral mathematics",
          nextNode: "spectrum-laboratory",
          element: "water",
          scienceUnlock: "fourier-analysis"
        },
        {
          id: "harmonic-creation",
          text: "🎼 Create harmonic compositions", 
          description: "Compose with fire as your instrument",
          nextNode: "harmonic-studio",
          element: "air",
          artReward: "synthesis-tools"
        }
      ]
    }
  }
};

export default function CYOAEngine() {
  const [currentNode, setCurrentNode] = useState(FRACTAL_MYSTERIES_STORY.startNode);
  const [playerState, setPlayerState] = useState({
    unlockedScience: [],
    artRewards: [],
    elementalAffinities: {},
    currentFusion: null
  });
  const [visualMode, setVisualMode] = useState('particles');
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const sceneRef = useRef();
  
  const currentStoryNode = FRACTAL_MYSTERIES_STORY.nodes[currentNode];
  const currentElement = currentStoryNode.elementalFusion ? ELEMENTS[currentStoryNode.elementalFusion.toUpperCase()] : null;
  
  // Handle choice selection with sophisticated transitions
  const makeChoice = async (choice) => {
    setIsTransitioning(true);
    
    // Update player state
    const newPlayerState = { ...playerState };
    
    if (choice.scienceUnlock) {
      newPlayerState.unlockedScience.push(choice.scienceUnlock);
    }
    
    if (choice.artReward) {
      newPlayerState.artRewards.push(choice.artReward);
    }
    
    if (choice.element) {
      newPlayerState.elementalAffinities[choice.element] = 
        (newPlayerState.elementalAffinities[choice.element] || 0) + 1;
    }
    
    // Handle elemental fusion
    if (choice.fusionEnabled && choice.element && currentStoryNode.elementalFusion) {
      const primaryElement = ELEMENTS[currentStoryNode.elementalFusion.toUpperCase()];
      const secondaryElement = ELEMENTS[choice.element.toUpperCase()];
      newPlayerState.currentFusion = fuseElements(primaryElement, secondaryElement);
    }
    
    setPlayerState(newPlayerState);
    
    // Elegant transition delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    setCurrentNode(choice.nextNode);
    setIsTransitioning(false);
  };
  
  // Render elemental visualization based on current node
  const renderElementalVisualization = () => {
    if (!currentElement) return null;
    
    const fusionData = playerState.currentFusion || currentElement;
    
    switch (currentElement.id) {
      case 'water':
        return <WaterDragon fusionData={fusionData} intensity={1.0} />;
      case 'fire':
        return <FireDragon fusionData={fusionData} intensity={1.0} />;
      default:
        return <WaterDragon fusionData={fusionData} intensity={0.5} />;
    }
  };
  
  return (
    <div className="cyoa-engine cathedral-aesthetic">
      {/* Header with sophisticated branding */}
      <header className="cyoa-header">
        <h1 className="cathedral-title">
          {FRACTAL_MYSTERIES_STORY.title}
        </h1>
        <p className="cathedral-subtitle">
          {FRACTAL_MYSTERIES_STORY.description}
        </p>
      </header>
      
      {/* Main experience container */}
      <main className="cyoa-main">
        {/* Story content panel */}
        <section className={`story-panel ${isTransitioning ? 'transitioning' : ''}`}>
          <div className="story-content">
            <h2 className="node-title">{currentStoryNode.title}</h2>
            
            <div className="content-text">
              {currentStoryNode.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="story-paragraph">
                  {paragraph.trim()}
                </p>
              ))}
            </div>
            
            {/* Science unlocks display */}
            {playerState.unlockedScience.length > 0 && (
              <div className="science-unlocks">
                <h3>🔬 Scientific Knowledge Acquired:</h3>
                <ul>
                  {playerState.unlockedScience.map((science, index) => (
                    <li key={index} className="science-unlock">
                      {science.replace('-', ' ').toUpperCase()}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* Current fusion display */}
            {playerState.currentFusion && (
              <div className="fusion-display">
                <h3>⚗️ Elemental Fusion Active:</h3>
                <div className="fusion-info">
                  <strong>{playerState.currentFusion.name}</strong>
                  <p>{playerState.currentFusion.couture.aesthetic}</p>
                </div>
              </div>
            )}
          </div>
          
          {/* Choice buttons */}
          <div className="choices-container">
            {currentStoryNode.choices.map((choice, index) => (
              <button
                key={choice.id}
                className={`choice-btn choice-${choice.element || 'neutral'}`}
                onClick={() => makeChoice(choice)}
                disabled={isTransitioning}
                style={{
                  animationDelay: `${index * 0.1}s`
                }}
              >
                <span className="choice-text">{choice.text}</span>
                <span className="choice-description">{choice.description}</span>
                {choice.fusionEnabled && (
                  <span className="fusion-indicator">⚗️ Fusion Available</span>
                )}
              </button>
            ))}
          </div>
        </section>
        
        {/* Three.js visualization panel */}
        <section className="visualization-panel">
          <div className="canvas-container">
            <Canvas
              ref={sceneRef}
              camera={{ position: [0, 0, 5], fov: 60 }}
              dpr={[1, 2]}
              gl={{ antialias: true, alpha: true }}
            >
              {/* Sophisticated lighting setup */}
              <ambientLight intensity={0.2} color="#9b59b6" />
              <directionalLight 
                position={[5, 5, 5]} 
                intensity={0.8} 
                color="#f39c12"
                castShadow
              />
              <pointLight 
                position={[-5, 2, -5]} 
                intensity={0.6} 
                color="#e74c3c" 
              />
              
              {/* Elemental visualization */}
              {renderElementalVisualization()}
              
              {/* Environment and controls */}
              <Environment preset="night" />
              <OrbitControls 
                enablePan={false}
                enableZoom={true}
                enableRotate={true}
                autoRotate={true}
                autoRotateSpeed={0.5}
              />
            </Canvas>
          </div>
          
          {/* Visualization controls */}
          <div className="visualization-controls">
            <button 
              className={`control-btn ${visualMode === 'particles' ? 'active' : ''}`}
              onClick={() => setVisualMode('particles')}
            >
              🌊 Particles
            </button>
            <button 
              className={`control-btn ${visualMode === 'wireframe' ? 'active' : ''}`}
              onClick={() => setVisualMode('wireframe')}
            >
              📐 Wireframe
            </button>
            <button 
              className={`control-btn ${visualMode === 'solid' ? 'active' : ''}`}
              onClick={() => setVisualMode('solid')}
            >
              🎨 Solid
            </button>
          </div>
        </section>
      </main>
      
      {/* Player progress sidebar */}
      <aside className="progress-sidebar">
        <h3>🏛️ Cathedral Progress</h3>
        
        <div className="progress-section">
          <h4>Elemental Affinities</h4>
          {Object.entries(playerState.elementalAffinities).map(([element, count]) => (
            <div key={element} className="affinity-item">
              <span className="element-name">{element}</span>
              <div className="affinity-bar">
                <div 
                  className="affinity-fill"
                  style={{ width: `${Math.min(count * 20, 100)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
        
        <div className="progress-section">
          <h4>Art Rewards</h4>
          {playerState.artRewards.length > 0 ? (
            <ul className="rewards-list">
              {playerState.artRewards.map((reward, index) => (
                <li key={index} className="reward-item">
                  🎨 {reward.replace('-', ' ')}
                </li>
              ))}
            </ul>
          ) : (
            <p className="no-rewards">None yet - explore to unlock!</p>
          )}
        </div>
      </aside>
    </div>
  );
}