import { Footer } from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import { Box } from "@mui/material";
import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Navbar />
      <Box
        bgcolor="#f8f8f8"
        pb={{ xs: 6, md: 10 }}
        sx={{ minHeight: "100vh", height: "100%" }}
      >
        {children}
      </Box>
      <Footer />
    </div>
  );
};

export default layout;
