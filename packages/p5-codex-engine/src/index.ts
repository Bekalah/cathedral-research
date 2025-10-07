/**
 * 🎨 P5.js Codex Engine - Modular Generative Art System
 * 
 * Integrates p5.js with Codex 144:99 sacred mathematics
 * Connects to real datasets for professional art and game tools
 * Fully modular architecture for Liber Arcanae integration
 */

import * as p5 from 'p5'
import chroma from 'chroma-js'

export interface CodexNode {
  id: number
  frequency: number
  geometry: string
  crystal: string
  guardian: string
  coordinates: { x: number; y: number; z?: number }
  fusion_kink: { enabled: boolean; resonance?: number }
}

export interface ArcanaeData {
  name: string
  element: string
  colors: string[]
  symbols: string[]
  geometry: string
  frequency_range: [number, number]
}

export interface DatasetConnection {
  source: string
  type: 'nasa' | 'weather' | 'music' | 'art' | 'scientific'
  endpoint?: string
  live?: boolean
}

/**
 * Modular P5.js Art Generator following 144:99 Codex principles
 */
export class P5CodexEngine {
  private p5Instance: p5 | null = null
  private codexNodes: CodexNode[] = []
  private arcanaeData: Map<string, ArcanaeData> = new Map()
  private datasetConnections: Map<string, DatasetConnection> = new Map()
  private sacredGeometry: any = {}
  
  constructor(containerId?: string) {
    this.initializeSacredGeometry()
    this.initializeArcanaeData()
    this.initializeDatasetConnections()
    
    if (containerId) {
      this.mount(containerId)
    }
  }

  /**
   * Mount p5.js sketch to DOM element
   */
  mount(containerId: string): void {
    const container = document.getElementById(containerId)
    if (!container) {
      console.warn(`Container ${containerId} not found`)
      return
    }

    const sketch = (p: p5) => {
      p.setup = () => this.setup(p)
      p.draw = () => this.draw(p)
      p.mousePressed = () => this.mousePressed(p)
      p.keyPressed = () => this.keyPressed(p)
    }

    this.p5Instance = new p5(sketch, container)
  }

  /**
   * Initialize with Codex 144:99 sacred geometry patterns
   */
  private initializeSacredGeometry(): void {
    this.sacredGeometry = {
      goldenRatio: 1.618033988749895,
      fibonacci: [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144],
      vesicaPiscis: { ratio: Math.sqrt(3) / 2 },
      platonic: {
        tetrahedron: { vertices: 4, edges: 6, faces: 4 },
        hexahedron: { vertices: 8, edges: 12, faces: 6 },
        octahedron: { vertices: 6, edges: 12, faces: 8 },
        dodecahedron: { vertices: 20, edges: 30, faces: 12 },
        icosahedron: { vertices: 12, edges: 30, faces: 20 }
      }
    }
  }

  /**
   * Initialize Liber Arcanae modular data
   */
  private initializeArcanaeData(): void {
    // Major Arcana with modular properties
    const majorArcana = [
      {
        name: 'The Fool',
        element: 'air',
        colors: ['#FFE4B5', '#F0E68C', '#DDA0DD'],
        symbols: ['infinity', 'spiral', 'void'],
        geometry: 'point',
        frequency_range: [174, 285] as [number, number]
      },
      {
        name: 'The Magician',
        element: 'mercury',
        colors: ['#FF6347', '#FFD700', '#8A2BE2'],
        symbols: ['vesica_piscis', 'octagram', 'caduceus'],
        geometry: 'line',
        frequency_range: [285, 396] as [number, number]
      },
      {
        name: 'High Priestess',
        element: 'water',
        colors: ['#4169E1', '#8FBC8F', '#DDA0DD'],
        symbols: ['crescent', 'pillars', 'veil'],
        geometry: 'triangle',
        frequency_range: [396, 417] as [number, number]
      }
      // Add all 22 Major Arcana...
    ]

    majorArcana.forEach(arcana => {
      this.arcanaeData.set(arcana.name, arcana)
    })
  }

  /**
   * Initialize real dataset connections for professional tools
   */
  private initializeDatasetConnections(): void {
    this.datasetConnections.set('nasa-imagery', {
      source: 'NASA Image and Video Library',
      type: 'nasa',
      endpoint: 'https://images-api.nasa.gov/search',
      live: true
    })
    
    this.datasetConnections.set('weather-patterns', {
      source: 'OpenWeather API',
      type: 'weather',
      endpoint: 'https://api.openweathermap.org/data/2.5',
      live: true
    })
    
    this.datasetConnections.set('music-theory', {
      source: 'FreeMusicAPI',
      type: 'music',
      endpoint: 'https://freemusicapi.com',
      live: false
    })

    this.datasetConnections.set('art-collections', {
      source: 'Metropolitan Museum API',
      type: 'art',
      endpoint: 'https://collectionapi.metmuseum.org/public/collection/v1',
      live: true
    })
  }

