import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "task-users",
    required: true,
  },
});

const TaskModel = new mongoose.model("tasks", taskSchema);
export default TaskModel;
