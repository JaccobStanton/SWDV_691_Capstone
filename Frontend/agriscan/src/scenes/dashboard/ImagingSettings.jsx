import React from "react";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import "../../css/imager-settings.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ImagingSettings() {
  const options = ["Option 1", "Option 2", "Option 3"];
  const [checked, setChecked] = React.useState({
    first: false,
    second: false,
  });

  // Handle change for checkboxes
  const handleChange = (event) => {
    setChecked({
      ...checked,
      [event.target.name]: event.target.checked,
    });
  };

  const handleSavePreferences = () => {
    toast.error(
      "You do not have admin privileges to make changes to your imaging settings. Contact an admin.",
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
    color: "rgba(0, 168, 177, 0.65); !important",
    "&.Mui-checked": {
      color: "#48f7f5 !important",
    },
  };

  return (
    <>
      <ToastContainer />
      <div className="page-title-box">
        <h3>Imager Settings</h3>
      </div>

      <div className="two-column-grid">
        {/* First row of boxes */}
        <div className="grid-row">
          <div className="image-processing-box">
            <div className="title-box">Image Processing</div>
            <div className="grid-2x2">
              <div className="grid-item-left">
                <p className="downsample-p">
                  Downsample raw images to the following resolution before
                  sending to the cloud:
                </p>
              </div>
              <div className="grid-item-right">
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
              </div>
              <div className="grid-item-left">
                <select className="compressed-resolution-select-menu">
                  <option>Select compressed resolution...</option>
                </select>
              </div>
              <div className="grid-item-right-bottom">
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
              </div>
            </div>
          </div>
        </div>

        {/* Second row */}
        <div className="grid-row">
          <div className="image-frequency-box">
            <div className="title-box">Imaging Frequency</div>
            <div className="two-column-container">
              {/* First column */}
              <div className="column">
                <div className="checkbox-top-centered">
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
                  Limited Imaging (AgriScan on solar power)"
                    sx={{
                      "& .MuiFormControlLabel-label": {
                        fontSize: "0.87rem",
                        color: "#FFF",
                      },
                    }}
                  />
                </div>
                <div className="mini-grid">
                  <div className="grid-item">
                    <p className="left-aligned-text">
                      Select number of images to capture per day:
                    </p>
                  </div>
                  <div className="grid-item">
                    <select className=" select-menu">
                      <option value="">Select number...</option>
                      {/* Add more options here */}
                    </select>
                  </div>
                  <div className="grid-item">
                    <p className="left-aligned-text">Select image:</p>
                  </div>
                  <div className="grid-item">
                    <select className="select-menu">
                      <option value="">Select image...</option>
                      {/* Add more options here */}
                    </select>
                  </div>
                  <div className="grid-item">
                    <p className="left-aligned-text">
                      Enter time of day to capture selected image:
                    </p>
                  </div>
                  <div className="grid-item">
                    <input
                      type="text"
                      className="grid-item input-military-time"
                      placeholder="00:00 (military time only)"
                    />
                  </div>
                </div>
              </div>
              {/* Second column */}
              <div className="column">
                <div className="checkbox-top-centered">
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
                  Continuous Imaging (AgriScan plugged in)"
                    sx={{
                      "& .MuiFormControlLabel-label": {
                        fontSize: "0.87rem",
                        color: "#FFF",
                      },
                    }}
                  />
                </div>
                <div className="mini-grid">
                  <div className="grid-item">
                    <p className="left-aligned-text">
                      Select time for initial daily image capture:
                    </p>
                  </div>
                  <div className="grid-item">
                    <input
                      type="text"
                      className="grid-item input-military-time"
                      placeholder="00:00 (military time only)"
                    />
                  </div>
                  <div className="grid-item">
                    <p className="left-aligned-text">
                      Select time for final daily image capture:
                    </p>
                  </div>
                  <div className="grid-item">
                    <input
                      type="text"
                      className="grid-item input-military-time"
                      placeholder="00:00 (military time only)"
                    />
                  </div>
                  <div className="grid-item">
                    <p className="left-aligned-text">
                      Select time interval for subsequent image capture:
                    </p>
                  </div>
                  <div className="grid-item">
                    <select className=" select-menu">
                      <option value="">Select time interval...</option>
                      {/* Add more options here */}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Third row of boxes */}
        <div className="grid-row">
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
      </div>
    </>
  );
}

export default ImagingSettings;
