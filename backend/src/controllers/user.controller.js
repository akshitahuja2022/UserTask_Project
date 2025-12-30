import UserModel from "../models/user.js";
import bcrypt from "bcrypt";

const userProfile = async (req, res) => {
  try {
    const logged_user = req.user;

    res.status(200).json({
      message: "User Profile Fetched Successfully",
      success: true,
      logged_user,
    });
  } catch (error) {
    console.log("User Profile Fetched Error", error);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: error.message,
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { fullname, email } = req.body;
    const updates = {};
    if (fullname) updates.fullname = fullname;
    if (email) {
      const existedUserEmail = await UserModel.findOne({ email });
      if (
        existedUserEmail &&
        existedUserEmail._id.toString() !== req.user._id.toString()
      ) {
        return res.status(400).json({
          message: "User already exists with this email",
          success: false,
        });
      }
      updates.email = email;
    }

    const user = await UserModel.findByIdAndUpdate(req.user._id, updates, {
      new: true,
    });
    res
      .status(201)
      .json({ message: "Profile Update Successfully", success: true, user });
  } catch (error) {
    console.log("Update Profile Error ", error);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: error.message,
    });
  }
};

const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const user = await UserModel.findById(req.user._id).select("+password");

    const isPassword = await bcrypt.compare(currentPassword, user.password);
    if (!isPassword) {
     return res.status(403).json({
        message: "Invalid Password",
        success: false,
      });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    const updatedUser = await UserModel.findByIdAndUpdate(
      req.user._id,
      {
        password: hashedNewPassword,
      },
      { new: true }
    );
    res.status(201).json({
      message: "User Password Update Successfully",
      success: true,
      updatedUser,
    });
  } catch (error) {
    console.log("Change Password Error ", error);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

export { userProfile, updateProfile, changePassword };
