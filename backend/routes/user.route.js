import express from "express";
import { getUser, LoginUser, LogoutUser, registerUser,followUser } from "../controllers/user.controller.js";
import verifyToken from "../middlewares/VerifyToken.js";

const router=express.Router();

router.get("/:username",getUser)
router.post("/auth/register",registerUser)
router.post("/auth/login",LoginUser)
router.post("/auth/logout",LogoutUser)
router.post("/follow/:username",verifyToken,followUser)

export default router;