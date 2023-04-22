import { createTheme } from "@mui/material/styles";

/**
 * Custom theme created with MUI tools. Contains eg. breakpoinst, information about spacing (1 unit = 8px), typography etc.
 */

export const lightTheme = createTheme({
  palette: {
    primary: {
      main: "#01b797",
      light: "#f2fbfa",
    },
  },
  typography: {
    fontFamily: "Lato",
  },
  components: {
    MuiListItemButton: {
      defaultProps: {
        disableTouchRipple: true,
      },
    },
  },
});
