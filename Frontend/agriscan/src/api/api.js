// src/api/api.js
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5001/api";

// Fetch all systems
export async function getSystems() {
  try {
    const response = await fetch(`${API_BASE_URL}/systems`);
    if (!response.ok) {
      throw new Error("Failed to fetch systems");
    }
    return await response.json(); // Return JSON response
  } catch (error) {
    console.error("Error fetching systems:", error);
    throw error; // Re-throw to handle it in the component or context
  }
}

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
