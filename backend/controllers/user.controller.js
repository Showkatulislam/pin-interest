import bcrypt from 'bcryptjs'
import User from '../models/user.model.js'
import Follow from '../models/follow.model.js'
import jwt from 'jsonwebtoken'
export const registerUser = async (req, res) => {
    const { username, displayName, email, password } = req.body
    console.log(username, displayName, email, password);

    if (!username || !displayName || !email || !password) {
        return res.status(400).json({ message: "All fields are required" })
    }

    const hashPassword = await bcrypt.hash(password, 10)

    const user = await User.create({
        username,
        displayName,
        email,
        hashedPassword: hashPassword
    })

    if (!user) {
        return res.status(400).json({ message: "User not Created" })
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000 * 30 // 1 day
    })

    const { hashedPassword, ...userData } = user._doc

    res.status(200).json(userData)
}
export const LoginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        console.log(email, password);
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required   " })
        }
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: "User not found" })
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.hashedPassword)

        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid credentials" })
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET)
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000 * 30 // 1 
        })

        const { hashedPassword, ...detailsWithoutPassword } = user._doc
        return res.status(200).json(detailsWithoutPassword)
    } catch (error) {
        return res.status(500).json({ message: error.message })

    }
}

export const LogoutUser = async (req, res) => {
    res.clearCookie("token")
    return res.status(200).json({ message: "User logged out successfully" })
}

export const getUser = async (req, res) => {
    const { username } = req.params;

    const user = await User.findOne({ username });
  
    const { hashedPassword, ...detailsWithoutPassword } = user._doc;
  
    const followerCount = await Follow.countDocuments({ following: user._id });
    const followingCount = await Follow.countDocuments({ follower: user._id });
  
    const token = req.cookies.token;
  
    if (!token) {
      res.status(200).json({
        ...detailsWithoutPassword,
        followerCount,
        followingCount,
        isFollowing: false,
      });
    } else {
      jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
        if (!err) {
          const isExists = await Follow.exists({
            follower: payload.userId,
            following: user._id,
          });
  
          res.status(200).json({
            ...detailsWithoutPassword,
            followerCount,
            followingCount,
            isFollowing: isExists ? true : false,
          });
        }
      });
    }
}

export const followUser=async(req,res)=>{
    const {username}=req.params
    const userId=req.userId
    const user=await User.findOne({username})
    if(!user) return res.status(404).json({message:"User not found"})
    const isFollowing=await Follow.findOne({follower:userId,following:user._id})
    if(isFollowing){
        await Follow.deleteOne({follower:userId,following:user._id})
    }else{
        await Follow.create({follower:userId,following:user._id})

    }
    res.status(200).json({message:"Followed/Unfollowed successfully"})
}