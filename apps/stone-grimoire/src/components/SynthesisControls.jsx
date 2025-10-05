import React, { useState } from 'react';

const SynthesisControls = ({ onSynthesize, isGenerating, activeRealm }) => {
  const [prompt, setPrompt] = useState('');
  const [synthesisType, setSynthesisType] = useState('fusion-kink');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (prompt.trim() && !isGenerating) {
      await onSynthesize(prompt, synthesisType);
    }
  };

  const getPlaceholderText = () => {
    switch (activeRealm) {
      case 'grimoire':
        return 'Describe your mystical creation... (e.g., "sacred geometry with passion")';
      case 'cathedral':
        return 'Describe the sacred space... (e.g., "cosmic temple of light")';
      case 'fusion':
        return 'Express your intimate vision... (e.g., "passionate cosmic connection")';
      case 'mystical':
        return 'Invoke mystical patterns... (e.g., "tree of life with divine harmony")';
      default:
        return 'Enter your creative prompt...';
    }
  };

  const getSynthesisOptions = () => {
    switch (activeRealm) {
      case 'grimoire':
        return [
          { value: 'fusion-kink', label: '🎭 Fusion Creation' },
          { value: 'mystical', label: '🔮 Sacred Patterns' },
          { value: 'artistic', label: '🎨 Artistic Expression' }
        ];
      case 'cathedral':
        return [
          { value: 'sacred', label: '🏛️ Sacred Architecture' },
          { value: 'mystical', label: '🔮 Mystical Geometry' },
          { value: 'tarot', label: '📿 Living Tarot' }
        ];
      case 'fusion':
        return [
          { value: 'fusion-kink', label: '💕 Intimate Fusion' },
          { value: 'passion', label: '🔥 Passionate Expression' },
          { value: 'connection', label: '🌌 Cosmic Connection' }
        ];
      case 'mystical':
        return [
          { value: 'mystical', label: '🔮 Sacred Geometry' },
          { value: 'numerology', label: '🔢 Divine Numbers' },
          { value: 'archetypal', label: '🧬 Universal Patterns' }
        ];
      default:
        return [
          { value: 'fusion-kink', label: '🎭 Creative Synthesis' }
        ];
    }
  };

  return (
    <div className="synthesis-controls">
      <h2>Creative Synthesis Engine</h2>

      <form onSubmit={handleSubmit} className="synthesis-form">
        <div className="input-group">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder={getPlaceholderText()}
            className="creative-prompt"
            rows={4}
            disabled={isGenerating}
          />
        </div>

        <div className="controls-row">
          <div className="synthesis-type">
            <label>Synthesis Type:</label>
            <select
              value={synthesisType}
              onChange={(e) => setSynthesisType(e.target.value)}
              disabled={isGenerating}
            >
              {getSynthesisOptions().map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className={`synthesize-btn ${isGenerating ? 'generating' : ''}`}
            disabled={!prompt.trim() || isGenerating}
          >
            {isGenerating ? (
              <>
                <span className="spinner"></span>
                Synthesizing...
              </>
            ) : (
              '✨ Synthesize Creation'
            )}
          </button>
        </div>
      </form>

      <div className="quick-prompts">
        <h3>Quick Prompts:</h3>
        <div className="prompt-buttons">
          {getQuickPrompts().map((quickPrompt, index) => (
            <button
              key={index}
              className="quick-prompt-btn"
              onClick={() => setPrompt(quickPrompt.text)}
              disabled={isGenerating}
            >
              {quickPrompt.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  function getQuickPrompts() {
    switch (activeRealm) {
      case 'grimoire':
        return [
          { label: '📚', text: 'Create a living grimoire of sacred knowledge' },
          { label: '✨', text: 'Manifest a mystical archive of universal wisdom' },
          { label: '🔮', text: 'Generate an AI-powered book of shadows' }
        ];
      case 'cathedral':
        return [
          { label: '🏛️', text: 'Sacred temple of light and consciousness' },
          { label: '🌌', text: 'Cosmic cathedral connecting all realms' },
          { label: '📿', text: 'Living tarot temple with divine guidance' }
        ];
      case 'fusion':
        return [
          { label: '💕', text: 'Intimate connection between passion and spirit' },
          { label: '🌹', text: 'Sacred sexuality expressed through art' },
          { label: '🔥', text: 'Powerful fusion of love and creative energy' }
        ];
      case 'mystical':
        return [
          { label: '🔢', text: 'Sacred numerology pattern with divine harmony' },
          { label: '🌸', text: 'Flower of life unfolding in cosmic consciousness' },
          { label: '⭐', text: 'Metatron cube manifesting universal patterns' }
        ];
      default:
        return [
          { label: '🎭', text: 'Creative synthesis of art and consciousness' }
        ];
    }
  }
};

export default SynthesisControls;
