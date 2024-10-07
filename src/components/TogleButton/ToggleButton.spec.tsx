import React from "react";
import { render, screen } from "@testing-library/react";

import { ToggleButton } from "@mui/material";

const props = {
  value: "test",
  options: [{ label: "test", value: "test" }],
  setValue: (_: number) => {},
};

describe.only("DropDown", () => {
  it("Renders dropdown", () => {
    render(<ToggleButton {...props} />);

    expect(screen.getByRole("button")).toBeDefined();
  });
});
