import { NavLink, Outlet } from "react-router-dom";
import useRole from "../../hooks/useRole";
import "./Dashboard.css";
import { FaUsers, FaFileUpload, FaRegFilePdf, FaHome } from "react-icons/fa";
import { SiSessionize, SiSession } from "react-icons/si";
import { ImBooks } from "react-icons/im";
import { TbBrandBooking } from "react-icons/tb";
import { FaNotesMedical, FaNoteSticky } from "react-icons/fa6";
import { GrView } from "react-icons/gr";
import { MdOutlinePreview } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { ImCross } from "react-icons/im";
import { Drawer } from "flowbite-react";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";

const Dashboard = () => {
  const [userRole] = useRole();
  const [isOpen, setIsOpen] = useState(true);
  const { user } = useAuth();

  return (
    <div>
      <div className=''>
        <div className='relative'>
          <button
            className='text-2xl p-3 bg-color5 text-color4 absolute top-5 right-5 rounded-md '
            onClick={() => setIsOpen(!isOpen)}>
            <GiHamburgerMenu />
          </button>
        </div>
        <div className='py-16 max-w-screen-xl mx-auto'>
          <Outlet />
        </div>
      </div>
      <Drawer
        className='bg-color5 '
        open={isOpen}
        onClose={() => setIsOpen(!isOpen)}>
        <div className='text-color5 flex text-lg items-center font-semibold font-merriweather justify-between pl-5 uppercase mb-3 mt-4'>
          <h3 className='text-color1'>{userRole} Dashboard</h3>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className='bg-color4 text-xs p-2 rounded-full'>
            <ImCross />
          </button>
        </div>
        <p className='pl-5 font-merriweather text-color4 font-semibold text-xl'>
          Welcome {user?.displayName}
        </p>
        <div className='my-8 border-b-2 border-color6'></div>
        <Drawer.Items>
          <ul className='text-lg text-color9 px-5 font-semibold uppercase'>
            {userRole === "admin" ? (
              <>
                <li>
                  <NavLink
                    className='flex gap-3 items-center mb-3'
                    to='/dashboard/users'>
                    <FaUsers /> All Users
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className='flex gap-3 items-center mb-3'
                    to='/dashboard/all-sessions'>
                    <SiSessionize /> All Study Sessions
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className='flex gap-3 items-center'
                    to='/dashboard/all-materials'>
                    <ImBooks /> All Materials
                  </NavLink>
                </li>
              </>
            ) : userRole === "teacher" ? (
              <>
                <li>
                  <NavLink
                    className='flex gap-3 items-center mb-3'
                    to='/dashboard/create-session'>
                    <FaUsers /> Create Session
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className='flex gap-3 items-center mb-3'
                    to='/dashboard/view-sessions'>
                    <GrView /> View Sessions
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className='flex gap-3 items-center mb-3'
                    to='/dashboard/upload-materials'>
                    <FaFileUpload /> Upload Materials
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className='flex gap-3 items-center mb-3'
                    to='/dashboard/view-materials'>
                    <MdOutlinePreview /> View Materials
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className='flex gap-3 items-center'
                    to='/dashboard/view-notes'>
                    <FaRegFilePdf /> View Notes
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink
                    className='flex gap-3 items-center mb-3'
                    to='/dashboard/booked-session'>
                    <TbBrandBooking /> Booked Session
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className='flex gap-3 items-center mb-3'
                    to='/dashboard/create-note'>
                    <FaNotesMedical /> Create Note
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className='flex gap-3 items-center mb-3'
                    to='/dashboard/manage-notes'>
                    <FaNoteSticky /> Manage Notes
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className='flex gap-3 items-center'
                    to='/dashboard/study-materials'>
                    <ImBooks /> Study Materials
                  </NavLink>
                </li>
              </>
            )}
            <div className='my-8 border-b-2 border-color6'></div>
            <li>
              <NavLink className='flex gap-3 items-center mb-3' to='/'>
                <FaHome /> Home
              </NavLink>
            </li>
            <li>
              <NavLink
                className='flex gap-3 items-center mb-3'
                to='/study-sessions'>
                <SiSession /> See All Sessions
              </NavLink>
            </li>
          </ul>
        </Drawer.Items>
      </Drawer>
    </div>
  );
};

export default Dashboard;
