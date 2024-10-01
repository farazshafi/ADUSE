import User from "../Model/userModel.js";

// @desc    get all users
// @route   GET /api/admin/users
// @access  private admin
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select("-password");
    if (users) {
      res.status(200).json(users);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
};

// @desc    delete a user
// @route   DELETE /api/admin/delete/:id
// @access  private admin
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (user) {
      await user.deleteOne(); // Use deleteOne instead of remove
      res.status(200).json({ message: "User deleted successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


// @desc    update a user
// @route   PATCH /api/admin/edit/:id
// @access  private admin
export const editUser = async (req, res) => {
  try {
    const {name,email} = req.body
    const user = await User.findById(req.params.id);
    if (user) {
      user.name = name || user.name
      user.email = email || user.email
      await user.save()
      res.status(200).json({user});
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
