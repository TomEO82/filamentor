'use client';
import { useEffect, useState } from 'react';

const API = 'http://localhost/api';

export default function NewJobPage() {
  const [title, setTitle] = useState('');
  const [products, setProducts] = useState([] as any[]);
  const [spools, setSpools] = useState([] as any[]);
  const [productId, setProductId] = useState('');
  const [qty, setQty] = useState(1);
  const [selectedSpoolIds, setSelectedSpoolIds] = useState([] as string[]);
  const [quote, setQuote] = useState(null as any);

  useEffect(() => {
    fetch(`${API}/products`).then(r => r.json()).then(setProducts).catch(console.error);
    fetch(`${API}/spools?status=IN_STORAGE`).then(r => r.json()).then(setSpools).catch(console.error);
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const res = await fetch(`${API}/jobs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, items: [{ productId, qty }] }),
    });
    if (res.ok) {
      window.location.href = '/jobs';
    } else {
      alert('Failed to create job');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Create New Job</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Job Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e: any) => setTitle(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="productId" className="block text-sm font-medium text-gray-700">Product</label>
          <select
            id="productId"
            value={productId}
            onChange={(e: any) => setProductId(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Select a product</option>
            {products.map((p: any) => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="qty" className="block text-sm font-medium text-gray-700">Quantity</label>
          <input
            type="number"
            id="qty"
            value={qty}
            onChange={(e: any) => setQty(parseInt(e.target.value))}
            min="1"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <button type="submit" className="btn-primary">Create Job</button>
      </form>
    </div>
  );
}

