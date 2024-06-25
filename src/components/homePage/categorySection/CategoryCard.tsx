import { TCategory } from "@/type/category.type";
import { Box, Grid, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const CategoryCard = ({ category }: { category: TCategory }) => {
  return (
    <Grid item xs={6} md={3} lg={2}>
      <Link href={`products?category=${category._id}`}>
        <Box
          sx={{
            height: 145,
            border: "1px solid lightblue",
            display: "flex",
            flexDirection: "column",
            gap: 1,
            borderRadius: 1,
            justifyContent: "center",
            alignItems: "center",
            bgcolor: "white",
          }}
        >
          <Image height={56} width={56} src={category.imageURL} alt="" />

          <Typography noWrap fontSize={16}>
            {category.categoryName}
          </Typography>
        </Box>
      </Link>
    </Grid>
  );
};

export default CategoryCard;
