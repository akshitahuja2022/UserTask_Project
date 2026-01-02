import { useAuthContext } from "../context/AuthContext";
import { handleError, handleSuccess } from "../notify/notification";
import { useNavigate, useParams } from "react-router-dom";

const EditTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { taskForm, setTaskForm } = useAuthContext();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        title: taskForm.title,
        description: taskForm.description,
      };
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/updateTask/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
          credentials: "include",
        }
      );
      const { success, message, error } = await response.json();

      if (success) {
        handleSuccess(message);
        navigate("/");
      } else if (error) {
        const details = error?.details[0].message;
        handleError(details);
      } else if (!error) {
        handleError(message);
      }
      setTaskForm({
        title: "",
        description: "",
      });
    } catch (error) {
      handleError(error);
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center mx-auto px-4 py-6 min-h-screen">
      <div className="bg-white border border-gray-300 rounded-xl shadow-md p-6 sm:p-8">
        <h2 className="text-2xl text-center font-bold text-gray-800 mb-6">
          Edit Task
        </h2>
        <form
          onSubmit={handleSubmit}
          autoComplete="off"
          className="flex flex-col gap-5 "
        >
          <input
            name="title"
            value={taskForm.title}
            onChange={handleChange}
            className="w-full sm:w-80 rounded-lg border border-gray-300 px-4 py-2 placeholder-gray-500"
            placeholder="Enter the task here..."
          />
          <textarea
            name="description"
            value={taskForm.description}
            onChange={handleChange}
            className="w-full sm:w-80 h-40 sm:h-60 rounded-lg border border-gray-300 px-4 py-2 placeholder-gray-500 resize-none overflow-y-auto"
            placeholder="Enter the description here..."
          />

          <div className="flex fle-col sm:flex-row gap-4">
            <button
              type="button"
              onClick={handleCancel}
              className="w-full sm:w-40 mx-auto mt-4 bg-gray-400 text-black font-bold px-3 py-2 rounded-lg hover:bg-gray-500 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full sm:w-40 mx-auto mt-4 bg-gray-400 text-black font-bold px-3 py-2 rounded-lg hover:bg-gray-500 transition-colors"
            >
              Edit Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTask;
