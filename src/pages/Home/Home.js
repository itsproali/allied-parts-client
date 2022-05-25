import React from "react";
import Parts from "../Parts/Parts";
import Achievement from "./Achievement";
import Banner from "./Banner";
import Choose from "./Choose";

const Home = () => {
  return (
    <div>
      <Banner />
      <Parts></Parts>
      <Achievement />
      <Choose></Choose>
    </div>
  );
};

export default Home;
