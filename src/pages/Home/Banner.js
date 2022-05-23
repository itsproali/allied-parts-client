import React from "react";
import GrdButton from "../shared/GrdButton";

const Banner = () => {
  return (
    <div className="bg-bannerBg h-screen bg-cover flex items-center">
      <div className="mx-2 md:mx-12 text-white">
        <h2 className=" text-2xl">WE HELP</h2>
        <h1 className="text-7xl font-bold">Your Business</h1>
        <p className="text-xl font-medium max-w-lg my-6">
          50 Years of experience in finance and consultant business! We helping
          a client their goals than programming a workout and setting the pin in
          the weight stack.
        </p>
        <GrdButton>Get Started</GrdButton>
      </div>
    </div>
  );
};

export default Banner;
