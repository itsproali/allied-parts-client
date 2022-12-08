import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useQuery } from "react-query";
import apiClient from "../../apiClient";
import auth from "../../firebase-init";
import Loading from "../shared/Loading";
import { FaRegEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const MyProfile = () => {
  const navigate = useNavigate();
  const [loggedUser] = useAuthState(auth);
  const uid = loggedUser?.uid;
  const { data: user, isLoading } = useQuery("user", () =>
    apiClient(`https://allied-parts-server.vercel.app/profile/${uid}`)
  );

  if (isLoading) {
    return <Loading />;
  }

  const handleEdit = (uid) => {
    navigate(`/edit/${uid}`);
  };

  const { photoURL, displayName, bio, address, phone, email, linkedin } =
    user?.data;
  return (
    <div className="parent my-32">
      <div className="rounded-lg shadow-lg p-4 border bg-base-100  md:px-12 relative">
        <div className="mt-[-50px] btn-circle bg-accent text-white flex items-center justify-center w-20 h-20 mx-auto border-4 cursor-pointer overflow-hidden">
          {photoURL ? (
            <img src={photoURL} alt="user" />
          ) : (
            <p className="text-4xl">{displayName.slice(0, 1)}</p>
          )}
        </div>
        <h1 className="text-center text-3xl font-semibold text-primary">
          {displayName ? displayName : "Your Name"}
        </h1>
        <button
          className="btn btn-sm btn-secondary absolute top-4 right-4"
          onClick={() => handleEdit(uid)}
        >
          <FaRegEdit></FaRegEdit>Edit Profile
        </button>
        <p className="text-center my-4 max-w-xs mx-auto">
          {bio ? bio : "Your bio"},{" "}
          <span className="font-semibold">
            {address ? address : "Your street Address"}
          </span>
        </p>
        <div className="flex items-center justify-between my-6 flex-wrap">
          <p className="">
            Phone No:{" "}
            <span className="font-bold">{phone ? phone : "0123456789"}</span>
          </p>
          <p className="">
            Email:{" "}
            <span className="font-bold">
              {email ? email : "name@gmail.com"}
            </span>
          </p>
        </div>
        <p className="">
          LinkedIn:{" "}
          <span className="font-bold">
            {linkedin ? linkedin : "https://linkedin.com"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default MyProfile;
