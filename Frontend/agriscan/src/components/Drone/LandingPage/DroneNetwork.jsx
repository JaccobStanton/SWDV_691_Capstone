import React from "react";

function DroneNetwork({ missionStatus, connectedDronesCount }) {
  return (
    <>
      <div className="row-parent-box">
        <div className="title-box">AgriScan Drone Network</div>
        <div className="status-columns">
          <div className="drone-status-column">
            <div className="status-item">
              <span className="status-label">Connected Drones:</span>
              <span className="status-value">{connectedDronesCount}</span>
            </div>
            <div className="status-item">
              <span className="status-label">Mission Status:</span>
              <span className="status-value">{missionStatus}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DroneNetwork;
