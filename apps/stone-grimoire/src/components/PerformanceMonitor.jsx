import React, { useState, useEffect } from 'react';

const PerformanceMonitor = ({ isVisible = false, position = 'bottom-left' }) => {
  const [metrics, setMetrics] = useState({
    fps: 0,
    memory: 0,
    drawCalls: 0,
    triangles: 0,
    frameTime: 0
  });

  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (!isVisible) return;

    let frameCount = 0;
    let lastTime = performance.now();
    let animationId;

    const updateMetrics = () => {
      const now = performance.now();
      frameCount++;

      // Calculate FPS every second
      if (now - lastTime >= 1000) {
        const fps = Math.round((frameCount * 1000) / (now - lastTime));

        // Get memory usage if available
        const memory = performance.memory ?
          Math.round(performance.memory.usedJSHeapSize / 1048576) : 0;

        setMetrics(prev => ({
          ...prev,
          fps,
          memory,
          frameTime: Math.round((now - lastTime) / frameCount)
        }));

        frameCount = 0;
        lastTime = now;
      }

      animationId = requestAnimationFrame(updateMetrics);
    };

    updateMetrics();

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [isVisible]);

  if (!isVisible) return null;

  const getPositionStyles = () => {
    switch (position) {
      case 'bottom-left':
        return {
          bottom: '20px',
          left: '20px'
        };
      case 'bottom-right':
        return {
          bottom: '20px',
          right: '20px'
        };
      case 'top-left':
        return {
          top: '20px',
          left: '20px'
        };
      case 'top-right':
        return {
          top: '20px',
          right: '20px'
        };
      default:
        return {
          bottom: '20px',
          left: '20px'
        };
    }
  };

  return (
    <div style={{
      position: 'fixed',
      ...getPositionStyles(),
      background: 'rgba(0, 0, 0, 0.8)',
      color: 'white',
      padding: isExpanded ? '16px' : '8px 12px',
      borderRadius: '8px',
      border: '2px solid #4CAF50',
      zIndex: 1000,
      fontSize: '12px',
      fontFamily: 'monospace',
      minWidth: isExpanded ? '200px' : 'auto',
      cursor: 'pointer'
    }} onClick={() => setIsExpanded(!isExpanded)}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div style={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          backgroundColor: metrics.fps > 50 ? '#4CAF50' : metrics.fps > 30 ? '#FF9800' : '#F44336'
        }} />
        <span>FPS: {metrics.fps}</span>
        <span>Mem: {metrics.memory}MB</span>
        {isExpanded && (
          <span style={{ marginLeft: 'auto', fontSize: '10px' }}>
            Click to {isExpanded ? 'collapse' : 'expand'}
          </span>
        )}
      </div>

      {isExpanded && (
        <div style={{
          marginTop: '12px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '8px',
          fontSize: '11px'
        }}>
          <div>
            <div>Frame Time: {metrics.frameTime}ms</div>
            <div>Draw Calls: {metrics.drawCalls}</div>
          </div>
          <div>
            <div>Triangles: {metrics.triangles}</div>
            <div>Memory: {metrics.memory}MB</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PerformanceMonitor;
