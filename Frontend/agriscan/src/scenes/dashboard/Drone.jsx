// src/pages/Drone.jsx
import React, { useContext, useState, useEffect } from "react";
import "../../css/drone.css";
import DroneNetwork from "../../components/Drone/LandingPage/DroneNetwork";
import DroneLogs from "../../components/Drone/LandingPage/DroneLogs";
import PlannedMissionsParent from "../../components/Drone/LandingPage/PlannedMissionsParent";
import CompletedMissionsParent from "../../components/Drone/LandingPage/CompletedMissionsParent";
import DroneFieldDock from "../../assets/svg/Drone_FieldDock.svg";
import DroneStatus from "../../components/Drone/LandingPage/DroneStatus";

import { AppContext } from "../../context/AppContext";
import { updateDrone } from "../../api/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Drone() {
  const { selectedSystem, setSelectedSystem, updateDroneName } =
    useContext(AppContext);
  const [selectedDrone, setSelectedDrone] = useState(null);
  const [newDroneName, setNewDroneName] = useState("");

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

  const handleRenameDrone = async () => {
    if (!selectedDrone || !selectedSystem) return;
    try {
      await updateDrone(selectedSystem.id, selectedDrone.id, {
        name: newDroneName,
      });
      updateDroneName(selectedSystem.id, selectedDrone.id, newDroneName);
      toast.success("Drone renamed successfully!", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
      setNewDroneName("");
    } catch (error) {
      toast.error("Rename failed. Please try again.", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
      console.error("Rename failed:", error);
    }
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
              onChange={handleDropdownChange}
              value={selectedDrone?.id || ""}
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
            <div className="bottom-centered-row-container">
              <div className="title-box">Rename Drone</div>
              <div className="bottom-inner-content">
                <input
                  type="text"
                  placeholder="Enter Drone Name"
                  className="input-group-input"
                  value={newDroneName}
                  onChange={(e) => setNewDroneName(e.target.value)}
                />
                <button
                  className="rename-drone-button"
                  onClick={handleRenameDrone}
                >
                  Rename
                </button>
              </div>
            </div>
          </div>
        </div>
        <div>
          <PlannedMissionsParent />
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Drone;
