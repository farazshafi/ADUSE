import jwt from "jsonwebtoken"

const generageTokens = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:"30d"})
}

export default generageTokens