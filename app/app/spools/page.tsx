'use client';
import { useEffect, useState } from 'react';

interface Spool { id:string; materialId:string; lot?:string; tareG:number; netG?:number; remainingG:number; status:string; location?:string; color?:string }
interface Material { id:string; name:string; color?:string; hex?:string; }

const API = 'http://localhost/api';

export default function SpoolsPage(){
  const [spools, setSpools] = useState([] as any[]);
  const [q, setQ] = useState('');

  useEffect(() => { 
    console.log('SpoolsPage: useEffect running, API URL:', API);
    fetch(`${API}/spools`)
      .then(r => {
        console.log('SpoolsPage: fetch response:', r);
        return r.json();
      })
      .then(data => {
        console.log('SpoolsPage: data received:', data);
        setSpools(data);
      })
      .catch(err => {
        console.error('SpoolsPage: fetch error:', err);
      }); 
  }, []);

  const filtered = q ? spools.filter((s: any) => (s.material?.name || '').toLowerCase().includes(q.toLowerCase()) || (s.location||'').toLowerCase().includes(q.toLowerCase())) : spools;

  console.log('SpoolsPage: rendering with spools:', spools, 'filtered:', filtered);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <input className="w-full max-w-sm border rounded-md px-3 py-2" placeholder="Search spools..." value={q} onChange={(e:any)=>setQ(e.target.value)} />
        <a href="/spools/new" className="btn btn-primary">Add Spool</a>
      </div>
      <div className="grid md:grid-cols-2 gap-3">
        {filtered.map((s:any) => (
          <a key={s.id} href={`/spools/${s.id}`} className="card p-4 flex items-center gap-3">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: s.color || s.material?.hex || '#ccc' }} />
            <div className="flex-1">
              <div className="font-medium">{s.material?.name || s.id}</div>
              <div className="text-sm text-gray-600">{s.remainingG} g • {s.status} • {s.location || '—'}</div>
            </div>
          </a>
        ))}
      </div>
      {spools.length === 0 && (
        <div className="text-center text-gray-500 py-8">
          <p>No spools found. Debug info:</p>
          <p>API URL: {API}</p>
          <p>Spools count: {spools.length}</p>
        </div>
      )}
    </div>
  );
}

