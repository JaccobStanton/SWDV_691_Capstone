import React, { useState, useEffect } from "react";
import "../../index.css";
import GDD from "../../components/Index/GDD";
import SystemStatus from "../../components/Index/SystemStatus";
import Rainfall from "../../components/Index/Rainfall";
import Misc from "../../components/Index/Misc";
import EnvConds from "../../components/Index/EnvCond";
import SoilConds from "../../components/Index/SoilConditions";
import DroneSVG from "../../assets/svg/Drone_FieldDock.svg";
import AgriScanBodySVG from "../../assets/svg/FieldDock_Body.svg";
import { Modal, Box } from "@mui/material";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "51.5%",
  borderRadius: "4px",
  transform: "translate(-50%, -50%)",
  width: "35%", // 40% for bigger than 1700 screens
  height: "30%", // 45% for bigger than 1700 screens
  border: "1.5px solid #e0e0e0",
  boxShadow: "0 7px 5px 1px rgba(0, 0, 0, 0.2)",
  p: 4,
  background: "linear-gradient(1deg, rgba(0, 0, 0, 0.95), rgb(27, 27, 27))",
  display: "flex",
  flexDirection: "row",
};

function HomePage() {
  const [open, setOpen] = useState(true); // Set to true to show the modal on mount

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              style={{
                color: "#797979",
                fontSize: "1.7rem",
                display: "flex",
                justifyContent: "center",
                opacity: "55%",
              }}
            >
              Welcome to AgriScan!
            </div>
            <div
              style={{
                color: "#797979",
                fontSize: "1.2rem",
                display: "flex",
                justifyContent: "center",
                opacity: "55%",
                marginTop: "10px",
              }}
            >
              Each system has different drones/sensors connected to it.
            </div>
            <div
              style={{
                color: "#797979",
                fontSize: "1rem",
                display: "flex",
                justifyContent: "center",
                opacity: "55%",
                marginTop: "10px",
              }}
            >
              Use the dropdown menus to select your sensors/drones!
            </div>
            <button
              style={{ marginTop: "30px" }}
              onClick={handleClose}
              className="view-plan-button"
            >
              Continue
            </button>
          </div>
        </Box>
      </Modal>

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
