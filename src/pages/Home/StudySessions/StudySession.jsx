import moment from "moment";
import { Link } from "react-router-dom";
import { IoIosArrowDropright } from "react-icons/io";

const StudySession = ({ studySession }) => {
  const {
    _id,
    session_title,
    session_description,
    registration_end,
    session_category,
  } = studySession;
  const date1 = moment(registration_end);
  const date2 = moment(new Date());

  return (
    <div className='flex flex-col gap-4 p-5 border-2 border-color9 shadow rounded'>
      <div className='flex-none'>
        <div className='mb-2 flex justify-between items-center'>
          <p className='text-sm text-color11 font-medium'>
            #{session_category}
          </p>
          {date2.diff(date1, "days") > 0 ? (
            <button className='text-base text-color10 font-semibold'>
              Closed
            </button>
          ) : (
            <button className='text-base text-color1 font-semibold'>
              Ongoing
            </button>
          )}
        </div>
        <h2 className='text-xl text-color5 font-bold'>{session_title}</h2>
      </div>
      <p className='flex-grow text-base font-medium text-color6'>
        {session_description}
      </p>
      <div className='flex-none'>
        <Link
          to={`/session/${_id}`}
          className='flex items-center text-color-4 bg-color1 w-fit px-3 py-2 text-color4 gap-1 text-lg '>
          Read More <IoIosArrowDropright />
        </Link>
      </div>
    </div>
  );
};

export default StudySession;
