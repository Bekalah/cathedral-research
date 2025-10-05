import React, { useState } from 'react'

interface Chapter {
  id: number
  title: string
  description: string
  isUnlocked: boolean
  arcanaConnection?: string
}

interface ChapterNavigatorProps {
  chapters?: Chapter[]
  currentChapter?: number
  onChapterSelect?: (chapterId: number) => void
}

const defaultChapters: Chapter[] = [
  { id: 1, title: "The Fool's Journey", description: "Beginning of the path", isUnlocked: true, arcanaConnection: "The Fool" },
  { id: 2, title: "The Magician's Tools", description: "Mastery of elements", isUnlocked: true, arcanaConnection: "The Magician" },
  { id: 3, title: "The High Priestess' Wisdom", description: "Inner knowledge", isUnlocked: false, arcanaConnection: "The High Priestess" },
  { id: 4, title: "The Empress' Creation", description: "Fertility and growth", isUnlocked: false, arcanaConnection: "The Empress" },
  { id: 5, title: "The Emperor's Structure", description: "Order and authority", isUnlocked: false, arcanaConnection: "The Emperor" },
]

export const ChapterNavigator: React.FC<ChapterNavigatorProps> = ({
  chapters = defaultChapters,
  currentChapter = 1,
  onChapterSelect
}) => {
  const [selectedChapter, setSelectedChapter] = useState(currentChapter)

  const handleChapterClick = (chapterId: number, isUnlocked: boolean) => {
    if (isUnlocked) {
      setSelectedChapter(chapterId)
      onChapterSelect?.(chapterId)
    }
  }

  return (
    <div className="chapter-navigator p-4 border border-purple-500 rounded-lg bg-black/50">
      <h3 className="text-purple-300 text-lg mb-4">Chapter Navigator</h3>
      
      <div className="flex flex-col gap-2 max-h-64 overflow-y-auto">
        {chapters.map((chapter) => (
          <div
            key={chapter.id}
            onClick={() => handleChapterClick(chapter.id, chapter.isUnlocked)}
            className={`p-3 rounded border cursor-pointer transition-all ${
              chapter.isUnlocked
                ? selectedChapter === chapter.id
                  ? 'border-gold bg-purple-900/50 text-gold'
                  : 'border-purple-400 bg-purple-800/30 text-purple-200 hover:bg-purple-700/50'
                : 'border-gray-600 bg-gray-800/30 text-gray-500 cursor-not-allowed'
            }`}
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h4 className="font-semibold text-sm">
                  {chapter.id}. {chapter.title}
                  {!chapter.isUnlocked && " 🔒"}
                </h4>
                <p className="text-xs mt-1 opacity-80">{chapter.description}</p>
                {chapter.arcanaConnection && (
                  <p className="text-xs mt-1 italic opacity-60">
                    Arcana: {chapter.arcanaConnection}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 text-sm text-purple-400">
        Current: Chapter {selectedChapter}
        <br />
        Progress: {chapters.filter(c => c.isUnlocked).length} / {chapters.length} chapters unlocked
      </div>
    </div>
  )
}

export default ChapterNavigator