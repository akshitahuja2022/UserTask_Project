import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const TaskList = () => {
  const tasks = [
    {
      id: 1,
      title: "Finish homework",
      description:
        "This task requires careful planning and organization. Start by breaking it down into smaller steps. Make sure to prioritize the most important parts first. Check your progress regularly to stay on track. Finally, review everything thoroughly before marking it complete.",
    },
    {
      id: 2,
      title: "Clean room",
      description:
        "This task requires careful planning and organization. Start by breaking it down into smaller steps. Make sure to prioritize the most important parts first. Check your progress regularly to stay on track. Finally, review everything thoroughly before marking it complete.",
    },
    {
      id: 3,
      title: "Read a book",
      description:
        "This task requires careful planning and organization. Start by breaking it down into smaller steps. Make sure to prioritize the most important parts first. Check your progress regularly to stay on track. Finally, review everything thoroughly before marking it complete.",
    },
  ];

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">My Tasks</h2>
      <div className="space-y-4">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="flex flex-col justify-between bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex justify-between mb-2 sm:mb-0">
              <h3 className="text-lg font-semibold">{task.title}</h3>
              <div className="flex gap-5">
                <FaEdit className="text-blue-500 hover:text-blue-700 cursor-pointer" />
                <FaTrash className="text-red-500 hover:text-red-700 cursor-pointer" />
              </div>
            </div>
            <div className="flex space-x-4 mt-2 sm:mt-0">
              <p className="text-gray-600">{task.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
