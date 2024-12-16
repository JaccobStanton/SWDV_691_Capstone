// src/components/Index/CropButton.jsx
import React, { useState, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { Modal, Box } from "@mui/material";
import { Scatter } from "react-chartjs-2"; // Import Scatter instead of Bar
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement, // Needed for scatter plots
  Tooltip,
  Title,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement, // Register PointElement
  Tooltip,
  Title,
  Legend
);

function CropButton() {
  // State to manage hover effect on the button
  const [isHovered, setIsHovered] = useState(false);

  // State to manage modal visibility
  const [open, setOpen] = useState(false);

  // Access the selected system from context
  const { selectedSystem } = useContext(AppContext);

  const baseStyle = {
    cursor: "pointer",
    border: "1px solid #48f7f5",
    color: "#48f7f5",
    fontWeight: "bold",
    width: "25%",
    height: "40px",
    textAlign: "center",
    borderRadius: "4px",
    backgroundColor: "transparent",
    margin: "0 8px",
    fontSize: "0.75rem",
    transition: "all 0.3s ease",
  };

  const getButtonStyle = (hovered) => ({
    ...baseStyle,
    border: hovered ? "1px solid #25c0e9" : baseStyle.border,
    color: hovered ? "white" : baseStyle.color,
    backgroundColor: "transparent",
  });

  // Function to handle opening the modal
  const handleOpen = () => {
    setOpen(true);
  };

  // Function to handle closing the modal
  const handleClose = () => setOpen(false);

  // Prepare data for chart
  let chartData;
  let chartOptions;
  let hasSensorData = false;

  if (
    selectedSystem &&
    selectedSystem.sensors &&
    selectedSystem.sensors.length > 0
  ) {
    const firstSensor = selectedSystem.sensors[0];
    const sunlightData = firstSensor.data || [];

    // Extract PAR and DLI
    const parValues = sunlightData.map((entry) => parseFloat(entry.PAR));
    const dliValues = sunlightData.map((entry) => parseFloat(entry.DLI));

    hasSensorData =
      sunlightData.length > 0 &&
      parValues.every((val) => !isNaN(val)) &&
      dliValues.every((val) => !isNaN(val));

    if (hasSensorData) {
      // Combine PAR and DLI into data points for scatter plot
      const scatterDataPoints = sunlightData.map((entry) => ({
        x: parseFloat(entry.PAR),
        y: parseFloat(entry.DLI),
      }));

      chartData = {
        datasets: [
          {
            label: "PAR vs. DLI",
            data: scatterDataPoints,
            backgroundColor: "rgba(72, 247, 245, 0.5)",
            borderColor: "rgba(72, 247, 245, 1)",
            pointBackgroundColor: "rgba(72, 247, 245, 1)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(72, 247, 245, 1)",
          },
        ],
      };

      chartOptions = {
        responsive: true,
        plugins: {
          title: {
            display: false,
          },
          legend: {
            labels: {
              color: "#797979", // Optional: Change legend text color
            },
          },
          tooltip: {
            enabled: true,
            backgroundColor: "#333",
            titleColor: "#fff",
            bodyColor: "#fff",
            borderColor: "#797979",
            borderWidth: 1,
            callbacks: {
              label: function (context) {
                const x = context.parsed.x;
                const y = context.parsed.y;
                return `PAR: ${x} | DLI: ${y}`;
              },
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: "Daily Light Integral (DLI)",
              color: "#797979", // Change Y-axis title color
            },
            grid: {
              color: "#797979", // Set Y-axis grid line color
              borderColor: "#797979", // Set Y-axis border color
              borderWidth: 1, // Set Y-axis border width
            },
            ticks: {
              color: "#797979", // Change Y-axis tick label color
            },
          },
          x: {
            title: {
              display: true,
              text: "Photosynthetically Active Radiation (PAR)",
              color: "#797979", // Change X-axis title color
            },
            grid: {
              color: "#797979", // Set X-axis grid line color
              borderColor: "#797979", // Set X-axis border color
              borderWidth: 1, // Set X-axis border width
            },
            ticks: {
              color: "#797979", // Change X-axis tick label color
            },
          },
        },
      };
    }
  }

  return (
    <>
      <button
        type="button"
        className="recommendation-button" // Use CSS class for styling
        onClick={handleOpen}
        aria-label="Open crop planning recommendations modal"
        style={getButtonStyle(isHovered)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        Crop Planning
      </button>

      {/* Modal for Crop Planning */}
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 800,
            borderRadius: "4px",
            border: "1.5px solid #e0e0e0",
            boxShadow: "0 7px 5px 1px rgba(0, 0, 0, 0.2)",
            p: 4,
            background:
              "linear-gradient(1deg, rgba(0, 0, 0, 0.95), rgb(27, 27, 27))",
          }}
        >
          <h1 style={{ color: "#797979", marginTop: "0" }}>
            Sunlight and Crop Planning
          </h1>
          <h3 style={{ color: "#797979", marginTop: "10px" }}>
            Recommendation: Adjust crop placement or canopy management based on
            Photosynthetically Active Radiation (PAR) and Daily Light Integral
            (DLI):
          </h3>
          <p style={{ color: "#797979" }}>
            - Areas with DLI &lt; 15 or PAR &lt; 400 may need shade reduction or
            different crops better suited for low light.
          </p>
          <p style={{ color: "#797979" }}>
            - EC &lt; 0.95: High salinity might harm plants; consider leaching
            salts with additional water.
          </p>

          {hasSensorData ? (
            <Scatter data={chartData} options={chartOptions} />
          ) : (
            <p style={{ color: "#797979" }}>
              No sensor data available to display.
            </p>
          )}
        </Box>
      </Modal>
    </>
  );
}

export default CropButton;
