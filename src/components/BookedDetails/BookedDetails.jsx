import { useParams } from "react-router-dom";
import SectionTitle from "../SectionTitle/SectionTitle";
import { useQuery } from "@tanstack/react-query";
import useAxoisSecure from "../../hooks/useAxoisSecure";
import { GiTeacher } from "react-icons/gi";
import { TbTimeDuration45 } from "react-icons/tb";
import { MdCategory } from "react-icons/md";
import ReactStars from "react-rating-stars-component";
import { render } from "react-dom";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import toast, { Toaster } from "react-hot-toast";

const BookedDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [studentRating, setStudentRating] = useState(null);
  const axoisSecure = useAxoisSecure();
  const { data: bookedSession = [] } = useQuery({
    queryKey: ["booked-session"],
    queryFn: async () => {
      const res = await axoisSecure.get(`/booked-session/${id}`);
      return res.data;
    },
  });

  const {
    session_id,
    session_title,
    session_description,
    tutor_name,
    class_start,
    session_duration,
    booking_date,
    session_category,
  } = bookedSession;

  const ratingChanged = (newRating) => {
    setStudentRating(newRating);
  };

  const handleAddFeedback = (event) => {
    event.preventDefault();
    const feedback = event.target.feedback.value;

    const feedbackInfo = {
      session_id,
      rating: studentRating,
      feedback,
      user_email: user?.email,
    };

    axoisSecure.post("/feedbacks", feedbackInfo).then((res) => {
      if (res.data.insertedId) {
        toast.success("Thank you for feedback!");
        event.target.reset();
      }
    });
  };

  return (
    <div className='md:max-w-2xl lg:max-w-screen-sm mx-auto px-2 md:px-4 lg:px-0'>
      <SectionTitle heading='Booking Details' subHeading='' />
      <div className='mt-10'>
        <div className='bg-color9 text-color5 p-5 md:p-10 rounded-xl'>
          <h3 className='text-center  font-bold md:text-2xl'>
            {session_title}
          </h3>
          <p className='text-center mt-4 text-color6 text-lg font-medium'>
            {session_description}
          </p>
          <div className='mt-5 text-lg flex-wrap md:flex-nowrap flex justify-evenly'>
            <p className='flex items-center gap-3 font-normal'>
              <GiTeacher /> {tutor_name}
            </p>
            <p className='flex items-center gap-3 font-normal'>
              <TbTimeDuration45 /> {session_duration} hour
            </p>
            <p className='flex items-center gap-3 font-normal'>
              <MdCategory />{" "}
              <span className='text-color11'>#{session_category}</span>
            </p>
          </div>
          <div className='mt-5 text-lg font-normal flex flex-col md:flex-row gap-3 md:gap-0 justify-evenly items-center'>
            <p>
              <span className='font-medium'>Booking Date :</span> {booking_date}
            </p>
            <p>
              <span className='font-medium'>Class Start :</span> {class_start}
            </p>
          </div>
        </div>
      </div>
      <div className='mt-10 border-2 border-color6 p-10 rounded-xl'>
        <h2 className='text-center font-merriweather text-2xl font-bold'>
          Feedback Session
        </h2>
        <form onSubmit={handleAddFeedback} className='mt-5 space-y-2'>
          <div className='flex items-center gap-4'>
            <p className='text-lg font-semibold text-color5'>Rating :</p>
            <ReactStars
              count={5}
              onChange={ratingChanged}
              size={32}
              isHalf={true}
              emptyIcon={<i className='far fa-star'></i>}
              halfIcon={<i className='fa fa-star-half-alt'></i>}
              fullIcon={<i className='fa fa-star'></i>}
              activeColor='#ffd700'
            />
          </div>
          <div className=''>
            <label
              className='text-lg mb-2 inline-block font-semibold text-color5'
              htmlFor='feedback'>
              Feedback :
            </label>
            <textarea
              className='w-full border-0 text-color5 rounded bg-color9'
              rows={4}
              name='feedback'
              id='feedback'
              placeholder='Your feedback'></textarea>
          </div>
          <div>
            <input
              type='submit'
              value='Add Feedback'
              className='bg-color1 px-3 py-2 font-semibold rounded cursor-pointer text-color4'
            />
          </div>
        </form>
      </div>
      <Toaster />
    </div>
  );
};

export default BookedDetails;
