
require("dotenv").config();

// Bas check ke liye logs (chaaho to hata sakti ho)
console.log("DEBUG: MONGO_URI present?", !!process.env.MONGO_URI);
console.log("DEBUG: JWT_SECRET present?", !!process.env.JWT_SECRET);

// 2. Basic imports
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// 3. Routes import
const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/tasks");

// 4. App init
const app = express();

// 5. CORS (sab origin allowed) – chaaho to restrict bhi kar sakti ho
app.use(
  cors({
    origin: "*", // later: ["http://localhost:5173", "https://task-app-bice-three.vercel.app"]
    credentials: true,
  })
);

// 6. JSON body parser
app.use(express.json());

// 7. Simple logger (optional, debugging ke liye)
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// 8. API routes
//    Tumhare frontend ka baseURL: https://task-5tje.onrender.com/api
//    Isliye axios me sirf "/auth/..." aur "/tasks" likhna hai
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// 9. Health check / root route
app.get("/", (req, res) => {
  res.send("Taskify API is running");
});

// 10. PORT & Mongo URI
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error(
    "ERROR: MONGO_URI not found in environment. Please set it in .env file."
  );
  process.exit(1);
}

// 11. Mongo connect + server start
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });
