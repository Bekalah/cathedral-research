import React from 'react'
import ReactDOM from 'react-dom/client'
import LegoBuildStudio from './components/LegoBuildStudio'
import './styles.css'

// Export the main component
export { default as LegoBuildStudio } from './components/LegoBuildStudio'
export { default as LegoBuildEngine } from './core/LegoBuildEngine'
export type { LiveArchetype, ArchetypePalette, ArchetypeConnection } from './types/ArchetypeTypes'
export type { LegoArchetypeBlock, BlockPosition, ConnectionPoint } from './core/LegoBuildEngine'

// Export for use as a library
export default LegoBuildStudio

// Auto-mount if in browser environment
if (typeof window !== 'undefined') {
  const mountPoint = document.getElementById('lego-build-studio-root')

  if (mountPoint) {
    const root = ReactDOM.createRoot(mountPoint)
    root.render(
      <React.StrictMode>
        <LegoBuildStudio />
      </React.StrictMode>
    )
  }
}
