import express from "express"
import { getUserDetails, login, registerUser, update } from "../Controller/userController.js"
import { protect } from "../middleware/authMiddleware.js"
import multer from "multer"

const router = express.Router()

// Multer setup for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/register",upload.single("image"),registerUser)
router.post("/login",login)
router.patch("/update",protect,update)
router.get("/:id",protect,getUserDetails)
router.post("/register")
export default router