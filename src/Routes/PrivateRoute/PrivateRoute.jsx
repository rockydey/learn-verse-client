import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import HashLoader from "react-spinners/HashLoader";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (user) {
    return children;
  }

  if (loading) {
    return (
      <div>
        <p className='flex justify-center h-[50vh] pt-52'>
          <HashLoader size={50} color='#2ECA7F' />
        </p>
      </div>
    );
  }

  return <Navigate to='/login' state={{ from: location }} replace></Navigate>;
};

export default PrivateRoute;