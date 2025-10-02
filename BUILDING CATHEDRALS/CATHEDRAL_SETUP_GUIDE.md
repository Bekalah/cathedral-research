# 🏰 Cathedral - Complete Setup & Usage Guide

## 🎯 One-Command Setup

Copy and paste this into your terminal from the `cathedral` directory:

```bash
# Make setup script executable
chmod +x setup-cathedral-workspace.sh

# Run it
./setup-cathedral-workspace.sh
```

**That's it!** The script will:

- ✅ Install all VS Code extensions
- ✅ Configure workspace settings
- ✅ Set up debugging
- ✅ Create keyboard shortcuts
- ✅ Configure Prettier & ESLint

-----

## 📁 File Structure

After setup, you'll have:

```
cathedral/
├── .vscode/
│   ├── settings.json          # Editor configuration
│   ├── extensions.json        # Recommended extensions
│   ├── tasks.json            # Build/deploy tasks
│   ├── launch.json           # Debug configurations
│   └── keybindings.json      # Keyboard shortcuts
│
├── public/
│   ├── index.html            # Main entry
│   ├── tesla-fractal.html    # Tesla generator
│   ├── oscilloscope.html     # Oscilloscope music
│   └── spectral-tool.html    # Aphex Twin style
│
├── src/
│   ├── core/
│   │   ├── audio-to-fractal-pipeline.js
│   │   └── ...
│   ├── services/
│   │   └── azure-client.js
│   └── main.js
│
├── azure-functions/
│   └── audio-analysis/
│       └── index.js
│
├── .prettierrc               # Code formatting
├── .eslintrc.json           # Linting rules
├── cathedral.code-workspace # VS Code workspace
└── setup-cathedral-workspace.sh
```

-----

## ⚡ Quick Start Commands

### Start Development

```bash
# Method 1: Use keyboard shortcut
Ctrl+Shift+B        # Starts dev server

# Method 2: Use command
npm run dev

# Method 3: Use VS Code task
Cmd/Ctrl+Shift+P → "Tasks: Run Task" → "🏰 Start Dev Server"
```

### Start Azure Functions

```bash
# Method 1: Keyboard shortcut
Ctrl+Shift+F        # Starts Azure Functions

# Method 2: Command
cd azure-functions && func start
```

### Deploy Everything

```bash
# Method 1: Keyboard shortcut
Ctrl+Shift+D        # Deploys to GitHub Pages

# Method 2: Command
npm run deploy
```

-----

## 🎨 VS Code Features You Now Have

### 1. **GitHub Copilot** (AI Coding Assistant)

- Press `Tab` to accept suggestions
- Press `Ctrl+Enter` for alternatives
- Ask questions: `Ctrl+Shift+I`

**Example:**

```javascript
// Type this comment and Copilot writes the function:
// create a function that converts audio to fractal parameters
```

### 2. **Live Server** (Instant Preview)

- Right-click any HTML file → "Open with Live Server"
- Auto-refreshes on save
- Runs on `http://localhost:3000`

### 3. **Thunder Client** (API Testing)

- Click Thunder icon in sidebar
- Test Azure Functions without leaving VS Code
- Save requests for later

### 4. **Error Lens** (Inline Errors)

- See errors directly in code (no hovering!)
- Red = error, yellow = warning
- Faster debugging

### 5. **GitLens** (Git Superpowers)

- Hover over any line → see who changed it
- Inline git blame
- Visual file history

-----

## 🎭 Your 3 Fractal Generators

### 1. Tesla Harmonic Generator (`tesla-fractal.html`)

**Use for:** Beautiful mathematical art with Tesla laboratory aesthetic

```bash
# Open in browser
open public/tesla-fractal.html

# Or use Live Server
Right-click → Open with Live Server
```

**Features:**

- 🌀 Mandelbrot, Julia, Burning Ship, Lorenz Attractor
- ⚡ Real-time analog-style dials
- 🎨 Electric blue/brass/copper aesthetic
- 💫 Resonance meter visualization
- 💾 Export as PNG

### 2. Oscilloscope Music Visualizer (`oscilloscope.html`)

**Use for:** Jerobeam Fenderson style XY oscilloscope art

```bash
open public/oscilloscope.html
```

**Features:**

- 🎵 Convert audio to visual shapes
- 📊 XY mode oscilloscope display
- 🌀 Lissajous figures, spirals, hearts
- 🎼 Generate music that draws shapes
- 📼 Load audio files for visualization

**How it works:**

- X-axis = Left audio channel
- Y-axis = Right audio channel
- Creates shapes like Jerobeam's oscilloscope music!

### 3. Spectral Imaging Tool (`spectral-tool.html`)

**Use for:** Aphex Twin "Equation" style hidden images

```bash
open public/spectral-tool.html
```

**Features:**

- 🎵 Audio → Spectrogram
- 🖼️ Image → Sound (MetaSynth style)
- 👁️ Hide images in audio
- 📊 FFT analysis

-----

## 🔗 Connecting Audio → Azure → Fractals

### Full Pipeline Example:

```javascript
import { audioFractalPipeline } from './src/core/audio-to-fractal-pipeline.js';

// 1. Initialize
await audioFractalPipeline.initialize();

// 2. Analyze audio file
const audioFile = /* your file */;
const analysis = await audioFractalPipeline.analyzeAudioFile(audioFile);

// Analysis contains:
// - tarotCard: { name: "Aphex Twin", artist: "The Hanged Man" }
// - fractalSeeds: { mandelbrot: {...}, julia: {...} }
// - realmParameters: { biome: {...}, terrain: {...} }

// 3. Fractal auto-generates!
```

