import React from "react";

function AirGrid({ temperature, humidity, airPressure, vaporPressure }) {
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <span className="env-status-label">Temperature</span>
        <span className="env-status-value">{temperature || "N/A"} &#8457;</span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <span className="env-status-label">Humidity</span>
        <span className="env-status-value">{humidity || "N/A"}%</span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <span className="env-status-label">Air Pressure</span>
        <span className="env-status-value">{airPressure || "N/A"} kPa</span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <span className="env-status-label">Vapor Pressure</span>
        <span className="env-status-value">{vaporPressure || "N/A"} kPa</span>
      </div>
    </>
  );
}

export default AirGrid;
