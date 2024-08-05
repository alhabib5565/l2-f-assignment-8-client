import SectionHeader from "@/components/shared/SectionHeader";
import { TCategory } from "@/type/category.type";
import { Box, Container, Grid, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import CategoryCard from "./CategoryCard";

const Categories = async () => {
  const response = await fetch(
    "https://cleaning-supplies-store-server-indol.vercel.app/api/v1/categories/top/categories"
  );
  const categories = await response.json();
  return (
    <Box pt={{ xs: 6, md: 10 }}>
      <Container>
        <SectionHeader
          title="Categories"
          description="Browse by category"
          href="categories"
        />
        <Grid container spacing={2} mt={4}>
          {categories.data.map((category: TCategory) => (
            <CategoryCard key={category._id} category={category} />
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Categories;
