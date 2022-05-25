import React from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const PaymentModal = ({ orderDetails, setModal }) => {
  const navigate = useNavigate();
  const handlePayment = (paid) => {
    orderDetails.paid = paid;
    fetch(
      `https://allied-parts-manufacturing.herokuapp.com/order/${orderDetails._id}`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(orderDetails),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (paid === true) {
          toast.success("Successfully Paid");
        } else {
          toast.success("Added to Unpaid List");
        }
        navigate("/");
      });
  };

  return (
    <div>
      <input type="checkbox" id="payment-modal" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Are you sure? you want to place this order?
          </h3>
          <p className="py-4">
            You are on the way to payment. Click "Pay Now" for pay instantly.
            Click "Pay Later" for later Payment.
          </p>
          <div className="modal-action">
            <label
              onClick={() => handlePayment(true)}
              htmlFor="payment-modal"
              className="btn btn-secondary"
            >
              Pay Now
            </label>
            <button
              className="btn btn-outline btn-ghost"
              onClick={() => {
                setModal(false);
                handlePayment(false);
              }}
            >
              Pay Later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
