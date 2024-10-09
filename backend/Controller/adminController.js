import User from "../Model/userModel.js";
import generageTokens from "../utils/generateToken.js";

// @desc    get all users
// @route   GET /api/admin/users
// @access  private admin
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ isAdmin: false }).select("-password");
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
      res.status(200).json();
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
// @access  private admin 
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
      console.log("password matched");
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

// @desc    get user details
// @route   GET /api/admin/user/:id
// @access  private admin
export const getSingleUser = async (req, res) => {
  const {id} = req.params
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user) {
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


// @desc    create a new user
// @route   POST /api/admin/create_user
// @access  private admin
export const createUser = async (req, res) => {
  const { name, email, password, isAdmin } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = await User.create({
      name,
      email,
      password,
      isAdmin,
    });

    if (newUser) {
      res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        isAdmin: newUser.isAdmin,
        token: generageTokens(newUser._id), 
      });
      console.log("User created successfully.");
    }
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

