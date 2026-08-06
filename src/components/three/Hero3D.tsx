import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import type { Group } from 'three'
import { useReducedMotion } from '@/lib/motion'

/**
 * The vehicle is still secret, so the hero doesn't render one. Instead: an
 * abstract red wireframe shell around a black core — a shape, not a product —
 * that slowly turns and drifts toward the cursor.
 */
function Shape({ reduced }: { reduced: boolean }) {
  const group = useRef<Group>(null)
  const pointer = useRef({ x: 0, y: 0 })

  useFrame((state, delta) => {
    if (!group.current) return
    if (!reduced) {
      group.current.rotation.y += delta * 0.18
      group.current.rotation.x += delta * 0.05
    }
    pointer.current.x = state.pointer.x
    pointer.current.y = state.pointer.y
    const targetY = group.current.rotation.y + pointer.current.x * 0.25
    const targetX = pointer.current.y * -0.15
    group.current.rotation.y += (targetY - group.current.rotation.y) * 0.02
    group.current.rotation.x += (targetX - group.current.rotation.x) * 0.02
  })

  return (
    <group ref={group}>
      <mesh scale={1.85}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial color="#E5091E" wireframe transparent opacity={0.85} />
      </mesh>
      <mesh scale={1.15}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial color="#0A0A0A" roughness={0.35} metalness={0.2} />
      </mesh>
    </group>
  )
}

export function Hero3D({ className }: { className?: string }) {
  const reduced = useReducedMotion()

  return (
    <div className={className} aria-hidden="true" style={{ width: '100%', height: '100%' }}>
      <Canvas
        gl={{ alpha: true, antialias: true }}
        camera={{ position: [0, 0, 4.4], fov: 45 }}
        dpr={[1, 1.75]}
        resize={{ scroll: false, debounce: 0 }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[3, 4, 5]} intensity={1.1} />
        <directionalLight position={[-4, -2, -3]} intensity={0.35} color="#E5091E" />
        <Suspense fallback={null}>
          <Shape reduced={reduced} />
        </Suspense>
      </Canvas>
    </div>
  )
}
