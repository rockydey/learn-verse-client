import { createBrowserRouter } from "react-router-dom";
import Main from "../../layouts/Main/Main";
import Home from "../../pages/Home/Home/Home";
import Login from "../../pages/Login/Login";
import Register from "../../pages/Register/Register";
import NotFound from "../../pages/NotFound/NotFound";
import Dashboard from "../../layouts/Dashboard/Dashboard";
import AllUsers from "../../pages/DashboardPages/AllUsers/AllUsers";
import BookedSession from "../../pages/DashboardPages/BookedSession/BookedSession";
import CreateNote from "../../pages/DashboardPages/CreateNote/CreateNote";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      // admin routes
      {
        path: "users",
        element: <AllUsers />,
      },

      // teacher routes

      // student routes
      {
        path: "booked-session",
        element: <BookedSession />,
      },
      {
        path: "create-note",
        element: <CreateNote />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

export default router;
