import React, { useState } from 'react';
import { Header } from './components/Header';
import { StatsBar } from './components/StatsBar';
import { FileUpload } from './components/FileUpload';
import { HashDisplay } from './components/HashDisplay';
import { ScanInfo } from './components/ScanInfo';
import { calculateHashes, analyzefile } from './utils/fileAnalysis';
import type { FileData } from './types/fileTypes';

export function App() {
  const [fileData, setFileData] = useState<FileData | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [stats, setStats] = useState({
    totalFiles: 0,
    maliciousFiles: 0,
    lastScanTime: null as string | null,
  });

  const handleFileSelect = async (file: File) => {
    setIsProcessing(true);
    try {
      const [hashes, scanResult] = await Promise.all([
        calculateHashes(file),
        analyzefile(file)
      ]);
      
      setFileData({
        file,
        hashes,
        scanResult,
      });

      setStats(prev => ({
        totalFiles: prev.totalFiles + 1,
        maliciousFiles: prev.maliciousFiles + (scanResult.status === 'malicious' ? 1 : 0),
        lastScanTime: new Date().toLocaleTimeString(),
      }));
    } catch (error) {
      console.error('Error processing file:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50">
      <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <Header />
        
        <StatsBar
          totalFiles={stats.totalFiles}
          maliciousFiles={stats.maliciousFiles}
          lastScanTime={stats.lastScanTime}
        />

        <div className="space-y-8">
          <FileUpload 
            onFileSelect={handleFileSelect}
            isProcessing={isProcessing}
          />

          {fileData && !isProcessing && (
            <>
              <ScanInfo scanResult={fileData.scanResult} />
              <HashDisplay
                fileName={fileData.file.name}
                fileSize={fileData.file.size}
                hashes={fileData.hashes}
                isMalicious={fileData.scanResult.status === 'malicious'}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}