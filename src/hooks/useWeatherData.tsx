import { useQuery } from "@tanstack/react-query";
import { fetchWeatherData } from "../services";

interface Params {
  officeId?: string;
  xCoord?: number;
  yCoord?: number;
  isHourly?: boolean;
}

export const useWeatherData = ({
  officeId = "TOP",
  xCoord = 31,
  yCoord = 80,
  isHourly = false,
}: Params) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["weather", officeId, xCoord, yCoord, isHourly],
    queryFn: () => fetchWeatherData(officeId, xCoord, yCoord, isHourly),
    refetchOnWindowFocus: false,
    refetchInterval: 60 * 60 * 1000, // 1hr
    staleTime: 60 * 60 * 1000,
  });

  return { data, isLoading, error };
};
