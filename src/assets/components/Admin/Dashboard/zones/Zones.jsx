import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import AddZone from "./AddZone.jsx";
import EditZone from "./EditZone.jsx";

const Zones = () => {
  const [zones, setZones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editZoneId, setEditZoneId] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    fetchZones();
  }, [refreshKey]);

  const fetchZones = async () => {
    try {
      const API = import.meta.env.VITE_API_BASE_URL || '';
      const response = await fetch(`${API}/api/zones`);
      const data = await response.json();
      setZones(data);
    } catch (error) {
      console.error('Failed to fetch zones:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddZone = () => {
    setIsAddModalOpen(false);
    setRefreshKey(prev => prev + 1);
  };

  const handleUpdateZone = () => {
    setEditZoneId(null);
    setRefreshKey(prev => prev + 1);
  };

  const handleDeleteZone = async (zoneId) => {
    if (!confirm('Delete this zone?')) return;
    try {
      const API = import.meta.env.VITE_API_BASE_URL || '';
      const response = await fetch(`${API}/api/zones/${zoneId}`, { method: 'DELETE' });
      if (response.ok) {
        setRefreshKey(prev => prev + 1);
      }
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-8 max-w-7xl mx-auto"
    >
      <div className="flex items-center justify-between mb-12">
        <div>
          <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent drop-shadow-lg">
            Zones Management
          </h1>
          <p className="text-xl text-gray-600 mt-2 font-semibold">KCDA zone in-charges and areas</p>
        </div>
        <motion.button
          onClick={() => setIsAddModalOpen(true)}
          className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-black text-lg rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          + Add Zone
        </motion.button>
      </div>

      {loading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="animate-pulse p-8 bg-white rounded-3xl shadow-lg">
              <div className="h-6 bg-slate-200 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-slate-200 rounded w-1/2 mb-3"></div>
              <div className="h-4 bg-slate-200 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      ) : zones.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-32"
        >
          <div className="text-8xl text-gray-200 mb-12">📍</div>
          <h3 className="text-4xl font-black text-gray-900 mb-4">No Zones Yet</h3>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Add your first KCDA zone with wards, in-charge, and primary areas.
          </p>
          <motion.button
            onClick={() => setIsAddModalOpen(true)}
            className="px-12 py-5 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-black text-xl rounded-2xl shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-400"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Create First Zone
          </motion.button>
        </motion.div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {zones.map((zone, index) => (
            <motion.div
              key={zone._id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`group p-8 rounded-3xl shadow-xl border-4 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 cursor-pointer relative overflow-hidden ${
                zone.status === 'Active' ? 'bg-gradient-to-br from-emerald-50 to-blue-50 border-emerald-200 hover:border-emerald-300' : 'bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200 hover:border-gray-300'
              }`}
              whileHover={{ scale: 1.02 }}
            >
              {zone.status !== 'Active' && (
                <div className="absolute top-4 right-4 bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  Inactive
                </div>
              )}
              <div className="h-40 bg-gradient-to-br from-blue-500/10 to-emerald-500/10 rounded-2xl mb-6 flex items-center justify-center group-hover:scale-105 transition-transform">
                <div className="text-5xl animate-pulse">📍</div>
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-4 leading-tight">{zone.name}</h3>
              <div className="space-y-3 mb-6 text-sm">
                <div>
                  <span className="text-gray-500 font-bold uppercase tracking-wider text-xs">Wards</span>
                  <p className="font-semibold text-gray-800 mt-1">{zone.wards}</p>
                </div>
                <div>
                  <span className="text-gray-500 font-bold uppercase tracking-wider text-xs">In-Charge</span>
                  <p className="font-bold text-blue-700 mt-1 text-lg">{zone.inCharge}</p>
                </div>
                <div>
                  <span className="text-gray-500 font-bold uppercase tracking-wider text-xs">Areas</span>
                  <p className="text-gray-700 mt-1 line-clamp-3">{zone.primaryAreas}</p>
                </div>
              </div>
              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => setEditZoneId(zone._id)}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold text-sm py-3 px-6 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteZone(zone._id)}
                  className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold text-sm rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {isAddModalOpen && (
        <AddZone onClose={() => setIsAddModalOpen(false)} onAdd={handleAddZone} />
      )}

      {editZoneId && (
        <EditZone 
          zoneId={editZoneId}
          onClose={() => setEditZoneId(null)}
          onUpdate={handleUpdateZone} 
        />
      )}
    </motion.div>
  );
};

export default Zones;

