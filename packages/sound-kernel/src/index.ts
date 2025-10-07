// Sound Kernel - Lightweight adaptive audio motif kernel for Cathedral / Codex bindings
import * as Tone from 'tone';

/**
 * Basic sound kernel interface for audio motif generation
 */
export interface AudioMotif {
  frequency: number;
  duration: number;
  waveform: 'sine' | 'sawtooth' | 'square' | 'triangle';
  envelope?: {
    attack: number;
    decay: number;
    sustain: number;
    release: number;
  };
}

/**
 * Sound Kernel class for generating adaptive audio motifs
 */
export class SoundKernel {
  private synth: Tone.Synth;
  private isInitialized = false;

  constructor() {
    this.synth = new Tone.Synth({
      oscillator: { type: 'sine' },
      envelope: {
        attack: 0.1,
        decay: 0.1,
        sustain: 0.3,
        release: 1
      }
    }).toDestination();
  }

  /**
   * Initialize the audio context
   */
  async initialize(): Promise<void> {
    if (Tone.getContext().state !== 'running') {
      await Tone.start();
    }
    this.isInitialized = true;
  }

  /**
   * Generate and play an audio motif
   */
  async playMotif(motif: AudioMotif): Promise<void> {
    if (!this.isInitialized) {
      await this.initialize();
    }

    this.synth.oscillator.type = motif.waveform;
    if (motif.envelope) {
      this.synth.envelope.attack = motif.envelope.attack;
      this.synth.envelope.decay = motif.envelope.decay;
      this.synth.envelope.sustain = motif.envelope.sustain;
      this.synth.envelope.release = motif.envelope.release;
    }

    this.synth.triggerAttackRelease(motif.frequency, motif.duration);
  }

  /**
   * Generate a sequence of motifs
   */
  async playSequence(motifs: AudioMotif[]): Promise<void> {
    for (const motif of motifs) {
      await this.playMotif(motif);
      await new Promise(resolve => setTimeout(resolve, motif.duration * 1000));
    }
  }
}

// Export a default instance
export const soundKernel = new SoundKernel();
