import React from "react";
import { render, screen } from "@testing-library/react";
import { mockWeatherData } from "../../test-utils/fixture";
import { Home } from "./";
import { useWeatherData } from "../../hooks/useWeatherData";

// Create a mock implementation of the useWeatherData hook
jest.mock("../../hooks/useWeatherData", () => ({
  useWeatherData: jest.fn(), // Jest mock function
}));

describe("Home Component", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear mocks before each test
  });

  it("displays loading state", () => {
    // Mock the useWeatherData hook to return a loading state
    (useWeatherData as jest.Mock).mockReturnValue({
      loading: true,
      error: false,
      currentWeather: undefined,
      hourlyForcast: undefined,
      dateOptions: [],
    });

    render(<Home />);

    expect(screen.getByTestId("loader")).toBeDefined();
  });

  it("displays error state", () => {
    // Mock the useWeatherData hook to return an error state
    (useWeatherData as jest.Mock).mockReturnValue({
      loading: false,
      error: true,
      currentWeather: undefined,
      hourlyForcast: undefined,
      dateOptions: [],
    });

    render(<Home />);

    expect(
      screen.getByText(/There was an error loading the application/i)
    ).toBeDefined();
  });

  it("renders weather cards when data is available", () => {
    (useWeatherData as jest.Mock).mockReturnValue(mockWeatherData);
    render(<Home />);

    expect(screen.getByText(/Sunny/i)).toBeDefined();
    const cardNumbers = mockWeatherData.hourlyForcast.length;

    // check for the date selector
    expect(screen.getByTestId("date-selector")).toBeDefined();

    // check if daily card is visible
    expect(
      screen.getByTestId(
        `${mockWeatherData.currentWeather.startTime}-daily-card`
      )
    ).toBeDefined();

    // check for the number of hourly card
    expect(screen.queryAllByTestId("hourly-card").length).toBe(cardNumbers);
  });
});
