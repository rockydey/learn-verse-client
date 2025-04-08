import { Link } from "react-router-dom";
import notFoundImg from "../../assets/not-found.jpg";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";

const NotFound = () => {
  return (
    <div className='max-w-screen-md mx-auto py-24'>
      <img className='lg:w-[70%] mx-auto' src={notFoundImg} alt='' />
      <div className='flex justify-center'>
        <Link
          to='/'
          className='uppercase flex items-center w-fit gap-3 bg-color1 py-3 rounded-lg text-color4 px-4 text-lg font-semibold font-poppins'>
          <FaRegArrowAltCircleLeft />
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
