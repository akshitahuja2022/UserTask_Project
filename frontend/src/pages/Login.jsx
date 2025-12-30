import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { handleError, handleSuccess } from "../notify/notification";

const Login = () => {
  const navigate = useNavigate();
  const { formData, setFormData, setUser, setIsLogin } = useAuthContext();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        email: formData.email,
        password: formData.password,
      };
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`,
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
          navigate("/");
        });
        setFormData("");
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
    <div className="w-full min-h-screen flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 sm:p-8  border border-gray-300">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
            User<span className="text-gray-700 font-bold">Management</span>
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5" autoComplete="off">
          <div className="space-y-2 mb-5">
            <label className="block text-md font-bold text-gray-700">
              Email
            </label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none text-sm"
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
                placeholder="Enter your password"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg  outline-none text-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2.5 rounded-lg bg-gray-700 hover:bg-gray-500 text-white font-semibold text-sm sm:text-base"
          >
            Login
          </button>
        </form>

        <div className="text-center mt-5">
          <p className="text-gray-700 text-md">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-bold text-gray-700 hover:text-gray-600"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
