import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <>
      <header className="header w-full bg-gray-900 text-white flex justify-between items-center z-50 p-0 m-0">
        <nav>
          <ul>
            <li  className="inline-block">
              <NavLink className="transition-all duration-300 ease-in-out text-white block py-4 px-2 hover:bg-gray-700" to="/">Home</NavLink>
            </li>
            <li  className="inline-block">
              <NavLink className="transition-all duration-300 ease-in-out text-white block py-4 px-2 hover:bg-gray-700 bg-red-700" to="/notifications">Notifications</NavLink>
            </li>
            <li  className="inline-block">
              <NavLink className="transition-all duration-300 ease-in-out text-white block py-4 px-2 hover:bg-gray-700 bg-red-700"  to="/progress">Progress</NavLink>
            </li>
            <li  className="inline-block">
              <NavLink className="transition-all duration-300 ease-in-out text-white block py-4 px-2 hover:bg-gray-700 bg-red-700" to="/content">Content</NavLink>
            </li>
            <li  className="inline-block">
              <NavLink className="transition-all duration-300 ease-in-out text-white block py-4 px-2 hover:bg-gray-700 bg-red-700" to="/plans">Plans</NavLink>
            </li>
            <li  className="inline-block">
              <NavLink className="transition-all duration-300 ease-in-out text-white block py-4 px-2 hover:bg-gray-700" to="/login">Login</NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Header;
