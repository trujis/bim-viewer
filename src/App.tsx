import { useState } from 'react';
import { Scene } from './components/Scene';
import { FileUpload } from './components/FileUpload';

/**
 * App Component
 *
 * Main application component that manages the layout and file state.
 * Layout: 3D viewer on the left/center, file upload panel on the right.
 */
function App() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileSelect = (file: File) => {
    console.log('File selected:', {
      name: file.name,
      size: file.size,
      type: file.type,
      lastModified: new Date(file.lastModified)
    });
    setSelectedFile(file);
  };

  return (
    <div className="w-screen h-screen flex flex-col overflow-hidden bg-gray-50">
      {/* Main content area */}
      <div className="flex-1 flex overflow-hidden">
        {/* 3D Viewer Scene - Center/Left */}
        <Scene file={selectedFile} />

        {/* File Upload Panel - Right */}
        <FileUpload onFileSelect={handleFileSelect} selectedFile={selectedFile} />
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-400 text-xs py-2 px-4 text-center">
        Created by <span className="text-gray-300">Guillem Trujillo Ruiz</span> for learning purposes
      </footer>
    </div>
  );
}

export default App;
