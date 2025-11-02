import { Canvas } from '@react-three/fiber';
import { OrbitControls, Grid, Environment, Html } from '@react-three/drei';
import { BIMModel } from './BIMModel';
import { Suspense } from 'react';

interface SceneProps {
  file: File | null;
}

/**
 * Scene Component
 *
 * Sets up the 3D canvas with camera, lighting, controls, and the BIM model.
 * Uses React Three Fiber for rendering and Drei for helper utilities.
 */
export const Scene = ({ file }: SceneProps) => {
  return (
    <div className="flex-1 h-full relative">
      <Canvas
        camera={{
          position: [10, 10, 10],
          fov: 50,
          near: 0.1,
          far: 1000,
        }}
        shadows
      >
        {/* Lighting setup */}
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <directionalLight position={[-10, 10, -5]} intensity={0.3} />

        {/* Environment map for better lighting */}
        <Environment preset="apartment" />

        {/* Grid helper */}
        <Grid
          args={[100, 100]}
          cellSize={1}
          cellThickness={0.5}
          cellColor="#6b7280"
          sectionSize={10}
          sectionThickness={1}
          sectionColor="#374151"
          fadeDistance={100}
          fadeStrength={1}
          followCamera={false}
        />

        {/* Orbit controls for camera manipulation */}
        <OrbitControls
          makeDefault
          enableDamping
          dampingFactor={0.05}
          minDistance={1}
          maxDistance={500}
        />

        {/* BIM Model */}
        <Suspense
          fallback={
            <Html center>
              <div className="bg-white px-6 py-4 rounded-lg shadow-lg">
                <div className="flex items-center space-x-3">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  <p className="text-gray-700 font-medium">Loading BIM model...</p>
                </div>
              </div>
            </Html>
          }
        >
          {file && <BIMModel file={file} />}
        </Suspense>

        {/* Helper axes */}
        <axesHelper args={[5]} />
      </Canvas>

      {/* Instructions overlay */}
      {!file && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="bg-white/90 px-8 py-6 rounded-lg shadow-lg max-w-md">
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Welcome to 3D Model Viewer
            </h3>
            <p className="text-gray-600 mb-4">
              Upload a 3D model using the panel on the right to visualize it.
            </p>
            <div className="text-sm text-gray-500 mb-4">
              <p className="font-semibold mb-2">Controls:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Left click + drag: Rotate view</li>
                <li>Right click + drag: Pan view</li>
                <li>Scroll: Zoom in/out</li>
              </ul>
            </div>
            <div className="text-xs text-blue-600 bg-blue-50 p-3 rounded">
              <strong>Tip:</strong> Try the example HORNET.glb model in src/assets/
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
