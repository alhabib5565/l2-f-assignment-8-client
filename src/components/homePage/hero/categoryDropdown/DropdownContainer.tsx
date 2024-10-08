import { Box } from "@mui/material";
import React from "react";
import { TMainCategoryItemsData } from "./category.dropdown.type";
import MainCategoryMenuItems from "./MainCategoryMenuItems";

const DropdownContainer = async () => {
  const response = await fetch(
    "https://cleaning-supplies-store-server-indol.vercel.app/api/v1/main-categories/dropdown"
  );
  const mainCategories = await response.json();
  return (
    <Box
      sx={{
        py: 1,
        position: "relative",
        zIndex: 900,
        height: 400,
        border: "1px solid lightgray",
        borderRadius: 2,
        background: "white",
      }}
    >
      {mainCategories.data
        .slice(0, 11)
        .map((mainCategory: TMainCategoryItemsData, index: number) => {
          return <MainCategoryMenuItems key={index} items={mainCategory} />;
        })}
    </Box>
  );
};

export default DropdownContainer;

// const mainCategories: TMainCategoryItemsData[] = [
//   {
//     _id: "1",
//     mainCategoryName: "Electronics",
//     url: "/electronics",
//     categories: [
//       {
//         _id: "1-1",
//         categoryName: "Mobile Phones",
//         url: "/electronics/mobile-phones",
//         subCategories: [
//           {
//             _id: "1-1-1",
//             categoryName: "Smartphones",
//             url: "/electronics/mobile-phones/smartphones",
//           },
//           {
//             _id: "1-1-2",
//             categoryName: "Feature Phones",
//             url: "/electronics/mobile-phones/feature-phones",
//           },
//         ],
//       },
//       {
//         _id: "1-2",
//         categoryName: "Laptops",
//         url: "/electronics/laptops",
//         subCategories: [
//           {
//             _id: "1-2-1",
//             categoryName: "Gaming Laptops",
//             url: "/electronics/laptops/gaming",
//           },
//           {
//             _id: "1-2-2",
//             categoryName: "Business Laptops",
//             url: "/electronics/laptops/business",
//           },
//         ],
//       },
//     ],
//   },
//   {
//     _id: "2",
//     mainCategoryName: "Fashion",
//     url: "/fashion",
//     categories: [
//       {
//         _id: "2-1",
//         categoryName: "Men",
//         url: "/fashion/men",
//         subCategories: [
//           {
//             _id: "2-1-1",
//             categoryName: "Clothing",
//             url: "/fashion/men/clothing",
//           },
//           {
//             _id: "2-1-2",
//             categoryName: "Shoes",
//             url: "/fashion/men/shoes",
//           },
//         ],
//       },
//       {
//         _id: "2-2",
//         categoryName: "Women",
//         url: "/fashion/women",
//         subCategories: [
//           {
//             _id: "2-2-1",
//             categoryName: "Clothing",
//             url: "/fashion/women/clothing",
//           },
//           {
//             _id: "2-2-2",
//             categoryName: "Shoes",
//             url: "/fashion/women/shoes",
//           },
//         ],
//       },
//     ],
//   },
// ];
