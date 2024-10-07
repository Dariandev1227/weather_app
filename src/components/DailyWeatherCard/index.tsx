import React from "react";
import { Box, Typography, Paper, Grid, useTheme } from "@mui/material";
import { Period } from "../../types/types";
import AirOutlinedIcon from "@mui/icons-material/AirOutlined";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

interface Props {
  data: Period;
}

export const DailyWeatherCard: React.FC<Props> = ({ data }) => {
  const theme = useTheme();
  const { icon, temperature, windSpeed, shortForecast, name, startTime } = data;

  return (
    <Paper
      elevation={3}
      data-testid={`${startTime}-daily-card`}
      sx={{
        my: 4,
        p: 3,
        borderRadius: 4,
        background: theme.palette.background.paper,
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            mb={2}
          >
            <CalendarTodayIcon sx={{ mr: 1 }} />
            <Typography
              fontWeight="bold"
              sx={{ fontSize: { xs: "1rem", md: "2rem" } }}
            >
              {`${new Date(startTime).toDateString()} (${name})`}
            </Typography>
          </Box>
        </Grid>
        <Grid container spacing={2} justifyContent="center">
          <Grid item sm={4}>
            <Box display="flex" flexDirection="column" alignItems="center">
              <ThermostatIcon fontSize="large" color="primary" />
              <Typography variant="h4" fontWeight="bold" color="primary">
                {temperature}°F
              </Typography>
              <Typography variant="subtitle1">{shortForecast}</Typography>
            </Box>
          </Grid>
          <Grid item sm={4}>
            <Box display="flex" flexDirection="column" alignItems="center">
              <AirOutlinedIcon fontSize="large" color="secondary" />
              <Typography variant="h5" fontWeight="medium" color="secondary">
                {windSpeed}
              </Typography>
              <Typography variant="subtitle2">Wind Speed</Typography>
            </Box>
          </Grid>
          <Grid item sm={4}>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="100%"
            >
              <img
                src={icon}
                alt="weather_icon"
                style={{ maxWidth: "100%", height: "auto" }}
              />
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};
