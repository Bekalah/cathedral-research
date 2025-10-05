import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

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

interface AppRegistryProps {
  apps: AppManifest[]
  onRefresh: () => void
}

const AppRegistry: React.FC<AppRegistryProps> = ({ apps, onRefresh }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [filter, setFilter] = useState<'all' | 'active' | 'maintenance' | 'offline'>('all')

  const filteredApps = apps.filter(app => 
    filter === 'all' || app.status === filter
  )

  const statusCounts = {
    active: apps.filter(app => app.status === 'active').length,
    maintenance: apps.filter(app => app.status === 'maintenance').length,
    offline: apps.filter(app => app.status === 'offline').length,
    total: apps.length
  }

  return (
    <div className="app-registry">
      <div className="registry-header">
        <h3 className="registry-title">📋 Application Registry</h3>
        <button
          className="expand-btn"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? '📉' : '📊'}
        </button>
      </div>
      
      <div className="registry-summary">
        <div className="summary-stats">
          <div className="stat-item">
            <span className="stat-label">Total Apps</span>
            <span className="stat-value">{statusCounts.total}</span>
          </div>
          <div className="stat-item active">
            <span className="stat-label">Active</span>
            <span className="stat-value">{statusCounts.active}</span>
          </div>
          <div className="stat-item maintenance">
            <span className="stat-label">Maintenance</span>
            <span className="stat-value">{statusCounts.maintenance}</span>
          </div>
          <div className="stat-item offline">
            <span className="stat-label">Offline</span>
            <span className="stat-value">{statusCounts.offline}</span>
          </div>
        </div>
        
        <div className="registry-actions">
          <button className="refresh-btn" onClick={onRefresh}>
            🔄 Refresh
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="registry-details"
          >
            <div className="filter-controls">
              <label className="filter-label">Filter:</label>
              <select 
                value={filter} 
                onChange={(e) => setFilter(e.target.value as any)}
                className="filter-select"
              >
                <option value="all">All ({statusCounts.total})</option>
                <option value="active">Active ({statusCounts.active})</option>
                <option value="maintenance">Maintenance ({statusCounts.maintenance})</option>
                <option value="offline">Offline ({statusCounts.offline})</option>
              </select>
            </div>
            
            <div className="apps-list">
              {filteredApps.map((app) => (
                <div key={app.id} className={`app-entry ${app.status}`}>
                  <div className="app-basic-info">
                    <div className="app-name-version">
                      <span className="app-name">{app.name}</span>
                      <span className="app-version">v{app.version}</span>
                    </div>
                    <div className="app-status-port">
                      <span className={`status-badge ${app.status}`}>
                        {app.status}
                      </span>
                      <span className="port-info">:{app.port}</span>
                    </div>
                  </div>
                  
                  <div className="app-meta">
                    <div className="last-updated">
                      Updated: {new Date(app.lastUpdated).toLocaleDateString()}
                    </div>
                    <div className="features-count">
                      {app.features.length} features
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default AppRegistry