// # API routes
//└── agriScanRoutes.js  # Route for handling AgriScan system

//The routes folder contains API routes to interact with my database.

const express = require("express");
const AgriScanSystem = require("../models/AgriScanSystem");

const router = express.Router();

// Get the AgriScan system data
router.get("/", async (req, res) => {
  try {
    const data = await AgriScanSystem.findOne({
      systemName: "AgriScan System",
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch AgriScan System data" });
  }
});

module.exports = router;
