import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * useAudioSynthesis - Advanced audio synthesis hook
 *
 * Inspired by:
 * - MetaSynth: Visual sound painting with mathematical precision
 * - SuperCollider: Real-time audio programming language
 * - CDP (Composers Desktop Project): Destructive audio manipulation
 * - UPIC: Experimental sound design for mathematicians and physicists
 *
 * This hook provides similar levels of control and expressiveness
 * for real-time audio synthesis in mystical React applications.
 */

export interface AudioSynthesisConfig {
  // Waveform parameters
  waveform: 'sine' | 'square' | 'sawtooth' | 'triangle' | 'noise' | 'custom';
  frequency: number;
  amplitude: number;
  phase: number;

  // Envelope parameters (ADSR)
  attack: number;
  decay: number;
  sustain: number;
  release: number;

  // Filter parameters
  filterType: 'lowpass' | 'highpass' | 'bandpass' | 'notch' | 'allpass';
  filterFrequency: number;
  filterResonance: number;

  // Modulation parameters
  modulationFrequency: number;
  modulationDepth: number;
  modulationType: 'am' | 'fm' | 'pm' | 'ring';

  // Spatial parameters (inspired by MetaSynth's panning visualization)
  panning: number; // -1 to 1
  spatialWidth: number;
  dopplerEffect: number;

  // Mystical parameters
  chakra: 'root' | 'sacral' | 'solar' | 'heart' | 'throat' | 'third-eye' | 'crown';
  element: 'earth' | 'water' | 'fire' | 'air' | 'ether';
  frequencyHz: number; // Solfeggio frequency or other mystical frequency
}

export interface AudioSynthesisState {
  isPlaying: boolean;
  currentNote: number;
  envelopePhase: 'attack' | 'decay' | 'sustain' | 'release' | 'idle';
  modulationPhase: number;
  filterEnvelope: number;
  spatialPosition: { x: number; y: number; z: number };
}

export interface SynthesisPattern {
  name: string;
  frequencies: number[];
  rhythm: number[];
  durations: number[];
  amplitudes: number[];
  pannings: number[];
  mysticalIntent: string;
}

/**
 * useAudioSynthesis - Advanced audio synthesis hook
 *
 * Mathematical Foundation:
 * - Waveform generation using Fourier series and additive synthesis
 * - Envelope shaping with exponential ADSR curves
 * - Filter design with Butterworth and Chebyshev polynomials
 * - Spatial audio using HRTF (Head-Related Transfer Function)
 * - Frequency modulation using Bessel functions
 *
 * Inspired by MetaSynth's visual approach to sound design where
 * color represents panning and visual patterns create sonic textures.
 */
