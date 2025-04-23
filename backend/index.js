import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import userRouter from "./routes/user.route.js"
import pinsRouter from "./routes/pins.route.js"
import commentsRouter from "./routes/comments.route.js"
import boardsRouter from "./routes/boards.route.js"
import dbConnection from "./utils/ConnectionDb.js"
import fileUpload from "express-fileupload";
const app=express()

app.use(express.json())
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(cookieParser())
app.use(fileUpload());

app.use("/users",userRouter)
app.use("/pins",pinsRouter)
app.use("/comments",commentsRouter)
app.use("/boards",boardsRouter)


app.get("/test", (req, res) => {
    res.send("Hello World")
})


app.use((error,req,res,next)=>{
    res.status(error.status || 500)
    res.json({
        message:error.message || "Internal Server Error",
        status:error.status ||500,
        stack:error.stack 
    })
})

app.listen(3000,()=>{
    dbConnection()
    console.log("Server is running on port 3000")
})