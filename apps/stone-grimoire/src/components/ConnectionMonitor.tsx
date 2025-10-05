import React, { useState, useEffect } from 'react'

interface ConnectionStatus {
  service: string
  status: 'connected' | 'disconnected' | 'connecting' | 'error'
  latency?: number
  lastUpdate?: Date
}

interface ConnectionMonitorProps {
  connections?: ConnectionStatus[]
  onReconnect?: (service: string) => void
}

const defaultConnections: ConnectionStatus[] = [
  { service: 'Musical Engine', status: 'connected', latency: 45, lastUpdate: new Date() },
  { service: 'Fractal Processor', status: 'connected', latency: 32, lastUpdate: new Date() },
  { service: 'Arcana Database', status: 'connecting', lastUpdate: new Date() },
  { service: 'White Noise Generator', status: 'connected', latency: 28, lastUpdate: new Date() },
  { service: 'Chapter System', status: 'error', lastUpdate: new Date() },
]

export const ConnectionMonitor: React.FC<ConnectionMonitorProps> = ({
  connections = defaultConnections,
  onReconnect
}) => {
  const [monitorData, setMonitorData] = useState<ConnectionStatus[]>(connections)
  const [lastUpdateTime, setLastUpdateTime] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => {
      setMonitorData(prev => prev.map(conn => ({
        ...conn,
        latency: conn.status === 'connected' ? 
          Math.max(10, (conn.latency || 30) + (Math.random() - 0.5) * 10) : 
          undefined,
        lastUpdate: new Date()
      })))
      setLastUpdateTime(new Date())
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'text-green-400'
      case 'connecting': return 'text-yellow-400'
      case 'disconnected': return 'text-gray-400'
      case 'error': return 'text-red-400'
      default: return 'text-gray-400'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected': return '●'
      case 'connecting': return '◐'
      case 'disconnected': return '○'
      case 'error': return '⚠'
      default: return '○'
    }
  }

  const handleReconnect = (service: string) => {
    setMonitorData(prev => prev.map(conn => 
      conn.service === service 
        ? { ...conn, status: 'connecting' as const }
        : conn
    ))
    
    // Simulate reconnection
    setTimeout(() => {
      setMonitorData(prev => prev.map(conn => 
        conn.service === service 
          ? { ...conn, status: 'connected' as const, latency: Math.random() * 50 + 20 }
          : conn
      ))
    }, 2000)

    onReconnect?.(service)
  }

  const connectedCount = monitorData.filter(c => c.status === 'connected').length
  const totalCount = monitorData.length

  return (
    <div className="connection-monitor p-4 border border-purple-500 rounded-lg bg-black/50">
      <h3 className="text-purple-300 text-lg mb-4">Connection Monitor</h3>
      
      <div className="mb-4 text-sm">
        <div className="flex justify-between text-purple-300">
          <span>Overall Status:</span>
          <span className={connectedCount === totalCount ? 'text-green-400' : 'text-yellow-400'}>
            {connectedCount}/{totalCount} Connected
          </span>
        </div>
        <div className="text-xs text-purple-400 mt-1">
          Last Update: {lastUpdateTime.toLocaleTimeString()}
        </div>
      </div>

      <div className="space-y-2 max-h-48 overflow-y-auto">
        {monitorData.map((connection, index) => (
          <div key={index} className="flex items-center justify-between p-2 bg-purple-900/30 rounded">
            <div className="flex items-center gap-2">
              <span className={`${getStatusColor(connection.status)} text-lg`}>
                {getStatusIcon(connection.status)}
              </span>
              <span className="text-sm text-purple-200">{connection.service}</span>
            </div>
            
            <div className="flex items-center gap-2">
              {connection.latency && (
                <span className="text-xs text-purple-400">
                  {Math.round(connection.latency)}ms
                </span>
              )}
              
              {connection.status === 'error' && (
                <button
                  onClick={() => handleReconnect(connection.service)}
                  className="text-xs bg-red-600 hover:bg-red-700 px-2 py-1 rounded text-white transition-colors"
                >
                  Reconnect
                </button>
              )}
              
              <span className={`text-xs ${getStatusColor(connection.status)} capitalize`}>
                {connection.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ConnectionMonitor