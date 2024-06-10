import express from "express";
import dotenv from "dotenv";
import databaseConnection from "./config/database.js";
import cookieParser from "cookie-parser";
import userRoute from "./routes/userRoutes.js";
import tweetRoute from "./routes/tweetRoutes.js";

dotenv.config({
    path:".env"
})
databaseConnection();
const app = express();

app.use(express.urlencoded({
    extends:true
}))
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/user", userRoute);
app.use("/api/v1/tweet", tweetRoute);


app.listen(process.env.PORT,()=>{
    console.log(`Server listning at port ${process.env.PORT}`);
})