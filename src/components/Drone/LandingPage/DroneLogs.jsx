import React from "react";
import { useNavigate } from "react-router-dom";

function DroneLogs() {
  const navigate = useNavigate();

  const navToDroneLogs = () => {
    navigate("/drone-logs");
  };
  return (
    <>
      <div className="row-parent-box">
        <div className="title-box">AgriScan Drone Logs</div>
        <div className="input-group">
          <input type="text" id="start-date" placeholder="Start Date" />
          <input type="text" id="end-date" placeholder="End Date" />
          <button onClick={navToDroneLogs} type="button">
            Logs
          </button>
        </div>
      </div>
    </>
  );
}

export default DroneLogs;
