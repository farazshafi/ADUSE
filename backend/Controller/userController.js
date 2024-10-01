import { json } from "express";
import User from "../Model/userModel.js";
import generateToken from "../utils/generateToken.js";

// @desc    Register a new user
// @route   POST /api/users/register
// @access  public
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  const userExist = await User.findOne({ email });
  if (userExist) {
    return res.status(400).json({ message: "User already exists" });
  }
  const user = await User.create({
    name,
    email,
    password,
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({ message: "User registration failed" });
  }
};
export const login = async (req, res) => {
  const { password, email } = req.body;
  const userExists = await User.findOne({ email });

  // Check if the user exists
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
