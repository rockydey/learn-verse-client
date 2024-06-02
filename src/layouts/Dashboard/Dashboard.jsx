import { NavLink, Outlet, useNavigate } from "react-router-dom";
import useRole from "../../hooks/useRole";
import "./Dashboard.css";
import { FaUsers, FaFileUpload, FaRegFilePdf, FaHome } from "react-icons/fa";
import { SiSessionize, SiSession } from "react-icons/si";
import { ImBooks } from "react-icons/im";
import { TbBrandBooking } from "react-icons/tb";
import { FaNotesMedical, FaNoteSticky } from "react-icons/fa6";
import { GrView } from "react-icons/gr";
import { MdOutlinePreview } from "react-icons/md";
import { IoMdLogOut } from "react-icons/io";
import useAuth from "../../hooks/useAuth";
import toast, { Toaster } from "react-hot-toast";

const Dashboard = () => {
  const [userRole] = useRole();
  const { logOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logOut().then(() => {
      navigate("/login");
    });
    toast.success("Logged out successfully!");
  };

  return (
    <div>
      <div className='flex'>
        <div className='w-64 min-h-screen bg-color5'>
          <p className='text-lg uppercase text-color9'>
            {userRole?.role === "admin" ? (
              <span>Admin</span>
            ) : userRole?.role === "teacher" ? (
              <span>Teacher</span>
            ) : (
              <span>Student</span>
            )}
          </p>
          <ul className='text-lg text-color9 px-5 pt-16 font-semibold uppercase'>
            {userRole?.role === "admin" ? (
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
            ) : userRole?.role === "teacher" ? (
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
                to='/view-all-sessions'>
                <SiSession /> View All Sessions
              </NavLink>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className='text-lg flex items-center gap-3 text-color9 font-semibold uppercase'>
                <IoMdLogOut /> Logout
              </button>
            </li>
          </ul>
        </div>
        <div className='flex-1 p-16'>
          <Outlet />
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Dashboard;
