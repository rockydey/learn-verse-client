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
import AllSessions from "../../pages/DashboardPages/AllSessions/AllSessions";
import UploadMaterials from "../../pages/DashboardPages/UploadMaterials/UploadMaterials";
import ViewMaterials from "../../pages/DashboardPages/UploadMaterials/ViewMaterials";
import AllMaterials from "../../pages/DashboardPages/AllMaterials/AllMaterials";
import ViewNotes from "../../pages/DashboardPages/ViewNotes/ViewNotes";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import AdminRoute from "../AdminRoute/AdminRoute";
import TeacherRoute from "../TeacherRoute/TeacherRoute";
import StudentRoute from "../StudentRoute/StudentRoute";
import AllStudySessions from "../../pages/AllStudySessions/AllStudySessions";

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
      {
        path: "/study-sessions",
        element: <AllStudySessions />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      // admin routes
      {
        path: "users",
        element: (
          <AdminRoute>
            <AllUsers />
          </AdminRoute>
        ),
      },
      {
        path: "all-sessions",
        element: (
          <AdminRoute>
            <AllSessions />
          </AdminRoute>
        ),
      },
      {
        path: "all-materials",
        element: (
          <AdminRoute>
            <AllMaterials />
          </AdminRoute>
        ),
      },

      // teacher routes
      {
        path: "create-session",
        element: (
          <TeacherRoute>
            <CreateSession />
          </TeacherRoute>
        ),
      },
      {
        path: "view-sessions",
        element: (
          <TeacherRoute>
            <ViewSessions />
          </TeacherRoute>
        ),
      },
      {
        path: "upload-materials",
        element: (
          <TeacherRoute>
            <UploadMaterials />
          </TeacherRoute>
        ),
      },
      {
        path: "view-materials",
        element: (
          <TeacherRoute>
            <ViewMaterials />
          </TeacherRoute>
        ),
      },
      {
        path: "view-notes",
        element: (
          <TeacherRoute>
            <ViewNotes />
          </TeacherRoute>
        ),
      },

      // student routes
      {
        path: "booked-session",
        element: (
          <StudentRoute>
            <BookedSession />
          </StudentRoute>
        ),
      },
      {
        path: "create-note",
        element: (
          <StudentRoute>
            <CreateNote />
          </StudentRoute>
        ),
      },
      {
        path: "manage-notes",
        element: (
          <StudentRoute>
            <ManageNotes />
          </StudentRoute>
        ),
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
