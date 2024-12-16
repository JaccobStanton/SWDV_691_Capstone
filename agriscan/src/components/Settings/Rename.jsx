import React, { useState } from "react";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { updateSystem } from "../../api/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function RenameSystem() {
  const { selectedSystem, updateSystemName } = useContext(AppContext);
  const [newName, setNewName] = useState("");

  const handleRename = async () => {
    try {
      await updateSystem(selectedSystem.id, { name: newName });
      updateSystemName(selectedSystem.id, newName); // Update context
      toast.success("Rename successful!", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
    } catch (error) {
      toast.error("Rename failed. Please try again.", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
      console.error("Rename failed:", error);
    }
  };

  return (
    <div className="setting-box">
      <div className="title-box">Rename AgriScan System</div>
      <div className="inner-box">
        <div className="box-item text-center" style={{ fontStyle: "italic" }}>
          Current System: {selectedSystem?.name || "Loading..."}
        </div>
        <div className="box-item">
          <input
            type="text"
            className="text-input"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Enter new name"
            style={{ color: "white" }}
          />
        </div>
        <div className="box-item button-container">
          <button className="rename-button" onClick={handleRename}>
            Rename
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default RenameSystem;
