import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

dotenv.config();
connectDB();

//middleware
const app = express();
app.use(express.json());

//routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

app.get("/", (req, res) => {
  res.send("Deadline Risk Radar API running");
});

//server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
