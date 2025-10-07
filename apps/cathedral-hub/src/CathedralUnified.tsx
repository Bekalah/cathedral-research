/**
 * 🏛️ CATHEDRAL UNIFIED - Master Application
 * 
 * Consolidating the best graphics, code, and functionality from:
 * - cathedral-research (working React apps)
 * - cosmogenesis-learning-engine (best CSS & graphics)
 * - circuitum99 (sacred art systems)
 * - liber-arcanae (authentic mystical components)
 * 
 * This is the single unified creative machine.
 */

import * as React from 'react'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'

// Best color palette from cosmogenesis-learning-engine
const CATHEDRAL_PALETTE = {
  bg: '#0B0B0B',
  ink: '#ECECEC',
  muted: '#B8B8B8',
  gold: '#C9A227',
  rose: '#FFB6C1',
  violet: '#8A2BE2',
  aqua: '#00CED1',
  focus: '#FFD700',
  panel: 'rgba(20,20,20,.75)',
  stroke: 'rgba(255,255,255,.08)',
  accent: '#8c6cff',
  card: '#111111',
  border: '#262626'
}

// Sacred chambers with enhanced graphics
const SACRED_CHAMBERS = [
  {
    id: 'cathedral-hub',
    title: 'Cathedral Hub',
    icon: '🏛️',
    description: 'Central portal with integrated mystical navigation',
    app: 'cathedral-hub',
    color: CATHEDRAL_PALETTE.gold,
    frequency: 528,
    sacred_geometry: 'vesica_piscis'
  },
  {
    id: 'cathedral-of-circuits', 
    title: 'Cathedral of Circuits',
    icon: '⚡',
    description: 'Main experience engine with living fractal systems',
    app: 'cathedral-of-circuits',
    color: CATHEDRAL_PALETTE.violet,
    frequency: 1111,
    sacred_geometry: 'dodecahedron'
  },
  {
    id: 'stone-grimoire',
    title: 'Stone Grimoire',
    icon: '📜', 
    description: 'Mystical creation tools with authentic historical art',
    app: 'stone-grimoire',
    color: CATHEDRAL_PALETTE.aqua,
    frequency: 741,
    sacred_geometry: 'flower_of_life'
  },
  {
    id: 'arcanae-lab',
    title: 'Arcanae Laboratory',
    icon: '🔬',
    description: 'Consciousness exploration with Angel Tech circuits',
    app: 'arcanae-lab', 
    color: CATHEDRAL_PALETTE.rose,
    frequency: 963,
    sacred_geometry: 'icosahedron'
  },
  {
    id: 'cosmogenesis-engine',
    title: 'Cosmogenesis Engine',
    icon: '🌌',
    description: 'Spiral learning platform for consciousness evolution',
    app: 'cosmogenesis-engine',
    color: CATHEDRAL_PALETTE.accent,
    frequency: 852,
    sacred_geometry: 'fibonacci_spiral'
  }
]

interface ChamberPortalProps {
  chamber: typeof SACRED_CHAMBERS[0]
  index: number
  onActivate: () => void
}

