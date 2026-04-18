import React, { useState, useEffect, useCallback } from "react";

const ChangeMeeting = () => {
  const [meetings, setMeetings] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    time: "",
    venue: "",
    description: "",
    type: "meeting"
  });
  const [loading, setLoading] = useState(false);

  // Check if meeting is past
  const isPastMeeting = (meetingDate) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const meeting = new Date(meetingDate);
    return meeting < today;
  };

  useEffect(() => {
    fetchMeetings();
  }, []);

  const fetchMeetings = async () => {
    try {
      const API = import.meta.env.VITE_API_BASE_URL || 'https://kcda-1.onrender.com';
      const response = await fetch(`${API}/api/events/meetings`, { credentials: 'include' });
      const data = await response.json();
      setMeetings(data || []);
    } catch (err) {
      console.error("Failed to fetch meetings:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const API = import.meta.env.VITE_API_BASE_URL || 'https://kcda-1.onrender.com';
      const response = await fetch(`${API}/api/events/meetings`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert('Meeting added successfully!');
        fetchMeetings();
        setFormData({ title: "", date: "", time: "", venue: "", description: "", type: "meeting" });
      } else {
        const error = await response.json();
        alert(`Error: ${error.error || 'Failed to add meeting'}`);
      }
    } catch (err) {
      alert('Backend unavailable');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (meeting) => {
    if (isPastMeeting(meeting.date)) {
      alert('Cannot edit past meetings');
      return;
    }
    setSelectedMeeting(meeting);
    setIsEditModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this meeting?')) return;
    try {
      const API = import.meta.env.VITE_API_BASE_URL || 'https://kcda-1.onrender.com';
      const response = await fetch(`${API}/api/events/meetings/${id}`, { method: 'DELETE', credentials: 'include' });
      if (response.ok) {
        alert('Meeting deleted!');
        fetchMeetings();
      } else {
        const error = await response.json();
        alert(error.error || 'Delete failed');
      }
    } catch (err) {
      alert('Delete failed');
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">
          Meeting Management ({meetings.length})
        </h1>
      </div>

      {/* Add Form */}
      <div className="bg-white p-8 rounded-[2.5rem] shadow-xl mb-8">
        <h3 className="text-xl font-black mb-6 uppercase text-slate-900">Schedule New Meeting</h3>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2">
                Title *
              </label>
              <input
                name="title"
                className="w-full bg-slate-50 border p-4 rounded-2xl focus:border-blue-500 font-bold text-slate-900 text-lg"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Executive Board Summit"
                required
              />
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2">
                  Date *
                </label>
                <input
                  name="date"
                  type="date"
                  className="w-full bg-white border-slate-300 p-4 rounded-2xl focus:border-blue-500 font-bold text-slate-900 text-lg"
                  value={formData.date}
                  onChange={handleInputChange}
                  required
                />

              </div>
              <div className="flex-1">
                <label className="block text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2">
                  Time *
                </label>
                <input
                  name="time"
                  type="time"
                  className="w-full bg-white border-slate-300 p-4 rounded-2xl focus:border-blue-500 font-bold text-slate-900 text-lg shadow-sm cursor-pointer"
                  value={formData.time}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          </div>
          <div className="space-y-4">

            <div>
              <label className="block text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2">
                Venue *
              </label>
              <input
                name="venue"
                className="w-full bg-slate-50 border p-4 rounded-2xl focus:border-blue-500 font-bold text-slate-900 text-lg"
                value={formData.venue}
                onChange={handleInputChange}
                placeholder="KCDA Conference Hall"
                required
              />
            </div>
            <div>

              <label className="block text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2">
                Agenda
              </label>
              <textarea
                name="description"
                className="w-full bg-slate-50 border p-5 rounded-2xl h-32 focus:border-blue-500 font-bold text-slate-900 text-lg"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Meeting agenda..."
              />
            </div>
          </div>
          
          <div className="md:col-span-2 pt-6 border-t border-slate-100 flex justify-end">

            <button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 text-white py-4 px-10 rounded-2xl font-black uppercase tracking-wider shadow-xl disabled:opacity-50"
            >
              {loading ? 'Scheduling...' : 'Schedule Meeting'}
            </button>
          </div>
        </form>
      </div>

      {/* Meetings Table */}
      <div className="bg-white rounded-[2.5rem] shadow-xl overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <h3 className="text-xl font-black uppercase text-slate-900">
            All Meetings ({meetings.length})
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50">
                <th className="p-6 text-left text-xs font-black uppercase text-slate-400 tracking-wider">Title</th>
                <th className="p-4 text-left text-xs font-black uppercase text-slate-400 tracking-wider">Date & Time</th>
                <th className="p-4 text-left text-xs font-black uppercase text-slate-400 tracking-wider">Venue</th>
                <th className="p-4 text-right text-xs font-black uppercase text-slate-400 tracking-wider">Status</th>
                <th className="p-4 text-right text-xs font-black uppercase text-slate-400 tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {meetings.map((meeting) => {
                const past = isPastMeeting(meeting.date);
                return (
                  <tr key={meeting._id} className={`border-t hover:bg-slate-50 ${past ? 'opacity-60 bg-red-50/50' : ''}`}>
                    <td className="p-4 font-semibold text-slate-900">
                      <div className="truncate max-w-md" title={meeting.title}>
                        {meeting.title}
                      </div>
                    </td>
                    <td className="p-4 text-slate-600 font-medium">
                      {new Date(meeting.date).toLocaleDateString('en-IN')} {meeting.time || 'TBD'}
                    </td>
                    <td className="p-4">
                      <span className="px-3 py-1 bg-slate-100 text-slate-800 text-xs rounded-full font-bold">
                        {meeting.venue}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                        past 
                          ? 'bg-red-100 text-red-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {past ? 'Past (View Only)' : 'Upcoming'}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2 justify-end">
                        <button
                          disabled={past}
                          onClick={() => handleEdit(meeting)}
                          className={`px-4 py-1.5 rounded-lg text-xs font-bold shadow-md transition-all ${
                            past
                              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                              : 'bg-blue-500 hover:bg-blue-600 text-white hover:shadow-lg'
                          }`}
                          title={past ? 'Cannot edit past meetings' : 'Edit'}
                        >
                          Edit
                        </button>
                        <button
                          disabled={past}
                          onClick={() => handleDelete(meeting._id)}
                          className={`px-4 py-1.5 rounded-lg text-xs font-bold shadow-md transition-all ${
                            past
                              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                              : 'bg-red-500 hover:bg-red-600 text-white hover:shadow-lg'
                          }`}
                          title={past ? 'Cannot delete past meetings' : 'Delete'}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {meetings.length === 0 && (
                <tr>
                  <td colSpan="5" className="p-16 text-center text-slate-400">
                    <div className="text-5xl mb-6 mx-auto">📅</div>
                    <p className="font-bold text-lg mb-2">No meetings scheduled</p>
                    <p className="text-sm opacity-75">Add your first meeting above</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isEditModalOpen && selectedMeeting && (
        <EditMeetingModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedMeeting(null);
          }}
          meetingItem={selectedMeeting}
          onUpdate={fetchMeetings}
        />
      )}
    </div>
  );
};

export default ChangeMeeting;
import EditMeetingModal from "./EditMeetingModal";
