import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";

function SystemStatus() {
  const { selectedSystem } = useContext(AppContext);

  if (!selectedSystem) {
    return <div>Loading System Status...</div>;
  }

  const { garageBattery, droneStatus, cellular } = selectedSystem.systemStatus;

  // Assuming drones is an array and the first drone's battery is shown
  const droneBattery = selectedSystem.drones?.[0]?.batteryPercentage || "N/A";

  // Generate the cellular signal dots
  const cellularIndicators = Array(4)
    .fill(false)
    .map((_, index) => index < cellular);

  return (
    <>
      <div className="row-parent-box">
        <div className="title-box">System Status</div>
        <div className="status-columns">
          <div className="status-column">
            <div className="status-item">
              <span className="status-label">Drone Battery:</span>
              <span className="status-value">{droneBattery}%</span>
            </div>
            <div className="status-item">
              <span className="status-label">Garage Battery:</span>
              <span className="status-value">
                {garageBattery ? `${garageBattery}%` : "5%"}
              </span>
            </div>
          </div>
          <div className="status-column">
            <div className="status-item">
              <span className="status-label">Drone Status:</span>
              <span
                className={`status-value status-${droneStatus.toLowerCase()}`}
              >
                {droneStatus}
              </span>
            </div>
            <div className="status-item">
              <span className="status-label">Cellular:</span>
              <div className="cellular-indicator">
                {cellularIndicators.map((active, idx) => (
                  <span
                    key={idx}
                    className={`signal-dot ${active ? "active" : ""}`}
                  ></span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SystemStatus;
