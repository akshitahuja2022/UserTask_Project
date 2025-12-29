import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDb from "./config/db.js";
import cookieparser from "cookie-parser";
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import adminRouter from "./routes/admin.route.js";
dotenv.config();
connectDb();

const app = express();
app.use(express.json());
app.use(cookieparser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

// routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);

app.get("/", (req, res) => {
  res.send("Welcom to User Management Server");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, (req, res) => {
  console.log("Server is running on http://localhost:4000");
});
