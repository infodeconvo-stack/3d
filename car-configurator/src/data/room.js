export const ROOM = {
  file: 'ENV_02.glb',
  // measured (pre-scale, local) room bbox center was [1.871, ..., -0.039] and floor was at y=-0.034
  floorYLocal: -0.034,
  offsetLocal: { x: -1.871, z: 0.039 },
  // room's tightest wall was only ~3.8 units from center; scale the whole room up
  // so the camera has real breathing room to orbit/zoom without clipping walls
  scale: 2.2,
}

// world-space floor level after the room is scaled up
export const ROOM_FLOOR_Y = ROOM.floorYLocal * ROOM.scale
