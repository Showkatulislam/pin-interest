import jwt from "jsonwebtoken"
const verifyToken=(req,res,next)=>{
    const token=req.cookies.token
    if(!token) return res.status(403).json("Token is not valid")
    try {
        jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{ 
            if(err) return res.status(403).json("Token is not valid")
            req.userId=user.userId
            next()
        })
    } catch (error) {
        console.log(error)
    }
}

export default verifyToken