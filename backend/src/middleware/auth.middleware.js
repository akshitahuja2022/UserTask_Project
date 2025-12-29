import Joi from "joi";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import UserModel from "../models/user.js";
dotenv.config();
const signupValidation = async (req, res, next) => {
  try {
    const schema = Joi.object({
      fullname: Joi.string().min(3).max(100).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
      confirmPassword: Joi.string()
        .required()
        .valid(Joi.ref("password"))
        .messages({
          "any.only": "Password do not match",
          "string.empty": "Confirm password is required",
        }),
      role: Joi.string().valid("admin", "user").optional(),
      status: Joi.string().valid("active", "inactive").optional(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    next();
  } catch (error) {
    console.log("signup validation error ", error);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

const loginValidation = async (req, res, next) => {
  try {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
      return res
        .status(400)
        .json({ message: error.details[0].message, success: false });
    }
    next();
  } catch (error) {
    console.log("login validation error ", error);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

const ProtectedRoute = async (req, res, next) => {
  try {
    const token = req.cookies.userToken;

    if (!token) {
      return res
        .status(401)
        .json({ message: "User Authentication required", success: false });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res
        .status(401)
        .json({ message: "Unauthorized - invalid token", success: false });
    }
    const user = await UserModel.findById(decoded._id);
    if (!user) {
      return res.status(404).json({
        message: "Invalid Credentials - User Not Found",
        success: false,
      });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(404).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};
export { signupValidation, loginValidation, ProtectedRoute };
