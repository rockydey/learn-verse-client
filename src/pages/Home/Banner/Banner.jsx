import bannerImg from "../../../assets/banner.png";
import bannerGirl from "../../../assets/banner-image.png";
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div className='mt-16'>
      <div
        style={{ backgroundImage: `url(${bannerImg})` }}
        className='lg:h-screen bg-cover bg-center bg-no-repeat'>
        <div className='max-w-screen-xl mx-auto flex flex-col gap-8 md:gap-0 md:flex-row items-center justify-between py-16 px-2 md:px-4 lg:px-0'>
          <div className='md:w-1/2 space-y-8'>
            <h1 className='text-4xl lg:text-5xl text-color3 font-bold font-merriweather'>
              Connecting <span className='text-color1'>Minds,</span>{" "}
              <span className='inline-block mt-3 lg:mt-4'>
                Inspiring <span className='text-color1'>Growth</span>
              </span>
            </h1>
            <p className='lg:w-4/5 text-base font-medium text-color6'>
              Elevate your knowledge through dynamic collaboration, shared
              insights, and collective growth. Join the movement toward academic
              excellence. Start now!
            </p>
            <Link
              to='study-sessions'
              className='flex border-2 w-fit px-4 py-3 rounded-lg hover:bg-transparent bg-color1 text-color4 border-color1 hover:text-color1 items-center gap-3 text-lg font-medium uppercase duration-500'>
              Explore Sessions <FaRegArrowAltCircleRight />
            </Link>
          </div>
          <div className='md:w-1/2'>
            <img className='lg:w-[95%]' src={bannerGirl} alt='' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
