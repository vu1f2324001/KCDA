import React from "react";
import MeetingPart1 from "../Meeting/meetingPart1.jsx";
import MeetingPart2 from "../Meeting/MeetingPart2.jsx";

const Meeting = () => {
  return (
    <div className="bg-white min-h-screen">
      <MeetingPart1 />
      <MeetingPart2 />
    </div>
  );
};

export default Meeting;
