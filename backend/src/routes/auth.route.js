import express from "express";
import {
  loginValidation,
  ProtectedRoute,
  signupValidation,
} from "../middleware/auth.middleware.js";
import {
  isAuthenticate,
  login,
  logout,
  signup,
} from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/signup", signupValidation, signup);
authRouter.post("/login", loginValidation, login);
authRouter.post("/logout", logout);

// check user is authenticate or not
authRouter.get("/authenticate", ProtectedRoute, isAuthenticate);

export default authRouter;
