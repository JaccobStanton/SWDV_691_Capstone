import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import Table from "./Table";

function PlugPlaySensors() {
  const { selectedSystem } = useContext(AppContext); // Get the sensors from the context
  const sensors = selectedSystem?.sensors || []; // Default to an empty array if no sensors exist

  const [selectedSensorData, setSelectedSensorData] = useState([]); // State to hold selected sensor's data

  const handleDropdownChange = (event) => {
    const selectedSensorId = event.target.value;
    const sensor = sensors.find((s) => s.id === selectedSensorId);

    if (sensor) {
      setSelectedSensorData(sensor.data || []); // Update the selected sensor's data
    } else {
      setSelectedSensorData([]); // Clear data if no sensor is selected
    }
  };

  return (
    <>
      <div className="row-parent-box environmental-conditions-box">
        <div className="title-box">Plug and Play Sensors</div>
        <div
          style={{
            height: "500px",
            width: "95%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div className="sensor-menu-parent">
            {/* Dropdown for selecting a sensor */}
            <select
              className="table-select-menu"
              onChange={handleDropdownChange}
            >
              <option value="">Select a sensor...</option>
              {sensors.map((sensor) => (
                <option key={sensor.id} value={sensor.id}>
                  {sensor.name || sensor.id} {/* Show the name or id */}
                </option>
              ))}
            </select>
          </div>
          <div className="table-container" style={{ width: "100%" }}>
            {/* Pass selected sensor data to Table component */}
            <Table sensorData={selectedSensorData} />
          </div>
        </div>
      </div>
    </>
  );
}

export default PlugPlaySensors;
