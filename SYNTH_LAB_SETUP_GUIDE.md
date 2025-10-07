# 🎹 Cathedral Synthesis Laboratory Setup Guide

## Converting from npm to pnpm for Professional Audio Development

### Step 1: Install pnpm globally
```bash
npm install -g pnpm@latest
```

### Step 2: Remove old npm dependencies
```bash
rm -rf node_modules package-lock.json
rm -rf packages/*/node_modules packages/*/package-lock.json
```

### Step 3: Install with pnpm
```bash
cd cathedral-research
pnpm install
```

## 🎵 Audio Libraries Integration

Our comprehensive synthesis system includes:

### Core Audio Libraries
- **Tone.js** - Professional Web Audio framework
- **Pizzicato** - Easy-to-use audio library
- **Howler.js** - Audio playback and spatial audio
- **Meyda** - Real-time audio feature extraction
- **Tonal** - Music theory and harmony analysis
- **Teoria** - Music theory utilities
- **WebMIDI** - MIDI input/output support

### Professional Features
- **FM Synthesis** (DEXED-style with 6 operators)
- **Additive Synthesis** (128 partials)
- **Granular Synthesis** (real-time grain manipulation)
- **Spectral Synthesis** (FFT-based processing)
- **Modular Synthesis** (virtual patch cables)
- **Real-time Effects** (reverb, delay, chorus, filters)
- **Professional Export** (24-bit/96kHz WAV, FLAC, stems)

### Liber Arcanae Integration
Each tarot card influences synthesis parameters:
- **The Fool** → Random modulation and chaos
- **The Magician** → Precise harmonic control
- **High Priestess** → Mysterious spectral effects
- **The Empress** → Lush, organic textures
- **The Emperor** → Strong rhythmic structures
- **The Hierophant** → Sacred mathematical ratios

## 🚀 Quick Start Guide

### 1. Initialize the Synthesis Laboratory
```javascript
import { CathedralSynthLab } from '@cathedral/synth-lab-pro'

const synthLab = new CathedralSynthLab()
await synthLab.initialize()
```

### 2. Create a Synthesis Room
```javascript
// FM Laboratory (DEXED-style)
const fmLab = synthLab.createSynthRoom('my-fm-lab', {
  type: 'fm',
  parameters: {
    operators: 6,
    algorithm: 1,
    feedback: 3
  },
  effects: [
    { type: 'reverb', parameters: { wet: 0.3 }, enabled: true },
    { type: 'delay', parameters: { time: 0.25, feedback: 0.4 }, enabled: true }
  ],
  visualization: true,
  arcanaeConnection: 'The Magician'
})
```

### 3. Play Notes and Create Music
```javascript
// Play individual notes
fmLab.playNote('C4', 0.8)
fmLab.playNote('E4', 0.7)
fmLab.playNote('G4', 0.6)

// Generate music from Liber Arcanae
const composition = await synthLab.generateArcanaeMusic([
  'The Fool', 'The Magician', 'High Priestess'
], 60) // 60 seconds
```

### 4. Real-time Performance
```javascript
// Enable performance mode (low latency)
synthLab.startPerformanceMode()

// Keyboard shortcuts automatically work:
// Z-M = Play notes (C-B)
// S,D,G,H,J = Black keys
// R = Start/stop recording
```

### 5. Professional Export
```javascript
// Export high-quality audio
const audioBlob = await synthLab.exportAudio({
  format: 'wav',
  quality: 'professional',
  bitDepth: 24,
  sampleRate: 96000,
  channels: 'stereo'
})

// Download the file
const url = URL.createObjectURL(audioBlob)
const a = document.createElement('a')
a.href = url
a.download = 'cathedral-masterpiece.wav'
a.click()
```

## 🎛️ Synthesis Room Types

### 1. FM Laboratory (DEXED-style)
```javascript
const fmRoom = synthLab.createSynthRoom('fm-lab', {
  type: 'fm',
  parameters: {
    operators: 6,
    algorithms: 32,
    feedback: true,
    envelopes: 'advanced'
  }
})
```

### 2. Granular Workshop
```javascript
const granularRoom = synthLab.createSynthRoom('granular', {
  type: 'granular',
  parameters: {
    grainSize: [10, 1000],
    density: [1, 100],
    position: 'random'
  }
})
```

### 3. Spectral Chamber
```javascript
const spectralRoom = synthLab.createSynthRoom('spectral', {
  type: 'spectral',
  parameters: {
    fftSize: 2048,
    spectralProcessing: ['freeze', 'shift', 'stretch']
  }
})
```

