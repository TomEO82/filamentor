'use client';
import { useEffect, useState } from 'react';

const API = 'http://localhost/api';

export default function NewSpoolPage() {
  const [materials, setMaterials] = useState([] as any[]);
  const [form, setForm] = useState({ materialId:'', tareG:250, remainingG:1000, status:'IN_STORAGE', location:'', color:'#111111' });

  useEffect(() => {
    fetch(`${API}/materials`)
      .then(r => r.json())
      .then(setMaterials)
      .catch(console.error);
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const res = await fetch(`${API}/spools`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      window.location.href = '/spools';
    } else {
      alert('Failed to create spool');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Add New Spool</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="materialId" className="block text-sm font-medium text-gray-700">Material</label>
          <select
            id="materialId"
            value={form.materialId}
            onChange={(e: any) => setForm({...form, materialId: e.target.value})}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Select a material</option>
            {materials.map((m: any) => (
              <option key={m.id} value={m.id}>{m.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="color" className="block text-sm font-medium text-gray-700">Color</label>
          <input
            type="color"
            id="color"
            value={form.color}
            onChange={(e: any) => setForm({...form, color: e.target.value})}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 h-10"
          />
        </div>
        <div>
          <label htmlFor="tareG" className="block text-sm font-medium text-gray-700">Tare Weight (g)</label>
          <input
            type="number"
            id="tareG"
            value={form.tareG}
            onChange={(e: any) => setForm({...form, tareG: parseInt(e.target.value)})}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="remainingG" className="block text-sm font-medium text-gray-700">Remaining Weight (g)</label>
          <input
            type="number"
            id="remainingG"
            value={form.remainingG}
            onChange={(e: any) => setForm({...form, remainingG: parseInt(e.target.value)})}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
          <input
            type="text"
            id="location"
            value={form.location}
            onChange={(e: any) => setForm({...form, location: e.target.value})}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <button type="submit" className="btn-primary">Create Spool</button>
      </form>
    </div>
  );
}

