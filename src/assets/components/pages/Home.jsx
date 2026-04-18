import React, { useState } from "react";
import { motion } from "framer-motion";
import img1 from "../../images/1.jpeg";
import img2 from "../../images/2.jpeg";
import img3 from "../../images/3.jpg";
import videoBg from "../../videos/1.mp4";

const Home = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const images = [img1, img2, img3];

  const scrollToLearnMore = () => {
    const element = document.getElementById('learn-more');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <section className="relative w-full h-screen overflow-hidden">
        <video
          src={videoBg}
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40"></div>
        <div className="relative z-10 flex items-center h-full w-full px-4 sm:px-6 md:px-16 pt-20 md:pt-0">
          <div className="w-full max-w-4xl backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 md:p-12 shadow-2xl">
            <div className="text-center md:text-left">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="font-black bg-gradient-to-r from-white via-blue-200 to-blue-400 bg-clip-text text-transparent leading-tight mb-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl drop-shadow-2xl"
              >
                Welcome to KCDA
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-gray-100 font-light mb-10 max-w-2xl mx-auto md:mx-0 drop-shadow-lg tracking-wide leading-relaxed"
              >
                Kalyan Chemists & Druggists Association
              </motion.p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={scrollToLearnMore}
                  className="px-10 py-5 bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-600 hover:to-blue-700 text-white font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 ring-2 ring-transparent hover:ring-emerald-400/50"
                >
                  Learn More ↓
                </motion.button>
                <motion.a
                  href="/meetings"
                  className="px-10 py-5 border-2 border-white/50 hover:border-white text-white font-bold text-lg rounded-2xl backdrop-blur-sm hover:bg-white/10 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Upcoming Meetings
                </motion.a>
              </div>
            </div>
          </div>
        </div>
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2"></div>
          </div>
        </motion.div>
      </section>

      {/* About KCDA */}
      <section id="learn-more" className="py-24 bg-gradient-to-b from-slate-900/50 to-black min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 lg:px-16 max-w-7xl">
          <motion.h2 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center text-4xl md:text-5xl lg:text-6xl font-black bg-gradient-to-r from-emerald-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent mb-20 drop-shadow-2xl tracking-tight"
          >
            About KCDA
          </motion.h2>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl ring-4 ring-white/10 ring-offset-4 ring-offset-slate-900/50">
                <motion.img 
                  key={currentImage}
                  initial={{ scale: 1.05, opacity: 0.8 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  src={images[currentImage]} 
                  alt="KCDA Activity" 
                  className="w-full h-96 lg:h-[500px] object-cover"
                />
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 bg-black/50 backdrop-blur-md rounded-full py-2 px-4">
                  {[0,1,2].map((i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentImage(i)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        currentImage === i 
                          ? 'w-10 bg-emerald-500 shadow-lg shadow-emerald-500/50' 
                          : 'bg-white/50 hover:bg-white/70 hover:w-4'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8 lg:space-y-10 text-white max-w-lg"
            >
              <motion.h3 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-6 drop-shadow-2xl leading-tight"
              >
                Our Mission
              </motion.h3>
              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg md:text-xl lg:text-2xl leading-relaxed text-gray-100 mb-8 drop-shadow-lg"
              >
                Kalyan Chemists & Druggists Association is committed to advancing the pharmacy profession through education, advocacy, and community service. We empower pharmacists to deliver exceptional healthcare.
              </motion.p>
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <motion.div 
                  className="flex items-start gap-4 p-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/20 hover:bg-white/10 hover:-translate-y-2 transition-all duration-300 group cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-400/30 to-blue-400/30 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                    <span className="text-emerald-300 font-bold text-2xl">✓</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-lg mb-2 group-hover:text-emerald-300 transition-colors">Quality Standards</h4>
                    <p className="text-gray-300 text-sm leading-relaxed">Ensuring the highest pharmaceutical standards and patient safety</p>
                  </div>
                </motion.div>
                <motion.div 
                  className="flex items-start gap-4 p-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/20 hover:bg-white/10 hover:-translate-y-2 transition-all duration-300 group cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400/30 to-purple-400/30 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                    <span className="text-blue-300 font-bold text-2xl">✓</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-lg mb-2 group-hover:text-blue-300 transition-colors">Community Trust</h4>
                    <p className="text-gray-300 text-sm leading-relaxed">Building healthcare trust through reliable service and transparency</p>
                  </div>
                </motion.div>
              </motion.div>
              <motion.a
                href="/about"
                className="inline-block px-12 py-5 bg-gradient-to-r from-emerald-500 via-blue-600 to-indigo-600 hover:from-emerald-600 hover:via-blue-700 hover:to-indigo-700 text-white font-bold text-xl rounded-2xl shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-400 ring-4 ring-transparent hover:ring-emerald-400/30"
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Discover More →
              </motion.a>
            </motion.div>
          </div>
        </div>
      </section>

    </>
  );
};

export default Home;
