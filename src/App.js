import React from "react"
import { Canvas } from "react-three-fiber"
import { ContactShadows, Environment, OrbitControls } from "drei"

import { Provider } from "react-redux"
import { store } from "./redux/store"

import { Shoe } from "./components/Shoe"
import { Picker } from "./components/Picker"

export default function App() {
  return (
    <>
      <Canvas concurrent pixelRatio={[1, 1.5]} camera={{ position: [0, 0, 2.75] }}>
        <ambientLight intensity={0.3} />
        <spotLight intensity={0.3} angle={0.1} penumbra={1} position={[5, 25, 20]} />
        <React.Suspense fallback={null}>
          <Provider store={store}>
            <Shoe />
          </Provider>
          <Environment files="resources/royal_esplanade_1k.hdr" />
          <ContactShadows rotation-x={Math.PI / 2} position={[0, -0.8, 0]} opacity={0.25} width={10} height={10} blur={2} far={1} />
        </React.Suspense>
        <OrbitControls minPolarAngle={Math.PI / 2} maxPolarAngle={Math.PI / 2} enableZoom={true} enablePan={false} />
      </Canvas>
      <Picker />
    </>
  )
}
