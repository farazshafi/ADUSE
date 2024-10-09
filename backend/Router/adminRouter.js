import express from "express"
import { createUser, deleteUser, editUser, getAllUsers, getSingleUser, loginValidation } from "../Controller/adminController.js";

const router = express.Router()

router.get("/users",getAllUsers)
router.delete("/delete/:id",deleteUser)
router.patch("/edit/:id",editUser)
router.post("/login",loginValidation)
router.get("/user_details/:id",getSingleUser)
router.post("/create_user",createUser)

export default router ;