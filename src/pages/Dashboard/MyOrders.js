import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useQuery } from "react-query";
import apiClient from "../../apiClient";
import auth from "../../firebase-init";
import Loading from "../shared/Loading";

const MyOrders = () => {
  const [user] = useAuthState(auth);
  const { data: myOrders, isLoading } = useQuery("myOrders", () =>
    apiClient.get(
      `https://allied-parts-manufacturing.herokuapp.com/my-order?uid=${user?.uid}`
    )
  );

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
            </tr>
          </thead>
          <tbody>
            {myOrders?.data?.map((order, index) => (
              <tr key={order._id}>
                <th>{index + 1}</th>
                <td>{order.itemTitle}</td>
                <td>{order.quantity}</td>
                <td>{order.paid === true ? "Paid" : "Unpaid"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrders;