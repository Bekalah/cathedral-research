/**
 * Cathedral Research - Codex 144:99 Musical Engine (Simplified Working Version)
 * Basic implementation to get the system running
 */

import * as Tone from 'tone'
import { EventEmitter } from 'events'

export interface Codex144Config {
  goldenRatio: number
  fibonacciSequence: number[]
  sacredFrequencies: number[]
  whiteNoiseEnabled: boolean
  chordGenerationEnabled: boolean
  fractalDepth: number
  liverArcanaConnection: boolean
  chapterBookIntegration: boolean
}

export class Codex144MusicalEngine extends EventEmitter {
  private config: Codex144Config
  private masterVolume: Tone.Volume
  private oscillators: Tone.Oscillator[] = []
  private noiseSource: Tone.Noise | null = null
  private isStarted: boolean = false

  constructor(config: Codex144Config) {
    super()
    this.config = config
    this.masterVolume = new Tone.Volume(-20).toDestination()
    this.setupBasicSynthesis()
  }

  private setupBasicSynthesis(): void {
    // Create basic noise source
    if (this.config.whiteNoiseEnabled) {
      this.noiseSource = new Tone.Noise('white')
      this.noiseSource.connect(this.masterVolume)
    }

    // Create basic oscillators for sacred frequencies
    this.config.sacredFrequencies.forEach((freq, index) => {
      const osc = new Tone.Oscillator(freq, 'sine')
      osc.connect(this.masterVolume)
      this.oscillators.push(osc)
    })
  }

  async start(): Promise<void> {
    if (this.isStarted) return

    try {
      await Tone.start()
      
      if (this.noiseSource) {
        this.noiseSource.start()
      }

      this.oscillators.forEach((osc, index) => {
        // Stagger the start times slightly
        osc.start(Tone.now() + index * 0.1)
      })

      this.isStarted = true
      this.emit('started')
    } catch (error) {
      console.error('Failed to start Codex144MusicalEngine:', error)
      this.emit('error', error)
    }
  }

  async stop(): Promise<void> {
    if (!this.isStarted) return

    try {
      if (this.noiseSource) {
        this.noiseSource.stop()
      }

      this.oscillators.forEach(osc => {
        osc.stop()
      })

      this.isStarted = false
      this.emit('stopped')
    } catch (error) {
      console.error('Failed to stop Codex144MusicalEngine:', error)
      this.emit('error', error)
    }
  }

  setMasterVolume(volume: number): void {
    // Convert 0-1 range to decibels (-60 to 0)
    const dbValue = volume === 0 ? -60 : Math.log10(volume) * 20
    this.masterVolume.volume.rampTo(dbValue, 0.1)
    this.emit('volumeChanged', volume)
  }

  getMasterVolume(): number {
    const dbValue = this.masterVolume.volume.value
    return dbValue === -60 ? 0 : Math.pow(10, dbValue / 20)
  }

  trigger(frequency: number, duration: number = 1): void {
    if (!this.isStarted) return

    const synth = new Tone.Synth().connect(this.masterVolume)
    synth.triggerAttackRelease(frequency, duration)
    
    // Clean up after the note
    setTimeout(() => {
      synth.dispose()
    }, (duration + 0.5) * 1000)
  }

  dispose(): void {
    this.stop()
    this.oscillators.forEach(osc => osc.dispose())
    if (this.noiseSource) this.noiseSource.dispose()
    this.masterVolume.dispose()
  }

  // Getters for system status
  get isRunning(): boolean {
    return this.isStarted
  }

  get currentConfig(): Codex144Config {
    return { ...this.config }
  }
}

// Export default config
export const defaultCodex144Config: Codex144Config = {
  goldenRatio: 1.618033988749895,
  fibonacciSequence: [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144],
  sacredFrequencies: [256, 384, 512, 640, 768], // Based on harmonic series
  whiteNoiseEnabled: true,
  chordGenerationEnabled: true,
  fractalDepth: 3,
  liverArcanaConnection: true,
  chapterBookIntegration: true
}