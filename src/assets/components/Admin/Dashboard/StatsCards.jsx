import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // Add framer-motion to package.json if not present

const StatsCards = () => {
  const [stats, setStats] = useState({
    members: 0,
    news: 0,
    meetings: 0,
    events: 0,
    zones: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchCounts = async () => {
    setLoading(true);
    setError('');
    try {
      const API = import.meta.env.VITE_API_BASE_URL || '';
      const endpoints = [
        `${API}/api/members/count`,
        `${API}/api/resources/count`,
        `${API}/api/events/meetings/count`,
        `${API}/api/events/events/count`,
        `${API}/api/zones/count`
      ];

      const promises = endpoints.map(endpoint => fetch(endpoint, { credentials: 'include' }).then(res => res.json()));

      const results = await Promise.all(promises);
      setStats({
        members: results[0]?.count || 0,
        news: results[1]?.count || 0,
        meetings: results[2]?.count || 0,
        events: results[3]?.count || 0,
        zones: results[4]?.count || 0
      });
    } catch (err) {
      setError('Failed to load stats');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCounts();
    const interval = setInterval(fetchCounts, 30000); // Refresh every 30s
    return () => clearInterval(interval);
  }, []);

  const statsConfig = [
    { key: 'members', label: 'Total Members', icon: '👥', color: 'from-blue-500 to-blue-600' },
    { key: 'news', label: 'News Posts', icon: '📰', color: 'from-orange-500 to-orange-600' },
    { key: 'meetings', label: 'Meetings', icon: '📅', color: 'from-purple-500 to-purple-600' },
    { key: 'events', label: 'Events', icon: '🎉', color: 'from-emerald-500 to-emerald-600' },
    { key: 'zones', label: 'Zones', icon: '🗺️', color: 'from-indigo-500 to-indigo-600' }
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
        {Array(5).fill().map((_, i) => (
          <div key={i} className="animate-pulse bg-slate-200 rounded-3xl p-8 h-32"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {error && (
        <div className="mb-12 p-6 bg-red-50 border border-red-200 rounded-3xl text-center max-w-2xl mx-auto">
          <p className="text-red-800 font-bold text-lg">{error}</p>
          <button 
            onClick={fetchCounts}
            className="mt-4 bg-red-600 text-white px-8 py-3 rounded-2xl font-black hover:bg-red-700 transition-all shadow-xl"
          >
            🔄 Retry Loading Stats
          </button>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8 place-items-center">
        {statsConfig.map(({ key, label, icon, color }) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.02 }}
            className="group bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-xl border border-slate-200/50 shadow-lg hover:shadow-2xl hover:border-slate-300 rounded-3xl p-8 h-44 w-full max-w-sm flex flex-col justify-center items-center text-center transition-all duration-500 cursor-default hover:-translate-y-1"
          >
            <div className="p-4 bg-gradient-to-r rounded-3xl text-white text-2xl shadow-2xl mb-6 group-hover:scale-110 transition-all duration-300">
              {icon}
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="text-4xl font-black text-slate-900 leading-tight">
                <motion.span
                  key={stats[key]}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  {stats[key].toLocaleString()}
                </motion.span>
              </div>
              <p className="text-slate-600 font-bold text-xs uppercase tracking-widest opacity-90">
                {label}
              </p>
              <div className={`w-10 h-10 rounded-full shadow-lg bg-gradient-to-r ${color} flex items-center justify-center mt-3`}>
                <span className="text-white text-sm font-bold">●</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default StatsCards;
