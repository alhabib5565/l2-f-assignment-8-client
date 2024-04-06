import SectionHeader from "@/components/shared/SectionHeader";
import ProductCard from "@/components/ui/ProductCard";
import { TProduct } from "@/type";
import { Container } from "@mui/material";
import React from "react";

const FlashSalePage = async () => {
  const res = await fetch(`${process.env.SERVER_URL}/products`);
  const products = await res.json();

  const flashSaleProducts = products.data.filter(
    (product: TProduct) => product.flash_sale
  );
  return (
    <section className="lg:py-32 py-20">
      <Container>
        <SectionHeader
          title=" Flash Sale"
          description=" Limited time, unlimited savings!"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
          {flashSaleProducts.slice(0, 12).map((product: TProduct) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default FlashSalePage;
