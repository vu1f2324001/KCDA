import React from "react";

import mapImage from "../../images/6.png";

const zonesData = [
  {
    zone: "Zone A",
    incharge: "Insert Name Here",
    areas: "Pachra, Hanuman Nagar, Chinchpada Road",
    wards: "Wards 15, 16",
    color: "bg-purple-50",
    borderColor: "border-purple-200",
  },
  {
    zone: "Zone B",
    incharge: "Insert Name Here",
    areas: "Syndicate, Murbad Road, Kalyan West",
    wards: "Wards 1, 8",
    color: "bg-orange-50",
    borderColor: "border-orange-200",
  },
  {
    zone: "Zone C",
    incharge: "Insert Name Here",
    areas: "Shivaji Chowk to Patankar, Adharwadi",
    wards: "Wards 2, 3",
    color: "bg-yellow-50",
    borderColor: "border-yellow-200",
  },
  {
    zone: "Zone D",
    incharge: "Insert Name Here",
    areas: "Agardanda, Birla College, Yogidham-Shahad",
    wards: "Wards 4, 7",
    color: "bg-blue-50",
    borderColor: "border-blue-200",
  },
  {
    zone: "Zone F",
    incharge: "Insert Name Here",
    areas: "Chinchpada, Nandivli Village, Vijay Nagar",
    wards: "Wards 17, 18",
    color: "bg-red-50",
    borderColor: "border-red-200",
  },
  {
    zone: "Zone G",
    incharge: "Insert Name Here",
    areas: "Lokgram, Chakki Naka, Patripul, Tata Power",
    wards: "Wards 19, 21",
    color: "bg-green-50",
    borderColor: "border-green-200",
  },
  {
    zone: "Zone H",
    incharge: "Insert Name Here",
    areas: "Vadavli Station Road, Waldhuni, Godrej Hill",
    wards: "Wards 5, 6",
    color: "bg-teal-50",
    borderColor: "border-teal-200",
  },
  {
    zone: "Zone J",
    incharge: "Insert Name Here",
    areas: "Kolsewadi, Durga Mandir, Tisgaon",
    wards: "Wards 13, 14",
    color: "bg-indigo-50",
    borderColor: "border-indigo-200",
  },
];

const Zpart2 = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 uppercase tracking-widest">
            Zone Administration
          </h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto mt-2"></div>
        </div>

        {/* Map Reference */}
        <div className="max-w-4xl mx-auto mb-16 shadow-2xl rounded-2xl overflow-hidden border border-gray-100">
          <img
            src={mapImage} // Changed from "/6.png" to the imported mapImage variable
            alt="KDMC Zone Map"
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Zone Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {zonesData.map((item, index) => (
            <div
              key={index}
              className={`${item.color} ${item.borderColor} border-2 rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group`}
            >
              {/* Zone Header */}
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-black text-gray-800 tracking-tighter">
                  {item.zone}
                </h3>

                <span className="text-[10px] font-bold text-gray-800 bg-white px-2 py-1 rounded-md shadow-sm uppercase">
                  {item.wards}
                </span>
              </div>

              {/* Incharge Name */}
              <div className="mb-4">
                <p className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">
                  Zone In-charge
                </p>
                <p className="text-lg font-semibold text-blue-900 group-hover:text-blue-600 transition-colors">
                  {item.incharge}
                </p>
              </div>

              {/* Area Details */}
              <div className="pt-4 border-t border-gray-200/50">
                <p className="text-[10px] uppercase font-bold text-gray-500 tracking-widest mb-1">
                  Primary Areas
                </p>
                <p className="text-sm text-gray-700 leading-relaxed italic">
                  {item.areas}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Zpart2;
