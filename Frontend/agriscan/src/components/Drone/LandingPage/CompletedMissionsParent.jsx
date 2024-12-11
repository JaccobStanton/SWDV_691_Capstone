import React, { useContext } from "react";
import { AppContext } from "../../../context/AppContext"; // Import the AppContext
import NoMissionsPlanned from "./NoMissions";
import CompletedMissionsCard from "./CompletedMissionCard";

function CompletedMissionsParent() {
  // Access systems from the AppContext
  const { selectedSystem } = useContext(AppContext);

  // Extract missions from the selected system
  const missions = selectedSystem?.missions || [];

  return (
    <div className="row-parent-box environmental-conditions-box">
      <div className="title-box">Completed Missions</div>
      <div
        style={{
          height: "500px",
          display: "flex",
          flexDirection: "column",
          width: "90%",
        }}
      >
        <div
          style={{
            height: "500px",
            overflowY: "auto",
            padding: "10px 5px",
          }}
        >
          {missions.length === 0 ? (
            <NoMissionsPlanned />
          ) : (
            <CompletedMissionsCard missions={missions} />
          )}
        </div>
        <div
          style={{
            height: "15%",
            width: "100%",
            borderTop: "3px solid #474a4e",
            background: "transparent",
            display: "flex",
            justifyContent: "center", // Centers the buttons horizontally
            alignItems: "center", // Centers the buttons vertically
            gap: "45px", // Adds space between the two buttons
          }}
        >
          <button className="view-plan-button">View</button>
        </div>
      </div>
    </div>
  );
}

export default CompletedMissionsParent;
