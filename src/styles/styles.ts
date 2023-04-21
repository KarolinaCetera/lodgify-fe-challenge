import { createTheme } from "@mui/material/styles";

/**
 * Custom theme created with MUI tools. Contains eg. breakpoinst, information about spacing (1 unit = 8px), typography etc.
 */

export const lightTheme = createTheme({
  palette: {
    mode: "light",
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
