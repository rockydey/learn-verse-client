import { GiTeacher } from "react-icons/gi";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useBookedSession from "../../../hooks/useBookedSession";
import { TbTimeDuration45 } from "react-icons/tb";
import { MdCategory } from "react-icons/md";
import { Link } from "react-router-dom";

const StudyMaterials = () => {
  const bookedSessions = useBookedSession();

  return (
    <div>
      <SectionTitle heading='Collect Materials' subHeading='' />
      <div className='mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {bookedSessions.map((bookedSession) => (
          <div
            key={bookedSession._id}
            className='space-y-4 p-5 border-2 border-color9 shadow rounded-lg'>
            <h3 className='text-center text-xl font-bold text-color5'>
              {bookedSession.session_title}
            </h3>
            <div className='text-lg flex-wrap md:flex-nowrap flex justify-evenly'>
              <p className='flex items-center gap-3 font-normal'>
                <GiTeacher /> {bookedSession.tutor_name}
              </p>
              <p className='flex items-center gap-3 font-normal'>
                <TbTimeDuration45 /> {bookedSession.session_duration} hour
              </p>
              <p className='flex items-center gap-3 font-normal'>
                <MdCategory />{" "}
                <span className='text-color11'>
                  #{bookedSession.session_category}
                </span>
              </p>
            </div>
            <p className='text-center text-base font-medium text-color6'>
              {bookedSession.session_description}
            </p>
            <div className='text-center pt-2'>
              <Link
                to={`/dashboard/study-materials/${bookedSession.session_id}`}
                className='text-base font-medium bg-color1 px-3 py-2 text-color4'>
                Get Material
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudyMaterials;
