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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
          {flashSaleProducts.data.map((product: TProduct) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </Container>
    </Box>
  );
};

export default FlashSale;
