import express from "express";
import { getPostComment ,addPostComment} from "../controllers/comment.controller.js";
import verifyToken from "../middlewares/VerifyToken.js";

const router=express.Router();

router.get("/:postId",getPostComment)
router.post("/",verifyToken,addPostComment)

export default router;