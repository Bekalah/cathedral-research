import React, { useState } from 'react';
import Code14499Interface from './components/Code14499Interface';
import './App.css';

/**
 * Cathedral Hub - Main application integrating all systems
 * Features the Code 144:99 Angel Tech RPG experience
 */
function App() {
  const [activeMode, setActiveMode] = useState<'landing' | 'consciousness'>('landing');

  return (
    <div className="cathedral-app">
      {activeMode === 'landing' ? (
        <div className="landing-page">
          <header className="cathedral-header">
            <h1>🏰 Cathedral of Circuits 🏰</h1>
            <h2>Portal to Consciousness Evolution</h2>
            <p>
              Welcome to the intersection of consciousness, technology, and sound art.
              Choose your path of exploration.
            </p>
          </header>

          <div className="portal-grid">
            <div 
              className="portal-card consciousness-portal"
              onClick={() => setActiveMode('consciousness')}
            >
              <h3>🌟 Code 144:99 🌟</h3>
              <h4>Angel Tech Consciousness RPG</h4>
              <p>
                Embark on an immersive journey through Antero Alli's 8-Circuit consciousness model,
                enhanced with Porter Robinson-style sound art and RPG mechanics.
              </p>
              <div className="features">
                <span className="feature-tag">Consciousness Evolution</span>
                <span className="feature-tag">Sound Art Experience</span>
                <span className="feature-tag">RPG Progression</span>
                <span className="feature-tag">Archetype Journey</span>
              </div>
              <button className="enter-portal">Enter Portal</button>
            </div>

            <div className="portal-card coming-soon">
              <h3>🎵 Sound Archetypes</h3>
              <h4>Porter Robinson Experience</h4>
              <p>
                Pure sound art experience with emotional architecture
                and consciousness-altering frequencies.
              </p>
              <div className="features">
                <span className="feature-tag">Coming Soon</span>
              </div>
            </div>

            <div className="portal-card coming-soon">
              <h3>🔮 Tarot Engine</h3>
              <h4>Digital Divination</h4>
              <p>
                Advanced tarot reading system with AI-enhanced interpretations
                and mystical algorithms.
              </p>
              <div className="features">
                <span className="feature-tag">Coming Soon</span>
              </div>
            </div>

            <div className="portal-card coming-soon">
              <h3>📚 Stone Grimoire</h3>
              <h4>Digital Codex</h4>
              <p>
                Interactive magical texts with dynamic content
                and consciousness-responsive narratives.
              </p>
              <div className="features">
                <span className="feature-tag">Coming Soon</span>
              </div>
            </div>
          </div>

          <footer className="cathedral-footer">
            <p>Built with consciousness, technology, and love • Cathedral Research 2025</p>
          </footer>
        </div>
      ) : (
        <div className="consciousness-mode">
          <div className="mode-header">
            <button 
              className="back-button"
              onClick={() => setActiveMode('landing')}
            >
              ← Back to Cathedral
            </button>
            <h2>Code 144:99 - Angel Tech Consciousness Journey</h2>
          </div>
          
          <Code14499Interface />
        </div>
      )}

      <style jsx>{`
        .cathedral-app {
          min-height: 100vh;
          background: linear-gradient(135deg, #1a1a2e, #16213e, #0f3460);
          color: #e0e6ed;
          font-family: 'Courier New', monospace;
        }

        .landing-page {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }

        .cathedral-header {
          text-align: center;
          padding: 60px 20px;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
        }

        .cathedral-header h1 {
          font-size: 4em;
          margin: 0;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
          background: linear-gradient(45deg, #4ecdc4, #667eea, #764ba2);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .cathedral-header h2 {
          font-size: 1.8em;
          margin: 10px 0;
          color: #4ecdc4;
        }

        .cathedral-header p {
          font-size: 1.2em;
          margin: 20px 0;
          opacity: 0.9;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .portal-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: 30px;
          padding: 40px;
          flex: 1;
          align-items: start;
        }

        .portal-card {
          background: rgba(255, 255, 255, 0.1);
          padding: 30px;
          border-radius: 15px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          transition: all 0.3s ease;
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }

        .portal-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
          border-color: #4ecdc4;
        }

        .consciousness-portal {
          border-left: 4px solid #4ecdc4;
        }

        .consciousness-portal:hover {
          background: rgba(78, 205, 196, 0.15);
        }

        .coming-soon {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .coming-soon:hover {
          transform: none;
          box-shadow: none;
          border-color: rgba(255, 255, 255, 0.2);
        }

        .portal-card h3 {
          font-size: 2em;
          margin: 0 0 10px 0;
          color: #4ecdc4;
        }

        .portal-card h4 {
          font-size: 1.4em;
          margin: 0 0 15px 0;
          color: #667eea;
        }

        .portal-card p {
          font-size: 1.1em;
          line-height: 1.6;
          margin-bottom: 20px;
          opacity: 0.9;
        }

        .features {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 20px;
        }

        .feature-tag {
          background: rgba(78, 205, 196, 0.8);
          color: white;
          padding: 6px 12px;
          border-radius: 15px;
          font-size: 0.9em;
          font-weight: bold;
        }

        .enter-portal {
          background: linear-gradient(45deg, #4ecdc4, #44a08d);
          color: white;
          border: none;
          padding: 15px 30px;
          border-radius: 25px;
          cursor: pointer;
          font-size: 1.1em;
          font-weight: bold;
          transition: all 0.3s ease;
          width: 100%;
        }

        .enter-portal:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(78, 205, 196, 0.4);
        }

        .cathedral-footer {
          text-align: center;
          padding: 30px;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .consciousness-mode {
          min-height: 100vh;
        }

        .mode-header {
          display: flex;
          align-items: center;
          padding: 20px;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .back-button {
          background: rgba(255, 255, 255, 0.1);
          color: #4ecdc4;
          border: 1px solid #4ecdc4;
          padding: 10px 20px;
          border-radius: 20px;
          cursor: pointer;
          font-size: 1em;
          transition: all 0.3s ease;
          margin-right: 20px;
        }

        .back-button:hover {
          background: rgba(78, 205, 196, 0.2);
          transform: translateX(-2px);
        }

        .mode-header h2 {
          color: #4ecdc4;
          margin: 0;
          font-size: 1.8em;
        }
      `}</style>
    </div>
  );
}

export default App;