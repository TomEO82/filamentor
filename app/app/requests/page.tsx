'use client';
import { useEffect, useState } from 'react';
const API = 'http://localhost/api';

export default function RequestsPage(){
  const [requests, setRequests] = useState([] as any[]);
  useEffect(() => { fetch(`${API}/requests`).then(r=>r.json()).then(setRequests).catch(()=>{}); }, []);
  return (
    <div className="space-y-3">
      <h2 className="text-xl font-semibold">Requests</h2>
      <p className="text-gray-600">Not in MVP scope yet.</p>
    </div>
  );
}

