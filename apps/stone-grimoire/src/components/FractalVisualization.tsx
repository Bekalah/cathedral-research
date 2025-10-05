import React, { useRef, useEffect, useState } from 'react'
import * as THREE from 'three'

interface FractalVisualizationProps {
  fractalDepth?: number
  colorScheme?: 'purple' | 'gold' | 'mystical'
  animationSpeed?: number
  onFractalUpdate?: (data: any) => void
}

export const FractalVisualization: React.FC<FractalVisualizationProps> = ({
  fractalDepth = 3,
  colorScheme = 'mystical',
  animationSpeed = 1.0,
  onFractalUpdate
}) => {
  const mountRef = useRef<HTMLDivElement>(null)
  const [isRendering, setIsRendering] = useState(false)
  const sceneRef = useRef<THREE.Scene>()
  const rendererRef = useRef<THREE.WebGLRenderer>()
  const cameraRef = useRef<THREE.PerspectiveCamera>()

  useEffect(() => {
    if (!mountRef.current) return

    // Initialize Three.js scene
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    
    renderer.setSize(400, 400)
    renderer.setClearColor(0x000000, 0.1)
    mountRef.current.appendChild(renderer.domElement)

    // Create fractal geometry
    const geometry = new THREE.BoxGeometry(1, 1, 1)
    const material = new THREE.MeshBasicMaterial({ 
      color: colorScheme === 'purple' ? 0x8B5CF6 : 
             colorScheme === 'gold' ? 0xFFD700 : 
             0xFF69B4,
      wireframe: true 
    })

    const fractals: THREE.Mesh[] = []
    
    // Generate fractal structure
    const generateFractal = (depth: number, position: THREE.Vector3, scale: number) => {
      if (depth <= 0) return

      const cube = new THREE.Mesh(geometry, material)
      cube.position.copy(position)
      cube.scale.setScalar(scale)
      scene.add(cube)
      fractals.push(cube)

      if (depth > 1) {
        const newScale = scale * 0.5
        const offset = scale * 1.5
        
        // Create child fractals
        generateFractal(depth - 1, position.clone().add(new THREE.Vector3(offset, 0, 0)), newScale)
        generateFractal(depth - 1, position.clone().add(new THREE.Vector3(-offset, 0, 0)), newScale)
        generateFractal(depth - 1, position.clone().add(new THREE.Vector3(0, offset, 0)), newScale)
        generateFractal(depth - 1, position.clone().add(new THREE.Vector3(0, -offset, 0)), newScale)
      }
    }

    generateFractal(fractalDepth, new THREE.Vector3(0, 0, 0), 1)

    camera.position.z = 5
    sceneRef.current = scene
    rendererRef.current = renderer
    cameraRef.current = camera

    // Animation loop
    let animationId: number
    const animate = () => {
      animationId = requestAnimationFrame(animate)
      
      // Rotate fractals
      fractals.forEach((fractal, index) => {
        fractal.rotation.x += 0.01 * animationSpeed
        fractal.rotation.y += 0.01 * animationSpeed * (1 + index * 0.1)
      })

      renderer.render(scene, camera)
      setIsRendering(true)
    }
    animate()

    return () => {
      if (animationId) cancelAnimationFrame(animationId)
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement)
      }
      renderer.dispose()
      setIsRendering(false)
    }
  }, [fractalDepth, colorScheme, animationSpeed])

  return (
    <div className="fractal-visualization p-4 border border-purple-500 rounded-lg bg-black/50">
      <h3 className="text-purple-300 text-lg mb-4">Fractal Visualization</h3>
      <div ref={mountRef} className="w-full flex justify-center" />
      <div className="mt-2 text-sm text-purple-400">
        Depth: {fractalDepth} | Status: {isRendering ? 'Rendering' : 'Stopped'}
      </div>
    </div>
  )
}

export default FractalVisualization