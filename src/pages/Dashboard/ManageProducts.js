import React from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import apiClient from "../../apiClient";
import Loading from "../shared/Loading";

const ManageProducts = () => {
  const {
    data: parts,
    isLoading,
    refetch,
  } = useQuery("parts", () =>
    apiClient.get("https://allied-parts-manufacturing.herokuapp.com/parts")
  );
  if (isLoading) {
    return <Loading />;
  }

  const handleDelete = (itemId) => {
    apiClient.delete(
      `https://allied-parts-manufacturing.herokuapp.com/delete-item/${itemId}`
    );
    refetch();
  };
  return (
    <div>
      <Link to="/add-item">
        <button className="btn btn-primary my-4 shadow-lg">Add Item</button>
      </Link>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th></th>
              <th>Avatar</th>
              <th>Name</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {parts?.data?.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>
                  <div className="avatar">
                    <div className="w-12 rounded">
                      <img src={item.img} alt="avatar" />
                    </div>
                  </div>
                </td>
                <td>{item.title}</td>
                <td>{item.price}</td>
                <td>
                  <button
                    className="btn btn-xs"
                    onClick={() =>
                      Swal.fire({
                        title: "Are you sure?",
                        text: "You won't be able to revert this!",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Yes, delete it!",
                      }).then((result) => {
                        if (result.isConfirmed) {
                          Swal.fire(
                            "Deleted!",
                            "Product has been deleted.",
                            "success",
                            handleDelete(item._id)
                          );
                        }
                      })
                    }
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageProducts;
