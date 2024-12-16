import React from "react";
import GrowDegreeButton from "./GrowDegreeButton";

function GDD() {
  return (
    <>
      <div className="row-parent-box">
        <div className="title-box">Growing Degree Days</div>
        <input
          style={{
            cursor: "pointer",
            border: "1px solid #797979",
            color: "#48f7f5",
            fontWeight: "bold",
            width: "25%",
            height: "40px",
            textAlign: "center",
            borderRadius: "4px",
            backgroundColor: "transparent",
            margin: "0 8px",
            fontSize: "0.75rem",
          }}
          type="text"
          id="start-date"
          placeholder="Start Date"
        />
        <input
          style={{
            cursor: "pointer",
            border: "1px solid #797979",
            color: "#48f7f5",
            fontWeight: "bold",
            width: "25%",
            height: "40px",
            textAlign: "center",
            borderRadius: "4px",
            backgroundColor: "transparent",
            margin: "0 8px",
            fontSize: "0.75rem",
          }}
          type="text"
          id="end-date"
          placeholder="End Date"
        />
        <GrowDegreeButton />
      </div>
    </>
  );
}

export default GDD;
