import mongoose from "mongoose";
const dbConnection=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to database successfully");
    } catch (error) {
        console.log("Error connecting to database",error.message);
        
    }
}

export default dbConnection 