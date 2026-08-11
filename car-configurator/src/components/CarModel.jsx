import { useEffect, useMemo } from 'react'
import { useGLTF } from '@react-three/drei'

const FINISH_ROUGHNESS = {
  Gloss: 0.15,
  Satin: 0.45,
  Matte: 0.85,
}

export default function CarModel({ modelUrl, color, fadeFinish, paintMaterialName, onPartsDiscovered, ...props }) {
  const { scene } = useGLTF(modelUrl)

  const { clonedScene, paintMesh } = useMemo(() => {
    const clone = scene.clone(true)
    let paint = null

    clone.traverse((child) => {
      if (!child.isMesh) return
      child.castShadow = true
      child.receiveShadow = true
      child.material = child.material.clone()
      if (child.material.name === paintMaterialName) paint = child
    })

    return { clonedScene: clone, paintMesh: paint }
  }, [scene, paintMaterialName])

  useEffect(() => {
    const names = []
    clonedScene.traverse((child) => {
      if (child.isMesh) names.push(child.material?.name || child.name || 'unnamed')
    })
    onPartsDiscovered?.(names)
  }, [clonedScene, onPartsDiscovered])

  useEffect(() => {
    if (paintMesh?.material?.color) paintMesh.material.color.set(color)
  }, [paintMesh, color])

  useEffect(() => {
    const roughness = FINISH_ROUGHNESS[fadeFinish] ?? FINISH_ROUGHNESS.Gloss
    if (paintMesh?.material && 'roughness' in paintMesh.material) {
      paintMesh.material.roughness = roughness
      paintMesh.material.needsUpdate = true
    }
  }, [paintMesh, fadeFinish])

  return <primitive object={clonedScene} {...props} />
}
