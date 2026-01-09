import e from "express";
const app = e();
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/connectDB.js";
import userRouter from "./routes/user.route.js";
import { errorHandler } from "./utils/errorHandler.js";

const PORT = process.env.PORT || 5000;
app.use(cookieParser());
app.use(e.json());
dotenv.config();

app.use("/api/users", userRouter);
app.use(errorHandler);

connectDB().then(() => {
  app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
});