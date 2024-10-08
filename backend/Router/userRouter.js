import express from "express"
import { getUserDetails, getUserProfile, login, registerUser, update } from "../Controller/userController.js"
import { protect } from "../middleware/authMiddleware.js"
import multer from "multer"

const router = express.Router()

// Multer setup for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/register",upload.single("image"),registerUser)
router.post("/login",login)
router.patch("/update",protect,upload.single("image"),update)
router.get("/:id",protect,getUserDetails)
router.get("/profile_image/:id",getUserProfile)
router.post("/register")
export default router