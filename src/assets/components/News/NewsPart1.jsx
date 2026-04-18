import React from "react";
import heroImage from "../../images/1.jpeg";

const NewsPart1 = () => {
  return (
    <div className="relative h-[60vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-black/60 z-10"></div>
      <img
        src={heroImage}
        className="absolute inset-0 w-full h-full object-cover"
        alt="News Hero"
      />

      <div className="relative z-20 px-6 md:px-16 mt-20 w-full">
        <h1 className="text-white text-5xl md:text-7xl font-bold uppercase tracking-tight">
          News & Updates
        </h1>
        <div className="w-24 h-1 bg-blue-500 mt-4 mb-6"></div>
        <p className="text-gray-300 text-lg md:text-xl font-medium max-w-2xl">
          Stay informed with the latest breakthroughs and regulatory changes in
          the pharmaceutical world.
        </p>
      </div>
    </div>
  );
};

export default NewsPart1;
