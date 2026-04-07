import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./dbConfig.js";
import auth from './routes/auth.js'
import donation from "./routes/donation.js";
import Receiver from "./routes/receiver.js";
dotenv.config();

const app = express()
const PORT = process.env.PORT || 5000;

connectDB()

app.use(cors({ origin: "*" }));
app.use(express.json());


app.use("/api/auth", auth);
app.use("/api/donation", donation);
app.use("/api/receiver", Receiver);


app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
})
