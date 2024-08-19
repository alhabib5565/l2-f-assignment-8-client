"use client";
import { CssBaseline, GlobalStyles, ThemeProvider } from "@mui/material";
import { theme } from "../theme/theme";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
// import { PersistGate } from "redux-persist/integration/react";

const globalStyles = (
  <GlobalStyles
    styles={{
      "*::-webkit-scrollbar": {
        width: "4px",
      },
      "*::-webkit-scrollbar-track": {
        background: "#f1f1f1",
      },
      "*::-webkit-scrollbar-thumb": {
        background: "#999",
        borderRadius: "4px",
      },
      "*::-webkit-scrollbar-thumb:hover": {
        background: "#555",
      },
    }}
  />
);

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      {/* <PersistGate loading={null} persistor={persistor}> */}
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {globalStyles}
        {children}
      </ThemeProvider>
      {/* </PersistGate> */}
    </Provider>
  );
};

export default Providers;
