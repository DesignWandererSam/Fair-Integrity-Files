import React, { useCallback } from 'react';
import { Upload, File } from 'lucide-react';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  isProcessing: boolean;
}

export function FileUpload({ onFileSelect, isProcessing }: FileUploadProps) {
  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (file) onFileSelect(file);
    },
    [onFileSelect]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) onFileSelect(file);
    },
    [onFileSelect]
  );

  return (
    <div className="relative">
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className={`w-full p-8 border-2 border-dashed rounded-xl transition-all duration-300 ${
          isProcessing
            ? 'border-purple-400 bg-purple-50'
            : 'border-purple-300 bg-white hover:bg-purple-50 hover:border-purple-400'
        } cursor-pointer group`}
      >
        <label className="flex flex-col items-center justify-center gap-4 cursor-pointer">
          <div className="relative">
            <div className="transition-transform group-hover:scale-110">
              <div className="absolute -inset-4 bg-purple-100 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
              <Upload className="w-12 h-12 text-purple-500 relative" />
            </div>
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold text-gray-700">
              {isProcessing ? 'Processing file...' : 'Drop your file here or click to upload'}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Supports any file type for hash verification
            </p>
          </div>
          <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center">
              <File className="w-4 h-4 mr-2" />
              <span>Any file type</span>
            </div>
            <div className="h-4 w-px bg-gray-300" />
            <span>No size limit</span>
          </div>
          <input
            type="file"
            onChange={handleChange}
            className="hidden"
            disabled={isProcessing}
          />
        </label>
      </div>
      
      {isProcessing && (
        <div className="absolute inset-0 bg-white/50 backdrop-blur-sm rounded-xl flex items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
            <p className="mt-4 text-gray-600 font-medium">Analyzing file...</p>
          </div>
        </div>
      )}
    </div>
  );
}