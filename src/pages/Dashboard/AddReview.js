import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import apiClient from "../../apiClient";
import auth from "../../firebase-init";

const AddReview = () => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = user.displayName;
    const description = e.target.description.value;
    const rating = e.target.rating.value;
    const uid = user.uid;

    const review = { name, description, rating, uid };
    const { data } = await apiClient.post(
      `https://allied-parts-server.vercel.app/add-review/${uid}`,
      { review }
    );
    if (data) {
      if (data.success === true) {
        toast.success("Review Added Successfully");
      } else {
        toast.error(`${data.message}`);
      }
      navigate("/dashboard");
    }
  };
  return (
    <div className="parent my-8">
      <form
        onSubmit={handleSubmit}
        className="w-full sm:w-96 shadow-lg border p-4 rounded-lg mx-auto"
      >
        <h1 className="text-3xl font-semibold text-center text-primary">
          Add Review
        </h1>

        {/* Name */}
        <div className="form-control w-full my-3">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            type="text"
            className="input input-bordered w-full"
            value={user?.displayName}
            name="name"
            // onBlur={(e) => setUserName(e.target.value)}
            disabled
            required
          />
        </div>

        {/* User Review */}
        <div className="form-control w-full my-3">
          <label className="label">
            <span className="label-text">Description</span>
          </label>
          <input
            type="text"
            className="input input-bordered focus:outline-primary  w-full "
            placeholder="Enter your address"
            name="description"
            // onBlur={(e) => setAddress(e.target.value)}
            required
          />
        </div>

        {/* Rating */}
        <div className="rating rating-lg rating-half my-3">
          <label className="label block">
            <span className="label-text">Rating:</span>
          </label>
          <input type="radio" name="rating" className="rating-hidden mx-auto" />
          <input
            type="radio"
            name="rating"
            className="bg-amber-500 mask mask-star-2 mask-half-1"
            value="0.5"
          />
          <input
            type="radio"
            name="rating"
            className="bg-amber-500 mask mask-star-2 mask-half-2"
            value="1.0"
          />
          <input
            type="radio"
            name="rating"
            className="bg-amber-500 mask mask-star-2 mask-half-1"
            value="1.5"
          />
          <input
            type="radio"
            name="rating"
            className="bg-amber-500 mask mask-star-2 mask-half-2"
            value="2.0"
          />
          <input
            type="radio"
            name="rating"
            className="bg-amber-500 mask mask-star-2 mask-half-1"
            value="2.5"
          />
          <input
            type="radio"
            name="rating"
            className="bg-amber-500 mask mask-star-2 mask-half-2"
            value="3.0"
          />
          <input
            type="radio"
            name="rating"
            className="bg-amber-500 mask mask-star-2 mask-half-1"
            value="3.5"
          />
          <input
            type="radio"
            name="rating"
            className="bg-amber-500 mask mask-star-2 mask-half-2"
            value="4.0"
          />
          <input
            type="radio"
            name="rating"
            className="bg-amber-500 mask mask-star-2 mask-half-1"
            value="4.5"
          />
          <input
            type="radio"
            name="rating"
            className="bg-amber-500 mask mask-star-2 mask-half-2"
            value="5.0"
            checked
          />
        </div>

        {/* Submit */}
        <input
          type="submit"
          value="Add Review"
          className="my-3 w-full btn btn-primary"
        />
      </form>
    </div>
  );
};

export default AddReview;
