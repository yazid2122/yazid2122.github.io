import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { MeshDistortMaterial } from '@react-three/drei'

export default function NeuralCore() {
  const meshRef = useRef()

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    if (meshRef.current) {
      meshRef.current.rotation.x = time * 0.1
      meshRef.current.rotation.y = time * 0.15
      // Gentle floating animation without tracking the mouse
      meshRef.current.position.y = Math.sin(time * 0.5) * 0.2
    }
  })

  return (
    <group>
      <mesh ref={meshRef} position={[0, 0, 0]} scale={1.8}>
        {/* Sleek, organized geometric shape */}
        <icosahedronGeometry args={[2, 3]} />
        {/* Elegant glass/metal material */}
        <MeshDistortMaterial
          color="#0a0a0a"
          envMapIntensity={1}
          clearcoat={1}
          clearcoatRoughness={0.1}
          metalness={0.9}
          roughness={0.2}
          distort={0.3}
          speed={1.5}
        />
        {/* Crisp wireframe overlay to signify 'development/structure' */}
        <mesh>
          <icosahedronGeometry args={[2.01, 3]} />
          <meshBasicMaterial 
            color="#00ff9f" 
            wireframe={true} 
            transparent={true} 
            opacity={0.15} 
          />
        </mesh>
      </mesh>
    </group>
  )
}
