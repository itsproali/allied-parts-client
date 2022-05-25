import React from "react";
import Parts from "../Parts/Parts";
import Reviews from "../Review/Reviews";
import Achievement from "./Achievement";
import Banner from "./Banner";
import Choose from "./Choose";

const Home = () => {
  return (
    <div>
      <Banner />
      <Parts />
      <Choose />
      <Achievement />
      <Reviews />
    </div>
  );
};

export default Home;
