export interface LiveArchetype {
  id: string
  name: string
  type: 'major' | 'minor' | 'court'
  element: 'fire' | 'water' | 'air' | 'earth'
  energy: number
  isActive: boolean
  connections: string[]
  manifestationLevel: number
}

export interface ArchetypePalette {
  majorArcana: LiveArchetype[]
  minorArcana: LiveArchetype[]
  courtCards: LiveArchetype[]
}

export interface ArchetypeConnection {
  fromArchetype: string
  toArchetype: string
  strength: number
  energyFlow: number
}
