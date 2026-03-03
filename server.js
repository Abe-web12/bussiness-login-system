require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const authMiddleware = require("./middleware/authMiddleware");

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(express.json());
app.use(express.static("public"));

app.use("/api", authRoutes);

app.get("/dashboard", authMiddleware, (req, res) => {
  res.sendFile(__dirname + "/public/dashboard.html");
});

app.listen(PORT, () => {
  console.log("Server running...");
});