// useWeatherData.test.ts
import React from "react";
import { renderHook } from "@testing-library/react-hooks";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useWeatherData } from "./useWeatherData";
import { fetchWeatherData } from "../services";

jest.mock("../services", () => ({
  fetchWeatherData: jest.fn(),
}));

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

const wrapper = ({ children }) => {
  const queryClient = createTestQueryClient();
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

const mockWeatherData = {
  properties: {
    periods: [
      {
        startTime: new Date().toISOString(),
        temperature: 75,
        temperatureUnit: "F",
        windSpeed: "10 mph",
        shortForecast: "Clear sky",
      },
    ],
  },
};

describe("useWeatherData", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("returns loading state initially", async () => {
    fetchWeatherData.mockResolvedValueOnce(undefined); // mock empty data

    const { result, waitFor } = renderHook(
      () => useWeatherData({ selectedDate: new Date().toISOString() }),
      { wrapper }
    );

    expect(result.current.loading).toBe(true);
  });

  test("returns weather data on success", async () => {
    fetchWeatherData.mockResolvedValueOnce(mockWeatherData); // Mock daily data
    fetchWeatherData.mockResolvedValueOnce(mockWeatherData); // Mock hourly data

    const { result, waitFor } = renderHook(
      () => useWeatherData({ selectedDate: new Date().toISOString() }),
      { wrapper }
    );

    await waitFor(() => expect(result.current.loading).toBe(false));

    // Test that the hook is returning the correct values
    expect(result.current.currentWeather).toBeDefined();
    expect(result.current.currentWeather?.temperature).toBe(75);
    expect(result.current.hourlyForcast).toBeDefined();
    expect(result.current.dateOptions.length).toBeGreaterThan(0);
  });
});
