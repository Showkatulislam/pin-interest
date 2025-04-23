import Comment from '../models/comment.model.js'
export const getPostComment=async(req,res)=>{
    try {
        const {postId}=req.params
        const comments = await Comment.find({ pin: postId })
        .populate("user", "username img displayName")
        .sort({ createdAt: -1 });
        res.status(200).json(comments)
    } catch (error) {
        res.status(500).json({message:error.message})   
    }
}
export const addPostComment=async(req,res)=>{
    try {
        const {description,pin}=req.body
        const userId=req.userId
        const newcomment=await Comment.create({
            description,
            pin,
            user:userId
        })
        res.status(200).json(newcomment)
    } catch (error) {
        console.error(error)    
        res.status(500).json({message:error.message})
    }
}