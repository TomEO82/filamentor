'use client';
import { useEffect, useState } from 'react';
const API = 'http://localhost/api';

export default function JobsPage(){
  const [jobs, setJobs] = useState([] as any[]);
  useEffect(() => { fetch(`${API}/jobs`).then(r=>r.json()).then(setJobs).catch(()=>{}); }, []);
  return (
    <div className="space-y-3">
      <h2 className="text-xl font-semibold">Jobs</h2>
      <div className="space-y-2">
        {jobs.map((j: any) => (
          <a key={j.id} href={`/jobs/${j.id}`} className="card p-3 block">
            <div className="font-medium">{j.title}</div>
            <div className="text-sm text-gray-600">Status: {j.status}</div>
          </a>
        ))}
      </div>
      <a href="/jobs/new" className="btn btn-primary">New Job</a>
    </div>
  );
}

