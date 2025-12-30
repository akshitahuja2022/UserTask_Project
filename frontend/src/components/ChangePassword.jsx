import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { handleError, handleSuccess } from "../notify/notification";

const ChangePassword = () => {
  const navigate = useNavigate();
  const { user, formData, setFormData, setUser } = useAuthContext();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      };
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/change-password`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
          credentials: "include",
        }
      );
      const { success, message, error, updatedUser } = await response.json();

      if (success) {
        handleSuccess(message);
        setUser(updatedUser);
        setTimeout(() => {
          navigate("/profile");
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

  const handleCancel = () => {
    navigate("/profile");
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center mx-auto px-4 py-6 min-h-screen">
      <div className="bg-white border border-gray-300 rounded-xl shadow-md p-6 sm:p-8">
        <h2 className="text-2xl text-center font-bold text-gray-800 mb-6">
          Change Your Password
        </h2>

        <form
          onSubmit={handleChangePassword}
          className="space-y-6"
          autoComplete="off"
        >
          <div className="grid grid-cols-1 gap-5">
            <div>
              <h2 className="block text-md font-semibold text-gray-700">
                Email
              </h2>
              <p className="mt-1 w-80 sm:w-96 rounded-lg outline-none border border-gray-300 px-4 py-2">
                {user.email}
              </p>
            </div>

            <div className="border-t pt-5">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">
                Change Password
              </h3>

              <div className="grid grid-cols-1 gap-4">
                <input
                  type="password"
                  name="currentPassword"
                  placeholder="Current Password"
                  value={formData.currentPassword}
                  onChange={handleChange}
                  className="rounded-lg border border-gray-300 px-4 py-2"
                  autoComplete="current-password"
                />

                <input
                  type="password"
                  name="newPassword"
                  placeholder="New Password"
                  value={formData.newPassword}
                  onChange={handleChange}
                  className="rounded-lg border border-gray-300 px-4 py-2"
                  autoComplete="new-password"
                />
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex text-center flex-col sm:flex-row justify-center gap-3">
            <button
              type="button"
              onClick={handleCancel}
              className="w-40 px-3 py-2 rounded-lg text-white bg-gray-700 hover:bg-gray-500"
            >
              Cancel
            </button>

            <button className="w-40 px-3 py-2 rounded-lg text-white bg-gray-700 hover:bg-gray-500">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
