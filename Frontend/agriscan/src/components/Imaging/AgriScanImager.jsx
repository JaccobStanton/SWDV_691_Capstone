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
} from "@mui/material";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { getNotAnalyzedImages } from "../../api/api"; // Ensure correct import path

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

  // Fetch data when the component is mounted
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getNotAnalyzedImages(); // Ensure `getImages` fetches from `/api/images/not-analyzed`

        // Directly map the returned array to match table rows
        const missionsData = data.map((item, index) => ({
          id: index + 1, // Add a sequential ID for frontend display
          imageName: item.name || "N/A", // Use fallback if `name` is missing
          date: item.date || "N/A", // Use fallback if `date` is missing
          time: item.time || "N/A", // Use fallback if `time` is missing
          imageType: item.imgType || "N/A", // Use fallback if `imgType` is missing
          imageData: item.url, // Base64 or URL to display
          url: item.url, // Include raw URL if needed
        }));
        setMissions(missionsData);
      } catch (error) {
        console.error("Failed to fetch images", error);
      }
    };

    fetchData();
  }, []);
  console.log("Missions data:", missions);

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
              {/* Display the selected image in a larger view */}
              {selectedImage && (
                <img
                  src={`data:image/png;base64,${selectedImage}`}
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
                  <TableCell sx={{ color: "#ECECED" }}>{mission.id}</TableCell>
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
                  {/* <TableCell sx={{ color: "#ECECED" }}>{mission.url}</TableCell> */}
                  <TableCell>
                    <FontAwesomeIcon
                      icon={faMagnifyingGlass}
                      onClick={() => handleOpen(mission.imageData)}
                      style={{
                        marginRight: "10px",
                        cursor: "pointer",
                        color: "#ECECED",
                      }}
                    />
                    <a
                      href={`data:image/png;base64,${mission.imageData}`}
                      download={mission.imageName}
                    >
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
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default AgriScanImager;
