import React from "react";

const EventPart1 = () => {
  return (
    <div className="relative h-[60vh] w-full flex items-center overflow-hidden">
      {/* 1. Dark Overlay for readability */}
      <div className="absolute inset-0 bg-black/60 z-10"></div>

      {/* 2. Your Background Image - Updated Path */}
      <img
        src="/src/assets/images/1.jpeg"
        alt="Events & Gallery"
        className="absolute inset-0 w-full h-full object-cover"
        onError={(e) => {
          e.target.src =
            "https://via.placeholder.com/1920x1080/000000/FFFFFF?text=Events+Gallery";
        }}
      />

      {/* 3. Your Original Content - Aligned Left */}
      <div className="relative z-20 px-6 md:px-16 mt-20 max-w-4xl">
        <h1 className="text-white text-5xl md:text-7xl font-bold tracking-tight uppercase">
          Events & Gallery
        </h1>

        {/* Blue Accent Line below the heading */}
        <div className="w-24 h-1 bg-blue-500 mt-4 mb-6"></div>

        <p className="text-gray-300 text-lg md:text-xl font-medium max-w-2xl leading-relaxed">
          Capturing Moments, Creating Memories: Explore our past events and
          shared journeys through our visual gallery.
        </p>
      </div>
    </div>
  );
};

export default EventPart1;