## 🃏 Liber Arcanae Musical Mappings

Each card controls different synthesis aspects:

```javascript
const arcaneMappings = {
  'The Fool': {
    synthesis: 'Random modulation',
    parameters: { chaos: 0.8, unpredictability: 0.9 },
    effects: ['random_delay', 'pitch_shift']
  },
  'The Magician': {
    synthesis: 'Precise harmonic control',
    parameters: { harmonicity: 2.0, precision: 0.95 },
    effects: ['crystal_reverb', 'harmonic_enhancer']
  },
  'High Priestess': {
    synthesis: 'Mysterious spectral processing',
    parameters: { mystery: 0.7, depth: 0.8 },
    effects: ['spectral_freeze', 'ambient_reverb']
  }
}
```

## 📊 Real Dataset Integration

Connect your music to real-world data:

```javascript
// NASA space data sonification
await synthLab.connectToDataset('nasa-astronomy-pictures')

// Weather data musical influence
await synthLab.connectToDataset('real-time-weather')

// Stock market rhythmic patterns
await synthLab.connectToDataset('financial-markets')

// Earthquake seismic data
await synthLab.connectToDataset('usgs-earthquakes')
```

## 🎪 Performance Features

### MIDI Support
- Automatic MIDI device detection
- Real-time note input
- MIDI learn for parameter control
- SysEx support for preset sharing

### Keyboard Shortcuts
- **Z-M** → Piano keys (C-B)
- **S,D,G,H,J** → Black keys (sharps/flats)
- **Q-I** → Upper octave
- **1-8** → Switch synthesis rooms
- **R** → Record/stop
- **Space** → Sustain pedal

### Professional Recording
- 24-bit/96kHz recording
- Real-time effects processing
- Stem separation
- MIDI export
- Automatic gain staging

## 🔧 Development Scripts

```bash
# Start development server
pnpm run dev

# Build synthesis laboratory
pnpm run build

# Run tests
pnpm test

# Demo the synthesis rooms
pnpm run demo

# Export professional audio
pnpm run export:professional
```

## 🎨 Visual Integration

The synthesis laboratory includes:
- Real-time FFT visualization
- Waveform displays
- Parameter automation curves
- 3D spatial audio positioning
- P5.js integration for generative visuals
- Sacred geometry pattern generation

## 📱 Mobile Support

Optimized for touch interfaces:
- Touch-responsive piano keyboard
- Gesture-based parameter control
- Mobile-optimized effects
- Responsive design for all devices

## 🔊 Audio Export Formats

Professional quality exports:
- **WAV** (24-bit/96kHz) - Mastering quality
- **FLAC** (Lossless) - Archival quality
- **MP3** (320kbps) - Distribution ready
- **Stems** - Individual tracks for mixing
- **MIDI** - Note data for DAW import
- **SysEx** - Preset sharing

## 🚀 Getting Started Commands

```bash
# Clone and setup
git clone https://github.com/Bekalah/cathedral-research.git
cd cathedral-research

# Install with pnpm
pnpm install

# Start synthesis laboratory
pnpm run dev:synth-lab

# Open demo
open http://localhost:3001/demo/

# Create your first synthesis
pnpm run synth:rooms
```

## 🎵 Example Compositions

### Three-Card Tarot Reading Music
```javascript
const cards = ['The Fool', 'The Magician', 'High Priestess']
const music = await synthLab.generateArcanaeMusic(cards, 180) // 3 minutes
```

### Dataset Sonification
```javascript
// Sonify NASA data with FM synthesis
const nasaComposition = await synthLab.sonifyDataset('nasa-exoplanets', {
  synthRoom: 'fm-lab',
  duration: 300, // 5 minutes
  mapping: 'planetary-orbits-to-harmonics'
})
```

### Live Performance Setup
```javascript
// Set up for live performance
synthLab.startPerformanceMode()
synthLab.enableMIDILearn()
synthLab.setupKeyboardShortcuts()
synthLab.activateRealTimeEffects()
```

---

## 🏛️ Cathedral Universe Integration

This synthesis laboratory is part of the larger Cathedral Universe ecosystem:
- **Liber Arcanae** - Tarot-driven parameter control
- **P5.js Codex Engine** - Visual synthesis feedback  
- **Sacred Geometry** - Mathematical harmony systems
- **Dataset Connectors** - Real-world data sonification
- **Professional Export** - Industry-standard audio output

Create real art with real synthesis libraries! 🎨🎵✨