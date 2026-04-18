import React, { useState, useRef } from "react";

const AddEvent = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    venue: ""
  });
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const fileInputRef = useRef(null);
  const [previewCount, setPreviewCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    console.log("File change triggered", e.target.files);
    const newFiles = Array.from(e.target.files || []);
    const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
    setFiles(newFiles);
    setPreviews(newPreviews);
    setPreviewCount(newPreviews.length);
    e.target.value = '';
  };

  const triggerFileInput = () => {
    console.log("CLICK WORKING", fileInputRef.current);
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = new FormData();
      data.append('title', formData.title);
      data.append('description', formData.description);
      data.append('date', formData.date);
      data.append('venue', formData.venue);
      files.forEach((file) => data.append('images', file));

      const API = import.meta.env.VITE_API_BASE_URL || 'https://kcda-1.onrender.com';
      const response = await fetch(`${API}/api/events/events`, {
        method: 'POST',
        credentials: 'include',
        body: data,
      });

      if (response.ok) {
        alert('Event published successfully!');
        setFormData({ title: "", description: "", date: "", venue: "" });
        setFiles([]);
        setPreviews([]);
      } else {
        const error = await response.json();
        alert(`Error: ${error.error || 'Failed to add event'}`);
      }
    } catch (err) {
      alert('Server Error. Check backend console.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-5xl p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tight">
          Post New Event
        </h1>
        <p className="text-slate-500 font-medium">
          Upload event descriptions and high-quality gallery images.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-[2rem] shadow-2xl border border-slate-100 p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Text Section */}
          <div className="space-y-6">
            <div>
              <label className="block text-[10px] font-black text-slate-600 uppercase tracking-widest mb-2 font-bold">
                Event Title *
              </label>
              <input
                type="text"
                className="w-full p-4 bg-white text-black border border-slate-300 rounded-xl font-semibold focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 outline-none placeholder:text-gray-400"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Enter event title"
                required
              />
            </div>
            <div>
              <label className="block text-[10px] font-black text-slate-600 uppercase tracking-widest mb-2 font-bold">
                Event Date *
              </label>
              <input
                type="date"
                className="w-full p-4 bg-white text-black border border-slate-300 rounded-xl font-semibold focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 outline-none cursor-pointer"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-[10px] font-black text-slate-600 uppercase tracking-widest mb-2 font-bold">
                Venue
              </label>
              <input
                type="text"
                className="w-full p-4 bg-white text-black border border-slate-300 rounded-xl font-semibold focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 outline-none placeholder:text-gray-400"
                value={formData.venue}
                onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                placeholder="Event location"
              />
            </div>
            <div>
              <label className="block text-[10px] font-black text-slate-600 uppercase tracking-widest mb-2 font-bold">
                Event Description *
              </label>
              <textarea
                className="w-full p-4 bg-white text-black border border-slate-300 rounded-2xl h-48 font-semibold focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 resize-vertical outline-none placeholder:text-gray-400"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe the event..."
                required
              />
            </div>
          </div>

          {/* Image Upload Section */}
          <div className="space-y-6">
            <div>
              <label className="block text-[10px] font-black text-slate-600 uppercase tracking-widest mb-2 font-bold">
                Gallery Images/Videos (Optional)
              </label>

              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*,video/*"
                onChange={handleFileChange}
                className="hidden"
              />

              <div
                onClick={triggerFileInput}
                className="cursor-pointer border-2 border-dashed border-slate-300 rounded-2xl p-6 text-center hover:border-blue-500 hover:bg-blue-50"
              >
                <span className="text-3xl mb-2">📸</span>
                <span className="text-xs font-bold text-slate-600 hover:text-blue-600 text-center">
                  Click to add gallery images/videos
                </span>
              </div>

              {previews.length > 0 && (
                <div>
                  <p className="text-sm font-bold text-slate-700 mb-2">Selected ({previewCount})</p>
                  <div className="grid grid-cols-3 gap-3">
                    {previews.map((url, i) => (
                      <div key={i} className="relative">
                        <img
                          src={url}
                          className="h-20 w-full object-cover rounded-xl border-2 border-white shadow-sm"
                          alt="preview"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-5 rounded-2xl font-black shadow-lg hover:shadow-2xl transition-all uppercase tracking-widest text-sm disabled:opacity-50"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Publishing...
                  </span>
                ) : (
                  'Publish Event'
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddEvent;
