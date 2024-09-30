// importing 
import express from "express"
import dotenv from "dotenv"


// configuration
dotenv.config()


// initializing
const app = express()
const PORT = process.env.PORT || 3000


// middleware



// routes
app.get("/",(req,res)=>{
    res.send("Api is running...")
})


// listners
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})