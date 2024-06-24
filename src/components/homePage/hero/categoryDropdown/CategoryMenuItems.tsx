"use client";
import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import Link from "next/link";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { TCategoryItemsData } from "./category.dropdown.type";
import CategoryDropdown from "./CategoryDropdown";
import Image from "next/image";
import { KeyboardArrowRight } from "@mui/icons-material";

const CategoryMenuItems = ({ category }: { category: TCategoryItemsData }) => {
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const handleOpenDropdown = () => {
    setIsCategoryDropdownOpen((prev) => !prev);
  };

  return (
    <Box onMouseEnter={handleOpenDropdown} onMouseLeave={handleOpenDropdown}>
      {category.subCategories ? (
        <>
          <Link
            style={{
              padding: "5px 10px",
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              color: `${isCategoryDropdownOpen ? "red" : ""}`,
              background: `${isCategoryDropdownOpen ? "#f8f8f8" : "white"}`,
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
              <Image height={20} width={20} src={category.imageURL} alt="" />
              <Typography
                color={`${isCategoryDropdownOpen ? "red" : ""}`}
                fontSize={14}
              >
                {category.categoryName}
              </Typography>{" "}
            </Box>
            {category.subCategories && category.subCategories.length ? (
              <KeyboardArrowRight />
            ) : (
              ""
            )}
          </Link>
          {category.subCategories && category.subCategories.length ? (
            <CategoryDropdown
              isCategoryDropdownOpen={isCategoryDropdownOpen}
              subCategories={category.subCategories}
            />
          ) : (
            ""
          )}
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
