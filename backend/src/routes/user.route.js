import express from "express";
import { ProtectedRoute } from "../middleware/auth.middleware.js";
import {
  changePassword,
  updateProfile,
  userProfile,
} from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.get("/profile", ProtectedRoute, userProfile);
userRouter.put("/updateProfile", ProtectedRoute, updateProfile);
userRouter.put("/change-password", ProtectedRoute, changePassword);

export default userRouter;
