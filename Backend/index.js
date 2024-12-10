// Main server entry point
require("dotenv").config();
const cors = require("cors");

const express = require("express");
const mongoose = require("mongoose");
const agriScanRoutes = require("./routes/agriScanRoutes");

const app = express();

// Middleware
app.use(express.json());

app.use(cors()); // Allow all origins

//!production
// const corsOptions = {
//   origin: ["http://yourfrontendurl.com"], // Replace with your frontend's production URL
// };
// app.use(cors(corsOptions));

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

const uri = `mongodb+srv://${username}:${password}@capstone.dhfn8.mongodb.net/?retryWrites=true&w=majority&appName=Capstone`;

// MongoDB Connection
mongoose
  .connect(uri)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// Routes
app.use("/api", agriScanRoutes);

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
