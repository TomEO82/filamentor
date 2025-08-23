'use client';
import { useEffect, useState } from 'react';

const API = 'http://localhost/api';

export default function DashboardPage() {
  const [apiTest, setApiTest] = useState('Testing...');
  const [spoolCount, setSpoolCount] = useState(0);

  useEffect(() => {
    console.log('Dashboard: Testing API connection to:', API);
    fetch(`${API}/spools`)
      .then(r => {
        console.log('Dashboard: API response:', r);
        return r.json();
      })
      .then(data => {
        console.log('Dashboard: API data received:', data);
        setSpoolCount(data.length);
        setApiTest(`API working! Found ${data.length} spools`);
      })
      .catch(err => {
        console.error('Dashboard: API error:', err);
        setApiTest(`API error: ${err.message}`);
      });
  }, []);

  return (
    <div className="space-y-4">
      <div className="card p-4 bg-blue-50 border-blue-200">
        <h2 className="font-medium mb-1">API Test</h2>
        <p className="text-sm">API URL: {API}</p>
        <p className="text-sm">Status: {apiTest}</p>
        <p className="text-sm">Spool count: {spoolCount}</p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-3">
        <div className="card p-4">
          <h2 className="font-medium mb-1">Printers</h2>
          <p className="text-sm text-gray-600">Utilization and status at a glance.</p>
        </div>
        <div className="card p-4">
          <h2 className="font-medium mb-1">Inventory</h2>
          <p className="text-sm text-gray-600">Low stock, aging spools, drying.</p>
        </div>
        <div className="card p-4">
          <h2 className="font-medium mb-1">Jobs</h2>
          <p className="text-sm text-gray-600">Pipeline health and due dates.</p>
        </div>
      </div>
    </div>
  );
}

