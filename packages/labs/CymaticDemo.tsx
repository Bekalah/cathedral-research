import React, { useEffect, useState } from "react";
import CymaticCanvas from "./CymaticCanvas";
import { audioCore } from "./audio-core";

const CymaticDemo: React.FC = () => {
  const [fft, setFFT] = useState<Float32Array>(new Float32Array(1024));
  const [started, setStarted] = useState(false);

  useEffect(() => {
    let raf: number | undefined;
    function updateFFT() {
      const fftData = audioCore.getFFT();
      if (fftData) setFFT(fftData);
      raf = requestAnimationFrame(updateFFT);
    }
    if (started) updateFFT();
    return () => {
      if (raf !== undefined) cancelAnimationFrame(raf);
    };
  }, [started]);

  const handleStart = async () => {
    await audioCore.startOnGesture();
    setStarted(true);
    audioCore.trigger("voice-default", 220 + Math.random() * 660);
  };

  return (
    <div style={{ textAlign: "center", marginTop: 32 }}>
      <button onClick={handleStart} disabled={started} style={{ fontSize: 18, padding: "8px 24px", marginBottom: 24 }}>
        Start Audio
      </button>
      <CymaticCanvas fft={fft} width={400} height={400} />
      <div style={{ color: "#888", marginTop: 16 }}>
        Click "Start Audio" and listen for a tone. The canvas shows live FFT data.
      </div>
    </div>
  );
};

export default CymaticDemo;
