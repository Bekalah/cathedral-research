import React, { useRef, useEffect } from "react";

interface CymaticCanvasProps {
  fft: Float32Array;
  width?: number;
  height?: number;
}

// Simple cymatic pattern renderer
const CymaticCanvas: React.FC<CymaticCanvasProps> = ({ fft, width = 400, height = 400 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !fft) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, width, height);
    ctx.save();
    ctx.translate(width / 2, height / 2);
    ctx.beginPath();
    const N = fft.length;
    for (let i = 0; i < N; i++) {
      const angle = (i / N) * Math.PI * 2;
      const radius = 120 + fft[i] * 80;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.strokeStyle = "#6cf";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.restore();
  }, [fft, width, height]);

  return <canvas ref={canvasRef} width={width} height={height} style={{ background: "#111", borderRadius: 12 }} />;
};

export default CymaticCanvas;
