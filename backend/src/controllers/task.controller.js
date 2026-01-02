import TaskModel from "../models/Task.js";

const getTasks = async (req, res) => {
  try {
    const userId = req.user.id;

    const tasks = await TaskModel.find({ user: userId });

    res.status(200).json({
      message: "Tasks fetched successfully",
      success: true,
      tasks,
    });
  } catch (error) {
    console.log("Get Tasks Error:", error);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

const addTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    const user = req.user.id;

    if (!title || !description) {
      return res
        .status(400)
        .json({ message: "Task and Description are required", success: false });
    }

    const newTask = await TaskModel.create({
      title,
      description,
      user,
    });

    res.status(200).json({
      message: "Add the task successfully",
      success: true,
      task: newTask,
    });
  } catch (error) {
    console.log("Add Task Error:", error);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: error.message,
    });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;

    const { title, description } = req.body;

    const updatedTask = await TaskModel.findByIdAndUpdate(
      { _id: id },
      { title, description },
      { new: true, runValidators: true }
    );

    if (!updatedTask) {
      return res.status(404).json({
        message: "Task not found",
        success: false,
      });
    }
    res.status(200).json({
      message: "Update the task successfully",
      success: true,
      updatedTask,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: error.message,
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const deletedTask = await TaskModel.findOneAndDelete({
      _id: id,
      user: userId,
    });

    res.status(200).json({
      message: "Task deleted successfully",
      success: true,
    });
  } catch (error) {
    console.log("Error in DeleteTask Controller", error);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: error.message,
    });
  }
};

export { getTasks, addTask, updateTask, deleteTask };
