import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import useAxoisSecure from "../../hooks/useAxoisSecure";
import useAuth from "../../hooks/useAuth";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const CheckOutForm = ({ session }) => {
  const { user } = useAuth();
  const stripe = useStripe();
  const elements = useElements();
  const axoisSecure = useAxoisSecure();
  const [clientSecret, setCLientSecret] = useState("");
  const navigate = useNavigate();

  const { registration_fee } = session;

  const date1 = moment(new Date()).format("YYYY-MM-DD");

  useEffect(() => {
    axoisSecure
      .post("/create-payment-intent", {
        price: parseInt(registration_fee),
      })
      .then((res) => {
        setCLientSecret(res.data.clientSecret);
      });
  }, [axoisSecure, registration_fee]);

  const handleSubmit = async (event) => {
    event.preventDefault();

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
      toast.error(error.message);
    } else {
      console.log("payment method", paymentMethod);
    }

    const { error: paymentError, paymentIntent } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user.email,
            name: user.displayName,
          },
        },
      });
    if (paymentError) {
      toast.error(error.message);
    } else {
      if (paymentIntent.status === "succeeded") {
        const bookingInfo = {
          session_id: session._id,
          user_email: user?.email,
          session_description: session.session_description,
          session_title: session.session_title,
          tutor_name: session.tutor_name,
          tutor_email: session.tutor_email,
          class_start: session.class_start,
          class_end: session.class_end,
          session_duration: session.session_duration,
          session_category: session.session_category,
          booking_date: date1,
          transactionId: paymentIntent.id,
        };

        axoisSecure.post("/bookings", bookingInfo).then((res) => {
          if (res.data.insertedId) {
            navigate("/dashboard/booked-session");
            Swal.fire({
              position: "center",
              icon: "success",
              title: `${session.session_title} booked successfully!`,
              confirmButtonText: "Okay",
              confirmButtonColor: "#2ECA7F",
            });
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
              color: "#212121",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#c62828",
            },
          },
        }}
      />
      <div className='text-center'>
        <button
          type='submit'
          className='bg-color1 text-color4 font-semibold mt-5 w-fit px-3 py-2 rounded-lg disabled:bg-[#cccccc] disabled:cursor-not-allowed disabled:text-[#666666]'
          disabled={!stripe || !clientSecret}>
          Pay
        </button>
      </div>
      <Toaster />
    </form>
  );
};

export default CheckOutForm;
