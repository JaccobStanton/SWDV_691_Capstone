import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AgriScanLogo from "../../assets/svg/FieldDock-Logo.svg";
import HomePageNotActive from "../../assets/svg/index_not_active.svg";
import HomePageActive from "../../assets/svg/index_active.svg";
import ImagingNotActive from "../../assets/svg/imaging_not_active.svg";
import ImagingActive from "../../assets/svg/imaging_active.svg";
import DroneActive from "../../assets/svg/drone_active.svg";
import DroneNotActive from "../../assets/svg/drone_not_active.svg";
import SensorsNotActive from "../../assets/svg/wireless_not_active.svg";
import SensorsActive from "../../assets/svg/wireless_active.svg";
import SettingsNotActive from "../../assets/svg/settings_not_active.svg";
import SettingsActive from "../../assets/svg/settings_active.svg";
import SensorSettingsActive from "../../assets/svg/sensor_settings_active.svg";
import SensorSettingsNotActive from "../../assets/svg/sensor_settings_not_active.svg";
import ImagingSettingsNotActive from "../../assets/svg/imaging_settings_not_active.svg";
import ImagingSettingsActive from "../../assets/svg/imaging_settings_active.svg";
import DiagnosticsNotActive from "../../assets/svg/diagnostics_not_active.svg";
import DiagnosticsActive from "../../assets/svg/diagnostics_active.svg";
import UsersNotActive from "../../assets/svg/users_not_active.svg";
import UsersActive from "../../assets/svg/users_active.svg";
import DownloadNotActive from "../../assets/svg/download_not_active.svg";
import DownloadActive from "../../assets/svg/download_active.svg";

import { auth } from "../Login/auth/Firebase";
import { getSystems } from "../../api/api";
import { AppContext } from "../../context/AppContext";

