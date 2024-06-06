import { useQuery } from "@tanstack/react-query";
import useAxoisSecure from "../../hooks/useAxoisSecure";
import { useParams } from "react-router-dom";
import useRole from "../../hooks/useRole";
import { GiTeacher } from "react-icons/gi";
import { MdCategory } from "react-icons/md";
import { TbTimeDuration45 } from "react-icons/tb";
import { FaStar } from "react-icons/fa6";
import moment from "moment";

const SingleSession = () => {
  const { id } = useParams();
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

  const date1 = moment(registration_end);
  const date2 = moment(new Date());

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
              3<FaStar />
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
              disabled={userRole === "admin" || userRole === "teacher"}
              className='px-4 py-3 disabled:bg-[#cccccc] disabled:text-[#666666] w-fit disabled:cursor-not-allowed bg-color1 text-color4 font-semibold'>
              Book Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleSession;