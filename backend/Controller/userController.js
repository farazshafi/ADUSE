import { json } from "express";
import User from "../Model/userModel.js";
import generateToken from "../utils/generateToken.js";

// @desc    Register a new user
// @route   POST /api/user/register
// @access  public
export const registerUser = async (req, res) => {
  const { name, email, password, isAdmin } = req.body;
  const userExist = await User.findOne({ email });
  if (userExist) {
    return res.status(400).json({ message: "User already exists" });
  }
  const user = await User.create({
    name,
    email,
    password,
    isAdmin
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
    console.log("registration success")
  } else {
    console.log("registration failed")
    res.status(400).json({ message: "User registration failed" });
  }
};

// @desc    user login validation
// @route   POST /api/user/login
// @access  public
export const login = async (req, res) => {
  const { password, email } = req.body;
  const userExists = await User.findOne({ email });
  if (!userExists) {
    return res.status(404).json({ message: "User not found" });
  }
  const isPasswordMatched = await userExists.matchPassword(password);
  if (isPasswordMatched) {
    return res.status(200).json({
      _id: userExists._id,
      name: userExists.name,
      email: userExists.email,
      token: generateToken(userExists._id),
    });
  } else {
    return res.status(400).json({ message: "Invalid email or password" });
  }
};

// @desc    user profile update
// @route   PUT /api/user/update
// @access  private
export const update = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      await user.save();
      const { name, email, createdAt, updatedAt, _id } = user;
      res.status(200).json({ message: "User updated successfully", user:{name,email,_id,createdAt,updatedAt} });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


// @desc    get user details
// @route   PUT /api/user/:id
// @access  private
export const getUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password")
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
