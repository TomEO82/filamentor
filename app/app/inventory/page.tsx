'use client';
import { useEffect, useState } from 'react';
const API = 'http://localhost/api';

export default function InventoryPage(){
  const [activeTab, setActiveTab] = useState('PRINTER');
  const [items, setItems] = useState([] as any[]);

  useEffect(() => {
    fetch(`${API}/inventory?category=${activeTab}`).then(r=>r.json()).then(setItems).catch(()=>{});
  }, [activeTab]);

  const tabs = [
    { key: 'PRINTER', label: '3D Printers' },
    { key: 'PRINTER_SPARE', label: 'Printer Spare Parts' },
    { key: 'PACKAGING', label: 'Packaging & Labeling' },
    { key: 'GENERAL', label: 'General Items' }
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Inventory</h2>
      <div className="flex gap-2 border-b">
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 ${activeTab === tab.key ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="grid md:grid-cols-2 gap-3">
        {items.map((item: any) => (
          <div key={item.id} className="card p-4">
            <div className="font-medium">{item.name}</div>
            <div className="text-sm text-gray-600">{item.qty} {item.unit} • {item.location || '—'}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

