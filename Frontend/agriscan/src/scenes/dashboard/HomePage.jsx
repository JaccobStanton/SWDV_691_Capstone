import React from "react";
import "../../index.css";
import GDD from "../../components/Index/GDD";
import SystemStatus from "../../components/Index/SystemStatus";
import Rainfall from "../../components/Index/Rainfall";
import Misc from "../../components/Index/Misc";
import EnvConds from "../../components/Index/EnvCond";
import SoilConds from "../../components/Index/SoilConditions";
import DroneSVG from "../../assets/svg/Drone_FieldDock.svg";
import AgriScanBodySVG from "../../assets/svg/FieldDock_Body.svg";

function HomePage() {
  return (
    <>
      <div className="page-title-box">
        <h3>AgriScan Dashboard</h3>
      </div>
      <div className="main-grid">
        <GDD />
        <SystemStatus />
        <Rainfall />
        <Misc />
        <div className="second-row-child-container">
          <div className="svg-container">
            <img
              src={DroneSVG}
              className="drone-svg"
              alt="Agriscan drone diagram"
            />
          </div>
        </div>
        <EnvConds />
        <SoilConds />
        <div className="second-row-child-container">
          <div className="svg-container">
            <img
              src={AgriScanBodySVG}
              className="body-svg"
              alt="agriscan body"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
