"use client";
import { ThemeProvider } from "@mui/material";
import { theme } from "../theme/theme";
import { Provider } from "react-redux";
import { persistor, store } from "@/redux/store";
import { PersistGate } from "redux-persist/integration/react";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      {/* <PersistGate loading={null} persistor={persistor}> */}
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
      {/* </PersistGate> */}
    </Provider>
  );
};

export default Providers;