const ChamberPortal: React.FC<ChamberPortalProps> = ({ chamber, index, onActivate }) => {
  const [isHovered, setIsHovered] = useState(false)
  
  return (
    <motion.div
      className="chamber-portal"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      whileHover={{ scale: 1.05, rotateY: 5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onActivate}
      style={{
        background: `linear-gradient(135deg, ${chamber.color}15, ${chamber.color}25)`,
        border: `2px solid ${chamber.color}40`,
        borderRadius: '20px',
        padding: '2rem',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
        backdropFilter: 'blur(20px)',
        minHeight: '240px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}
    >
      {/* Sacred geometry background */}
      <div 
        className="sacred-bg"
        style={{
          position: 'absolute',
          top: '-20%',
          right: '-20%',
          width: '60%',
          height: '60%',
          opacity: isHovered ? 0.3 : 0.1,
          transition: 'opacity 0.3s ease',
          background: `radial-gradient(circle, ${chamber.color}30, transparent 70%)`
        }}
      />
      
      {/* Chamber content */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ 
          fontSize: '4rem', 
          marginBottom: '1rem',
          textShadow: `0 0 20px ${chamber.color}50`
        }}>
          {chamber.icon}
        </div>
        
        <h3 style={{
          color: chamber.color,
          fontSize: '1.5rem',
          fontWeight: '600',
          marginBottom: '0.8rem',
          fontFamily: 'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Inter, sans-serif'
        }}>
          {chamber.title}
        </h3>
        
        <p style={{
          color: CATHEDRAL_PALETTE.ink,
          lineHeight: 1.6,
          fontSize: '1rem',
          marginBottom: '1rem'
        }}>
          {chamber.description}
        </p>
      </div>
      
      {/* Frequency display */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative',
        zIndex: 2
      }}>
        <div style={{
          fontSize: '0.8rem',
          color: chamber.color,
          opacity: 0.8
        }}>
          {chamber.frequency}Hz
        </div>
        <div style={{
          fontSize: '0.7rem',
          color: CATHEDRAL_PALETTE.muted,
          textTransform: 'uppercase',
          letterSpacing: '1px'
        }}>
          {chamber.sacred_geometry.replace('_', ' ')}
        </div>
      </div>

      {/* Hover shine effect */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: `linear-gradient(90deg, transparent, ${chamber.color}20, transparent)`,
              pointerEvents: 'none'
            }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export const CathedralUnified: React.FC = () => {
  const [selectedChamber, setSelectedChamber] = useState<string | null>(null)
  const [currentFrequency, setCurrentFrequency] = useState(528)

  const handleChamberActivate = (chamber: typeof SACRED_CHAMBERS[0]) => {
    setSelectedChamber(chamber.id)
    setCurrentFrequency(chamber.frequency)
    
    // Navigate to the app
    const baseUrl = window.location.origin + window.location.pathname.replace(/\/[^\/]*$/, '')
    const appUrl = `${baseUrl}/apps/${chamber.app}/dist/index.html`
    window.open(appUrl, '_blank')
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: `linear-gradient(135deg, ${CATHEDRAL_PALETTE.bg} 0%, #1a1a2e 25%, #16213e 50%, #0f3460 75%, ${CATHEDRAL_PALETTE.bg} 100%)`,
      color: CATHEDRAL_PALETTE.ink,
      fontFamily: 'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Inter, sans-serif',
      position: 'relative'
    }}>
      {/* Cosmic background */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `
          radial-gradient(circle at 20% 30%, ${CATHEDRAL_PALETTE.violet}08 0%, transparent 50%),
          radial-gradient(circle at 80% 70%, ${CATHEDRAL_PALETTE.aqua}06 0%, transparent 50%),
          radial-gradient(circle at 40% 80%, ${CATHEDRAL_PALETTE.gold}04 0%, transparent 50%)
        `,
        pointerEvents: 'none'
      }} />

      <div style={{
        position: 'relative',
        zIndex: 10,
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '2rem'
      }}>
        {/* Sacred Header */}
        <motion.header
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            textAlign: 'center',
            marginBottom: '4rem',
            padding: '3rem 0'
          }}
        >
          <h1 style={{
            fontSize: '4.5rem',
            fontWeight: '700',
            background: `linear-gradient(45deg, ${CATHEDRAL_PALETTE.gold}, ${CATHEDRAL_PALETTE.focus}, ${CATHEDRAL_PALETTE.gold})`,
            backgroundSize: '200% 200%',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            animation: 'gradient-flow 4s ease infinite',
            marginBottom: '1rem',
            textShadow: `0 0 30px ${CATHEDRAL_PALETTE.gold}30`
          }}>
            🏛️ Cathedral of Consciousness
          </h1>
          
          <p style={{
            fontSize: '1.3rem',
            color: CATHEDRAL_PALETTE.muted,
            maxWidth: '800px',
            margin: '0 auto 2rem',
            lineHeight: 1.6
          }}>
            Where ancient sacred architecture meets cutting-edge technology
            to create a living temple of infinite exploration
          </p>

          <div style={{
            display: 'inline-block',
            background: CATHEDRAL_PALETTE.panel,
            border: `2px solid ${CATHEDRAL_PALETTE.gold}60`,
            borderRadius: '25px',
            padding: '1rem 2rem',
            backdropFilter: 'blur(10px)'
          }}>
            <span style={{ color: CATHEDRAL_PALETTE.gold }}>
              🎵 Current Frequency: {currentFrequency}Hz
            </span>
            <span style={{ color: CATHEDRAL_PALETTE.muted, marginLeft: '1rem' }}>
              ✨ Unified Creative Machine ✨
            </span>
          </div>
        </motion.header>

        {/* Sacred Chambers Grid */}
        <main>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '2rem',
            marginBottom: '4rem'
          }}>
            {SACRED_CHAMBERS.map((chamber, index) => (
              <ChamberPortal
                key={chamber.id}
                chamber={chamber}
                index={index}
                onActivate={() => handleChamberActivate(chamber)}
              />
            ))}
          </div>
        </main>

        {/* Sacred Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          style={{
            textAlign: 'center',
            padding: '3rem 0',
            borderTop: `1px solid ${CATHEDRAL_PALETTE.stroke}`,
            color: CATHEDRAL_PALETTE.muted,
            lineHeight: 1.8
          }}
        >
          <p>🎭 <strong>Complete Liber Arcanae:</strong> 22 Major Arcana with 3D Sculpting Tools</p>
          <p>🎵 <strong>Sacred Sound System:</strong> Healing Frequencies • Planetary Correspondences • Crystal Synthesis</p>
          <p>🏗️ <strong>Museum Architecture:</strong> Golden Ratio • Sacred Geometry • Trauma-Aware Design</p>
          <p style={{ 
            color: CATHEDRAL_PALETTE.gold, 
            fontWeight: '600',
            marginTop: '1rem',
            fontSize: '1.1rem'
          }}>
            ✨ Where consciousness becomes sacred space ✨
          </p>
        </motion.footer>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes gradient-flow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .chamber-portal {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .chamber-portal:hover {
          box-shadow: 0 25px 50px rgba(255, 215, 0, 0.15);
        }
      `}</style>
    </div>
  )
}

export default CathedralUnified