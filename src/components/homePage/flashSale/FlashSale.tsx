import ProductCard from "@/components/ui/ProductCard";
import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import SectionHeader from "@/components/shared/SectionHeader";
import { TProduct } from "@/type";
const FlashSale = async () => {
  const res = await fetch(
    `${process.env.SERVER_URL}/products/flash-sale/all-flash-sale`,
    {
      cache: "reload",
    }
  );
  const flashSaleProducts = await res.json();

  return (
    <Box pt={{ xs: 6, md: 10 }}>
      <Container>
        <SectionHeader
          href="flash-sale"
          title=" Flash Sale"
          description=" Limited time, unlimited savings!"
        />
        <Grid container spacing={2} mt={3}>
          {flashSaleProducts.data.slice(0, 10).map((product: TProduct) => (
            <Grid item xs={12} sm={6} md={4} lg={2.4} key={product._id}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default FlashSale;
