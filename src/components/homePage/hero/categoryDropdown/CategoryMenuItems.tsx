"use client";
import { Box } from "@mui/material";
import React, { useState } from "react";
import Link from "next/link";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { TCategoryItemsData } from "./category.dropdown.type";
import CategoryDropdown from "./CategoryDropdown";
import Image from "next/image";

const CategoryMenuItems = ({ category }: { category: TCategoryItemsData }) => {
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const handleOpenDropdown = () => {
    setIsCategoryDropdownOpen((prev) => !prev);
  };

  return (
    <Box
      sx={{
        px: 2,
      }}
      onMouseEnter={handleOpenDropdown}
      onMouseLeave={handleOpenDropdown}
    >
      {category.subCategories ? (
        <>
          <Link
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: "white",
            }}
            href={""}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Image
                height={20}
                width={20}
                src="https://img.alicdn.com/imgextra/i3/O1CN01B0aYfH1Mb3yQnQt38_!!6000000001452-0-tps-240-240.jpg"
                alt=""
              />
              <span>{category.categoryName}</span>
            </Box>
            <ExpandMoreIcon />
          </Link>
          <CategoryDropdown
            isCategoryDropdownOpen={isCategoryDropdownOpen}
            subCategories={category.subCategories}
          />
        </>
      ) : (
        // <Box>
        //   <Link
        //     style={{
        //       display: "flex",
        //       justifyContent: "space-between",
        //       alignItems: "center",
        //     }}
        //     href={"sd"}
        //   >
        //     <span>{category.categoryName}</span>
        //     <ExpandMoreIcon />
        //   </Link>
        //   {isCategoryDropdownOpen && (
        //     <CategoryDropdown
        //       isCategoryDropdownOpen={isCategoryDropdownOpen}
        //       subCategories={category.subCategories}
        //     />
        //   )}
        // </Box>
        <Box>{category.categoryName}</Box>
      )}
    </Box>
  );
};

export default CategoryMenuItems;
