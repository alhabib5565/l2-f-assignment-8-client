"use client";
import Filter from "@/components/productPage/Filter";
import SectionHeader from "@/components/shared/SectionHeader";
import ProductCard from "@/components/ui/ProductCard";
import { TProduct } from "@/type/product.type";
import { Container } from "@mui/material";
import React, { useState } from "react";

const ProductsPage = ({ params }: { params: any }) => {
  const [products, setProducts] = useState([]);
  console.log(products);

  return (
    <div className="lg:py-32 py-20">
      <Container>
        <div className="flex gap-3">
          <Filter products={products} setProducts={setProducts} />{" "}
          <div className="flex-1 bg-gray-100">
            <SectionHeader
              title="Popular Products"
              description="Discover what's trending! Explore our selection of customer-favorite laundry essentials."
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 mt-10">
              {products.slice(0, 7).map((product: TProduct) => (
                <ProductCard product={product} key={product._id} />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ProductsPage;
