'use client';
import { useEffect, useState } from 'react';
const API = 'http://localhost/api';

export default function AlertsPage(){
  const [items, setItems] = useState([] as any[]);
  useEffect(() => { fetch(`${API}/notifications`).then(r=>r.json()).then(setItems).catch(()=>{}); }, []);
  return (
    <div className="space-y-3">
      <h2 className="text-xl font-semibold">Alerts</h2>
      <div className="space-y-2">
        {items.map((n: any) => (
          <div key={n.id} className="card p-3">
            <div className="flex items-center gap-2">
              <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100">{n.severity}</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100">{n.category}</span>
            </div>
            <div className="font-medium mt-1">{n.title}</div>
            {n.body && <div className="text-sm text-gray-600">{n.body}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}

