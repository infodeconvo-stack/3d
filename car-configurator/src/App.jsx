import { useState, useCallback, useMemo, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Html } from '@react-three/drei'
import CarModel from './components/CarModel'
import RoomEnvironment from './components/RoomEnvironment'
import Dropdown from './components/Dropdown'
import ColorStrip from './components/ColorStrip'
import ErrorBoundary from './components/ErrorBoundary'
import { ALL_COLORS } from './data/colorCategories'
import { CAR_MODELS, modelUrl } from './data/carModels'
import { FADE_FINISHES } from './data/fadeFinishes'
import { ROOM, ROOM_FLOOR_Y } from './data/room'
import './App.css'

const DEFAULT_COLOR = ALL_COLORS.find((c) => c.label === 'Reds 7').value
const CAR_TYPE_OPTIONS = CAR_MODELS.map((c) => ({ value: c.id, label: c.label }))

function Loader() {
  return (
    <Html center>
      <div className="loader">Loading…</div>
    </Html>
  )
}

function MissingModel({ file }) {
  return (
    <Html center>
      <div className="loader">
        Model nahi mila.
        <br />
        Check karein: <code>public/models/{file}</code>
      </div>
    </Html>
  )
}

function App() {
  const [carId, setCarId] = useState(CAR_MODELS[0].id)
  const [color, setColor] = useState(DEFAULT_COLOR)
  const [fadeFinish, setFadeFinish] = useState(FADE_FINISHES[0].value)
  const [year, setYear] = useState('')
  const [make, setMake] = useState('')
  const [model, setModel] = useState('')

  const car = useMemo(() => CAR_MODELS.find((c) => c.id === carId), [carId])
  const carPosition = useMemo(() => [0, ROOM_FLOOR_Y - car.groundOffset, 0], [car])

  const handlePartsDiscovered = useCallback(() => {}, [])

  return (
    <div className="page">
      <div className="viewer-hero">
        <Canvas shadows camera={{ position: [0, 2.2, 6.2], fov: 45 }}>
          <hemisphereLight args={['#ffffff', '#3a3a3a', 0.9]} />
          <ambientLight intensity={0.35} />
          <directionalLight
            castShadow
            position={[5, 6, 3]}
            intensity={1.6}
            shadow-mapSize={[1024, 1024]}
            shadow-camera-left={-4}
            shadow-camera-right={4}
            shadow-camera-top={4}
            shadow-camera-bottom={-4}
            shadow-camera-near={1}
            shadow-camera-far={14}
          />
          <directionalLight position={[-5, 4, -3]} intensity={0.5} />

          <ErrorBoundary fallback={<MissingModel file={ROOM.file} />}>
            <Suspense fallback={<Loader />}>
              <RoomEnvironment />
            </Suspense>
          </ErrorBoundary>

          <ErrorBoundary key={car.id} fallback={<MissingModel file={car.file} />}>
            <Suspense fallback={<Loader />}>
              <CarModel
                modelUrl={modelUrl(car.file)}
                color={color}
                fadeFinish={fadeFinish}
                paintMaterialName={car.paintMaterial}
                onPartsDiscovered={handlePartsDiscovered}
                position={carPosition}
              />
            </Suspense>
          </ErrorBoundary>

          <OrbitControls
            makeDefault
            target={[0, 1, 0]}
            enablePan={false}
            minDistance={3.9}
            maxDistance={7.5}
            minPolarAngle={Math.PI * 0.4}
            maxPolarAngle={Math.PI * 0.52}
            autoRotate
            autoRotateSpeed={0.6}
          />
        </Canvas>
      </div>

      <main className="control-bar">
        <aside className="control-sidebar">
          <Dropdown label="Select Vehicle Type" options={CAR_TYPE_OPTIONS} value={carId} onChange={setCarId} />

          <Dropdown label="Fade Finish" options={FADE_FINISHES} value={fadeFinish} onChange={setFadeFinish} />
        </aside>

        <div className="color-strip-wrap">
          <span className="field-label">Select Your Color</span>
          <ColorStrip colors={ALL_COLORS} value={color} onChange={setColor} />

          <div className="vehicle-details">
            <span className="vehicle-details-label">Vehicle Details</span>
            <div className="vehicle-details-grid">
              <div className="field">
                <label className="field-label">Year</label>
                <input
                  type="text"
                  className="text-input"
                  placeholder="e.g. 2021"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                />
              </div>
              <div className="field">
                <label className="field-label">Make</label>
                <input
                  type="text"
                  className="text-input"
                  placeholder="e.g. Toyota"
                  value={make}
                  onChange={(e) => setMake(e.target.value)}
                />
              </div>
              <div className="field">
                <label className="field-label">Model</label>
                <input
                  type="text"
                  className="text-input"
                  placeholder="e.g. Camry"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
