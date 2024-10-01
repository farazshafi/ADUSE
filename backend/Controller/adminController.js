import User from "../Model/userModel.js";

// @desc    get all users
// @route   GET /api/admin/users
// @access  private
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select("-password")
    if (users) {
      res.status(200).json(users);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
};
