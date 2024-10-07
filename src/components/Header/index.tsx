import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Container,
  useTheme,
} from "@mui/material";
import WbSunnyIcon from "@mui/icons-material/WbSunny";

export const Header: React.FC = () => {
  return (
    <AppBar position="static" color="primary" elevation={4}>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ height: 64 }}>
          <WbSunnyIcon sx={{ mr: 2, fontSize: 32 }} />
          <Typography
            variant="h5"
            component="h1"
            sx={{
              flexGrow: 1,
              fontWeight: 700,
              letterSpacing: ".1rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Weather App
          </Typography>
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Typography variant="subtitle1" sx={{ mr: 2 }}>
              First Principles Publishing
            </Typography>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
