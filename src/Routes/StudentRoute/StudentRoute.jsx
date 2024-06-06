import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";
import HashLoader from "react-spinners/HashLoader";

const StudentRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [userRole, roleLoading] = useRole();
  const location = useLocation();

  if (user && userRole === "student") {
    return children;
  }

  if (loading || roleLoading) {
    return (
      <div>
        <p className='flex justify-center h-[50vh] pt-52'>
          <HashLoader size={50} color='#2ECA7F' />
        </p>
      </div>
    );
  }

  return <Navigate to='/' state={{ from: location }}></Navigate>;
};

export default StudentRoute;
