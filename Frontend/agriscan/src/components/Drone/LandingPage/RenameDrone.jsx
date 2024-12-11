import React, { useState } from "react";
import { toast } from "react-toastify"; // For toast notifications
import "react-toastify/dist/ReactToastify.css";
import { updateDrone } from "../../../api/api"; // Import the API function

function RenameDrone({ selectedDrone, selectedSystem, onRenameDrone }) {
  const [newName, setNewName] = useState("");

  const handleRename = async () => {
    console.log("Rename button clicked");
    console.log("Selected Drone:", selectedDrone);
    console.log("New Name:", newName);

    if (!selectedDrone) {
      console.log("No drone selected");
      toast.error("No drone selected for renaming");
      return;
    }

    if (!newName.trim()) {
      console.log("New name is empty");
      toast.error("Drone name cannot be empty");
      return;
    }

    try {
      console.log(
        `Making API call to update drone: System ID - ${selectedSystem.id}, Drone ID - ${selectedDrone.id}`
      );

      // Call API to update drone
      const updatedDrone = await updateDrone(
        selectedSystem.id,
        selectedDrone.id,
        {
          name: newName,
        }
      );

      console.log("API call successful, updated drone:", updatedDrone);

      // Update the state in the parent component
      onRenameDrone(updatedDrone.id, updatedDrone.name);

      // Show success message
      toast.success("Drone name successfully changed");

      // Clear the input field
      setNewName("");
    } catch (error) {
      console.error("Failed to rename drone:", error);
      toast.error("Failed to rename drone");
    }
  };

  return (
    <>
      <div className="bottom-centered-row-container">
        <div className="title-box">Rename Drone</div>
        <div className="bottom-inner-content">
          <input
            type="text"
            placeholder={selectedDrone?.name || "Enter Drone Name"}
            className="input-group-input"
            value={newName}
            onChange={(e) => {
              console.log("Input changed:", e.target.value);
              setNewName(e.target.value);
            }}
          />
          <button
            className="rename-drone-button"
            onClick={() => {
              console.log("Rename button clicked");
              handleRename();
            }}
          >
            Rename
          </button>
        </div>
      </div>
    </>
  );
}

export default RenameDrone;
