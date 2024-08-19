import SectionHeader from "@/components/shared/SectionHeader";
import ProductCard from "@/components/ui/ProductCard";
import { TProduct } from "@/type";
import { Box, Container, Grid } from "@mui/material";
import React from "react";

const FlashSalePage = async () => {
  const res = await fetch(
    `${process.env.SERVER_URL}/products/flash-sale/all-flash-sale`
  );
  const flashSaleProducts = await res.json();

  return (
    <Box py={6}>
      <Container>
        <SectionHeader
          title=" Flash Sale"
          description=" Limited time, unlimited savings!"
        />

        <Grid container spacing={2} mt={3}>
          {flashSaleProducts.data.slice(0, 12).map((product: TProduct) => (
            <Grid item xs={12} sm={6} md={4} lg={2.4} key={product._id}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default FlashSalePage;
