import React, { useState, useEffect } from "react";

const EditZone = ({ zoneId, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: '',
    wards: '',
    inCharge: '',
    primaryAreas: '',
    status: 'Active'
  });
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState('');

  useEffect(() => {
    if (zoneId) {
      fetchZone();
    }
  }, [zoneId]);

  const fetchZone = async () => {
    setFetchError('');
    setLoading(true);
    try {
      const API = import.meta.env.VITE_API_BASE_URL || '';
      console.log('Fetching zone:', `${API}/api/zones/${zoneId}`);
      const response = await fetch(`${API}/api/zones/${zoneId}`, { credentials: 'include' });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      const zone = await response.json();
      console.log('Zone data received:', zone);
      setFormData({
        name: zone.name || '',
        wards: zone.wards || '',
        inCharge: zone.inCharge || '',
        primaryAreas: zone.primaryAreas || '',
        status: zone.status || 'Active'
      });
    } catch (error) {
      console.error('Fetch zone error:', error);
      setFetchError(`Failed to load zone: ${error.message}. Check backend /api/zones/${zoneId}`);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const API = import.meta.env.VITE_API_BASE_URL || '';
      const response = await fetch(`${API}/api/zones/${zoneId}`, { 
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        onUpdate();
        onClose();
      }
    } catch (error) {
      console.error('Update zone error:', error);
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50" onClick={onClose}>
      <div className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-black text-gray-900">Edit Zone {zoneId}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl font-bold">×</button>
        </div>
        
        {loading && (
          <div className="flex items-center justify-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mr-4"></div>
            <span className="text-lg font-bold text-blue-600">Loading zone data...</span>
          </div>
        )}
        
        {fetchError && (
          <div className="p-6 bg-red-50 border border-red-200 rounded-2xl mb-6 animate-pulse">
            <div className="text-red-800 font-bold mb-3">{fetchError}</div>
            <button 
              onClick={fetchZone}
              className="bg-blue-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-blue-700 transition-colors"
            >
              🔄 Retry Load
            </button>
          </div>
        )}
        
        {(!loading && !fetchError) && (
          <>
            <div className="text-xs text-slate-500 mb-4 italic">
              Editing: {formData.name || 'Loading...'}
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Zone Name *</label>
                <input 
                  type="text" 
                  name="name" 
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-4 border border-gray-300 rounded-2xl focus:ring-4 focus:ring-blue-500 focus:border-transparent text-lg"
                  required 
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Wards *</label>
                <input 
                  type="text" 
                  name="wards" 
                  value={formData.wards}
                  onChange={handleChange}
                  className="w-full p-4 border border-gray-300 rounded-2xl focus:ring-4 focus:ring-blue-500 focus:border-transparent text-lg"
                  required 
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Zone In-Charge *</label>
                <input 
                  type="text" 
                  name="inCharge" 
                  value={formData.inCharge}
                  onChange={handleChange}
                  className="w-full p-4 border border-gray-300 rounded-2xl focus:ring-4 focus:ring-blue-500 focus:border-transparent text-lg"
                  required 
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Primary Areas *</label>
                <textarea 
                  name="primaryAreas" 
                  rows="4"
                  value={formData.primaryAreas}
                  onChange={handleChange}
                  className="w-full p-4 border border-gray-300 rounded-2xl focus:ring-4 focus:ring-blue-500 focus:border-transparent text-lg resize-none"
                  required 
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Status</label>
                <select 
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full p-4 border border-gray-300 rounded-2xl focus:ring-4 focus:ring-blue-500 focus:border-transparent text-lg"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <div className="flex gap-4 pt-4">
                <button 
                  type="submit" 
                  disabled={loading}
                  className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-black text-lg py-4 px-8 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
                >
                  {loading ? 'Updating...' : 'Update Zone'}
                </button>
                <button 
                  type="button"
                  onClick={onClose}
                  className="px-8 py-4 bg-gray-100 hover:bg-gray-200 text-gray-800 font-black text-lg rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default EditZone;
