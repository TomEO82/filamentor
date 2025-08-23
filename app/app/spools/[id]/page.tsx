'use client';
import { useEffect, useState } from 'react';

const API = 'http://localhost/api';

export default function SpoolDetail({ params }:{ params:{ id:string } }){
  const [spool, setSpool] = useState(null as any);
  const [grams, setGrams] = useState(0);

  useEffect(() => {
    fetch(`${API}/spools/${params.id}`).then(r=>r.json()).then(setSpool).catch(()=>{});
  }, [params.id]);

  const handleUse = async () => {
    if (!grams) return;
    const res = await fetch(`${API}/spools/${params.id}/events`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'use', grams }),
    });
    if (res.ok) {
      setSpool(await res.json());
      setGrams(0);
    }
  };

  if (!spool) return <div>Loading...</div>;
  return (
    <div className="space-y-3">
      <div className="card p-4">
        <div className="text-lg font-semibold">{spool.material?.name || spool.id}</div>
        <div className="text-gray-600">Status: {spool.status}</div>
        <div className="text-gray-600">Remaining: {spool.remainingG}g</div>
        <div className="text-gray-600">Location: {spool.location || '—'}</div>
      </div>

      <div className="card p-4">
        <h2 className="text-xl font-semibold mb-3">Use Spool</h2>
        <div className="flex gap-2">
          <input
            type="number"
            value={grams}
            onChange={(e) => setGrams(parseInt(e.target.value))}
            placeholder="Grams to use"
            className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          <button onClick={handleUse} className="btn-primary">Use</button>
        </div>
      </div>
    </div>
  );
}

