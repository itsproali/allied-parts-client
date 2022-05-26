import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useQuery } from "react-query";
import apiClient from "../../apiClient";
import auth from "../../firebase-init";
import Loading from "../shared/Loading";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const MyOrders = () => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const {
    data: myOrders,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery("myOrders", () =>
    apiClient.get(
      `https://allied-parts-manufacturing.herokuapp.com/my-order?uid=${user?.uid}`
    )
  );

  const handlePayment = (orderId) => {
    apiClient.put(
      `https://allied-parts-manufacturing.herokuapp.com/payment/${orderId}`
    );
  };

  const handleCancel = (orderId) => {
    apiClient.delete(
      `https://allied-parts-manufacturing.herokuapp.com/delete/${orderId}`
    );
    refetch();
  };

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    toast.error(`${error.message}`);
    navigate("/");
  }

  return (
    <div>
      <h1 className="mb-2 text-2xl font-semibold text-primary">
        My Orders: {myOrders?.data?.length}
      </h1>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Price</th>
              <th>Status</th>
              <th>Option</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {myOrders?.data?.map((order, index) => (
              <tr key={order._id}>
                <th>{index + 1}</th>
                <td>{order.itemTitle}</td>
                <td>{order.total}</td>
                <td>{order.status}</td>
                <td>
                  <button
                    className="btn btn-xs"
                    disabled={order.status !== "Unpaid"}
                    // Payment Modal
                    onClick={() =>
                      Swal.fire({
                        title: "We are happy to see you again",
                        text: "Your purchase our happiness",
                        icon: "info",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Pay Now",
                      }).then((result) => {
                        if (result.isConfirmed) {
                          Swal.fire(
                            "Paid",
                            "Your order paid Successfully",
                            "success",
                            handlePayment(order._id)
                          );
                        }
                      })
                    }
                  >
                    Pay Now
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
                            "Your order has been deleted.",
                            "success",
                            handleCancel(order._id)
                          );
                        }
                      })
                    }
                  >
                    Cancel
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

export default MyOrders;
