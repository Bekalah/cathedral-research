import React, { useState, useEffect, useRef } from 'react';

const AudioProcessor = ({ isActive = false, onAudioData }) => {
  const [isListening, setIsListening] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);
  const [error, setError] = useState(null);

  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const microphoneRef = useRef(null);
  const animationFrameRef = useRef(null);

  useEffect(() => {
    if (isActive && !isListening) {
      startListening();
    } else if (!isActive && isListening) {
      stopListening();
    }

    return () => {
      stopListening();
    };
  }, [isActive]);

  const startListening = async () => {
    try {
      setError(null);

      // Request microphone access
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: false,
          noiseSuppression: false,
          autoGainControl: false
        }
      });

      microphoneRef.current = stream;

      // Create audio context
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();

      // Create analyser node
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 256;
      analyserRef.current.smoothingTimeConstant = 0.8;

      // Connect microphone to analyser
      const source = audioContextRef.current.createMediaStreamSource(stream);
      source.connect(analyserRef.current);

      setIsListening(true);
      startAudioProcessing();

    } catch (err) {
      console.error('Failed to start audio processing:', err);
      setError('Microphone access denied or unavailable');
    }
  };

  const stopListening = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    if (microphoneRef.current) {
      microphoneRef.current.getTracks().forEach(track => track.stop());
      microphoneRef.current = null;
    }

    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }

    analyserRef.current = null;
    setIsListening(false);
    setAudioLevel(0);
  };

  const startAudioProcessing = () => {
    if (!analyserRef.current) return;

    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const processAudio = () => {
      if (!analyserRef.current) return;

      analyserRef.current.getByteFrequencyData(dataArray);

      // Calculate average audio level
      const average = dataArray.reduce((sum, value) => sum + value, 0) / bufferLength;
      const normalizedLevel = average / 255; // Normalize to 0-1

      setAudioLevel(normalizedLevel);

      // Send audio data to parent component
      if (onAudioData) {
        onAudioData({
          level: normalizedLevel,
          frequencyData: Array.from(dataArray),
          timestamp: Date.now()
        });
      }

      animationFrameRef.current = requestAnimationFrame(processAudio);
    };

    processAudio();
  };

  const getAudioLevelColor = () => {
    if (audioLevel < 0.1) return '#4CAF50'; // Green - quiet
    if (audioLevel < 0.3) return '#FF9800'; // Orange - moderate
    if (audioLevel < 0.6) return '#F44336'; // Red - loud
    return '#E91E63'; // Pink - very loud
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      background: 'rgba(0, 0, 0, 0.8)',
      color: 'white',
      padding: '12px 16px',
      borderRadius: '8px',
      border: `2px solid ${getAudioLevelColor()}`,
      zIndex: 1000,
      minWidth: '200px'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          backgroundColor: isListening ? getAudioLevelColor() : '#666',
          animation: isListening ? 'pulse 1s infinite' : 'none'
        }} />

        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '12px', marginBottom: '4px' }}>
            {isListening ? '🎤 Listening' : '🔇 Audio Off'}
          </div>

          {isListening && (
            <div style={{
              width: '100%',
              height: '4px',
              background: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '2px',
              overflow: 'hidden'
            }}>
              <div style={{
                width: `${audioLevel * 100}%`,
                height: '100%',
                background: getAudioLevelColor(),
                transition: 'width 0.1s ease'
              }} />
            </div>
          )}
        </div>

        <button
          onClick={isListening ? stopListening : startListening}
          disabled={isActive && !isListening && error}
          style={{
            background: isListening ? '#F44336' : '#4CAF50',
            border: 'none',
            color: 'white',
            padding: '6px 12px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '11px'
          }}
        >
          {isListening ? 'Stop' : 'Start'}
        </button>
      </div>

      {error && (
        <div style={{
          marginTop: '8px',
          padding: '8px',
          background: 'rgba(244, 67, 54, 0.2)',
          borderRadius: '4px',
          fontSize: '11px',
          color: '#ffcdd2'
        }}>
          {error}
        </div>
      )}

      {isListening && (
        <div style={{
          marginTop: '8px',
          fontSize: '10px',
          color: 'rgba(255, 255, 255, 0.7)'
        }}>
          Audio Level: {Math.round(audioLevel * 100)}% | Processing: {isActive ? 'Active' : 'Inactive'}
        </div>
      )}
    </div>
  );
};

export default AudioProcessor;
