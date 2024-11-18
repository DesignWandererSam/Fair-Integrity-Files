import React from 'react';
import { Shield, Info } from 'lucide-react';

export function Header() {
  return (
    <div className="relative">
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <div className="relative">
            <Shield className="w-16 h-16 text-purple-600" />
            <div className="absolute -bottom-2 -right-2 bg-purple-500 rounded-full p-1">
              <Info className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-purple-600 to-indigo-600 inline-block text-transparent bg-clip-text">
          File Integrity Checker
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Upload a file to verify its integrity and generate cryptographic hashes. 
          Our advanced analysis helps you ensure file authenticity and safety.
        </p>
      </div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-48 w-full max-w-4xl blur-3xl opacity-20 bg-gradient-to-r from-purple-600 via-indigo-600 to-violet-600 rounded-full -z-10" />
    </div>
  );
}