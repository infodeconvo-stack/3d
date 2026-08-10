// groundOffset = measured local-space min.y (how far each car's wheel-bottom sits
// above its own origin); used to rest the car exactly on the room floor.
// frontSign = which local-Z direction is the front of the car (1 or -1); verified visually per model.
export const CAR_MODELS = [
  { id: 'sedan', label: 'Sedan', file: 'sedan.glb', paintMaterial: 'sedan_paint', groundOffset: 0.136, frontSign: 1 },
  { id: 'sport', label: 'Sports Car', file: 'sport.glb', paintMaterial: 'sport_paint', groundOffset: 0.127, frontSign: -1 },
  { id: 'small-suv', label: 'Small SUV', file: 'small SUV.glb', paintMaterial: 'small SUV_paint', groundOffset: 0.132, frontSign: -1 },
  { id: 'large-suv', label: 'Large SUV', file: 'Large SUV.glb', paintMaterial: 'Large SUV_paint', groundOffset: 0.135, frontSign: -1 },
  { id: '2-door', label: '2-Door Coupe', file: '2 door standard.glb', paintMaterial: '2 door standard_paint', groundOffset: 0.139, frontSign: -1 },
  { id: 'truck', label: 'Truck', file: 'truck.glb', paintMaterial: 'truck_paint', groundOffset: 0.130, frontSign: -1 },
]

export function modelUrl(file) {
  return `/models/${encodeURIComponent(file)}`
}
