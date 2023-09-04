// This example shows you how to set up React Stripe.js and use Elements.
// Learn how to accept a payment using the official Stripe docs.
// https://stripe.com/docs/payments/accept-a-payment#web

import React, { useContext, useEffect, useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

import "./CheckoutForm.css";
import { AuthContext } from "../../providers/AuthProvider";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { updateRoomStatus } from "../../api/rooms";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { ScaleLoader } from "react-spinners";

const CheckoutForm = ({ closeModal, bookingInfo }) => {
  const [cardError, setCardError] = useState("");
  const [clientSecret, setClientSecret] = useState([]);
  const { user } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();
  const navigate = useNavigate();
  const [process, setProcess] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    // TODO: generate client secret and save state
    if (bookingInfo?.price) {
      axiosSecure
        .post("/create-payment-intent", { price: bookingInfo?.price })
        .then((res) => {
          console.log(res.data);
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [bookingInfo, axiosSecure]);

  const handleSubmit = async (event) => {
    setProcess(true);
    // Block native form submission.
    event.preventDefault();
    setCardError("");

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setProcess(false);
      console.log("[error]", error);
      setCardError(error.message);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
    }

    const { paymentIntent, error: paymentError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName || "unknown",
            email: user?.email || "anonymous",
          },
        },
      });

    if (paymentError) {
      setProcess(false);
      setCardError(paymentError.message);
    } else {
      console.log("[PaymentInetent]", paymentIntent);
      // TODO: payment info save in database
      const paymentInfo = {
        ...bookingInfo,
        transactionId: paymentIntent.id,
        date: new Date(),
      };
      if (paymentIntent.status === "succeeded") {
        setProcess(false);
        axiosSecure.post("/room-bookings", paymentInfo).then((res) => {
          if (res.data.insertedId) {
            toast.success(
              `Your payment has been successfully received! transaction id ${paymentIntent.id}`
            );
            updateRoomStatus(bookingInfo.roomId, true)
              .then((data) => {
                navigate("/dashboard/my-bookings");
              })
              .catch((err) => console.log(err));
            closeModal();
          }
        });
      }
    }
  };

  return (
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

      <div className="flex mt-2 justify-around">
        <button
          type="button"
          className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
          onClick={closeModal}
        >
          Cancel
        </button>
        <button
          disabled={!stripe}
          type="submit"
          className="inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
        >
          {process ? (
            <ScaleLoader width={3} height={12} />
          ) : (
            <>
              Pay
              {isNaN(bookingInfo.price)
                ? bookingInfo.originPrice
                : bookingInfo.price}
              $
            </>
          )}
        </button>
      </div>
      <small className="text-rose-500">{cardError}</small>
    </form>
  );
};

export default CheckoutForm;
