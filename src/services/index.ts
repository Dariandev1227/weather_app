import { AxiosInstance } from "../api/axios";
import { WeatherData } from "../types/types";

export const fetchWeatherData = async (
  officeId: string,
  xCoord: number,
  yCoord: number,
  isHourly: boolean
): Promise<WeatherData | undefined> => {
  try {
    const response = await AxiosInstance.get(
      `/${officeId}/${xCoord},${yCoord}/forecast${isHourly ? "/hourly" : ""}`
    );
    return response.data;
  } catch (err) {
    console.error(err);
  }
};
