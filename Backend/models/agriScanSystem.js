// Mongoose schemas/models
//   └── AgriScanSystem.js  # The schema for AgriScan System

const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema(
  {
    url: String,
    description: String,
  },
  { _id: false }
);

const SensorSchema = new mongoose.Schema(
  {
    type: String,
    reading: Number,
    unit: String,
  },
  { _id: false }
);

const SystemStatusSchema = new mongoose.Schema(
  {
    operational: Boolean,
    lastCheck: Date,
    notes: String,
  },
  { _id: false }
);

const DroneSchema = new mongoose.Schema(
  {
    identifier: String,
    status: String,
    location: String,
  },
  { _id: false }
);

const EnvironmentalConditionSchema = new mongoose.Schema(
  {
    temperature: Number,
    humidity: Number,
    soilMoisture: Number,
  },
  { _id: false }
);

const SubSystemSchema = new mongoose.Schema(
  {
    name: String,
    images: [ImageSchema],
    sensors: [SensorSchema],
    systemStatus: SystemStatusSchema,
    drones: [DroneSchema],
    environmentalConditions: [EnvironmentalConditionSchema],
  },
  { _id: false }
);

const MainSystemSchema = new mongoose.Schema({
  systemName: { type: String, required: true },
  systems: [SubSystemSchema],
});

module.exports = mongoose.model("AgriScanSystem", MainSystemSchema);
