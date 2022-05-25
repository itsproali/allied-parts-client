import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useQuery } from "react-query";
import Loading from "../shared/Loading";
import apiClient from "../../apiClient";
import GrdButton from "../shared/GrdButton";

const Parts = () => {
  const location = useLocation();
  let url = "https://allied-parts-manufacturing.herokuapp.com/parts";
  if (location.pathname === "/") {
    url = "https://allied-parts-manufacturing.herokuapp.com/parts/3";
  }
  const { data: parts, isLoading } = useQuery("parts", () =>
    apiClient.get(url)
  );

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="parent my-24">
      <h1 className="text-center text-primary text-4xl my-4 font-bold">
        Parts
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 rounded">
        {parts?.data?.map((item) => (
          <div key={item._id} className="shadow-lg">
            <div className="">
              <img src={item.img} alt="item" />
            </div>
            <div className="p-4">
              <h2 className="text-2xl font-semibold text-secondary">
                {item.title}
              </h2>
              <p className="font-medium my-2" title={item.description}>
                {item.description.slice(0, 100)} ....
              </p>
              <p className="text-2xl font-semibold">
                Price: {item.price} <span className="text-xs">(per piece)</span>
              </p>
              <GrdButton className="w-full mt-4">Purchase</GrdButton>
            </div>
          </div>
        ))}
      </div>

      {location.pathname === "/" && (
        <div className="text-right mt-4">
          <Link
            to="/parts"
            className="text-primary hover:text-secondary text-2xl"
          >
            Show All
          </Link>
        </div>
      )}
    </div>
  );
};

export default Parts;
