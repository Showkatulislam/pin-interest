import Board from "../models/board.model.js";
import Pin from "../models/pin.model.js";
export const getUserBoards=async(req,res)=>{
    try {
        const { userId } = req.params;  
        console.log(userId)
        const boards=await Board.find({user:userId})

        const boardWithDetails=await Promise.all(boards.map(async (board) => {
            const pinCount=await Pin.countDocuments({ board: board._id });
            const pinFirst=await Pin.findOne({board:board._id})
            return {
                ...board._doc,
                pinCount: pinCount,
                firstPin: pinFirst ? pinFirst : null // Include the first pin or null if not found
            }
        }))
        res.status(200).json(boardWithDetails);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}