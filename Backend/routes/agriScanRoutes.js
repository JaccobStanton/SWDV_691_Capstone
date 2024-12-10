// # API routes
//└── agriScanRoutes.js  # Route for handling AgriScan system

//The routes folder contains API routes to interact with my database.

const express = require("express");
const router = express.Router();
const AgriScanSystem = require("../models/AgriScanSystem");
const Sensor = require("../models/sensor");

/**
 * Utility Functions
 */

async function getMainDoc() {
  // Assuming there's only one main AgriScanSystem document
  return await AgriScanSystem.findOne();
}

function findSystemById(mainDoc, systemId) {
  return mainDoc.systems.find((sys) => sys.id === systemId);
}

function findSensorById(system, sensorId) {
  return system.sensors.find((s) => s.id === sensorId);
}

function findDroneById(system, droneId) {
  return system.drones.find((d) => d.id === droneId);
}

/**
 * Systems Routes
 */

// GET /api/systems - returns all systems
router.get("/systems", async (req, res) => {
  try {
    const mainDoc = await getMainDoc();
    if (!mainDoc) return res.status(404).json({ error: "No systems found" });

    res.json(mainDoc.systems);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/systems/:systemId - returns a specific system
router.get("/systems/:systemId", async (req, res) => {
  const { systemId } = req.params;
  try {
    const mainDoc = await getMainDoc();
    const system = findSystemById(mainDoc, systemId);
    if (!system) return res.status(404).json({ error: "System not found" });

    res.json(system);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/systems - add a new system
router.post("/systems", async (req, res) => {
  const newSystem = req.body; // Should contain name, images, etc.
  try {
    const mainDoc = await getMainDoc();
    if (!mainDoc)
      return res.status(404).json({ error: "Main document not found" });

    mainDoc.systems.push(newSystem);
    await mainDoc.save();

    res.status(201).json({ message: "System added", system: newSystem });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT/PATCH /api/systems/:systemId - update a specific system
router.patch("/systems/:systemId", async (req, res) => {
  const { systemId } = req.params;
  const updates = req.body;
  try {
    // Directly update using array filters
    const result = await AgriScanSystem.findOneAndUpdate(
      { "systems.id": systemId },
      { $set: { "systems.$": { ...updates, id: systemId } } },
      { new: true }
    );

    if (!result) return res.status(404).json({ error: "System not found" });
    const updatedSystem = result.systems.find((sys) => sys.id === systemId);
    res.json(updatedSystem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/systems/:systemId - remove a specific system
router.delete("/systems/:systemId", async (req, res) => {
  const { systemId } = req.params;
  try {
    const result = await AgriScanSystem.findOneAndUpdate(
      {},
      { $pull: { systems: { id: systemId } } },
      { new: true }
    );

    if (!result) return res.status(404).json({ error: "System not found" });
    res.json({ message: "System deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * Sensors Routes
 */
// GET /sensors - Fetch all sensors
router.get("/sensors", async (req, res) => {
  try {
    const sensors = await Sensor.find(); // Fetch all sensors from the database
    res.json(sensors);
  } catch (error) {
    console.error("Error fetching sensors:", error);
    res.status(500).json({ message: "Failed to fetch sensors" });
  }
});
// GET /api/systems/:systemId/sensors
router.get("/systems/:systemId/sensors", async (req, res) => {
  const { systemId } = req.params;
  try {
    const mainDoc = await getMainDoc();
    const system = findSystemById(mainDoc, systemId);
    if (!system) return res.status(404).json({ error: "System not found" });

    res.json(system.sensors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/systems/:systemId/sensors/:sensorId
router.get("/systems/:systemId/sensors/:sensorId", async (req, res) => {
  const { systemId, sensorId } = req.params;
  try {
    const mainDoc = await getMainDoc();
    const system = findSystemById(mainDoc, systemId);
    if (!system) return res.status(404).json({ error: "System not found" });

    const sensor = findSensorById(system, sensorId);
    if (!sensor) return res.status(404).json({ error: "Sensor not found" });

    res.json(sensor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/systems/:systemId/sensors
router.post("/systems/:systemId/sensors", async (req, res) => {
  const { systemId } = req.params;
  const newSensor = req.body;
  try {
    const result = await AgriScanSystem.findOneAndUpdate(
      { "systems.id": systemId },
      { $push: { "systems.$.sensors": newSensor } },
      { new: true }
    );

    if (!result) return res.status(404).json({ error: "System not found" });
    res.status(201).json({ message: "Sensor added", sensor: newSensor });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT/PATCH /api/systems/:systemId/sensors/:sensorId
router.patch("/systems/:systemId/sensors/:sensorId", async (req, res) => {
  const { systemId, sensorId } = req.params;
  const updates = req.body;
  try {
    // Find the system first
    const mainDoc = await getMainDoc();
    const systemIndex = mainDoc.systems.findIndex((s) => s.id === systemId);
    if (systemIndex === -1)
      return res.status(404).json({ error: "System not found" });

    const sensorIndex = mainDoc.systems[systemIndex].sensors.findIndex(
      (s) => s.id === sensorId
    );
    if (sensorIndex === -1)
      return res.status(404).json({ error: "Sensor not found" });

    // Apply updates
    Object.assign(mainDoc.systems[systemIndex].sensors[sensorIndex], updates);
    await mainDoc.save();

    res.json(mainDoc.systems[systemIndex].sensors[sensorIndex]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/systems/:systemId/sensors/:sensorId
router.delete("/systems/:systemId/sensors/:sensorId", async (req, res) => {
  const { systemId, sensorId } = req.params;
  try {
    const result = await AgriScanSystem.findOneAndUpdate(
      { "systems.id": systemId },
      { $pull: { "systems.$.sensors": { id: sensorId } } },
      { new: true }
    );

    if (!result)
      return res.status(404).json({ error: "System or sensor not found" });
    res.json({ message: "Sensor deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * Drones Routes
 */

// GET /api/systems/:systemId/drones
router.get("/systems/:systemId/drones", async (req, res) => {
  const { systemId } = req.params;
  try {
    const mainDoc = await getMainDoc();
    const system = findSystemById(mainDoc, systemId);
    if (!system) return res.status(404).json({ error: "System not found" });

    res.json(system.drones);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/systems/:systemId/drones/:droneId
router.get("/systems/:systemId/drones/:droneId", async (req, res) => {
  const { systemId, droneId } = req.params;
  try {
    const mainDoc = await getMainDoc();
    const system = findSystemById(mainDoc, systemId);
    if (!system) return res.status(404).json({ error: "System not found" });

    const drone = findDroneById(system, droneId);
    if (!drone) return res.status(404).json({ error: "Drone not found" });

    res.json(drone);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/systems/:systemId/drones
router.post("/systems/:systemId/drones", async (req, res) => {
  const { systemId } = req.params;
  const newDrone = req.body;
  try {
    const result = await AgriScanSystem.findOneAndUpdate(
      { "systems.id": systemId },
      { $push: { "systems.$.drones": newDrone } },
      { new: true }
    );

    if (!result) return res.status(404).json({ error: "System not found" });
    res.status(201).json({ message: "Drone added", drone: newDrone });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT/PATCH /api/systems/:systemId/drones/:droneId
router.patch("/systems/:systemId/drones/:droneId", async (req, res) => {
  const { systemId, droneId } = req.params;
  const updates = req.body;
  try {
    const mainDoc = await getMainDoc();
    const systemIndex = mainDoc.systems.findIndex((s) => s.id === systemId);
    if (systemIndex === -1)
      return res.status(404).json({ error: "System not found" });

    const droneIndex = mainDoc.systems[systemIndex].drones.findIndex(
      (d) => d.id === droneId
    );
    if (droneIndex === -1)
      return res.status(404).json({ error: "Drone not found" });

    Object.assign(mainDoc.systems[systemIndex].drones[droneIndex], updates);
    await mainDoc.save();

    res.json(mainDoc.systems[systemIndex].drones[droneIndex]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/systems/:systemId/drones/:droneId
router.delete("/systems/:systemId/drones/:droneId", async (req, res) => {
  const { systemId, droneId } = req.params;
  try {
    const result = await AgriScanSystem.findOneAndUpdate(
      { "systems.id": systemId },
      { $pull: { "systems.$.drones": { id: droneId } } },
      { new: true }
    );

    if (!result)
      return res.status(404).json({ error: "System or drone not found" });
    res.json({ message: "Drone deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * Environmental Conditions Routes
 */

// GET /api/systems/:systemId/environmental
router.get("/systems/:systemId/environmental", async (req, res) => {
  const { systemId } = req.params;
  try {
    const mainDoc = await getMainDoc();
    const system = findSystemById(mainDoc, systemId);
    if (!system) return res.status(404).json({ error: "System not found" });

    res.json(system.environmentalConditions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT/PATCH /api/systems/:systemId/environmental
router.patch("/systems/:systemId/environmental", async (req, res) => {
  const { systemId } = req.params;
  const updates = req.body; // Expecting an array or object depending on your schema

  try {
    const mainDoc = await getMainDoc();
    const systemIndex = mainDoc.systems.findIndex((s) => s.id === systemId);
    if (systemIndex === -1)
      return res.status(404).json({ error: "System not found" });

    // For simplicity, let's replace the entire environmentalConditions array.
    // Adjust logic if you only want to update specific fields.
    mainDoc.systems[systemIndex].environmentalConditions = updates;
    await mainDoc.save();

    res.json(mainDoc.systems[systemIndex].environmentalConditions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
