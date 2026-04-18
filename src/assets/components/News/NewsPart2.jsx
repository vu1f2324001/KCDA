import React, { useState, useEffect } from "react";

const NewsPart2 = () => {
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const API = import.meta.env.VITE_API_BASE_URL || 'https://kcda-1.onrender.com';
        const response = await fetch(`${API}/api/resources`, { credentials: 'include' });
        const data = await response.json();
        // Take latest 6
        const latest = data.slice(0, 6);
        setNewsItems(latest);
      } catch (error) {
        console.error('Failed to fetch news:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  const getCategoryDisplay = (category) => {
    const map = {
      'Legal': 'Regulatory',
      'General': 'General',
      'Medical News': 'Health'
    };
    return map[category] || category;
  };

  return (
    <div className="bg-white px-6 md:px-16 py-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {loading ? (
          <div className="col-span-3 text-center py-32">
            <div className="text-6xl text-gray-400 mb-8 animate-pulse">📰</div>
            <p className="text-xl text-gray-500">Loading latest news...</p>
          </div>
        ) : newsItems.length > 0 ? (
          newsItems.map((item, index) => (
            <div
              key={item._id}
              className="group bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all"
            >
              <div className="h-48 bg-gray-200 overflow-hidden relative">
                {item.fileUrl ? (
                  <img
                    src={item.fileUrl}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                    alt={item.title}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-slate-300 to-slate-400 flex items-center justify-center">
                    <span className="text-4xl text-slate-500">📰</span>
                  </div>
                )}
              </div>
              <div className="p-6">
                <span className="text-blue-600 text-[10px] font-bold uppercase tracking-widest">
                  {getCategoryDisplay(item.category)}
                </span>
                <h3 className="text-xl font-bold text-gray-900 mt-2 mb-4 line-clamp-2 leading-tight">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm mb-4 line-clamp-3 leading-relaxed">
                  {item.content}
                </p>
                <div className="text-xs font-bold uppercase tracking-wider text-gray-600 mb-4">
                  {new Date(item.uploadedAt).toLocaleDateString('en-IN', { 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                </div>
                <button className="text-blue-600 font-bold text-xs uppercase tracking-widest hover:text-blue-800 transition-colors">
                  Read More →
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-3 text-center py-32">
            <div className="text-6xl text-gray-400 mb-8">📭</div>
            <h3 className="text-3xl font-bold text-gray-900 mb-4">No News Yet</h3>
            <p className="text-lg text-gray-500 max-w-md mx-auto">
              Latest pharmaceutical news and updates will appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsPart2;

