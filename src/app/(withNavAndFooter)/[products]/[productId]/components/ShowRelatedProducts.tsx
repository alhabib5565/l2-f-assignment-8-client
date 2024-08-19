import ProductCard from "@/components/ui/ProductCard";
import { TProduct } from "@/type";
import { Box, Grid, Typography } from "@mui/material";
import React from "react";

const ShowRelatedProducts = async ({
  mainCategory,
}: {
  mainCategory: string;
}) => {
  const res = await fetch(
    `${process.env.SERVER_URL}/products?mainCategory=${mainCategory}&limit=12`
  );
  const products = await res.json();

  return (
    <Box mt={4}>
      <Typography
        display={"flex"}
        variant="h5"
        component="h5"
        alignItems="end"
        gap={1}
        fontWeight={600}
      >
        Related Products
      </Typography>
      <Grid container spacing={2} mt={1}>
        {products.data.map((product: TProduct) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ShowRelatedProducts;
