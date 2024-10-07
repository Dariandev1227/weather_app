import React, { useState } from "react";
import {
  Box,
  Container,
  useMediaQuery,
  useTheme,
  Typography,
} from "@mui/material";

import { useWeatherData } from "../../hooks/useWeatherData";
import {
  ButtonGroup,
  DailyWeatherCard,
  DropDown,
  Loader,
} from "../../components";
import { HourlyWeatherCard } from "../../components/HourlyWeatherCard";

export const Home = () => {
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toLocaleDateString()
  );
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const { dateOptions, loading, error, currentWeather, hourlyForcast } =
    useWeatherData({
      selectedDate,
    });

  if (error) {
    return (
      <Typography variant="h5" color="error" textAlign="center">
        There was an error loading the application
      </Typography>
    );
  }

  if (loading || !currentWeather || !hourlyForcast) {
    return <Loader />;
  }

  return (
    <Container>
      <DailyWeatherCard data={currentWeather} />
      <Box display="flex" justifyContent="center" data-testid="date-selector">
        {isMobile ? (
          <DropDown
            options={dateOptions}
            value={selectedDate}
            setValue={setSelectedDate}
          />
        ) : (
          <ButtonGroup
            options={dateOptions}
            value={selectedDate}
            setValue={setSelectedDate}
          />
        )}
      </Box>
      {hourlyForcast.map((hourly) => (
        <HourlyWeatherCard data={hourly} key={hourly.number} />
      ))}
    </Container>
  );
};
