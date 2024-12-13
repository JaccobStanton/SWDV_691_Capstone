import React from "react";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../css/realtime-settings.css";

function RealtimeSettings() {
  const [checked, setChecked] = React.useState({
    first: false,
    second: false,
  });

  const handleChange = (event) => {
    setChecked({
      ...checked,
      [event.target.name]: event.target.checked,
    });
  };

  const handleSavePreferences = () => {
    toast.error(
      "You do not have admin privileges to make changes to your sensor settings. Contact an admin.",
      {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      }
    );
  };

  const checkboxStyles = {
    color: "rgba(0, 168, 177, 0.65);", // Color when unchecked
    "&.Mui-checked": {
      color: "#48f7f5", // Color when checked
    },
  };

  return (
    <>
      <ToastContainer />
      <div className="page-title-box">
        <h3>Sensor Measurement Settings</h3>
      </div>

      <div className="two-column-grid">
        {/* First row of boxes */}
        <div className="grid-row">
          <div className="box">
            <div className="content-container">
              <p>
                Select time interval for: temperature, humidity, air pressure,
                lux, air quality (if integrated)
              </p>
              <select>
                <option>Select time interval...</option>
                {/* Additional options here */}
              </select>
            </div>
          </div>
          <div className="box">
            <div className="content-container">
              <p>
                Select time interval for: temperature, humidity, air pressure,
                lux, air quality (if integrated)
              </p>
              <select>
                <option>Select time interval...</option>
                {/* Additional options here */}
              </select>
            </div>
          </div>
        </div>

        {/* Second row of boxes */}
        <div className="grid-row">
          <div className="box">
            <div className="content-container">
              <p>
                Select time interval for: temperature, humidity, air pressure,
                lux, air quality (if integrated)
              </p>
              <select>
                <option>Select time interval...</option>
                {/* Additional options here */}
              </select>
            </div>
          </div>
          <div className="box">
            <div className="content-container">
              <p>
                Select time interval for: temperature, humidity, air pressure,
                lux, air quality (if integrated)
              </p>
              <select>
                <option>Select time interval...</option>
                {/* Additional options here */}
              </select>
            </div>
          </div>
        </div>

        {/* Third row of boxes */}
        <div className="grid-row">
          <div className="box">
            <div className="content-container">
              <p>
                Select time interval for: temperature, humidity, air pressure,
                lux, air quality (if integrated)
              </p>
              <select>
                <option>Select time interval...</option>
                {/* Additional options here */}
              </select>
            </div>
          </div>
          <div className="box">
            <div className="content-container">
              <p>
                Select time interval for: temperature, humidity, air pressure,
                lux, air quality (if integrated)
              </p>
              <select>
                <option>Select time interval...</option>
                {/* Additional options here */}
              </select>
            </div>
          </div>
        </div>

        {/* Full-width box within the grid */}
        <div className="full-width-box">
          <div className="checkbox-container">
            <FormControlLabel
              control={
                <Checkbox
                  sx={checkboxStyles}
                  checked={checked.first}
                  onChange={handleChange}
                  name="first"
                />
              }
              label="
              Apply the above imaging settings to all AgriScan systems in this group"
              sx={{
                "& .MuiFormControlLabel-label": {
                  fontSize: "0.87rem",
                  color: "#FFF",
                },
              }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  sx={checkboxStyles}
                  checked={checked.second}
                  onChange={handleChange}
                  name="second"
                />
              }
              label="Apply the above imaging settings to all AgriScan systems in this account"
              sx={{
                "& .MuiFormControlLabel-label": {
                  fontSize: "0.87rem",
                  color: "#FFF",
                },
              }}
            />
          </div>
          <button className="save-button" onClick={handleSavePreferences}>
            Save all imaging preferences
          </button>
        </div>
      </div>
    </>
  );
}

export default RealtimeSettings;