  /**
   * P5.js setup function with Codex 144:99 initialization
   */
  private setup(p: p5): void {
    const canvas = p.createCanvas(800, 600, p.WEBGL)
    canvas.parent('p5-container')
    
    p.colorMode(p.HSB, 360, 100, 100, 100)
    p.background(0, 0, 10)
    
    // Initialize 144 sacred nodes in golden ratio spiral
    this.generateCodexNodes(p)
    
    console.log('🎨 P5 Codex Engine initialized with 144:99 sacred mathematics')
  }

  /**
   * Generate 144 sacred nodes in geometric patterns
   */
  private generateCodexNodes(p: p5): void {
    this.codexNodes = []
    
    for (let i = 0; i < 144; i++) {
      const angle = i * this.sacredGeometry.goldenRatio * Math.PI * 2
      const radius = Math.sqrt(i) * 20
      
      const node: CodexNode = {
        id: i + 1,
        frequency: 174 + (i * 3.14159), // Hz progression
        geometry: this.getGeometryType(i),
        crystal: this.getCrystalType(i),
        guardian: this.getGuardianType(i),
        coordinates: {
          x: Math.cos(angle) * radius,
          y: Math.sin(angle) * radius,
          z: Math.sin(i * 0.1) * 50
        },
        fusion_kink: {
          enabled: true,
          resonance: (i % 99) / 99
        }
      }
      
      this.codexNodes.push(node)
    }
  }

  /**
   * Main drawing loop with sacred geometry visualization
   */
  private draw(p: p5): void {
    p.background(0, 0, 10, 20) // Trailing effect
    
    p.push()
    p.translate(0, 0, -200)
    p.rotateY(p.frameCount * 0.01)
    p.rotateX(p.frameCount * 0.005)
    
    // Draw Codex nodes with dynamic colors and connections
    this.drawCodexNodes(p)
    this.drawSacredConnections(p)
    this.drawFibonacciSpiral(p)
    
    p.pop()
    
    // Draw UI overlay
    this.drawCodexInterface(p)
  }

  /**
   * Draw the 144 Codex nodes with Arcanae colors
   */
  private drawCodexNodes(p: p5): void {
    this.codexNodes.forEach((node, index) => {
      p.push()
      
      // Position node
      p.translate(node.coordinates.x, node.coordinates.y, node.coordinates.z || 0)
      
      // Dynamic color based on frequency and time
      const hue = (node.frequency + p.frameCount) % 360
      const saturation = 70 + Math.sin(p.frameCount * 0.01 + index) * 30
      const brightness = 80 + Math.cos(p.frameCount * 0.02 + index) * 20
      
      p.fill(hue, saturation, brightness, 70)
      p.noStroke()
      
      // Draw geometry based on node type
      const size = 5 + node.fusion_kink.resonance! * 10
      
      switch (node.geometry) {
        case 'tetrahedron':
          this.drawTetrahedron(p, size)
          break
        case 'octahedron':
          this.drawOctahedron(p, size)
          break
        case 'icosahedron':
          this.drawIcosahedron(p, size)
          break
        default:
          p.sphere(size)
      }
      
      p.pop()
    })
  }

  /**
   * Draw sacred connections between nodes
   */
  private drawSacredConnections(p: p5): void {
    p.stroke(200, 50, 80, 30)
    p.strokeWeight(1)
    
    // Connect nodes following golden ratio relationships
    for (let i = 0; i < this.codexNodes.length - 8; i++) {
      const node1 = this.codexNodes[i]
      const node2 = this.codexNodes[i + 8] // Fibonacci connection
      
      if (node1 && node2) {
        p.line(
          node1.coordinates.x, node1.coordinates.y, node1.coordinates.z || 0,
          node2.coordinates.x, node2.coordinates.y, node2.coordinates.z || 0
        )
      }
    }
  }

  /**
   * Draw Fibonacci spiral overlay
   */
  private drawFibonacciSpiral(p: p5): void {
    p.push()
    p.rotateZ(p.frameCount * 0.001)
    p.noFill()
    p.stroke(45, 80, 90, 50)
    p.strokeWeight(2)
    
    p.beginShape()
    for (let i = 0; i < 300; i++) {
      const angle = i * 0.2
      const radius = i * 2
      p.vertex(
        Math.cos(angle) * radius,
        Math.sin(angle) * radius
      )
    }
    p.endShape()
    
    p.pop()
  }

