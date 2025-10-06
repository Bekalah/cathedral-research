/**
 * 🌊 Water Dragon - Fluid Simulation with Iris van Herpen Aesthetic
 * Computational couture: Bio-mimetic water patterns with sophisticated physics
 */

import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { ELEMENTS } from '../ElementalCore';

export function WaterDragon({ fusionData = null, intensity = 1.0 }) {
  const element = fusionData || ELEMENTS.WATER;
  const particlesRef = useRef<THREE.Points>(null);
  const velocitiesRef = useRef<Float32Array>(null!);
  const count = Math.floor(element.visual.particleCount * intensity);
  
  const [positions, colors, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    
    // Sophisticated color palette from element signature
    const primaryColor = new THREE.Color(element.colors.primary);
    const secondaryColor = new THREE.Color(element.colors.secondary);
    const accentColor = new THREE.Color(element.colors.accent);
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Iris van Herpen inspired flowing wave formation
      const wave = (i / count) * Math.PI * 4;
      const radius = 2 + Math.sin(wave * 3) * 0.8;
      const height = Math.sin(wave * 2) * 1.2;
      
      // Create flowing organic structure
      pos[i3] = Math.cos(wave) * radius + (Math.random() - 0.5) * 0.3;
      pos[i3 + 1] = height + (Math.random() - 0.5) * 0.2;
      pos[i3 + 2] = Math.sin(wave) * radius + (Math.random() - 0.5) * 0.3;
      
      // Sophisticated color gradients like van Herpen's water dresses
      const depthMix = (i / count);
      const flowMix = Math.sin(wave) * 0.5 + 0.5;
      const color = new THREE.Color();
      
      if (depthMix < 0.2) {
        // Surface foam - accent color
        color.lerpColors(accentColor, secondaryColor, flowMix);
      } else if (depthMix < 0.6) {
        // Mid-water - secondary to primary blend
        color.lerpColors(secondaryColor, primaryColor, (depthMix - 0.2) / 0.4);
      } else {
        // Deep water - primary with darkness
        const deepColor = primaryColor.clone().multiplyScalar(0.3 + flowMix * 0.4);
        color.copy(deepColor);
      }
      
      col[i3] = color.r;
      col[i3 + 1] = color.g;
      col[i3 + 2] = color.b;
      
      // Initial velocities for fluid motion
      vel[i3] = (Math.random() - 0.5) * 0.02;
      vel[i3 + 1] = (Math.random() - 0.5) * 0.01;
      vel[i3 + 2] = (Math.random() - 0.5) * 0.02;
    }
    
    velocitiesRef.current = vel;
    return [pos, col, vel];
  }, [count, element]);
  
  // Sophisticated shader material for water-like appearance
  const waterMaterial = useMemo(() => {
    return new THREE.PointsMaterial({
      size: 0.05 * element.visual.luminosity,
      transparent: true,
      opacity: 0.7,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
  }, [element]);
  
  useFrame(({ clock }) => {
    if (!particlesRef.current) return;
    
    const pos = particlesRef.current.geometry.attributes.position.array as Float32Array;
    const col = particlesRef.current.geometry.attributes.color.array as Float32Array;
    const velocities = velocitiesRef.current;
    const time = clock.elapsedTime * element.physics.viscosity;
    
    // Sophisticated fluid dynamics simulation
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      const x = pos[i3];
      const y = pos[i3 + 1];
      const z = pos[i3 + 2];
      
      // Navier-Stokes inspired fluid motion
      // Vorticity (curl of velocity field) - creates realistic swirls
      const vortX = Math.sin(y * 2 + time) * Math.cos(z * 2) * 0.01;
      const vortY = Math.sin(z * 2 + time) * Math.cos(x * 2) * 0.01;
      const vortZ = Math.sin(x * 2 + time) * Math.cos(y * 2) * 0.01;
      
      // Turbulence based on element volatility
      const turbulence = element.physics.volatility * 0.005;
      const turbX = (Math.random() - 0.5) * turbulence;
      const turbY = (Math.random() - 0.5) * turbulence;
      const turbZ = (Math.random() - 0.5) * turbulence;
      
      // Viscosity damping
      const damping = 1.0 - element.physics.viscosity * 0.02;
      
      // Update velocities with fluid dynamics
      velocities[i3] = (velocities[i3] + vortX + turbX) * damping;
      velocities[i3 + 1] = (velocities[i3 + 1] + vortY + turbY) * damping;
      velocities[i3 + 2] = (velocities[i3 + 2] + vortZ + turbZ) * damping;
      
      // Apply velocities to positions
      pos[i3] += velocities[i3];
      pos[i3 + 1] += velocities[i3 + 1];
      pos[i3 + 2] += velocities[i3 + 2];
      
      // Boundary conditions - keep water contained
      const radius = Math.sqrt(x * x + z * z);
      if (radius > 3) {
        // Reflect particles back towards center with smooth transition
        const factor = 0.98;
        pos[i3] *= factor;
        pos[i3 + 2] *= factor;
        velocities[i3] *= -0.5;
        velocities[i3 + 2] *= -0.5;
      }
      
      // Vertical bounds
      if (y > 2) {
        pos[i3 + 1] = 2;
        velocities[i3 + 1] *= -0.3;
      } else if (y < -2) {
        pos[i3 + 1] = -2;
        velocities[i3 + 1] *= -0.3;
      }
      
      // Dynamic color based on movement (Iris van Herpen inspired)
      const speed = Math.sqrt(
        velocities[i3] * velocities[i3] +
        velocities[i3 + 1] * velocities[i3 + 1] +
        velocities[i3 + 2] * velocities[i3 + 2]
      );
      
      const speedFactor = Math.min(speed * 50, 1.0);
      const baseColor = new THREE.Color(
        col[i3],
        col[i3 + 1], 
        col[i3 + 2]
      );
      
      // Add dynamic luminosity based on movement
      const accentColor = new THREE.Color(element.colors.accent);
      baseColor.lerp(accentColor, speedFactor * element.visual.luminosity);
      
      col[i3] = baseColor.r;
      col[i3 + 1] = baseColor.g;
      col[i3 + 2] = baseColor.b;
    }
    
    // Mark attributes as needing update
    particlesRef.current.geometry.attributes.position.needsUpdate = true;
    particlesRef.current.geometry.attributes.color.needsUpdate = true;
  });
  
  return (
    <points ref={particlesRef} material={waterMaterial}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
    </points>
  );
}

