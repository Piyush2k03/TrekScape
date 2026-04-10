import User from "../models/User.js";

// ✅ Create new user
export const createUser = async (req, res) => {
  const newUser = new User(req.body);
  try {
    const savedUser = await newUser.save();

    res.status(200).json({
      success: true,
      message: "User created successfully",
      data: savedUser,
    });
  } catch (err) {
    console.error("Mongoose Save Error:", err.message);

    let errorMessage = "Failed to create user. Try again.";
    if (err.name === "ValidationError") {
      errorMessage = Object.values(err.errors)
        .map((val) => val.message)
        .join(", ");
    }

    res.status(500).json({
      success: false,
      message: errorMessage,
      errorDetail: err.message,
    });
  }
};

// ✅ Update user
export const updateUser = async (req, res) => {
  const id = req.params.id;
  try {
    const updatedUser = await User.findByIdAndUpdate(id, { $set: req.body }, { new: true });
    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to update user" });
  }
};

// ✅ Delete user
export const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    await User.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to delete user" });
  }
};

// ✅ Get single user
export const getSingleUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id);
    res.status(200).json({
      success: true,
      message: "User retrieved successfully",
      data: user,
    });
  } catch (err) {
    res.status(404).json({ success: false, message: "User not found" });
  }
};

// ✅ Get logged in user profile securely
export const getUserProfile = async (req, res) => {
  const id = req.user.id; // from JWT middleware
  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    
    // Don't send password
    const { password, ...rest } = user._doc;
    res.status(200).json({ success: true, message: "Profile retrieved", data: rest });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// ✅ Get all users (with optional pagination)
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({})

    res.status(200).json({
      success: true,
      count: users.length,
      message: "All users retrieved successfully",
      data: users,
    });
  } catch (err) {
    res.status(404).json({ success: false, message: "Failed to retrieve users" });
  }
};

// ✅ Get user count
export const getUserCount = async (req, res) => {
  try {
    const userCount = await User.estimatedDocumentCount();
    res.status(200).json({
      success: true,
      message: "User count retrieved successfully",
      data: userCount,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to retrieve user count" });
  }
};

