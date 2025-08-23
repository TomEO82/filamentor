'use client';
import { useEffect, useState } from 'react';
const API = 'http://localhost/api';

export default function JobDetail({ params }:{ params:{ id:string } }){
  const [job, setJob] = useState(null as any);
  const [quote, setQuote] = useState(null as any);
  const [gramsUsed, setGramsUsed] = useState(500);
  const [hours, setHours] = useState(5);
  const [overhead, setOverhead] = useState(1000);
  const [materialId, setMaterialId] = useState(undefined as string | undefined);
  const [printerId, setPrinterId] = useState(undefined as string | undefined);

  useEffect(() => {
    fetch(`${API}/jobs/${params.id}`).then(r=>r.json()).then(setJob).catch(()=>{});
  }, [params.id]);

  const calculateQuote = async () => {
    const res = await fetch(`${API}/jobs/${params.id}/quote`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ gramsUsed, hours, overheadCents: overhead, materialId, printerId }),
    });
    if (res.ok) {
      const data = await res.json();
      setQuote(data);
    } else {
      alert('Failed to calculate quote');
    }
  };

  if (!job) return <div>Loading...</div>;
  return (
    <div className="space-y-3">
      <div className="card p-4">
        <div className="text-lg font-semibold">{job.title}</div>
        <div className="text-gray-600">Status: {job.status}</div>
      </div>

      <div className="card p-4">
        <h2 className="text-xl font-semibold mb-3">Quote Calculator</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Grams Used</label>
            <input type="number" value={gramsUsed} onChange={e=>setGramsUsed(parseInt(e.target.value))} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Hours</label>
            <input type="number" value={hours} onChange={e=>setHours(parseInt(e.target.value))} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Overhead (cents)</label>
            <input type="number" value={overhead} onChange={e=>setOverhead(parseInt(e.target.value))} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
          </div>
          <button onClick={calculateQuote} className="btn-primary col-span-2">Calculate Quote</button>
        </div>
        {quote && (
          <div className="mt-4 border-t pt-4">
            <div className="flex justify-between"><span>Material Cost:</span><span>{quote.materialCost / 100} {quote.currency}</span></div>
            <div className="flex justify-between"><span>Machine Cost:</span><span>{quote.machineCost / 100} {quote.currency}</span></div>
            <div className="flex justify-between"><span>Overhead:</span><span>{quote.overheadCents / 100} {quote.currency}</span></div>
            <div className="flex justify-between font-bold text-lg mt-2"><span>Total:</span><span>{quote.total / 100} {quote.currency}</span></div>
          </div>
        )}
      </div>
    </div>
  );
}

