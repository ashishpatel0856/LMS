import express from 'express';
import dotenv from "dotenv";
import connectDB from './database/db.js';
import userRoute from "./routes/user.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config({});

// call database connection here
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

//default middleware
app.use(express.json());
app.use(cookieParser({
    origin: "http://localhost:8080",
    Credential:true
}));
app.use(cors())
// apis
app.use("/api/v1/user", userRoute);

// app.get("/home",(_,res) => {
//   return  res.status(200).json({
//         success:true,
//         message: "hello I am comming from backend"
//     })
// })

app.listen(PORT, () => {
    console.log(`server listen at port ${PORT}`);
})