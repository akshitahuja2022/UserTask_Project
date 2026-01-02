import express from "express";
import { ProtectedRoute } from "../middleware/auth.middleware.js";
import {
  addTask,
  deleteTask,
  getTasks,
  updateTask,
} from "../controllers/task.controller.js";

const taskRouter = express.Router();

taskRouter.get("/getTasks", ProtectedRoute, getTasks);
taskRouter.post("/addTask", ProtectedRoute, addTask);
taskRouter.put("/updateTask/:id", ProtectedRoute, updateTask);
taskRouter.delete("/deleteTask/:id", ProtectedRoute, deleteTask);

export default taskRouter;
