import React from "react";
import "../../css/settings.css";

import UpdateBox from "../../components/Settings/Update";
import Search from "../../components/Settings/Search";
import RenameSystem from "../../components/Settings/Rename";

function Settings() {
  return (
    <>
      <div className="page-title-box">
        <h3>Settings</h3>
      </div>
      <div className="settings-container">
        {/* Top row of smaller boxes */}

        <UpdateBox />
        <RenameSystem />
        <Search />
        {/* Bottom row of smaller boxes //! when these 3 below are uncommented, the settings-box height is 33rem with all 6 boxes */}
        {/* <div className="setting-box">
          <div className="title-box">Connect to PheNode</div>
        </div>
        <div className="setting-box">
          <div className="title-box">Edge Computing</div>
        </div>
        <div className="setting-box">
          <div className="title-box">Solar Battery</div>
        </div> */}
      </div>
    </>
  );
}

export default Settings;
