# 🧱 LEGO Build Studio

A revolutionary 3D archetype and symbol building studio designed for professional creatives who think in open world ways. This LEGO-style construction environment allows you to build complex 3D arrangements of archetypes and symbols using sacred geometry as the foundation.

## ✨ Features

### Core Functionality
- **3D Archetype Building**: Drag and drop tarot/mystical archetypes into 3D space
- **Sacred Geometry Blocks**: Use Platonic solids, Metatron's Cube, Sri Yantra, and Flower of Life patterns
- **LEGO-style Connections**: Connect blocks with energy flow visualization
- **Real-time Manifestation**: Watch energy levels and manifestation states update in real-time
- **Professional Creative Tools**: Designed for artists, designers, and creative professionals

### Visual Features
- **Element-based Coloring**: Fire (red), Water (blue), Air (yellow), Earth (green)
- **Energy Flow Visualization**: Dynamic connections between blocks show energy transfer
- **Sacred Geometry Rendering**: Beautiful 3D representations of mystical patterns
- **Real-time Animation**: Blocks rotate and pulse based on their energy states

### Integration
- **Cathedral Ecosystem**: Seamlessly integrates with the broader mystical computing environment
- **Archetype System**: Uses the existing LiveArchetypeInterface for consistent data models
- **Three.js Engine**: Built on the powerful @cathedral/three-engine for optimal performance

## 🚀 Quick Start

### Development
```bash
cd packages/lego-build-studio
npm install
npm run dev
```

The studio will be available at `http://localhost:3006`

### Integration with Other Apps
The LEGO Build Studio is registered in the Cathedral ecosystem and can be accessed through:
- **Cathedral Hub**: Main navigation portal
- **Stone Grimoire**: Mystical creation environment
- **Direct Access**: `https://bekalah.github.io/cathedral-research/lego-studio`

## 🎯 Use Cases

### For Professional Creatives
- **Conceptual Development**: Build 3D mind maps of creative projects
- **Symbol Exploration**: Experiment with archetypal combinations
- **Visual Storytelling**: Create spatial narratives with symbols
- **Design Thinking**: Prototype ideas in 3D space

### For Open World Thinkers
- **Holistic Planning**: See connections between different project elements
- **Systems Thinking**: Visualize complex relationships between components
- **Creative Flow**: Natural, intuitive building experience
- **Inspiration Engine**: Discover new combinations through play

### For RPG and Game Design
- **World Building**: Construct game worlds with archetypal elements
- **Character Development**: Map character archetypes in 3D space
- **Story Architecture**: Build narrative structures visually
- **Game Mechanics**: Prototype game systems with symbolic blocks

## 🏗️ Architecture

### Core Components
- **LegoBuildEngine**: Main 3D engine managing scene, blocks, and connections
- **LegoBuildStudio**: React component providing the user interface
- **ArchetypeTypes**: TypeScript definitions for archetype data structures
- **SacredGeometryEngine**: Integration with mystical geometry calculations

### Block Types
- **Cube**: Basic building block (default)
- **Octahedron**: 8-sided sacred geometry
- **Tetrahedron**: 4-sided platonic solid
- **Icosahedron**: 20-sided complex geometry
- **Dodecahedron**: 12-sided golden ratio geometry

### Connection System
- **6-Point Connection**: Each block has connection points on all sides
- **Energy Flow**: Connected blocks exchange energy based on their states
- **Visual Links**: Dynamic lines show active connections
- **Distance Validation**: Blocks must be close enough to connect

## 🎨 User Interface

### Left Panel - Archetype Palette
- **Archetype Selection**: Choose from available mystical archetypes
- **Element Indicators**: Visual cues for fire, water, air, earth elements
- **Energy Meters**: Real-time display of archetype energy levels
- **Status Indicators**: Active/inactive state visualization

### Main Canvas - 3D Building Area
- **Grid System**: Visual grid for precise placement
- **Camera Controls**: Orbit around your creations
- **Block Manipulation**: Click to place, drag to position
- **Connection Mode**: Visual feedback for linking blocks

### Overlay Information
- **Block Counter**: Track number of active blocks
- **Connection Status**: Current building mode indicators
- **Energy Overview**: System-wide energy statistics

## 🔧 Technical Details

### Dependencies
- **React 18**: Modern React with hooks and concurrent features
- **Three.js**: 3D graphics rendering engine
- **TypeScript**: Type-safe development
- **@cathedral/three-engine**: Sacred geometry calculations
- **@cathedral/tarot-engine**: Archetype data and logic

### Performance
- **Optimized Rendering**: Efficient WebGL rendering pipeline
- **Memory Management**: Proper cleanup of 3D resources
- **Responsive Design**: Adapts to different screen sizes
- **Real-time Updates**: 60fps animation loop

### Browser Support
- **Modern Browsers**: Chrome, Firefox, Safari, Edge
- **WebGL Required**: Hardware-accelerated 3D graphics
- **Mobile Ready**: Responsive design for tablets and mobile devices

## 🎭 Integration Examples

### With Stone Grimoire
```typescript
import { LegoBuildStudio } from '@cathedral/lego-build-studio'

// Use archetypes from Stone Grimoire
const grimoireArchetypes = await getArchetypesFromGrimoire()

<LegoBuildStudio
  archetypes={grimoireArchetypes}
  onBlockSelect={(block) => console.log('Selected:', block.archetype.name)}
  onConnection={(block1, block2) => handleArchetypeConnection(block1, block2)}
/>
```

### With Cathedral of Circuits
```typescript
// Export 3D model for circuit visualization
const modelData = legoBuildEngine.exportModel()
circuitVisualizer.importSacredGeometry(modelData)
```

## 🌟 Advanced Features

### Energy System
- **Dynamic Energy Flow**: Energy transfers between connected blocks
- **Manifestation Levels**: Blocks become more or less transparent based on energy
- **Elemental Reactions**: Different elements interact in unique ways
- **Balance Mechanics**: System seeks energetic equilibrium

### Sacred Geometry
- **Platonic Solids**: All five perfect 3D shapes available
- **Golden Ratio**: Dodecahedron uses phi proportions
- **Metatron's Cube**: Complex overlapping geometry patterns
- **Sri Yantra**: Multi-layered triangular energy patterns

### Professional Tools
- **Export Functionality**: Save creations for later use
- **Import/Export**: Share builds with other users
- **Screenshot Capture**: Export images of your creations
- **Animation Recording**: Record energy flow sequences

## 📚 Documentation

- **[User Guide](./docs/user-guide.md)**: Complete usage instructions
- **[API Reference](./docs/api.md)**: Technical documentation
- **[Integration Guide](./docs/integration.md)**: Connect with other Cathedral apps
- **[Sacred Geometry](./docs/sacred-geometry.md)**: Mathematical and mystical background

## 🤝 Contributing

We welcome contributions from the creative coding community! Areas where help is appreciated:

- **Block Types**: New sacred geometry shapes
- **Connection Mechanics**: Enhanced energy flow algorithms
- **UI/UX**: Improved user interface design
- **Performance**: Optimization for large builds
- **Integration**: Better connections with other apps

## 📄 License

MIT License - see LICENSE file for details.

## 🙏 Acknowledgments

- **Sacred Geometry Community**: For mathematical and spiritual guidance
- **Three.js Team**: For the incredible 3D rendering engine
- **Cathedral Research**: For the broader mystical computing ecosystem
- **Creative Professionals**: For inspiration and feedback

---

*"In the space between thoughts, we find the geometry of the soul."* 🧱✨
