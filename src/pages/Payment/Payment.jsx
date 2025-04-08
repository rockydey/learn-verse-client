import { Elements } from "@stripe/react-stripe-js";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import { loadStripe } from "@stripe/stripe-js";
import CheckOutForm from "./CheckOutForm";
import { useParams } from "react-router-dom";
import useAxoisSecure from "../../hooks/useAxoisSecure";
import { useQuery } from "@tanstack/react-query";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_PK);

const Payment = () => {
  const { id } = useParams();
  const axoisSecure = useAxoisSecure();
  const { data: session = [] } = useQuery({
    queryKey: [id, "session"],
    queryFn: async () => {
      const res = await axoisSecure.get(`/session/${id}`);
      return res.data;
    },
  });

  return (
    <div className='dark:bg-color3'>
      <div className='mt-16 max-w-screen-xl mx-auto py-24'>
        <SectionTitle
          heading='Payment Here'
          subHeading='Thank you for choosing the session.'
        />
        <div className='mt-10 max-w-md mx-auto'>
          <Elements stripe={stripePromise}>
            <CheckOutForm session={session} />
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default Payment;
