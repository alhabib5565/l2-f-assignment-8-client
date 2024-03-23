import Filter from "@/components/productPage/Filter";
import { Container } from "@mui/material";
import React from "react";

const ProductsPage = () => {
  return (
    <div className="lg:py-32 py-20">
      <Container>
        <div className="flex gap-3">
          <Filter /> <div className="flex-1 bg-gray-100">productPage</div>
        </div>
      </Container>
    </div>
  );
};

export default ProductsPage;
