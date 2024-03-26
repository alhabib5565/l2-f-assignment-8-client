import React from "react";
import ProductCard from "../ui/ProductCard";
import { TProduct } from "@/type/product.type";

const AllProducts = async ({}) => {
  const res = await fetch(`${process.env.SERVER_URL}/products`, {
    cache: "no-store",
  });
  const products = await res.json();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 mt-10">
      {products.data.map((product: TProduct) => (
        <ProductCard product={product} key={product._id} />
      ))}
    </div>
  );
};

export default AllProducts;
