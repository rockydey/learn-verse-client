import { useParams } from "react-router-dom";
import SectionTitle from "../SectionTitle/SectionTitle";
import { useQuery } from "@tanstack/react-query";
import useAxoisSecure from "../../hooks/useAxoisSecure";
import { GiTeacher } from "react-icons/gi";
import { TbTimeDuration45 } from "react-icons/tb";
import { MdCategory } from "react-icons/md";

const BookedDetails = () => {
  const { id } = useParams();
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

  return (
    <div>
      <SectionTitle heading='Booking Details' subHeading='' />
      <div className='mt-10 md:max-w-2xl lg:max-w-screen-sm mx-auto px-2 md:px-4 lg:px-0'>
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
              <span className='font-medium'>Class Start :</span> {class_start}
            </p>
            <p>
              <span className='font-medium'>Booking Date :</span> {booking_date}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookedDetails;
