import React from 'react'
import { motion } from 'framer-motion'

interface SystemStatusProps {
  health: 'excellent' | 'good' | 'warning' | 'critical'
}

const SystemStatus: React.FC<SystemStatusProps> = ({ health }) => {
  const getHealthColor = (health: string) => {
    switch (health) {
      case 'excellent': return '#4CAF50'
      case 'good': return '#8BC34A' 
      case 'warning': return '#FF9800'
      case 'critical': return '#F44336'
      default: return '#757575'
    }
  }

  const getHealthIcon = (health: string) => {
    switch (health) {
      case 'excellent': return '💎'
      case 'good': return '✅'
      case 'warning': return '⚠️'
      case 'critical': return '🚨'
      default: return '❓'
    }
  }

  return (
    <motion.div
      className="system-status"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="status-indicator">
        <div 
          className="status-light"
          style={{ backgroundColor: getHealthColor(health) }}
        />
        <span className="status-icon">{getHealthIcon(health)}</span>
      </div>
      
      <div className="status-info">
        <div className="status-label">System Health</div>
        <div className="status-value" style={{ color: getHealthColor(health) }}>
          {health.toUpperCase()}
        </div>
      </div>
    </motion.div>
  )
}

export default SystemStatus