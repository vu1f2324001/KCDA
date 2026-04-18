import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo.png";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    "Home",
    "About",
    "Meetings",
    "Membership",
    "Events",
    "Zones",
    "Feedback",
    "News",
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 transition-all duration-300">
      {/* Background (transparent gradient) */}
      <div
        className={`absolute inset-0 -z-10 ${
          isMenuOpen
            ? "bg-black/90"
            : "bg-gradient-to-b from-black/80 to-transparent"
        }`}
      ></div>

      <div className="flex items-center justify-between w-full px-6 md:px-16 py-5">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 cursor-pointer group">
          <img
            src={logo}
            alt="KCDA"
            className="w-14 h-14 object-cover"
            style={{
              clipPath:
                "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)",
            }}
          />
          <div className="flex flex-col text-white">
            <span className="font-bold text-xl tracking-wider">KCDA</span>
            <span className="text-[10px] uppercase tracking-widest text-gray-300">
              Trust & Service
            </span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-10 text-white font-semibold text-sm uppercase tracking-widest items-center">
          {navItems.map((item) => (
            <li key={item} className="relative group">
              <Link
                to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                className="text-white hover:text-blue-400 transition-colors drop-shadow-lg"
              >
                {item}
              </Link>

              {/* Blue underline on hover */}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
            </li>
          ))}

          {/* Admin Button */}
          <li>
            <Link
              to="/admin-login"
              className="bg-red-500 px-4 py-1 rounded text-white hover:bg-red-600 transition drop-shadow-lg"
            >
              Admin
            </Link>
          </li>
        </ul>

        {/* Mobile Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-gray-900 drop-shadow-lg"
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden px-6 pb-5">
          <ul className="flex flex-col gap-5 text-white font-semibold text-sm uppercase tracking-widest">
            {navItems.map((item) => (
              <li key={item}>
                <Link
                  to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-white hover:text-blue-400 transition-colors drop-shadow-lg"
                >
                  {item}
                </Link>
              </li>
            ))}

            {/* Admin Button */}
            <li>
              <Link
                to="/admin-login"
                onClick={() => setIsMenuOpen(false)}
                className="bg-red-500 px-4 py-2 rounded w-fit text-white hover:bg-red-600 transition drop-shadow-lg"
              >
                Admin Login
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
