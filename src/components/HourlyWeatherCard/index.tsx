import React from "react";
import { Box, Typography, Paper, Grid, useTheme } from "@mui/material";
import {
  WaterDrop,
  ThermostatSharp,
  AirSharp,
  BeachAccessRounded,
} from "@mui/icons-material";
import { formatTimeTo12Hour } from "../../utils/dateUtil";
import { Period } from "../../types/types";

interface Props {
  data: Period;
}

export const HourlyWeatherCard: React.FC<Props> = ({ data }) => {
  const {
    startTime,
    temperature,
    windSpeed,
    relativeHumidity,
    probabilityOfPrecipitation,
  } = data;
  const theme = useTheme();

  return (
    <Paper
      elevation={3}
      data-testid="hourly-card"
      sx={{
        my: 3,
        backgroundColor: theme.palette.background.paper,
        borderRadius: 2,
        overflow: "hidden",
        transition: "0.3s",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: theme.shadows[6],
        },
      }}
    >
      <Box
        sx={{
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
          padding: 2,
        }}
      >
        <Typography variant="h6" align="center">
          {formatTimeTo12Hour(startTime)}
        </Typography>
      </Box>
      <Grid
        container
        spacing={2}
        sx={{ padding: 2 }}
        justifyContent={"space-between"}
      >
        <WeatherItem
          label="Temperature"
          value={`${temperature}°F`}
          icon={<ThermostatSharp />}
        />
        <WeatherItem label="Wind" value={windSpeed} icon={<AirSharp />} />
        <WeatherItem
          label="Humidity"
          value={`${relativeHumidity.value}%`}
          icon={<WaterDrop />}
        />
        {!!probabilityOfPrecipitation?.value && (
          <WeatherItem
            label="Precipitation"
            value={`${probabilityOfPrecipitation.value}%`}
            icon={<BeachAccessRounded />}
          />
        )}
      </Grid>
    </Paper>
  );
};

interface WeatherItemProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
}

const WeatherItem: React.FC<WeatherItemProps> = ({ label, value, icon }) => {
  return (
    <Grid item xs={6} sm={3}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        {React.cloneElement(icon as React.ReactElement, {
          fontSize: "large",
          color: "primary",
        })}
        <Typography variant="h6">{value}</Typography>
        <Typography variant="body2" color="textSecondary">
          {label}
        </Typography>
      </Box>
    </Grid>
  );
};
