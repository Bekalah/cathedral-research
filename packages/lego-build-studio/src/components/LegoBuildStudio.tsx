import React, { useEffect, useRef, useState } from 'react'
import { LegoBuildEngine, LegoArchetypeBlock, BlockPosition } from '../core/LegoBuildEngine'
import { LiveArchetype } from '../types/ArchetypeTypes'

interface LegoBuildStudioProps {
  archetypes?: LiveArchetype[]
  onBlockSelect?: (block: LegoArchetypeBlock) => void
  onConnection?: (block1: LegoArchetypeBlock, block2: LegoArchetypeBlock) => void
}

const defaultArchetypes: LiveArchetype[] = [
  {
    id: 'fool',
    name: 'The Fool',
    type: 'major',
    element: 'air',
    energy: 75,
    isActive: true,
    connections: ['magician', 'world'],
    manifestationLevel: 0.8
  },
  {
    id: 'magician',
    name: 'The Magician',
    type: 'major',
    element: 'fire',
    energy: 90,
    isActive: true,
    connections: ['fool', 'high-priestess'],
    manifestationLevel: 0.95
  },
  {
    id: 'high-priestess',
    name: 'The High Priestess',
    type: 'major',
    element: 'water',
    energy: 60,
    isActive: false,
    connections: ['magician', 'empress'],
    manifestationLevel: 0.6
  },
  {
    id: 'empress',
    name: 'The Empress',
    type: 'major',
    element: 'earth',
    energy: 85,
    isActive: true,
    connections: ['high-priestess', 'emperor'],
    manifestationLevel: 0.9
  }
]

