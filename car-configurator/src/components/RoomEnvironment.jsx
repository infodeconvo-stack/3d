import { useMemo } from 'react'
import { useGLTF } from '@react-three/drei'
import { ROOM } from '../data/room'

const ROOM_URL = `/models/${encodeURIComponent(ROOM.file)}`

export default function RoomEnvironment() {
  const { scene } = useGLTF(ROOM_URL)

  const clonedScene = useMemo(() => {
    const clone = scene.clone(true)
    clone.traverse((child) => {
      if (child.isMesh) {
        child.receiveShadow = true
        child.castShadow = true
      }
    })
    return clone
  }, [scene])

  return (
    <primitive
      object={clonedScene}
      position={[ROOM.offsetLocal.x * ROOM.scale, 0, ROOM.offsetLocal.z * ROOM.scale]}
      scale={ROOM.scale}
    />
  )
}

useGLTF.preload(ROOM_URL)
