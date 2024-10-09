import express from "express"
import { deleteUser, editUser, getAllUsers, getSingleUser, loginValidation } from "../Controller/adminController.js";

const router = express.Router()

router.get("/users",getAllUsers)
router.delete("/delete/:id",deleteUser)
router.patch("/edit/:id",editUser)
router.post("/login",loginValidation)
router.get("/user_details/:id",getSingleUser)

export default router ;