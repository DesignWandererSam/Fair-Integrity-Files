import React from 'react';
import { FileCheck, AlertTriangle, Clock } from 'lucide-react';

interface StatsBarProps {
  totalFiles: number;
  maliciousFiles: number;
  lastScanTime: string | null;
}

export function StatsBar({ totalFiles, maliciousFiles, lastScanTime }: StatsBarProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <div className="bg-white rounded-lg shadow-md p-4 flex items-center space-x-4">
        <div className="bg-blue-100 p-3 rounded-full">
          <FileCheck className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <p className="text-sm text-gray-500">Files Scanned</p>
          <p className="text-2xl font-bold text-gray-900">{totalFiles}</p>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-4 flex items-center space-x-4">
        <div className="bg-red-100 p-3 rounded-full">
          <AlertTriangle className="w-6 h-6 text-red-600" />
        </div>
        <div>
          <p className="text-sm text-gray-500">Suspicious Files</p>
          <p className="text-2xl font-bold text-gray-900">{maliciousFiles}</p>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-4 flex items-center space-x-4">
        <div className="bg-green-100 p-3 rounded-full">
          <Clock className="w-6 h-6 text-green-600" />
        </div>
        <div>
          <p className="text-sm text-gray-500">Last Scan</p>
          <p className="text-lg font-medium text-gray-900">
            {lastScanTime || 'No scans yet'}
          </p>
        </div>
      </div>
    </div>
  );
}