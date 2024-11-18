import React, { useState } from 'react';
import { CheckCircle, XCircle, Copy, Check, AlertTriangle, FileType, HardDrive } from 'lucide-react';

interface HashDisplayProps {
  fileName: string;
  fileSize: number;
  hashes: {
    md5: string;
    sha1: string;
    sha256: string;
    sha512: string;
  };
  isMalicious: boolean;
}

export function HashDisplay({ fileName, fileSize, hashes, isMalicious }: HashDisplayProps) {
  const [copiedHash, setCopiedHash] = useState<string | null>(null);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const copyToClipboard = async (hash: string, algorithm: string) => {
    await navigator.clipboard.writeText(hash);
    setCopiedHash(algorithm);
    setTimeout(() => setCopiedHash(null), 2000);
  };

  return (
    <div className="w-full bg-white rounded-xl shadow-lg overflow-hidden">
      <div className={`p-4 ${isMalicious ? 'bg-red-50' : 'bg-green-50'}`}>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800">File Analysis Results</h2>
          <div className="flex items-center gap-2">
            {isMalicious ? (
              <div className="flex items-center px-3 py-1 bg-red-100 rounded-full">
                <AlertTriangle className="w-5 h-5 text-red-500 mr-2" />
                <span className="text-red-700 font-medium">Caution Required</span>
              </div>
            ) : (
              <div className="flex items-center px-3 py-1 bg-green-100 rounded-full">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                <span className="text-green-700 font-medium">File Appears Safe</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg flex items-start space-x-3">
            <FileType className="w-5 h-5 text-blue-500 mt-1" />
            <div>
              <p className="text-sm text-gray-500">File Name</p>
              <p className="font-medium text-gray-900 break-all">{fileName}</p>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg flex items-start space-x-3">
            <HardDrive className="w-5 h-5 text-blue-500 mt-1" />
            <div>
              <p className="text-sm text-gray-500">File Size</p>
              <p className="font-medium text-gray-900">{formatFileSize(fileSize)}</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-700 flex items-center">
            Cryptographic Hashes
            <span className="ml-2 text-sm text-gray-500 font-normal">
              (Click to copy)
            </span>
          </h3>
          
          <div className="grid gap-4">
            {Object.entries(hashes).map(([algorithm, hash]) => (
              <div
                key={algorithm}
                className="bg-gray-50 p-4 rounded-lg group hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-medium text-gray-700">
                    {algorithm.toUpperCase()}
                  </p>
                  <button
                    onClick={() => copyToClipboard(hash, algorithm)}
                    className="text-gray-400 hover:text-blue-500 transition-colors"
                  >
                    {copiedHash === algorithm ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
                <p className="font-mono text-sm break-all text-gray-800">{hash}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}