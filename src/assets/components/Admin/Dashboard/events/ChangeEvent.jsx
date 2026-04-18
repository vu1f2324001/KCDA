import React, { useState, useEffect, useCallback, useRef } from "react";
import EditEventModal from "./EditEventModal";

const ChangeEvent = () => {
  const [events, setEvents] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    venue: "",
    description: "",
    type: "event"
  });
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const API = import.meta.env.VITE_API_BASE_URL || '';
      const response = await fetch(`${API}/api/events/events`);
      const data = await response.json();
      setEvents(data || []);
    } catch (err) {
      console.error("Failed to fetch events:", err);
    }
  };

  const handleFileChange = useCallback((e) => {
    const newFiles = Array.from(e.target.files);
    const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
    setFiles(newFiles);
    setPreviews(newPreviews);
    e.target.value = '';
  }, []);

  // Removed unused triggerFileInput - file input now uses button click handlers

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = new FormData();
      data.append('title', formData.title);
      data.append('description', formData.description);
      data.append('date', formData.date);
      data.append('venue', formData.venue);
      data.append('type', formData.type);
      files.forEach((file) => data.append('images', file));

      const API = import.meta.env.VITE_API_BASE_URL || '';
      const response = await fetch(`${API}/api/events/events`, {
        method: 'POST',
        body: data,
      });

      if (response.ok) {
        alert('Event published successfully!');
        fetchEvents();
        setFormData({ title: "", description: "", date: "", venue: "", type: "event" });
        setFiles([]);
        setPreviews([]);
      } else {
        const error = await response.json();
        alert(`Error: ${error.error || 'Failed to add event'}`);
      }
    } catch (err) {
      alert('Add failed - check backend console');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = useCallback((item) => {
    setSelectedEvent(item);
    setIsEditModalOpen(true);
  }, []);

  const handleDelete = async (id) => {
    if (!confirm('Delete this event?')) return;
    try {
      const API = import.meta.env.VITE_API_BASE_URL || '';
      const response = await fetch(`${API}/api/events/events/${id}`, { method: 'DELETE' });
      if (response.ok) {
        alert('Event deleted successfully!');
        fetchEvents();
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
          Events Management ({events.length})
        </h1>
      </div>

      {/* Add Form */}
      <div className="bg-white p-8 rounded-[2.5rem] shadow-xl mb-8">
        <h3 className="text-xl font-black mb-6 uppercase text-slate-900">Post New Event</h3>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2">
                Event Title *
              </label>
              <input
                className="w-full bg-slate-50 border p-4 rounded-2xl focus:border-blue-500 font-bold focus:ring-4 focus:ring-blue-500/10"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                placeholder="Enter event title"
                required
              />
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2">
                Event Date *
              </label>
              <input
                type="date"
                className="w-full bg-slate-50 border p-4 rounded-2xl focus:border-blue-500 font-bold focus:ring-4 focus:ring-blue-500/10"
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                required
              />
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2">
                Venue
              </label>
              <input
                type="text"
                className="w-full bg-slate-50 border p-4 rounded-2xl focus:border-blue-500 font-bold focus:ring-4 focus:ring-blue-500/10"
                value={formData.venue}
                onChange={(e) => setFormData({...formData, venue: e.target.value})}
                placeholder="Event location"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-[10px] font-black uppercase text-slate-400 tracking-widest mb-4">
              Event Description *
            </label>
            <textarea
              rows="4"
              className="w-full bg-slate-50 border p-4 rounded-2xl focus:border-blue-500 font-bold focus:ring-4 focus:ring-blue-500/10 resize-vertical"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Describe the event..."
              required
            />
          </div>
          
          {/* Media Upload */}
          <div className="lg:col-span-2">
            <label className="block text-[10px] font-black uppercase text-slate-400 tracking-widest mb-4">
              Gallery Images/Videos (Optional)
            </label>
              <div className="border border-slate-200 rounded-2xl p-6 bg-slate-50 hover:bg-slate-100 transition-colors">
                {previews.length > 0 ? (
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    {previews.map((url, i) => (
                      <div key={i} className="relative">
                        <img src={url} className="h-20 w-full object-cover rounded-xl border-2 border-white shadow-sm" alt="preview" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <>
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/*,video/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <div
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      console.log("CLICK WORKING", fileInputRef.current);
                      fileInputRef.current?.click();
                    }}
                    className="h-32 w-full border-2 border-dashed border-slate-300 rounded-2xl flex items-center justify-center hover:border-blue-400 hover:bg-blue-50 transition-all cursor-pointer group"
                  >
                    <span className="text-3xl mb-2 group-hover:text-blue-600">📸</span>
                    <p className="text-sm font-medium text-slate-600 group-hover:text-blue-600">Click to add gallery</p>
                  </div>
                  </>
                )}
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
              ) : "Publish Event"}
            </button>
          </div>
        </form>
      </div>

      {/* Events Table */}
      <div className="bg-white rounded-[2.5rem] shadow-xl overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <h3 className="text-xl font-black uppercase text-slate-900">
            All Events ({events.length})
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50">
                <th className="p-6 text-left text-xs font-black uppercase text-slate-400 tracking-wider">Thumbnail</th>
                <th className="p-4 text-left text-xs font-black uppercase text-slate-400 tracking-wider">Title</th>
                <th className="p-4 text-left text-xs font-black uppercase text-slate-400 tracking-wider">Date</th>
                <th className="p-4 text-left text-xs font-black uppercase text-slate-400 tracking-wider">Venue</th>
                <th className="p-4 text-right text-xs font-black uppercase text-slate-400 tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((item) => (
                <tr key={item._id} className="border-t hover:bg-slate-50 transition-colors">
                  <td className="p-4">
                    <div className="w-14 h-10 rounded-lg overflow-hidden bg-slate-100 shadow-sm">
                      {item.bannerImage ? (
                        <img 
                          src={item.bannerImage} 
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
                  <td className="p-4 text-slate-600 text-sm font-medium cursor-default">
                    {item.date ? new Date(item.date).toLocaleDateString('en-IN') : 'No date'}
                  </td>
                  <td className="p-4">
                    <span className="px-3 py-1 bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 text-xs rounded-full font-bold uppercase cursor-default">
                      {item.venue}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2 justify-end">
                      <button
                        type="button"
                        onClick={() => handleEdit(item)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1.5 rounded-lg text-xs font-bold shadow-md hover:shadow-lg transition-all duration-200"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(item._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-lg text-xs font-bold shadow-md hover:shadow-lg transition-all duration-200"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {events.length === 0 && (
                <tr>
                  <td colSpan="5" className="p-16 text-center text-slate-400">
                    <div className="text-5xl mb-6 mx-auto animate-pulse">🎉</div>
                    <p className="font-bold text-lg mb-2">No events yet</p>
                    <p className="text-sm opacity-75">Post your first event using the form above</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {selectedEvent && (
        <EditEventModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedEvent(null);
          }}
          eventItem={selectedEvent}
          onUpdate={fetchEvents}
        />
      )}
    </div>
  );
};

export default ChangeEvent;
