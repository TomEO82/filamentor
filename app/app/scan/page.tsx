'use client';
import { useEffect, useState } from 'react';

export default function ScanPage(){
  const [isScanning, setIsScanning] = useState(false);

  const startScan = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      setIsScanning(true);
      // For now, just show that scanning started
      setTimeout(() => {
        setIsScanning(false);
        alert('Scan feature not fully implemented yet');
      }, 2000);
    } catch (err) {
      alert('Failed to access camera');
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">QR Code Scanner</h2>
      <div className="card p-6 text-center">
        {!isScanning ? (
          <button onClick={startScan} className="btn btn-primary">
            Start Scanning
          </button>
        ) : (
          <div className="space-y-2">
            <div className="text-lg">Scanning...</div>
            <div className="text-sm text-gray-600">Point camera at QR code</div>
          </div>
        )}
      </div>
    </div>
  );
}

