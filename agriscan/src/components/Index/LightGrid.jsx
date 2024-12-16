import React from "react";

function LightGrid({
  solarRadiation,
  lux,
  lightningStrikes,
  lightningDistance,
}) {
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
        <span className="env-status-label">Solar Radiation</span>
        <span className="env-status-value">{solarRadiation || "N/A"} W/m²</span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <span className="env-status-label">LUX</span>
        <span className="env-status-value">{lux || "N/A"}</span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <span className="env-status-label">Lightning Strikes</span>
        <span className="env-status-value">{lightningStrikes || "N/A"}</span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <span className="env-status-label">Strike Distance</span>
        <span className="env-status-value">
          {lightningDistance || "N/A"} km
        </span>
      </div>
    </>
  );
}

export default LightGrid;
