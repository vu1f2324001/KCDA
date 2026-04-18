import React, { useState } from "react";
import { motion } from "framer-motion";

const Part3 = () => {
  // 1. THE BIG 5 (Scrolling Center Cards) - Data from
  const bigFive = [
    {
      first: "JAGANNATH",
      last: "SHINDE",
      post: "PRESIDENT (AICDF)",
      img: "1.jpeg",
    },
    { first: "SAGAR", last: "KULKARNI", post: "PRESIDENT", img: "2.jpeg" },
    { first: "VIRENDRA", last: "SINGH", post: "SECRETARY", img: "3.jpeg" },
    { first: "GANESH", last: "SHELKE", post: "TREASURER", img: "4.jpeg" },
    { first: "VINAY", last: "KHATLAV", post: "EX-PRESIDENT", img: "1.jpeg" },
  ];

  // 2. THE LIST (Hover Popup) - Data from
  const listMembers = [
    { name: "Shri Tanveer Sheikh", role: "Vice President", img: "2.jpeg" },
    { name: "Shri Mahendra Rajput", role: "Vice President", img: "3.jpeg" },
    { name: "Shri Shyam Indoria", role: "Vice President", img: "4.jpeg" },
    { name: "Shri Vikas Pawar", role: "Joint Secretary", img: "1.jpeg" },
    { name: "Shri Ravindra Khaire", role: "Joint Secretary", img: "2.jpeg" },
    { name: "Shri Rajkumar Yadav", role: "Org. Secretary", img: "3.jpeg" },
    { name: "Shri Parag Patel", role: "Org. Secretary", img: "4.jpeg" },
    { name: "Shri Suraj Patil", role: "P.R.O.", img: "1.jpeg" },
    { name: "Shri Pravin Katare", role: "Joint Treasurer", img: "2.jpeg" },
  ];

const [hoveredImg, setHoveredImg] = useState(null);

  return (
    <section className="bg-[#111] w-full text-white">
      {/* --- SECTION 1: THE BIG 5 SCROLLING REVEAL --- */}
      <div className="relative">
{bigFive.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, delay: i * 0.2 }}
            className="h-screen md:h-[100vh] relative"
          >
            <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden px-4 md:px-0">
              {/* Name sliding from Left */}
              <motion.h2 
                className="absolute left-4 md:left-12 lg:left-20 text-3xl sm:text-4xl md:text-5xl lg:text-[7vw] xl:text-[6vw] font-black uppercase tracking-tighter opacity-30 z-0 whitespace-nowrap text-shadow-lg"
                initial={{ x: -100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                {m.first}
              </motion.h2>

              {/* Center Photo */}
              <motion.div 
                className="relative w-64 sm:w-72 md:w-80 lg:w-[350px] xl:w-[400px] h-[350px] sm:h-[400px] md:h-[450px] lg:h-[500px] xl:h-[550px] z-10 rounded-2xl overflow-hidden border border-white/10 shadow-2xl mx-auto cursor-pointer group"
                initial={{ scale: 0.9, y: 50 }}
                whileInView={{ scale: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -10 }}
                transition={{ duration: 0.6 }}
              >
                <img
                  src={`/src/assets/images/${m.img}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 group-hover:shadow-2xl group-hover:shadow-blue-500/40"
                  alt={m.first}
                />
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                >
                  <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/90 font-bold text-sm uppercase tracking-wider">
                    {m.last}
                  </p>
                </motion.div>
              </motion.div>

              {/* Post sliding from Right */}
              <motion.div 
                className="absolute right-4 md:right-12 lg:right-20 text-right z-20"
                initial={{ x: 100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-blue-400 uppercase italic tracking-wider bg-gradient-to-r from-black/80 to-transparent backdrop-blur-md px-4 py-2 sm:px-6 md:px-8 rounded-xl border border-blue-400/30 shadow-lg">
                  {m.post}
                </p>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* --- SECTION 2: THE HOVER POPUP LIST --- */}
      <div className="py-20 sm:py-24 md:py-32 px-4 sm:px-8 md:px-16 lg:px-24 bg-black/50 backdrop-blur-sm relative z-30">
        <motion.h2 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-white/30 text-lg sm:text-xl md:text-2xl uppercase tracking-[0.3em] mb-12 sm:mb-16 border-b border-white/10 pb-4 sm:pb-6 text-center"
        >
          Executive Committee
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-8">
          {listMembers.map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              onMouseEnter={() => setHoveredImg(member.img)}
              onMouseLeave={() => setHoveredImg(null)}
              className="group flex flex-col md:flex-row items-start md:items-center justify-between py-8 px-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 cursor-pointer hover:bg-white/10 hover:border-white/20 hover:-translate-y-2 transition-all duration-500 hover:shadow-2xl"
            >
              <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black uppercase group-hover:text-blue-400 mb-2 md:mb-0 transition-colors mr-0 md:mr-8 leading-tight">
                {member.name}
              </h3>
              <p className="text-gray-400 uppercase tracking-widest font-semibold text-sm sm:text-base md:text-lg group-hover:text-white transition-colors">
                {member.role}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Center Image Popup Logic */}
      {hoveredImg && (
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:w-80 md:h-96 w-64 h-80 z-[100] pointer-events-none hidden lg:block rounded-2xl shadow-2xl shadow-blue-500/30 border-4 border-white/20 overflow-hidden"
        >
          <img
            src={`/src/assets/images/${hoveredImg}`}
            className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
            alt="Member"
          />
        </motion.div>
      )}

      {/* Zonal Secretaries */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-gradient-to-r from-slate-800/50 to-black/50 backdrop-blur-md p-10 sm:p-12 lg:p-16 text-center border-t border-white/10 rounded-t-3xl mt-8 mx-4 sm:mx-8 lg:mx-auto max-w-4xl shadow-2xl"
      >
        <h4 className="text-white font-bold text-2xl sm:text-3xl mb-6 uppercase tracking-wide bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
          Zonal Secretaries
        </h4>
        <p className="text-gray-300 text-base sm:text-lg lg:text-xl leading-relaxed max-w-3xl mx-auto">
          Rashid Sheikh • Kishor Kalbhor • Piyush Kakad • Ajay Gomatiwal • Dharmendra Mishra • Amol Deshmukh • Deepak Barambe • Jawanmal Sharma • Sagar Kuchekar
        </p>
      </motion.div>
    </section>
  );
};

export default Part3;
