import CryptoJS from 'crypto-js';
import { FileHashes, ScanResult, RiskType } from '../types/fileTypes';

export async function calculateHashes(file: File): Promise<FileHashes> {
  const arrayBuffer = await file.arrayBuffer();
  const wordArray = CryptoJS.lib.WordArray.create(arrayBuffer as any);

  return {
    md5: CryptoJS.MD5(wordArray).toString(),
    sha1: CryptoJS.SHA1(wordArray).toString(),
    sha256: CryptoJS.SHA256(wordArray).toString(),
    sha512: CryptoJS.SHA512(wordArray).toString(),
  };
}

export async function analyzefile(file: File): Promise<ScanResult> {
  const startTime = performance.now();
  
  const suspiciousExtensions = [
    '.exe', '.dll', '.bat', '.cmd', '.vbs', '.js',
    '.jar', '.msi', '.ps1', '.scr', '.hta'
  ];
  
  const detectedIssues: string[] = [];
  let riskLevel = 0;
  
  // Check file extension
  const fileExtension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
  if (suspiciousExtensions.includes(fileExtension)) {
    detectedIssues.push('Potentially dangerous file extension');
    riskLevel += 3;
  }
  
  // Check file size
  if (file.size > 100 * 1024 * 1024) {
    detectedIssues.push('Large file size detected');
    riskLevel += 1;
  }
  
  // Check MIME type
  if (file.type) {
    if (file.type.includes('application/x-msdownload') || 
        file.type.includes('application/x-executable')) {
      detectedIssues.push('Executable file type detected');
      riskLevel += 3;
    }
  } else {
    detectedIssues.push('Unknown file type');
    riskLevel += 2;
  }

  // Determine risk type based on risk level
  let riskType: RiskType;
  if (riskLevel === 0) {
    riskType = 'None';
  } else if (riskLevel <= 2) {
    riskType = 'Low';
  } else if (riskLevel <= 4) {
    riskType = 'Medium';
  } else if (riskLevel <= 6) {
    riskType = 'High';
  } else {
    riskType = 'Critical';
  }
  
  // Determine status based on risk level
  let status: 'clean' | 'suspicious' | 'malicious';
  if (riskLevel === 0) {
    status = 'clean';
  } else if (riskLevel <= 2) {
    status = 'suspicious';
  } else {
    status = 'malicious';
  }
  
  return {
    status,
    riskLevel,
    riskType,
    detectedIssues,
    scanTime: Math.round(performance.now() - startTime),
    fileType: fileExtension.slice(1).toUpperCase() || 'Unknown',
    mimeType: file.type || 'Unknown',
  };
}