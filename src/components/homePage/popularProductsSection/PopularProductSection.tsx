import SectionHeader from "@/components/shared/SectionHeader";
import ProductCard from "@/components/ui/ProductCard";
import { TProduct } from "@/type/product.type";
import { Container } from "@mui/material";
import React from "react";

const PopularProductSection = async () => {
  const res = await fetch(`${process.env.SERVER_URL}/products`, {
    cache: "force-cache",
  });
  const products = await res.json();
  return (
    <section className="lg:py-32 py-20">
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
    </section>
  );
};

export default PopularProductSection;
