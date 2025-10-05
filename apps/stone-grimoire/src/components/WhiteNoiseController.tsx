/**
 * Enhanced White Noise Controller Component
 * Sophisticated chord generation and fractal sound art interface
 */

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Codex144MusicalEngine } from '../../../../packages/codex-musical-system/src/Codex144MusicalEngine'
import './WhiteNoiseController.css'

interface WhiteNoiseControllerProps {
  musicSystem: Codex144MusicalEngine | null
  activeArcana: number
  currentChapter: number
  onChordGenerated?: (chord: any) => void
  onFractalCreated?: (fractal: any) => void
}

interface ChordConfiguration {
  type: 'major' | 'minor' | 'dominant7' | 'major7' | 'mystic' | 'sacred' | 'fibonacci'
  inversion: number
  voicing: 'close' | 'open' | 'spread'
  rhythm: 'slow' | 'medium' | 'fast' | 'fractal'
  dynamics: 'soft' | 'medium' | 'loud' | 'dynamic'
  whiteNoiseIntensity: number
  fractalDepth: number
}

interface ArcanaVisualizer {
  id: number
  name: string
  color: string
  frequency: number
  amplitude: number
  phase: number
}

export const WhiteNoiseController: React.FC<WhiteNoiseControllerProps> = ({
  musicSystem,
  activeArcana,
  currentChapter,
  onChordGenerated,
  onFractalCreated
}) => {
  // State management
  const [isPlaying, setIsPlaying] = useState(false)
  const [chordConfig, setChordConfig] = useState<ChordConfiguration>({
    type: 'major',
    inversion: 0,
    voicing: 'open',
    rhythm: 'medium',
    dynamics: 'medium',
    whiteNoiseIntensity: 0.3,
    fractalDepth: 5
  })
  const [activeChords, setActiveChords] = useState<string[]>([])
  const [fractalVisualization, setFractalVisualization] = useState<any>(null)
  const [arcanaVisualizers, setArcanaVisualizers] = useState<ArcanaVisualizer[]>([])
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'disconnected' | 'reconnecting'>('connected')

  // Refs
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const audioContextRef = useRef<AudioContext>()

  // Initialize visualizers for all 22 arcana
  useEffect(() => {
    const visualizers: ArcanaVisualizer[] = []
    const arcanaColors = [
      '#FFE4B5', '#FF4500', '#8A2BE2', '#228B22', '#FF1493',
      '#00CED1', '#FFD700', '#DC143C', '#4169E1', '#32CD32',
      '#FF69B4', '#20B2AA', '#FFA500', '#9932CC', '#FF6347',
      '#4682B4', '#DAA520', '#B22222', '#008B8B', '#9ACD32',
      '#FF8C00', '#6A5ACD'
    ]

    for (let i = 0; i < 22; i++) {
      visualizers.push({
        id: i,
        name: `Arcana ${i}`,
        color: arcanaColors[i],
        frequency: 432 + (i * 13.7), // Golden ratio frequency spacing
        amplitude: 0.5,
        phase: (i / 22) * Math.PI * 2
      })
    }

    setArcanaVisualizers(visualizers)
  }, [])

  // Monitor connection status
  useEffect(() => {
    if (!musicSystem) return

    const handleConnectionLost = () => setConnectionStatus('disconnected')
    const handleConnectionRestored = () => setConnectionStatus('connected')

    musicSystem.on('connectionLost', handleConnectionLost)
    musicSystem.on('connectionRestored', handleConnectionRestored)

    return () => {
      musicSystem.off('connectionLost', handleConnectionLost)
      musicSystem.off('connectionRestored', handleConnectionRestored)
    }
  }, [musicSystem])

  // Canvas visualization
  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    canvas.width = 800
    canvas.height = 400

    const animate = () => {
      // Clear canvas
      ctx.fillStyle = 'rgba(0, 0, 20, 0.1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw arcana visualizations
      arcanaVisualizers.forEach((visualizer, index) => {
        if (index === activeArcana) {
          drawActiveArcanaVisualization(ctx, visualizer, canvas.width, canvas.height)
        } else {
          drawArcanaVisualization(ctx, visualizer, canvas.width, canvas.height, index)
        }
      })

      // Draw fractal patterns if active
      if (fractalVisualization) {
        drawFractalPattern(ctx, fractalVisualization, canvas.width, canvas.height)
      }

      // Draw chord visualization
      if (activeChords.length > 0) {
        drawChordVisualization(ctx, activeChords, canvas.width, canvas.height)
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [arcanaVisualizers, activeArcana, fractalVisualization, activeChords])

  const drawActiveArcanaVisualization = (
    ctx: CanvasRenderingContext2D,
    visualizer: ArcanaVisualizer,
    width: number,
    height: number
  ) => {
    const centerX = width / 2
    const centerY = height / 2
    const time = Date.now() * 0.001

    // Draw golden ratio spiral for active arcana
    const goldenRatio = 1.618033988749
    ctx.strokeStyle = visualizer.color
    ctx.lineWidth = 3
    ctx.beginPath()

    for (let i = 0; i < 144; i++) {
      const angle = (i / 144) * Math.PI * 2 * goldenRatio + time
      const radius = (i / 144) * 100 * Math.sin(time + visualizer.phase)
      const x = centerX + Math.cos(angle) * radius
      const y = centerY + Math.sin(angle) * radius

      if (i === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    }
    ctx.stroke()

    // Add white noise visualization
    if (isPlaying) {
      for (let i = 0; i < 20; i++) {
        const x = centerX + (Math.random() - 0.5) * 200
        const y = centerY + (Math.random() - 0.5) * 200
        const alpha = chordConfig.whiteNoiseIntensity * 0.8

        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`
        ctx.fillRect(x, y, 2, 2)
      }
    }
  }

  const drawArcanaVisualization = (
    ctx: CanvasRenderingContext2D,
    visualizer: ArcanaVisualizer,
    width: number,
    height: number,
    index: number
  ) => {
    const time = Date.now() * 0.001
    const radius = 20 + Math.sin(time + visualizer.phase) * 10
    const angle = (index / 22) * Math.PI * 2
    const centerX = width / 2 + Math.cos(angle) * 150
    const centerY = height / 2 + Math.sin(angle) * 150

    ctx.fillStyle = visualizer.color
    ctx.globalAlpha = 0.6
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
    ctx.fill()
    ctx.globalAlpha = 1
  }

  const drawFractalPattern = (
    ctx: CanvasRenderingContext2D,
    fractal: any,
    width: number,
    height: number
  ) => {
    const time = Date.now() * 0.001
    const centerX = width / 2
    const centerY = height / 2

    ctx.strokeStyle = `hsl(${time * 50}, 70%, 60%)`
    ctx.lineWidth = 1

    for (let depth = 0; depth < chordConfig.fractalDepth; depth++) {
      const scale = Math.pow(0.618, depth) // Golden ratio scaling
      const rotation = time + depth * 0.5

      ctx.save()
      ctx.translate(centerX, centerY)
      ctx.rotate(rotation)
      ctx.scale(scale, scale)

      // Draw fractal branches
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2
        const length = 100

        ctx.beginPath()
        ctx.moveTo(0, 0)
        ctx.lineTo(Math.cos(angle) * length, Math.sin(angle) * length)
        ctx.stroke()
      }

      ctx.restore()
    }
  }

  const drawChordVisualization = (
    ctx: CanvasRenderingContext2D,
    chords: string[],
    width: number,
    height: number
  ) => {
    chords.forEach((chord, index) => {
      const x = (index + 1) * (width / (chords.length + 1))
      const y = height - 50
      const barHeight = 30 + Math.sin(Date.now() * 0.01 + index) * 20

      ctx.fillStyle = `hsl(${index * 60}, 70%, 60%)`
      ctx.fillRect(x - 10, y - barHeight, 20, barHeight)

      ctx.fillStyle = 'white'
      ctx.font = '12px monospace'
      ctx.textAlign = 'center'
      ctx.fillText(chord, x, y + 15)
    })
  }

  const handlePlayChord = async () => {
    if (!musicSystem) return

    try {
      setIsPlaying(true)
      
      // Generate sophisticated chord based on configuration
      const chordName = `${chordConfig.type}_${chordConfig.voicing}_${Date.now()}`
      
      await musicSystem.playArcanaChord(activeArcana, chordName)
      
      setActiveChords(prev => [...prev, chordConfig.type].slice(-5)) // Keep last 5 chords
      
      // Generate fractal if depth > 0
      if (chordConfig.fractalDepth > 0) {
        const fractal = await musicSystem.createFractalSoundscape(chordConfig.fractalDepth)
        setFractalVisualization(fractal)
        onFractalCreated?.(fractal)
      }

      onChordGenerated?.({ 
        type: chordConfig.type, 
        arcana: activeArcana, 
        chapter: currentChapter 
      })

    } catch (error) {
      console.error('Failed to play chord:', error)
      setConnectionStatus('reconnecting')
    } finally {
      setTimeout(() => setIsPlaying(false), 2000)
    }
  }

  const handleActivateArchetype = async () => {
    if (!musicSystem) return

    try {
      const arcanaName = `Arcana ${activeArcana}`
      const archetype = await musicSystem.activateLivingArchetype(arcanaName)
      
      if (archetype) {
        console.log(`Living archetype ${arcanaName} activated for research and art creation`)
      }
    } catch (error) {
      console.error('Failed to activate archetype:', error)
    }
  }

  const handleGenerateFractalSoundscape = async () => {
    if (!musicSystem) return

    try {
      await musicSystem.createFractalSoundscape(chordConfig.fractalDepth)
      setFractalVisualization({ depth: chordConfig.fractalDepth, timestamp: Date.now() })
    } catch (error) {
      console.error('Failed to generate fractal soundscape:', error)
    }
  }

  const handleGenerateChapterSoundtrack = async () => {
    if (!musicSystem) return

    try {
      await musicSystem.generateChapterSoundtrack(currentChapter)
    } catch (error) {
      console.error('Failed to generate chapter soundtrack:', error)
    }
  }

  const getConnectionStatusColor = () => {
    switch (connectionStatus) {
      case 'connected': return '#00ff00'
      case 'disconnected': return '#ff0000'
      case 'reconnecting': return '#ffaa00'
      default: return '#888888'
    }
  }

  return (
    <div className="white-noise-controller">
      <div className="controller-header">
        <h3>🎵 Codex 144:99 Musical Engine</h3>
        <div className="connection-indicator">
          <div 
            className="status-dot"
            style={{ backgroundColor: getConnectionStatusColor() }}
          />
          <span>{connectionStatus}</span>
        </div>
      </div>

      <div className="visualization-canvas">
        <canvas 
          ref={canvasRef}
          className="fractal-canvas"
        />
      </div>

      <div className="controls-grid">
        <div className="chord-controls">
          <h4>Chord Configuration</h4>
          
          <div className="control-group">
            <label>Chord Type:</label>
            <select
              value={chordConfig.type}
              onChange={(e) => setChordConfig(prev => ({ 
                ...prev, 
                type: e.target.value as any 
              }))}
            >
              <option value="major">Major</option>
              <option value="minor">Minor</option>
              <option value="dominant7">Dominant 7th</option>
              <option value="major7">Major 7th</option>
              <option value="mystic">Mystic</option>
              <option value="sacred">Sacred</option>
              <option value="fibonacci">Fibonacci</option>
            </select>
          </div>

          <div className="control-group">
            <label>Voicing:</label>
            <select
              value={chordConfig.voicing}
              onChange={(e) => setChordConfig(prev => ({ 
                ...prev, 
                voicing: e.target.value as any 
              }))}
            >
              <option value="close">Close</option>
              <option value="open">Open</option>
              <option value="spread">Spread</option>
            </select>
          </div>

          <div className="control-group">
            <label>White Noise Intensity:</label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={chordConfig.whiteNoiseIntensity}
              onChange={(e) => setChordConfig(prev => ({ 
                ...prev, 
                whiteNoiseIntensity: parseFloat(e.target.value) 
              }))}
            />
            <span>{(chordConfig.whiteNoiseIntensity * 100).toFixed(0)}%</span>
          </div>

          <div className="control-group">
            <label>Fractal Depth:</label>
            <input
              type="range"
              min="1"
              max="10"
              step="1"
              value={chordConfig.fractalDepth}
              onChange={(e) => setChordConfig(prev => ({ 
                ...prev, 
                fractalDepth: parseInt(e.target.value) 
              }))}
            />
            <span>{chordConfig.fractalDepth}</span>
          </div>
        </div>

        <div className="action-controls">
          <h4>Musical Actions</h4>
          
          <button
            onClick={handlePlayChord}
            disabled={!musicSystem || isPlaying}
            className="primary-action"
          >
            {isPlaying ? '🎵 Playing...' : '🎵 Play White Noise Chord'}
          </button>

          <button
            onClick={handleGenerateFractalSoundscape}
            disabled={!musicSystem}
            className="secondary-action"
          >
            🌊 Generate Fractal Soundscape
          </button>

          <button
            onClick={handleActivateArchetype}
            disabled={!musicSystem}
            className="secondary-action"
          >
            👁️ Activate Living Archetype
          </button>

          <button
            onClick={handleGenerateChapterSoundtrack}
            disabled={!musicSystem}
            className="secondary-action"
          >
            📖 Chapter {currentChapter} Soundtrack
          </button>
        </div>

        <div className="status-display">
          <h4>System Status</h4>
          
          <div className="status-item">
            <span>Active Arcana:</span>
            <span className="status-value">
              {activeArcana} ({arcanaVisualizers[activeArcana]?.name || 'Unknown'})
            </span>
          </div>

          <div className="status-item">
            <span>Current Chapter:</span>
            <span className="status-value">{currentChapter} / 33</span>
          </div>

          <div className="status-item">
            <span>Active Chords:</span>
            <span className="status-value">{activeChords.length}</span>
          </div>

          <div className="status-item">
            <span>Fractal Active:</span>
            <span className="status-value">
              {fractalVisualization ? 'Yes' : 'No'}
            </span>
          </div>
        </div>
      </div>

      <div className="recent-chords">
        <h4>Recent Chords</h4>
        <div className="chord-history">
          {activeChords.map((chord, index) => (
            <div key={index} className="chord-badge">
              {chord}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default WhiteNoiseController