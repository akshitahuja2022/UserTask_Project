import { useAuthContext } from "../context/AuthContext";
import { handleError, handleSuccess } from "../notify/notification";

const AddTask = () => {
  const { taskForm, setTaskForm, setTasks } = useAuthContext();

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
        `${import.meta.env.VITE_BACKEND_URL}/api/addTask`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
          credentials: "include",
        }
      );
      const { success, message, error, task } = await response.json(payload);

      if (success) {
        handleSuccess(message);
        setTasks((prev) => [...prev, task]);
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

  return (
    <div className="w-full sm:w-96 h-[500px] shadow-lg rounded-lg p-4 sm:p-6 md:py-10 lg:mt-10 mx-auto border border-gray-500">
      <h2 className="text-2xl font-bold mb-4 text-center sm:text-center">
        Add New Task
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
        <button
          type="submit"
          className="w-full sm:w-48 mx-auto mt-4 bg-gray-400 text-black font-bold px-3 py-2 rounded-lg hover:bg-gray-500 transition-colors"
        >
          Add Task
        </button>
      </form>
    </div>
  );
};

export default AddTask;
