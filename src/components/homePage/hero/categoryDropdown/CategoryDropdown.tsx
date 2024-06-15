import { Box, Container } from "@mui/material";
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
            gap: 1,
          }}
          href={""}
        >
          <Image
            height={20}
            width={20}
            src="https://img.alicdn.com/imgextra/i3/O1CN01B0aYfH1Mb3yQnQt38_!!6000000001452-0-tps-240-240.jpg"
            alt=""
          />
          <span>{subCategory.categoryName}</span>
        </Link>
      ))}
    </Box>
  );
};

export default CategoryDropdown;
