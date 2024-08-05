"use client";
import { Box, Divider, Rating, Typography } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import React, { useState } from "react";
import Slider from "@mui/material/Slider";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { TCategory } from "@/type/category.type";

const ratings = [5, 4, 3, 2, 1];

const Filter = ({ categories }: { categories: TCategory[] }) => {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const parmas = new URLSearchParams(searchParams);

  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedRatings, setSelectedRatings] = useState<number>(0);

  const addCategories = (category: string) => {
    setSelectedCategory((prev) => (prev = category));
    if (category && category !== selectedCategory) {
      parmas.set("category", category);
    } else if (category && category === selectedCategory) {
      setSelectedCategory((prev) => (prev = ""));
      parmas.delete("category");
    }

    router.replace(`${pathName}?${parmas.toString()}`);
  };

  const ratingChange = (rating: any) => {
    if (selectedRatings && selectedRatings === rating) {
      setSelectedRatings(0);
      parmas.delete("rating[$gte]");
    } else {
      setSelectedRatings(rating);
      parmas.set("rating[$gte]", rating);
    }
    router.replace(`${pathName}?${parmas.toString()}`);
  };

  const handlePriceChange = (event: Event, newValue: number | number[]) => {
    parmas.set("price[$gte]", newValue.toString());
    router.replace(`${pathName}?${parmas.toString()}`);
  };

  return (
    <Box
      sx={{
        width: 250,
        border: "1px solid lightgray",
        borderRadius: "6px",
        padding: 2,
        bgcolor: "white",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
        <Typography fontSize={15} fontWeight={600} variant="body1">
          Categorys
        </Typography>
        {categories.slice(0, 6).map((category) => (
          <Box key={category._id}>
            <Checkbox
              sx={{ margin: 0, padding: 0 }}
              checked={selectedCategory === category._id}
              onChange={() => addCategories(category._id)}
            />{" "}
            <Typography variant="body1" component="span" px={1}>
              {category.categoryName}
            </Typography>
          </Box>
        ))}
      </Box>
      <Divider sx={{ my: 1 }} />
      <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
        <Typography fontSize={15} fontWeight={600} variant="body1">
          Price Range
        </Typography>
        <Typography component={"p"} variant="body1" textAlign={"end"}>
          TK 0 to 10000
        </Typography>
        <Slider
          size="medium"
          defaultValue={0}
          min={0}
          max={10000}
          onChange={handlePriceChange}
          aria-label="medium"
          valueLabelDisplay="auto"
        />
      </Box>
      <Divider sx={{ my: 1 }} />
      <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
        {/* ratings */}
        <Typography fontSize={15} fontWeight={600} variant="body1">
          Ratings
        </Typography>
        {ratings.map((rating) => (
          <Box key={rating}>
            <Typography
              variant="body1"
              component="span"
              onClick={() => ratingChange(rating)}
              sx={{ cursor: "pointer", display: "flex", alignItems: "center" }}
            >
              <Rating value={rating} readOnly size="small" />
              {rating !== 5 && (
                <Typography
                  color={selectedRatings === rating ? "primary.main" : ""}
                  component={"span"}
                  ml={1}
                  fontSize={14}
                >
                  And Up
                </Typography>
              )}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Filter;
