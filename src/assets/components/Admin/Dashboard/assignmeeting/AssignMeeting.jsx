import React, { useState } from "react";

const AssignMeeting = () => {
  const [meetingData, setMeetingData] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
    description: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Saving Meeting:", meetingData);
    try {
      const API = import.meta.env.VITE_API_BASE_URL || '';
      const response = await fetch(`${API}/api/events/meetings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(meetingData),
      });
      if (response.ok) {
        alert('Meeting Scheduled & saved to backend!');
      } else {
        alert('Save failed: ' + response.status);
      }
    } catch (error) {
      console.error('Backend error:', error);
      alert('Backend unavailable - using local.');
    }
  };

  return (
    <div className="max-w-4xl">
      <header className="mb-10">
        <h1 className="text-4xl font-black text-slate-900 uppercase tracking-tight">
          Assign Meeting
        </h1>
        <p className="text-slate-500 font-medium">
          Schedule the next Executive Board Summit or Committee gathering.
        </p>
      </header>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-200"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Meeting Title */}
          <div className="md:col-span-2 flex flex-col">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">
              Meeting Title / Topic
            </label>
            <input
              type="text"
              className="p-5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none font-bold text-slate-700"
              placeholder="e.g. Executive Board Summit"
              onChange={(e) =>
                setMeetingData({ ...meetingData, title: e.target.value })
              }
              required
            />
          </div>

          {/* Date Picker */}
          <div className="flex flex-col">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">
              Date
            </label>
            <input
              type="date"
              className="p-5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none font-bold text-slate-700"
              onChange={(e) =>
                setMeetingData({ ...meetingData, date: e.target.value })
              }
              required
            />
          </div>

          {/* Time Picker */}
          <div className="flex flex-col">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">
              Time
            </label>
            <input
              type="time"
              className="p-5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none font-bold text-slate-700"
              onChange={(e) =>
                setMeetingData({ ...meetingData, time: e.target.value })
              }
              required
            />
          </div>

          {/* Location */}
          <div className="md:col-span-2 flex flex-col">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">
              Location / Venue
            </label>
            <input
              type="text"
              className="p-5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none font-bold text-slate-700"
              placeholder="e.g. KCDA Conference Hall, Kalyan"
              onChange={(e) =>
                setMeetingData({ ...meetingData, location: e.target.value })
              }
              required
            />
          </div>

          {/* Agenda / Description */}
          <div className="md:col-span-2 flex flex-col">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">
              Meeting Agenda (Short Description)
            </label>
            <textarea
              className="p-5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none font-medium text-slate-700 h-32"
              placeholder="Briefly describe the purpose of this meeting..."
              onChange={(e) =>
                setMeetingData({ ...meetingData, description: e.target.value })
              }
            ></textarea>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-100 flex justify-end">
          <button
            type="submit"
            className="bg-slate-900 text-white px-12 py-5 rounded-2xl font-black hover:bg-blue-600 transition-all shadow-2xl uppercase tracking-widest text-sm"
          >
            Publish Meeting
          </button>
        </div>
      </form>
    </div>
  );
};

export default AssignMeeting;

