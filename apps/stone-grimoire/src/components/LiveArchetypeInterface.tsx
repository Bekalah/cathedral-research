import React, { useState, useEffect } from 'react'

interface LiveArchetype {
  id: string
  name: string
  type: 'major' | 'minor' | 'court'
  element: 'fire' | 'water' | 'air' | 'earth'
  energy: number
  isActive: boolean
  connections: string[]
  manifestationLevel: number
}

interface LiveArchetypeInterfaceProps {
  archetypes?: LiveArchetype[]
  onArchetypeActivate?: (id: string) => void
  onEnergyAdjust?: (id: string, energy: number) => void
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
  }
]

export const LiveArchetypeInterface: React.FC<LiveArchetypeInterfaceProps> = ({
  archetypes = defaultArchetypes,
  onArchetypeActivate,
  onEnergyAdjust
}) => {
  const [archetypeData, setArchetypeData] = useState<LiveArchetype[]>(archetypes)
  const [selectedArchetype, setSelectedArchetype] = useState<string | null>(null)

  useEffect(() => {
    // Simulate living archetype energy fluctuations
    const interval = setInterval(() => {
      setArchetypeData(prev => prev.map(archetype => ({
        ...archetype,
        energy: archetype.isActive 
          ? Math.max(10, Math.min(100, archetype.energy + (Math.random() - 0.5) * 5))
          : Math.max(0, archetype.energy - 1),
        manifestationLevel: archetype.isActive
          ? Math.max(0.1, Math.min(1.0, archetype.manifestationLevel + (Math.random() - 0.5) * 0.1))
          : Math.max(0, archetype.manifestationLevel - 0.01)
      })))
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const handleArchetypeToggle = (id: string) => {
    setArchetypeData(prev => prev.map(archetype =>
      archetype.id === id
        ? { ...archetype, isActive: !archetype.isActive }
        : archetype
    ))
    onArchetypeActivate?.(id)
  }

  const handleEnergyChange = (id: string, newEnergy: number) => {
    setArchetypeData(prev => prev.map(archetype =>
      archetype.id === id
        ? { ...archetype, energy: newEnergy }
        : archetype
    ))
    onEnergyAdjust?.(id, newEnergy)
  }

  const getElementColor = (element: string) => {
    switch (element) {
      case 'fire': return 'text-red-400 border-red-400'
      case 'water': return 'text-blue-400 border-blue-400'
      case 'air': return 'text-yellow-400 border-yellow-400'
      case 'earth': return 'text-green-400 border-green-400'
      default: return 'text-purple-400 border-purple-400'
    }
  }

  return (
    <div className="live-archetype-interface p-4 border border-purple-500 rounded-lg bg-black/50">
      <h3 className="text-purple-300 text-lg mb-4">Live Archetype Interface</h3>
      
      <div className="grid grid-cols-1 gap-4 max-h-96 overflow-y-auto">
        {archetypeData.map((archetype) => (
          <div
            key={archetype.id}
            className={`p-3 rounded border transition-all ${
              archetype.isActive 
                ? `${getElementColor(archetype.element)} bg-opacity-20` 
                : 'border-gray-600 bg-gray-800/30'
            }`}
          >
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-semibold text-sm text-purple-200">
                {archetype.name}
              </h4>
              <button
                onClick={() => handleArchetypeToggle(archetype.id)}
                className={`px-2 py-1 text-xs rounded transition-colors ${
                  archetype.isActive
                    ? 'bg-green-600 hover:bg-green-700 text-white'
                    : 'bg-gray-600 hover:bg-gray-700 text-white'
                }`}
              >
                {archetype.isActive ? 'Active' : 'Dormant'}
              </button>
            </div>

            <div className="text-xs text-purple-300 mb-2">
              Type: {archetype.type} | Element: {archetype.element}
            </div>

            <div className="mb-2">
              <div className="flex justify-between text-xs text-purple-300 mb-1">
                <span>Energy: {Math.round(archetype.energy)}%</span>
                <span>Manifestation: {Math.round(archetype.manifestationLevel * 100)}%</span>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      archetype.element === 'fire' ? 'bg-red-400' :
                      archetype.element === 'water' ? 'bg-blue-400' :
                      archetype.element === 'air' ? 'bg-yellow-400' :
                      'bg-green-400'
                    }`}
                    style={{ width: `${archetype.energy}%` }}
                  />
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-purple-400 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${archetype.manifestationLevel * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {archetype.isActive && selectedArchetype === archetype.id && (
              <div className="mt-2">
                <label className="text-xs text-purple-300 mb-1 block">Adjust Energy:</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={archetype.energy}
                  onChange={(e) => handleEnergyChange(archetype.id, parseInt(e.target.value))}
                  className="w-full h-1"
                />
              </div>
            )}

            <div className="text-xs text-purple-400 mt-2">
              Connections: {archetype.connections.join(', ')}
            </div>

            <button
              onClick={() => setSelectedArchetype(
                selectedArchetype === archetype.id ? null : archetype.id
              )}
              className="text-xs text-purple-400 hover:text-purple-300 mt-1"
            >
              {selectedArchetype === archetype.id ? 'Hide Details' : 'Show Details'}
            </button>
          </div>
        ))}
      </div>

      <div className="mt-4 text-sm text-purple-400">
        Active: {archetypeData.filter(a => a.isActive).length} / {archetypeData.length}
        <br />
        Avg Energy: {Math.round(archetypeData.reduce((sum, a) => sum + a.energy, 0) / archetypeData.length)}%
      </div>
    </div>
  )
}

export default LiveArchetypeInterface