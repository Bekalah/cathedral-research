import React, { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

function PerfGuard({ children }: { children: React.ReactNode }) {
  // Reduce load if user prefers reduced motion or tab is hidden
  const [ok, setOk] = useState(true);
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => setOk(!media.matches);
    onChange();
    media.addEventListener('change', onChange);
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) setOk(false); else onChange();
    });
    return () => media.removeEventListener('change', onChange);
  }, []);
  return ok ? <>{children}</> : <div style={{padding:12,opacity:0.8}}>3D paused to protect performance</div>;
}

function Rosette({ points }: { points: Array<{x:number,y:number}> }) {
  const ref = useRef<any>(undefined as any);
  const pos = useMemo(() => new Float32Array(points.length * 3), [points]);
  useEffect(() => {
    for (let i = 0; i < points.length; i++) {
      pos[i*3] = points[i].x;
      pos[i*3+1] = points[i].y;
      pos[i*3+2] = 0;
    }
  }, [points, pos]);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.z += delta * 0.1;
  });
  return (
    <points ref={ref}>
      {/* @ts-ignore */}
      <bufferGeometry>
        {/* @ts-ignore */}
        <bufferAttribute attach="attributes-position" count={points.length} array={pos} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color="#ffd700" size={0.02} sizeAttenuation/>
    </points>
  );
}

export default function ThreeScene({ points, animate = false }: { points: Array<{x:number,y:number}>, animate?: boolean }) {
  return (
    <div style={{ width: '100%', height: 360, borderRadius: 16, overflow: 'hidden', boxShadow:'0 8px 32px rgba(0,0,0,0.25)' }}>
      <PerfGuard>
        <Canvas camera={{ position: [0, 0, 2.5], fov: 55 }}>
          <color attach="background" args={[0.09, 0.09, 0.16]} />
          <ambientLight intensity={0.6} />
          <Suspense fallback={null}>
            {animate ? <Rosette points={points} /> : null}
          </Suspense>
          <OrbitControls enablePan={false} />
        </Canvas>
      </PerfGuard>
    </div>
  );
}
