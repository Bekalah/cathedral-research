// Cathedral Research Audio Engine
// Shared audio utilities for harmonic research and healing frequencies

import * as Tone from 'tone'

export class AudioEngine {
  constructor() {
    this.synths = new Map()
    this.isInitialized = false
  }

  async init() {
    if (!this.isInitialized) {
      await Tone.start()
      this.isInitialized = true
    }
  }

  createSynth(id, options = {}) {
    const defaultOptions = {
      oscillator: { type: 'sine' },
      envelope: { attack: 0.4, decay: 0.3, sustain: 0.5, release: 2 }
    }
    
    const synth = new Tone.PolySynth(Tone.Synth, {
      ...defaultOptions,
      ...options
    }).toDestination()
    
    this.synths.set(id, synth)
    return synth
  }

  getSynth(id) {
    return this.synths.get(id)
  }

  disposeSynth(id) {
    const synth = this.synths.get(id)
    if (synth) {
      synth.dispose()
      this.synths.delete(id)
    }
  }

  dispose() {
    this.synths.forEach(synth => synth.dispose())
    this.synths.clear()
    Tone.Transport.stop()
  }
}

export * from './src/healing.js'
export * from './src/binaural.js'
export * from './src/synthesis.js'