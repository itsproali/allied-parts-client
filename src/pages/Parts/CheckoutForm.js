import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../../apiClient";
import { toast } from "react-hot-toast";

const CheckoutForm = ({ order }) => {
  const navigate = useNavigate();
  const [cardError, setCardError] = useState("");
  const [success, setSuccess] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [clientSecret, setClientSecret] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const { total, userName, userEmail, _id } = order;

  useEffect(() => {
    fetch("https://allied-parts-server.vercel.app/create-payment-intent", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify({ price: total }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.clientSecret) {
          setClientSecret(data.clientSecret);
        }
      });
  }, [total]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      setCardError(error.message);
      setSuccess("");
    } else {
      setCardError("");
    }

    // Confirm
    const { paymentIntent, intentError } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card,
          billing_details: {
            name: userName,
            email: userEmail,
          },
        },
      }
    );

    if (intentError) {
      setCardError(intentError.message);
      setSuccess("");
    } else {
      setCardError("");
      setSuccess("Your Payment is Completed");
      setTransactionId(paymentIntent.id);
      console.log(transactionId);
      apiClient.put(`https://allied-parts-server.vercel.app/payment/${_id}`, {
        transactionId: paymentIntent.id,
      });
      toast.success("Paid Successfully");
      navigate("/");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <div className="text-right mt-16">
          <button
            type="submit"
            disabled={!stripe || !clientSecret}
            className="btn bt-sm bg-gradient-to-r from-primary to-secondary hover:bg-gradient-to-l duration-500 uppercase text-white border-none"
          >
            Confirm Payment
          </button>
        </div>
      </form>
      {cardError && (
        <p className="text-red-500 font-semibold mt-3">{cardError}</p>
      )}
      {success && (
        <p className="text-green-500 font-semibold mt-3">{success}</p>
      )}
      {transactionId && (
        <p className=" font-semibold mt-3">
          Your Transaction ID:{" "}
          <span className="text-primary"> {transactionId}</span>
        </p>
      )}
    </>
  );
};

export default CheckoutForm;
