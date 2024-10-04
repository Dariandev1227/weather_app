import { useState } from "react";
import { Box } from "@mui/material";

import { ButtonGroup } from "../../components";
import { FORCAST_OPTION } from "../../constants";
import { useWeatherData } from "../../hooks/useWeatherData";

export const Home = () => {
  const [forcastType, setForcastType] = useState("daily");
  const data = useWeatherData({ isHourly: forcastType === "hourly" });
  console.log("ffffffffffffff", data);
  return (
    <Box>
      <ButtonGroup
        options={FORCAST_OPTION}
        value={forcastType}
        setValue={setForcastType}
      />
    </Box>
  );
};
