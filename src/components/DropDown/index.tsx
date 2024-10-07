import { Select, MenuItem } from "@mui/material";
import { Option } from "../../types/types";
import React from "react";

interface Props {
  options: Option[];
  value: string;
  setValue: (value: string) => void;
}

export const DropDown: React.FC<Props> = ({ options, value, setValue }) => {
  return (
    <Select value={value} onChange={(e) => setValue(e.target.value)}>
      {options.map(({ label, value }) => (
        <MenuItem key={value} value={value}>
          {label}
        </MenuItem>
      ))}
    </Select>
  );
};