  /**
   * Draw real-time Codex interface with dataset integration
   */
  private drawCodexInterface(p: p5): void {
    // Return to 2D for UI
    p.camera()
    
    // Show active node information
    const activeNode = this.codexNodes[p.frameCount % 144]
    if (activeNode) {
      p.fill(0, 0, 100, 90)
      p.textAlign(p.LEFT)
      p.textSize(14)
      p.text(`Node ${activeNode.id}: ${activeNode.crystal}`, 20, 30)
      p.text(`Frequency: ${activeNode.frequency.toFixed(2)} Hz`, 20, 50)
      p.text(`Geometry: ${activeNode.geometry}`, 20, 70)
      p.text(`Guardian: ${activeNode.guardian}`, 20, 90)
    }
  }

  /**
   * Geometry generators for sacred shapes
   */
  private drawTetrahedron(p: p5, size: number): void {
    // Implementation for tetrahedron
    p.beginShape(p.TRIANGLES)
    // Add vertices...
    p.endShape()
  }

  private drawOctahedron(p: p5, size: number): void {
    // Implementation for octahedron
    p.beginShape(p.TRIANGLES)
    // Add vertices...
    p.endShape()
  }

  private drawIcosahedron(p: p5, size: number): void {
    // Implementation for icosahedron
    p.beginShape(p.TRIANGLES)
    // Add vertices...
    p.endShape()
  }

  /**
   * Interactive controls
   */
  private mousePressed(p: p5): void {
    // Cycle through Arcanae visualizations
    const arcanaeNames = Array.from(this.arcanaeData.keys())
    const randomArcana = arcanaeNames[Math.floor(Math.random() * arcanaeNames.length)]
    this.activateArcanaeMode(randomArcana)
  }

  private keyPressed(p: p5): void {
    if (p.key === 's' || p.key === 'S') {
      // Save current state as high-res art
      p.save('codex-144-99-art-' + Date.now() + '.png')
    }
  }

  /**
   * Dataset integration methods
   */
  async connectToDataset(datasetKey: string, query?: string): Promise<any> {
    const connection = this.datasetConnections.get(datasetKey)
    if (!connection || !connection.live) {
      console.warn(`Dataset ${datasetKey} not available or not live`)
      return null
    }

    try {
      let url = connection.endpoint
      if (query) {
        url += `?q=${encodeURIComponent(query)}`
      }

      const response = await fetch(url)
      const data = await response.json()
      
      console.log(`📡 Connected to ${connection.source}:`, data)
      return data
    } catch (error) {
      console.error(`Failed to connect to ${datasetKey}:`, error)
      return null
    }
  }

  /**
   * Activate specific Arcanae visualization mode
   */
  activateArcanaeMode(arcanaName: string): void {
    const arcana = this.arcanaeData.get(arcanaName)
    if (!arcana) {
      console.warn(`Arcana ${arcanaName} not found`)
      return
    }

    console.log(`🃏 Activating ${arcanaName} mode with colors:`, arcana.colors)
    
    // Update visualization parameters based on arcana
    this.codexNodes.forEach((node, i) => {
      if (i % 22 === 0) { // Every 22nd node (Major Arcana cycle)
        node.frequency = arcana.frequency_range[0] + 
          (arcana.frequency_range[1] - arcana.frequency_range[0]) * (i / 144)
      }
    })
  }

  /**
   * Export current state for game/art tools
   */
  exportForGameEngine(): any {
    return {
      timestamp: Date.now(),
      codex_version: '144:99',
      nodes: this.codexNodes.map(node => ({
        id: node.id,
        position: node.coordinates,
        frequency: node.frequency,
        type: node.geometry,
        resonance: node.fusion_kink.resonance
      })),
      sacred_geometry: this.sacredGeometry,
      active_datasets: Array.from(this.datasetConnections.keys())
    }
  }

  /**
   * Utility methods for node classification
   */
  private getGeometryType(index: number): string {
    const types = ['tetrahedron', 'hexahedron', 'octahedron', 'dodecahedron', 'icosahedron']
    return types[index % types.length]
  }

  private getCrystalType(index: number): string {
    const crystals = ['Amethyst', 'Clear Quartz', 'Rose Quartz', 'Citrine', 'Black Tourmaline', 
                     'Selenite', 'Labradorite', 'Moldavite', 'Herkimer Diamond']
    return crystals[index % crystals.length]
  }

  private getGuardianType(index: number): string {
    const guardians = ['Seraph', 'Cherub', 'Throne', 'Dominion', 'Virtue', 'Power', 
                      'Principality', 'Archangel', 'Angel']
    return guardians[index % guardians.length]
  }

  /**
   * Cleanup
   */
  destroy(): void {
    if (this.p5Instance) {
      this.p5Instance.remove()
      this.p5Instance = null
    }
  }
}

// React component wrapper for easy integration
export interface P5CodexComponentProps {
  containerId?: string
  width?: number
  height?: number
  arcanaeMode?: string
  datasetConnections?: string[]
}

export { P5CodexEngine as default }