# Cathedral Tools Hub

Welcome to the Cathedral visualization and analysis tools collection. These tools integrate with your existing Cathedral ecosystem for complete audio-visual synthesis.

## Available Tools

### 🌀 [Fractal Biomorphology](./fractal-biomorphology.html)
**Natural pattern generation with mathematical precision**

- **Algorithms:** Mandelbrot, Julia Set, Burning Ship, Newton Fractals
- **Interactive Controls:** Real-time parameter adjustment with elegant sliders
- **Color Palettes:** Organic color schemes inspired by nature
- **Presets:** Seahorse, Spiral, Dendrite, Elephant formations
- **Export:** High-resolution PNG export capability

**Use Cases:**
- Generate fractal art for Cathedral visualizations
- Explore mathematical beauty in natural forms
- Create unique textures for digital art projects
- Study chaos theory and mathematical patterns

---

### 🎵 [Spectral Resonance](./spectral-resonance.html)
**Audio-visual transformation and hidden image encoding**

**Audio → Visual Mode:**
- Convert audio files to spectrograms
- Real-time microphone analysis
- Configurable FFT resolution (1024-4096)
- Linear and logarithmic frequency scales

**Image → Sound Mode:**
- MetaSynth-style image sonification
- Convert visual patterns to audio
- Configurable duration and frequency mapping

**Hidden Signature Mode:**
- Aphex Twin "Equation" style encoding
- Hide images in audio spectrograms
- Frequency band selection for encoding
- Reveal hidden images from audio analysis

**Use Cases:**
- Analyze audio frequency content
- Create visual representations of sound
- Hide messages in audio tracks
- Explore the relationship between sound and image

---

## Integration with Cathedral Ecosystem

### Audio Engine Connection
Both tools integrate with your existing Cathedral audio synthesis system:

```javascript
// Example integration with Cathedral audio engine
import { CathedralAudioEngine } from '../src/audio/cathedral-engine.js';

const audioEngine = new CathedralAudioEngine();
const spectralTool = new SpectralResonance();

// Connect fractal generation to audio analysis
audioEngine.onFrequencyAnalysis((data) => {
    spectralTool.visualizeFrequencyData(data);
});
```

### Azure Functions Backend
Tools can send analysis data to your Azure Functions for:
- Advanced audio processing
- AI-driven pattern recognition
- Cloud storage of generated art
- Cross-session state persistence

### Tarot Character System
Fractal parameters can be driven by your 72 Angels system:
- Each angel generates unique fractal parameters
- Color palettes match archetypal energy signatures
- Mathematical constants derived from sacred numerology

## Next Steps

1. **Explore the tools** - Click the links above to start creating
2. **Connect to your main Cathedral** - Import generated art into your main platform
3. **Develop custom presets** - Create signature fractal patterns for your characters
4. **Build audio pipelines** - Connect spectral analysis to fractal generation

## Technical Notes

- All tools are pure client-side HTML/JavaScript
- No external dependencies required
- Compatible with your existing VS Code Live Server setup
- Optimized for both desktop and mobile browsers
- Supports high-resolution displays with proper pixel ratio scaling

---

*Part of the Cathedral of Circuits - Digital Alchemy & Sacred Mathematics*