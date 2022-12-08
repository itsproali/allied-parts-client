import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Loading from "../shared/Loading";

const AddItem = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    setLoading(true);
    // const image = e.target.image[0];
    // const formData = new FormData();
    // formData.append("image", image);
    // await fetch(`https://api.imgbb.com/1/upload?key=${imgbbKey}`, {
    //   method: "POST",
    //   body: formData,
    // })
    //   .then((res) => res.json())
    //   .then((result) => {
    //     console.log(result);
    //     if (result.success) {
    //       console.log(result.data.url);
    //       const img = result.data.url;
    const item = {
      title: e.target.title.value,
      available: e.target.available.value,
      price: e.target.price.value,
      minimum: e.target.minimum.value,
      description: e.target.description.value,
      img: e.target.image.value,
    };
    // Add Product To Database
    fetch(`https://allied-parts-server.vercel.app/add-item`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify({ item }),
    })
      .then((res) => res.json())
      .then((inserted) => {
        setLoading(false);
        toast.success("Item Added Successfully");
        navigate("/dashboard/manage-products");
      });
    // }
    //   });
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="my-24 flex min-h-screen items-center justify-center">
      <div className="card w-full sm:w-96 bg-base-100 shadow-xl border">
        <div className="card-body">
          <h2 className="text-center text-3xl font-semibold">Add New Item</h2>
          <form onSubmit={handleSubmit} className="">
            {/* Name */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Product Name</span>
              </label>
              <input
                type="text"
                placeholder="Product Title"
                className="input input-bordered focus:outline-primary w-full max-w-xs"
                name="title"
                required
              />
            </div>

            {/* Price */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Product Price</span>
              </label>
              <input
                type="number"
                placeholder="Product Price"
                className="input input-bordered focus:outline-primary w-full max-w-xs"
                name="price"
                required
              />
            </div>

            {/* Available */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Product Available</span>
              </label>
              <input
                type="number"
                placeholder="Product Price"
                className="input input-bordered focus:outline-primary w-full max-w-xs"
                name="available"
                required
              />
            </div>

            {/* Minimum */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Minimum Order</span>
              </label>
              <input
                type="number"
                placeholder="Minimum Quantity"
                className="input input-bordered focus:outline-primary w-full max-w-xs"
                name="minimum"
                required
              />
            </div>

            {/* Description */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Product Description</span>
              </label>
              <textarea
                name="description"
                cols="30"
                rows="4"
                className="textarea input-bordered focus:outline-primary w-full max-w-xs"
                required
              ></textarea>
            </div>

            {/* Image */}
            <div className="form-control my-6">
              <label className="label">
                <span className="label-text">Upload Image</span>
              </label>
              {/* <input
                type="file"
                className="cursor pointer w-full"
                name="image"
              /> */}
              <input
                type="text"
                placeholder="Product Image"
                className="input input-bordered focus:outline-primary w-full max-w-xs"
                name="image"
                required
              />
            </div>

            <input
              className="btn w-full btn-primary text-white"
              type="submit"
              value="Add"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddItem;
