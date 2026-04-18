import React from "react";

import EventPart1 from "../Eventss/EventPart1";
import EventPart2 from "../Eventss/EventPart2";
import EventPart3 from "../Eventss/EventPart3";

import Footer from "../common/Footer";

const Events = () => {
  return (
    <main className="w-full bg-[#111] selection:bg-blue-500">
      <EventPart1 />
      <EventPart2 />
      <EventPart3 />
      <Footer />
    </main>
  );
};

export default Events;
