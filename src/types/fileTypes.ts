export interface FileHashes {
  md5: string;
  sha1: string;
  sha256: string;
  sha512: string;
}

export type RiskType = 'None' | 'Low' | 'Medium' | 'High' | 'Critical';

export interface ScanResult {
  status: 'clean' | 'suspicious' | 'malicious';
  riskLevel: number;
  riskType: RiskType;
  detectedIssues: string[];
  scanTime: number;
  fileType: string;
  mimeType: string;
}

export interface FileData {
  file: File;
  hashes: FileHashes;
  scanResult: ScanResult;
}