import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <>
      <nav className="bg-slate-900 text-white px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-center">
          <div className="flex justify-center gap-12 p-3 text-xl">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "text-yellow-500" : "text-white"
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/expense-tracker"
              className={({ isActive }) =>
                isActive ? "text-yellow-500" : "text-white"
              }
            >
              Expense Tracker
            </NavLink>

            <NavLink
              to="/watch"
              className={({ isActive }) =>
                isActive ? "text-yellow-500" : "text-white"
              }
            >
              Stopwatch
            </NavLink>

            <NavLink
              to="/student"
              className={({ isActive }) =>
                isActive ? "text-yellow-500" : "text-white"
              }
            >
              Student
            </NavLink>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
