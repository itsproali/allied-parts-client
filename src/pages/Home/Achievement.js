import React from "react";
import CountUp from "react-countup";
import { AiOutlinePlus } from "react-icons/ai";
import { FaNetworkWired } from "react-icons/fa";
import { MdWorkOutline } from "react-icons/md";
import { HiUserGroup } from "react-icons/hi";
import { VscTools } from "react-icons/vsc";

const Achievement = () => {
  return (
    <div className="">
      <div className="py-6 px-4 md:px-12 w-full bg-gradient-to-r from-slate-800 to-slate-900">
        <h1 className="text-center text-4xl my-4 text-primary">
          Our Achievements
        </h1>
        <div className="flex flex-col sm:flex-row items-center justify-evenly my-32">
          <div className="flex flex-col items-center my-6 md:my-0">
            <FaNetworkWired className="text-secondary text-4xl"></FaNetworkWired>
            <div className="text-white flex items-center my-4">
              <CountUp
                start={500}
                end={654}
                duration={2}
                className="text-4xl"
              />
              <AiOutlinePlus className="text-2xl"></AiOutlinePlus>
            </div>
            <h1 className="text-xl text-secondary">Completed Projects</h1>
          </div>

          <div className="flex flex-col items-center my-6 md:my-0">
            <MdWorkOutline className="text-secondary text-5xl"></MdWorkOutline>
            <div className="text-white flex items-center my-4">
              <CountUp start={4} end={132} duration={2} className="text-4xl" />
              <AiOutlinePlus className="text-2xl"></AiOutlinePlus>
            </div>
            <h1 className="text-xl text-secondary">Branches</h1>
          </div>

          <div className="flex flex-col items-center my-6 md:my-0">
            <HiUserGroup className="text-secondary text-5xl"></HiUserGroup>
            <div className="text-white flex items-center my-4">
              <CountUp
                start={300}
                end={465}
                duration={2}
                className="text-4xl"
              />
              <AiOutlinePlus className="text-2xl"></AiOutlinePlus>
            </div>
            <h1 className="text-xl text-secondary">Happy Clients</h1>
          </div>

          <div className="flex flex-col items-center my-6 md:my-0">
            <VscTools className="text-secondary text-5xl"></VscTools>
            <div className="text-white flex items-center my-4">
              <CountUp
                start={450}
                end={507}
                duration={2}
                className="text-4xl"
              />
              <AiOutlinePlus className="text-2xl"></AiOutlinePlus>
            </div>
            <h1 className="text-xl text-secondary">Available Parts</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Achievement;
