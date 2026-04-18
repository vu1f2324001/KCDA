import React from "react";
import Part1 from "../About/Part1";
import Part2 from "../About/Part2";
import Part3 from "../About/Part3";

import Footer from "../common/Footer";

const Aboutus = () => {
  return (
    <main className="w-full bg-[#111] pt-24 md:pt-32">
      <Part1 />
      <Part2 />
      <Part3 />
    </main>
  );
};

export default Aboutus;
