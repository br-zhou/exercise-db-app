import { useNavigate } from "react-router-dom";
import NavBtn from "../NavBtn/NavBtn";

const Header = () => {
  const navigate = useNavigate();

  const logoutHandler = () => {
    console.log("logout");
    localStorage.setItem("token", "");
    navigate("/login");
  }

  return (
    <>
      <header className="header w-full bg-gray-900 text-white flex justify-between items-center z-50 p-0 m-0">
        <nav>
          <ul>
            <li className="inline-block">
              <NavBtn to="/" text="Home" />
            </li>
            <li className="inline-block">
              <NavBtn to="/notifications" text="Notifications" />
            </li>
            <li className="inline-block">
              <NavBtn to="/progress" text="Progress" />
            </li>
            <li className="inline-block">
              <NavBtn to="/content" text="Content" />
            </li>
            <li className="inline-block">
              <NavBtn to="/plans" text="Plans" />
            </li>
            <li className="inline-block">
              <NavBtn to="/login" text="Login" />
            </li>
            <li className="inline-block">
              <NavBtn to="/trainer-dashboard" text="Trainer Dashboard" />
            </li>
          </ul>
        </nav>
        <button
          onClick={logoutHandler}
          class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 text-sm right-0"
        >
          Logout
        </button>
      </header>
    </>
  );
};

export default Header;
