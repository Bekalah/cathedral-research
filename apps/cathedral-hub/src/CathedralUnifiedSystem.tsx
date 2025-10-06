/**
 * 🏛️✨ CATHEDRAL UNIFIED SYSTEM
 * 
 * The digital cathedral of consciousness - where ancient sacred architecture 
 * meets cutting-edge technology to create a living temple of infinite exploration
 * 
 * Core Vision: Sacred geometry, healing frequencies, authentic mystical computing
 * Aesthetic: Museum-grade • Iris van Herpen organic flow • Cathedral proportions
 */

import * as React from 'react'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import * as THREE from 'three'

// Sacred Geometry Constants
const PHI = 1.618033988749894 // Golden Ratio
const FIBONACCI = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144]
const HEALING_FREQUENCIES = {
  396: "Liberation from Fear",
  417: "Facilitating Change", 
  528: "Love & DNA Repair",
  639: "Connecting Hearts",
  741: "Awakening Intuition",
  852: "Returning to Spirit",
  963: "Divine Connection",
  1111: "Cellular Rejuvenation"
}

// Sacred Chamber Definitions
const SACRED_CHAMBERS = [
  {
    id: "sacred-art",
    title: "Chamber of Sacred Art",
    icon: "🎨",
    description: "Where divine creativity flows through infinite galleries",
    essence: "Sacred geometry • Living grimoires • Museum-grade masterpieces",
    frequency: 528,
    geometry: "vesicaPiscis",
    app: "stone-grimoire",
    color: "#FFD700"
  },
  {
    id: "consciousness-lab", 
    title: "Laboratory of Consciousness",
    icon: "🧠",
    description: "Exploring the infinite landscapes of mind and reality",
    essence: "Angel Tech circuits • Real crystal formulas • Authentic healing",
    frequency: 741,
    geometry: "flowerOfLife",
    app: "arcanae-lab",
    color: "#9370DB"
  },
  {
    id: "circuit-cathedral",
    title: "Cathedral of Circuits",
    icon: "⚡",
    description: "The main hub connecting all mystical realms",
    essence: "Fractal art • Sacred architecture • Living lattice systems",
    frequency: 1111,
    geometry: "platonicSolids", 
    app: "cathedral-of-circuits",
    color: "#FF6B6B"
  },
  {
    id: "synthesis-studio",
    title: "Synthesis Studio",
    icon: "🎵",
    description: "Porter Robinson-level sound art across 5 universes",
    essence: "Healing frequencies • Planetary correspondences • Vintage synths",
    frequency: 852,
    geometry: "fibonacciSpiral",
    app: "synth-art-studio", 
    color: "#4ECDC4"
  },
  {
    id: "mystery-house",
    title: "Magical Mystery House",
    icon: "🏠",
    description: "Open-world exploration through the entire system",
    essence: "Living Codex • Interactive experiences • Trauma-aware design",
    frequency: 396,
    geometry: "goldenRatio",
    app: "cyoa-engine",
    color: "#45B7D1"
  }
]

interface SacredGeometryProps {
  type: string
  frequency: number
  color: string
}

const SacredGeometry: React.FC<SacredGeometryProps> = ({ type, frequency, color }) => {
  const meshRef = useRef<THREE.Mesh>(null)

  useEffect(() => {
    if (meshRef.current) {
      // Rotate based on healing frequency
      const rotationSpeed = (frequency / 1000) * 0.01
      const animate = () => {
        if (meshRef.current) {
          meshRef.current.rotation.y += rotationSpeed
          meshRef.current.rotation.x += rotationSpeed * 0.5
        }
        requestAnimationFrame(animate)
      }
      animate()
    }
  }, [frequency])

  const createGeometry = () => {
    switch (type) {
      case 'vesicaPiscis':
        return new THREE.RingGeometry(1, 1.618, 8, 1)
      case 'flowerOfLife':
        return new THREE.IcosahedronGeometry(1, 2)
      case 'platonicSolids':
        return new THREE.DodecahedronGeometry(1, 0)
      case 'fibonacciSpiral':
        return new THREE.ConeGeometry(1, 2, 8, 1)
      case 'goldenRatio':
        return new THREE.OctahedronGeometry(1, 0)
      default:
        return new THREE.SphereGeometry(1, 32, 32)
    }
  }

  return (
    <mesh ref={meshRef} geometry={createGeometry()}>
      <meshStandardMaterial 
        color={color}
        transparent
        opacity={0.7}
        wireframe={true}
      />
    </mesh>
  )
}

