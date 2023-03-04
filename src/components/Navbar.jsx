import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/images/logo.png";

export const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation()
  console.log(location.pathname)
  const user = localStorage.getItem("token");
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <div className="w-full flex px-36 py-4 justify-between items-center">
      <div className="flex items-center gap-2">
        <img className="w-8" src={logo} alt="" />
        <h1 className="text-2xl font-bold underline decoration-emerald-500">
          tripbright
        </h1>
      </div>
      <div className="flex gap-12 items-center">
        <Link to="/" className="flex flex-col items-center">
          <h1
            className={`font-semibold text-gray-${
              location.pathname === "/" ? "900" : "700"
            }`}
          >
            Home
          </h1>
          {location.pathname === "/" && (
            <div className="bg-emerald-500 w-4 h-1 rounded"></div>
          )}
        </Link>
        <Link to="/profile" className="flex flex-col items-center">
          <h1
            className={`font-semibold text-gray-${
              location.pathname === "/profile" ? "900" : "700"
            }`}
          >
            Profile
          </h1>
          {location.pathname === "/profile" && (
            <div className="bg-emerald-500 w-4 h-1 rounded"></div>
          )}
        </Link>
      </div>
      {user ? (
        <div className="flex gap-12 items-center">
          <button
            onClick={() => logout()}
            className="text-gray-100 px-8 py-4 bg-emerald-500 rounded-full"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="flex gap-12 items-center">
          <Link to="login">
            <button className="font-semibold text-gray-800">Login</button>
          </Link>
          <Link to="register">
            <button className="text-gray-100 px-8 py-4 bg-emerald-500 rounded-full">
              Register
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};
