/**
 * 🔥 Fire Dragon - Igneous Transformation with Alexander McQueen Aesthetic
 * Computational couture: Savage beauty meets fractal flame algorithms
 */

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { ELEMENTS } from '../ElementalCore';

export function FireDragon({ fusionData = null, intensity = 1.0 }) {
  const element = fusionData || ELEMENTS.FIRE;
  const particlesRef = useRef<THREE.Points>(null);
  const flameSystemRef = useRef<THREE.Group>(null);
  const count = Math.floor(element.visual.particleCount * intensity);
  
  const [positions, colors, scales, lifetimes] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const scl = new Float32Array(count);
    const life = new Float32Array(count);
    
    // McQueen dramatic color palette
    const primaryColor = new THREE.Color(element.colors.primary);   // Dramatic red
    const secondaryColor = new THREE.Color(element.colors.secondary); // Golden yellow
    const accentColor = new THREE.Color(element.colors.accent);      // Pure white
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Create fractal flame structure - McQueen's dramatic silhouettes
      const angle = (i / count) * Math.PI * 8;
      const spiralRadius = Math.pow(i / count, 0.5) * 2;
      const height = (i / count) * 4;
      
      // Chaotic flame positioning with mathematical beauty
      const chaos = element.physics.volatility * (Math.random() - 0.5) * 0.5;
      pos[i3] = Math.cos(angle) * spiralRadius + chaos;
      pos[i3 + 1] = height + Math.sin(angle * 3) * 0.3;
      pos[i3 + 2] = Math.sin(angle) * spiralRadius + chaos;
      
      // Temperature-based coloring (McQueen's color evolution)
      const temperatureMix = Math.pow(i / count, 1.5); // Non-linear for dramatic effect
      const volatilityMix = Math.random() * element.physics.volatility;
      
      let color = new THREE.Color();
      
      if (temperatureMix < 0.2) {
        // Core fire - white hot
        color.lerpColors(accentColor, secondaryColor, volatilityMix);
      } else if (temperatureMix < 0.6) {
        // Mid flame - golden
        color.lerpColors(secondaryColor, primaryColor, (temperatureMix - 0.2) / 0.4);
      } else {
        // Outer flame - deep red with ember effect
        const emberColor = primaryColor.clone().multiplyScalar(0.4 + volatilityMix * 0.3);
        color.copy(emberColor);
      }
      
      col[i3] = color.r;
      col[i3 + 1] = color.g;
      col[i3 + 2] = color.b;
      
      // Scale and lifetime for particle system
      scl[i] = 0.02 + Math.random() * 0.08;
      life[i] = Math.random(); // Random initial lifetime phase
    }
    
    return [pos, col, scl, life];
  }, [count, element]);
  
  // McQueen inspired flame material with dramatic lighting
  const flameMaterial = useMemo(() => {
    return new THREE.PointsMaterial({
      size: 0.1 * element.visual.luminosity,
      transparent: true,
      opacity: 0.8,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      alphaTest: 0.1
    });
  }, [element]);
  
  useFrame(({ clock }) => {
    if (!particlesRef.current) return;
    
    const pos = particlesRef.current.geometry.attributes.position.array as Float32Array;
    const col = particlesRef.current.geometry.attributes.color.array as Float32Array;
    const time = clock.elapsedTime;
    
    // Sophisticated flame dynamics
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      const x = pos[i3];
      const y = pos[i3 + 1];
      const z = pos[i3 + 2];
      
      // Fractal flame algorithm - creates McQueen-like dramatic shapes
      const flameFunction1 = Math.sin(x * 2 + time * 2) * Math.cos(z * 2) * 0.03;
      const flameFunction2 = Math.sin(y * 1.5 + time * 1.5) * 0.02;
      const flameFunction3 = Math.cos((x + z) * 1.8 + time * 2.5) * 0.025;
      
      // Turbulence with high volatility for dramatic movement
      const turbulence = element.physics.volatility * 0.02;
      const turbX = (Math.random() - 0.5) * turbulence;
      const turbY = Math.random() * turbulence * 2; // Upward bias for flames
      const turbZ = (Math.random() - 0.5) * turbulence;
      
      // Apply flame dynamics
      pos[i3] += flameFunction1 + turbX;
      pos[i3 + 1] += flameFunction2 + turbY;
      pos[i3 + 2] += flameFunction3 + turbZ;
      
      // Temperature decay as flames rise (McQueen's color evolution)
      const heightFactor = Math.max(0, (5 - y) / 5);
      const temperatureFactor = heightFactor * element.physics.temperature;
      
      // Dynamic color evolution
      const primaryColor = new THREE.Color(element.colors.primary);
      const secondaryColor = new THREE.Color(element.colors.secondary);
      const accentColor = new THREE.Color(element.colors.accent);
      
      let currentColor = new THREE.Color(col[i3], col[i3 + 1], col[i3 + 2]);
      
      if (temperatureFactor > 0.8) {
        // White hot core
        currentColor.lerp(accentColor, 0.05);
      } else if (temperatureFactor > 0.5) {
        // Golden flame
        currentColor.lerp(secondaryColor, 0.03);
      } else {
        // Cooling to red/ember
        currentColor.lerp(primaryColor, 0.02);
        currentColor.multiplyScalar(0.98); // Gradual dimming
      }
      
      col[i3] = currentColor.r;
      col[i3 + 1] = currentColor.g;
      col[i3 + 2] = currentColor.b;
      
      // Reset particles that have burned out or moved too far
      if (y > 6 || (currentColor.r + currentColor.g + currentColor.b) < 0.1) {
        // Respawn at base with fresh energy
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * 0.5;
        
        pos[i3] = Math.cos(angle) * radius;
        pos[i3 + 1] = 0;
        pos[i3 + 2] = Math.sin(angle) * radius;
        
        // Reset to hot core color
        col[i3] = accentColor.r;
        col[i3 + 1] = accentColor.g;
        col[i3 + 2] = accentColor.b;
      }
    }
    
    particlesRef.current.geometry.attributes.position.needsUpdate = true;
    particlesRef.current.geometry.attributes.color.needsUpdate = true;
  });
  
  return (
    <group ref={flameSystemRef}>
      <points ref={particlesRef} material={flameMaterial}>
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
    </group>
  );
}

