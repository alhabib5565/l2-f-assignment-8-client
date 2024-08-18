import { Footer } from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar/Navbar";
import { Box } from "@mui/material";
import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Navbar />
      <Box
        pt={8}
        bgcolor="#f8f8f8"
        // pb={{ xs: 6, md: 10 }}
        sx={{ minHeight: "100vh" }}
      >
        {children}
      </Box>
      <Footer />
    </div>
  );
};

export default layout;
