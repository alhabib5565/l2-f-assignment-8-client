"use client";
import { Typography } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import React, { useEffect, useState } from "react";
import Slider from "@mui/material/Slider";
import { useSearchParams } from "next/navigation";
import { TProduct } from "@/type/product.type";
import { allProduct } from "@/utils/product";

const brands = [
  "smartphones",
  "laptops",
  "fragrances",
  "skincare",
  "groceries",
];

const ratings = [1, 2, 3, 4, 5, 6];
type TFilter = {
  setProducts: React.Dispatch<React.SetStateAction<never[]>>;
  products: TProduct[];
};
const Filter = ({ products, setProducts }: TFilter) => {
  const searchParams = useSearchParams();
  console.log(searchParams.toString(), "from filter ui");
  useEffect(() => {
    fetch(`https://assignment-8-server.vercel.app/api/v1/products`)
      .then((res) => res.json())
      .then((data) => setProducts(data.data));
  }, [setProducts]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [value, setValue] = useState<number[]>([20, 37]);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);

  const addBrands = (brand: any) => {
    if (!selectedBrands.includes(brand)) {
      setSelectedBrands((prev) => [...prev, brand]);
    } else {
      setSelectedBrands((prev) => {
        return prev.filter((item) => item !== brand);
      });
    }
  };
  const addRatings = (rating: any) => {
    if (!selectedRatings.includes(rating)) {
      setSelectedRatings((prev) => [...prev, rating]);
    } else {
      setSelectedRatings((prev) => {
        return prev.filter((item) => item !== rating);
      });
    }
  };
  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };
  function valuetext(value: number) {
    return `$${value}`;
  }

  return (
    <div className="w-[250px] border border-slate-300 rounded-md p-3 h-fit">
      <div className="space-y-2">
        <h5 className="text-lg font-medium text-slate-700">Brands</h5>
        {brands.map((brand) => (
          <div key={brand}>
            <Checkbox
              sx={{ margin: 0, padding: 0 }}
              checked={selectedBrands.includes(brand)}
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

        <Slider
          getAriaLabel={() => "Temperature range"}
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
          getAriaValueText={valuetext}
        />
      </div>
      <div className="space-y-2">
        {/* ratings */}
        <h5 className="text-lg font-medium text-slate-700">Ratings</h5>
        {ratings.map((rating) => (
          <div key={rating}>
            <Checkbox
              sx={{ margin: 0, padding: 0 }}
              checked={selectedRatings.includes(rating)}
              onChange={() => addRatings(rating)}
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
