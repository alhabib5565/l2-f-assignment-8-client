"use client";
import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import MainCategoryDropdown from "./MainCategoryDropdown";
import Link from "next/link";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { TMainCategoryItemsData } from "./category.dropdown.type";
import Image from "next/image";

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
              background: `${isMainCategoryDropdownOpen ? "lightgray" : ""}`,
              // padding: `${isMainCategoryDropdownOpen ? " 10px 0px" : ""}`,
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
              <span>{items.mainCategoryName}</span>
            </Box>
            <ExpandMoreIcon />
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
