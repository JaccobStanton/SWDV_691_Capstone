// src/components/Index/IrrigationButton.jsx
import React, { useState, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { Modal, Box } from "@mui/material";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Title,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Title,
  Legend
);

function FertilizerButton() {
  // State to manage hover effects on the button
  const [isHovered, setIsHovered] = useState(false);

  // State to manage modal visibility
  const [open, setOpen] = useState(false);

  // Access the selected system from context
  const { selectedSystem } = useContext(AppContext);

  // Base button styles
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
    const soilData = firstSensor.data || [];

    // Extract depths and soilMoisture
    const depths = soilData.map((entry) => entry.depth);
    const moistureValues = soilData.map((entry) =>
      parseFloat(entry.electricalConductivity)
    );

    hasSensorData = soilData.length > 0;

    chartData = {
      labels: depths,
      datasets: [
        {
          label: "Electrical Conductivity (EC)",
          data: moistureValues,
          backgroundColor: "rgba(72, 247, 245, 0.5)",
          borderColor: "rgba(72, 247, 245, 1)",
          borderWidth: 1,
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
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: "Electrical Conductivity (EC)",
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
            text: "Depth",
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

  return (
    <>
      <button
        type="button"
        style={getButtonStyle(isHovered)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleOpen}
        aria-label="Open irrigation recommendations modal"
      >
        Fertilizer
      </button>

      {/* Modal for Irrigation */}
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
            Fertilizer Adjustment
          </h1>
          <h3 style={{ color: "#797979", marginTop: "10px" }}>
            Recommendation: Monitor electrical conductivity (EC) levels to
            ensure optimal nutrient availability:
          </h3>
          <p style={{ color: "#797979" }}>
            - EC &lt; 0.75: Nutrient levels may be insufficient; consider adding
            fertilizers.
          </p>
          <p style={{ color: "#797979" }}>
            - EC &lt; 0.95: High salinity might harm plants; consider leaching
            salts with additional water.
          </p>

          {hasSensorData ? (
            <Bar data={chartData} options={chartOptions} />
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

export default FertilizerButton;
