import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <>
      <header>
        <nav>
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/notifications">Notifications</NavLink>
            </li>
            <li>
              <NavLink to="/progress">Progress</NavLink>
            </li>
            <li>
              <NavLink to="/content">Content</NavLink>
            </li>
            <li>
              <NavLink to="/plans">Plans</NavLink>
            </li>
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Header;
