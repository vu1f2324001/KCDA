import React, { useState, useEffect } from "react";

const EditNewsModal = ({ isOpen, onClose, newsItem, onUpdate }) => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "Regulatory",
    publishedDate: ""
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (newsItem) {
      setFormData({
        title: newsItem.title || "",
        content: newsItem.content || "",
        category: newsItem.category || "Regulatory",
        publishedDate: newsItem.publishedDate ? newsItem.publishedDate.split('T')[0] : ""
      });
      setPreviewUrl(newsItem.fileUrl || null);
    }
  }, [newsItem]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (selectedImage) {
        const imageData = new FormData();
        imageData.append('thumbnail', selectedImage);
        const API = import.meta.env.VITE_API_BASE_URL || 'https://kcda-1.onrender.com';
        const imageRes = await fetch(`${API}/api/resources/${newsItem._id}/image`, {
          method: 'PUT',
          credentials: 'include',
          body: imageData,
        });
        if (imageRes.ok) {
          const imageResult = await imageRes.json();
          formData.fileUrl = imageResult.fileUrl;
        }
      }

      const API = import.meta.env.VITE_API_BASE_URL || 'https://kcda-1.onrender.com';
      const response = await fetch(`${API}/api/resources/${newsItem._id}`, {
        method: 'PUT',
        credentials: 'include',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        onUpdate();
        onClose();
      } else {
        const error = await response.json();
        alert(`Error: ${error.error}`);
      }
    } catch (err) {
      alert("Update failed");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[110] flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-2xl rounded-[3rem] p-10 shadow-2xl">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-black text-slate-900 uppercase">
            Edit News: <span className="text-blue-600">{formData.title.substring(0,30)}...</span>
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-900 font-black text-xl">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2 block">
              Title *
            </label>
            <textarea
              required
              rows="2"
              className="w-full bg-slate-50 border p-4 rounded-2xl focus:border-blue-500 font-bold text-slate-900"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              placeholder="Enter news title (required)"
            />
          </div>

          <div>
            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2 block">
              Content *
            </label>
            <textarea
              required
              rows="3"
              className="w-full bg-slate-50 border p-4 rounded-2xl focus:border-blue-500 font-bold text-slate-900"
              value={formData.content}
              onChange={(e) => setFormData({...formData, content: e.target.value})}
              placeholder="Enter description (required)"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2 block">
                Category
              </label>
              <select
                className="w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 font-bold text-slate-900 text-sm"
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
              >
                <option value="Regulatory">Regulatory</option>
                <option value="Research">Research</option>
                <option value="Tech">Tech</option>
                <option value="Legal">Legal</option>
                <option value="General">General</option>
                <option value="Medical News">Medical News</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2 block">
                Published Date
              </label>
              <input
                type="date"
                className="w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 font-bold text-slate-900 text-sm"
                value={formData.publishedDate}
                onChange={(e) => setFormData({...formData, publishedDate: e.target.value})}
              />
            </div>
          </div>

          {/* Image Upload */}

          <div>
            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-4 block">
              Thumbnail {previewUrl ? '(Current image shown, replace to update)' : '(Optional)'}
            </label>
            <div className="border-2 border-dashed border-slate-200 rounded-2xl p-6 text-center hover:border-blue-300 transition-all cursor-pointer">
              {previewUrl ? (
                <div className="space-y-3">
                  <img src={previewUrl} alt="Current thumbnail" className="w-32 h-24 object-cover rounded-xl mx-auto shadow-lg" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 mb-3"
                  />
                  <div className="text-slate-400 text-sm">Upload new image or leave blank</div>
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-4 pt-6">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-600 text-white py-4 rounded-2xl font-black uppercase tracking-wider text-sm shadow-xl hover:bg-blue-700 transition-all disabled:opacity-50"
            >
              {loading ? "Updating..." : "Update News"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-8 py-4 border border-slate-300 hover:border-slate-400 text-slate-700 font-bold rounded-2xl hover:bg-slate-50 transition-all"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditNewsModal;