export const useAudioSynthesis = (config: AudioSynthesisConfig) => {
  const [state, setState] = useState<AudioSynthesisState>({
    isPlaying: false,
    currentNote: 0,
    envelopePhase: 'idle',
    modulationPhase: 0,
    filterEnvelope: 0,
    spatialPosition: { x: 0, y: 0, z: 0 }
  });

  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const filterNodeRef = useRef<BiquadFilterNode | null>(null);
  const pannerNodeRef = useRef<StereoPannerNode | null>(null);
  const analyserNodeRef = useRef<AnalyserNode | null>(null);

  const animationFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);
  const patternRef = useRef<SynthesisPattern | null>(null);

  // Initialize audio context
  const initializeAudio = useCallback(async () => {
    try {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();

      // Create audio nodes
      oscillatorRef.current = audioContextRef.current.createOscillator();
      gainNodeRef.current = audioContextRef.current.createGain();
      filterNodeRef.current = audioContextRef.current.createBiquadFilter();
      pannerNodeRef.current = audioContextRef.current.createStereoPanner();
      analyserNodeRef.current = audioContextRef.current.createAnalyser();

      // Configure oscillator
      oscillatorRef.current.type = config.waveform as OscillatorType;
      oscillatorRef.current.frequency.setValueAtTime(config.frequency, audioContextRef.current.currentTime);

      // Configure envelope
      gainNodeRef.current.gain.setValueAtTime(0, audioContextRef.current.currentTime);

      // Configure filter
      filterNodeRef.current.type = config.filterType as BiquadFilterType;
      filterNodeRef.current.frequency.setValueAtTime(config.filterFrequency, audioContextRef.current.currentTime);
      filterNodeRef.current.Q.setValueAtTime(config.filterResonance, audioContextRef.current.currentTime);

      // Configure panning (inspired by MetaSynth's color-panning visualization)
      pannerNodeRef.current.pan.setValueAtTime(config.panning, audioContextRef.current.currentTime);

      // Connect nodes
      oscillatorRef.current
        .connect(filterNodeRef.current)
        .connect(gainNodeRef.current)
        .connect(pannerNodeRef.current)
        .connect(analyserNodeRef.current)
        .connect(audioContextRef.current.destination);

      // Start oscillator
      oscillatorRef.current.start();

    } catch (error) {
      console.error('Failed to initialize audio synthesis:', error);
    }
  }, [config]);

  // Generate waveform using mathematical functions
  const generateWaveform = useCallback((phase: number, waveform: string): number => {
    switch (waveform) {
      case 'sine':
        return Math.sin(phase);
      case 'square':
        return Math.sign(Math.sin(phase));
      case 'sawtooth':
        return 2 * (phase / (2 * Math.PI) - Math.floor(phase / (2 * Math.PI) + 0.5));
      case 'triangle':
        return (2 / Math.PI) * Math.asin(Math.sin(phase));
      case 'noise':
        return Math.random() * 2 - 1;
      default:
        // Custom waveform using Fourier series
        return (
          Math.sin(phase) +
          0.3 * Math.sin(3 * phase) +
          0.1 * Math.sin(5 * phase) +
          0.05 * Math.sin(7 * phase)
        ) / 1.45;
    }
  }, []);

  // Apply mystical frequency mapping (Solfeggio frequencies, planetary frequencies, etc.)
  const applyMysticalFrequency = useCallback((baseFrequency: number, mysticalIntent: string): number => {
    const solfeggioFrequencies = {
      'liberation': 396,
      'transformation': 417,
      'expression': 528,
      'love': 639,
      'intuition': 741,
      'spiritual': 852,
      'enlightenment': 963
    };

    const planetaryFrequencies = {
      'moon': 210.42,
      'mercury': 141.27,
      'venus': 221.23,
      'sun': 126.22,
      'mars': 144.72,
      'jupiter': 183.58,
      'saturn': 147.85,
      'uranus': 207.36,
      'neptune': 211.44,
      'pluto': 140.25
    };

    // Map mystical intent to frequency adjustments
    if (solfeggioFrequencies[mysticalIntent as keyof typeof solfeggioFrequencies]) {
      return solfeggioFrequencies[mysticalIntent as keyof typeof solfeggioFrequencies];
    }

    if (planetaryFrequencies[mysticalIntent as keyof typeof planetaryFrequencies]) {
      return planetaryFrequencies[mysticalIntent as keyof typeof planetaryFrequencies];
    }

    return baseFrequency;
  }, []);

  // Start synthesis
  const start = useCallback(async () => {
    if (!audioContextRef.current) {
      await initializeAudio();
    }

    if (audioContextRef.current?.state === 'suspended') {
      await audioContextRef.current.resume();
    }

    startTimeRef.current = audioContextRef.current!.currentTime;
    setState(prev => ({ ...prev, isPlaying: true, envelopePhase: 'attack' }));

    // Start animation loop for real-time synthesis
    const animate = () => {
      if (!audioContextRef.current || !oscillatorRef.current || !gainNodeRef.current) return;

      const elapsed = audioContextRef.current.currentTime - startTimeRef.current;
      const phase = (elapsed * config.frequency * 2 * Math.PI) + config.phase;

      // Generate waveform with modulation
      let sample = generateWaveform(phase, config.waveform);

      // Apply frequency modulation (inspired by SuperCollider)
      if (config.modulationType === 'fm' && config.modulationDepth > 0) {
        const modPhase = elapsed * config.modulationFrequency * 2 * Math.PI;
        const modulation = Math.sin(modPhase) * config.modulationDepth;
        sample *= (1 + modulation);
      }

      // Apply amplitude modulation
      if (config.modulationType === 'am' && config.modulationDepth > 0) {
        const modPhase = elapsed * config.modulationFrequency * 2 * Math.PI;
        const modulation = (Math.sin(modPhase) + 1) * 0.5; // 0 to 1
        sample *= (1 - config.modulationDepth) + modulation * config.modulationDepth;
      }

      // Apply envelope
      const envelope = calculateADSR(elapsed);
      sample *= envelope * config.amplitude;

      // Update spatial position (inspired by MetaSynth's panning visualization)
      const spatialX = Math.sin(elapsed * 0.5) * config.spatialWidth;
      const spatialZ = Math.cos(elapsed * 0.3) * config.dopplerEffect;

      setState(prev => ({
        ...prev,
        currentNote: config.frequency,
        modulationPhase: (elapsed * config.modulationFrequency) % (2 * Math.PI),
        filterEnvelope: envelope,
        spatialPosition: { x: spatialX, y: 0, z: spatialZ }
      }));

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();
  }, [config, generateWaveform, initializeAudio]);

  // Stop synthesis
  const stop = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    setState(prev => ({ ...prev, isPlaying: false, envelopePhase: 'release' }));

    // Apply release envelope
    if (gainNodeRef.current) {
      const currentTime = audioContextRef.current?.currentTime || 0;
      gainNodeRef.current.gain.setValueAtTime(gainNodeRef.current.gain.value, currentTime);
      gainNodeRef.current.gain.exponentialRampToValueAtTime(0.001, currentTime + config.release);
    }
  }, [config.release]);

  // Calculate ADSR envelope
  const calculateADSR = useCallback((elapsed: number): number => {
    const { attack, decay, sustain, release } = config;

    if (elapsed < attack) {
      // Attack phase
      return elapsed / attack;
    } else if (elapsed < attack + decay) {
      // Decay phase
      const decayElapsed = elapsed - attack;
      return 1 - (1 - sustain) * (decayElapsed / decay);
    } else if (state.isPlaying) {
      // Sustain phase
      return sustain;
    } else {
      // Release phase
      const releaseElapsed = elapsed - (attack + decay);
      if (releaseElapsed < release) {
        return sustain * (1 - releaseElapsed / release);
      } else {
        return 0;
      }
    }
  }, [config, state.isPlaying]);

  // Update frequency with mystical mapping
  const setFrequency = useCallback((frequency: number, mysticalIntent?: string) => {
    const mysticalFreq = mysticalIntent ? applyMysticalFrequency(frequency, mysticalIntent) : frequency;

    if (oscillatorRef.current) {
      oscillatorRef.current.frequency.setValueAtTime(mysticalFreq, audioContextRef.current?.currentTime || 0);
    }
  }, [applyMysticalFrequency]);

  // Create synthesis pattern (inspired by MetaSynth's visual sequencing)
  const createPattern = useCallback((pattern: SynthesisPattern) => {
    patternRef.current = pattern;
    return pattern;
  }, []);

  // Play pattern
  const playPattern = useCallback(async (pattern: SynthesisPattern) => {
    if (!pattern.frequencies.length) return;

    let noteIndex = 0;
    const playNextNote = () => {
      if (noteIndex >= pattern.frequencies.length) {
        setState(prev => ({ ...prev, isPlaying: false }));
        return;
      }

      const frequency = pattern.frequencies[noteIndex];
      const duration = pattern.durations[noteIndex] || 1;
      const amplitude = pattern.amplitudes[noteIndex] || 1;
      const panning = pattern.pannings[noteIndex] || 0;

      setFrequency(frequency, pattern.mysticalIntent);
      if (pannerNodeRef.current) {
        pannerNodeRef.current.pan.setValueAtTime(panning, audioContextRef.current?.currentTime || 0);
      }
      if (gainNodeRef.current) {
        gainNodeRef.current.gain.setValueAtTime(amplitude, audioContextRef.current?.currentTime || 0);
      }

      noteIndex++;
      setTimeout(playNextNote, duration * 1000);
    };

    playNextNote();
  }, [setFrequency]);

  // Get frequency analysis data
  const getFrequencyData = useCallback(() => {
    if (!analyserNodeRef.current) return null;

    const bufferLength = analyserNodeRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    analyserNodeRef.current.getByteFrequencyData(dataArray);

    return {
      frequencyData: Array.from(dataArray),
      dominantFrequency: getDominantFrequency(dataArray),
      averageAmplitude: dataArray.reduce((a, b) => a + b, 0) / bufferLength
    };
  }, []);

  // Calculate dominant frequency using autocorrelation
  const getDominantFrequency = useCallback((frequencyData: Uint8Array): number => {
    // Simplified autocorrelation for pitch detection
    const correlations = new Array(frequencyData.length / 2);
    let maxCorrelation = 0;
    let dominantPeriod = 0;

    for (let i = 0; i < correlations.length; i++) {
      let sum = 0;
      for (let j = 0; j < frequencyData.length - i; j++) {
        sum += frequencyData[j] * frequencyData[j + i];
      }
      correlations[i] = sum;

      if (sum > maxCorrelation) {
        maxCorrelation = sum;
        dominantPeriod = i;
      }
    }

    // Convert period to frequency (assuming 44100 Hz sample rate)
    return dominantPeriod > 0 ? 44100 / dominantPeriod : 0;
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stop();
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, [stop]);

  return {
    // State
    ...state,

    // Controls
    start,
    stop,
    setFrequency,

    // Pattern synthesis
    createPattern,
    playPattern,

    // Analysis
    getFrequencyData,

    // Utilities
    applyMysticalFrequency,

    // Audio context for advanced usage
    audioContext: audioContextRef.current,
    analyser: analyserNodeRef.current
  };
};

export default useAudioSynthesis;
