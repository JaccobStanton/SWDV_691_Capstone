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
import FertilizerButton from "./FertilizerButton";
import CropButton from "./CropButton";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Title,
  Legend
);

function Rainfall() {
  const [isHovered, setIsHovered] = useState({
    irrigation: false,
    fertilizer: false,
    cropPlanning: false,
  });
  const [open, setOpen] = useState(false);

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
  };

  const getButtonStyle = (hovered) => ({
    ...baseStyle,
    border: hovered ? "1px solid #25c0e9" : baseStyle.border,
    color: hovered ? "white" : baseStyle.color,
  });

  const handleOpen = () => {
    setOpen(true);
  };

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
      parseFloat(entry.soilMoisture)
    );

    hasSensorData = soilData.length > 0;

    chartData = {
      labels: depths,
      datasets: [
        {
          label: "Soil Moisture (%)",
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
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: "Soil Moisture (%)",
            color: "#797979", // Optional: Change Y-axis title color
          },
          grid: {
            color: "#797979", // Set Y-axis grid line color
            borderColor: "#797979", // Optional: Set Y-axis border color
            borderWidth: 1, // Optional: Set Y-axis border width
          },
          ticks: {
            color: "#797979", // Optional: Change Y-axis tick label color
          },
        },
        x: {
          title: {
            display: true,
            text: "Depth",
            color: "#797979", // Optional: Change X-axis title color
          },
          grid: {
            color: "#797979", // Set X-axis grid line color
            borderColor: "#797979", // Optional: Set X-axis border color
            borderWidth: 1, // Optional: Set X-axis border width
          },
          ticks: {
            color: "#797979", // Optional: Change X-axis tick label color
          },
        },
      },
    };
  }

  return (
    <>
      <div className="row-parent-box">
        <div className="title-box">Recommendations</div>

        <button
          type="button"
          style={getButtonStyle(isHovered.irrigation)}
          onMouseEnter={() =>
            setIsHovered((prev) => ({ ...prev, irrigation: true }))
          }
          onMouseLeave={() =>
            setIsHovered((prev) => ({ ...prev, irrigation: false }))
          }
          onClick={handleOpen}
        >
          Irrigation
        </button>

        <FertilizerButton />

        <CropButton />
      </div>

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
            Irrigation Adjustment
          </h1>
          <h3 style={{ color: "#797979", marginTop: "10px" }}>
            Recommendation: Adjust irrigation schedules to target areas with low
            soil moisture. For example:
          </h3>
          <p style={{ color: "#797979" }}>
            - Depths with soil moisture &lt; 17% indicate potential water
            stress.
          </p>
          <p style={{ color: "#797979" }}>
            - Depths with soil moisture &gt; 23% may be over-irrigated and could
            lead to waterlogging.
          </p>

          {hasSensorData ? (
            <Bar data={chartData} options={chartOptions} />
          ) : (
            <p>No sensor data available to display.</p>
          )}
        </Box>
      </Modal>
    </>
  );
}

export default Rainfall;
