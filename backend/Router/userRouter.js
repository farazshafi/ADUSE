import express from "express"
import { registerUser } from "../Controller/userController.js"

const router = express.Router()

router.post("/register",registerUser)

export default router