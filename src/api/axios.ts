import axios from "axios";

const BASE_URL = "https://api.weather.gov/gridpoints";

export const AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/geo+json",
  },
});
