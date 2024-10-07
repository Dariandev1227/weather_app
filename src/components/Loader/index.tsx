import React from "react";
import { CircularProgress, Box } from "@mui/material";

export const Loader = () => (
  <Box
    data-testid="loader"
    sx={{
      width: "100%",
      height: "80vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <CircularProgress color="primary" />
  </Box>
);
