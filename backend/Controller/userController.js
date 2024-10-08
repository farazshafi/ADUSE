import dotenv from "dotenv";
dotenv.config();

import { json } from "express";
import User from "../Model/userModel.js";
import generateToken from "../utils/generateToken.js";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import crypto from "crypto"


const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const accessKey = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;

const randomImageName = () => crypto.randomBytes(32).toString("hex")

// aws s3 configuration
const s3 = new S3Client({
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretAccessKey,
  },
  region: bucketRegion,
});


// controller----------------------------------------------------------------

// @desc    Register a new user
// @route   POST /api/user/register
// @access  public
export const registerUser = async (req, res) => {
  const { name, email, password, isAdmin } = req.body;
  const userExist = await User.findOne({ email });
  if (userExist) {
    return res.status(400).json({ message: "User already exists" });
  }
  let imageUrl = "";
  if (req.file) {
    const file = req.file;
    console.log("bucket Name : ",bucketName)
    const s3Params = {
      Bucket: bucketName,
      Key: randomImageName(), // Unique file name
      Body: file.buffer, // File buffer from multer
      ContentType: file.mimetype,
    };
    try {
      const command = new PutObjectCommand(s3Params)
      const data = await s3.send(command);
      imageUrl = `https://${bucketName}.s3.${bucketRegion}.amazonaws.com/${s3Params.Key}`;
    } catch (error) {
      console.error("Error uploading image to S3", error);
      return res.status(500).json({ message: "Image upload failed" });
    }
  }
  const user = await User.create({
    name,
    email,
    password,
    isAdmin,
    imageUrl:imageUrl || undefined
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      imageUrl: user.imageUrl,
      token: generateToken(user._id),
    });
    console.log("registration success");
  } else {
    console.log("registration failed");
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
      imageUrl: userExists.imageUrl,
      token: generateToken(userExists._id),
    });
  } else {
    return res.status(400).json({ message: "Invalid email or password" });
  }
};

// @desc    user profile update
// @route   PATCH /api/user/update
// @access  private
export const update = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      await user.save();
      const { name, email, createdAt, updatedAt, _id } = user;
      res.status(200).json({
        message: "User updated successfully",
        user: { name, email, _id, createdAt, updatedAt },
      });
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
    const user = await User.findById(req.params.id).select("-password");
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
