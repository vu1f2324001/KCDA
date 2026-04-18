import React, { useState, useEffect } from "react";

const EventPart3 = () => {
  const [pastEvents, setPastEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPastEvents = async () => {
      try {
        const API = import.meta.env.VITE_API_BASE_URL || '';
        console.log('[EventPart3] fetching from', `${API}/api/events`);
        const response = await fetch(`${API}/api/events`, { credentials: 'include' });
        const data = await response.json();
        console.log('[EventPart3] fetched events count:', Array.isArray(data) ? data.length : typeof data, data);
        // For testing: show ALL events (no past/future filter)
        const all = Array.isArray(data)
          ? data.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 9)
          : [];
        setPastEvents(all);
      } catch (error) {
        console.error('Failed to fetch past events:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPastEvents();
  }, []);

  return (
    <section className="bg-black py-24 px-6 md:px-16">
      <div className="mb-20">
        <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-white">
          Tenure Highlights
        </h2>
        <p className="text-blue-500 font-bold uppercase tracking-[0.4em] mt-4 text-sm">
          Service • Unity • Progress
        </p>
      </div>

      {/* 3-Column Grid for Events */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {loading ? (
          <div className="col-span-full text-center py-32">
            <div className="text-6xl text-gray-500 mb-8 animate-pulse">📅</div>
            <p className="text-xl text-gray-400">Loading past events...</p>
          </div>
        ) : pastEvents.length > 0 ? (
          pastEvents.map((event, i) => (
            <div key={event._id} className="group cursor-pointer">
              {/* Image Container with Reveal Effect */}
              <div className="relative w-full h-[380px] overflow-hidden rounded-3xl border border-white/5 bg-[#111]">
                {event.bannerImage ? (
                  <img
                    src={event.bannerImage}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                    alt={event.title}
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                    <span className="text-4xl text-gray-500">📸</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity"></div>

                {/* Arrow Reveal */}
                <div className="absolute bottom-6 right-6 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                  <span className="text-xl">→</span>
                </div>
              </div>

              {/* Event Details */}
              <div className="mt-6">
                <h3 className="text-white text-2xl font-bold uppercase tracking-tight group-hover:text-blue-500 transition-colors line-clamp-2">
                  {event.title}
                </h3>
                <p className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.3em] mt-2">
                  {new Date(event.date).toLocaleDateString('en-IN', { 
                    day: 'numeric', 
                    month: 'short', 
                    year: 'numeric' 
                  })}
                </p>
                <p className="text-gray-400 text-sm mt-2 line-clamp-2">
                  {event.venue && `${event.venue} • `}
                  {event.description?.substring(0, 100)}...
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-32">
            <div className="text-6xl text-gray-500 mb-8">📂</div>
            <h3 className="text-3xl font-black text-white mb-4">No Past Events</h3>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Be the first to create lasting memories with KCDA events.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default EventPart3;

