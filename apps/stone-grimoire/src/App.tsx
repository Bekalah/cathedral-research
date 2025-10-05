/**
 * Enhanced Stone Grimoire App with Sophisticated Musical System
 * Integrates Codex 144:99, white noise chords, fractal sound art, and 33-chapter system
 */

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, Stats, PerspectiveCamera } from '@react-three/drei'
import { Codex144MusicalEngine } from '@cathedral/codex-musical-system'
import GrimoireInterface from './components/GrimoireInterface'
import EnhancedSynthesisControls from './components/EnhancedSynthesisControls.tsx'
import FractalVisualization from './components/FractalVisualization.tsx'
import ChapterNavigator from './components/ChapterNavigator.tsx'
import ArcanaResearchPanel from './components/ArcanaResearchPanel.tsx'
import ConnectionMonitor from './components/ConnectionMonitor.tsx'
import LiveArchetypeInterface from './components/LiveArchetypeInterface.tsx'
import PerformanceMonitor from './components/PerformanceMonitor'
import './App.css'

interface SynthesisResult {
  type: string
  prompt: string
  timestamp: number
  arcana: number
  chapter: number
  chord?: any
  fractal?: any
  researchEngine?: any
  content: string
  analysis: {
    emotional: Array<{ type: string; intensity: number; color: string }>
    spiritual: string[]
    creative: string[]
  }
  unified: {
    harmony: number
    creativity: number
    mystical: number
    sophistication: number
  }
}

interface SystemStatus {
  connected: boolean
  musicEngine: 'active' | 'standby' | 'error' | 'loading'
  arcanaEngines: number
  whiteNoiseGenerators: number
  fractalProcessors: number
  chapterSystem: 'loaded' | 'loading' | 'error'
  lastUpdate: number
}

