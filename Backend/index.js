// Main server entry point
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const agriScanRoutes = require("./routes/agriScanRoutes");

const app = express();

// Middleware
app.use(express.json());

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

console.log("Username:", username);
console.log("Password:", password);

const uri = `mongodb+srv://${username}:${password}@capstone.dhfn8.mongodb.net/?retryWrites=true&w=majority&appName=Capstone`;

// MongoDB Connection
mongoose
  .connect(uri)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// Routes
app.use("/api/agriscan", agriScanRoutes);

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
