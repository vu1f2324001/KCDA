import React from "react";
import { motion } from "framer-motion";

const Part2 = () => {
  return (
    <section className="w-full py-20 px-6 md:px-16 bg-[#111] text-white">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold mb-10 text-blue-500 uppercase tracking-tighter">
          Kalyan Chemists & Druggists Association
        </h2>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 text-gray-200 leading-relaxed text-lg lg:text-xl"
        >
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="mb-12 md:mb-0"
          >
            <p className="mb-6">
              Covering an area of 68 square kilometers with a population of over
              12.5 lakhs, Kalyan is a land of historical significance and
              sanctified by Shiv Chhatrapati.
            </p>
            <p>
              For nearly fifty years, our association has been a pillar of safe
              and selfless medicine distribution, guiding the nation's
              healthcare systems under the vision of leaders like Shri Jagannath
              Appa Shinde.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="border-l border-white/10 pl-4 sm:pl-8 md:pl-12 self-start"
          >
            <h4 className="text-white font-bold mb-4 uppercase tracking-widest text-base sm:text-lg">
              Key Initiatives
            </h4>
            <ul className="space-y-3 sm:space-y-4 text-base sm:text-lg">
              <li className="flex items-start gap-3">
                <span className="text-blue-400 font-bold text-lg mt-1 flex-shrink-0">→</span>
                Selfless Medicine Distribution
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 font-bold text-lg mt-1 flex-shrink-0">→</span>
                Member Software & Digitalization
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-400 font-bold text-lg mt-1 flex-shrink-0">→</span>
                Medical Check-up Camps
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-400 font-bold text-lg mt-1 flex-shrink-0">→</span>
                Social & Government Advocacy
              </li>
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Part2;
