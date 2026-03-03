require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const authMiddleware = require("./middleware/authMiddleware");

const app = express();

connectDB();

app.use(express.json());
app.use(express.static("public"));

app.use("/api", authRoutes);

// Protected Route
app.get("/dashboard", authMiddleware, (req, res) => {
  res.sendFile(__dirname + "/public/dashboard.html");
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});