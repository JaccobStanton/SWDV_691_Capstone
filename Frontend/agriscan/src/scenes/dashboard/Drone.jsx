import React, { useContext, useState, useEffect } from "react";
import "../../css/drone.css";
import DroneNetwork from "../../components/Drone/LandingPage/DroneNetwork";
import DroneLogs from "../../components/Drone/LandingPage/DroneLogs";
import PlannedMissionsParent from "../../components/Drone/LandingPage/PlannedMissionsParent";
import CompletedMissionsParent from "../../components/Drone/LandingPage/CompletedMissionsParent";
import DroneFieldDock from "../../assets/svg/Drone_FieldDock.svg";
import RenameDrone from "../../components/Drone/LandingPage/RenameDrone";
import DroneStatus from "../../components/Drone/LandingPage/DroneStatus";

// Import AppContext
import { AppContext } from "../../context/AppContext";

function Drone() {
  // Access context values
  const { selectedSystem, setSelectedSystem } = useContext(AppContext);
  const [selectedDrone, setSelectedDrone] = useState(null);

  const drones = selectedSystem?.drones || [];
  const missionStatus =
    selectedSystem?.systemStatus?.missionStatus || "Unknown";
  const connectedDronesCount = drones.length;

  // Automatically set the first drone as the selected drone when drones change
  useEffect(() => {
    if (drones.length > 0 && !selectedDrone) {
      setSelectedDrone(drones[0]); // Select the first drone by default
    }
  }, [drones, selectedDrone]);

  const handleDropdownChange = (event) => {
    const selectedDroneId = event.target.value;

    // Update the selected drone
    const drone = drones.find((d) => d.id === selectedDroneId);
    setSelectedDrone(drone);
  };

  // Function to handle renaming a drone
  const handleRenameDrone = (droneId, newName) => {
    const updatedDrones = selectedSystem?.drones.map((drone) =>
      drone.id === droneId ? { ...drone, name: newName } : drone
    );

    setSelectedSystem({
      ...selectedSystem,
      drones: updatedDrones,
    });
  };

  return (
    <>
      <div className="page-title-box">
        <h3>Mission Control</h3>
      </div>
      <div className="row-column-grid">
        {/* First row of items */}
        <DroneNetwork
          missionStatus={missionStatus}
          connectedDronesCount={connectedDronesCount}
        />
        <div className="row-menu-parent">
          {/* Drone Selection Dropdown */}
          {selectedSystem && (
            <select
              className="menu-fill"
              onChange={handleDropdownChange} // Integrated handler
              value={selectedDrone?.id || ""} // Pre-select the first drone
            >
              {drones.map((drone) => (
                <option key={drone.id} value={drone.id}>
                  {drone.name}
                </option>
              ))}
            </select>
          )}
        </div>
        <DroneLogs />

        {/* Second row that should appear as three columns directly under the first row */}
        <div>
          <CompletedMissionsParent />
        </div>
        <div>
          <div className="top">
            <DroneStatus
              batteryPercentage={selectedDrone?.batteryPercentage || "N/A"}
              signal={selectedDrone?.signal || "N/A"}
            />
          </div>
          <div className="middle">
            <img className="page-img" src={DroneFieldDock} alt="Field Dock" />
          </div>
          <div className="bottom">
            <RenameDrone
              selectedDrone={selectedDrone}
              selectedSystem={selectedSystem} // Add this line
              onRenameDrone={handleRenameDrone}
            />
          </div>
        </div>
        <div>
          <PlannedMissionsParent />
        </div>
      </div>
    </>
  );
}

export default Drone;
