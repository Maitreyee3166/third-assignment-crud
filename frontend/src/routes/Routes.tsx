import { createBrowserRouter } from "react-router-dom";

import NotFound from "../pages/NotFound";
import Home from "../pages/Home";

import UserWrapper from "../layouts/userLayouts/UserWrapper";
import Stopwatch from "../pages/Stopwatch";

import Student from "../pages/Student";
import SavingsPlanner from "../pages/SavingsPlanner";


const Routes = createBrowserRouter([
  {
    path: "/",
    element: <UserWrapper />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "watch",
        element: <Stopwatch />,
      },
      {
        path: "expense-tracker",
        element: <SavingsPlanner />,
      },
      {
        path: "student",
        element: <Student />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default Routes;
