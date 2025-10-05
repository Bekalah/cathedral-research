import React, { useState, useEffect } from 'react';

const RealmManager = ({
  currentRealm,
  onRealmChange,
  synthesisData,
  isVisible = true
}) => {
  const [realmStats, setRealmStats] = useState({
    energy: 0,
    harmony: 0,
    creativity: 0,
    mystical: 0
  });

  const [realmHistory, setRealmHistory] = useState([]);

  const realms = [
    {
      id: 'grimoire',
      name: '📚 Stone Grimoire',
      description: 'AI-powered mystical creation and synthesis',
      color: '#8A2BE2',
      icon: '📚',
      energy: 'high',
      focus: 'synthesis'
    },
    {
      id: 'cathedral',
      name: '🏛️ Sacred Architecture',
      description: 'Living tarot & sacred geometry exploration',
      color: '#4169E1',
      icon: '🏛️',
      energy: 'balanced',
      focus: 'geometry'
    },
    {
      id: 'fusion',
      name: '🎭 Fusion Arts',
      description: 'Intimate creative expressions and fusion',
      color: '#FF69B4',
      icon: '🎭',
      energy: 'intense',
      focus: 'creativity'
    },
    {
      id: 'mystical',
      name: '🔮 Mystical Patterns',
      description: 'Sacred geometry & numerological wisdom',
      color: '#00CED1',
      icon: '🔮',
      energy: 'deep',
      focus: 'wisdom'
    }
  ];

  useEffect(() => {
    // Update realm stats based on synthesis data
    if (synthesisData) {
      const newStats = {
        energy: synthesisData.analysis?.emotional?.[0]?.intensity || 0,
        harmony: synthesisData.unified?.harmony || 0,
        creativity: synthesisData.analysis?.creative?.length || 0,
        mystical: synthesisData.analysis?.spiritual?.length || 0
      };

      setRealmStats(newStats);

      // Add to history
      setRealmHistory(prev => [
        {
          realm: currentRealm,
          timestamp: Date.now(),
          stats: newStats,
          synthesis: synthesisData
        },
        ...prev.slice(0, 9) // Keep last 10 entries
      ]);
    }
  }, [synthesisData, currentRealm]);

  const getCurrentRealm = () => {
    return realms.find(realm => realm.id === currentRealm) || realms[0];
  };

  const getEnergyLevel = (level) => {
    if (level > 0.8) return '🔥 Very High';
    if (level > 0.6) return '⚡ High';
    if (level > 0.4) return '🌊 Medium';
    if (level > 0.2) return '🌱 Low';
    return '💤 Very Low';
  };

  const getStatBarColor = (value) => {
    if (value > 0.7) return '#4CAF50'; // Green
    if (value > 0.5) return '#FF9800'; // Orange
    if (value > 0.3) return '#F44336'; // Red
    return '#9E9E9E'; // Gray
  };

  if (!isVisible) return null;

  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      left: '20px',
      background: 'rgba(0, 0, 0, 0.9)',
      color: 'white',
      padding: '16px',
      borderRadius: '12px',
      border: `2px solid ${getCurrentRealm().color}`,
      zIndex: 1000,
      minWidth: '280px',
      maxWidth: '320px',
      fontSize: '12px'
    }}>
      {/* Current Realm Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        marginBottom: '12px',
        paddingBottom: '8px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.2)'
      }}>
        <span style={{ fontSize: '16px' }}>{getCurrentRealm().icon}</span>
        <div>
          <div style={{ fontWeight: 'bold', fontSize: '13px' }}>
            {getCurrentRealm().name}
          </div>
          <div style={{ fontSize: '10px', opacity: 0.8 }}>
            {getCurrentRealm().description}
          </div>
        </div>
      </div>

      {/* Realm Stats */}
      <div style={{ marginBottom: '12px' }}>
        <div style={{ marginBottom: '8px', fontSize: '11px', opacity: 0.9 }}>
          Current Energy Levels
        </div>

        <div style={{ display: 'grid', gap: '6px' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
              <span>Energy</span>
              <span>{getEnergyLevel(realmStats.energy)}</span>
            </div>
            <div style={{
              width: '100%',
              height: '4px',
              background: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '2px',
              overflow: 'hidden'
            }}>
              <div style={{
                width: `${realmStats.energy * 100}%`,
                height: '100%',
                background: getStatBarColor(realmStats.energy),
                transition: 'width 0.3s ease'
              }} />
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
              <span>Harmony</span>
              <span>{Math.round(realmStats.harmony * 100)}%</span>
            </div>
            <div style={{
              width: '100%',
              height: '4px',
              background: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '2px',
              overflow: 'hidden'
            }}>
              <div style={{
                width: `${realmStats.harmony * 100}%`,
                height: '100%',
                background: getStatBarColor(realmStats.harmony),
                transition: 'width 0.3s ease'
              }} />
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
              <span>Creativity</span>
              <span>{realmStats.creativity}/10</span>
            </div>
            <div style={{
              width: '100%',
              height: '4px',
              background: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '2px',
              overflow: 'hidden'
            }}>
              <div style={{
                width: `${(realmStats.creativity / 10) * 100}%`,
                height: '100%',
                background: getStatBarColor(realmStats.creativity / 10),
                transition: 'width 0.3s ease'
              }} />
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
              <span>Mystical</span>
              <span>{realmStats.mystical}/10</span>
            </div>
            <div style={{
              width: '100%',
              height: '4px',
              background: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '2px',
              overflow: 'hidden'
            }}>
              <div style={{
                width: `${(realmStats.mystical / 10) * 100}%`,
                height: '100%',
                background: getStatBarColor(realmStats.mystical / 10),
                transition: 'width 0.3s ease'
              }} />
            </div>
          </div>
        </div>
      </div>

      {/* Realm Navigation */}
      <div style={{ marginBottom: '12px' }}>
        <div style={{ fontSize: '11px', marginBottom: '6px', opacity: 0.9 }}>
          Switch Realms
        </div>
        <div style={{ display: 'grid', gap: '4px' }}>
          {realms.map(realm => (
            <button
              key={realm.id}
              onClick={() => onRealmChange(realm.id)}
              style={{
                background: currentRealm === realm.id ? realm.color : 'rgba(255, 255, 255, 0.1)',
                border: `1px solid ${currentRealm === realm.id ? realm.color : 'rgba(255, 255, 255, 0.2)'}`,
                color: currentRealm === realm.id ? 'white' : 'rgba(255, 255, 255, 0.8)',
                padding: '6px 8px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '10px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <span>{realm.icon}</span>
              <span>{realm.name.replace(/[^\w\s]/g, '')}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      {realmHistory.length > 0 && (
        <div>
          <div style={{ fontSize: '11px', marginBottom: '6px', opacity: 0.9 }}>
            Recent Activity
          </div>
          <div style={{ maxHeight: '100px', overflow: 'hidden' }}>
            {realmHistory.slice(0, 3).map((entry, index) => (
              <div
                key={index}
                style={{
                  fontSize: '9px',
                  padding: '4px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '4px',
                  marginBottom: '2px'
                }}
              >
                {new Date(entry.timestamp).toLocaleTimeString()}: {entry.realm}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RealmManager;
