import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import React from "react";

type Option = {
  label: string;
  value: string;
};

interface Props {
  options: Option[];
  value: string;
  setValue: (value: string) => void;
}

export const ButtonGroup: React.FC<Props> = ({ options, value, setValue }) => {
  const handleChange = (_: React.MouseEvent<HTMLElement>, selected: string) => {
    if (selected) {
      setValue(selected);
    }
  };

  return (
    <ToggleButtonGroup
      onChange={handleChange}
      value={value}
      color="primary"
      exclusive
    >
      {options.map(({ label, value }) => (
        <ToggleButton value={value} key={value}>
          {label}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};
