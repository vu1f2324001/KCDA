import React, { useState, useEffect } from "react";

const EditMeetingModal = ({ 
  isOpen, 
  onClose, 
  meetingItem, 
  onUpdate 
}) => {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    time: "",
    venue: "",
    description: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (meetingItem) {
      setFormData({
        title: meetingItem.title || "",
        date: meetingItem.date ? new Date(meetingItem.date).toISOString().split('T')[0] : "",
        time: meetingItem.time || "",
        venue: meetingItem.venue || "",
        description: meetingItem.description || ""
      });
    }
  }, [meetingItem]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      const API = import.meta.env.VITE_API_BASE_URL || '';
      const response = await fetch(`${API}/api/events/meetings/${meetingItem._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        onUpdate();
        onClose();
        alert('Meeting updated successfully!');
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="flex justify-between items-center mb-8 pb-4 border-b border-slate-200">
          <h3 className="text-2xl font-black uppercase text-slate-900 tracking-tight">
            Edit Meeting
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
          <div>
            <label className="block text-[10px] font-black uppercase text-slate-400 tracking-widest mb-3">
              Title *
            </label>
              <input
                name="title"
                className="w-full bg-slate-50 border p-4 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 font-bold text-slate-900 text-lg"
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
                  className="w-full bg-white border-slate-300 p-4 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 font-bold text-slate-900 text-lg shadow-sm cursor-pointer"
                  value={formData.date}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase text-slate-400 tracking-widest mb-3">
                  Time *
                </label>
                <input
                  name="time"
                  type="time"
                  className="w-full bg-white border-slate-300 p-4 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 font-bold text-slate-900 text-lg shadow-sm cursor-pointer"
                  value={formData.time}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase text-slate-400 tracking-widest mb-3">
                Venue *
              </label>
              <input
                name="venue"
                className="w-full bg-slate-50 border p-4 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 font-bold text-slate-900 text-lg"
                value={formData.venue}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase text-slate-400 tracking-widest mb-3">
                Agenda / Description
              </label>
              <textarea
                name="description"
                rows="4"
                className="w-full bg-slate-50 border p-4 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 font-bold text-slate-900 text-lg resize-vertical"
                value={formData.description}
                onChange={handleInputChange}
              />
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
              {loading ? 'Updating...' : 'Update Meeting'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditMeetingModal;
