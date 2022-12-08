import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import apiClient from "../../apiClient";
import Loading from "../shared/Loading";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51L58kTBXO2d9Fh4QcZjDoAzDMSeIqJUx7V3WyeyBNaEqSMMfbnNnHncrXpNEFAOIui044MD5rrZYoSNQRmdyJyyz00Lht8Ce9n"
);

const Payment = () => {
  const { orderId } = useParams();
  const { data: order, isLoading } = useQuery("order", () =>
    apiClient.get(`https://allied-parts-server.vercel.app/order/${orderId}`)
  );
  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="parent my-24">
      <h1 className="text-center text-3xl text-primary">
        Just a single step to Complete your order
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <div className="shadow-lg rounded-lg p-4 lg:p-8 border">
          <h2 className="text-xl font-semibold">
            Please pay for {order.data.itemTitle}
          </h2>
          <h3 className="font-bold mt-3">Please pay: $ {order.data.total}</h3>
        </div>
        <div className="shadow-lg rounded-lg p-4 lg:p-8 border">
          <Elements stripe={stripePromise}>
            <CheckoutForm order={order?.data} />
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default Payment;
