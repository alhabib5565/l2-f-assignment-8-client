"use client";
import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#017ADA",
    },
    secondary: {
      main: "#F4F7FE",
    },
  },

  components: {
    MuiButton: {
      defaultProps: {
        variant: "contained",
      },
    },
    MuiContainer: {
      defaultProps: {
        maxWidth: "xl",
      },
    },
  },
  typography: {
    body1: {
      color: "#0B1134CC",
    },
  },
});
