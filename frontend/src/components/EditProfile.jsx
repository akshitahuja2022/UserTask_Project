import React, { useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";
import { handleError, handleSuccess } from "../notify/notification";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const navigate = useNavigate();
  const { user, formData, setFormData, setUser } = useAuthContext();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (user) {
      setFormData({
        fullname: user.fullname,
        email: user.email,
      });
    }
  }, [user, setFormData]);

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        fullname: formData.fullname,
        email: formData.email,
      };
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/updateProfile`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
          credentials: "include",
        }
      );
      const { success, message, error, user } = await response.json();

      if (success) {
        handleSuccess(message);
        setUser(user);
        setTimeout(() => {
          navigate("/profile");
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

  const handleCancel = () => {
    navigate("/profile");
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center mx-auto px-4 py-6 min-h-screen">
      <div className="bg-white border border-gray-300 rounded-xl shadow-md p-6 sm:p-8">
        <h2 className="text-2xl text-center font-bold text-gray-800 mb-6">
          Edit Your Profile
        </h2>

        <form onSubmit={handleEdit} className="space-y-6" autoComplete="off">
          <div className="grid grid-cols-1 gap-5">
            <div>
              <label className="block text-md font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                name="fullname"
                value={formData.fullname}
                onChange={handleChange}
                className="mt-1 w-80 rounded-lg border px-4 py-2"
              />
            </div>

            <div>
              <label className="block text-md font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 w-80 rounded-lg border px-4 py-2"
              />
            </div>
          </div>

          <div className="flex text-center flex-col sm:flex-row justify-center gap-3">
            <button
              type="button"
              onClick={handleCancel}
              className="w-40 px-3 py-2 rounded-lg text-white bg-gray-700 hover:bg-gray-500"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="w-40 px-3 py-2 rounded-lg text-white bg-gray-700 hover:bg-gray-500"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
