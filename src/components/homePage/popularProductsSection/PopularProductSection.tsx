import SectionHeader from "@/components/shared/SectionHeader";
import ProductCard from "@/components/ui/ProductCard";
import { TProduct } from "@/type";
import { Box, Container } from "@mui/material";
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
          {products.data.slice(0, 8).map((product: TProduct) => (
            <ProductCard product={product} key={product._id} />
          ))}
        </div>
      </Container>
    </Box>
  );
};

export default PopularProductSection;
