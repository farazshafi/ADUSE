import express from "express"
import { getUserDetails, login, registerUser, update } from "../Controller/userController.js"
import { protect } from "../middleware/authMiddleware.js"

const router = express.Router()

router.post("/register",registerUser)
router.post("/login",login)
router.patch("/update",protect,update)
router.get("/:id",protect,getUserDetails)

export default router