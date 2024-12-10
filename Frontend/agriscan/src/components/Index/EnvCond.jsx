import React, { useContext } from "react";
import WindGrid from "./WindGrid";
import AirGrid from "./AirGrid";
import LightGrid from "./LightGrid";
import { AppContext } from "../../context/AppContext"; // Import AppContext

function EnvConds() {
  const { selectedSystem } = useContext(AppContext);

  if (!selectedSystem) {
    return <div>Loading Environmental Conditions...</div>;
  }

  // Extract environmental conditions data
  const {
    temperature,
    humidity,
    windDirection,
    windSpeed,
    windGust,
    windChill,
    vaporPressure,
    airPressure,
    solarRadiation,
    lux,
  } = selectedSystem.environmentalConditions[0];

  return (
    <>
      <div className="row-parent-box environmental-conditions-box">
        <div className="title-box">Environmental Conditions</div>
        <div
          style={{
            height: "500px",
            width: "90%",
            display: "flex",
            flexDirection: "column", // Stack children vertically
            justifyContent: "space-around", // Adjust for spacing around the child divs
            alignItems: "center",
          }}
        >
          {/* Wind Section */}
          <div
            style={{
              width: "100%",
              height: "25%",
              borderTop: "0.5px solid #797979",
              marginTop: "20px",
              position: "relative",
            }}
          >
            <div className="env-title-box">Wind</div>
            <div className="env-grid">
              <WindGrid
                windDirection={windDirection}
                windSpeed={windSpeed}
                windGust={windGust}
                windChill={windChill}
              />
            </div>
          </div>

          {/* Air Section */}
          <div
            style={{
              width: "100%",
              height: "25%",
              borderTop: "0.5px solid #797979",
              position: "relative",
            }}
          >
            <div className="env-title-box-air">Air</div>
            <div className="env-grid">
              <AirGrid
                temperature={temperature}
                humidity={humidity}
                vaporPressure={vaporPressure}
                airPressure={airPressure}
              />
            </div>
          </div>

          {/* Light Section */}
          <div
            style={{
              width: "100%",
              height: "25%",
              borderTop: "0.5px solid #797979",
              position: "relative",
            }}
          >
            <div className="env-title-box-light">Light</div>
            <div className="env-grid">
              <LightGrid solarRadiation={solarRadiation} lux={lux} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EnvConds;
