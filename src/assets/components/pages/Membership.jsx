import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Membership = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const API = import.meta.env.VITE_API_BASE_URL || '';
      const response = await fetch(`${API}/api/members/active`);
      if (!response.ok) throw new Error('Failed to fetch');
      const data = await response.json();
      setMembers(data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-8"></div>
          <p className="text-xl font-bold text-gray-600">Loading KCDA Members...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight mb-6 bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 bg-clip-text text-transparent">
            KCDA Members
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Proud chemist community powering Kalyan's healthcare ecosystem.
          </p>
          <p className="text-4xl font-black text-slate-800 mt-4">
            {members.length} Active Members
          </p>
        </motion.div>

        {error ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-32"
          >
            <div className="text-8xl text-gray-200 mb-8 mx-auto">👥</div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Members Directory</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Member directory temporarily unavailable. <br/>
              <span className="font-bold text-blue-600 underline cursor-pointer hover:text-blue-700" onClick={fetchMembers}>
                🔄 Try Again
              </span>
            </p>
          </motion.div>
        ) : members.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-32"
          >
            <div className="text-8xl text-gray-200 mb-12 mx-auto">👥</div>
            <h2 className="text-4xl font-black text-gray-900 mb-4">KCDA Member Directory</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Our proud chemist members will appear here once added through Admin Dashboard.
            </p>
            <p className="text-lg font-semibold text-blue-600 mt-4">
              Admin: Add members via Dashboard → Manage Members
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          >
            {members.map((member, index) => (
              <motion.div
                key={member._id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 p-8 border border-slate-100 hover:border-blue-200 cursor-pointer"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-start gap-6 mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                    <span className="text-3xl text-white font-bold drop-shadow-lg">
                      {member.name?.charAt(0)?.toUpperCase() || 'K'}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-2xl font-black text-gray-900 group-hover:text-blue-700 transition-colors mb-2 truncate">
                      {member.name}
                    </h3>
                    <p className="text-lg font-semibold text-slate-600 mb-1 truncate max-w-[200px]">
                      {member.storeName}
                    </p>
                    <p className="text-sm text-slate-500 uppercase tracking-wider font-medium">
                      Ward: {member.ward || 'N/A'}
                    </p>
                  </div>
                </div>
                <div className="border-t border-slate-100 pt-4">
                  <p className="text-sm text-gray-600 italic leading-relaxed">
                    "{member.bio || 'Proud KCDA member contributing to Kalyan\'s healthcare ecosystem.'}"
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Membership;
