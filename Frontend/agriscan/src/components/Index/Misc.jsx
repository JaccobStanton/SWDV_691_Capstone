import React, { useContext, useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import MiscSensorTable from "./MiscTable";

function Misc() {
  const { sensors, selectedSensor, setSelectedSensor, fetchSensors } =
    useContext(AppContext);

  useEffect(() => {
    // Fetch all sensors when the component loads
    fetchSensors();
  }, [fetchSensors]);

  const handleSensorChange = (event) => {
    const sensorId = event.target.value;
    const chosenSensor = sensors.find((sensor) => sensor.id === sensorId);
    setSelectedSensor(chosenSensor);
  };

  return (
    <>
      <div className="row-parent-box">
        <div className="title-box">Misc</div>
        <div className="misc-soil-table-parent">
          <div className="menu-parent">
            <select
              className="table-select-menu"
              value={selectedSensor?.id || ""}
              onChange={handleSensorChange}
            >
              <option value="">Select a sensor...</option>
              {sensors.map((sensor) => (
                <option key={sensor.id} value={sensor.id}>
                  {sensor.name || "Unnamed Sensor"}
                </option>
              ))}
            </select>
          </div>
          <div className="content-parent">
            <MiscSensorTable selectedSensor={selectedSensor} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Misc;
