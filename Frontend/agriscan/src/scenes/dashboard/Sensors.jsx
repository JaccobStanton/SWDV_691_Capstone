// src/pages/Sensors.jsx
import React, { useContext, useState, useEffect } from "react";
import "../../css/sensors.css";
import SensorNetwork from "../../components/Sensors/SensorNetwork";
import GDD from "../../components/Index/GDD";
import SensorsFieldDock from "../../assets/svg/Wireless_Sensors.svg";
import SensorStatus from "../../components/Sensors/SensorStatus";
import EnvCond from "../../components/Index/EnvCond";
import PlugPlaySensors from "../../components/Sensors/PlugPlaySensors";
import { AppContext } from "../../context/AppContext";
import { updateSensor } from "../../api/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Sensors() {
  const { selectedSystem, setSelectedSystem, updateSensorName } =
    useContext(AppContext);
  const [selectedSensor, setSelectedSensor] = useState(null);
  const [newSensorName, setNewSensorName] = useState("");

  const sensors = selectedSystem?.sensors || [];

  // Automatically set the first sensor as the selected sensor when sensors change
  useEffect(() => {
    if (sensors.length > 0 && !selectedSensor) {
      setSelectedSensor(sensors[0]); // Select the first sensor by default
    }
  }, [sensors, selectedSensor]);

  const handleDropdownChange = (event) => {
    const selectedSensorId = event.target.value;
    const sensor = sensors.find((s) => s.id === selectedSensorId);
    setSelectedSensor(sensor);
  };

  // Extract battery and lora values from the selected sensor
  const battery = selectedSensor?.data?.[0]?.battery || "N/A";
  const lora = selectedSensor?.data?.[0]?.lora || 0;

  const handleRenameSensor = async () => {
    if (!selectedSensor || !selectedSystem) return;

    try {
      await updateSensor(selectedSystem.id, selectedSensor.id, {
        name: newSensorName,
      });
      updateSensorName(selectedSystem.id, selectedSensor.id, newSensorName);
      toast.success("Sensor renamed successfully!", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
      setNewSensorName("");
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
        <h3>Wireless Sensors</h3>
      </div>
      <div className="row-column-grid">
        {/* First row of items */}
        <div>
          <SensorNetwork />
        </div>
        <div className="row-menu-parent">
          {/* Sensor Selection Dropdown */}
          {selectedSystem && (
            <select
              className="menu-fill"
              onChange={handleDropdownChange}
              value={selectedSensor?.id || ""}
            >
              {sensors.map((sensor) => (
                <option key={sensor.id} value={sensor.id}>
                  {sensor.name || sensor.id}
                </option>
              ))}
            </select>
          )}
        </div>
        <div>
          <GDD />
        </div>

        {/* Second row that should appear as three columns directly under the first row */}
        <div>
          <PlugPlaySensors />
        </div>
        <div>
          <div className="top">
            <SensorStatus battery={battery} lora={lora} />
          </div>

          <div className="middle">
            <img
              className="sensor-page-img"
              src={SensorsFieldDock}
              alt="Field Dock"
            />
          </div>
          <div className="bottom">
            <div className="bottom-centered-row-container">
              <div className="title-box">Rename Sensor</div>
              <div className="bottom-inner-content">
                <input
                  type="text"
                  placeholder="Enter Sensor Name"
                  className="input-group-input"
                  value={newSensorName}
                  onChange={(e) => setNewSensorName(e.target.value)}
                />
                <button
                  className="rename-drone-button"
                  onClick={handleRenameSensor}
                >
                  Rename
                </button>
              </div>
            </div>
          </div>
        </div>
        <div>
          <EnvCond />
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Sensors;
