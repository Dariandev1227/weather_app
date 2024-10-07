import { createTheme } from "@mui/material/styles";
import { lightBlue, grey } from "@mui/material/colors";

const isNight = new Date().getHours() > 19 || new Date().getHours() < 6;

export const theme = createTheme({
  palette: {
    primary: {
      main: isNight ? grey[500] : lightBlue[500],
      dark: grey[500],
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#1d803ab3",
      light: "#3BC117;",
      dark: "#17121E",
    },
  },
});
