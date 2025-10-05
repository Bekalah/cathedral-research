import React, { useState, useEffect } from 'react';

const ConnectionStatus = ({ status, onRetry }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show status indicator when connection issues occur
    if (status !== 'connected') {
      setIsVisible(true);
    } else {
      // Hide after successful connection
      const timer = setTimeout(() => setIsVisible(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  if (!isVisible) return null;

  const getStatusColor = () => {
    switch (status) {
      case 'connected': return '#4CAF50';
      case 'connecting': return '#FF9800';
      case 'disconnected': return '#F44336';
      case 'error': return '#E91E63';
      default: return '#9E9E9E';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'connected': return '🟢 Connected';
      case 'connecting': return '🟡 Connecting...';
      case 'disconnected': return '🔴 Disconnected';
      case 'error': return '❌ Connection Error';
      default: return '⚪ Unknown';
    }
  };

  return (
    <div className="connection-status" style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      background: 'rgba(0, 0, 0, 0.8)',
      color: 'white',
      padding: '12px 16px',
      borderRadius: '8px',
      border: `2px solid ${getStatusColor()}`,
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      fontSize: '14px',
      fontWeight: '500'
    }}>
      <div style={{
        width: '12px',
        height: '12px',
        borderRadius: '50%',
        backgroundColor: getStatusColor(),
        animation: status === 'connecting' ? 'pulse 1.5s infinite' : 'none'
      }} />
      <span>{getStatusText()}</span>
      {status === 'error' && onRetry && (
        <button
          onClick={onRetry}
          style={{
            background: '#2196F3',
            border: 'none',
            color: 'white',
            padding: '4px 8px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '12px'
          }}
        >
          Retry
        </button>
      )}
    </div>
  );
};

export default ConnectionStatus;
