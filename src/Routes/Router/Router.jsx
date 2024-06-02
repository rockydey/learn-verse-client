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
import ManageNotes from "../../pages/DashboardPages/ManageNotes/ManageNotes";
import CreateSession from "../../pages/DashboardPages/CreateSession/CreateSession";
import ViewSessions from "../../pages/DashboardPages/ViewSessions/ViewSessions";

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
      {
        path: "create-session",
        element: <CreateSession />,
      },
      {
        path: "view-sessions",
        element: <ViewSessions />,
      },

      // student routes
      {
        path: "booked-session",
        element: <BookedSession />,
      },
      {
        path: "create-note",
        element: <CreateNote />,
      },
      {
        path: "manage-notes",
        element: <ManageNotes />,
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
