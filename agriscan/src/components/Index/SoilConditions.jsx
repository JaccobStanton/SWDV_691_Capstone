import React, { useContext, useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import SoilSensorTable from "./SoilSensorTable";

function SoilConds() {
  const { sensors, selectedSensor, setSelectedSensor, fetchSensors } =
    useContext(AppContext);

  useEffect(() => {
    fetchSensors();
  }, [fetchSensors]);

  const handleSensorChange = (event) => {
    const sensorId = event.target.value;
    const chosenSensor = sensors.find((sensor) => sensor.id === sensorId);
    setSelectedSensor(chosenSensor);
  };

  return (
    <div className="row-parent-box">
      <div className="title-box">Soil Conditions</div>
      <div className="misc-soil-table-parent">
        <div className="menu-parent" style={{ marginBottom: "10px" }}>
          <select
            className="table-select-menu"
            value={selectedSensor?.id || ""}
            onChange={handleSensorChange}
          >
            <option value="" disabled>
              Select a sensor...
            </option>
            {sensors.map((sensor) => (
              <option key={sensor.id} value={sensor.id}>
                {sensor.name}
              </option>
            ))}
          </select>
        </div>
        <div className="content-parent">
          <SoilSensorTable selectedSensor={selectedSensor} />
        </div>
      </div>
    </div>
  );
}

export default SoilConds;