export const LegoBuildStudio: React.FC<LegoBuildStudioProps> = ({
  archetypes = defaultArchetypes,
  onBlockSelect,
  onConnection
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const engineRef = useRef<LegoBuildEngine | null>(null)
  const [blocks, setBlocks] = useState<LegoArchetypeBlock[]>([])
  const [selectedArchetype, setSelectedArchetype] = useState<string | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)
  const [connectionStart, setConnectionStart] = useState<{blockId: string, connectionIndex: number} | null>(null)

  useEffect(() => {
    if (canvasRef.current && !engineRef.current) {
      engineRef.current = new LegoBuildEngine(canvasRef.current)

      // Add some initial blocks for demonstration
      setTimeout(() => {
        addInitialBlocks()
      }, 100)
    }

    return () => {
      if (engineRef.current) {
        engineRef.current.dispose()
      }
    }
  }, [])

  useEffect(() => {
    if (engineRef.current) {
      const engineBlocks = engineRef.current.getBlocks()
      setBlocks(engineBlocks)
    }
  }, [archetypes])

  const addInitialBlocks = () => {
    if (!engineRef.current) return

    const positions: BlockPosition[] = [
      { x: 0, y: 0, z: 0 },
      { x: 3, y: 0, z: 0 },
      { x: 0, y: 3, z: 0 },
      { x: 0, y: 0, z: 3 }
    ]

    archetypes.slice(0, 4).forEach((archetype, index) => {
      const block = engineRef.current!.addArchetypeBlock(
        archetype,
        positions[index],
        index % 2 === 0 ? 'cube' : 'octahedron'
      )
      setBlocks(prev => [...prev, block])
    })
  }

  const handleArchetypeSelect = (archetype: LiveArchetype) => {
    setSelectedArchetype(archetype.id)
  }

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!engineRef.current || !selectedArchetype) return

    const canvas = canvasRef.current!
    const rect = canvas.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1
    const y = -((event.clientY - rect.top) / rect.height) * 2 + 1

    // Simple raycasting would go here - for now, just add at camera position
    const block = engineRef.current.addArchetypeBlock(
      archetypes.find(a => a.id === selectedArchetype)!,
      { x: x * 5, y: y * 5, z: 0 }
    )

    setBlocks(prev => [...prev, block])
    setSelectedArchetype(null)
  }

  const handleBlockConnection = (blockId: string, connectionIndex: number) => {
    if (!engineRef.current) return

    if (isConnecting && connectionStart) {
      // Complete connection
      const success = engineRef.current.connectBlocks(
        connectionStart.blockId,
        blockId,
        connectionStart.connectionIndex,
        connectionIndex
      )

      if (success) {
        const block1 = blocks.find(b => b.id === connectionStart.blockId)
        const block2 = blocks.find(b => b.id === blockId)
        if (block1 && block2) {
          onConnection?.(block1, block2)
        }
      }

      setIsConnecting(false)
      setConnectionStart(null)
    } else {
      // Start connection
      setIsConnecting(true)
      setConnectionStart({ blockId, connectionIndex })
    }
  }

  const getElementIcon = (element: string) => {
    switch (element) {
      case 'fire': return '🔥'
      case 'water': return '💧'
      case 'air': return '💨'
      case 'earth': return '🌍'
      default: return '✨'
    }
  }

  return (
    <div className="lego-build-studio w-full h-screen bg-gray-900 text-white flex">
      {/* Left Panel - Archetype Palette */}
      <div className="w-80 bg-gray-800 p-4 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4 text-purple-300">Archetype Palette</h2>

        <div className="space-y-2">
          {archetypes.map((archetype) => (
            <div
              key={archetype.id}
              className={`p-3 rounded-lg border cursor-pointer transition-all ${
                selectedArchetype === archetype.id
                  ? 'border-purple-400 bg-purple-900/30'
                  : 'border-gray-600 bg-gray-700/50 hover:bg-gray-700/70'
              }`}
              onClick={() => handleArchetypeSelect(archetype)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-sm">{archetype.name}</h3>
                  <p className="text-xs text-gray-300">
                    {archetype.type} • {getElementIcon(archetype.element)} {archetype.element}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-400">Energy</div>
                  <div className="text-sm font-mono">{Math.round(archetype.energy)}%</div>
                </div>
              </div>

              <div className="mt-2 w-full bg-gray-600 rounded-full h-1">
                <div
                  className={`h-1 rounded-full transition-all duration-300 ${
                    archetype.element === 'fire' ? 'bg-red-400' :
                    archetype.element === 'water' ? 'bg-blue-400' :
                    archetype.element === 'air' ? 'bg-yellow-400' :
                    'bg-green-400'
                  }`}
                  style={{ width: `${archetype.energy}%` }}
                />
              </div>

              {archetype.isActive && (
                <div className="mt-1 text-xs text-green-400">Active</div>
              )}
            </div>
          ))}
        </div>

        {/* Instructions */}
        <div className="mt-6 p-3 bg-purple-900/20 rounded-lg border border-purple-600">
          <h3 className="font-semibold text-sm text-purple-300 mb-2">How to Build:</h3>
          <ul className="text-xs text-gray-300 space-y-1">
            <li>• Select an archetype from the palette</li>
            <li>• Click on the 3D canvas to place it</li>
            <li>• Click connection points to link blocks</li>
            <li>• Watch energy flow between connected blocks</li>
          </ul>
        </div>
      </div>

      {/* Main 3D Canvas */}
      <div className="flex-1 relative">
        <canvas
          ref={canvasRef}
          className="w-full h-full cursor-crosshair"
          onClick={handleCanvasClick}
        />

        {/* Overlay UI */}
        <div className="absolute top-4 left-4 bg-black/70 p-3 rounded-lg">
          <h3 className="font-semibold text-purple-300">LEGO Build Studio</h3>
          <p className="text-sm text-gray-300">Blocks: {blocks.length}</p>
          {isConnecting && (
            <p className="text-sm text-yellow-400">Select second block to connect...</p>
          )}
        </div>

        {/* Block Info Panel */}
        {blocks.length > 0 && (
          <div className="absolute bottom-4 left-4 bg-black/70 p-3 rounded-lg max-w-sm">
            <h4 className="font-semibold text-purple-300 mb-2">Active Blocks</h4>
            <div className="space-y-1 max-h-32 overflow-y-auto">
              {blocks.map((block) => (
                <div key={block.id} className="text-xs flex justify-between items-center">
                  <span>{block.archetype.name}</span>
                  <div className="flex gap-1">
                    <button
                      className="text-blue-400 hover:text-blue-300"
                      onClick={() => onBlockSelect?.(block)}
                    >
                      Info
                    </button>
                    <button
                      className="text-green-400 hover:text-green-300"
                      onClick={() => handleBlockConnection(block.id, 0)}
                    >
                      Connect
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Controls */}
        <div className="absolute top-4 right-4 bg-black/70 p-3 rounded-lg">
          <div className="text-xs text-gray-300 space-y-1">
            <div>Mouse: Place blocks</div>
            <div>Connections: Link archetypes</div>
            <div>Energy: Flows between blocks</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LegoBuildStudio
