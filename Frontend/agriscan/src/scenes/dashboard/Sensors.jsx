import React, { useContext, useState, useEffect } from "react";
import "../../css/sensors.css";
import SensorNetwork from "../../components/Sensors/SensorNetwork";
import GDD from "../../components/Index/GDD";
import SensorsFieldDock from "../../assets/svg/Wireless_Sensors.svg";
import SensorStatus from "../../components/Sensors/SensorStatus";
import RenameSensors from "../../components/Sensors/RenameSensors";
import EnvCond from "../../components/Index/EnvCond";
import PlugPlaySensors from "../../components/Sensors/PlugPlaySensors";

// Import AppContext
import { AppContext } from "../../context/AppContext";

function Sensors() {
  const { selectedSystem, setSelectedSystem } = useContext(AppContext);
  const [selectedSensor, setSelectedSensor] = useState(null);

  const sensors = selectedSystem?.sensors || [];

  // Automatically set the first sensor as the selected sensor when sensors change
  useEffect(() => {
    if (sensors.length > 0 && !selectedSensor) {
      setSelectedSensor(sensors[0]); // Select the first sensor by default
    }
  }, [sensors, selectedSensor]);

  const handleDropdownChange = (event) => {
    const selectedSensorId = event.target.value;

    // Update the selected sensor
    const sensor = sensors.find((s) => s.id === selectedSensorId);
    setSelectedSensor(sensor);
  };

  // Function to handle renaming a sensor
  const handleRenameSensor = (sensorId, newName) => {
    const updatedSensors = selectedSystem?.sensors.map((sensor) =>
      sensor.id === sensorId ? { ...sensor, name: newName } : sensor
    );

    setSelectedSystem({
      ...selectedSystem,
      sensors: updatedSensors,
    });
  };

  // Extract battery and lora values from the selected sensor
  const battery = selectedSensor?.data?.[0]?.battery || "N/A"; // Assuming the first data entry
  const lora = selectedSensor?.data?.[0]?.lora || 0;

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
              onChange={handleDropdownChange} // Integrated handler
              value={selectedSensor?.id || ""} // Pre-select the first sensor
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
            {/* Pass battery and lora props */}
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
            <RenameSensors
              selectedSensor={selectedSensor}
              selectedSystem={selectedSystem}
              onRenameSensor={handleRenameSensor}
            />
          </div>
        </div>
        <div>
          <EnvCond />
        </div>
      </div>
    </>
  );
}

export default Sensors;
