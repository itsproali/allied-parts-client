import React from "react";
import Parts from "../Parts/Parts";
import Reviews from "../Review/Reviews";
import Achievement from "./Achievement";
import Banner from "./Banner";
import Choose from "./Choose";
import Contact from "../Contact/Contact";

const Home = () => {
  return (
    <div>
      <Banner />
      <Parts />
      <Choose />
      <Achievement />
      <Reviews />
      <Contact />
    </div>
  );
};

export default Home;
