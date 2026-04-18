import React from "react";
// ../ goes up to the 'components' folder, then we look inside 'News'
import NewsPart1 from "../News/NewsPart1.jsx";
import NewsPart2 from "../News/NewsPart2.jsx";

const News = () => {
  return (
    <div className="bg-white">
      <NewsPart1 />
      <NewsPart2 />
    </div>
  );
};

export default News;
