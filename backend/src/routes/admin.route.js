import express from "express";
import {
  authorizeRoles,
  ProtectedRoute,
} from "../middleware/auth.middleware.js";
import {
  getAllUsers,
  updateUserStatus,
} from "../controllers/admin.controller.js";

const adminRouter = express.Router();

adminRouter.get("/users", ProtectedRoute, authorizeRoles("admin"), getAllUsers);
adminRouter.put(
  "/users/:id/status",
  ProtectedRoute,
  authorizeRoles("admin"),
  updateUserStatus
);

export default adminRouter;
