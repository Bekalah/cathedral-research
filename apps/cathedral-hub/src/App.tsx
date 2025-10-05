import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import AppRegistry from './components/AppRegistry'
import SystemStatus from './components/SystemStatus'
import NavigationPortal from './components/NavigationPortal'
import './App.css'

interface AppManifest {
  id: string
  name: string
  description: string
  version: string
  status: 'active' | 'maintenance' | 'offline'
  port: number
  features: string[]
  lastUpdated: string
  screenshot?: string
}

function App() {
  const [apps, setApps] = useState<AppManifest[]>([])
  const [selectedApp, setSelectedApp] = useState<string | null>(null)
  const [systemHealth, setSystemHealth] = useState<'excellent' | 'good' | 'warning' | 'critical'>('good')

  useEffect(() => {
    loadAppRegistry()
    monitorSystemHealth()
  }, [])

  const loadAppRegistry = async () => {
    try {
      // Load app manifests from registry
      const response = await fetch('/registry/apps.json')
      if (response.ok) {
        const registryData = await response.json()
        setApps(registryData.apps)
      } else {
        // Fallback to local data
        setApps([
          {
            id: 'cathedral-of-circuits',
            name: '🏛️ Cathedral of Circuits',
            description: 'Sacred geometry and consciousness architecture',
            version: '2.0.0',
            status: 'active',
            port: 3001,
            features: ['WebGL', 'Three.js', 'Sacred Geometry', 'Consciousness Mapping'],
            lastUpdated: new Date().toISOString()
          },
          {
            id: 'stone-grimoire',
            name: '📚 Stone Grimoire',
            description: 'Living archive and mystical creation engine',
            version: '2.0.0', 
            status: 'active',
            port: 3002,
            features: ['AI Generation', 'Musical Engine', 'Fractal Visualization', 'Tarot Integration'],
            lastUpdated: new Date().toISOString()
          },
          {
            id: 'magical-mystery-house',
            name: '🏠 Magical Mystery House',
            description: 'Interactive exploration and discovery platform',
            version: '2.0.0',
            status: 'maintenance',
            port: 3003,
            features: ['Room Navigation', 'Mystery Solving', 'Interactive Stories'],
            lastUpdated: new Date().toISOString()
          },
          {
            id: 'circuitum99',
            name: '⚡ Circuitum99',
            description: 'Electronic circuit design and simulation',
            version: '2.0.0',
            status: 'active',
            port: 3004,
            features: ['Circuit Design', 'Simulation', 'Component Library'],
            lastUpdated: new Date().toISOString()
          },
          {
            id: 'arcanae-lab',
            name: '🔬 Arcanae Lab',
            description: 'Research and experimentation environment',
            version: '2.0.0',
            status: 'active',
            port: 3005,
            features: ['Research Tools', 'Data Analysis', 'Experimentation'],
            lastUpdated: new Date().toISOString()
          }
        ])
      }
    } catch (error) {
      console.error('Failed to load app registry:', error)
    }
  }

  const monitorSystemHealth = () => {
    // Monitor system health metrics
    setInterval(() => {
      // Simulate health check
      const metrics = {
        memory: Math.random() * 100,
        cpu: Math.random() * 100,
        network: Math.random() * 100
      }
      
      if (metrics.memory > 90 || metrics.cpu > 90) {
        setSystemHealth('critical')
      } else if (metrics.memory > 70 || metrics.cpu > 70) {
        setSystemHealth('warning')
      } else if (metrics.memory > 50 || metrics.cpu > 50) {
        setSystemHealth('good')
      } else {
        setSystemHealth('excellent')
      }
    }, 10000) // Check every 10 seconds
  }

  const handleAppLaunch = (appId: string) => {
    const app = apps.find(a => a.id === appId)
    if (app && app.status === 'active') {
      // Open app in new window/tab
      window.open(`http://localhost:${app.port}`, '_blank')
    }
  }

  return (
    <Router>
      <div className="cathedral-hub">
        <header className="hub-header">
          <div className="header-content">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="hub-title"
            >
              🏛️ Cathedral Research Hub
            </motion.h1>
            <p className="hub-subtitle">
              Central Portal for Mystical Computing & Consciousness Exploration
            </p>
          </div>
          
          <SystemStatus health={systemHealth} />
        </header>

        <main className="hub-main">
          <div className="main-grid">
            <section className="navigation-section">
              <NavigationPortal
                apps={apps}
                selectedApp={selectedApp}
                onAppSelect={setSelectedApp}
                onAppLaunch={handleAppLaunch}
              />
            </section>

            <section className="visualization-section">
              <div className="portal-canvas">
                <Canvas>
                  <Environment preset="night" />
                  <ambientLight intensity={0.3} />
                  <pointLight position={[10, 10, 10]} intensity={0.8} />
                  
                  {/* Sacred geometry portal visualization */}
                  <mesh rotation={[0, 0, 0]}>
                    <torusKnotGeometry args={[1, 0.3, 100, 16]} />
                    <meshStandardMaterial color="#8B5CF6" wireframe />
                  </mesh>
                  
                  <OrbitControls 
                    enablePan={false} 
                    enableZoom={true} 
                    enableRotate={true}
                    autoRotate
                    autoRotateSpeed={0.5}
                  />
                </Canvas>
              </div>
            </section>

            <section className="registry-section">
              <AppRegistry
                apps={apps}
                onRefresh={loadAppRegistry}
              />
            </section>
          </div>
        </main>

        <footer className="hub-footer">
          <div className="footer-content">
            <div className="system-info">
              <h4>🏛️ Cathedral Research Platform</h4>
              <p>
                Unified monorepo architecture • {apps.length} applications • 
                System health: <span className={`health-${systemHealth}`}>{systemHealth}</span>
              </p>
            </div>
            
            <div className="quick-links">
              <Link to="/docs" className="footer-link">📚 Documentation</Link>
              <Link to="/registry" className="footer-link">📋 Registry</Link>
              <Link to="/monitoring" className="footer-link">📊 Monitoring</Link>
              <a href="https://github.com/Bekalah/cathedral-research" target="_blank" rel="noopener noreferrer" className="footer-link">
                🔗 GitHub
              </a>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  )
}

export default App