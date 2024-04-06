"use client";
import { Typography } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import React, { useState } from "react";
import Slider from "@mui/material/Slider";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const brands = ["OxiClean", "Chaldal", "Downy", "Charlie's Soap", "Tide"];

const ratings = [1, 2, 3, 4, 5];

const Filter = () => {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const parmas = new URLSearchParams(searchParams);

  const [selectedBrand, setSelectedBrand] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [selectedRatings, setSelectedRatings] = useState<number>(0);

  const addBrands = (brand: string) => {
    setSelectedBrand((prev) => (prev = brand));
    if (brand && brand !== selectedBrand) {
      parmas.set("brand", brand);
    } else if (brand && brand === selectedBrand) {
      setSelectedBrand((prev) => (prev = ""));
      parmas.delete("brand");
    }

    router.replace(`${pathName}?${parmas.toString()}`);
  };

  const ratingChange = (rating: any) => {
    if (selectedRatings && selectedRatings === rating) {
      setSelectedRatings(0);
      parmas.delete("minRating");
    } else {
      setSelectedRatings(rating);
      parmas.set("minRating", rating);
    }
    router.replace(`${pathName}?${parmas.toString()}`);
  };

  const handleChange = (event: Event, newValue: number | number[]) => {
    setPrice(newValue as number);
    parmas.set("minPrice", newValue.toString());
    router.replace(`${pathName}?${parmas.toString()}`);
  };

  return (
    <div className="w-[250px] border border-slate-300 rounded-md p-3 h-fit">
      <div className="space-y-2">
        <h5 className="text-lg font-medium text-slate-700">Brands</h5>
        {brands.map((brand) => (
          <div key={brand}>
            <Checkbox
              sx={{ margin: 0, padding: 0 }}
              checked={selectedBrand === brand}
              onChange={() => addBrands(brand)}
            />{" "}
            <Typography variant="body1" component="span" px={1}>
              {brand}
            </Typography>
          </div>
        ))}
      </div>
      <div className=" space-y-2 py-4">
        <h5 className="text-lg font-medium text-slate-700">Price Range</h5>
        <p className="text-end">$0 to $200</p>
        <Slider
          size="medium"
          defaultValue={0}
          min={0}
          max={100}
          onChange={handleChange}
          aria-label="medium"
          valueLabelDisplay="auto"
        />
      </div>
      <div className="space-y-2">
        {/* ratings */}
        <h5 className="text-lg font-medium text-slate-700">Ratings</h5>
        {ratings.map((rating) => (
          <div key={rating}>
            <Checkbox
              sx={{ margin: 0, padding: 0 }}
              checked={selectedRatings === rating}
              onChange={() => ratingChange(rating)}
            />{" "}
            <Typography variant="body1" component="span" px={1}>
              {rating} Star
            </Typography>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filter;
