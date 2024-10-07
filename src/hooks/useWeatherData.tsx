import { useMemo } from "react";
import { useQueries } from "@tanstack/react-query";

import { WeatherData, Period, Option } from "../types/types";
import { fetchWeatherData } from "../services";

interface Params {
  officeId?: string;
  xCoord?: number;
  yCoord?: number;
  selectedDate: string;
}

interface Output {
  loading: boolean;
  error: boolean;
  currentWeather: Period | undefined;
  hourlyForcast: Period[] | undefined;
  dateOptions: Option[];
}

const fetchRules = {
  refetchOnWindowFocus: false,
  refetchInterval: 60 * 60 * 1000, // 1hr
  staleTime: 60 * 60 * 1000,
};

export const useWeatherData = ({
  officeId = "TOP",
  xCoord = 31,
  yCoord = 80,
  selectedDate,
}: Params): Output => {
  const weatherQueries = useQueries({
    queries: [
      {
        queryKey: ["weather", officeId, xCoord, yCoord, "daily"],
        queryFn: () => fetchWeatherData(officeId, xCoord, yCoord, false),
        select(data: WeatherData | undefined) {
          return { daily: data?.properties };
        },
        ...fetchRules,
      },
      {
        queryKey: ["weather", officeId, xCoord, yCoord, "hourly"],
        queryFn: () => fetchWeatherData(officeId, xCoord, yCoord, true),
        select(data: WeatherData | undefined) {
          return { hourly: data?.properties };
        },
        ...fetchRules,
      },
    ],
  });

  const compareDate = (value: string) =>
    new Date(value).getDate() === new Date(selectedDate).getDate();

  // Format data
  const data: Output = useMemo(() => {
    let output = {
      loading: false,
      error: false,
      currentWeather: undefined,
      hourlyForcast: undefined,
      dateOptions: [],
    };

    if (!weatherQueries[0].data || !weatherQueries[1].data)
      return {
        ...output,
        loading: true,
      };

    if (weatherQueries[0].error || weatherQueries[1].error) {
      return { ...output, error: true };
    }

    const currentWeather = weatherQueries[0].data.daily?.periods.filter(
      (period) => compareDate(period.startTime)
    )[0];

    const hourlyForcast = weatherQueries[1].data.hourly?.periods.filter(
      (period) => compareDate(period.startTime)
    );

    const dateOptions = [
      ...new Set(
        weatherQueries[0].data.daily?.periods.map((period) =>
          new Date(period.startTime).toLocaleDateString()
        )
      ),
    ].map((option) => ({ label: option, value: option }));

    return { ...output, currentWeather, hourlyForcast, dateOptions };
  }, [weatherQueries[0].data, weatherQueries[1].data, selectedDate]);

  return data;
};
