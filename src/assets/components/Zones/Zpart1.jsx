import React from "react";

const Zpart1 = () => {
  return (
    <div className="relative h-[60vh] w-full flex items-center overflow-hidden">
      {/* 1. Dark Overlay - Consistency is key 🔑 */}
      <div className="absolute inset-0 bg-black/60 z-10"></div>

      {/* 2. Background Image - Using your project image */}
      <img
        src="/src/assets/images/1.jpeg"
        alt="Zones"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* 3. Your Original Content - Aligned Left to match Logo and Events */}
      <div className="relative z-20 px-6 md:px-16 mt-20 max-w-4xl">
        <h1 className="text-white text-5xl md:text-7xl font-bold tracking-tight uppercase">
          Zones
        </h1>

        {/* Blue Accent Line - Matches Events & Navbar Hover */}
        <div className="w-24 h-1 bg-blue-500 mt-4 mb-6"></div>

        <p className="text-gray-300 text-lg md:text-xl font-medium max-w-2xl leading-relaxed">
          Exploring our dedicated zones: Discover how we organize our efforts
          and impact across different regions and communities.
        </p>
      </div>
    </div>
  );
};

export default Zpart1;
