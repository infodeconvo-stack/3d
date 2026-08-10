import { useEffect, useMemo } from 'react'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

const FINISH_ROUGHNESS = {
  Gloss: 0.15,
  Satin: 0.45,
  Matte: 0.85,
}

const BLEND_FRACTION = 0.16 // portion of the car's length used as the front/rear fade zone

// local-space Z extent of the whole car (all meshes share one coordinate frame),
// used so the 50/50 split lines up with the car's actual length, not just the painted panels
function computeOverallZRange(root) {
  let minZ = Infinity
  let maxZ = -Infinity
  root.traverse((child) => {
    if (!child.isMesh) return
    child.geometry.computeBoundingBox()
    const box = child.geometry.boundingBox
    if (box.min.z < minZ) minZ = box.min.z
    if (box.max.z > maxZ) maxZ = box.max.z
  })
  return { minZ, maxZ }
}

// paints the mesh with a smooth front-to-rear gradient via per-vertex colors,
// instead of a hard triangle-level split (which produces a jagged seam)
function applyGradient(mesh, frontSign, frontColorHex, rearColorHex, zRange) {
  const { minZ, maxZ } = zRange
  const thresholdZ = (minZ + maxZ) / 2
  const blendWidth = Math.max((maxZ - minZ) * BLEND_FRACTION, 1e-4)

  const geom = mesh.geometry
  const posAttr = geom.attributes.position
  const count = posAttr.count

  let colorAttr = geom.getAttribute('color')
  if (!colorAttr || colorAttr.count !== count) {
    colorAttr = new THREE.BufferAttribute(new Float32Array(count * 3), 3)
    geom.setAttribute('color', colorAttr)
  }

  const front = new THREE.Color(frontColorHex)
  const rear = new THREE.Color(rearColorHex)
  const blended = new THREE.Color()

  for (let i = 0; i < count; i++) {
    const z = posAttr.getZ(i)
    const towardFront = frontSign > 0 ? z - thresholdZ : thresholdZ - z
    const t = THREE.MathUtils.clamp(0.5 - towardFront / (2 * blendWidth), 0, 1)
    blended.copy(front).lerp(rear, t)
    colorAttr.setXYZ(i, blended.r, blended.g, blended.b)
  }
  colorAttr.needsUpdate = true

  mesh.material.vertexColors = true
  mesh.material.color.set(0xffffff)
  mesh.material.needsUpdate = true
}

export default function CarModel({
  modelUrl,
  frontColor,
  rearColor,
  fadeFinish,
  paintMaterialName,
  frontSign = -1,
  onPartsDiscovered,
  ...props
}) {
  const { scene } = useGLTF(modelUrl)

  const { clonedScene, paintMesh, zRange } = useMemo(() => {
    const clone = scene.clone(true)
    let paint = null

    clone.traverse((child) => {
      if (!child.isMesh) return
      child.castShadow = true
      child.receiveShadow = true
      child.material = child.material.clone()
      if (child.material.name === paintMaterialName) paint = child
    })

    return { clonedScene: clone, paintMesh: paint, zRange: computeOverallZRange(clone) }
  }, [scene, paintMaterialName])

  useEffect(() => {
    const names = []
    clonedScene.traverse((child) => {
      if (child.isMesh) names.push(child.material?.name || child.name || 'unnamed')
    })
    onPartsDiscovered?.(names)
  }, [clonedScene, onPartsDiscovered])

  useEffect(() => {
    if (paintMesh) applyGradient(paintMesh, frontSign, frontColor, rearColor, zRange)
  }, [paintMesh, frontSign, frontColor, rearColor, zRange])

  useEffect(() => {
    const roughness = FINISH_ROUGHNESS[fadeFinish] ?? FINISH_ROUGHNESS.Gloss
    if (paintMesh?.material && 'roughness' in paintMesh.material) {
      paintMesh.material.roughness = roughness
      paintMesh.material.needsUpdate = true
    }
  }, [paintMesh, fadeFinish])

  return <primitive object={clonedScene} {...props} />
}
