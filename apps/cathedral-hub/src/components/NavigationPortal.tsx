import React from 'react'
import { motion } from 'framer-motion'

interface AppManifest {
  id: string
  name: string
  description: string
  version: string
  status: 'active' | 'maintenance' | 'offline'
  port: number
  features: string[]
  lastUpdated: string
}

interface NavigationPortalProps {
  apps: AppManifest[]
  selectedApp: string | null
  onAppSelect: (appId: string) => void
  onAppLaunch: (appId: string) => void
}

const NavigationPortal: React.FC<NavigationPortalProps> = ({
  apps,
  selectedApp,
  onAppSelect,
  onAppLaunch
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#4CAF50'
      case 'maintenance': return '#FF9800'
      case 'offline': return '#F44336'
      default: return '#757575'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return '✅'
      case 'maintenance': return '🔧'
      case 'offline': return '❌'
      default: return '❓'
    }
  }

  return (
    <div className="navigation-portal">
      <h3 className="portal-title">🌟 Application Portal</h3>
      
      <div className="apps-grid">
        {apps.map((app, index) => (
          <motion.div
            key={app.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`app-card ${selectedApp === app.id ? 'selected' : ''} ${app.status}`}
            onClick={() => onAppSelect(app.id)}
            onDoubleClick={() => onAppLaunch(app.id)}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="app-header">
              <div className="app-info">
                <h4 className="app-name">{app.name}</h4>
                <div className="app-status">
                  <span className="status-icon">{getStatusIcon(app.status)}</span>
                  <span className="status-text">{app.status}</span>
                </div>
              </div>
              <div className="app-version">v{app.version}</div>
            </div>
            
            <p className="app-description">{app.description}</p>
            
            <div className="app-features">
              {app.features.slice(0, 3).map((feature, idx) => (
                <span key={idx} className="feature-tag">{feature}</span>
              ))}
              {app.features.length > 3 && (
                <span className="feature-tag more">+{app.features.length - 3}</span>
              )}
            </div>
            
            <div className="app-actions">
              <button
                className={`launch-btn ${app.status !== 'active' ? 'disabled' : ''}`}
                onClick={(e) => {
                  e.stopPropagation()
                  if (app.status === 'active') {
                    onAppLaunch(app.id)
                  }
                }}
                disabled={app.status !== 'active'}
              >
                {app.status === 'active' ? '🚀 Launch' : '🔧 Maintenance'}
              </button>
              
              <div className="app-port">:{app.port}</div>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="portal-footer">
        <p className="portal-help">
          💡 Click to select • Double-click to launch • 🚀 Use launch button
        </p>
      </div>
    </div>
  )
}

export default NavigationPortal