import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
dotenv.config();
connectDb();

const app = express();

app.get("/", (req, res) => {
  res.send("Welcom to User Management Server");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, (req, res) => {
  console.log("Server is running on http://localhost:4000");
});
