import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./Sidebar";

// IMPORTS
import ChangeMember from "./changemember/ChangeMember";
import ChangeNews from "./changenews/ChangeNews";
import ChangeMeeting from "./assignmeeting/ChangeMeeting";
import ChangeEvent from "./events/ChangeEvent";
import Zones from "./zones/Zones";
import StatsCards from "./StatsCards";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <main className="relative z-10 flex-1 ml-0 md:ml-72 p-4 md:p-6 lg:p-10 overflow-y-auto scrollbar-hide flex flex-col">
          {isSidebarOpen && (
            <div 
              className="fixed inset-0 bg-black/50 z-40 md:hidden" 
              onClick={() => setIsSidebarOpen(false)}
            />
          )}
          {/* Mobile header */}
          <div className="md:hidden w-full max-w-5xl mb-8 flex items-center justify-between pb-4 border-b border-slate-200">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 rounded-lg bg-slate-200 hover:bg-slate-300 text-gray-900 text-xl font-bold transition-colors shadow-md hover:shadow-lg"
            >
              ☰
            </button>
          </div>
        <div className="w-full max-w-7xl mx-auto">
          <Routes>
            <Route path="change-member" element={<ChangeMember />} />
            <Route path="change-news" element={<ChangeNews />} />
            <Route path="change-meeting" element={<ChangeMeeting />} />
            <Route path="change-event" element={<ChangeEvent />} />
            <Route path="zones" element={<Zones />} />
            <Route
              path="/"
              element={
                <div className="min-h-screen flex flex-col items-center justify-center py-16 px-4">
                  <div className="text-center max-w-4xl mb-20">
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black italic uppercase tracking-tightest mb-8 bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900 bg-clip-text text-transparent drop-shadow-2xl">
                      KCDA <span className="text-blue-600 drop-shadow-lg">Control</span>
                    </h1>
                    <p className="text-lg md:text-xl font-bold text-slate-600 max-w-2xl mx-auto leading-relaxed tracking-wide">
                      Real-time Dashboard • Live Metrics • Complete Control Panel
                    </p>
                  </div>
                  <StatsCards />
                </div>
              }
            />
          </Routes>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
