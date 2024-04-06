import ProductsTable from "@/components/dashboard/ProductsTable";
import { Box } from "@mui/material";
import React from "react";

const AllProducts = async () => {
  return (
    <Box
      sx={{
        my: 5,
      }}
    >
      <ProductsTable />
    </Box>
  );
};

export default AllProducts;
