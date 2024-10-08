import User from "../Model/userModel.js";
import generageTokens from "../utils/generateToken.js";

// @desc    get all users
// @route   GET /api/admin/users
// @access  private admin
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({isAdmin:false}).select("-password");
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
    const { name, email } = req.body;
    const user = await User.findById(req.params.id);
    if (user) {
      user.name = name || user.name;
      user.email = email || user.email;
      await user.save();
      res.status(200).json({ user });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// @desc    admin validation
// @route   POST /api/admin/login
// @access  private admin validation
export const loginValidation = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.isAdmin) {
      const isMatch = await user.matchPassword(password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid password" });
      }
      console.log("password matched")
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        imageUrl: user.imageUrl,
        token: generageTokens(user._id),
        isAdmin: user.isAdmin,
      });
    } else {
      return res.status(401).json({ message: "You are not admin" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
