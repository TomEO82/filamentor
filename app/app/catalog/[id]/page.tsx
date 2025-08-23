'use client';
import { useEffect, useState } from 'react';
const API = 'http://localhost/api';

export default function CatalogItemDetail({ params }:{ params:{ id:string } }){
  const [item, setItem] = useState(null as any);
  useEffect(() => { fetch(`${API}/products/${params.id}`).then(r=>r.json()).then(setItem).catch(()=>{}); }, [params.id]);
  if (!item) return <div>Loading...</div>;
  return (
    <div className="space-y-3">
      <div className="card p-4">
        <div className="text-lg font-semibold">{item.name}</div>
        <div className="text-sm text-gray-600">Materials:</div>
        <div className="space-y-1 mt-2">
          {item.materials?.map((m: any) => (
            <div key={m.id} className="text-sm">
              {m.material?.name} • {m.gramsPerUnit}g per unit
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

