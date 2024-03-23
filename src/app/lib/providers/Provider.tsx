import { ThemeProvider } from "@mui/material/styles";
import React, { ReactNode } from "react";
import { theme } from "../theme/theme";

const Provider = ({ children }: { children: ReactNode }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default Provider;
