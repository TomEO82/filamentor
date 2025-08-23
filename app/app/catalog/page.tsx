'use client';
import { useEffect, useState } from 'react';
const API = 'http://localhost/api';

export default function CatalogPage(){
  const [items, setItems] = useState([] as any[]);
  useEffect(() => { fetch(`${API}/products`).then(r=>r.json()).then(setItems).catch(()=>{}); }, []);
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Catalog</h2>
        <a href="/catalog/new" className="btn btn-primary">Add Product</a>
      </div>
      <div className="grid md:grid-cols-2 gap-3">
        {items.map((item: any) => (
          <a key={item.id} href={`/catalog/${item.id}`} className="card p-4 block">
            <div className="font-medium">{item.name}</div>
            <div className="text-sm text-gray-600">Materials: {item.materials?.length || 0}</div>
          </a>
        ))}
      </div>
    </div>
  );
}

