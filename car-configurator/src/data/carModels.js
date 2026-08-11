// groundOffset = measured local-space min.y (how far each car's wheel-bottom sits
// above its own origin); used to rest the car exactly on the room floor.
export const CAR_MODELS = [
  { id: 'sedan', label: 'Sedan', file: 'sedan.glb', paintMaterial: 'sedan_paint', groundOffset: 0.136 },
  { id: 'sport', label: 'Sports Car', file: 'sport.glb', paintMaterial: 'sport_paint', groundOffset: 0.127 },
  { id: 'small-suv', label: 'Small SUV', file: 'small SUV.glb', paintMaterial: 'small SUV_paint', groundOffset: 0.132 },
  { id: 'large-suv', label: 'Large SUV', file: 'Large SUV.glb', paintMaterial: 'Large SUV_paint', groundOffset: 0.135 },
  { id: '2-door', label: '2-Door Coupe', file: '2 door standard.glb', paintMaterial: '2 door standard_paint', groundOffset: 0.139 },
  { id: 'truck', label: 'Truck', file: 'truck.glb', paintMaterial: 'truck_paint', groundOffset: 0.130 },
]

export function modelUrl(file) {
  return `/models/${encodeURIComponent(file)}`
}
