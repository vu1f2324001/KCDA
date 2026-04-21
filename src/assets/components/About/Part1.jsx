import React, { useEffect } from "react";
import { motion } from "framer-motion";
import aboutHero from "../../images/1.jpeg";

const Part1 = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Single Background Image */}
      <img
        src={aboutHero}
        className="absolute inset-0 w-full h-full object-cover"
        alt="KCDA Heritage"
      />

      {/* Consistent Dark Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content Layer */}
      <div className="relative z-10 flex items-center h-full px-6 md:px-16 text-white">
        <div className="max-w-3xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold uppercase tracking-tighter leading-none lg:leading-tight">
            KCDA Heritage
          </h1>
          <div className="w-20 h-1 bg-blue-500 mt-6 mb-4"></div>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-200 font-medium max-w-xl leading-relaxed mt-6">
            Kalyan Chemists & Druggists Association: A tradition of excellence, integrity, and community care since 1974.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Part1;
