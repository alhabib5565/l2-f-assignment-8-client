"use client";
import { Box } from "@mui/material";
import { TCategoryItemsData } from "./category.dropdown.type";
import CategoryMenuItems from "./CategoryMenuItems";
// mainCategory er under a jotogulu category ache oi sokol category niye
const MainCategoryDropdown = ({
  categories,
  isMainCategoryDropdownOpen,
}: {
  categories: TCategoryItemsData[];
  isMainCategoryDropdownOpen: boolean;
}) => {
  return (
    <Box
      sx={{
        py: 1,
        position: "absolute",
        top: 0,
        left: "100%",
        bgcolor: "white",
        zIndex: 900,
        borderRadius: 2,
        border: "1px solid lightgray",
        width: 300,
        height: 350,
        display: `${isMainCategoryDropdownOpen ? "" : "none"}`,
      }}
    >
      {categories.map((category, index) => {
        return <CategoryMenuItems key={index} category={category} />;
      })}
    </Box>
  );
};

export default MainCategoryDropdown;
