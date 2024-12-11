import React, { useState } from "react";
import AgriScanImager from "../../components/Imaging/AgriScanImager";
import AnalyzedImages from "../../components/Imaging/AnalyzedImages";

function Imaging() {
  const [selectedOption, setSelectedOption] = useState(null);
  return (
    <>
      <div className="page-title-box">
        <h3>Imaging</h3>
      </div>
      <div className="button-container">
        {/* Add onClick handlers to set the selected option */}
        <button
          className="choice-button"
          onClick={() => setSelectedOption("Agriscan")}
        >
          AgriScan Imager
        </button>
        <button
          className="choice-button"
          onClick={() => setSelectedOption("Analyzed")}
        >
          Analyzed Images
        </button>
      </div>
      {/* Conditionally render the appropriate component based on the selected option */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "4rem",
        }}
      >
        {selectedOption === "Agriscan" && <AgriScanImager />}
        {selectedOption === "Analyzed" && <AnalyzedImages />}
      </div>
    </>
  );
}

export default Imaging;
