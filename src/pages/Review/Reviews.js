import React from "react";
import { useQuery } from "react-query";
import { Link, useLocation, useNavigate } from "react-router-dom";
import apiClient from "../../apiClient";
import Loading from "../shared/Loading";
import { FaRegStar, FaStar } from "react-icons/fa";

const Reviews = () => {
  const navigate = useNavigate();
  const location = useLocation();
  let url = "https://allied-parts-manufacturing.herokuapp.com/reviews";
  if (location.pathname === "/") {
    url = "https://allied-parts-manufacturing.herokuapp.com/review/6";
  }
  const {
    data: reviews,
    isLoading,
    isError,
    error,
  } = useQuery("reviews", () => apiClient.get(url));

  if (isLoading) {
    return <Loading></Loading>;
  }

  if (isError) {
    console.log(error);
    navigate("/");
  }

  return (
    <div className="parent my-24">
      <h1 className="text-center text-primary text-4xl my-4 font-bold">
        What our client says ({reviews?.data?.length})
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 rounded">
        {reviews?.data?.map((review) => (
          <div
            key={review._id}
            className="shadow-lg rounded-xl p-6 flex flex-col items-center border my-8 hover:bg-purple-800 duration-300 cursor-pointer hover:text-white"
          >
            <div className="mt-[-50px] btn-circle bg-secondary text-white flex items-center justify-center w-16 h-16">
              <h1 className="text-3xl">{review.rating}</h1>
            </div>
            <h2 className="text-2xl font-semibold mt-2">Name: {review.name}</h2>
            <p className=" ">{review.description}</p>
            <div className="flex items-center mt-4">
              {review.rating >= "1" ? (
                <FaStar className="text-secondary"></FaStar>
              ) : (
                <FaRegStar className="text-secondary"></FaRegStar>
              )}
              {review.rating >= "2" ? (
                <FaStar className="text-secondary"></FaStar>
              ) : (
                <FaRegStar className="text-secondary"></FaRegStar>
              )}
              {review.rating >= "3" ? (
                <FaStar className="text-secondary"></FaStar>
              ) : (
                <FaRegStar className="text-secondary"></FaRegStar>
              )}
              {review.rating >= "4" ? (
                <FaStar className="text-secondary"></FaStar>
              ) : (
                <FaRegStar className="text-secondary"></FaRegStar>
              )}

              {review.rating >= "5" ? (
                <FaStar className="text-secondary"></FaStar>
              ) : (
                <FaRegStar className="text-secondary"></FaRegStar>
              )}
            </div>
          </div>
        ))}
      </div>

      {location.pathname === "/" && (
        <div className="text-right mt-4">
          <Link
            to="/reviews"
            className="text-primary hover:text-secondary text-2xl"
          >
            See All
          </Link>
        </div>
      )}
    </div>
  );
};

export default Reviews;
