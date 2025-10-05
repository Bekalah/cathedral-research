import React, { useRef, useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { mysticalCrossReference } from '../../../../src/services/mystical-cross-reference.js';

const MysticalVisualization = ({ synthesis, activeRealm }) => {
  const groupRef = useRef();
  const particlesRef = useRef();
  const geometryRef = useRef();

  // Generate mystical geometry based on synthesis and tarot data
  const mysticalGeometry = useMemo(() => {
    if (!synthesis) return null;

    // Use cross-reference engine to find related mystical elements
    const relatedCards = synthesis.tarotCards ?
      synthesis.tarotCards.map(card => mysticalCrossReference.tarotIndex.get(card)).filter(Boolean) :
      [];

    return generateMysticalGeometry(synthesis, relatedCards, activeRealm);
  }, [synthesis, activeRealm]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
      groupRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.3) * 0.2;
    }

    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      particlesRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }

    if (geometryRef.current) {
      // Animate individual geometry elements based on their mystical properties
      geometryRef.current.children.forEach((child, index) => {
        if (child.userData.mystical) {
          const { frequency, phase } = child.userData.mystical;
          child.rotation.y = Math.sin(state.clock.elapsedTime * frequency + phase) * 0.5;
          child.position.y = Math.sin(state.clock.elapsedTime * frequency * 0.5 + phase) * 0.2;
        }
      });
    }
  });

  if (!synthesis && !mysticalGeometry) {
    return null;
  }

  return (
    <group ref={groupRef}>
      {/* Enhanced mystical geometry with tarot integration */}
      <group ref={geometryRef}>
        {mysticalGeometry && renderEnhancedSacredGeometry(mysticalGeometry)}
      </group>

      {/* Mystical particle field */}
      <group ref={particlesRef}>
        <MysticalParticleField
          synthesis={synthesis}
          mysticalData={mysticalGeometry}
          count={1500}
        />
      </group>

      {/* Sacred geometry connections */}
      {mysticalGeometry && (
        <SacredGeometryConnections geometry={mysticalGeometry} />
      )}

      {/* Tarot card manifestations */}
      {mysticalGeometry?.tarotCards && (
        <TarotCardManifestations cards={mysticalGeometry.tarotCards} />
      )}
    </group>
  );

  function renderSacredGeometry(synthesis) {
    const geometries = [];

    if (synthesis.geometry) {
      synthesis.geometry.forEach((geo, index) => {
        geometries.push(
          <mesh key={index} position={[geo.position?.x || 0, geo.position?.y || 0, geo.position?.z || 0]}>
            {renderGeometryType(geo)}
            <meshPhysicalMaterial
              color={geo.material?.color || 0x88ccff}
              metalness={geo.material?.metalness || 0.1}
              roughness={geo.material?.roughness || 0.3}
              transparent={geo.material?.transparent || false}
              opacity={geo.material?.opacity || 1.0}
              emissive={geo.material?.emissive || 0x000000}
            />
          </mesh>
        );
      });
    }

    return geometries;
  }

  function renderGeometryType(geo) {
    switch (geo.type) {
      case 'sphere':
        return <sphereGeometry args={[geo.radius || 1, 32, 32]} />;
      case 'circle':
        return <circleGeometry args={[geo.radius || 1, 32]} />;
      case 'triangle':
        return <coneGeometry args={[geo.scale || 1, geo.scale || 1, 3]} />;
      case 'platonic':
        return renderPlatonicSolid(geo);
      case 'metatron':
        return <octahedronGeometry args={[1.5, 1]} />;
      case 'flower-of-life':
        return renderFlowerOfLife(geo);
      default:
        return <octahedronGeometry args={[1, 0]} />;
    }
  }

  function renderPlatonicSolid(geo) {
    switch (geo.solid) {
      case 'tetrahedron':
        return <tetrahedronGeometry args={[geo.size || 1]} />;
      case 'cube':
        return <boxGeometry args={[geo.size || 1, geo.size || 1, geo.size || 1]} />;
      case 'octahedron':
        return <octahedronGeometry args={[geo.size || 1, 0]} />;
      case 'icosahedron':
        return <icosahedronGeometry args={[geo.size || 1, 0]} />;
      case 'dodecahedron':
        return <dodecahedronGeometry args={[geo.size || 1, 0]} />;
      default:
        return <octahedronGeometry args={[geo.size || 1, 0]} />;
    }
  }

  function renderFlowerOfLife(geo) {
    // Create multiple circles in Flower of Life pattern
    const circles = [];
    const radius = geo.radius || 1;
    const positions = [
      [0, 0, 0], [radius * 2, 0, 0], [radius, radius * 1.732, 0],
      [-radius, radius * 1.732, 0], [-radius * 2, 0, 0],
      [-radius, -radius * 1.732, 0], [radius, -radius * 1.732, 0]
    ];

    positions.forEach((pos, index) => {
      circles.push(
        <mesh key={index} position={pos}>
          <circleGeometry args={[radius, 32]} />
          <meshBasicMaterial color={geo.color || 0x88ccff} transparent opacity={0.3} />
        </mesh>
      );
    });

    return circles;
  }
};

