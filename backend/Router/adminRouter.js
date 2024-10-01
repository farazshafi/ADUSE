import express from "express"
import { deleteUser, editUser, getAllUsers } from "../Controller/adminController.js";

const router = express.Router()

router.get("/users",getAllUsers)
router.delete("/delete/:id",deleteUser)
router.patch("/edit/:id",editUser)

export default router ;