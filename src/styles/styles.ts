import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    primary: {
      main: "#00B797",
      light: "#f2fbfa",
    },
    grey: {
      200: "#ccc",
      300: "#ddd",
      500: "#999",
      900: "#333",
    },
  },
  typography: {
    fontFamily: "Source Sans Pro",
  },
});
