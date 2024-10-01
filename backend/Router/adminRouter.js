import express from "express"
import { getAllUsers } from "../Controller/adminController.js";

const router = express.Router()

router.get("/users",getAllUsers)

export default router ;