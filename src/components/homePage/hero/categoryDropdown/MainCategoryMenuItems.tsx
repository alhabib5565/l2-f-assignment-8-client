"use client";
import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import MainCategoryDropdown from "./MainCategoryDropdown";
import Link from "next/link";
import { TMainCategoryItemsData } from "./category.dropdown.type";
import Image from "next/image";
import { KeyboardArrowRight } from "@mui/icons-material";

const MainCategoryMenuItems = ({
  items,
}: {
  items: TMainCategoryItemsData;
}) => {
  const [isMainCategoryDropdownOpen, setIsMainCategoryDropdownOpen] =
    useState(false);
  const handleOpenDropdown = () => {
    setIsMainCategoryDropdownOpen(true);
  };
  const handleCloseDropdown = () => {
    setIsMainCategoryDropdownOpen(false);
  };
  return (
    <Box
      onMouseEnter={handleOpenDropdown}
      onMouseLeave={handleCloseDropdown}
      onClick={handleCloseDropdown}
    >
      {items.categories ? (
        <>
          <Link
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "5px 10px",
              color: `${isMainCategoryDropdownOpen ? "red" : ""}`,
              background: `${isMainCategoryDropdownOpen ? "#f8f8f8" : ""}`,
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
              <Image height={20} width={20} src={items.imageURL} alt="" />
              <Typography
                color={`${isMainCategoryDropdownOpen ? "red" : ""}`}
                fontSize={14}
              >
                {items.mainCategoryName}
              </Typography>
            </Box>
            {items.categories && items.categories.length ? (
              <KeyboardArrowRight />
            ) : (
              ""
            )}{" "}
          </Link>
          <MainCategoryDropdown
            isMainCategoryDropdownOpen={isMainCategoryDropdownOpen}
            categories={items.categories}
          />
        </>
      ) : (
        <Link href={""}>
          <span>{items.mainCategoryName}</span>
        </Link>
      )}
    </Box>
  );
};

export default MainCategoryMenuItems;
