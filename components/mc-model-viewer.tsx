"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, useGLTF } from "@react-three/drei"
import { useEffect, Suspense } from "react"
import * as THREE from "three"

function McScene() {
  const { scene } = useGLTF("/models/maoyue.glb")

  useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material = new THREE.MeshStandardMaterial({
          color: 0xffffff,
          roughness: 0.8,
          metalness: 0.0,
        })
      }
    })
  }, [scene])

  return <primitive object={scene} />
}

interface McModelViewerProps {
  className?: string
}

export default function McModelViewer({ className }: McModelViewerProps) {
  return (
    <div className={className}>
      <Canvas
        camera={{ position: [25, 25, 25], fov: 40 }}
        gl={{ antialias: false }}
        dpr={[1, 1.5]}
        performance={{ min: 0.5 }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 15, 10]} intensity={1.2} />
        <directionalLight position={[-5, 5, -5]} intensity={0.4} />
        <Suspense fallback={null}>
          <McScene />
        </Suspense>
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2.5}
        />
      </Canvas>
    </div>
  )
}