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
        <p className='flex dark:bg-color3 justify-center h-[50vh] pt-52'>
          <HashLoader size={50} color='#2ECA7F' />
        </p>
      </div>
    );
  }

  return <Navigate to='/login' state={{ from: location }}></Navigate>;
};

export default PrivateRoute;
