# BIM Viewer

A modern 3D model viewer built with React, TypeScript, and React Three Fiber. Perfect for visualizing BIM and 3D models in the browser.

## Features

- **3D Visualization**: Interactive 3D rendering using React Three Fiber
- **Multiple Formats**: Support for GLB and GLTF file formats
- **Interactive Controls**: Orbit, pan, and zoom controls for navigating the 3D scene
- **Clean UI**: Modern, responsive interface with drag-and-drop file upload
- **TypeScript**: Fully typed for better development experience
- **Example Model**: Includes a sample HORNET.glb model for testing

## Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **React Three Fiber** - React renderer for Three.js
- **@react-three/drei** - Useful helpers for React Three Fiber
- **Three.js** - 3D graphics library
- **Tailwind CSS** - Utility-first CSS framework

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The application will start on `http://localhost:5176`.

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Usage

1. Open the application in your browser
2. Click on the file upload area on the right side panel or drag and drop a file
3. Select a 3D model file (`.glb` or `.gltf`)
4. The file will be loaded and displayed in the 3D viewer

### Example Model

An example HORNET 3D model is included in `src/assets/HORNET.glb`. You can use this file to test the viewer without having to find your own models.

### 3D Controls

- **Rotate**: Left click + drag
- **Pan**: Right click + drag
- **Zoom**: Scroll wheel

## Project Structure

```
src/
├── components/
│   ├── FileUpload.tsx    # File upload component with drag-and-drop
│   ├── Scene.tsx         # 3D scene setup with camera and lighting
│   └── BIMModel.tsx      # 3D model loader and renderer
├── assets/
│   └── HORNET.glb       # Example 3D model
├── App.tsx              # Main application component
├── main.tsx            # Application entry point
└── index.css           # Global styles with Tailwind directives
```

## Supported File Formats

- **GLB** (Binary GLTF) - `.glb` ✅
- **GLTF** (GL Transmission Format) - `.gltf` ✅
- **IFC** (Industry Foundation Classes) - `.ifc` ⚠️ Currently disabled

### Why is IFC Support Disabled?

IFC support is temporarily disabled due to compatibility issues with the `web-ifc` library in browser environments. The library has problems with:
- WebAssembly loading and MIME type handling in Vite
- Web Workers configuration
- Version compatibility between `web-ifc` and `web-ifc-three`

**Workaround**: Convert IFC files to GLB format using tools like:
- **IfcConvert** (command-line tool)
- **Blender** (with IFC plugin)
- **Online converters** (e.g., https://www.creators3d.com/online-viewer)

We're monitoring the `web-ifc` project for updates and will re-enable IFC support once these issues are resolved.

## Notes

- Large 3D model files may take some time to load
- The viewer automatically centers models in the scene
- Grid and axes helpers are shown for spatial reference

## License

MIT
