import { Link, NavLink, useNavigate } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { handleError, handleSuccess } from "../notify/notification";

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenu, setIsMenu] = useState(false);

  const { isLogin, setIsLogin, user } = useAuthContext();

  const handleLogout = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/logout`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(),
          credentials: "include",
        }
      );

      const { success, message, error } = await response.json();
      if (success) {
        handleSuccess(message);
        setIsLogin(false);
        navigate("/login");
      } else if (error) {
        const details = error?.details[0].message;
        handleError(details);
      } else if (!error) {
        handleError(message);
      }
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <>
      <div className="flex justify-between font-serif items-center text-black px-2 py-2">
        {/* Logo */}
        <Link to="/" className="font-bold text-xl lg:text-2xl">
          Task<span className="text-gray-700">Management</span>
        </Link>

        {/* Buttons */}
        <div className="hidden sm:flex gap-4 relative">
          {isLogin ? (
            <>
              <Link
                to="/profile"
                className="text-md lg:text-lg bg-gray-400 font-bold text-black px-3 rounded-md hover:bg-gray-500"
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="text-lg bg-gray-400 font-bold text-black px-3 rounded-md hover:bg-gray-500"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-lg bg-gray-400 font-bold text-black px-3 rounded-md hover:bg-gray-500"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="text-lg bg-gray-400 text-black font-bold px-3 rounded-md hover:bg-gray-500"
              >
                Signup
              </Link>
            </>
          )}
        </div>

        <div
          onClick={() => {
            setIsMenu(!isMenu);
          }}
          className="block sm:hidden text-2xl text-gray-700 font-bold cursor-pointer mt-1"
        >
          <IoMenu className="font-bold" />
        </div>
      </div>

      {isMenu && (
        <div className="sm:hidden absolute top-12 right-4 bg-stone-300 w-40 rounded-md flex flex-col items-center py-2 font-serif">
          {isLogin ? (
            <>
              {user?.role === "admin" ? (
                <>
                  <Link
                    to="/profile"
                    className="font-bold my-1"
                    onClick={() => setIsMenu(false)}
                  >
                    {user.role} profile
                  </Link>
                </>
              ) : (
                <>
                <Link
                    to="/profile"
                    className="font-bold my-1"
                    onClick={() => setIsMenu(false)}
                  >
                    {user.role} profile
                  </Link>
                </>
              )}
              <button
                className="font-bold my-1 text-red-600"
                onClick={() => {
                  handleLogout();
                  setIsMenu(false);
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="font-bold my-1"
                onClick={() => setIsMenu(false)}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="font-bold my-1"
                onClick={() => setIsMenu(false)}
              >
                Signup
              </Link>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Navbar;
