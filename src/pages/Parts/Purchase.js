import React, { useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import apiClient from "../../apiClient";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase-init";
import Loading from "../shared/Loading";

const Purchase = () => {
  const itemId = useParams();
  const [quantity, setQuantity] = useState(100);
  const [user] = useAuthState(auth);
  const { data: item, isLoading } = useQuery("item", () =>
    apiClient(`http://localhost:5000/item/${itemId.itemId}`)
  );

  if (isLoading) {
    return <Loading />;
  }

  const { _id, title, description, img, available, minimum, price } =
    item?.data;

  return (
    <div className="parent my-32">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="shadow-lg rounded-lg border">
          <div className="mx-auto">
            <img src={img} alt="item" />
          </div>
          <div className="p-4">
            <h2 className="text-3xl font-semibold text-secondary">{title}</h2>
            <p className="font-medium my-2" title={description}>
              {description}
            </p>
            <p className="text-2xl font-semibold">
              Price: {price} <span className="text-xs">(per piece)</span>
            </p>
            <div className="flex justify-between my-4">
              <p className="font-medium">Minimum: {minimum} required</p>
              <p className="font-medium">Available: {available} </p>
            </div>
          </div>
        </div>

        {/* Purchase Form */}
        <div className="shadow-lg rounded-lg border p-6">
          <h1 className="text-3xl text-center text-primary mb-6">
            Purchase Info
          </h1>
          <form className="flex flex-col justify-between">
            <div>
              <div className="form-control w-full my-3">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={user?.displayName}
                  disabled
                  required
                />
              </div>

              <div className="form-control w-full my-3">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  className="input input-bordered w-full"
                  value={user?.email}
                  disabled
                  required
                />
              </div>

              <div className="form-control w-full my-3">
                <label className="label">
                  <span className="label-text">Quantity</span>
                </label>
                <input
                  type="number"
                  className="input input-bordered w-full focus:outline-secondary"
                  defaultValue={minimum}
                  name="quantity"
                  onBlur={(e) => setQuantity(e.target.value)}
                  placeholder="Enter quantity"
                  required
                />
                <label className="label">
                  {quantity < minimum && (
                    <span className="label-text text-error">
                      Minimum {minimum} pcs Required
                    </span>
                  )}
                  {quantity > available && (
                    <span className="label-text text-error">
                      Maximum {available} pcs
                    </span>
                  )}
                </label>
              </div>

              <div className="form-control w-full my-3">
                <label className="label">
                  <span className="label-text">Address</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered focus:outline-secondary  w-full "
                  placeholder="Enter your address"
                  required
                />
              </div>

              <div className="form-control w-full my-3">
                <label className="label">
                  <span className="label-text">Phone</span>
                </label>
                <input
                  type="number"
                  className="input input-bordered focus:outline-secondary  w-full "
                  placeholder="Enter your Phone"
                  required
                />
              </div>
            </div>

            <div>
              <input
                type="submit"
                className="w-full btn bg-gradient-to-r from-primary to-secondary hover:bg-gradient-to-l duration-500 uppercase text-white border-none"
                value="Place Order"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Purchase;
