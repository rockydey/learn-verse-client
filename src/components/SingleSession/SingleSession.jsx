import { useQuery } from "@tanstack/react-query";
import useAxoisSecure from "../../hooks/useAxoisSecure";
import { useNavigate, useParams } from "react-router-dom";
import useRole from "../../hooks/useRole";
import { GiTeacher } from "react-icons/gi";
import { MdCategory } from "react-icons/md";
import { TbTimeDuration45 } from "react-icons/tb";
import { FaStar } from "react-icons/fa6";
import moment from "moment";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import StarRatingComponent from "react-rating-stars-component";

const SingleSession = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const [userRole] = useRole();
  const axoisSecure = useAxoisSecure();
  const { data: session = [] } = useQuery({
    queryKey: [id, "session"],
    queryFn: async () => {
      const res = await axoisSecure.get(`/session/${id}`);
      return res.data;
    },
  });

  const {
    _id,
    session_title,
    tutor_name,
    session_description,
    registration_start,
    registration_end,
    class_start,
    class_end,
    session_duration,
    session_category,
    registration_fee,
  } = session;

  const { data: feedbacks = [] } = useQuery({
    queryKey: [_id, "feedbacks"],
    queryFn: async () => {
      const res = await axoisSecure.get(`/feedbacks/${id}`);
      return res.data;
    },
  });

  const totalRating = feedbacks.reduce(
    (acc, rating) => acc + parseInt(rating.rating),
    0
  );
  const averageRate = totalRating / feedbacks.length;

  const date1 = moment(registration_end);
  const date2 = moment(new Date());
  const date3 = moment(new Date()).format("YYYY-MM-DD");

  const handleBookNow = () => {
    if (parseInt(registration_fee) === 0) {
      const bookingInfo = {
        session_id: _id,
        user_email: user?.email,
        session_description,
        session_title,
        tutor_name,
        tutor_email: session.tutor_email,
        class_start: class_start,
        class_end: class_end,
        session_duration,
        session_category,
        booking_date: date3,
      };

      axoisSecure.post("/bookings", bookingInfo).then((res) => {
        if (res.data.insertedId) {
          navigate("/dashboard/booked-session");
          Swal.fire({
            position: "center",
            icon: "success",
            title: `${session_title} booked successfully!`,
            confirmButtonText: "Okay",
            confirmButtonColor: "#2ECA7F",
          });
        }
      });
    } else {
      //
    }
  };

  return (
    <div className='mt-16 md:max-w-2xl lg:max-w-screen-sm mx-auto px-2 md:px-4 lg:px-0 py-20 md:py-24'>
      <div className='bg-color9 text-color5 p-5 md:p-10 rounded-xl'>
        <h3 className='text-center  font-bold md:text-2xl'>{session_title}</h3>
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
        <div className='mt-5 text-lg font-normal flex flex-col md:flex-row gap-3 md:gap-0 justify-between items-center'>
          <p>
            <span className='font-medium'>Registration Start:</span>{" "}
            {registration_start}
          </p>
          <p>
            <span className='font-medium'>Registration End:</span>{" "}
            {registration_end}
          </p>
        </div>
        <div className='mt-5 text-lg font-normal flex flex-col md:flex-row gap-3 md:gap-0 justify-evenly items-center'>
          <p>
            <span className='font-medium'>Class Start :</span> {class_start}
          </p>
          <p>
            <span className='font-medium'>Class End :</span> {class_end}
          </p>
        </div>
        <div className='mt-5 text-lg font-normal flex justify-center flex-col md:flex-row gap-3 md:gap-6 items-center'>
          <div className='flex items-center gap-1'>
            <p className='font-medium'>Average Rating :</p>{" "}
            <p className='flex items-center gap-1 text-color2'>
              <span>{averageRate}</span>
              <FaStar />
            </p>
          </div>
          <p>
            <span className='font-medium'>Registration Fee :</span> $
            {parseInt(registration_fee)}
          </p>
        </div>
        <div className='text-center mt-5'>
          {date2.diff(date1, "days") > 0 ? (
            <button
              disabled
              className='px-4 py-3 disabled:bg-[#cccccc] disabled:text-[#666666] w-fit disabled:cursor-not-allowed font-semibold'>
              Registration Closed
            </button>
          ) : (
            <button
              onClick={handleBookNow}
              disabled={userRole === "admin" || userRole === "teacher"}
              className='px-4 py-3 disabled:bg-[#cccccc] disabled:text-[#666666] w-fit disabled:cursor-not-allowed bg-color1 text-color4 font-semibold'>
              Book Now
            </button>
          )}
        </div>
      </div>
      <div className='mt-10 border-2 border-color2 p-10 rounded-xl'>
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
    </div>
  );
};

export default SingleSession;
