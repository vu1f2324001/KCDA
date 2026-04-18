import React from "react";
import { Link } from "react-router-dom";
// Use the same logo path as your Navbar
import logo from "../../images/logo.png";

const Footer = () => {
  return (
    <footer className="w-full bg-[#0a0a0a] py-12 px-6 md:px-16 border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        {/* Left: Logo & Branding */}
        <div className="flex items-center gap-4">
          <img
            src={logo}
            alt="KCDA"
            className="w-10 h-10 object-contain opacity-70"
          />
          <div className="flex flex-col">
            <span className="text-white font-bold tracking-widest text-sm uppercase">
              KCDA
            </span>
            <span className="text-[9px] text-gray-500 uppercase tracking-[0.3em]">
              Trust & Service
            </span>
          </div>
        </div>

        {/* Center: Navigation Links */}
        <div className="flex gap-8 text-[11px] uppercase tracking-[0.2em] text-gray-400 font-medium">
          <Link
            to="/"
            className="hover:text-blue-500 transition-colors duration-300"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="hover:text-blue-500 transition-colors duration-300"
          >
            About
          </Link>
          <Link
            to="/membership"
            className="hover:text-blue-500 transition-colors duration-300"
          >
            Membership
          </Link>
          <Link
            to="/feedback"
            className="hover:text-blue-500 transition-colors duration-300"
          >
            Feedback
          </Link>
        </div>

        {/* Right: Copyright */}
        <div className="text-[10px] text-gray-600 uppercase tracking-widest text-center md:text-right leading-loose">
          © 2026 KCDA Kalyan <br />
          <span className="opacity-40">All Rights Reserved</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
