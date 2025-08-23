'use client';
import { useEffect, useState } from 'react';

export default function DashboardPage() {
  const [spoolCount, setSpoolCount] = useState(0);

  useEffect(() => {
    fetch('http://localhost/api/spools')
      .then(r => r.json())
      .then(data => {
        setSpoolCount(data.length);
      })
      .catch(err => {
        console.error('Dashboard: API error:', err);
      });
  }, []);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      
      <div className="grid md:grid-cols-3 gap-4">
        <div className="card p-4 bg-blue-50 border-blue-200">
          <h2 className="font-medium mb-1">Spools</h2>
          <p className="text-2xl font-bold text-blue-600">{spoolCount}</p>
          <p className="text-sm text-gray-600">Total spools</p>
        </div>
        
        <div className="card p-4 bg-green-50 border-green-200">
          <h2 className="font-medium mb-1">Active Jobs</h2>
          <p className="text-2xl font-bold text-green-600">0</p>
          <p className="text-sm text-gray-600">In progress</p>
        </div>
        
        <div className="card p-4 bg-orange-50 border-orange-200">
          <h2 className="font-medium mb-1">Alerts</h2>
          <p className="text-2xl font-bold text-orange-600">0</p>
          <p className="text-sm text-gray-600">Pending</p>
        </div>
      </div>
    </div>
  );
}

