import dotenv from "dotenv";
dotenv.config();

import { json } from "express";
import User from "../Model/userModel.js";
import generateToken from "../utils/generateToken.js";
import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import crypto from "crypto";

const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const accessKey = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;

const randomImageName = () => crypto.randomBytes(32).toString("hex");

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

  const nameRegex = /^[a-zA-Z\s]{5,}$/; // Allows letters and spaces, minimum 5 characters
  if (!nameRegex.test(name)) {
    return res.status(400).json({ message: "Name must be at least 5 characters long and contain no special characters." });
  }

  const passwordRegex = /^[^\s]{7,}$/; // Minimum 7 characters with no whitespace
  if (!passwordRegex.test(password)) {
    return res.status(400).json({ message: "Password must be at least 7 characters long and cannot contain whitespace." });
  }

  const userExist = await User.findOne({ email });
  if (userExist) {
    return res.status(400).json({ message: "User already exists" });
  }

  let imageUrl = "";
  if (req.file) {
    const file = req.file;
    console.log("bucket Name : ", bucketName);
    const s3Params = {
      Bucket: bucketName,
      Key: randomImageName(), // Unique file name
      Body: file.buffer, // File buffer from multer
      ContentType: file.mimetype,
    };
    try {
      const command = new PutObjectCommand(s3Params);
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
    imageUrl: imageUrl || undefined,
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
  } else {
    if (userExists.isAdmin) {
      return res
        .status(400)
        .json({ message: "admin have admin page go there" });
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
  }
};

// @desc    Update user profile (name, email, profile image)
// @route   PATCH /api/user/update
// @access  Private
export const update = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const nameRegex = /^[a-zA-Z\s]{5,}$/; // Allows letters and spaces, minimum 5 characters
    if (req.body.name && !nameRegex.test(req.body.name)) {
      return res.status(400).json({ message: "Name must be at least 5 characters long and contain no special characters." });
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // Basic email regex
    if (req.body.email && !emailRegex.test(req.body.email)) {
      return res.status(400).json({ message: "Invalid email format." });
    }

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    let imageUrl = user.imageUrl; // Keep current image URL if not updating
    if (req.file) {
      const file = req.file;
      const s3Params = {
        Bucket: bucketName,
        Key: randomImageName(), // Unique file name
        Body: file.buffer,
        ContentType: file.mimetype,
      };

      try {
        const command = new PutObjectCommand(s3Params);
        await s3.send(command);
        imageUrl = `https://${bucketName}.s3.${bucketRegion}.amazonaws.com/${s3Params.Key}`;
      } catch (error) {
        console.error("Error uploading image to S3", error);
        return res.status(500).json({ message: "Image upload failed" });
      }
    }

    user.imageUrl = imageUrl;
    await user.save();

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      imageUrl: user.imageUrl,
      message: "Profile updated successfully",
    });
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

// @desc    get user details
// @route   GET /api/user/profile_image/:id
// @access  private
export const getUserProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user || !user.imageUrl) {
      return res.status(404).json({ message: "User or image not found" });
    }
    const params = {
      Bucket: bucketName,
      Key: user.imageUrl.split("/").pop(),
      Expires: 60,
    };

    const command = new GetObjectCommand(params);
    const signedUrl = await getSignedUrl(s3, command);
    res.status(200).json({ imageUrl: signedUrl });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
