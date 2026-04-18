import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isRedirecting, setIsRedirecting] = useState(false);

  // Mentor's Suggestion: Redirect to Home with a Timer
  const handleLogoClick = () => {
    setIsRedirecting(true);
    setTimeout(() => {
      window.location.href = "/"; // Redirect to public home
    }, 2000); // 2-second delay
  };

  const handleLogout = () => {
    const API = import.meta.env.VITE_API_BASE_URL || '';
    fetch(`${API}/api/auth/logout`, { method: 'POST', credentials: 'include' })
      .then(() => { window.location.href = '/'; })
      .catch(() => { window.location.href = '/'; });
  };

  const isActive = (path) =>
    location.pathname === path
      ? "bg-blue-600 text-white shadow-lg shadow-blue-900/40"
      : "text-slate-400 hover:bg-slate-800 hover:text-white";

  return (
    <aside className={`w-72 h-screen bg-[#0F172A] flex flex-col fixed left-0 top-0 bottom-0 z-50 shadow-2xl border-r border-slate-800 transform transition-transform duration-300 ease-in-out md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
      {/* BRANDING / LOGO SECTION */}
      <div className="p-8 relative md:p-8">
        {isOpen && (
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 md:hidden p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
          >
            <span className="text-xl font-bold">&times;</span>
          </button>
        )}
        <div
          onClick={handleLogoClick}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
            <span className="text-white font-black text-xs">K</span>
          </div>
          <h2 className="text-xl font-black text-white tracking-tighter uppercase">
            KCDA{" "}
            <span className="text-blue-500 text-[10px] align-top">Control</span>
          </h2>
        </div>

        {/* Redirect Message */}
        {isRedirecting && (
          <p className="text-[10px] text-blue-400 font-bold uppercase animate-pulse mt-2">
            Redirecting to website...
          </p>
        )}

        {!isRedirecting && (
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] mt-2">
            CMS Dashboard
          </p>
        )}
      </div>

      {/* NAVIGATION */}
      <nav className="flex-1 px-4 space-y-2 mt-4">
        <Link
          to="/admin/"
          className={`flex items-center p-4 rounded-xl font-bold text-sm transition-all ${isActive("/admin/")}`}
        >
          Dashboard
        </Link>
        <Link
          to="/admin/change-news"
          className={`flex items-center p-4 rounded-xl font-bold text-sm transition-all ${isActive("/admin/change-news")}`}
        >
          Update News Feed
        </Link>
        <Link
          to="/admin/change-member"
          className={`flex items-center p-4 rounded-xl font-bold text-sm transition-all ${isActive("/admin/change-member")}`}
        >
          Manage Members
        </Link>
        <Link
          to="/admin/change-meeting"
          className={`flex items-center p-4 rounded-xl font-bold text-sm transition-all ${isActive("/admin/change-meeting")}`}
        >
          Manage Meetings
        </Link>
        {/* ADDED EVENTS OPTION */}
        <Link
          to="/admin/change-event"
          className={`flex items-center p-4 rounded-xl font-bold text-sm transition-all ${isActive("/admin/change-event")}`}
        >
          Manage Events
        </Link>
        <Link
          to="/admin/zones"
          className={`flex items-center p-4 rounded-xl font-bold text-sm transition-all ${isActive("/admin/zones")}`}
        >
          Manage Zones
        </Link>
      </nav>


      {/* LOGOUT */}
      <div className="p-6 border-t border-slate-800">
        <button
          onClick={handleLogout}
          className="w-full bg-red-500/10 text-red-500 p-4 rounded-xl font-black hover:bg-red-600 hover:text-white transition-all text-[10px] uppercase tracking-widest border border-red-500/20"
        >
          Logout Session
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
