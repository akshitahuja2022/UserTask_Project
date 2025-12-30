import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { handleError, handleSuccess } from "../notify/notification";

const Signup = () => {
  const navigate = useNavigate();
  const { formData, setFormData, setIsLogin, setUser } = useAuthContext();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        fullname: formData.fullname,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      };
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/signup`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
          credentials: "include",
        }
      );
      const { success, message, error, user } = await response.json();

      if (success) {
        handleSuccess(message);
        setIsLogin(true);
        setUser(user);
        setTimeout(() => {
          navigate("/login");
          setFormData({
            fullname: "",
            email: "",
            password: "",
            confirmPassword: "",
          });
        });
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
    <div className="w-full min-h-screen  from-blue-50 to-indigo-100 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-gray-300">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
            User<span className="text-gray-700 font-bold">Management</span>
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-2" autoComplete="off">
          <div className="space-y-2">
            <label className="block text-md font-bold text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              required
              placeholder="Enter your full name"
              className="w-full mb-5 px-4 py-2.5 border border-gray-300 rounded-lg  outline-none text-sm"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-md font-bold text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
              className="w-full mb-5 px-4 py-2.5 border border-gray-300 rounded-lg outline-none text-sm"
            />
          </div>

          <div className="space-y-2 mb-5">
            <label className="block text-md font-bold text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Create a password"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none text-sm"
              />
            </div>

            <div className="space-y-2 mb-5">
              <label className="block text-md font-bold text-gray-700">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  placeholder="Confirm your password"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none text-sm mb-3"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-5 px-4 py-2.5 rounded-lg text-white font-semibold bg-gray-700 cursor-pointer hover:bg-gray-500 text-sm sm:text-base"
          >
            Create Account
          </button>
        </form>

        <div className="text-center mt-5">
          <p className="text-gray-600 text-md">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-md text-gray-700 hover:text-gray-600 font-bold"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
