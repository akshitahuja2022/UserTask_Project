import React from "react";

const AddTask = () => {
  return (
    <div className="w-full sm:w-96 max-h-100 shadow-lg rounded-lg p-4 sm:p-6 md:py-10 mx-auto border border-gray-500">
      <h2 className="text-2xl font-bold mb-4 text-center sm:text-center">
        Add New Task
      </h2>

      <form autoComplete="off" className="flex flex-col gap-3 ">
        <input
          className="w-full sm:w-80 rounded-lg border border-gray-300 px-4 py-2 placeholder-gray-500"
          placeholder="Enter the task here..."
        />
        <textarea
          className="w-full sm:w-80 h-40 sm:h-60 rounded-lg border border-gray-300 px-4 py-2 placeholder-gray-500"
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