// Companion component for flame base/core
export function FlameCore({ element = ELEMENTS.FIRE }) {
  const coreRef = useRef<THREE.Mesh>(null);
  
  // Create dramatic core geometry
  const geometry = useMemo(() => {
    return new THREE.SphereGeometry(0.3, 16, 8);
  }, []);
  
  // McQueen inspired core material - molten metal aesthetic
  const material = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: element.colors.secondary,
      emissive: element.colors.primary,
      emissiveIntensity: element.visual.luminosity,
      metalness: 0.9,
      roughness: 0.1,
    });
  }, [element]);
  
  useFrame(({ clock }) => {
    if (!coreRef.current) return;
    
    const time = clock.elapsedTime;
    
    // Pulsing core like a beating heart
    const pulse = 1 + Math.sin(time * 4) * 0.2 * element.physics.volatility;
    coreRef.current.scale.setScalar(pulse);
    
    // Rotation for dynamic energy
    coreRef.current.rotation.y = time * 0.5;
    coreRef.current.rotation.x = Math.sin(time * 0.3) * 0.2;
  });
  
  return (
    <mesh ref={coreRef} geometry={geometry} material={material} />
  );
}

// Heat distortion effect for atmospheric realism
export function HeatDistortion({ element = ELEMENTS.FIRE }) {
  const distortionRef = useRef<THREE.Mesh>(null);
  
  const geometry = useMemo(() => {
    return new THREE.PlaneGeometry(4, 6, 32, 32);
  }, []);
  
  const material = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      transparent: true,
      opacity: 0.1,
      side: THREE.DoubleSide,
    });
  }, []);
  
  useFrame(({ clock }) => {
    if (!distortionRef.current) return;
    
    const time = clock.elapsedTime;
    const positions = distortionRef.current.geometry.attributes.position.array as Float32Array;
    
    // Create heat shimmer effect
    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i];
      const y = positions[i + 1];
      
      const distortion = Math.sin(y * 2 + time * 3) * Math.sin(x * 1.5 + time * 2) * 0.05;
      positions[i] += distortion * element.physics.temperature;
    }
    
    distortionRef.current.geometry.attributes.position.needsUpdate = true;
  });
  
  return (
    <mesh ref={distortionRef} geometry={geometry} material={material} />
  );
}

export default FireDragon;