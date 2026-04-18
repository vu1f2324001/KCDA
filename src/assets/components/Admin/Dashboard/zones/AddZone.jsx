import React, { useState } from "react";

const AddZone = ({ onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    name: '',
    wards: '',
    inCharge: '',
    primaryAreas: '',
    status: 'Active'
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const API = import.meta.env.VITE_API_BASE_URL || '';
        const response = await fetch(`${API}/api/zones`, {
        method: 'POST',
          credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        onAdd();
        onClose();
      }
    } catch (error) {
      console.error('Add zone error:', error);
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50" onClick={onClose}>
      <div className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-black text-gray-900">Add New Zone</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl font-bold">×</button>
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
              placeholder="Zone A"
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
              placeholder="Wards 15, 16"
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
              placeholder="John Doe"
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
              placeholder="Pachra, Hanuman Nagar, Chinchpada Road"
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
              className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-black text-lg py-4 px-8 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
            >
              {loading ? 'Adding...' : 'Add Zone'}
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
      </div>
    </div>
  );
};

export default AddZone;

