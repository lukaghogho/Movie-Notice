import Landing from "./landing/Landing";
import React from "react";
import Reviews from "./reviews/Reviews";
const Home = () => {
  return (
    <div>
      <Landing></Landing>
      <Reviews></Reviews>
    </div>
  );
};

export default React.memo(Home);