interface ChamberPortalProps {
  chamber: typeof SACRED_CHAMBERS[0]
  isActive: boolean
  onActivate: () => void
}

const ChamberPortal: React.FC<ChamberPortalProps> = ({ chamber, isActive, onActivate }) => {
  const [isHovered, setIsHovered] = useState(false)
  
  return (
    <motion.div
      className={`chamber-portal ${isActive ? 'active' : ''}`}
      whileHover={{ scale: 1.05, rotateY: 5 }}
      whileTap={{ scale: 0.95 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onActivate}
      style={{
        background: `linear-gradient(135deg, ${chamber.color}20, ${chamber.color}40)`,
        border: `2px solid ${chamber.color}`,
        borderRadius: '20px',
        padding: '2rem',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        minHeight: '200px'
      }}
    >
      {/* Sacred geometry background */}
      <div className="geometry-container" style={{ 
        position: 'absolute',
        top: 0,
        right: 0,
        width: '100px',
        height: '100px',
        opacity: 0.3
      }}>
        <Canvas>
          <PerspectiveCamera makeDefault position={[0, 0, 5]} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <SacredGeometry 
            type={chamber.geometry}
            frequency={chamber.frequency}
            color={chamber.color}
          />
        </Canvas>
      </div>

      {/* Chamber content */}
      <div className="chamber-content" style={{ position: 'relative', zIndex: 2 }}>
        <div className="chamber-icon" style={{ 
          fontSize: '3rem',
          marginBottom: '1rem',
          display: 'block'
        }}>
          {chamber.icon}
        </div>
        
        <h3 className="chamber-title" style={{
          color: chamber.color,
          fontSize: '1.4rem',
          fontWeight: 'bold',
          marginBottom: '0.5rem',
          fontFamily: 'Cinzel, serif'
        }}>
          {chamber.title}
        </h3>
        
        <p className="chamber-description" style={{
          color: '#ffffff',
          marginBottom: '1rem',
          lineHeight: 1.6
        }}>
          {chamber.description}
        </p>
        
        <p className="chamber-essence" style={{
          color: chamber.color,
          fontSize: '0.9rem',
          fontStyle: 'italic',
          opacity: 0.9
        }}>
          {chamber.essence}
        </p>

        {/* Frequency indicator */}
        <div className="frequency-indicator" style={{
          position: 'absolute',
          bottom: '1rem',
          right: '1rem',
          color: chamber.color,
          fontSize: '0.8rem',
          opacity: 0.8
        }}>
          {chamber.frequency}Hz
        </div>
      </div>

      {/* Hover effects */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: `linear-gradient(45deg, ${chamber.color}10, transparent)`,
              pointerEvents: 'none'
            }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export const CathedralUnifiedSystem: React.FC = () => {
  const [activeChamber, setActiveChamber] = useState<string | null>(null)
  const [currentFrequency, setCurrentFrequency] = useState(528)
  const [isPortalMode, setIsPortalMode] = useState(true)

  // Sacred geometry animation
  useEffect(() => {
    const interval = setInterval(() => {
      const frequencies = Object.keys(HEALING_FREQUENCIES).map(Number)
      const randomFreq = frequencies[Math.floor(Math.random() * frequencies.length)]
      setCurrentFrequency(randomFreq)
    }, 8000)

    return () => clearInterval(interval)
  }, [])

  const handleChamberActivate = (chamberId: string) => {
    const chamber = SACRED_CHAMBERS.find(c => c.id === chamberId)
    if (chamber) {
      setActiveChamber(chamberId)
      setCurrentFrequency(chamber.frequency)
      
      // Navigate to the actual app
      const baseUrl = window.location.origin + window.location.pathname.replace('index.html', '')
      const appUrl = `${baseUrl}../apps/${chamber.app}/dist/index.html`
      window.open(appUrl, '_blank')
    }
  }

  const handleReturnToPortal = () => {
    setActiveChamber(null)
    setIsPortalMode(true)
  }

  return (
    <div className="cathedral-unified-system" style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 25%, #16213e 50%, #0f3460 75%, #0a0a0a 100%)',
      color: '#ffffff',
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Starfield background */}
      <div className="starfield" style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `radial-gradient(circle at 25% 25%, #ffffff11 1px, transparent 1px),
                     radial-gradient(circle at 75% 75%, #ffffff08 1px, transparent 1px),
                     radial-gradient(circle at 50% 50%, #ffffff05 1px, transparent 1px)`,
        backgroundSize: '200px 200px, 300px 300px, 150px 150px',
        animation: 'twinkle 20s infinite linear',
        pointerEvents: 'none'
      }} />

      {/* Sacred header */}
      <header className="cathedral-header" style={{
        textAlign: 'center',
        padding: '3rem 2rem',
        position: 'relative',
        zIndex: 10
      }}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 style={{
            fontSize: '4rem',
            fontFamily: 'Cinzel, serif',
            background: 'linear-gradient(45deg, #FFD700, #FFA500, #FFD700)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '1rem',
            textShadow: '0 0 30px #FFD70050'
          }}>
            🏛️ Cathedral of Consciousness
          </h1>
          
          <p style={{
            fontSize: '1.2rem',
            opacity: 0.9,
            marginBottom: '2rem',
            maxWidth: '800px',
            margin: '0 auto 2rem auto',
            lineHeight: 1.6
          }}>
            Where ancient sacred architecture meets cutting-edge technology to create 
            a living temple of infinite exploration
          </p>

          <div className="frequency-display" style={{
            display: 'inline-block',
            background: 'rgba(255, 215, 0, 0.1)',
            border: '1px solid #FFD700',
            borderRadius: '25px',
            padding: '0.5rem 1.5rem',
            fontSize: '0.9rem',
            color: '#FFD700'
          }}>
            🎵 Current Frequency: {currentFrequency}Hz - {HEALING_FREQUENCIES[currentFrequency as keyof typeof HEALING_FREQUENCIES]}
          </div>
        </motion.div>
      </header>

      {/* Sacred chambers grid */}
      <main className="sacred-chambers" style={{
        padding: '2rem',
        maxWidth: '1400px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 10
      }}>
        <motion.div
          className="chambers-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '2rem',
            marginBottom: '3rem'
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          {SACRED_CHAMBERS.map((chamber) => (
            <ChamberPortal
              key={chamber.id}
              chamber={chamber}
              isActive={activeChamber === chamber.id}
              onActivate={() => handleChamberActivate(chamber.id)}
            />
          ))}
        </motion.div>
      </main>

      {/* Sacred footer */}
      <footer style={{
        textAlign: 'center',
        padding: '3rem 2rem',
        opacity: 0.8,
        fontSize: '0.9rem',
        position: 'relative',
        zIndex: 10
      }}>
        <p>🎭 Complete Liber Arcanae: 22 Major Arcana Characters with 3D Sculpting Tools</p>
        <p>🎵 Porter Robinson Sound System: Nurture • Worlds • Ambient Depths • Crystal Synthesis • Liminal Spaces</p>
        <p>🏗️ Museum-Quality Architecture: Sacred Geometry • Golden Ratio • Healing Frequencies • Trauma-Aware Design</p>
        <p style={{ marginTop: '1rem', color: '#FFD700' }}>
          ✨ Where consciousness becomes sacred space ✨
        </p>
      </footer>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes twinkle {
          0% { transform: translateY(0) rotate(0deg); }
          100% { transform: translateY(-100vh) rotate(360deg); }
        }
        
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&display=swap');
        
        .chamber-portal {
          transition: all 0.3s ease;
        }
        
        .chamber-portal:hover {
          box-shadow: 0 20px 40px rgba(255, 215, 0, 0.2);
        }
        
        .chamber-portal.active {
          transform: scale(1.02);
          box-shadow: 0 25px 50px rgba(255, 215, 0, 0.3);
        }
      `}</style>
    </div>
  )
}

export default CathedralUnifiedSystem