// Companion component for water surface effects
export function WaterSurface({ element = ELEMENTS.WATER }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Create sophisticated water surface geometry
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(6, 6, 64, 64);
    return geo;
  }, []);
  
  // Van Herpen inspired surface material
  const material = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: element.colors.primary,
      transparent: true,
      opacity: 0.3,
      metalness: 0.1,
      roughness: 0.1,
      side: THREE.DoubleSide,
    });
  }, [element]);
  
  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    
    const time = clock.elapsedTime;
    const positions = meshRef.current.geometry.attributes.position.array as Float32Array;
    
    // Create realistic water surface waves
    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i];
      const z = positions[i + 2];
      
      // Multiple wave layers for realistic surface
      const wave1 = Math.sin(x * 0.5 + time) * 0.1;
      const wave2 = Math.sin(z * 0.3 + time * 1.2) * 0.05;
      const wave3 = Math.sin((x + z) * 0.4 + time * 0.8) * 0.03;
      
      positions[i + 1] = wave1 + wave2 + wave3;
    }
    
    meshRef.current.geometry.attributes.position.needsUpdate = true;
    meshRef.current.geometry.computeVertexNormals();
  });
  
  return (
    <mesh ref={meshRef} geometry={geometry} material={material} rotation={[-Math.PI / 2, 0, 0]} />
  );
}

export default WaterDragon;