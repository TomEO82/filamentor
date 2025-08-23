'use client';
import { useEffect, useState } from 'react';

const API = 'http://localhost/api';

export default function EditSpoolPage({ params }: { params: { id: string } }) {
  const [spool, setSpool] = useState(null as any);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Form state
  const [remainingG, setRemainingG] = useState(0);
  const [status, setStatus] = useState('');
  const [location, setLocation] = useState('');
  const [color, setColor] = useState('#ff0000');

  useEffect(() => {
    fetch(`${API}/spools/${params.id}`)
      .then(r => r.json())
      .then(data => {
        setSpool(data);
        setRemainingG(data.remainingG || 0);
        setStatus(data.status || '');
        setLocation(data.location || '');
        setColor(data.color || '#ff0000');
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch spool:', err);
        setError('Failed to load spool');
        setLoading(false);
      });
  }, [params.id]);

  const handleSave = async () => {
    setSaving(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch(`${API}/spools/${params.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          remainingG: Number(remainingG),
          status,
          location: location || undefined,
          color,
        }),
      });

      if (response.ok) {
        setSuccess('Spool updated successfully!');
        // Update local state
        setSpool({ ...spool, remainingG, status, location, color });
      } else {
        throw new Error('Failed to update spool');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to update spool');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this spool? This action cannot be undone.')) {
      return;
    }

    setSaving(true);
    setError('');

    try {
      const response = await fetch(`${API}/spools/${params.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        window.location.href = '/spools';
      } else {
        throw new Error('Failed to delete spool');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to delete spool');
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading spool...</p>
        </div>
      </div>
    );
  }

  if (!spool) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="text-center py-8">
          <p className="text-red-600">Spool not found</p>
          <a href="/spools" className="text-blue-600 hover:underline">Back to spools</a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Edit Spool</h1>
        <p className="text-gray-600">Update spool information and settings</p>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-md">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-3 bg-green-100 border border-green-300 text-green-700 rounded-md">
          {success}
        </div>
      )}

      {/* Spool Info Display */}
      <div className="card p-4 mb-6 bg-gray-50">
        <h2 className="font-medium mb-3">Spool Information</h2>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium">Material:</span> {spool.material?.name || 'Unknown'}
          </div>
          <div>
            <span className="font-medium">Lot:</span> {spool.lot || '—'}
          </div>
          <div>
            <span className="font-medium">Tare Weight:</span> {spool.tareG} g
          </div>
          <div>
            <span className="font-medium">Net Weight:</span> {spool.netG || '—'} g
          </div>
        </div>
      </div>

      {/* Edit Form */}
      <form onSubmit={(e) => { e.preventDefault(); handleSave(); }} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          {/* Remaining Weight */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Remaining Weight (g) *
            </label>
            <input
              required
              type="number"
              value={remainingG}
              onChange={(e: any) => setRemainingG(Number(e.target.value))}
              min="0"
              max={spool.netG || 9999}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-xs text-gray-500 mt-1">
              Max: {spool.netG || 'Unknown'} g
            </p>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status *
            </label>
            <select
              required
              value={status}
              onChange={(e: any) => setStatus(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="IN_STORAGE">In Storage</option>
              <option value="IN_USE">In Use</option>
              <option value="RESERVED">Reserved</option>
              <option value="QUARANTINE">Quarantine</option>
              <option value="SCRAP">Scrap</option>
            </select>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
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
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            disabled={saving}
            className="btn btn-primary flex-1 disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
          <a
            href="/spools"
            className="btn btn-secondary flex-1 text-center"
          >
            Cancel
          </a>
        </div>
      </form>

      {/* Delete Section */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <h3 className="text-lg font-medium text-red-700 mb-3">Danger Zone</h3>
        <div className="card p-4 bg-red-50 border border-red-200">
          <p className="text-sm text-red-700 mb-3">
            Once you delete a spool, there is no going back. Please be certain.
          </p>
          <button
            onClick={handleDelete}
            disabled={saving}
            className="btn bg-red-600 hover:bg-red-700 text-white disabled:opacity-50"
          >
            {saving ? 'Deleting...' : 'Delete Spool'}
          </button>
        </div>
      </div>
    </div>
  );
}
