import { Box, Container, Grid, Typography } from "@mui/material";
import React from "react";
import HeroCarousel from "./HeroCarousel";
import MainCategoryDropdown from "./categoryDropdown/DropdownContainer";

const HeroSection = () => {
  return (
    <Container sx={{ mt: 2 }}>
      <Grid container spacing={2}>
        <Grid display={{ xs: "none", md: "grid" }} item md={3}>
          <MainCategoryDropdown />
        </Grid>
        <Grid item xs={12} md={9}>
          <HeroCarousel />
        </Grid>
      </Grid>
      {/* <Box pt={10} maxWidth="800px" margin="0 auto" textAlign="center">
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
        </Box> */}
    </Container>
  );
};

export default HeroSection;
