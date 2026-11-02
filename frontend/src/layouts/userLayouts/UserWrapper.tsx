import Header from "./Header";
import { Outlet } from "react-router-dom";

const UserWrapper = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default UserWrapper;
