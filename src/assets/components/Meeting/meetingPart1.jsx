import React from "react";

const MeetingPart1 = () => {
  return (
    <div className="relative h-[60vh] w-full flex items-center overflow-hidden">
      {/* 1. Dark Overlay for readability - Matches Event Style */}
      <div className="absolute inset-0 bg-black/70 z-10"></div>

      {/* 2. Background Image - Pointing to your local image folder */}
      <img
        src="/src/assets/images/meeting-bg.jpeg"
        alt="KCDA Board Agenda"
        className="absolute inset-0 w-full h-full object-cover"
        onError={(e) => {
          e.target.src =
            "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop";
        }}
      />

      {/* 3. Content - Simple, Bold, All Caps */}
      <div className="relative z-20 px-6 md:px-16 mt-20 max-w-4xl">
        <h1 className="text-white text-6xl md:text-8xl font-extrabold tracking-tighter uppercase leading-[0.9]">
          BOARD <br />
          <span className="text-blue-500">AGENDA</span>
        </h1>

        {/* Blue Accent Line - Matches Event Style */}
        <div className="w-24 h-2 bg-blue-600 mt-6 mb-8"></div>

        <p className="text-gray-300 text-lg md:text-xl font-bold uppercase tracking-widest max-w-2xl leading-relaxed">
          Kalyan-Dombivli Chemists Association <br />
          Official Regulatory & Executive Briefings
        </p>
      </div>
    </div>
  );
};

export default MeetingPart1;
