import { useState } from 'react';
import type { ChangeEvent, DragEvent } from 'react';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  selectedFile: File | null;
}

/**
 * FileUpload Component
 *
 * Displays a file input area for uploading 3D model files.
 * Positioned on the right side of the screen.
 */
export const FileUpload = ({ onFileSelect, selectedFile }: FileUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);

    const file = event.dataTransfer.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  return (
    <div className="w-80 h-full bg-gray-100 border-l border-gray-300 p-6 flex flex-col">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Upload 3D Model
      </h2>

      <div className="flex-1 flex flex-col justify-start">
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-4">
            Select a 3D model file to visualize. Supported formats:
          </p>
          <ul className="text-xs text-gray-500 mb-6 list-disc list-inside">
            <li>GLB (.glb)</li>
            <li>GLTF (.gltf)</li>
          </ul>
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
            <p className="text-xs text-yellow-800">
              <strong>IFC Support:</strong> Currently disabled due to library compatibility issues.
              Convert IFC files to GLB format to use them.
            </p>
          </div>
        </div>

        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
            isDragging
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-400 hover:bg-gray-200'
          }`}
        >
          <label
            htmlFor="file-upload"
            className="flex flex-col items-center justify-center w-full h-full cursor-pointer"
          >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-12 h-12 mb-3 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            <p className="mb-2 text-sm text-gray-700">
              <span className="font-semibold">Click to upload</span>
            </p>
            <p className="text-xs text-gray-500">
              or drag and drop
            </p>
          </div>
          <input
            id="file-upload"
            type="file"
            className="hidden"
            accept=".glb,.gltf"
            onChange={handleFileChange}
          />
          </label>
        </div>

        {selectedFile && (
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm font-semibold text-green-800 mb-2">
              File Loaded:
            </p>
            <p className="text-xs text-green-700 break-all">
              {selectedFile.name}
            </p>
            <p className="text-xs text-green-600 mt-1">
              Size: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>
        )}

        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-xs text-blue-800">
            <strong>Tip:</strong> Try the example model in <code>src/assets/HORNET.glb</code> to test the viewer!
          </p>
        </div>
      </div>
    </div>
  );
};
