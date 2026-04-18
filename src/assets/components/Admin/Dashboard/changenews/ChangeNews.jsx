import React, { useState, useEffect, useCallback, useRef } from "react";
import EditNewsModal from "./EditNewsModal";

const ChangeNews = () => {
  const [newsItems, setNewsItems] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedNews, setSelectedNews] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "Regulatory",
    publishedDate: ""
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const API = import.meta.env.VITE_API_BASE_URL || '';
      const response = await fetch(`${API}/api/resources`, { credentials: 'include' });
      const data = await response.json();
      setNewsItems(data || []);
    } catch (err) {
      console.error("Failed to fetch news:", err);
    }
  };

  const handleImageChange = useCallback((e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
    // Reset input
    e.target.value = '';
  }, []);

  const triggerFileInput = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.content) {
      alert('Title and Content required!');
      return;
    }
    setLoading(true);
    try {
      const data = new FormData();
      data.append('title', formData.title);
      data.append('content', formData.content);
      data.append('category', formData.category);
      data.append('publishedDate', formData.publishedDate);
      if (selectedImage) data.append('thumbnail', selectedImage);

      const API = import.meta.env.VITE_API_BASE_URL || '';
      const response = await fetch(`${API}/api/resources`, {
        method: 'POST',
        credentials: 'include',
        body: data,
      });

      if (response.ok) {
        alert('News added successfully!');
        fetchNews();
        setFormData({ title: "", content: "", category: "Regulatory", publishedDate: "" });
        setSelectedImage(null);
        setPreviewUrl(null);
      } else {
        const error = await response.json();
        alert(`Error: ${error.error || 'Failed to add news'}`);
      }
    } catch (err) {
      alert('Add failed - check backend console');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = useCallback((item) => {
    setSelectedNews(item);
    setIsEditModalOpen(true);
  }, []);

  const handleDelete = async (id) => {
    if (!confirm('Delete this news item?')) return;
    try {
      const API = import.meta.env.VITE_API_BASE_URL || '';
      const response = await fetch(`${API}/api/resources/${id}`, { method: 'DELETE', credentials: 'include' });
      if (response.ok) {
        alert('News deleted successfully!');
        fetchNews();
      } else {
        alert('Delete failed');
      }
    } catch (err) {
      alert('Delete failed - check backend');
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">
          News Management ({newsItems.length})
        </h1>
      </div>

      {/* Add Form */}
      <div className="bg-white p-8 rounded-[2.5rem] shadow-xl mb-8">
        <h3 className="text-xl font-black mb-6 uppercase text-slate-900">Add New News</h3>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2">
                Title *
              </label>
              <input
                className="w-full bg-slate-50 border p-5 rounded-2xl focus:border-blue-500 font-bold focus:ring-4 focus:ring-blue-500/10 text-slate-900 text-lg leading-relaxed min-h-[48px]"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                placeholder="Enter news title"
                required
              />
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2">
                Content *
              </label>
              <textarea
                rows="4"
                className="w-full bg-slate-50 border p-5 rounded-2xl focus:border-blue-500 font-bold focus:ring-4 focus:ring-blue-500/10 resize-vertical text-slate-900 text-lg leading-relaxed"
                value={formData.content}
                onChange={(e) => setFormData({...formData, content: e.target.value})}
                placeholder="Enter news description"
                required
              />
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2">
                  Category
                </label>
                <select
                  className="w-full bg-white border-slate-300 text-slate-900 font-bold text-lg p-4 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 appearance-none cursor-pointer shadow-sm"
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                >
                  <option value="Regulatory">Regulatory</option>
                  <option value="Research">Research</option>
                  <option value="Tech">Tech</option>
                  <option value="Legal">Legal</option>
                  <option value="General">General</option>
                </select>
              </div>
              <div className="flex-1">

                <label className="block text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2">
                  Published Date
                </label>
                <input
                  type="date"
                  className="w-full bg-white border-slate-300 p-5 rounded-2xl focus:border-blue-500 font-bold focus:ring-4 focus:ring-blue-500/10 text-slate-900 text-lg shadow-sm cursor-pointer"
                  value={formData.publishedDate}
                  onChange={(e) => setFormData({...formData, publishedDate: e.target.value})}
                />

              </div>
            </div>
          </div>
          
          {/* Thumbnail Upload - EXPLICIT BUTTON ONLY */}
          <div>
            <label className="block text-[10px] font-black uppercase text-slate-400 tracking-widest mb-4">
              Thumbnail (Optional)
            </label>
            <div className="border border-slate-200 rounded-2xl p-6 bg-slate-50 hover:bg-slate-100 transition-colors">
              {previewUrl ? (
                <div className="flex items-center gap-4">
                  <div className="w-20 h-16 rounded-xl overflow-hidden shadow-md flex-shrink-0">
                    <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-700 mb-2 truncate max-w-[200px]">Image ready</p>
                    <button
                      type="button"
                      onClick={triggerFileInput}
                      className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
                    >
                      Replace Image
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setPreviewUrl(null);
                        setSelectedImage(null);
                      }}
                      className="ml-2 px-3 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold rounded-lg transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={triggerFileInput}
                  className="flex flex-col items-center p-8 border-2 border-dashed border-slate-300 rounded-2xl hover:border-blue-400 hover:bg-blue-50 transition-all cursor-pointer group"
                >
                  <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mb-3 group-hover:bg-blue-100 group-hover:scale-110 transition-all duration-200">
                    <span className="text-2xl group-hover:text-blue-600 transition-colors">📷</span>
                  </div>
                  <p className="text-sm font-medium text-slate-600 group-hover:text-blue-600 mb-1 transition-colors">
                    Click to add thumbnail
                  </p>
                  <p className="text-xs text-slate-400">JPG, PNG up to 5MB</p>
                </button>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
          </div>
          
          <div className="lg:col-span-2 pt-6 border-t border-slate-100 flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-4 px-10 rounded-2xl font-black uppercase tracking-wider shadow-xl hover:shadow-2xl disabled:opacity-50 transition-all duration-300"
            >
              {loading ? (
                <span className="flex items-center gap-3">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Publishing...
                </span>
              ) : "Publish News Item"}
            </button>
          </div>
        </form>
      </div>

      {/* News Table */}
      <div className="bg-white rounded-[2.5rem] shadow-xl overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <h3 className="text-xl font-black uppercase text-slate-900">
            All News Items ({newsItems.length})
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50">
                <th className="p-6 text-left text-xs font-black uppercase text-slate-400 tracking-wider">Thumbnail</th>
                <th className="p-4 text-left text-xs font-black uppercase text-slate-400 tracking-wider">Title</th>
                <th className="p-4 text-left text-xs font-black uppercase text-slate-400 tracking-wider">Category</th>
                <th className="p-4 text-left text-xs font-black uppercase text-slate-400 tracking-wider">Date</th>
                <th className="p-4 text-right text-xs font-black uppercase text-slate-400 tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {newsItems.map((item) => (
                <tr key={item._id} className="border-t hover:bg-slate-50 transition-colors">
                  <td className="p-4">
                    <div className="w-14 h-10 rounded-lg overflow-hidden bg-slate-100 shadow-sm">
                      {item.fileUrl ? (
                        <img 
                          src={item.fileUrl} 
                          alt="" 
                          className="w-full h-full object-cover" 
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs text-slate-400 font-medium">
                          No image
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="p-4 font-semibold text-slate-900 max-w-md">
                    <div className="truncate cursor-default select-text" title={item.title}>
                      {item.title}
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="px-3 py-1 bg-slate-900 text-white text-xs rounded-full font-bold uppercase cursor-default shadow-sm">
                      {item.category}
                    </span>
                  </td>
                    <td className="p-4 text-slate-700 text-sm font-bold cursor-default">
                      {item.publishedDate ? new Date(item.publishedDate).toLocaleDateString('en-IN') : item.uploadedAt ? new Date(item.uploadedAt).toLocaleDateString('en-IN') : 'No date'}
                    </td>
                  <td className="p-4">
                    <div className="flex gap-2 justify-end">
                      <button
                        type="button"
                        onClick={() => handleEdit(item)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-lg hover:shadow-xl transition-all duration-200"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(item._id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-lg hover:shadow-xl transition-all duration-200"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {newsItems.length === 0 && (
                <tr>
                  <td colSpan="5" className="p-16 text-center text-slate-400">
                    <div className="text-5xl mb-6 mx-auto animate-pulse">📰</div>
                    <p className="font-bold text-lg mb-2">No news items yet</p>
                    <p className="text-sm opacity-75">Add your first news using the form above</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {selectedNews && (
        <EditNewsModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedNews(null);
          }}
          newsItem={selectedNews}
          onUpdate={fetchNews}
        />
      )}
    </div>
  );
};

export default ChangeNews;


