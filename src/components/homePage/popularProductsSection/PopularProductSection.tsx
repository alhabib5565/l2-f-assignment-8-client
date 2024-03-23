import SectionHeader from "@/components/shared/SectionHeader";
import ProductCard from "@/components/ui/ProductCard";
import { Container } from "@mui/material";
import React from "react";

const PopularProductSection = () => {
  return (
    <section className="lg:py-32 py-20">
      <Container>
        <SectionHeader
          title="Popular Products"
          description="Discover what's trending! Explore our selection of customer-favorite laundry essentials."
        />
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

export default PopularProductSection;
