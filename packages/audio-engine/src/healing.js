// Healing frequencies and therapeutic audio patterns
import * as Tone from 'tone'

// Solfeggio frequencies - ancient healing tones
export const SOLFEGGIO_FREQUENCIES = {
  UT: 396, // Liberating guilt and fear
  RE: 417, // Undoing situations and facilitating change
  MI: 528, // Transformation and miracles (DNA repair)
  FA: 639, // Connecting relationships
  SOL: 741, // Awakening intuition
  LA: 852, // Returning to spiritual order
  SI: 963  // Cosmic consciousness
}

// Chakra frequencies
export const CHAKRA_FREQUENCIES = {
  ROOT: 256,      // Muladhara - Grounding
  SACRAL: 288,    // Svadhisthana - Creativity
  SOLAR: 320,     // Manipura - Personal power
  HEART: 341.3,   // Anahata - Love and compassion
  THROAT: 384,    // Vishuddha - Communication
  THIRD_EYE: 426.7, // Ajna - Intuition
  CROWN: 480      // Sahasrara - Spiritual connection
}

export class HealingTones {
  constructor(audioEngine) {
    this.audioEngine = audioEngine
    this.activeTones = new Map()
  }

  async playSolfeggioTone(frequency, duration = '4n', volume = 0.3) {
    await this.audioEngine.init()
    
    const synth = this.audioEngine.createSynth(`solfeggio_${frequency}`, {
      oscillator: { type: 'sine' },
      envelope: { attack: 1, decay: 0, sustain: 1, release: 1 }
    })
    
    const note = Tone.Frequency(frequency, 'hz').toNote()
    synth.triggerAttackRelease(note, duration, undefined, volume)
    
    return synth
  }

  async playChakraTone(chakra, duration = '2m', volume = 0.25) {
    const frequency = CHAKRA_FREQUENCIES[chakra.toUpperCase()]
    if (!frequency) throw new Error(`Unknown chakra: ${chakra}`)
    
    return this.playSolfeggioTone(frequency, duration, volume)
  }

  async createHealingDrone(frequency, volume = 0.2) {
    await this.audioEngine.init()
    
    const synth = new Tone.Oscillator(frequency, 'sine').toDestination()
    synth.volume.value = Tone.gainToDb(volume)
    synth.start()
    
    const id = `drone_${frequency}`
    this.activeTones.set(id, synth)
    
    return { id, synth }
  }

  stopTone(id) {
    const tone = this.activeTones.get(id)
    if (tone) {
      tone.stop()
      tone.dispose()
      this.activeTones.delete(id)
    }
  }

  stopAllTones() {
    this.activeTones.forEach((tone, id) => {
      this.stopTone(id)
    })
  }
}