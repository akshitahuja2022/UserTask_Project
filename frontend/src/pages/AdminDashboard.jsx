import { useEffect, useState } from "react";
import { handleError, handleSuccess } from "../notify/notification";
import { useAuthContext } from "../context/AuthContext";

const USERS_PER_PAGE = 10;

const AdminDashboard = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [actionType, setActionType] = useState("");
  const [totalPages, setTotalPages] = useState(1);

  const { users, setUsers, page, setPage, setLoading } = useAuthContext();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/api/admin/users?page=${page}&limit=${USERS_PER_PAGE}`,
          { credentials: "include" }
        );
        const { success, message, users, pagination } = await res.json();

        if (success) {
          setUsers(users);
          setTotalPages(pagination.totalPage);
        } else {
          handleError(message);
        }
      } catch (error) {
        handleError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [setLoading, setUsers, page]);

  const currentUsers = users;

  const updateStatus = async (userId, status) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/users/${userId}/status`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status }),
          credentials: "include",
        }
      );

      const { success, message } = await res.json();
      if (success) {
        handleSuccess(message);
      } else {
        handleError(message);
      }
    } catch (error) {
      handleError(error);
    }
  };

  const handleConfirmAction = async () => {
    if (!selectedUser || !actionType) return;

    await updateStatus(selectedUser._id, actionType);

    setUsers((prev) =>
      prev.map((u) =>
        u._id === selectedUser._id ? { ...u, status: actionType } : u
      )
    );

    setShowDialog(false);
    setSelectedUser(null);
    setActionType("");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>

      <div className="hidden md:block overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-200 text-gray-700 uppercase">
            <tr>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Full Name</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {currentUsers.map((user) => (
              <tr key={user._id} className="border-b">
                <td className="px-4 py-3">{user.email}</td>
                <td className="px-4 py-3">{user.fullname}</td>
                <td className="px-4 py-3 capitalize">{user.role}</td>

                <td className="px-4 py-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      user.status === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>

                <td className="px-4 py-3 text-center">
                  {user.status === "active" ? (
                    <button
                      onClick={() => {
                        setSelectedUser(user);
                        setActionType("deactive");
                        setShowDialog(true);
                      }}
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-500"
                    >
                      Deactivate
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setSelectedUser(user);
                        setActionType("active");
                        setShowDialog(true);
                      }}
                      className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-500"
                    >
                      Activate
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-md p-6">
            <h2 className="text-xl font-bold text-center mb-4">
              Confirm Action
            </h2>

            <p className="text-center mb-6 text-gray-600">
              Are you sure you want to{" "}
              <span className="font-semibold">
                {actionType === "active" ? "activate" : "deactivate"}
              </span>{" "}
              this user?
            </p>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowDialog(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>

              <button
                onClick={handleConfirmAction}
                className={`px-4 py-2 rounded text-white ${
                  actionType === "active"
                    ? "bg-green-600 hover:bg-green-500"
                    : "bg-red-600 hover:bg-red-500"
                }`}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile */}
      <div className="md:hidden space-y-4">
        {currentUsers.map((user) => (
          <div key={user._id} className="bg-white p-4 rounded-lg shadow">
            <p className="text-sm">
              <strong>Email:</strong> {user.email}
            </p>
            <p className="text-sm">
              <strong>Name:</strong> {user.fullname}
            </p>
            <p className="text-sm capitalize">
              <strong>Role:</strong> {user.role}
            </p>
            <p className="text-sm">
              <strong>Status:</strong>{" "}
              <span
                className={`font-semibold ${
                  user.status === "active" ? "text-green-600" : "text-red-600"
                }`}
              >
                {user.status}
              </span>
            </p>

            <div className="mt-3 flex gap-2">
              {user.status === "active" ? (
                <button
                  onClick={() => {
                    setSelectedUser(user);
                    setActionType("deactive");
                    setShowDialog(true);
                  }}
                  className="flex-1 bg-red-600 text-white py-1 rounded"
                >
                  Deactivate
                </button>
              ) : (
                <button
                  onClick={() => {
                    setSelectedUser(user);
                    setActionType("active");
                    setShowDialog(true);
                  }}
                  className="flex-1 bg-green-600 text-white py-1 rounded"
                >
                  Activate
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-6 gap-2">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
        >
          Prev
        </button>

        <span className="px-4 py-1 bg-gray-200 rounded">
          {page} / {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