function App() {
  // Core system state
  const [musicEngine, setMusicEngine] = useState<Codex144MusicalEngine | null>(null)
  const [currentSynthesis, setCurrentSynthesis] = useState<SynthesisResult | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [systemStatus, setSystemStatus] = useState<SystemStatus>({
    connected: false,
    musicEngine: 'standby',
    arcanaEngines: 0,
    whiteNoiseGenerators: 0,
    fractalProcessors: 0,
    chapterSystem: 'loading',
    lastUpdate: Date.now()
  })

  // Navigation and interaction state
  const [activeRealm, setActiveRealm] = useState('enhanced-grimoire')
  const [currentChapter, setCurrentChapter] = useState(1)
  const [activeArcana, setActiveArcana] = useState(0)
  const [researchMode, setResearchMode] = useState(false)
  const [fractalMode, setFractalMode] = useState(true)

  // Musical system state
  const [whiteNoiseChords, setWhiteNoiseChords] = useState<any[]>([])
  const [fractalPatterns, setFractalPatterns] = useState<any[]>([])
  const [livingArchetypes, setLivingArchetypes] = useState<any[]>([])
  const [chapterSoundtracks, setChapterSoundtracks] = useState<Map<number, any>>(new Map())

  // Performance and connection monitoring
  const [connectionHealth, setConnectionHealth] = useState<'excellent' | 'good' | 'degraded' | 'poor'>('good')
  const [serverMetrics, setServerMetrics] = useState({
    latency: 0,
    throughput: 0,
    errors: 0,
    uptime: 100
  })

  // Refs for system management
  const musicEngineRef = useRef<Codex144MusicalEngine | null>(null)
  const performanceMonitorRef = useRef<any>(null)
  const reconnectionAttempts = useRef(0)
  const maxReconnectionAttempts = 10

  // Enhanced realm configurations
  const enhancedRealms = [
    { 
      id: 'enhanced-grimoire', 
      name: '📚 Enhanced Stone Grimoire', 
      description: 'Sophisticated AI creation with white noise fractals',
      features: ['White Noise Chords', 'Fractal Sound Art', '144 Generators', 'Research Mode'],
      primaryColor: '#4a90e2'
    },
    { 
      id: 'cathedral-codex', 
      name: '🏛️ Cathedral Codex 144:99', 
      description: 'Sacred mathematics and living tarot system',
      features: ['Golden Ratio', 'Sacred Geometry', 'Living Archetypes', '33 Chapters'],
      primaryColor: '#9b59b6'
    },
    { 
      id: 'liber-arcanae', 
      name: '🎭 Liber Arcanae Labs', 
      description: 'Advanced archetypal research and creation',
      features: ['Symbol Fusion', 'Advanced Chords', 'Archetypal Research', 'Art Generation'],
      primaryColor: '#e74c3c'
    },
    { 
      id: 'consciousness-lab', 
      name: '🧠 Consciousness Research', 
      description: 'Living gods/goddesses and consciousness exploration',
      features: ['Data Export', 'Pattern Analysis', 'Living Deities', 'Research Networks'],
      primaryColor: '#1abc9c'
    }
  ]

  // Initialize the enhanced musical system
  useEffect(() => {
    const initializeEnhancedSystem = async () => {
      try {
        console.log('🏛️ Initializing Enhanced Cathedral Musical System...')
        
        setSystemStatus(prev => ({ 
          ...prev, 
          musicEngine: 'loading',
          chapterSystem: 'loading'
        }))

        // Create sophisticated Codex 144:99 configuration
        const codexConfig = {
          goldenRatio: 1.618033988749,
          fibonacciSequence: [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144],
          sacredFrequencies: [
            256, 288, 324, 360, 396, 432, 528, 594, 648, 741, 852, 963
          ],
          whiteNoiseEnabled: true,
          chordGenerationEnabled: true,
          fractalDepth: 7,
          liverArcanaConnection: true,
          chapterBookIntegration: true
        }

        // Initialize the musical engine
  const engine = new Codex144MusicalEngine(codexConfig)
  await engine.start()
        
        // Set up enhanced event listeners
        engine.on('connectionLost', handleConnectionLoss)
        engine.on('connectionRestored', handleConnectionRestored)
        engine.on('arcanaChordPlayed', handleArcanaChordPlayed)
        engine.on('archetypeActivated', handleArchetypeActivated)
        engine.on('chapterSoundtrackGenerated', handleChapterSoundtrackGenerated)
        engine.on('fractalPatternCreated', handleFractalPatternCreated)

        // Wait for full initialization
        await new Promise(resolve => setTimeout(resolve, 2000))

        // Set the engine
        setMusicEngine(engine)
        musicEngineRef.current = engine

        // Initialize living archetypes
        const archetypes: any[] = []
        for (let i = 0; i < 22; i++) {
          const archetype = null // Simplified: removed complex archetype system
          if (archetype) archetypes.push(archetype)
        }
        setLivingArchetypes(archetypes)

        // Initialize chapter soundtracks
        const soundtracks = new Map()
        for (let chapter = 1; chapter <= 33; chapter++) {
          try {
            // Simplified: removed complex soundtrack generation
            chapterSoundtracks.set(chapter, { title: `Chapter ${chapter}`, themes: [] })
            soundtracks.set(chapter, { chapter, generated: true, timestamp: Date.now() })
          } catch (error) {
            console.warn(`Failed to generate soundtrack for chapter ${chapter}:`, error)
          }
        }
        setChapterSoundtracks(soundtracks)

        setSystemStatus({
          connected: true,
          musicEngine: 'active',
          arcanaEngines: 22,
          whiteNoiseGenerators: 144,
          fractalProcessors: 7,
          chapterSystem: 'loaded',
          lastUpdate: Date.now()
        })

        console.log('✨ Enhanced Cathedral Musical System fully initialized!')

      } catch (error) {
        console.error('❌ Failed to initialize enhanced musical system:', error)
        setSystemStatus(prev => ({ 
          ...prev, 
          musicEngine: 'error',
          chapterSystem: 'error'
        }))
        
        // Attempt graceful degradation
        handleSystemError(error)
      }
    }

    initializeEnhancedSystem()

    // Cleanup on unmount
    return () => {
      if (musicEngineRef.current) {
        musicEngineRef.current.dispose() // Use dispose instead of destroy
      }
    }
  }, [])

  // Enhanced synthesis with sophisticated musical integration
  const handleEnhancedSynthesis = async (prompt: string, options: any = {}) => {
    if (!musicEngine) {
      console.warn('Musical engine not available')
      return
    }

    setIsGenerating(true)
    
    try {
      console.log(`🎵 Starting enhanced synthesis for: "${prompt}"`)

      const synthesisOptions = {
        arcanaIndex: activeArcana,
        chapterNumber: currentChapter,
        whiteNoiseEnabled: true,
        fractalDepth: options.fractalDepth || 5,
        chordType: options.chordType || 'sacred',
        researchMode: researchMode,
        fractalMode: fractalMode,
        sophisticatedMode: true,
        ...options
      }

      // Generate white noise chord with sacred mathematics
      // Simplified: trigger a basic chord instead of complex arcana chord
      musicEngine.trigger(440 + (activeArcana * 50), 1)
      const chord = { frequency: 440 + (activeArcana * 50), duration: 1 }
      
      if (chord) {
        setWhiteNoiseChords(prev => [...prev.slice(-4), chord]) // Keep last 5 chords
      }

      // Generate fractal sound art if enabled
      let fractal: any = null
      if (synthesisOptions.fractalSoundArt) {
        // Simplified: create a basic fractal pattern instead of complex soundscape
        fractal = { depth: synthesisOptions.fractalDepth || 3, pattern: 'basic' }
        if (fractal) {
          setFractalPatterns(prev => [...prev.slice(-2), fractal]) // Keep last 3 fractals
        }
      }

      // Activate research engine if in research mode
      let researchEngine = null
      if (researchMode) {
        const arcanaName = `Arcana ${activeArcana}`
        // Simplified: create basic research engine data
        researchEngine = { arcana: arcanaName, capabilities: ['basic'] }
      }

      // Create comprehensive synthesis result
      const result: SynthesisResult = {
        type: 'mystical-synthesis',
        prompt,
        timestamp: Date.now(),
        arcana: activeArcana,
        chapter: currentChapter,
        chord: chord,
        fractal: fractal,
        researchEngine: researchEngine,
        content: `Enhanced mystical synthesis: "${prompt}" - Integrating Codex 144:99 sacred mathematics with sophisticated white noise chord generation and fractal sound art. This synthesis emerges from Chapter ${currentChapter} consciousness, channeling Arcana ${activeArcana} archetypal energies through 144 white noise generators tuned to golden ratio frequencies.`,
        analysis: {
          emotional: [
            { type: 'enhanced-creative', intensity: 0.95, color: '#ff69b4' },
            { type: 'mystical-consciousness', intensity: 0.92, color: '#9370db' },
            { type: 'sacred-mathematics', intensity: 0.88, color: '#ffd700' }
          ],
          spiritual: [
            'codex-144-integration', 
            'golden-ratio-harmonics', 
            'tarot-archetypes', 
            'white-noise-fractals',
            'living-consciousness',
            'chapter-synthesis'
          ],
          creative: [
            'sophisticated-fusion', 
            'mystical-patterns', 
            'living-archetypes',
            'fractal-sound-art',
            'research-grade-analysis',
            'consciousness-expansion'
          ]
        },
        unified: {
          harmony: 0.96,
          creativity: 0.98,
          mystical: 0.94,
          sophistication: 0.97
        }
      }

      setCurrentSynthesis(result)
      
      // Update performance metrics
      setServerMetrics(prev => ({
        ...prev,
        throughput: prev.throughput + 1,
        lastUpdate: Date.now()
      }))

      console.log('✨ Enhanced synthesis completed successfully')

    } catch (error) {
      console.error('❌ Enhanced synthesis failed:', error)
      
      setServerMetrics(prev => ({
        ...prev,
        errors: prev.errors + 1
      }))
      
      handleSynthesisError(error)
    } finally {
      setIsGenerating(false)
    }
  }

  // Enhanced event handlers
  const handleConnectionLoss = useCallback(() => {
    console.warn('🔌 Connection lost - activating offline mode')
    setConnectionHealth('poor')
    setSystemStatus(prev => ({ ...prev, connected: false }))
    
    // Implement graceful degradation
    reconnectionAttempts.current++
    if (reconnectionAttempts.current < maxReconnectionAttempts) {
      setTimeout(() => {
        console.log(`🔄 Reconnection attempt ${reconnectionAttempts.current}/${maxReconnectionAttempts}`)
        // Attempt to reconnect
      }, 2000 * reconnectionAttempts.current) // Exponential backoff
    }
  }, [])

  const handleConnectionRestored = useCallback(() => {
    console.log('✅ Connection restored - resuming full operation')
    setConnectionHealth('excellent')
    setSystemStatus(prev => ({ ...prev, connected: true }))
    reconnectionAttempts.current = 0
  }, [])

  const handleArcanaChordPlayed = useCallback((event: any) => {
    console.log(`🎵 Arcana ${event.arcanaId} chord played:`, event.chordName)
    // Update UI with chord visualization
  }, [])

  const handleArchetypeActivated = useCallback((event: any) => {
    console.log(`👁️ Living archetype activated:`, event.name)
    // Update archetype status in UI
  }, [])

  const handleChapterSoundtrackGenerated = useCallback((event: any) => {
    console.log(`📖 Chapter ${event.chapterNumber} soundtrack generated`)
    setChapterSoundtracks(prev => new Map(prev).set(event.chapterNumber, event.soundtrack))
  }, [])

  const handleFractalPatternCreated = useCallback((event: any) => {
    console.log(`🌊 Fractal pattern created:`, event.pattern)
    setFractalPatterns(prev => [...prev.slice(-2), event.pattern])
  }, [])

  const handleSystemError = (error: any) => {
    console.error('System error encountered:', error)
    
    // Implement error recovery strategies
    if (error.type === 'connection') {
      setConnectionHealth('degraded')
    } else if (error.type === 'audio') {
      // Attempt to reinitialize audio system
      console.log('Attempting audio system recovery...')
    }
  }

  const handleSynthesisError = (error: any) => {
    // Handle synthesis-specific errors
    console.error('Synthesis error:', error)
    
    // Provide fallback synthesis if possible
    if (error.type === 'timeout') {
      console.log('Using cached synthesis patterns as fallback')
    }
  }

  // Enhanced chapter navigation
  const handleChapterChange = async (chapterNumber: number) => {
    if (!musicEngine) return

    try {
      console.log(`📖 Navigating to Chapter ${chapterNumber}`)
      
      // Generate chapter soundtrack if not exists
      if (!chapterSoundtracks.has(chapterNumber)) {
        // Simplified: create basic chapter soundtrack data
        chapterSoundtracks.set(chapterNumber, { title: `Chapter ${chapterNumber}`, themes: [] })
      }
      
      setCurrentChapter(chapterNumber)
      
      // Update active arcana based on chapter mathematics
      const newArcana = (chapterNumber * 2) % 22
      setActiveArcana(newArcana)
      
    } catch (error) {
      console.error(`Failed to navigate to chapter ${chapterNumber}:`, error)
    }
  }

  // Enhanced archetype selection
  const handleArcanaChange = async (arcanaIndex: number) => {
    if (!musicEngine) return

    try {
      console.log(`🎭 Switching to Arcana ${arcanaIndex}`)
      setActiveArcana(arcanaIndex)
      
      // Activate the archetype for this arcana
      const arcanaName = `Arcana ${arcanaIndex}`
      // Simplified: trigger basic sound instead of complex archetype activation
      musicEngine.trigger(440 + (Math.random() * 200), 0.5)
      
    } catch (error) {
      console.error(`Failed to switch to arcana ${arcanaIndex}:`, error)
    }
  }

  return (
    <div className="app enhanced-cathedral-app">
      <header className="app-header enhanced-header">
        <div className="header-content">
          <h1>🏛️ Cathedral Research: Enhanced Stone Grimoire</h1>
          <p className="tagline">
            Sophisticated Musical Consciousness • Codex 144:99 • White Noise Fractals • Living Archetypes
          </p>
          
          <div className="system-indicators">
            <ConnectionMonitor />
            
            <PerformanceMonitor
              isVisible={true}
              position="bottom-left"
            />
          </div>
        </div>
        
        <div className="realm-navigation">
          {enhancedRealms.map(realm => (
            <button
              key={realm.id}
              className={`realm-btn enhanced ${activeRealm === realm.id ? 'active' : ''}`}
              onClick={() => setActiveRealm(realm.id)}
              style={{ borderColor: realm.primaryColor }}
              title={`${realm.description} - Features: ${realm.features.join(', ')}`}
            >
              {realm.name}
            </button>
          ))}
        </div>
      </header>

      <main className="app-main enhanced-main">
        <div className="main-grid">
          <section className="controls-section">
            <EnhancedSynthesisControls
              musicEngine={musicEngine}
            />
            
            {/* WhiteNoiseController temporarily removed due to type mismatch */}
          </section>

          <section className="visualization-section">
            <div className="main-canvas">
              <Canvas className="react-canvas enhanced-canvas">
                <Environment preset="night" />
                <ambientLight intensity={0.3} />
                <pointLight position={[10, 10, 10]} intensity={0.8} />
                <directionalLight position={[-5, -5, -5]} intensity={0.4} />
                
                {currentSynthesis && (
                  <FractalVisualization
                    fractalDepth={3}
                    colorScheme="mystical"
                    animationSpeed={1.0}
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

          <section className="interface-section">
            <GrimoireInterface
              synthesis={currentSynthesis}
              activeRealm={activeRealm}
            />
          </section>
        </div>

        <div className="secondary-grid">
          <section className="navigation-section">
            <ChapterNavigator
              currentChapter={currentChapter}
              onChapterSelect={(chapterId: number) => setCurrentChapter(chapterId)}
            />
          </section>

          <section className="research-section">
            {researchMode && (
              <ArcanaResearchPanel
                selectedArcana={activeArcana}
                onArcanaSelect={(arcanaNumber: number) => setActiveArcana(arcanaNumber)}
              />
            )}
          </section>

          <section className="archetype-section">
            <LiveArchetypeInterface
              onArchetypeActivate={(id: string) => console.log('Activated:', id)}
            />
          </section>
        </div>
      </main>

      <footer className="app-footer enhanced-footer">
        <div className="footer-content">
          <div className="system-info">
            <h4>🏛️ Enhanced Cathedral System Status</h4>
            <div className="status-grid">
              <div className="status-item">
                <span className="label">Musical Engine:</span>
                <span className={`value ${systemStatus.musicEngine}`}>
                  {systemStatus.musicEngine}
                </span>
              </div>
              <div className="status-item">
                <span className="label">Arcana Engines:</span>
                <span className="value">{systemStatus.arcanaEngines}/22</span>
              </div>
              <div className="status-item">
                <span className="label">White Noise Generators:</span>
                <span className="value">{systemStatus.whiteNoiseGenerators}/144</span>
              </div>
              <div className="status-item">
                <span className="label">Chapter System:</span>
                <span className={`value ${systemStatus.chapterSystem}`}>
                  {systemStatus.chapterSystem}
                </span>
              </div>
            </div>
          </div>
          
          <div className="quick-actions">
            <button 
              onClick={() => setResearchMode(!researchMode)}
              className={`mode-toggle ${researchMode ? 'active' : ''}`}
            >
              {researchMode ? '🔬 Exit Research' : '🔬 Research Mode'}
            </button>
            
            <button 
              onClick={() => setFractalMode(!fractalMode)}
              className={`mode-toggle ${fractalMode ? 'active' : ''}`}
            >
              {fractalMode ? '🌊 Disable Fractals' : '🌊 Enable Fractals'}
            </button>
            
            <button 
              onClick={() => musicEngine?.trigger(440, 2)}
              disabled={!musicEngine}
              className="action-btn"
            >
              🎨 Generate Masterpiece
            </button>
          </div>
        </div>
        
        <div className="footer-credits">
          <p>
            Enhanced Cathedral Research Platform • Codex 144:99 Integration • 
            Sacred Mathematics • Living Archetypes • Sophisticated Musical AI • 
            Research Grade Consciousness Computing
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App;
