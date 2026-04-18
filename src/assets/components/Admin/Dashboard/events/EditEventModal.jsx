import React, { useState, useEffect, useCallback, useRef } from "react";

const EditEventModal = ({ 
  isOpen, 
  onClose, 
  eventItem, 
  onUpdate 
}) => {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    venue: "",
    description: ""
  });
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (eventItem) {
      setFormData({
        title: eventItem.title || "",
        date: eventItem.date ? new Date(eventItem.date).toISOString().split('T')[0] : "",
        venue: eventItem.venue || "",
        description: eventItem.description || ""
      });
      
      // Load existing images - remove duplicates
      const images = [];
      const seenUrls = new Set();
      
      if (eventItem.bannerImage) {
        if (!seenUrls.has(eventItem.bannerImage)) {
          images.push({ url: eventItem.bannerImage, type: 'banner', isVideo: false });
          seenUrls.add(eventItem.bannerImage);
        }
      }
      
      if (eventItem.imageUrls && eventItem.imageUrls.length > 0) {
        eventItem.imageUrls.forEach((url) => {
          if (!seenUrls.has(url)) {
            images.push({ url, type: 'gallery', isVideo: url.match(/\.(mp4|avi|mov|wmv)$/i) });
            seenUrls.add(url);
          }
        });
      }
      
      setExistingImages(images);
    }
  }, [eventItem]);

  const handleFileChange = useCallback((e) => {
    const newFiles = Array.from(e.target.files);
    const newPreviews = newFiles.map((file) => ({
      url: URL.createObjectURL(file),
      file,
      isVideo: file.type.startsWith('video/')
    }));
    setFiles(newFiles);
    setPreviews(newPreviews);
    e.target.value = '';
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      const data = new FormData();
      data.append('title', formData.title);
      data.append('description', formData.description);
      data.append('date', formData.date);
      data.append('venue', formData.venue);
      
      files.forEach((file) => data.append('images', file));

      const API = import.meta.env.VITE_API_BASE_URL || '';
      const response = await fetch(`${API}/api/events/events/${eventItem._id}`, {
        method: 'PUT',
        credentials: 'include',
        body: data,
      });

      if (response.ok) {
        onUpdate();
        onClose();
        alert('Event updated successfully!');
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Update failed');
      }
    } catch (err) {
      setError('Update failed - check backend');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (!isOpen || !eventItem) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl mx-4">
        <div className="flex justify-between items-center mb-8 pb-4 border-b border-slate-200">
          <h3 className="text-2xl font-black uppercase text-slate-900 tracking-tight">
            Edit Event
          </h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 text-3xl font-bold p-2 -m-2 rounded-xl hover:bg-slate-100 transition-all"
          >
            ×
          </button>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
            <p className="text-red-800 font-bold text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Form fields */}
          <div>
            <label className="block text-[10px] font-black uppercase text-slate-400 tracking-widest mb-3">
              Event Title *
            </label>
            <input
              name="title"
              className="w-full bg-slate-50 border p-4 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 font-bold text-lg"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-black uppercase text-slate-400 tracking-widest mb-3">
                Date *
              </label>
              <input
                name="date"
                type="date"
                className="w-full bg-slate-50 border p-4 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 font-bold"
                value={formData.date}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase text-slate-400 tracking-widest mb-3">
                Venue
              </label>
              <input
                name="venue"
                type="text"
                className="w-full bg-slate-50 border p-4 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 font-bold"
                value={formData.venue}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-black uppercase text-slate-400 tracking-widest mb-3">
              Description *
            </label>
            <textarea
              name="description"
              rows="4"
              className="w-full bg-slate-50 border p-4 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 font-medium resize-vertical"
              value={formData.description}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Media Gallery */}
          <div>
            <label className="block text-[10px] font-black uppercase text-slate-400 tracking-widest mb-4">
              Gallery - Existing + New
            </label>
            <div className="border border-slate-200 rounded-2xl p-6 bg-slate-50 space-y-4">
              
              {/* Existing Images */}
              {existingImages.length > 0 && (
                <div>
                  <p className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-3 pb-2 border-b border-slate-200">
                    Current Media ({existingImages.length})
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                    {existingImages.map((img, i) => (
                      <div key={i} className="relative rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all group">
                        {img.isVideo ? (
                          <video 
                            src={img.url} 
                            className="w-full h-24 object-cover"
                            muted
                          >
                            Your browser does not support video.
                          </video>
                        ) : (
                          <img 
                            src={img.url} 
                            alt={`Media ${i + 1}`}
                            className="w-full h-24 object-cover cursor-pointer group-hover:scale-105 transition-transform duration-200"
                          />
                        )}
                        <div className="absolute bottom-1 right-1 bg-black/75 text-white text-xs px-2 py-1 rounded-tl-lg">
                          {img.isVideo ? 'VIDEO' : 'IMG'}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* New Previews */}
              {previews.length > 0 && (
                <div>
                  <p className="text-xs font-bold text-green-600 uppercase tracking-wider mb-3 pb-2 border-b border-green-200">
                    New Uploads ({previews.length})
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                    {previews.map((preview, i) => (
                      <div key={i} className="relative rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all group">
                        {preview.isVideo ? (
                          <video 
                            src={preview.url} 
                            className="w-full h-24 object-cover"
                            muted
                          >
                            Video preview
                          </video>
                        ) : (
                          <img 
                            src={preview.url} 
                            alt={`New ${i + 1}`}
                            className="w-full h-24 object-cover cursor-pointer group-hover:scale-105 transition-transform duration-200"
                          />
                        )}
                        <div className="absolute bottom-1 right-1 bg-green-600 text-white text-xs px-2 py-1 rounded-tl-lg">
                          NEW
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Add Button */}
              <button
                type="button"
                className="w-full flex items-center justify-center gap-3 p-8 border-2 border-dashed border-slate-300 rounded-2xl hover:border-blue-400 hover:bg-blue-50 transition-all text-slate-500 hover:text-blue-600 font-medium group"
                onClick={(e) => fileInputRef.current?.click()}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*,video/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <svg className="w-8 h-8 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span className="text-lg font-bold">Add Images or Videos</span>
              </button>
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-4 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-8 py-3 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-2xl font-bold uppercase tracking-wider transition-all shadow-md"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 text-white rounded-2xl font-black uppercase tracking-wider shadow-xl hover:shadow-2xl disabled:opacity-50 transition-all"
            >
              {loading ? 'Updating...' : 'Update Event'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEventModal;
