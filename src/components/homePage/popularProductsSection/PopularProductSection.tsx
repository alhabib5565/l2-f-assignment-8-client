import SectionHeader from "@/components/shared/SectionHeader";
import ProductCard from "@/components/ui/ProductCard";
import { TProduct } from "@/type";
import { Box, Container, Grid } from "@mui/material";
import React from "react";

const PopularProductSection = async () => {
  const res = await fetch(`${process.env.SERVER_URL}/products`, {
    cache: "force-cache",
  });
  const products = await res.json();
  return (
    <Box pt={{ xs: 6, md: 10 }}>
      <Container>
        <SectionHeader
          title="Popular Products"
          description="Discover what's trending! Explore our selection of customer-favorite laundry essentials."
          href="products"
        />
        <Grid container spacing={2} mt={3}>
          {products.data.slice(0, 10).map((product: TProduct) => (
            <Grid item xs={12} sm={6} md={4} lg={2.4} key={product._id}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default PopularProductSection;
