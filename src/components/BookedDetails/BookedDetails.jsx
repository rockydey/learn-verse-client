import { useParams } from "react-router-dom";
import SectionTitle from "../SectionTitle/SectionTitle";
import { useQuery } from "@tanstack/react-query";
import useAxoisSecure from "../../hooks/useAxoisSecure";
import { GiTeacher } from "react-icons/gi";
import { TbTimeDuration45 } from "react-icons/tb";
import { MdCategory } from "react-icons/md";
import ReactStars from "react-rating-stars-component";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import toast, { Toaster } from "react-hot-toast";
import StarRatingComponent from "react-rating-stars-component";

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

  const { data: feedbacks = [], refetch } = useQuery({
    queryKey: [session_id, "feedbacks"],
    queryFn: async () => {
      const res = await axoisSecure.get(`/feedbacks/${session_id}`);
      return res.data;
    },
  });

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
      user_name: user?.displayName,
    };

    axoisSecure.post("/feedbacks", feedbackInfo).then((res) => {
      if (res.data.insertedId) {
        toast.success("Thank you for feedback!");
        event.target.reset();
        refetch();
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
      <div className='mt-10'>
        <h2 className='text-center text-color1 font-merriweather text-2xl font-bold'>
          Students Feedback
        </h2>
        <div className='border-b-2 w-32 border-color1 mx-auto'></div>
        <div className='mt-5'>
          {feedbacks.map((feedback) => (
            <div key={feedback._id} className='text-center mb-10'>
              <h3 className='text-xl font-semibold text-color5'>
                {feedback.user_name}
              </h3>
              <div className='flex justify-center'>
                <StarRatingComponent
                  activeColor='#FFC600'
                  starCount={5}
                  size={32}
                  value={feedback.rating}
                  edit={false}
                />
              </div>
              <p className='text-base text-color6 font-medium'>
                {feedback.feedback}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className='mt-10 border-2 border-color6 p-10 rounded-xl'>
        <h2 className='text-center font-merriweather text-2xl font-bold'>
          Add Feedback
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
              activeColor='#FFC600'
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