function Navbar() {
  const { systems, selectedSystem, setSelectedSystem } = useContext(AppContext);
  const [userName, setUserName] = useState("User 0000 (----)");
  const [activeButton, setActiveButton] = useState(""); // State to track the active button

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserName(user.displayName || user.email || "Unnamed User");
      } else {
        setUserName("User 0000 (----)");
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    getSystems()
      .then((data) => setSystems(data))
      .catch((err) => console.error("Error fetching systems:", err));
  }, []);

  const handleSelectChange = (event) => {
    const selectedId = event.target.value;
    const selected = systems.find((system) => system.id === selectedId);
    setSelectedSystem(selected);
  };

  const navigate = useNavigate();

  const handleNavClick = (buttonName, navigationFn) => {
    setActiveButton(buttonName); // Set the active button
    navigationFn();
  };

  //---------------------------hovering over 10 boxes START------------------------------------
  const [isHovered1, setIsHovered1] = useState(false);
  const [isHovered2, setIsHovered2] = useState(false);
  const [isHovered3, setIsHovered3] = useState(false);
  const [isHovered4, setIsHovered4] = useState(false);
  const [isHovered5, setIsHovered5] = useState(false);
  const [isHovered6, setIsHovered6] = useState(false);
  const [isHovered7, setIsHovered7] = useState(false);
  const [isHovered8, setIsHovered8] = useState(false);
  const [isHovered9, setIsHovered9] = useState(false);
  const [isHovered10, setIsHovered10] = useState(false);
  //---------------------------hovering over 10 boxes END------------------------------------

  return (
    <>
      <div className="navbar-grid">
        <div className="row-content">
          <div className="top-row">
            <div>
              <img
                src={AgriScanLogo}
                className="logo-svg"
                alt="AgriScan Logo"
              />
            </div>
          </div>
          <div style={{ width: "100%" }}> {/* This div is the gap */}</div>
          <div className="menu-bottom-row">
            <select
              className="fielddock-select-menu"
              value={selectedSystem?.id || ""}
              onChange={handleSelectChange}
            >
              {systems.map((system) => (
                <option key={system.id} value={system.id}>
                  {system.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="row-content row-2-custom">
          <div className="row">
            <div className="user-action-container">
              <div className="active-user-name">{userName}</div>
              <button
                onClick={() => handleNavClick("logout", () => auth.signOut())}
                className="log-out-button"
              >
                Log Out
              </button>
            </div>
          </div>
          <div className="device-info">
            <div className="device-reading">Last reading taken:</div>
            <div className="device-date-time">
              {selectedSystem?.systemStatus?.lastReading || "Loading..."}
            </div>
            <div className="device-gps">GPS:</div>
            <div className="device-coordinates">
              {selectedSystem?.systemStatus?.latLong || "Loading..."}
            </div>
          </div>
        </div>

        <div className="row-content">
          <div className="row">
            <div className="screen-toggle-buttons-container-top">
              <div
                className={
                  activeButton === "home"
                    ? "toggle-button-hovered"
                    : "toggle-button"
                }
                onClick={() =>
                  handleNavClick("home", () => navigate("/Home-Page"))
                }
                title="Home"
                onMouseEnter={() => setIsHovered1(true)}
                onMouseLeave={() => setIsHovered1(false)}
              >
                <img
                  className="toggle-button-icon"
                  src={isHovered1 ? HomePageActive : HomePageNotActive}
                />
              </div>
              <div
                className={
                  activeButton === "imaging"
                    ? "toggle-button-hovered"
                    : "toggle-button"
                }
                onClick={() =>
                  handleNavClick("imaging", () => navigate("/Imaging"))
                }
                title="Imager"
                onMouseEnter={() => setIsHovered2(true)}
                onMouseLeave={() => setIsHovered2(false)}
              >
                <img
                  className="toggle-button-icon"
                  src={isHovered2 ? ImagingActive : ImagingNotActive}
                />
              </div>
              <div
                className={
                  activeButton === "drone"
                    ? "toggle-button-hovered"
                    : "toggle-button"
                }
                onClick={() =>
                  handleNavClick("drone", () => navigate("/Drone"))
                }
                title="Drone Dashboard"
                onMouseEnter={() => setIsHovered3(true)}
                onMouseLeave={() => setIsHovered3(false)}
              >
                <img
                  className="toggle-button-icon"
                  src={isHovered3 ? DroneActive : DroneNotActive}
                />
              </div>
              <div
                className={
                  activeButton === "sensors"
                    ? "toggle-button-hovered"
                    : "toggle-button"
                }
                onClick={() =>
                  handleNavClick("sensors", () => navigate("/Sensors"))
                }
                title="Wireless Sensors"
                onMouseEnter={() => setIsHovered4(true)}
                onMouseLeave={() => setIsHovered4(false)}
              >
                <img
                  className="" // No classname for some reason
                  src={isHovered4 ? SensorsActive : SensorsNotActive}
                />
              </div>
              <div
                className={
                  activeButton === "settings"
                    ? "toggle-button-hovered"
                    : "toggle-button"
                }
                onClick={() =>
                  handleNavClick("settings", () => navigate("/Settings"))
                }
                title="Settings"
                onMouseEnter={() => setIsHovered5(true)}
                onMouseLeave={() => setIsHovered5(false)}
              >
                <img
                  className="toggle-button-icon"
                  src={isHovered5 ? SettingsActive : SettingsNotActive}
                />
              </div>
            </div>
          </div>
          <div style={{ width: "100%" }}></div> {/* Gap */}
          <div className="row">
            <div className="screen-toggle-buttons-container-bottom">
              <div
                className={
                  activeButton === "sensorSettings"
                    ? "toggle-button-hovered"
                    : "toggle-button"
                }
                onClick={() =>
                  handleNavClick("sensorSettings", () =>
                    navigate("/Realtime-Settings")
                  )
                }
                title="Sensor Settings"
                onMouseEnter={() => setIsHovered6(true)}
                onMouseLeave={() => setIsHovered6(false)}
              >
                <img
                  className="toggle-button-icon"
                  src={
                    isHovered6 ? SensorSettingsActive : SensorSettingsNotActive
                  }
                />
              </div>
              <div
                className={
                  activeButton === "imagingSettings"
                    ? "toggle-button-hovered"
                    : "toggle-button"
                }
                onClick={() =>
                  handleNavClick("imagingSettings", () =>
                    navigate("/Imaging-Settings")
                  )
                }
                title="Imager Settings"
                onMouseEnter={() => setIsHovered7(true)}
                onMouseLeave={() => setIsHovered7(false)}
              >
                <img
                  className="toggle-button-icon"
                  src={
                    isHovered7
                      ? ImagingSettingsActive
                      : ImagingSettingsNotActive
                  }
                />
              </div>
              <div
                className={
                  activeButton === "diagnostics"
                    ? "toggle-button-hovered"
                    : "toggle-button"
                }
                onClick={() =>
                  handleNavClick("diagnostics", () => navigate("/Diagnostics"))
                }
                title="Diagnostics"
                onMouseEnter={() => setIsHovered8(true)}
                onMouseLeave={() => setIsHovered8(false)}
              >
                <img
                  className="toggle-button-icon"
                  src={isHovered8 ? DiagnosticsActive : DiagnosticsNotActive}
                />
              </div>
              <div
                className={
                  activeButton === "users"
                    ? "toggle-button-hovered"
                    : "toggle-button"
                }
                onClick={() =>
                  handleNavClick("users", () => navigate("/Users"))
                }
                title="Users"
                onMouseEnter={() => setIsHovered9(true)}
                onMouseLeave={() => setIsHovered9(false)}
              >
                <img
                  className="toggle-button-icon"
                  src={isHovered9 ? UsersActive : UsersNotActive}
                />
              </div>

              <div
                className={
                  activeButton === "download"
                    ? "toggle-button-hovered"
                    : "toggle-button"
                }
                onClick={() =>
                  handleNavClick("download", () => navigate("/Download"))
                }
                title="Download data"
                onMouseEnter={() => setIsHovered10(true)}
                onMouseLeave={() => setIsHovered10(false)}
              >
                <img
                  className="toggle-button-icon"
                  src={isHovered10 ? DownloadActive : DownloadNotActive}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
