import React from "react";
import { Box } from "@mui/material";

function Table({ sensorData }) {
  // Function to render placeholder rows if no data is available
  const renderPlaceholderRows = () => {
    const placeholderRows = Array.from({ length: 34 }); // Create 5 empty rows
    return placeholderRows.map((_, index) => (
      <tr key={index}>
        <td className="table-td">-</td>
        <td className="table-td">-</td>
        <td className="table-td">-</td>
        <td className="table-td">-</td>
      </tr>
    ));
  };

  return (
    <Box
      sx={{
        marginTop: "1rem",
        width: "100%",
        overflow: "auto",
      }}
    >
      <div
        style={{
          maxHeight: "450px",
          overflow: "auto",
          fontSize: "0.65rem",
          color: "rgba(0, 168, 177, 0.65)",
        }}
      >
        <table style={{ width: "100%", tableLayout: "fixed" }}>
          <thead>
            <tr>
              <th className="table-th">
                <div>Soil</div>
                <div>Depth</div>
              </th>
              <th className="table-th">
                <div>Soil</div>
                <div>Moisture</div>
              </th>
              <th className="table-th">
                <div>Soil</div>
                <div>Temperature</div>
              </th>
              <th className="table-th">
                <div>Electrical</div>
                <div>Conductivity</div>
              </th>
            </tr>
          </thead>

          <tbody>
            {sensorData && sensorData.length > 0
              ? sensorData.map((entry, index) => (
                  <tr key={index}>
                    <td className="table-td">{entry.depth || "-"}</td>
                    <td className="table-td">{entry.soilMoisture || "-"}</td>
                    <td className="table-td">{entry.soilTemperature || "-"}</td>
                    <td className="table-td">
                      {entry.electricalConductivity || "-"}
                    </td>
                  </tr>
                ))
              : renderPlaceholderRows()}
          </tbody>
        </table>
      </div>
    </Box>
  );
}

export default Table;
