'use client';
import { useEffect, useState } from 'react';

interface Spool { id:string; materialId:string; lot?:string; tareG:number; netG?:number; remainingG:number; status:string; location?:string; color?:string }
interface Material { id:string; name:string; color?:string; hex?:string; }

const API = 'http://localhost/api';

// Function to get percentage remaining and color
function getPercentageInfo(remainingG: number, netG: number) {
  if (!netG) return { percentage: 0, color: 'bg-gray-100 text-gray-700' };
  
  const percentage = Math.round((remainingG / netG) * 100);
  let color = 'bg-green-100 text-green-700';
  
  if (percentage <= 15) {
    color = 'bg-red-100 text-red-700';
  } else if (percentage <= 30) {
    color = 'bg-orange-100 text-orange-700';
  } else if (percentage <= 50) {
    color = 'bg-yellow-100 text-yellow-700';
  }
  
  return { percentage, color };
}

// Function to get status color
function getStatusColor(status: string) {
  switch (status) {
    case 'IN_STORAGE': return 'bg-blue-100 text-blue-700';
    case 'IN_USE': return 'bg-green-100 text-green-700';
    case 'RESERVED': return 'bg-purple-100 text-purple-700';
    case 'QUARANTINE': return 'bg-red-100 text-red-700';
    case 'SCRAP': return 'bg-gray-100 text-gray-700';
    default: return 'bg-gray-100 text-gray-700';
  }
}

// Function to extract brand from material name
function getBrandFromMaterial(materialName: string) {
  if (!materialName) return 'Unknown';
  
  // Common brand patterns
  if (materialName.includes('Bambu Lab')) return 'Bambu Lab';
  if (materialName.includes('eSun')) return 'eSun';
  if (materialName.includes('Elgoo')) return 'Elgoo';
  if (materialName.includes('Polymaker')) return 'Polymaker';
  if (materialName.includes('Prusament')) return 'Prusament';
  if (materialName.includes('Hatchbox')) return 'Hatchbox';
  if (materialName.includes('Overture')) return 'Overture';
  if (materialName.includes('Sunlu')) return 'Sunlu';
  if (materialName.includes('Creality')) return 'Creality';
  if (materialName.includes('Anycubic')) return 'Anycubic';
  
  // Extract brand from "Material - Brand" format
  const parts = materialName.split(' - ');
  if (parts.length > 1) {
    return parts[1];
  }
  
  return 'Unknown';
}

// Function to extract material type from material name
function getMaterialType(materialName: string) {
  if (!materialName) return 'Unknown';
  
  // Extract material type from "Material - Brand" format
  const parts = materialName.split(' - ');
  if (parts.length > 0) {
    return parts[0];
  }
  
  return materialName;
}

