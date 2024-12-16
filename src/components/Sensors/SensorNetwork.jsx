import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";

function SensorNetwork() {
  const { selectedSystem } = useContext(AppContext);

  // Calculate the number of sensors
  const sensorCount = selectedSystem?.sensors?.length || 0;

  // Determine the network status
  const missionStatus = selectedSystem?.systemStatus?.missionStatus
    ? "Connected"
    : "No Connection";

  return (
    <>
      <div className="row-parent-box">
        <div className="title-box">Wireless Sensor Network</div>
        <div className="status-columns">
          <div className="drone-status-column">
            <div className="status-item">
              <span className="status-label">Connected Sensors:</span>
              <span className="status-value">{sensorCount} Sensors</span>
            </div>
            <div className="status-item">
              <span className="status-label">Network Status:</span>
              <span className="status-value">{missionStatus}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SensorNetwork;
