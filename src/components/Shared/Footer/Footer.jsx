import { Link } from "react-router-dom";
import footerBg from "../../../assets/footer.jpg";
import {
  FaUserGraduate,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa";
import { IoLocation, IoMail, IoCall } from "react-icons/io5";
import { FaRegCircleDot } from "react-icons/fa6";
import googlePlay from "../../../assets/getOnGoogle.png";
import appleStore from "../../../assets/getOnApple.png";

const Footer = () => {
  return (
    <div
      style={{ backgroundImage: `url(${footerBg})` }}
      className='bg-cover bg-center bg-fixed bg-no-repeat pt-20 pb-5 bg-color3 bg-blend-overlay'>
      <div className='max-w-screen-xl mx-auto grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-8 lg:gap-6 px-2 md:px-4 lg:px-0'>
        <div className=''>
          <Link className='flex items-center gap-2 text-color1 text-[23px] mr-2'>
            <FaUserGraduate className='' />
            <span className='font-bold text-3xl'>
              Learn<span className='text-color2'>Verse</span>
            </span>
          </Link>
          <p className='text-color8 text-base mt-6 font-medium'>
            Connect with peers, share insights, and conquer challenges together.
            Unleash your potential in a dynamic learning community.
          </p>
          <div className='mt-4 flex gap-5 text-2xl text-color4'>
            <FaFacebook className='hover:text-[#3B5998] duration-500 cursor-pointer' />
            <FaTwitter className='hover:text-[#00ACEE] duration-500 cursor-pointer' />
            <FaLinkedin className='hover:text-[#0E76A8] duration-500 cursor-pointer' />
            <FaYoutube className='hover:text-[#FF0000] duration-500 cursor-pointer' />
          </div>
        </div>
        <div className='space-y-6'>
          <div className=''>
            <h3 className='text-color2 text-2xl font-bold'>Contact Us</h3>
            <div className='border-2 w-20 border-color2'></div>
          </div>
          <div className='space-y-4'>
            <div className='flex items-center text-base gap-3 text-color7'>
              <IoLocation className='text-color2 text-xl' />
              <span>Maple Street, Springfield, USA</span>
            </div>
            <div className='flex items-center text-base gap-3 text-color7'>
              <IoMail className='text-color2 text-xl' />
              <span>info@learnVerse.com</span>
            </div>
            <div className='flex items-center text-base gap-3 text-color7'>
              <IoCall className='text-color2 text-xl' />
              <span>+0123456789</span>
            </div>
          </div>
        </div>
        <div className='space-y-6'>
          <div className=''>
            <h3 className='text-color2 text-2xl font-bold'>Feature Links</h3>
            <div className='border-2 w-20 border-color2'></div>
          </div>
          <div className='space-y-4'>
            <div className='flex items-center text-base gap-3 text-color7 cursor-pointer'>
              <FaRegCircleDot className='text-color2 text-xl' />
              <span className='hover:underline duration-500'>About Us</span>
            </div>
            <div className='flex items-center text-base gap-3 text-color7 cursor-pointer'>
              <FaRegCircleDot className='text-color2 text-xl' />
              <span className='hover:underline duration-500'>Support Team</span>
            </div>
            <div className='flex items-center text-base gap-3 text-color7 cursor-pointer'>
              <FaRegCircleDot className='text-color2 text-xl' />
              <span className='hover:underline duration-500'>
                Terms & Conditions
              </span>
            </div>
            <div className='flex items-center text-base gap-3 text-color7 cursor-pointer'>
              <FaRegCircleDot className='text-color2 text-xl' />
              <span className='hover:underline duration-500'>
                Privacy Policy
              </span>
            </div>
          </div>
        </div>
        <div className='space-y-6'>
          <div className=''>
            <h3 className='text-color2 text-2xl font-bold'>Download Our App</h3>
            <div className='border-2 w-20 border-color2'></div>
          </div>
          <div className='w-2/3 space-y-4'>
            <img className='cursor-pointer' src={googlePlay} alt='' />
            <img className='cursor-pointer' src={appleStore} alt='' />
          </div>
        </div>
      </div>
      <div className='border-t mt-10 border-color6'>
        <p className='text-color8 text-center pt-5 text-base font-medium'>
          Copyright &copy; 2024{" "}
          <span className='text-color2 cursor-pointer'>LearnVerse</span>. All
          right reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
