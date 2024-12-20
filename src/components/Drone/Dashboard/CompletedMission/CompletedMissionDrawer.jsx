import React, { useEffect, useState, useContext } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import NoMissionsDisplayed from "../NoMissions";
import CompletedMissionsCard from "../../LandingPage/CompletedMissionCard";
import CompletedMap from "./CompletedMap";
import { AppContext } from "../../../../context/AppContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CompletedMissionDrawer() {
  // Access systems from the AppContext
  const { selectedSystem } = useContext(AppContext);

  // Extract missions from the selected system
  const missions = selectedSystem?.missions || [];

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const handleEditUserClick = () => {
    // Show a red toast with the error message
    toast.error("You do not have permissions to view mission waypoints.", {
      position: "bottom-right", // Position of the toast
      autoClose: 5000, // Close automatically after 5 seconds
    });
  };
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid xs={12} md={12} lg={12} xl={12}>
            <Item
              sx={{
                background: "transparent",
                borderBottom: "1px solid rgba(0, 242, 255, 0.25)",
                display: "flex",
                justifyContent: "flex-start",
                borderRadius: "0px",
              }}
            >
              <Typography
                variant="h4"
                noWrap
                component="div"
                sx={{ color: "#FFF" }}
              >
                Completed Missions
              </Typography>
            </Item>
          </Grid>

          <Grid xs={8} md={8} lg={8} xl={8}>
            <Item sx={{ background: "transparent" }}>
              <CompletedMap />
            </Item>
          </Grid>
          <Grid xs={4} md={4} lg={4} xl={4}>
            <Item sx={{ background: "transparent" }}>
              <div className="row-parent-box environmental-conditions-box">
                <div
                  style={{
                    height: "76.5vh",
                    display: "flex",
                    flexDirection: "column",
                    width: "80%",
                  }}
                >
                  <div
                    style={{
                      height: "90%", //! changed this from auto, did it make short no missions go away??
                      overflowY: "auto",
                      padding: "10px 5px",
                    }}
                  >
                    {missions.length === 0 ? (
                      <NoMissionsDisplayed />
                    ) : (
                      <CompletedMissionsCard missions={missions} />
                    )}
                  </div>
                  <div
                    style={{
                      height: "10%",
                      width: "100%",
                      borderTop: "3px solid #474a4e",
                      background: "transparent",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "45px", // Adds space between the two buttons
                    }}
                  >
                    <button
                      onClick={handleEditUserClick}
                      className="view-plan-button"
                    >
                      Waypoints
                    </button>
                  </div>
                </div>
              </div>
            </Item>
          </Grid>
        </Grid>
      </Box>
      <ToastContainer />
    </>
  );
}

export default CompletedMissionDrawer;
