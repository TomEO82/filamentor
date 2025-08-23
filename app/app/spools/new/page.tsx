'use client';
import { useEffect, useState } from 'react';

const API = 'http://localhost/api';

// Material types only (no brands)
const MATERIAL_TYPES = [
  'PLA', 'PLA+', 'PETG', 'ABS', 'TPU', 'TPE', 'PC', 'PA', 'PVA', 'HIPS', 'ASA', 'PP', 'POM', 'PMMA'
];

// Famous brands
const BRANDS = [
  'Bambu Lab', 'eSun', 'Elgoo', 'Polymaker', 'Prusament', 'Hatchbox', 'Overture', 'Sunlu', 'Creality', 'Anycubic', 'Other'
];

export default function NewSpoolPage() {
  const [materials, setMaterials] = useState([] as any[]);
  const [selectedMaterialType, setSelectedMaterialType] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [customBrand, setCustomBrand] = useState('');
  const [color, setColor] = useState('#ff0000');
  const [tareG, setTareG] = useState(0);
  const [netG, setNetG] = useState(1000);
  const [location, setLocation] = useState('');
  const [lot, setLot] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`${API}/materials`)
      .then(r => r.json())
      .then(setMaterials)
      .catch(() => {});
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    
    try {
      const brand = selectedBrand === 'Other' ? customBrand : selectedBrand;
      const materialName = `${selectedMaterialType} - ${brand}`;
      
      // First, create or find the material
      let materialId = '';
      const existingMaterial = materials.find((m: any) => m.name === materialName);
      
      if (existingMaterial) {
        materialId = existingMaterial.id;
      } else {
        // Create new material
        const materialResponse = await fetch(`${API}/materials`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: materialName,
            brand: brand,
            color: color,
            hex: color,
            diameter: '1.75', // Default diameter
            costPerKg: 5000, // Default cost (50 ILS per kg)
          }),
        });
        
        if (!materialResponse.ok) {
          throw new Error('Failed to create material');
        }
        
        const newMaterial = await materialResponse.json();
        materialId = newMaterial.id;
      }
      
      // Then create the spool
      const spoolResponse = await fetch(`${API}/spools`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          materialId,
          lot: lot || undefined,
          tareG: Number(tareG),
          netG: Number(netG),
          remainingG: Number(netG),
          status: 'IN_STORAGE',
          location: location || undefined,
          color,
        }),
      });
      
      if (spoolResponse.ok) {
        window.location.href = '/spools';
      } else {
        throw new Error('Failed to create spool');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to create spool');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Add New Spool</h1>
        <p className="text-gray-600">Add a new filament spool to your inventory</p>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-md">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          {/* Material Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Material Type *
            </label>
            <select
              required
              value={selectedMaterialType}
              onChange={(e: any) => setSelectedMaterialType(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select material type</option>
              {MATERIAL_TYPES.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          {/* Brand */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Brand *
            </label>
            <select
              required
              value={selectedBrand}
              onChange={(e: any) => setSelectedBrand(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select brand</option>
              {BRANDS.map(brand => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Custom Brand Input */}
        {selectedBrand === 'Other' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Custom Brand Name *
            </label>
            <input
              required
              type="text"
              value={customBrand}
              onChange={(e: any) => setCustomBrand(e.target.value)}
              placeholder="Enter brand name"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-4">
          {/* Color */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Color
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={color}
                onChange={(e: any) => setColor(e.target.value)}
                className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
              />
              <input
                type="text"
                value={color}
                onChange={(e: any) => setColor(e.target.value)}
                placeholder="#ff0000"
                className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Tare Weight */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tare Weight (g)
            </label>
            <input
              type="number"
              value={tareG}
              onChange={(e: any) => setTareG(Number(e.target.value))}
              placeholder="0"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Net Weight */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Net Weight (g) *
            </label>
            <input
              required
              type="number"
              value={netG}
              onChange={(e: any) => setNetG(Number(e.target.value))}
              placeholder="1000"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location
            </label>
            <input
              type="text"
              value={location}
              onChange={(e: any) => setLocation(e.target.value)}
              placeholder="e.g., Shelf A, Drawer 3"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Lot Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Lot Number
          </label>
          <input
            type="text"
            value={lot}
            onChange={(e: any) => setLot(e.target.value)}
            placeholder="e.g., LOT2024-001"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Submit Buttons */}
        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-primary flex-1 disabled:opacity-50"
          >
            {isSubmitting ? 'Adding...' : 'Add Spool'}
          </button>
          <a
            href="/spools"
            className="btn btn-secondary flex-1 text-center"
          >
            Cancel
          </a>
        </div>
      </form>
    </div>
  );
}

