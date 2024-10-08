import express from "express"
import { deleteUser, editUser, getAllUsers, loginValidation } from "../Controller/adminController.js";

const router = express.Router()

router.get("/users",getAllUsers)
router.delete("/delete/:id",deleteUser)
router.patch("/edit/:id",editUser)
router.post("/login",loginValidation)

export default router ;