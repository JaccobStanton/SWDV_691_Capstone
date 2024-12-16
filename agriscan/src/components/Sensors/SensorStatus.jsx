import React from "react";
import BatteryFullIcon from "@mui/icons-material/BatteryFull";

function SensorStatus({ battery, lora }) {
  // Helper to create active signal dots for LoRaWAN
  const renderSignalDots = () => {
    const dots = [];
    for (let i = 1; i <= 4; i++) {
      dots.push(
        <span
          key={i}
          className={`signal-dot ${i <= lora ? "active" : ""}`}
        ></span>
      );
    }
    return dots;
  };

  return (
    <>
      <div className="top-centered-row-container">
        <div className="title-box">Sensor Status</div>
        <div className="top-inner-content">
          {/* Battery Icon */}
          <BatteryFullIcon sx={{ color: "rgba(0, 168, 177, 0.65);" }} />
          <span style={{ color: "#ececed", fontSize: "0.9rem" }}>Battery:</span>
          {/* Dynamically display battery value */}
          <span style={{ color: "#48f7f5", fontSize: "0.9rem" }}>
            {battery || "N/A"}
          </span>

          {/* Adding some space */}
          <span style={{ margin: "0 10px" }}></span>

          {/* LoRaWAN Signal Indicator */}
          <span style={{ color: "#ececed", fontSize: "0.9rem" }}>LoRaWAN:</span>
          <div className="cellular-indicator">
            {/* Dynamically render signal dots */}
            {renderSignalDots()}
          </div>
        </div>
      </div>
    </>
  );
}

export default SensorStatus;
