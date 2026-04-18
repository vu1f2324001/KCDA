import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const MeetingPart2 = () => {
  const [upcomingMeetings, setUpcomingMeetings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const API = import.meta.env.VITE_API_BASE_URL || '';
        const response = await fetch(`${API}/api/events/meetings/upcoming`, { credentials: 'include' });
        if (!response.ok) return;
        const data = await response.json();
        setUpcomingMeetings(data);
      } catch (error) {
        console.error('Failed to fetch meetings:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMeetings();
  }, []);

  return (
    <div className="bg-white py-24 px-6 md:px-20 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-[2px] w-16 bg-blue-600"></div>
            <span className="text-blue-600 font-black uppercase tracking-[0.3em] text-lg">
              KCDA Meetings
            </span>
            <div className="h-[2px] w-16 bg-blue-600"></div>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-tight">
            Upcoming <span className="text-blue-600">Meetings</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 font-semibold mt-4 max-w-2xl mx-auto">
            Executive board briefings and regulatory updates for KCDA members
          </p>
        </motion.div>

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-64 bg-slate-200 rounded-2xl mb-4"></div>
                <div className="h-8 bg-slate-200 rounded w-3/4 mb-3"></div>
                <div className="h-6 bg-slate-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : upcomingMeetings.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingMeetings.map((meeting, index) => (
              <motion.div
                key={meeting._id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 rounded-3xl p-8 hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 cursor-pointer hover:bg-white overflow-hidden relative"
              >
                <div className="mb-6">
                  <div className="text-xs font-bold uppercase tracking-wider text-emerald-600 mb-3">
                    {new Date(meeting.date).toLocaleDateString('en-IN', { 
                      weekday: 'long', 
                      day: 'numeric', 
                      month: 'long', 
                      year: 'numeric' 
                    })}
                  </div>
                  <div className="flex items-center gap-2 text-sm font-bold text-slate-600 mb-4">
                    <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                    {meeting.time}
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 mb-4 leading-tight line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {meeting.title}
                  </h3>
                  <p className="text-gray-600 font-medium text-lg leading-relaxed mb-6 line-clamp-3">
                    {meeting.description}
                  </p>
                </div>
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-2xl border border-blue-100">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-bold text-slate-700 flex items-center gap-2">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"/>
                      </svg>
                      {meeting.venue}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      meeting.attendanceConfirmed 
                        ? 'bg-emerald-100 text-emerald-800' 
                        : 'bg-orange-100 text-orange-800'
                    }`}>
                      {meeting.attendanceConfirmed ? 'Confirmed' : 'RSVP'}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-32 col-span-full">
            <div className="text-8xl text-gray-300 mb-12 animate-bounce">📅</div>
            <h3 className="text-4xl font-black text-gray-800 mb-6">No Upcoming Meetings</h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-12">
              Check back soon for KCDA executive board briefings and important member updates.
            </p>
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-3xl border-4 border-dashed border-blue-200 max-w-2xl mx-auto">
              <p className="text-lg font-semibold text-blue-800 mb-4">
                Meetings are scheduled by KCDA Admin
              </p>
              <p className="text-blue-700 text-sm">Admin adds via Dashboard → appears here automatically</p>
            </div>
          </div>
        )}

        {upcomingMeetings.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-24"
          >
            <button className="group relative inline-flex items-center gap-4 text-blue-600 font-black uppercase tracking-widest text-lg px-12 py-4 bg-white rounded-2xl shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300 overflow-hidden border-2 border-blue-200 hover:border-blue-300">
              <span>RSVP for Next Meeting</span>
              <div className="absolute right-4 w-8 h-[2px] bg-blue-600 group-hover:w-20 transition-all duration-500 origin-left"></div>
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default MeetingPart2;
