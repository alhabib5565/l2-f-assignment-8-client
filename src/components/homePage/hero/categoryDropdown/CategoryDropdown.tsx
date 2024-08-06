import { Box, Container, Typography } from "@mui/material";
import React, { useState } from "react";
import { TSubCategoryItemsData } from "./category.dropdown.type";
import Link from "next/link";
import Image from "next/image";

// Category er under a jotogulu subCategory ache oi sokol subCategory niye

type TCategoryDropdown = {
  subCategories: TSubCategoryItemsData[];
  isCategoryDropdownOpen: boolean;
};
const CategoryDropdown = ({
  subCategories,
  isCategoryDropdownOpen,
}: TCategoryDropdown) => {
  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: "100%",
        bgcolor: "white",
        zIndex: 900,
        borderRadius: 2,
        border: "1px solid lightgray",
        width: 300,
        height: 350,
        display: `${isCategoryDropdownOpen ? "" : "none"}`,
      }}
    >
      {subCategories.map((subCategory, index) => (
        <Link
          key={index}
          style={{
            width: "100%",
            display: "flex",
            padding: "5px 10px",
            gap: 8,
          }}
          href={`products?subCategory=${subCategory._id}`}
        >
          <Image height={20} width={20} src={subCategory.imageURL} alt="" />
          <Typography
            color={`${isCategoryDropdownOpen ? "primary.main" : ""}`}
            fontSize={14}
          >
            {subCategory.categoryName}
          </Typography>{" "}
        </Link>
      ))}
    </Box>
  );
};

export default CategoryDropdown;
