import * as THREE from 'three'
import { SacredGeometryEngine, Vector3D } from '@cathedral/three-engine'
import { LiveArchetype } from '../types/ArchetypeTypes'

/**
 * 3D Position for LEGO blocks
 */
export interface BlockPosition {
  x: number
  y: number
  z: number
}

/**
 * Connection point between blocks
 */
export interface ConnectionPoint {
  position: BlockPosition
  archetypeId: string
  energy: number
  isConnected: boolean
}

/**
 * LEGO-style archetype block
 */
export interface LegoArchetypeBlock {
  id: string
  archetype: LiveArchetype
  position: BlockPosition
  rotation: BlockPosition
  scale: number
  geometry: 'cube' | 'octahedron' | 'tetrahedron' | 'icosahedron' | 'dodecahedron'
  connections: ConnectionPoint[]
  energyFlow: number
  manifestationLevel: number
  threeObject?: THREE.Group
}

/**
 * Main LEGO Build Engine
 */
export class LegoBuildEngine {
  private scene: THREE.Scene
  private camera: THREE.PerspectiveCamera
  private renderer: THREE.WebGLRenderer
  private blocks: Map<string, LegoArchetypeBlock> = new Map()
  private connectionLines: Map<string, THREE.Line> = new Map()
  private animationId?: number
  private gridSize = 2
  private maxDistance = 3