export default function SpoolsPage(){
  const [spools, setSpools] = useState([] as any[]);
  const [q, setQ] = useState('');
  const [filters, setFilters] = useState({
    brand: '',
    material: '',
    status: '',
    location: ''
  });

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

  // Get unique values for filters
  const uniqueBrands = [...new Set(spools.map((s: any) => getBrandFromMaterial(s.material?.name || '')))];
  const uniqueMaterials = [...new Set(spools.map((s: any) => getMaterialType(s.material?.name || '')))];
  const uniqueStatuses = [...new Set(spools.map((s: any) => s.status))];
  const uniqueLocations = [...new Set(spools.map((s: any) => s.location).filter(Boolean))];

  const filtered = spools.filter((s: any) => {
    const matchesSearch = !q || (s.material?.name || '').toLowerCase().includes(q.toLowerCase()) || (s.location||'').toLowerCase().includes(q.toLowerCase());
    const matchesBrand = !filters.brand || getBrandFromMaterial(s.material?.name || '') === filters.brand;
    const matchesMaterial = !filters.material || getMaterialType(s.material?.name || '') === filters.material;
    const matchesStatus = !filters.status || s.status === filters.status;
    const matchesLocation = !filters.location || s.location === filters.location;
    
    return matchesSearch && matchesBrand && matchesMaterial && matchesStatus && matchesLocation;
  });

  const clearFilters = () => {
    setFilters({ brand: '', material: '', status: '', location: '' });
  };

  console.log('SpoolsPage: rendering with spools:', spools, 'filtered:', filtered);

  return (
    <div className="space-y-4">
      {/* Search and Add Button */}
      <div className="flex items-center gap-2">
        <input 
          className="w-full max-w-sm border rounded-md px-3 py-2" 
          placeholder="Search spools..." 
          value={q} 
          onChange={(e:any)=>setQ(e.target.value)} 
        />
        <a href="/spools/new" className="btn btn-primary">Add Spool</a>
      </div>

      {/* Filter Buttons */}
      <div className="space-y-3">
        {/* Brand Filter */}
        {uniqueBrands.length > 1 && (
          <div className="flex flex-wrap gap-2">
            <span className="text-sm font-medium text-gray-700 mr-2">Brand:</span>
            <button
              onClick={() => setFilters({...filters, brand: ''})}
              className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                filters.brand === '' 
                  ? 'bg-gray-200 border-gray-300 text-gray-800' 
                  : 'bg-gray-100 border-gray-200 text-gray-600 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            {uniqueBrands.map((brand: any) => (
              <button
                key={brand}
                onClick={() => setFilters({...filters, brand: filters.brand === brand ? '' : brand})}
                className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                  filters.brand === brand 
                    ? 'bg-gray-200 border-gray-300 text-gray-800' 
                    : 'bg-gray-100 border-gray-200 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {brand}
              </button>
            ))}
          </div>
        )}

        {/* Material Filter */}
        {uniqueMaterials.length > 1 && (
          <div className="flex flex-wrap gap-2">
            <span className="text-sm font-medium text-gray-700 mr-2">Material:</span>
            <button
              onClick={() => setFilters({...filters, material: ''})}
              className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                filters.material === '' 
                  ? 'bg-gray-200 border-gray-300 text-gray-800' 
                  : 'bg-gray-100 border-gray-200 text-gray-600 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            {uniqueMaterials.map((material: any) => (
              <button
                key={material}
                onClick={() => setFilters({...filters, material: filters.material === material ? '' : material})}
                className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                  filters.material === material 
                    ? 'bg-gray-200 border-gray-300 text-gray-800' 
                    : 'bg-gray-100 border-gray-200 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {material}
              </button>
            ))}
          </div>
        )}

        {/* Status Filter */}
        {uniqueStatuses.length > 1 && (
          <div className="flex flex-wrap gap-2">
            <span className="text-sm font-medium text-gray-700 mr-2">Status:</span>
            <button
              onClick={() => setFilters({...filters, status: ''})}
              className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                filters.status === '' 
                  ? 'bg-gray-200 border-gray-300 text-gray-800' 
                  : 'bg-gray-100 border-gray-200 text-gray-600 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            {uniqueStatuses.map((status: any) => (
              <button
                key={status}
                onClick={() => setFilters({...filters, status: filters.status === status ? '' : status})}
                className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                  filters.status === status 
                    ? 'bg-gray-200 border-gray-300 text-gray-800' 
                    : 'bg-gray-100 border-gray-200 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {status.replace('_', ' ')}
              </button>
            ))}
          </div>
        )}

        {/* Location Filter */}
        {uniqueLocations.length > 1 && (
          <div className="flex flex-wrap gap-2">
            <span className="text-sm font-medium text-gray-700 mr-2">Location:</span>
            <button
              onClick={() => setFilters({...filters, location: ''})}
              className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                filters.location === '' 
                  ? 'bg-gray-200 border-gray-300 text-gray-800' 
                  : 'bg-gray-100 border-gray-200 text-gray-600 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            {uniqueLocations.map((location: any) => (
              <button
                key={location}
                onClick={() => setFilters({...filters, location: filters.location === location ? '' : location})}
                className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                  filters.location === location 
                    ? 'bg-gray-200 border-gray-300 text-gray-800' 
                    : 'bg-gray-100 border-gray-200 text-gray-600 hover:bg-gray-200'
                }`}
              >
                📍 {location}
              </button>
            ))}
          </div>
        )}

        {/* Clear All Filters */}
        {(filters.brand || filters.material || filters.status || filters.location) && (
          <div className="pt-2">
            <button
              onClick={clearFilters}
              className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full border border-gray-200 transition-colors"
            >
              🗑️ Clear All Filters
            </button>
          </div>
        )}
      </div>

      {/* Results Count */}
      <div className="text-sm text-gray-600">
        Showing {filtered.length} of {spools.length} spools
      </div>

      {/* Spools Grid */}
      <div className="grid md:grid-cols-2 gap-3">
        {filtered.map((s:any) => {
          const { percentage, color: percentageColor } = getPercentageInfo(s.remainingG, s.netG);
          const brand = getBrandFromMaterial(s.material?.name || '');
          const materialType = getMaterialType(s.material?.name || '');
          const statusColor = getStatusColor(s.status);
          
          return (
            <div key={s.id} className="card p-4 flex items-center gap-3">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: s.color || s.material?.hex || '#ccc' }} />
              <div className="flex-1">
                <div className="font-medium">{s.material?.name || s.id}</div>
                <div className="text-sm text-gray-600">{s.remainingG} g • {s.status} • {s.location || '—'}</div>
                
                {/* Tags */}
                <div className="mt-2 flex flex-wrap gap-2">
                  {/* Brand Tag */}
                  <span className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full">
                    🏢 {brand}
                  </span>
                  
                  {/* Material Type Tag */}
                  <span className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full">
                    🧬 {materialType}
                  </span>
                  
                  {/* Percentage Remaining Tag */}
                  <span className={`inline-block px-2 py-1 text-xs rounded-full ${percentageColor}`}>
                    📊 {percentage}%
                  </span>
                  
                  {/* Status Tag */}
                  <span className={`inline-block px-2 py-1 text-xs rounded-full ${statusColor}`}>
                    🏷️ {s.status.replace('_', ' ')}
                  </span>
                  
                  {/* Location Tag (if exists) */}
                  {s.location && (
                    <span className="inline-block px-2 py-1 text-xs bg-indigo-100 text-indigo-700 rounded-full">
                      📍 {s.location}
                    </span>
                  )}
                </div>
              </div>
              
              {/* Edit button */}
              <a 
                href={`/spools/${s.id}/edit`} 
                className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                title="Edit spool"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </a>
            </div>
          );
        })}
      </div>
      {filtered.length === 0 && (
        <div className="text-center text-gray-500 py-8">
          <p>No spools found matching your filters.</p>
          <button
            onClick={clearFilters}
            className="mt-2 px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-md border border-gray-200 transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
}

