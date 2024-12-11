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

// Fetch all images
export async function getImages() {
  try {
    const response = await fetch(`${API_BASE_URL}/images`);
    if (!response.ok) {
      throw new Error(`Failed to fetch images: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching images:", error);
    throw error;
  }
}

export async function getNotAnalyzedImages() {
  try {
    const response = await fetch(`${API_BASE_URL}/images/not-analyzed`);
    if (!response.ok) {
      throw new Error("Failed to fetch Not Analyzed images");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching Not Analyzed images:", error);
    throw error;
  }
}
