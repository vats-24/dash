import express from "express"
import cookieParser from "cookie-parser";
import instagramRouter from "./routes/instagram.js";
import userRouter from "./routes/user.js"
import cors from "cors"
import { config } from "dotenv";
import mongoose from "mongoose";
import dotenv from "dotenv"

const app = express();

dotenv.config()

const connect = async () => {
    try {
    await mongoose.connect(process.env.MONGO)
    console.log("connect")
} catch (error) {
    handleError(error)
}}

mongoose.connection.on("disconnected",()=>{
    console.log("mongoDB disconnected") 
})

mongoose.connection.on("connected",()=>{
    console.log("mongoDB connected")
})

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:5173",
    methods:["GET","POST","PUT","DELETE"],
    credentials:true, 
}))



//using routes
app.use("/api/v1/users",userRouter)
app.use("/api/v1/instagram-stats",instagramRouter)


app.get("/",(req,res)=>{
    res.send("helloo")
    console.log("landing")
})

app.listen(5000,()=>{
    connect()
    console.log("Hello")
}) 