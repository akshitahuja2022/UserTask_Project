import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullname: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, select: false },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "inactive",
    },
    lastlogin: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);
const UserModel = new mongoose.model("users", userSchema);
export default UserModel;
