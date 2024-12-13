import React from "react";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UpdateBox() {
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

  const handleUpdateClick = () => {
    toast.error(
      "You do not have the permissions to update, please contact your admin",
      {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      }
    );
  };

  const checkboxStyles = {
    color: "rgba(0, 168, 177, 0.65);",
    "&.Mui-checked": {
      color: "#48f7f5",
    },
  };

  const iconStyle = {
    color: "#48f7f5",
    marginRight: "5px",
    fontSize: "inherit",
  };

  return (
    <div className="setting-box">
      <ToastContainer />
      <div className="title-box">Software Update</div>
      <div className="software-inner-box">
        <div className="box-item text-center">Pending software update</div>
        <div className="box-item">
          <FormControlLabel
            control={
              <Checkbox
                sx={checkboxStyles}
                checked={checked.first}
                onChange={handleChange}
                name="first"
              />
            }
            label="AgriScan v0.5.0 is ready to be installed"
            sx={{
              "& .MuiFormControlLabel-label": {
                fontSize: "0.87rem",
                color: "#FFF",
              },
            }}
          />
        </div>
        <div className="box-item button-container">
          <button className="rename-button" onClick={handleUpdateClick}>
            <FileDownloadIcon style={iconStyle} />
            Update
          </button>
        </div>
      </div>
    </div>
  );
}

export default UpdateBox;