import User from "../Model/userModel.js";


// @desc    Get user profile
// @route   POST /api/users/register
// @access  Private
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  const userExist = await User.findOne({ email });
  if(userExist){
    return res.status(400).json({ message: "User already exists" });
  }
  const user = await User.create({
    name,
    email,
    password,
    
  })
  if(user){
    res.status(201).json({ message: "User registered successfully" });
  }else{
    res.status(400).json({message: "User registration failed" });
  }
};
