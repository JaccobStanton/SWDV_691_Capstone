import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import AgriscanDrone from "../../../../assets/svg/Drone_FieldDock.svg";

function OverviewDrawer() {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));
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
                Mission Overview
              </Typography>
            </Item>
          </Grid>
        </Grid>
      </Box>
      <div //! fix this so it doesnt appear on all page bottoms of drawer component
        style={{
          width: "100%",
          height: "80%",
          display: "flex",
          justifyContent: "center",
          marginTop: "40px",
        }}
      >
        <img src={AgriscanDrone} />
      </div>
    </>
  );
}
export default OverviewDrawer;
