'use client';
import { useEffect, useState } from 'react';

const API = 'http://localhost/api';

export default function NewCatalogItemPage() {
  const [materials, setMaterials] = useState([] as any[]);
  const [rows, setRows] = useState([] as {materialId:string; gramsPerUnit:number}[]);
  const [name, setName] = useState('');

  useEffect(() => {
    fetch(`${API}/materials`).then(r => r.json()).then(setMaterials).catch(console.error);
  }, []);

  const addRow = () => {
    setRows([...rows, { materialId: '', gramsPerUnit: 0 }]);
  };

  const removeRow = (index: number) => {
    setRows(rows.filter((row: any, i: number) => i !== index));
  };

  const updateRow = (index: number, field: string, value: any) => {
    const newRows = [...rows];
    newRows[index] = { ...newRows[index], [field]: value };
    setRows(newRows);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const res = await fetch(`${API}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        materials: rows.map((row: any) => ({
          materialId: row.materialId,
          gramsPerUnit: row.gramsPerUnit
        }))
      }),
    });
    if (res.ok) {
      window.location.href = '/catalog';
    } else {
      alert('Failed to create product');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Add New Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Product Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e: any) => setName(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-700">Materials</label>
            <button type="button" onClick={addRow} className="btn-secondary">Add Material</button>
          </div>
          <div className="space-y-2">
            {rows.map((row: any, index: number) => (
              <div key={index} className="flex gap-2">
                <select
                  value={row.materialId}
                  onChange={(e: any) => updateRow(index, 'materialId', e.target.value)}
                  required
                  className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="">Select material</option>
                  {materials.map((m: any) => (
                    <option key={m.id} value={m.id}>{m.name}</option>
                  ))}
                </select>
                <input
                  type="number"
                  value={row.gramsPerUnit}
                  onChange={(e: any) => updateRow(index, 'gramsPerUnit', parseInt(e.target.value))}
                  placeholder="g per unit"
                  required
                  className="w-32 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                <button type="button" onClick={() => removeRow(index)} className="text-red-500 hover:text-red-700">Remove</button>
              </div>
            ))}
          </div>
        </div>
        
        <button type="submit" className="btn-primary">Create Product</button>
      </form>
    </div>
  );
}

