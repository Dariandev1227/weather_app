import React from "react";
import { render, screen } from "../../test-utils/setup";
import { Header } from ".";

describe("Header test", () => {
  it("renders header correctly", () => {
    render(<Header />);

    expect(screen.getByText(/Weather App/i)).toBeDefined();
    expect(screen.getByText(/First Principles Publishing/i)).toBeDefined();
  });
});
