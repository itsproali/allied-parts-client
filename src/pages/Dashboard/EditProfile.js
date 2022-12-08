import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import apiClient from "../../apiClient";
import auth from "../../firebase-init";
import Loading from "../shared/Loading";

const EditProfile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loggedUser] = useAuthState(auth);
  const uid = loggedUser?.uid;
  const { data: user, isLoading } = useQuery("user", () =>
    apiClient(`https://allied-parts-server.vercel.app/profile/${uid}`)
  );

  if (isLoading || loading) {
    return <Loading />;
  }

  const { displayName, email, bio, phone, address, linkedin, photoURL } =
    user?.data;
  // const imgbbKey = process.env.REACT_APP_imgbbKey;
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const displayName = e.target.displayName.value;
    const email = e.target.email.value;
    const bio = e.target.bio.value;
    const phone = e.target.phone.value;
    const address = e.target.address.value;
    const linkedin = e.target.linkedin.value;
    const photoURL = e.target.img.value;
    const details = {
      displayName,
      email,
      bio,
      phone,
      address,
      linkedin,
      photoURL,
    };
    apiClient.put(
      `https://allied-parts-server.vercel.app/profile-update/${uid}`,
      { details }
    );
    setLoading(false);
    toast.success("Profile Updated");
    navigate("/my-profile");
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
    //       const details = { name, email, phone, address, linkedin, img };
    //       apiClient.put(`https://allied-parts-server.vercel.app/profile/${uid}`, { details });
    //       setLoading(false);
    //       toast.success("Profile Updated");
    //       navigate("/my-profile");
    //     }
    //   });
  };
  return (
    <div className="my-20">
      <h1 className="text-center text-primary text-2xl font-semibold my-6">
        Edit Profile
      </h1>
      <form
        className="w-full sm:w-96 shadow-xl rounded-lg bg-gray-100 p-4 mx-auto"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          name="displayName"
          placeholder="Enter Your Name"
          className="input block w-full focus:outline-primary bg-white"
          required
          defaultValue={displayName}
        />
        <input
          type="email"
          name="email"
          placeholder="Enter Your Email"
          className="input block w-full focus:outline-primary bg-white my-4"
          required
          defaultValue={email}
          disabled={email}
        />
        <input
          type="bio"
          name="bio"
          placeholder="Enter Your Bio"
          className="input block w-full focus:outline-primary bg-white my-4"
          defaultValue={bio}
        />
        <input
          type="number"
          name="phone"
          placeholder="Enter Your Phone No."
          className="input block w-full focus:outline-primary bg-white my-4"
          required
          defaultValue={phone}
        />

        <input
          type="text"
          name="address"
          placeholder="Enter Your Address"
          className="input block w-full focus:outline-primary bg-white my-4"
          required
          defaultValue={address}
        />
        <input
          type="text"
          name="linkedin"
          placeholder="Enter Your Linkedin"
          className="input block w-full focus:outline-primary bg-white my-4"
          required
          defaultValue={linkedin}
        />
        <label htmlFor="photo" className="label">
          <span>Profile Photo</span>
        </label>
        {/* <input
          type="file"
          name="image"
          placeholder="Choose your photo"
          className="w-full mb-4 cursor-pointer"
        /> */}
        <input
          type="text"
          name="img"
          placeholder="http://imgbb.com/profile.png"
          className="input block w-full focus:outline-primary bg-white my-4"
          defaultValue={photoURL}
        />
        <input
          type="submit"
          value="Update"
          className="block btn w-full btn-primary"
        />
      </form>
    </div>
  );
};

export default EditProfile;
