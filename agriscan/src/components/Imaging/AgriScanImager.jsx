import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashCan,
  faFileArrowDown,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import {
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
} from "@mui/material";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { getImagesFromS3 } from "../../api/api"; // Replace the previous API method
import { toast, ToastContainer } from "react-toastify"; // Import react-toastify
import "react-toastify/dist/ReactToastify.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1200,
  height: 800,
  bgcolor: "white",
  boxShadow: 24,
};

function AgriScanImager() {
  const [missions, setMissions] = useState([]);
  const [selected, setSelected] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch data from S3 on component mount
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const data = await getImagesFromS3(); // Fetch from the updated /api/images route
        const missionsData = data.map((item, index) => ({
          id: index + 1,
          imageName: item.name || "N/A",
          date: item.date || "N/A",
          time: item.time || "N/A",
          imageType: "Not Analyzed",
          imageData: item.url, // URL of the image
          url: item.url,
        }));
        setMissions(missionsData);
      } catch (error) {
        console.error("Failed to fetch images from S3:", error);
        setMissions([]); // Set an empty array to avoid rendering issues
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  const handleOpen = (imageData) => {
    setSelectedImage(imageData);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = missions.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleTrashClick = () => {
    toast.error(
      "You do not have permission to delete this image. Contact your admin.",
      {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      }
    );
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <TableContainer
        component={Paper}
        sx={{
          height: "500px",
          width: "81vw",
          border: "1.5px solid #474a4e",
          boxShadow: "3px 3px 6px 0 rgba(0, 0, 0, 0.65)",
          borderRadius: "4px",
          overflowY: "auto",
          background: "#151617",
        }}
      >
        {loading ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <CircularProgress style={{ color: "rgba(0, 168, 177, 0.85)" }} />
            <p style={{ marginTop: "10px", color: "rgba(0, 168, 177, 0.85)" }}>
              Loading images, please wait...
            </p>
          </div>
        ) : (
          <Table aria-label="images table" sx={{ backgroundColor: "#151617" }}>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    indeterminate={
                      selected.length > 0 && selected.length < missions.length
                    }
                    checked={
                      missions.length > 0 && selected.length === missions.length
                    }
                    onChange={handleSelectAllClick}
                  />
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    fontSize: "1rem",
                    color: "rgba(0, 168, 177, 0.85)",
                  }}
                >
                  ID
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    fontSize: "1rem",
                    color: "rgba(0, 168, 177, 0.85)",
                  }}
                >
                  Image Name
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    fontSize: "1rem",
                    color: "rgba(0, 168, 177, 0.85)",
                  }}
                >
                  Date
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    fontSize: "1rem",
                    color: "rgba(0, 168, 177, 0.85)",
                  }}
                >
                  Time
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    fontSize: "1rem",
                    color: "rgba(0, 168, 177, 0.85)",
                  }}
                >
                  Image Type
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    fontSize: "1rem",
                    color: "rgba(0, 168, 177, 0.85)",
                  }}
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                {selectedImage && (
                  <img
                    src={selectedImage} // Direct URL for the image
                    alt="Large view"
                    style={{ maxWidth: "100%", height: "auto" }}
                  />
                )}
              </Box>
            </Modal>
            <TableBody>
              {missions.map((mission) => {
                const isItemSelected = isSelected(mission.id);
                return (
                  <TableRow
                    key={mission.id}
                    hover
                    selected={isItemSelected}
                    sx={{
                      "&:hover": { backgroundColor: "#474a4e" },
                    }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isItemSelected}
                        onChange={(event) => handleClick(event, mission.id)}
                      />
                    </TableCell>
                    <TableCell sx={{ color: "#ECECED" }}>
                      {mission.id}
                    </TableCell>
                    <TableCell sx={{ color: "#ECECED" }}>
                      {mission.imageName}
                    </TableCell>
                    <TableCell sx={{ color: "#ECECED" }}>
                      {mission.date}
                    </TableCell>
                    <TableCell sx={{ color: "#ECECED" }}>
                      {mission.time}
                    </TableCell>
                    <TableCell sx={{ color: "#ECECED" }}>
                      {mission.imageType}
                    </TableCell>
                    <TableCell>
                      <FontAwesomeIcon
                        icon={faMagnifyingGlass}
                        onClick={() => handleOpen(mission.url)}
                        style={{
                          marginRight: "10px",
                          cursor: "pointer",
                          color: "#ECECED",
                        }}
                      />
                      <a href={mission.url} download={mission.imageName}>
                        <FontAwesomeIcon
                          icon={faFileArrowDown}
                          style={{
                            marginRight: "10px",
                            cursor: "pointer",
                            color: "#ECECED",
                          }}
                        />
                      </a>
                      <FontAwesomeIcon
                        icon={faTrashCan}
                        style={{ cursor: "pointer", color: "#ECECED" }}
                        onClick={handleTrashClick}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </TableContainer>
      <ToastContainer />
    </div>
  );
}

export default AgriScanImager;
