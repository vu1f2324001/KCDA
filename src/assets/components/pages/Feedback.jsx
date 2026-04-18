import React from "react";
import heroImage from "../../images/1.jpeg";

const Feedback = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* ✅ PART 1 — HERO SECTION (Aligned Left to match the theme) */}
      <div className="relative h-[60vh] flex items-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        ></div>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60 z-10"></div>

        {/* Content - Now Aligned Left and Padded like Events/Zones */}
        <div className="relative z-20 px-6 md:px-16 mt-20 w-full">
          <h1 className="text-white text-5xl md:text-7xl font-bold uppercase tracking-tight">
            Feedback & Inquiries
          </h1>
          {/* Consistent Blue Line */}
          <div className="w-24 h-1 bg-blue-500 mt-4 mb-6"></div>
          <p className="text-gray-300 text-lg md:text-xl font-medium max-w-2xl leading-relaxed">
            Your voice helps us grow. Share your thoughts, report issues, or
            inquire about our community initiatives.
          </p>
        </div>
      </div>

      {/* ✅ PART 2 — CONTENT */}
      <div className="px-6 md:px-16 py-16 -mt-10 relative z-30">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Contact Cards */}
          <div className="lg:col-span-1 space-y-6">
            {/* Visit Us Card - Theme Sync: Switched to Blue */}
            <div className="bg-white p-8 rounded-2xl shadow-xl border-t-4 border-blue-600 transform hover:-translate-y-1 transition-transform">
              <h3 className="text-xl font-bold text-gray-800 mb-4 uppercase tracking-wider">
                Visit Us
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                KCDA Head Office,
                <br />
                Kalyan, Maharashtra 421301
              </p>
            </div>

            {/* Contact Info Card */}
            <div className="bg-white p-8 rounded-2xl shadow-xl border-t-4 border-blue-400 transform hover:-translate-y-1 transition-transform">
              <h3 className="text-xl font-bold text-gray-800 mb-4 uppercase tracking-wider">
                Contact Info
              </h3>
              <p className="text-gray-600 text-sm mb-2">
                <strong className="text-blue-600 uppercase text-[10px] tracking-widest block">
                  Email
                </strong>
                info@kcda.org
              </p>
              <p className="text-gray-600 text-sm">
                <strong className="text-blue-600 uppercase text-[10px] tracking-widest block">
                  Helpline
                </strong>
                +91 00000 00000
              </p>
            </div>
          </div>

          {/* Right Column: Feedback Form */}
          <div className="lg:col-span-2 bg-white p-10 rounded-2xl shadow-2xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-8 border-b pb-4 uppercase tracking-widest">
              Send Us a Message
            </h2>

            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label className="text-xs font-bold text-gray-500 uppercase mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="bg-gray-50 border border-gray-200 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-xs font-bold text-gray-500 uppercase mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  className="bg-gray-50 border border-gray-200 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>

              <div className="flex flex-col md:col-span-2">
                <label className="text-xs font-bold text-gray-500 uppercase mb-2">
                  Subject
                </label>
                <select className="bg-gray-50 border border-gray-200 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all appearance-none">
                  <option>General Feedback</option>
                  <option>Zone Related Query</option>
                  <option>Membership Inquiry</option>
                  <option>Report an Issue</option>
                </select>
              </div>

              <div className="flex flex-col md:col-span-2">
                <label className="text-xs font-bold text-gray-500 uppercase mb-2">
                  Your Message
                </label>
                <textarea
                  rows="5"
                  placeholder="How can we help you?"
                  className="bg-gray-50 border border-gray-200 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
                ></textarea>
              </div>

              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-200 hover:bg-blue-700 hover:shadow-blue-300 transition-all active:scale-[0.98] uppercase tracking-widest"
                >
                  Submit Feedback
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
