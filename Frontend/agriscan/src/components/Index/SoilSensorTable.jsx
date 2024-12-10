import React from "react";

const SoilSensorTable = ({ selectedSensor }) => {
  // If no sensor is selected or data is unavailable, show a fallback
  if (!selectedSensor || !selectedSensor.data) {
    return <div></div>;
  }

  return (
    <table className="soil-sensor-table">
      <thead>
        <tr>
          <th
            className="th"
            style={{
              padding: "8px",
              color: "#ccc",
              fontSize: "0.7rem",
            }}
          >
            <div>Soil</div>
            <div>Depth</div>
          </th>
          <th
            className="th"
            style={{
              padding: "8px",
              color: "#ccc",
              fontSize: "0.7rem",
            }}
          >
            Soil Moisture
          </th>
          <th
            className="th"
            style={{
              padding: "8px",
              color: "#ccc",
              fontSize: "0.7rem",
            }}
          >
            Soil Temperature
          </th>
          <th
            className="th"
            style={{
              padding: "8px",
              color: "#ccc",
              fontSize: "0.7rem",
            }}
          >
            Electrical Conductivity
          </th>
        </tr>
      </thead>
      <tbody>
        {selectedSensor.data.map((reading, index) => (
          <tr key={index} className="table-row">
            <td className="table-td">{reading.depth}</td>
            <td className="table-td">{reading.soilMoisture}%</td>
            <td className="table-td">{reading.soilTemperature}°C</td>
            <td className="table-td">{reading.electricalConductivity} dS/m</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SoilSensorTable;
