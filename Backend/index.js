const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Example Route
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

const Item = require("./models/Item");

// Create a new item
app.post("/api/items", async (req, res) => {
  const { name, quantity } = req.body;
  try {
    const newItem = new Item({ name, quantity });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ error: "Failed to create item" });
  }
});

// Get all items
app.get("/api/items", async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch items" });
  }
});
