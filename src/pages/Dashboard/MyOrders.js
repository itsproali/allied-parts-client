import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useQuery } from "react-query";
import apiClient from "../../apiClient";
import auth from "../../firebase-init";
import Loading from "../shared/Loading";
import Swal from "sweetalert2";

const MyOrders = () => {
  const [user] = useAuthState(auth);
  const {
    data: myOrders,
    isLoading,
    refetch,
  } = useQuery("myOrders", () =>
    apiClient.get(
      `https://allied-parts-manufacturing.herokuapp.com/my-order?uid=${user?.uid}`
    )
  );

  const handleCancel = (orderId) => {
    apiClient.delete(
      `https://allied-parts-manufacturing.herokuapp.com/delete/${orderId}`
    );
    refetch();
  };

  if (isLoading) {
    return <Loading />;
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
              <th>Quantity</th>
              <th>Status</th>
              <th>Option</th>
            </tr>
          </thead>
          <tbody>
            {myOrders?.data?.map((order, index) => (
              <tr key={order._id}>
                <th>{index + 1}</th>
                <td>{order.itemTitle}</td>
                <td>{order.quantity}</td>
                <td>{order.paid === true ? "Paid" : "Unpaid"}</td>
                <td>
                  <button
                    className="btn btn-xs"
                    disabled={order.paid === true}
                    onClick={() =>
                      Swal.fire({
                        title: "Are you sure?",
                        text: "You won't be able to revert this!",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Cancel Order",
                      }).then((result) => {
                        if (result.isConfirmed) {
                          Swal.fire(
                            "Canceled",
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
