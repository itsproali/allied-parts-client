import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
import apiClient from "../../apiClient";
import auth from "../../firebase-init";
import Loading from "../shared/Loading";
import { useNavigate } from "react-router-dom";

const ManageUsers = () => {
  const navigate = useNavigate();
  const [loggedUser] = useAuthState(auth);
  const {
    data: users,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery("users", () =>
    apiClient.get("https://allied-parts-manufacturing.herokuapp.com/users")
  );

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    console.log(error);
    navigate("/");
  }

  const handleDelete = async (uid) => {
    await apiClient.delete(
      `https://allied-parts-manufacturing.herokuapp.com/delete-user/${uid}`
    );
    await refetch();
    toast.success("User Deleted");
  };

  const handleMakeAdmin = async (uid) => {
    await apiClient.put(
      `https://allied-parts-manufacturing.herokuapp.com/make-admin/${uid}`
    );
    await refetch();
    toast.success("Admin Create Successfully");
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
              <th>Option</th>
            </tr>
          </thead>
          <tbody>
            {users?.data?.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td className="uppercase">{user.role}</td>
                <td>
                  <button
                    className="btn btn-xs"
                    onClick={() => handleDelete(user._id)}
                    disabled={user.email === loggedUser?.email}
                  >
                    Delete
                  </button>
                </td>
                <td>
                  {user.role !== "admin" && (
                    <button
                      className="btn btn-xs"
                      onClick={() => handleMakeAdmin(user._id)}
                    >
                      Make Admin
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
