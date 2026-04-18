import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ZonePart1 from "../Zones/Zpart1.jsx";
import ZonePart2 from "../Zones/zpart2.jsx";

const Zone = () => {
  const [zones, setZones] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchZones();
  }, []);

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

  return (
    <div className="bg-white">
      <ZonePart1 />
      {loading ? (
        <div className="py-32">
          <div className="text-center">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-20 h-20 border-4 border-blue-200 border-t-blue-600 rounded-full mx-auto mb-8"
            />
            <p className="text-2xl font-bold text-gray-600">Loading KCDA Zones...</p>
          </div>
        </div>
      ) : zones.length === 0 ? (
        <div className="py-32 text-center">
          <div className="text-8xl text-gray-200 mb-12">📍</div>
          <h2 className="text-4xl font-black text-gray-900 mb-4">Zones Directory</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            KCDA operational zones and in-charges directory will appear here.
          </p>
          <p className="text-sm font-bold text-blue-600 uppercase tracking-wider">
            Check back soon or contact admin@kcda.org
          </p>
        </div>
      ) : (
        <ZonePart2 zones={zones} />
      )}
    </div>
  );
};

export default Zone;

