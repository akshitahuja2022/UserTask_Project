import { useAuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function UserAccount() {
  const { user } = useAuthContext();

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-6">
      <div className="bg-white rounded-xl shadow-md p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          User Account Details
        </h2>

        <form className="space-y-6" autoComplete="off">
          <div className="grid grid-cols-1 gap-5">
            <div>
              <h2 className="block text-md font-medium text-gray-700">
                Full Name
              </h2>
              <p className="mt-1 w-80 sm:w-96 rounded-lg outline-none border border-gray-300 px-4 py-2">
                {user.fullname}
              </p>
            </div>

            <div>
              <h2 className="block text-md font-medium text-gray-700">Email</h2>
              <p className="mt-1 w-80 sm:w-96 rounded-lg outline-none border border-gray-300 px-4 py-2">
                {user.email}
              </p>
            </div>

            <div>
              <h2 className="block text-md font-medium text-gray-700">Role</h2>
              <p className="mt-1 w-80 sm:w-96 rounded-lg border bg-gray-100 px-4 py-2 text-gray-600">
                {user.role}
              </p>
            </div>

            <div>
              <h2 className="block text-md font-medium text-gray-700">
                Status
              </h2>
              <div className="mt-1">
                <span
                  className={`inline-block px-5 py-2 rounded-full text-md font-medium ${
                    user.status === "active"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {user.status}
                </span>
              </div>
            </div>
          </div>

          <div className="flex text-center flex-col sm:flex-row justify-center gap-3">
            <Link
              to="/editProfile"
              className="w-40 px-3 py-2 rounded-lg text-white bg-gray-700 hover:bg-gray-500"
            >
              Edit Profile
            </Link>

            <Link
              to="/changePassword"
              className="w-40 px-3 py-2 rounded-lg text-white bg-gray-700 hover:bg-gray-500"
            >
              Change Password
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
