import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
import apiClient from "../../apiClient";
import Loading from "../shared/Loading";

const MyProfile = () => {
  const [loggedUser] = useAuthState();
  const uid = loggedUser?.uid;
  const { data: user, isLoading } = useQuery("user", () =>
    apiClient(`https://allied-parts-manufacturing.herokuapp.com/profile/${uid}`)
  );

  if (isLoading) {
    return <Loading />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const address = e.target.address.value;
    const linkedin = e.target.linkedin.value;

    const details = { name, email, address, linkedin };
    apiClient.put(
      `https://allied-parts-manufacturing.herokuapp.com/profile/${uid}`,
      { details }
    );
    toast.success("We are happy to see you connected with us");
  };
  return (
    <div className="my-20">
      <form
        className="w-96 shadow-lg rounded-lg bg-base-200"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          name="name"
          placeholder="Enter Your Name"
          className="input block w-full focus:outline-primary bg-white"
          required
          defaultValue={user?.name}
        />
        <input
          type="email"
          name="email"
          placeholder="Enter Your Email"
          className="input block w-full focus:outline-primary bg-white my-4"
          required
          defaultValue={user?.email}
        />

        <input
          type="text"
          name="address"
          placeholder="Enter Your Address"
          className="input block w-full focus:outline-primary bg-white my-4"
          required
          defaultValue={user?.address}
        />
        <input
          type="text"
          name="linkedin"
          placeholder="Enter Your Linkedin"
          className="input block w-full focus:outline-primary bg-white my-4"
          required
          defaultValue={user?.linkedin}
        />
        <input
          type="submit"
          value="Send"
          className="block btn w-full btn-primary"
        />
      </form>
    </div>
  );
};

export default MyProfile;
