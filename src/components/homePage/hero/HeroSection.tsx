import { Box, Container, Grid, Typography } from "@mui/material";
import React from "react";
import HeroCarousel from "./HeroCarousel";
import MainCategoryDropdown from "./categoryDropdown/DropdownContainer";

const HeroSection = () => {
  return (
    <Container sx={{ mt: 4 }}>
      <Grid container spacing={2}>
        <Grid display={{ xs: "none", md: "grid" }} item md={3}>
          <MainCategoryDropdown />
        </Grid>
        <Grid item xs={12} md={9}>
          <HeroCarousel />
        </Grid>
      </Grid>
    </Container>
  );
};

export default HeroSection;
