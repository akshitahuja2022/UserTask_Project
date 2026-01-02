import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useAuthContext } from "../context/AuthContext";
import { useEffect } from "react";
import { handleError, handleSuccess } from "../notify/notification";
import { useNavigate } from "react-router-dom";

const TaskList = () => {
  const navigate = useNavigate();
  const { tasks, setTasks, setTaskForm } = useAuthContext();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/getTasks`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        setTasks(data.tasks);
      } catch (error) {
        handleError(error);
      }
    };

    fetchTasks();
  }, [setTasks]);

  const handleEdit = (task) => {
    setTaskForm({
      title: task.title,
      description: task.description,
    });

    navigate(`/edit-task/${task._id}`);
  };

  const handleDelete = async (id) => {
    try {
      const respone = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/deleteTask/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      const { success, message, error } = await respone.json();
      if (success) {
        handleSuccess(message);
        setTasks((prev) => prev.filter((task) => task._id !== id));
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
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">My Tasks</h2>

      {tasks.length === 0 ? (
        <div className="text-center mt-20">
          <p className="text-lg font-semibold text-gray-700">No tasks found</p>
          <p className="text-gray-500 mt-2">
            Start by adding a new task to stay organized 🚀
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {tasks.map((task) => (
            <div
              key={task._id}
              className="flex flex-col justify-between bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex justify-between mb-2 sm:mb-0">
                <h3 className="text-lg font-semibold">{task.title}</h3>
                <div className="flex gap-5">
                  <FaEdit
                    onClick={() => handleEdit(task)}
                    className="text-blue-500 hover:text-blue-700 cursor-pointer"
                  />
                  <FaTrash
                    onClick={() => handleDelete(task._id)}
                    className="text-red-500 hover:text-red-700 cursor-pointer"
                  />
                </div>
              </div>

              <p className="text-gray-600 mt-2">{task.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;
