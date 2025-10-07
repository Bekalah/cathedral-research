import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

function StonePlane(){
  const ref = useRef();
  useFrame((_,dt)=>{ if(ref.current) ref.current.rotation.z += dt*0.002; });
  return (
    <mesh ref={ref} rotation={[-Math.PI/2,0,0]} position={[0,-0.8,0]}>
      <planeGeometry args={[18,14, 128,128]} />
      <meshStandardMaterial color="#0B0C0E" roughness={0.95} metalness={0.02} />
    </mesh>
  );
}

function Emblem(){
  const ref = useRef();
  useFrame((_,dt)=>{ if(ref.current) ref.current.rotation.y += dt*0.08; });
  return (
    <mesh ref={ref} position={[0,0.6,0]}>
      <torusGeometry args={[1.2, 0.06, 48, 300]} />
      <meshPhysicalMaterial color="#C6A664" metalness={0.9} roughness={0.38} />
    </mesh>
  );
}

export default function LabScene({ title='Chapel' }){
  return (
    <div className="three-container" style={{height: '60vh'}}>
      <Canvas camera={{ position:[4,1.8,6], fov:42 }} gl={{ antialias:true }}>
        <color attach="background" args={[0.043,0.047,0.055]} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[6,10,4]} intensity={0.6} />
        <pointLight position={[-5,3,-6]} intensity={0.2} color="#7A33FF" />
        <StonePlane />
        <Emblem />
        <OrbitControls enablePan={false} maxPolarAngle={Math.PI/2} />
      </Canvas>
    </div>
  );
}
