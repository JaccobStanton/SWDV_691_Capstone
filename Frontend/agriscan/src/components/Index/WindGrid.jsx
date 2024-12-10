import React from "react";

function WindGrid({ windSpeed, windDirection, windGust, windChill }) {
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
        <span className="env-status-label">Wind Speed</span>
        <span className="env-status-value">{windSpeed || "N/A"} mph</span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <span className="env-status-label">Wind Direction</span>
        <span className="env-status-value">{windDirection || "N/A"}</span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <span className="env-status-label">Wind Gust</span>
        <span className="env-status-value">{windGust || "N/A"} mph</span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <span className="env-status-label">Wind Chill</span>
        <span className="env-status-value">{windChill || "N/A"} &#8457;</span>
      </div>
    </>
  );
}

export default WindGrid;
