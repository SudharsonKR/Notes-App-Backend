import express from "express";
import mongoose from "mongoose";
import cors from "cors"
import dotenv from "dotenv"
import userRouter from "./routes/userRouter.js";
import userNote from "./routes/noteRouter.js";

dotenv.config();

const app = express();

app.use(express.json())
app.use(cors())

//Routes
app.use("/users", userRouter)
app.use("/api/notes", userNote)

const PORT = process.env.PORT || 8002

app.get("/api", (req, res)=>{
    res.send("Welcome to Notes Application")
})

//server connections
app.listen(PORT, ()=> {console.log("server running on port:", PORT)})

//database connections
const db = process.env.MONGO_URL

mongoose.connect(db)
.then(()=>{console.log("Database Successfully Connected")})
.catch((error)=>{console.log("Database Connections failed", error.message)})