-----

## 🎯 Keyboard Shortcuts

|Shortcut      |Action                 |
|--------------|-----------------------|
|`Ctrl+Shift+B`|🏰 Start Dev Server     |
|`Ctrl+Shift+F`|⚡ Start Azure Functions|
|`Ctrl+Shift+D`|🚀 Deploy to GitHub     |
|`Ctrl+Shift+P`|Open Command Palette   |
|`Ctrl+P`      |Quick File Open        |
|`Ctrl+\`      |Split Editor           |
|`Ctrl+K Z`    |Zen Mode               |

-----

## 🧪 Testing Your Setup

### 1. Test VS Code Extensions

```bash
# Open Command Palette
Cmd/Ctrl+Shift+P

# Type: "GitHub Copilot"
# You should see Copilot commands
```

### 2. Test Live Server

```bash
# Right-click public/tesla-fractal.html
# Click "Open with Live Server"
# Browser should open automatically
```

### 3. Test Azure Connection

```bash
# Start Azure Functions
cd azure-functions
func start

# In new terminal, test
curl http://localhost:7071/api/health
```

### 4. Test Fractal Generators

**Tesla Generator:**

1. Open `tesla-fractal.html`
1. Move the "Harmonic Frequency" dial
1. Click "⚡ ENERGIZE COILS"
1. See beautiful fractal appear!

**Oscilloscope:**

1. Open `oscilloscope.html`
1. Click a shape preset (●, ∞, ★)
1. Click "⚡ GENERATE SOUND"
1. See shape + hear audio!

**Spectral Tool:**

1. Open `spectral-tool.html`
1. Upload an audio file
1. Click "🔬 Analyze & Generate Spectrogram"
1. See frequency visualization!

-----

## 🎨 Customizing Your Setup

### Change Theme

```
Cmd/Ctrl+Shift+P → "Color Theme" → Select theme
```

Installed themes:

- Dracula (dark, vibrant)
- Synthwave '84 (neon, cyberpunk)
- One Dark Pro (balanced)

### Change Font

```
1. Download Fira Code: https://github.com/tonsky/FiraCode
2. Install font
3. Already configured in settings!
```

### Add More Extensions

```bash
# Search in VS Code
Cmd/Ctrl+Shift+X → Search → Install

# Or via command line
code --install-extension <extension-id>
```

-----

## 🔧 Troubleshooting

### Extensions Not Working?

```bash
# Reload VS Code
Cmd/Ctrl+Shift+P → "Reload Window"

# Or reinstall
./setup-cathedral-workspace.sh
```

### Live Server Not Starting?

```
1. Check port 3000 is free
2. Right-click HTML file → "Open with Live Server"
3. Check Output panel for errors
```

### Copilot Not Suggesting?

```
1. Check you're logged in: Copilot icon in bottom right
2. Enable for file type: Settings → search "copilot"
3. Try: Ctrl+Enter to manually trigger
```

### Azure Functions Error?

```bash
# Make sure you're in azure-functions directory
cd azure-functions

# Install dependencies
npm install

# Start
func start
```

### Prettier Not Formatting?

```
1. Check it's set as default formatter:
   Settings → "Default Formatter" → Prettier
2. Check format on save is enabled:
   Settings → "Format On Save" ✓
3. Save any file to test
```

-----

## 📚 Learning Resources

### GitHub Copilot

- Ask it questions: `Ctrl+Shift+I`
- Write comments describing what you want
- Example: `// create a mandelbrot fractal function`

### Live Server

- Auto-refreshes on save
- Works with HTML, CSS, JS
- Mobile testing: access via `http://[your-ip]:3000`

### Thunder Client

- Alternative to Postman
- Test Azure Functions
- Save request collections

### Oscilloscope Music

- [Jerobeam Fenderson's Channel](https://www.youtube.com/user/jerobeamfenderson)
- [OsciStudio Software](https://oscilloscopemusic.com/oscistudio.php)
- [How it works](https://www.youtube.com/watch?v=4gibcRfp4zA)

-----

## 🚀 Next Steps

1. ✅ Setup complete (you just did this!)
1. 🎨 Explore the 3 fractal generators
1. 🎵 Upload audio and see it transform
1. ☁️ Connect to Azure (optional)
1. 🏰 Build your Cathedral game!

-----

## 💡 Pro Tips

1. **Multi-cursor editing**: `Ctrl+Alt+↑/↓`
1. **Duplicate line**: `Shift+Alt+↓`
1. **Delete line**: `Ctrl+Shift+K`
1. **Move line**: `Alt+↑/↓`
1. **Find in files**: `Ctrl+Shift+F`
1. **Go to symbol**: `Ctrl+Shift+O`
1. **Copilot chat**: `Ctrl+Shift+I` then ask anything!

-----

## 🎭 The Vision

**Cathedral transforms:**

1. 🎵 Sound/Music → (via Spectral Analysis)
1. 🎨 Visual Art → (via Fractal Generation)
1. 🌀 Sacred Geometry → (via Mathematical Patterns)
1. 🏰 3D Realms → (via Terrain Generation)
1. 🎴 Tarot Characters → (via Artist Signatures)
1. 📖 Narrative Branches → (via CYOA System)

You now have the tools to build it all! ⚡

-----

**Need help?** Open an issue or ask Copilot Chat: `Ctrl+Shift+I`

Happy coding! 🏰✨