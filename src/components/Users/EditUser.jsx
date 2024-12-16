import React from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EditUser() {
  const handleEditUserClick = () => {
    // Show a red toast with the error message
    toast.error("You do not have permissions to edit a user.", {
      position: "bottom-right", // Position of the toast
      autoClose: 5000, // Close automatically after 5 seconds
    });
  };

  return (
    <>
      <button className="choice-button" onClick={handleEditUserClick}>
        Edit User
      </button>

      {/* Toast Container */}
      <ToastContainer />
    </>
  );
}

export default EditUser;
