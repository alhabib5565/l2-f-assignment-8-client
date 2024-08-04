import Filter from "@/components/productPage/Filter";
import SectionHeader from "@/components/shared/SectionHeader";
import ProductCard from "@/components/ui/ProductCard";
import { TProduct } from "@/type";
import { Box, Container } from "@mui/material";
import React from "react";

const ProductsPage = async (props: any) => {
  const parms = new URLSearchParams(props.searchParams).toString();
  const res = await fetch(`${process.env.SERVER_URL}/products?${parms}`, {
    cache: "no-store",
  });
  const products = await res.json();

  return (
    <Box py={{ xs: 6, md: 10 }}>
      <Container>
        <div className="flex gap-8">
          <Filter />{" "}
          <div className="flex-1">
            <SectionHeader
              title="Our Products"
              description="Discover what's trending! Explore our selection of customer-favorite laundry essentials."
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 mt-10">
              {products.data.map((product: TProduct) => (
                <ProductCard product={product} key={product._id} />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Box>
  );
};

export default ProductsPage;
