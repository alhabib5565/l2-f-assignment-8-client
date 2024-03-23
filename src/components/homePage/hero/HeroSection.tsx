import { Box, Container, Typography } from "@mui/material";
import React from "react";
import HeroCarousel from "./HeroCarousel";

const HeroSection = () => {
  return (
    <div className="bg-secondary/20">
      <Container>
        <Box pt={10} maxWidth="800px" margin="0 auto" textAlign="center">
          <Typography
            color="primary.main"
            component="h2"
            variant="h2"
            fontWeight={600}
          >
            Experience Freshness Every Wash
          </Typography>
          <Typography
            component="p"
            variant="body1"
            fontSize={18}
            mt={3}
            fontWeight={500}
          >
            Welcome to our world of laundry solutions where freshness meets
            efficiency. Explore our wide range of premium laundry supplies
            designed to keep your clothes clean, soft, and smelling amazing with
            every wash.
          </Typography>
        </Box>
        <Box py={10}>
          <HeroCarousel />
        </Box>
      </Container>
    </div>
  );
};

export default HeroSection;
