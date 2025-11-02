import { useEffect, useState } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as THREE from 'three';

interface BIMModelProps {
  file: File | null;
}

/**
 * BIMModel Component
 *
 * Loads and displays 3D model files in the scene.
 * Currently supports GLB and GLTF formats.
 */
export const BIMModel = ({ file }: BIMModelProps) => {
  const [modelUrl, setModelUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!file) {
      setModelUrl(null);
      return;
    }

    // Create object URL for the file
    const url = URL.createObjectURL(file);
    setModelUrl(url);

    // Cleanup function to revoke object URL
    return () => {
      URL.revokeObjectURL(url);
    };
  }, [file]);

  // Don't render anything if no file is loaded
  if (!modelUrl) {
    return null;
  }

  return <GLTFModel url={modelUrl} key={modelUrl} />;
};

/**
 * GLTFModel Component
 *
 * Loads and displays GLTF/GLB files using the GLTFLoader.
 */
const GLTFModel = ({ url }: { url: string }) => {
  const [model, setModel] = useState<THREE.Group | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    const loader = new GLTFLoader();

    console.log('Loading 3D model from URL:', url);

    loader.load(
      url,
      (gltf) => {
        if (cancelled) return;

        console.log('3D model loaded successfully');

        // Center the model
        const box = new THREE.Box3().setFromObject(gltf.scene);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        console.log('Model bounds:', { center, size });

        gltf.scene.position.sub(center);

        setModel(gltf.scene);
        setLoading(false);
      },
      (progress) => {
        if (progress.total > 0) {
          const percentage = (progress.loaded / progress.total) * 100;
          console.log('Loading progress:', percentage.toFixed(2), '%');
        }
      },
      (error) => {
        if (cancelled) return;

        console.error('Error loading 3D model:', error);
        setLoading(false);
      }
    );

    return () => {
      cancelled = true;
    };
  }, [url]);

  if (loading || !model) {
    return null;
  }

  return <primitive object={model} />;
};
