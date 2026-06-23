// import dotenv from "dotenv";
// dotenv.config();
import dotenv from "dotenv";
dotenv.config();

// ----- some times DNS is fails ------//
// --- DNS FIX FORCED FULLY START  ---
import dns from "node:dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);
// --- DNS FIX END ---
import express from "express";
import cors from "cors";

// // Mongoose connection
import connectDB from "./configs/db.js";
import cookieParser from "cookie-parser";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import { fileURLToPath } from "node:url";
import path from "node:path";
// PORT
const PORT = process.env.PORT || 5000;
const app = express();

// This method is important for file uploads, but it should only provide access to image files
// {
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// }

app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());
// Mongoose connection
connectDB();

app.get("", (req, res) => res.send("API is Working"));

app.use("/api/user", userRouter);
app.use("/api/product", productRouter);

app.listen(PORT, () => {
  console.log(`Server Runing On Port ${PORT}`);
});
