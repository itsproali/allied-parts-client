import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import Loading from "../shared/Loading";
import apiClient from "../../apiClient";
import GrdButton from "../shared/GrdButton";
// import toast from "react-hot-toast";

const Parts = () => {
  const navigate = useNavigate();
  const location = useLocation();
  let url = "https://allied-parts-server.vercel.app/parts";
  if (location.pathname === "/") {
    url = "https://allied-parts-server.vercel.app/parts/3";
  }
  const {
    data: parts,
    isLoading,
    isError,
    error,
  } = useQuery("parts", () => apiClient.get(url));

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    console.log(error);
    navigate("/");
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
              <GrdButton
                className="w-full mt-4"
                onClick={() => navigate(`/purchase/${item._id}`)}
              >
                Purchase
              </GrdButton>
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
