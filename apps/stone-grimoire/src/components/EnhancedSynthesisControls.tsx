import React, { useState, useEffect } from 'react'
import { Codex144MusicalEngine } from '@cathedral/codex-musical-system'

interface EnhancedSynthesisControlsProps {
  musicEngine?: Codex144MusicalEngine | null
  onEngineUpdate?: (engine: Codex144MusicalEngine) => void
}

export const EnhancedSynthesisControls: React.FC<EnhancedSynthesisControlsProps> = ({
  musicEngine,
  onEngineUpdate
}) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.5)
  const [fractalDepth, setFractalDepth] = useState(3)

  const handlePlay = async () => {
    if (musicEngine) {
      if (isPlaying) {
        await musicEngine.stop()
      } else {
        await musicEngine.start()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume)
    if (musicEngine) {
      musicEngine.setMasterVolume(newVolume)
    }
  }

  return (
    <div className="enhanced-synthesis-controls p-4 border border-purple-500 rounded-lg bg-black/50">
      <h3 className="text-purple-300 text-lg mb-4">Enhanced Synthesis Controls</h3>
      
      <div className="flex flex-col gap-4">
        <button
          onClick={handlePlay}
          className={`px-4 py-2 rounded transition-colors ${
            isPlaying 
              ? 'bg-red-600 hover:bg-red-700 text-white' 
              : 'bg-green-600 hover:bg-green-700 text-white'
          }`}
        >
          {isPlaying ? 'Stop' : 'Play'} Synthesis
        </button>

        <div className="flex flex-col gap-2">
          <label className="text-purple-300">Volume: {Math.round(volume * 100)}%</label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
            className="w-full"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-purple-300">Fractal Depth: {fractalDepth}</label>
          <input
            type="range"
            min="1"
            max="8"
            step="1"
            value={fractalDepth}
            onChange={(e) => setFractalDepth(parseInt(e.target.value))}
            className="w-full"
          />
        </div>

        <div className="text-sm text-purple-400">
          Engine Status: {musicEngine ? 'Connected' : 'Not Connected'}
        </div>
      </div>
    </div>
  )
}

export default EnhancedSynthesisControls