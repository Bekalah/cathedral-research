import React, { useState, useEffect } from 'react'

interface ArcanaData {
  name: string
  number: number
  element: string
  keywords: string[]
  researchStatus: 'active' | 'pending' | 'complete'
}

interface ArcanaResearchPanelProps {
  selectedArcana?: number
  onArcanaSelect?: (arcanaNumber: number) => void
  researchData?: ArcanaData[]
}

const defaultArcanaData: ArcanaData[] = [
  { name: "The Fool", number: 0, element: "Air", keywords: ["New beginnings", "Innocence", "Adventure"], researchStatus: "active" },
  { name: "The Magician", number: 1, element: "Mercury", keywords: ["Manifestation", "Power", "Action"], researchStatus: "complete" },
  { name: "The High Priestess", number: 2, element: "Moon", keywords: ["Intuition", "Mystery", "Wisdom"], researchStatus: "pending" },
  { name: "The Empress", number: 3, element: "Venus", keywords: ["Fertility", "Nature", "Creation"], researchStatus: "pending" },
  { name: "The Emperor", number: 4, element: "Aries", keywords: ["Authority", "Structure", "Control"], researchStatus: "active" },
]

export const ArcanaResearchPanel: React.FC<ArcanaResearchPanelProps> = ({
  selectedArcana = 0,
  onArcanaSelect,
  researchData = defaultArcanaData
}) => {
  const [activeResearch, setActiveResearch] = useState(selectedArcana)
  const [researchProgress, setResearchProgress] = useState<Record<number, number>>({})

  useEffect(() => {
    // Simulate research progress
    const interval = setInterval(() => {
      setResearchProgress(prev => {
        const newProgress = { ...prev }
        researchData.forEach(arcana => {
          if (arcana.researchStatus === 'active') {
            newProgress[arcana.number] = Math.min(100, (newProgress[arcana.number] || 0) + Math.random() * 2)
          }
        })
        return newProgress
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [researchData])

  const handleArcanaClick = (arcanaNumber: number) => {
    setActiveResearch(arcanaNumber)
    onArcanaSelect?.(arcanaNumber)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400 border-green-400'
      case 'complete': return 'text-blue-400 border-blue-400'
      case 'pending': return 'text-yellow-400 border-yellow-400'
      default: return 'text-gray-400 border-gray-400'
    }
  }

  return (
    <div className="arcana-research-panel p-4 border border-purple-500 rounded-lg bg-black/50">
      <h3 className="text-purple-300 text-lg mb-4">Arcana Research Panel</h3>
      
      <div className="grid grid-cols-1 gap-3 max-h-80 overflow-y-auto">
        {researchData.map((arcana) => (
          <div
            key={arcana.number}
            onClick={() => handleArcanaClick(arcana.number)}
            className={`p-3 rounded border cursor-pointer transition-all ${
              activeResearch === arcana.number
                ? 'border-gold bg-purple-900/50'
                : `border-purple-400 bg-purple-800/30 hover:bg-purple-700/50 ${getStatusColor(arcana.researchStatus)}`
            }`}
          >
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-semibold text-sm">
                {arcana.number}: {arcana.name}
              </h4>
              <span className={`text-xs px-2 py-1 rounded ${getStatusColor(arcana.researchStatus)}`}>
                {arcana.researchStatus}
              </span>
            </div>

            <p className="text-xs text-purple-300 mb-2">Element: {arcana.element}</p>
            
            <div className="flex flex-wrap gap-1 mb-2">
              {arcana.keywords.map((keyword, index) => (
                <span key={index} className="text-xs bg-purple-700/50 px-2 py-1 rounded text-purple-200">
                  {keyword}
                </span>
              ))}
            </div>

            {arcana.researchStatus === 'active' && (
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className="bg-green-400 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${researchProgress[arcana.number] || 0}%` }}
                />
              </div>
            )}

            {arcana.researchStatus === 'complete' && (
              <div className="text-xs text-blue-400">✓ Research Complete</div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-4 text-sm text-purple-400">
        Active Research: {researchData.filter(a => a.researchStatus === 'active').length}
        <br />
        Completed: {researchData.filter(a => a.researchStatus === 'complete').length}
      </div>
    </div>
  )
}

export default ArcanaResearchPanel