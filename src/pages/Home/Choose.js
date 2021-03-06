import React from "react";
import { Link } from "react-router-dom";
import GrdButton from "../shared/GrdButton";
import whyChoose from "../../img/why.jpg";
import { AiOutlineCheckCircle } from "react-icons/ai";

const Choose = () => {
  return (
    <div className="parent mb-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="">
          <img
            src={whyChoose}
            className="max-w-full rounded-lg shadow-2xl"
            alt="choose us"
          />
          </div>
          <div className="lg:max-w-lg md:ml-6">
            <h1 className="text-4xl font-bold text-primary">Why Choose Us</h1>
            <p className="py-6">
              We are determined to see you happy anyhow. Our main target is to
              fulfill the client's requirements. We provide 100% genuine parts.
              We don't want clients suffering. These are the main difference
              between us with others.
            </p>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex items-center">
                <AiOutlineCheckCircle className="text-secondary text-xl" />
                <span className="ml-3 hover:text-secondary duration-300 cursor-pointer">
                  Great Technology
                </span>
              </div>
              <div className="flex items-center">
                <AiOutlineCheckCircle className="text-secondary text-xl" />
                <span className="ml-3 hover:text-secondary duration-300 cursor-pointer">
                  Best Branding
                </span>
              </div>
              <div className="flex items-center">
                <AiOutlineCheckCircle className="text-secondary text-xl" />
                <span className="ml-3 hover:text-secondary duration-300 cursor-pointer">
                  Delivery Onetime
                </span>
              </div>
              <div className="flex items-center">
                <AiOutlineCheckCircle className="text-secondary text-xl" />
                <span className="ml-3 hover:text-secondary duration-300 cursor-pointer">
                  Genuine Parts
                </span>
              </div>
            </div>

            <Link to="/parts">
              <GrdButton>Get Started</GrdButton>
            </Link>
          </div>
        </div>
      </div>
  );
};

export default Choose;
