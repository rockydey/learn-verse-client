import { Outlet } from "react-router-dom";
import Footer from "../../components/Shared/Footer/Footer";
import Header from "../../components/Shared/Header/Header";

const Main = () => {
  return (
    <div className='font-poppins'>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Main;
