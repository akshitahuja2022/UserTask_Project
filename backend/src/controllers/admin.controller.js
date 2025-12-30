import UserModel from "../models/user.js";

const getAllUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const users = await UserModel.find({ _id: { $ne: req.user._id } })
      .select("-password")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    // find total users in db
    const totalUsers = await UserModel.countDocuments({
      _id: { $ne: req.user._id },
    });
    res.status(200).json({
      message: "User Fetched Successfully",
      success: true,
      users,
      pagination: {
        totalUsers,
        currentPage: page,
        totalPage: Math.ceil(totalUsers / limit),
        limit,
      },
    });
  } catch (error) {
    console.log("Get All Users Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const updateUserStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["active", "deactive"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status value",
      });
    }

    if (req.user._id.toString() === id) {
      return res.status(403).json({
        success: false,
        message: "Admin cannot change their own status",
      });
    }

    const user = await UserModel.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message:
        status === "active"
          ? "User activated successfully"
          : "User deactivated successfully",
      user,
    });
  } catch (error) {
    console.log("Update User Status Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export { getAllUsers, updateUserStatus };
