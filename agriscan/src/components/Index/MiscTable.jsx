import React from "react";

const MiscSensorTable = ({ selectedSensor }) => {
  // If no sensor is selected or data is unavailable, show a fallback
  if (!selectedSensor || !selectedSensor.data) {
    return <div></div>;
  }

  return (
    <table className="misc-sensor-table">
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
            PAR
          </th>
          <th
            className="th"
            style={{
              padding: "8px",
              color: "#ccc",
              fontSize: "0.7rem",
            }}
          >
            PPFD
          </th>
          <th
            className="th"
            style={{
              padding: "8px",
              color: "#ccc",
              fontSize: "0.7rem",
            }}
          >
            DLI
          </th>
        </tr>
      </thead>
      <tbody>
        {selectedSensor.data.map((reading, index) => (
          <tr key={index} className="table-row">
            <td className="table-td">{reading.PAR} µmol/m²/s</td>
            <td className="table-td">{reading.PPFD} µmol/m²/s</td>
            <td className="table-td">{reading.DLI} mol/m²/day</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MiscSensorTable;