const ParticleField = ({ count, colors, energy }) => {
  const pointsRef = useRef();

  useFrame((state) => {
    if (pointsRef.current) {
      const positions = pointsRef.current.geometry.attributes.position.array;

      for (let i = 0; i < positions.length; i += 3) {
        const i3 = i / 3;
        positions[i] += Math.sin(state.clock.elapsedTime + i3 * 0.01) * 0.001;
        positions[i + 1] += Math.cos(state.clock.elapsedTime + i3 * 0.01) * 0.001;
        positions[i + 2] += Math.sin(state.clock.elapsedTime * 0.5 + i3 * 0.01) * 0.001;
      }

      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  const particles = React.useMemo(() => {
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 10;
      positions[i + 1] = (Math.random() - 0.5) * 10;
      positions[i + 2] = (Math.random() - 0.5) * 10;
    }

    return positions;
  }, [count]);

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color={colors[0]}
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

const EnergyConnections = ({ elements }) => {
  const linesRef = useRef();

  useFrame((state) => {
    if (linesRef.current) {
      const positions = linesRef.current.geometry.attributes.position.array;

      for (let i = 0; i < positions.length; i += 3) {
        positions[i] += Math.sin(state.clock.elapsedTime * 2) * 0.01;
        positions[i + 1] += Math.cos(state.clock.elapsedTime * 1.5) * 0.01;
      }

      linesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  const connections = React.useMemo(() => {
    const lines = [];

    for (let i = 0; i < elements.length - 1; i++) {
      for (let j = i + 1; j < elements.length; j++) {
        lines.push({
          start: [i * 2 - 2, 0, 0],
          end: [j * 2 - 2, 0, 0]
        });
      }
    }

    return lines;
  }, [elements]);

  return (
    <group ref={linesRef}>
      {connections.map((connection, index) => (
        <line key={index}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={2}
              array={new Float32Array([...connection.start, ...connection.end])}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial color={0xffffff} transparent opacity={0.3} />
        </line>
      ))}
    </group>
  );
};

/**
 * Generate mystical geometry based on synthesis and tarot data
 */
function generateMysticalGeometry(synthesis, relatedCards, activeRealm) {
  const geometry = {
    primary: [],
    secondary: [],
    connections: [],
    tarotCards: relatedCards,
    frequencies: []
  };

  // Generate primary sacred geometry based on synthesis type
  if (synthesis.type === 'fusion-kink') {
    geometry.primary.push({
      type: 'metatron',
      position: [0, 0, 0],
      scale: 1.5,
      material: {
        color: 0x88ccff,
        metalness: 0.3,
        roughness: 0.2,
        emissive: 0x001122
      },
      mystical: {
        frequency: 0.5,
        phase: 0
      }
    });
  } else if (synthesis.type === 'sacred-geometry') {
    geometry.primary.push({
      type: 'flower-of-life',
      position: [0, 0, 0],
      radius: 2,
      color: 0xff69b4,
      mystical: {
        frequency: 0.3,
        phase: Math.PI / 2
      }
    });
  }

  // Add tarot-related geometry
  if (relatedCards && relatedCards.length > 0) {
    relatedCards.forEach((card, index) => {
      const angle = (index / relatedCards.length) * Math.PI * 2;
      const radius = 3;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;

      // Add platonic solid based on card element
      const platonicMapping = {
        fire: 'tetrahedron',
        earth: 'cube',
        air: 'octahedron',
        water: 'icosahedron'
      };

      geometry.secondary.push({
        type: 'platonic',
        solid: platonicMapping[card.element] || 'octahedron',
        position: [x, 0, z],
        size: 0.8,
        material: {
          color: card.ray?.color ? parseInt(card.ray.color.replace('#', ''), 16) : 0x88ccff,
          metalness: 0.5,
          roughness: 0.1,
          emissive: 0x001122
        },
        mystical: {
          frequency: card.crystal?.frequency ? card.crystal.frequency / 1000 : 0.4,
          phase: angle
        }
      });

      // Add frequency data
      if (card.crystal?.frequency) {
        geometry.frequencies.push({
          frequency: card.crystal.frequency,
          position: [x, 0, z],
          color: card.ray?.color ? parseInt(card.ray.color.replace('#', ''), 16) : 0x88ccff
        });
      }
    });
  }

  return geometry;
}

/**
 * Render enhanced sacred geometry with mystical properties
 */
function renderEnhancedSacredGeometry(mysticalGeometry) {
  const elements = [];

  // Render primary geometry
  mysticalGeometry.primary.forEach((geo, index) => {
    elements.push(
      <mesh
        key={`primary-${index}`}
        position={geo.position}
        scale={geo.scale || 1}
        userData={{ mystical: geo.mystical }}
      >
        {renderGeometryType(geo)}
        <meshPhysicalMaterial
          color={geo.material?.color || 0x88ccff}
          metalness={geo.material?.metalness || 0.1}
          roughness={geo.material?.roughness || 0.3}
          transparent={geo.material?.transparent || false}
          opacity={geo.material?.opacity || 1.0}
          emissive={geo.material?.emissive || 0x000000}
        />
      </mesh>
    );
  });

  // Render secondary geometry
  mysticalGeometry.secondary.forEach((geo, index) => {
    elements.push(
      <mesh
        key={`secondary-${index}`}
        position={geo.position}
        scale={geo.scale || 1}
        userData={{ mystical: geo.mystical }}
      >
        {renderGeometryType(geo)}
        <meshPhysicalMaterial
          color={geo.material?.color || 0x88ccff}
          metalness={geo.material?.metalness || 0.1}
          roughness={geo.material?.roughness || 0.3}
          transparent={false}
          opacity={1.0}
          emissive={geo.material?.emissive || 0x000000}
        />
      </mesh>
    );
  });

  return elements;
}

/**
 * Enhanced particle field with mystical properties
 */
const MysticalParticleField = ({ synthesis, mysticalData, count }) => {
  const pointsRef = useRef();

  useFrame((state) => {
    if (pointsRef.current) {
      const positions = pointsRef.current.geometry.attributes.position.array;

      for (let i = 0; i < positions.length; i += 3) {
        const i3 = i / 3;
        const time = state.clock.elapsedTime;

        // Create mystical particle motion based on synthesis type
        if (synthesis.type === 'fusion-kink') {
          positions[i] += Math.sin(time * 2 + i3 * 0.01) * 0.002;
          positions[i + 1] += Math.cos(time * 1.5 + i3 * 0.01) * 0.002;
          positions[i + 2] += Math.sin(time * 0.8 + i3 * 0.01) * 0.002;
        } else {
          positions[i] += Math.sin(time + i3 * 0.01) * 0.001;
          positions[i + 1] += Math.cos(time + i3 * 0.01) * 0.001;
          positions[i + 2] += Math.sin(time * 0.5 + i3 * 0.01) * 0.001;
        }
      }

      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  const particles = React.useMemo(() => {
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 15;
      positions[i + 1] = (Math.random() - 0.5) * 15;
      positions[i + 2] = (Math.random() - 0.5) * 15;
    }

    return positions;
  }, [count]);

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color={synthesis.colors?.[0] || 0x88ccff}
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

/**
 * Sacred geometry connections between mystical elements
 */
const SacredGeometryConnections = ({ geometry }) => {
  const linesRef = useRef();

  useFrame((state) => {
    if (linesRef.current) {
      const positions = linesRef.current.geometry.attributes.position.array;

      for (let i = 0; i < positions.length; i += 3) {
        positions[i] += Math.sin(state.clock.elapsedTime * 2) * 0.01;
        positions[i + 1] += Math.cos(state.clock.elapsedTime * 1.5) * 0.01;
      }

      linesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  const connections = React.useMemo(() => {
    const lines = [];

    // Connect primary geometry to secondary elements
    geometry.primary.forEach((primary, pIndex) => {
      geometry.secondary.forEach((secondary, sIndex) => {
        lines.push({
          start: primary.position || [0, 0, 0],
          end: secondary.position,
          color: 0x88ccff,
          opacity: 0.4
        });
      });
    });

    return lines;
  }, [geometry]);

  return (
    <group ref={linesRef}>
      {connections.map((connection, index) => (
        <line key={index}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={2}
              array={new Float32Array([...connection.start, ...connection.end])}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial
            color={connection.color}
            transparent
            opacity={connection.opacity}
          />
        </line>
      ))}
    </group>
  );
};

/**
 * Tarot card manifestations as 3D objects
 */
const TarotCardManifestations = ({ cards }) => {
  const cardRef = useRef();

  useFrame((state) => {
    if (cardRef.current) {
      cardRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <group ref={cardRef}>
      {cards.slice(0, 3).map((card, index) => (
        <mesh
          key={card.id}
          position={[
            Math.cos((index / 3) * Math.PI * 2) * 5,
            0,
            Math.sin((index / 3) * Math.PI * 2) * 5
          ]}
        >
          <planeGeometry args={[1.5, 2.5]} />
          <meshBasicMaterial
            color={card.ray?.color ? parseInt(card.ray.color.replace('#', ''), 16) : 0x88ccff}
            transparent
            opacity={0.7}
          />
        </mesh>
      ))}
    </group>
  );
};

export default MysticalVisualization;
