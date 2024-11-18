import React from 'react';
import { Shield, AlertTriangle, Clock, FileType, Activity } from 'lucide-react';
import { ScanResult } from '../types/fileTypes';

interface ScanInfoProps {
  scanResult: ScanResult;
}

export function ScanInfo({ scanResult }: ScanInfoProps) {
  const statusColors = {
    clean: 'text-green-600 bg-green-50 border-green-200',
    suspicious: 'text-yellow-600 bg-yellow-50 border-yellow-200',
    malicious: 'text-red-600 bg-red-50 border-red-200',
  };

  const riskTypeColors = {
    None: 'bg-green-100 text-green-700',
    Low: 'bg-blue-100 text-blue-700',
    Medium: 'bg-yellow-100 text-yellow-700',
    High: 'bg-orange-100 text-orange-700',
    Critical: 'bg-red-100 text-red-700',
  };

  const statusIcons = {
    clean: <Shield className="w-5 h-5" />,
    suspicious: <Activity className="w-5 h-5" />,
    malicious: <AlertTriangle className="w-5 h-5" />,
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className={`p-4 ${
        scanResult.status === 'clean' ? 'bg-green-50' :
        scanResult.status === 'suspicious' ? 'bg-yellow-50' : 'bg-red-50'
      }`}>
        <h2 className="text-xl font-bold text-gray-800">Scan Information</h2>
      </div>

      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className={`border rounded-lg p-4 flex items-center space-x-3 ${
            statusColors[scanResult.status]
          }`}>
            <div className="shrink-0">
              {statusIcons[scanResult.status]}
            </div>
            <div>
              <p className="text-sm font-medium">Scan Status</p>
              <p className="font-semibold capitalize">{scanResult.status}</p>
            </div>
          </div>

          <div className="border rounded-lg p-4 flex items-center space-x-3 bg-purple-50 border-purple-200">
            <Clock className="w-5 h-5 text-purple-600 shrink-0" />
            <div>
              <p className="text-sm font-medium">Scan Duration</p>
              <p className="font-semibold">{scanResult.scanTime}ms</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="border rounded-lg p-4 space-y-3">
            <div className="flex items-center space-x-2">
              <FileType className="w-5 h-5 text-gray-600" />
              <h3 className="font-semibold text-gray-700">File Details</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600">File Type</p>
                <p className="font-medium">{scanResult.fileType}</p>
              </div>
              <div>
                <p className="text-gray-600">MIME Type</p>
                <p className="font-medium">{scanResult.mimeType}</p>
              </div>
            </div>
          </div>

          {scanResult.detectedIssues.length > 0 && (
            <div className="border rounded-lg p-4 space-y-3">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5 text-yellow-600" />
                <h3 className="font-semibold text-gray-700">Detected Issues</h3>
              </div>
              <ul className="space-y-2">
                {scanResult.detectedIssues.map((issue, index) => (
                  <li key={index} className="flex items-start space-x-2 text-sm">
                    <span className="text-yellow-600">•</span>
                    <span>{issue}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="border rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Activity className="w-5 h-5 text-gray-600" />
                <h3 className="font-semibold text-gray-700">Risk Assessment</h3>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  riskTypeColors[scanResult.riskType]
                }`}>
                  {scanResult.riskType} Risk
                </span>
                <span className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-600">
                  Level {scanResult.riskLevel}
                </span>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-500 ${
                  scanResult.riskType === 'None' ? 'bg-green-500' :
                  scanResult.riskType === 'Low' ? 'bg-blue-500' :
                  scanResult.riskType === 'Medium' ? 'bg-yellow-500' :
                  scanResult.riskType === 'High' ? 'bg-orange-500' :
                  'bg-red-500'
                }`}
                style={{ width: `${Math.min(100, scanResult.riskLevel * 20)}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}