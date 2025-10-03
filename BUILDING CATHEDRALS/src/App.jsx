import React, { useEffect, useRef, useState } from 'react';
import UnifiedCathedralEngine from './engines/UnifiedCathedralEngine.js';
import './App.css';

function App() {
  const mountRef = useRef(null);
  const engineRef = useRef(null);
  const [isEngineReady, setIsEngineReady] = useState(false);

  useEffect(() => {
    if (mountRef.current && !engineRef.current) {
      try {
        engineRef.current = new UnifiedCathedralEngine(mountRef.current);
        setIsEngineReady(true);
      } catch (error) {
        console.error('Failed to initialize Cathedral Engine:', error);
      }
    }

    return () => {
      if (engineRef.current) {
        engineRef.current.dispose();
        engineRef.current = null;
      }
    };
  }, []);

  const addEffect = (type, options = {}) => {
    if (engineRef.current) {
      engineRef.current.addEffect(type, options);
    }
  };

  const removeEffect = (type) => {
    if (engineRef.current) {
      engineRef.current.removeEffect(type);
    }
  };

  return (
    <div className="App">
      <div className="cathedral-container" ref={mountRef}></div>
      
      {isEngineReady && (
        <div className="control-panel">
          <h2>Cathedral Effects</h2>
          
          <div className="effect-group">
            <h3>Particle Systems</h3>
            <button onClick={() => addEffect('particles', { color: 0x4169e1, count: 800 })}>
              Blue Particles
            </button>
            <button onClick={() => addEffect('particles', { color: 0xff6b6b, count: 600 })}>
              Red Particles  
            </button>
            <button onClick={() => addEffect('particles', { color: 0xfeca57, count: 400 })}>
              Gold Particles
            </button>
            <button onClick={() => removeEffect('particles')}>
              Remove Particles
            </button>
          </div>

          <div className="effect-group">
            <h3>Atmospheric Effects</h3>
            <button onClick={() => addEffect('glow', { color: 0x4169e1, count: 10 })}>
              Blue Glow
            </button>
            <button onClick={() => addEffect('orbits', { color: 0xff6b6b, count: 6 })}>
              Orbital Objects
            </button>
            <button onClick={() => removeEffect('glow')}>
              Remove Glow
            </button>
            <button onClick={() => removeEffect('orbiters')}>
              Remove Orbiters
            </button>
          </div>

          <div className="effect-group">
            <h3>System</h3>
            <button onClick={() => {
              removeEffect('particles');
              removeEffect('glow');
              removeEffect('orbiters');
            }}>
              Clear All Effects
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
