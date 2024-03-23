import ProductCard from "@/components/ui/ProductCard";
import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
const FlashSale = () => {
  return (
    <section className="lg:py-32 py-20">
      <Container>
        <Stack direction="row" justifyContent="space-between">
          <Box maxWidth={340}>
            <Typography component="h3" variant="h4">
              Flash Sale
            </Typography>
            <Typography component="p" variant="body1" mt={1}>
              Limited time, unlimited savings!
            </Typography>
          </Box>
          <div>
            <Button variant="outlined" className="group">
              <span>Show All</span>{" "}
              <ArrowForwardIcon className="group-hover:translate-x-1 transition-all duration-300" />
            </Button>
          </div>
        </Stack>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </Container>
    </section>
  );
};

export default FlashSale;
