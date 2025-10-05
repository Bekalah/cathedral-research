import React from 'react';

interface SynthesisResult {
  type: string;
  pattern?: string;
  [key: string]: any;
}

interface GrimoireInterfaceProps {
  synthesis?: SynthesisResult | null;
  activeRealm?: string;
}

const GrimoireInterface: React.FC<GrimoireInterfaceProps> = ({ synthesis, activeRealm }) => {
  if (!synthesis) {
    return (
      <div className="grimoire-interface">
        <h2>📚 Grimoire Interface</h2>
        <div className="empty-state">
          <p>✨ Enter a prompt above to begin mystical creation</p>
          <p>Your synthesis results will appear here</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grimoire-interface">
      <h2>📚 Synthesis Results</h2>

      <div className="synthesis-info">
        <div className="info-card">
          <h3>🎭 Synthesis Type</h3>
          <p className="synthesis-type">{synthesis.type}</p>
        </div>

        {synthesis.pattern && (
          <div className="info-card">
            <h3>🔮 Sacred Pattern</h3>
            <p className="pattern-name">{synthesis.pattern}</p>
          </div>
        )}

        {synthesis.energy && (
          <div className="info-card">
            <h3>⚡ Energy Level</h3>
            <div className="energy-bar">
              <div
                className="energy-fill"
                style={{ width: `${synthesis.energy * 100}%` }}
              />
            </div>
            <p className="energy-value">{Math.round(synthesis.energy * 100)}%</p>
          </div>
        )}
      </div>

      {synthesis.elements && synthesis.elements.length > 0 && (
        <div className="elements-section">
          <h3>🎨 Creative Elements</h3>
          <div className="elements-grid">
            {synthesis.elements.map((element: any, index: number) => (
              <div key={index} className="element-card">
                <div className="element-type">{element.type}</div>
                <div className="element-form">{element.form}</div>
                <div className="element-energy">{element.energy}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {synthesis.numerology && Object.keys(synthesis.numerology).length > 0 && (
        <div className="numerology-section">
          <h3>🔢 Sacred Numerology</h3>
          <div className="numerology-grid">
            {Object.entries(synthesis.numerology).map(([number, meaning]: [string, unknown]) => (
              <div key={number} className="number-card">
                <div className="number">{number}</div>
                <div className="meaning">{String(meaning)}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {synthesis.colors && synthesis.colors.length > 0 && (
        <div className="colors-section">
          <h3>🎨 Sacred Colors</h3>
          <div className="color-palette">
            {synthesis.colors.map((color: any, index: number) => (
              <div
                key={index}
                className="color-swatch"
                style={{ backgroundColor: `#${color.toString(16).padStart(6, '0')}` }}
                title={`Color: #${color.toString(16).padStart(6, '0')}`}
              />
            ))}
          </div>
        </div>
      )}

      <div className="synthesis-actions">
        <button className="action-btn primary">
          📥 Save to Grimoire
        </button>
        <button className="action-btn secondary">
          🔗 Share Creation
        </button>
        <button className="action-btn tertiary">
          🔄 Generate Variation
        </button>
      </div>
    </div>
  );
};

export default GrimoireInterface;
