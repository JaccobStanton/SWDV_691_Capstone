// src/api/api.js
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5001/api";
import axios from "axios";

// Fetch all systems
export async function getSystems() {
  try {
    console.log("Sending request to:", `${API_BASE_URL}/systems`);
    const response = await fetch(`${API_BASE_URL}/systems`);
    if (!response.ok) {
      console.error("Failed to fetch systems:", response.status);
      throw new Error("Failed to fetch systems");
    }
    const data = await response.json();
    console.log("Systems received:", data);
    return data;
  } catch (error) {
    console.error("Error fetching systems:", error);
    throw error;
  }
}

//update system name
export const updateSystem = async (systemId, updates) => {
  try {
    const response = await axios.patch(
      `${API_BASE_URL}/systems/${systemId}`,
      updates
    );
    return response.data;
  } catch (error) {
    console.error("Error updating system:", error.response?.data || error);
    throw error;
  }
};

// NEW: Fetch sensors for a given system

export async function getSensors() {
  try {
    const response = await fetch(`${API_BASE_URL}/sensors`);
    if (!response.ok) {
      throw new Error("Failed to fetch sensors");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching sensors:", error);
    throw error;
  }
}
//updating sensor name
export async function updateSensor(systemId, sensorId, updates) {
  try {
    const response = await axios.patch(
      `${API_BASE_URL}/systems/${systemId}/sensors/${sensorId}`,
      updates
    );
    return response.data;
  } catch (error) {
    console.error("Error updating sensor:", error);
    throw error;
  }
}

// S3 Images
export async function getImagesFromS3() {
  try {
    const response = await fetch(`${API_BASE_URL}/images`); // Adjust for your server URL
    if (!response.ok) {
      throw new Error("Failed to fetch images");
    }
    const data = await response.json();
    return data; // data is array of { name, url, date, time, imgType }
  } catch (error) {
    console.error("Error fetching images:", error);
    throw error;
  }
}

export async function getAnalyzedImagesFromS3() {
  try {
    const response = await axios.get(`${API_BASE_URL}/images/analyzed`);
    return response.data;
  } catch (error) {
    console.error("Error fetching analyzed images:", error);
    throw error;
  }
}

// drone name
export async function updateDrone(systemId, droneId, updates) {
  try {
    const response = await axios.patch(
      `${API_BASE_URL}/systems/${systemId}/drones/${droneId}`,
      updates
    );
    return response.data;
  } catch (error) {
    console.error("Error updating drone:", error);
    throw error;
  }
}

export async function getDroneLogsFromS3() {
  try {
    const response = await axios.get(`${API_BASE_URL}/logs`);
    return response.data;
  } catch (error) {
    console.error("Error fetching analyzed images:", error);
    throw error;
  }
}
export async function getDiagnosticsLogsFromS3() {
  try {
    const response = await axios.get(`${API_BASE_URL}/logs/diagnostics`);
    return response.data;
  } catch (error) {
    console.error("Error fetching analyzed images:", error);
    throw error;
  }
}
