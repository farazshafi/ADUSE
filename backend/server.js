// importing 
import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import userRouter from "./Router/userRouter.js"
import adminRouter from "./Router/adminRouter.js"

// configuration
dotenv.config()
connectDB()

// initializing
const app = express()
const PORT = process.env.PORT || 3000


// middleware
app.use(express.json())


// routes
app.get("/",(req,res)=>{
    res.send("Api is running...")
})
app.use("/api/user/",userRouter)
app.use("/api/admin/",adminRouter)


// listners
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})