  constructor(canvas: HTMLCanvasElement) {
    this.scene = new THREE.Scene()
    this.scene.background = new THREE.Color(0x000011)

    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    this.camera.position.set(10, 10, 10)
    this.camera.lookAt(0, 0, 0)

    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true })
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.shadowMap.enabled = true
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap

    this.setupLighting()
    this.setupGrid()
    this.animate()

    window.addEventListener('resize', this.onWindowResize.bind(this))
  }

  /**
   * Set up scene lighting
   */
  private setupLighting(): void {
    // Ambient light
    const ambientLight = new THREE.AmbientLight(0x404040, 0.4)
    this.scene.add(ambientLight)

    // Main directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
    directionalLight.position.set(10, 10, 5)
    directionalLight.castShadow = true
    directionalLight.shadow.mapSize.width = 2048
    directionalLight.shadow.mapSize.height = 2048
    this.scene.add(directionalLight)

    // Point lights for energy effects
    const pointLight1 = new THREE.PointLight(0xff0040, 0.5, 50)
    pointLight1.position.set(-10, 10, 10)
    this.scene.add(pointLight1)

    const pointLight2 = new THREE.PointLight(0x0040ff, 0.5, 50)
    pointLight2.position.set(10, -10, -10)
    this.scene.add(pointLight2)
  }

  /**
   * Set up grid helper
   */
  private setupGrid(): void {
    const gridHelper = new THREE.GridHelper(50, 25, 0x444444, 0x222222)
    this.scene.add(gridHelper)

    // Add axes helper
    const axesHelper = new THREE.AxesHelper(5)
    this.scene.add(axesHelper)
  }

  /**
   * Add archetype block to scene
   */
  addArchetypeBlock(archetype: LiveArchetype, position: BlockPosition, geometry: LegoArchetypeBlock['geometry'] = 'cube'): LegoArchetypeBlock {
    const blockId = `block_${archetype.id}_${Date.now()}`
    const block: LegoArchetypeBlock = {
      id: blockId,
      archetype,
      position,
      rotation: { x: 0, y: 0, z: 0 },
      scale: 1,
      geometry,
      connections: [],
      energyFlow: archetype.energy,
      manifestationLevel: archetype.manifestationLevel,
      threeObject: undefined
    }

    this.createBlockGeometry(block)
    this.blocks.set(blockId, block)

    return block
  }

  /**
   * Create 3D geometry for block
   */
  private createBlockGeometry(block: LegoArchetypeBlock): void {
    const group = new THREE.Group()

    // Get vertices based on geometry type
    const vertices = SacredGeometryEngine.generatePlatonicVertices(block.geometry, 1.5)

    // Create main geometry based on archetype element
    let geometry: THREE.BufferGeometry
    const material = this.getArchetypeMaterial(block.archetype)

    switch (block.geometry) {
      case 'cube':
        geometry = new THREE.BoxGeometry(2, 2, 2)
        break
      case 'octahedron':
        geometry = new THREE.OctahedronGeometry(1.5)
        break
      case 'tetrahedron':
        geometry = new THREE.TetrahedronGeometry(1.5)
        break
      case 'icosahedron':
        geometry = new THREE.IcosahedronGeometry(1.5)
        break
      case 'dodecahedron':
        geometry = new THREE.DodecahedronGeometry(1.5)
        break
      default:
        geometry = new THREE.BoxGeometry(2, 2, 2)
    }

    const mesh = new THREE.Mesh(geometry, material)
    mesh.castShadow = true
    mesh.receiveShadow = true
    group.add(mesh)

    // Add energy glow effect
    if (block.archetype.isActive) {
      const glowGeometry = geometry.clone()
      const glowMaterial = new THREE.MeshBasicMaterial({
        color: this.getElementColor(block.archetype.element),
        transparent: true,
        opacity: 0.3
      })
      const glowMesh = new THREE.Mesh(glowGeometry, glowMaterial)
      glowMesh.scale.multiplyScalar(1.2)
      group.add(glowMesh)
    }

    // Add connection points
    this.addConnectionPoints(group, block)

    // Position the block
    group.position.set(block.position.x, block.position.y, block.position.z)
    group.rotation.set(
      block.rotation.x * Math.PI / 180,
      block.rotation.y * Math.PI / 180,
      block.rotation.z * Math.PI / 180
    )

    this.scene.add(group)
    block.threeObject = group
  }

  /**
   * Get material based on archetype element
   */
  private getArchetypeMaterial(archetype: LiveArchetype): THREE.Material {
    const baseColor = this.getElementColor(archetype.element)
    const emissiveColor = archetype.isActive ? baseColor : 0x000000

    return new THREE.MeshPhongMaterial({
      color: baseColor,
      emissive: emissiveColor,
      emissiveIntensity: archetype.isActive ? 0.2 : 0,
      shininess: 100,
      transparent: true,
      opacity: 0.8 + (archetype.manifestationLevel * 0.2)
    })
  }

  /**
   * Get color based on element
   */
  private getElementColor(element: string): number {
    switch (element) {
      case 'fire': return 0xff4444
      case 'water': return 0x4444ff
      case 'air': return 0xffff44
      case 'earth': return 0x44ff44
      default: return 0xff44ff
    }
  }

  /**
   * Add connection points to block
   */
  private addConnectionPoints(group: THREE.Group, block: LegoArchetypeBlock): void {
    const connectionPositions = [
      { x: 1, y: 0, z: 0 },   // Right
      { x: -1, y: 0, z: 0 },  // Left
      { x: 0, y: 1, z: 0 },   // Top
      { x: 0, y: -1, z: 0 },  // Bottom
      { x: 0, y: 0, z: 1 },   // Front
      { x: 0, y: 0, z: -1 }   // Back
    ]

    connectionPositions.forEach((pos, index) => {
      const connectionPoint: ConnectionPoint = {
        position: {
          x: block.position.x + pos.x,
          y: block.position.y + pos.y,
          z: block.position.z + pos.z
        },
        archetypeId: block.archetype.id,
        energy: block.archetype.energy,
        isConnected: false
      }

      block.connections.push(connectionPoint)

      // Visual connection point
      const pointGeometry = new THREE.SphereGeometry(0.1)
      const pointMaterial = new THREE.MeshBasicMaterial({
        color: this.getElementColor(block.archetype.element),
        transparent: true,
        opacity: 0.6
      })
      const pointMesh = new THREE.Mesh(pointGeometry, pointMaterial)
      pointMesh.position.set(pos.x, pos.y, pos.z)
      group.add(pointMesh)
    })
  }

  /**
   * Connect two blocks
   */
  connectBlocks(blockId1: string, blockId2: string, connectionIndex1: number, connectionIndex2: number): boolean {
    const block1 = this.blocks.get(blockId1)
    const block2 = this.blocks.get(blockId2)

    if (!block1 || !block2) return false

    const connection1 = block1.connections[connectionIndex1]
    const connection2 = block2.connections[connectionIndex2]

    if (!connection1 || !connection2) return false

    // Check if blocks are close enough to connect
    const distance = Math.sqrt(
      Math.pow(connection1.position.x - connection2.position.x, 2) +
      Math.pow(connection1.position.y - connection2.position.y, 2) +
      Math.pow(connection1.position.z - connection2.position.z, 2)
    )

    if (distance > this.maxDistance) return false

    // Create connection line
    const connectionId = `${blockId1}_${connectionIndex1}_${blockId2}_${connectionIndex2}`
    this.createConnectionLine(connection1.position, connection2.position, connectionId)

    connection1.isConnected = true
    connection2.isConnected = true

    // Update energy flow between connected blocks
    this.updateEnergyFlow(block1, block2)

    return true
  }

  /**
   * Create visual connection line
   */
  private createConnectionLine(pos1: BlockPosition, pos2: BlockPosition, connectionId: string): void {
    const geometry = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(pos1.x, pos1.y, pos1.z),
      new THREE.Vector3(pos2.x, pos2.y, pos2.z)
    ])

    const material = new THREE.LineBasicMaterial({
      color: 0x00ffff,
      transparent: true,
      opacity: 0.8
    })

    const line = new THREE.Line(geometry, material)
    this.scene.add(line)
    this.connectionLines.set(connectionId, line)
  }

  /**
   * Update energy flow between connected blocks
   */
  private updateEnergyFlow(block1: LegoArchetypeBlock, block2: LegoArchetypeBlock): void {
    // Energy flows from higher energy block to lower energy block
    const energyDiff = block1.archetype.energy - block2.archetype.energy

    if (Math.abs(energyDiff) > 5) {
      const flowAmount = Math.min(Math.abs(energyDiff) * 0.1, 5)

      if (energyDiff > 0) {
        block1.archetype.energy -= flowAmount
        block2.archetype.energy += flowAmount
      } else {
        block1.archetype.energy += flowAmount
        block2.archetype.energy -= flowAmount
      }

      block1.energyFlow = energyDiff > 0 ? -flowAmount : flowAmount
      block2.energyFlow = -block1.energyFlow
    }
  }

  /**
   * Update block position
   */
  updateBlockPosition(blockId: string, position: BlockPosition): void {
    const block = this.blocks.get(blockId)
    if (block && block.threeObject) {
      block.threeObject.position.set(position.x, position.y, position.z)
      block.position = position

      // Update connection points
      this.updateConnectionPoints(block)
    }
  }

  /**
   * Update connection points after block movement
   */
  private updateConnectionPoints(block: LegoArchetypeBlock): void {
    block.connections.forEach((connection, index) => {
      const offsets = [
        { x: 1, y: 0, z: 0 },
        { x: -1, y: 0, z: 0 },
        { x: 0, y: 1, z: 0 },
        { x: 0, y: -1, z: 0 },
        { x: 0, y: 0, z: 1 },
        { x: 0, y: 0, z: -1 }
      ]

      const offset = offsets[index]
      connection.position = {
        x: block.position.x + offset.x,
        y: block.position.y + offset.y,
        z: block.position.z + offset.z
      }
    })
  }

  /**
   * Get nearby blocks for connection
   */
  getNearbyBlocks(position: BlockPosition, radius: number = this.maxDistance): LegoArchetypeBlock[] {
    const nearby: LegoArchetypeBlock[] = []

    this.blocks.forEach(block => {
      const distance = Math.sqrt(
        Math.pow(block.position.x - position.x, 2) +
        Math.pow(block.position.y - position.y, 2) +
        Math.pow(block.position.z - position.z, 2)
      )

      if (distance <= radius && distance > 0.1) {
        nearby.push(block)
      }
    })

    return nearby
  }

  /**
   * Animation loop
   */
  private animate = (): void => {
    this.animationId = requestAnimationFrame(this.animate)

    // Update block materials based on energy levels
    this.blocks.forEach(block => {
      if (block.threeObject) {
        block.threeObject.children.forEach(child => {
          if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshPhongMaterial) {
            child.material.emissiveIntensity = block.archetype.isActive ? 0.2 : 0
            child.material.opacity = 0.8 + (block.archetype.manifestationLevel * 0.2)
          }
        })

        // Rotate active blocks slowly
        if (block.archetype.isActive) {
          block.threeObject.rotation.y += 0.01
        }
      }
    })

    // Update connection lines
    this.updateConnectionLines()

    this.renderer.render(this.scene, this.camera)
  }

  /**
   * Update connection line positions
   */
  private updateConnectionLines(): void {
    this.connectionLines.forEach((line, connectionId) => {
      // Extract block IDs and connection indices from connection ID
      const parts = connectionId.split('_')
      if (parts.length >= 4) {
        const blockId1 = `${parts[0]}_${parts[1]}`
        const blockId2 = `${parts[2]}_${parts[3]}`

        const block1 = this.blocks.get(blockId1)
        const block2 = this.blocks.get(blockId2)

        if (block1 && block2 && block1.connections.length > 0 && block2.connections.length > 0) {
          // Find the connection points (simplified - would need better tracking)
          const pos1 = block1.position
          const pos2 = block2.position

          const positions = line.geometry.attributes.position
          positions.setXYZ(0, pos1.x, pos1.y, pos1.z)
          positions.setXYZ(1, pos2.x, pos2.y, pos2.z)
          positions.needsUpdate = true
        }
      }
    })
  }

  /**
   * Handle window resize
   */
  private onWindowResize(): void {
    this.camera.aspect = window.innerWidth / window.innerHeight
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(window.innerWidth, window.innerHeight)
  }

  /**
   * Get all blocks
   */
  getBlocks(): LegoArchetypeBlock[] {
    return Array.from(this.blocks.values())
  }

  /**
   * Remove block
   */
  removeBlock(blockId: string): void {
    const block = this.blocks.get(blockId)
    if (block && block.threeObject) {
      this.scene.remove(block.threeObject)
      this.blocks.delete(blockId)
    }
  }

  /**
   * Clean up resources
   */
  dispose(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId)
    }

    this.renderer.dispose()
    window.removeEventListener('resize', this.onWindowResize)
  }
}

export default LegoBuildEngine
