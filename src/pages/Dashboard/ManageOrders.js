import React from "react";
import { useQuery } from "react-query";
import apiClient from "../../apiClient";
import Loading from "../shared/Loading";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ManageOrders = () => {
  const navigate = useNavigate();
  const {
    data: orders,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery("orders", () =>
    apiClient.get("https://allied-parts-server.vercel.app/orders")
  );

  const handleCancel = (orderId) => {
    apiClient.delete(
      `https://allied-parts-server.vercel.app/delete/${orderId}`
    );
    refetch();
  };

  const handleShift = (orderId) => {
    apiClient.put(`https://allied-parts-server.vercel.app/shift/${orderId}`);
    toast.success("Product Shifted Successfully");
    refetch();
  };

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    toast.error(`${error.message}`);
    navigate("/");
  }

  console.log(orders.data);
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Change Status</th>
              <th>Option</th>
            </tr>
          </thead>
          <tbody>
            {orders?.data?.map((order, index) => (
              <tr key={order._id}>
                <td>{index + 1}</td>
                <td>{order.itemTitle}</td>
                <td>{order.userEmail}</td>
                <td>{order.status}</td>
                <td>
                  <button
                    className="btn btn-xs"
                    disabled={order.status !== "Pending"}
                    onClick={() => handleShift(order._id)}
                  >
                    Shift
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-xs"
                    disabled={order.status !== "Unpaid"}
                    onClick={() =>
                      // Modal
                      Swal.fire({
                        title: "Are you sure?",
                        text: "You won't be able to revert this!",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Delete Order",
                      }).then((result) => {
                        if (result.isConfirmed) {
                          Swal.fire(
                            "Deleted",
                            "This order has been deleted.",
                            "success",
                            handleCancel(order._id)
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

export default ManageOrders;
