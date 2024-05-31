import {
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarToggle,
} from "flowbite-react";
import { FaUserGraduate } from "react-icons/fa";
import { Link } from "react-router-dom";
import DarkModeToggle from "react-dark-mode-toggle";
import { useState } from "react";
import "./Header.css";

const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  console.log(isDarkMode);
  return (
    <div className='bg-color9 py-1 shadow-md fixed top-0 z-50 w-full transition-all duration-1000'>
      <div className='max-w-screen-xl mx-auto'>
        <Navbar fluid rounded>
          <NavbarBrand>
            <Link
              to='/'
              className='flex items-center gap-2 text-color1 text-[23px] md:text-[27px] md:mr-5 mr-2'>
              <FaUserGraduate className='' />
              <span className='font-bold text-3xl md:text-4xl'>
                Learn<span className='text-color2'>Verse</span>
              </span>
            </Link>
            <DarkModeToggle
              onChange={setIsDarkMode}
              checked={isDarkMode}
              size={60}
            />
          </NavbarBrand>
          <NavbarToggle />
          <NavbarCollapse>
            <div className='text-lg my-3 md:my-0 mx-auto md:mx-0 uppercase font-semibold space-x-5 text-white'>
              <Link
                className='w-fit bg-color1 px-3 py-2 rounded-md'
                to='/login'>
                Login
              </Link>
              <Link
                className='w-fit bg-color2 px-3 py-2 rounded-md'
                to='/register'>
                Register
              </Link>
            </div>
          </NavbarCollapse>
        </Navbar>
      </div>
    </div>
  );
};

export default Header;
