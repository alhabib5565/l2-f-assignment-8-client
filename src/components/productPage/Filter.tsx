"use client";
import { Typography } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import React, { useEffect, useState } from "react";
import Slider from "@mui/material/Slider";
import { TProduct } from "@/type/product.type";

const brands = ["OxiClean", "Chaldal", "Downy", "Charlie's Soap", "Tide"];

const ratings = [1, 2, 3, 4, 5];
type TFilter = {
  setProducts: React.Dispatch<React.SetStateAction<TProduct[]>>;
  products: TProduct[];
};
const Filter = ({ products, setProducts }: TFilter) => {
  const [allProducts, setAllProducts] = useState<TProduct[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [price, setPrice] = useState<number>(0);
  const [selectedRatings, setSelectedRatings] = useState<number>(0);

  console.log({ selectedBrands, selectedRatings, price });
  useEffect(() => {
    fetch(`https://assignment-8-server.vercel.app/api/v1/products`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.data);
        setAllProducts(data.data);
      });
  }, [setProducts]);

  useEffect(() => {
    if (selectedBrands.length > 0) {
      const filteredData = allProducts.filter(
        (product) =>
          product.price >= price &&
          product.rating >= selectedRatings &&
          selectedBrands.includes(product.brand)
      );
      setProducts(filteredData);
      // console.log(filteredData, "with barand");
    } else {
      const filteredData = allProducts.filter(
        (product) => product.price > price && product.rating > selectedRatings
      );
      // console.log(filteredData, "without barand");
      setProducts(filteredData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [price, selectedBrands, selectedRatings]);

  const addBrands = (brand: any) => {
    if (!selectedBrands.includes(brand)) {
      setSelectedBrands((prev) => [...prev, brand]);
    } else {
      setSelectedBrands((prev) => {
        return prev.filter((item) => item !== brand);
      });
    }
  };
  const ratingChange = (rating: any) => {
    if (selectedRatings && selectedRatings === rating) {
      setSelectedRatings(0);
    } else {
      setSelectedRatings(rating);
    }
  };
  const handleChange = (event: Event, newValue: number | number[]) => {
    setPrice(newValue as number);
  };

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
        <p className="text-end">$0 to $200</p>
        <Slider
          size="medium"
          defaultValue={0}
          min={0}
          max={200}
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

/**
 *  const searchParams = useSearchParams();
  // console.log(searchParams.toString(), "from filter ui");
  const [allProducts, setAllProducts] = useState<TProduct[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [price, setPrice] = useState<number>(0);
  const [selectedRatings, setSelectedRatings] = useState<number>(0);

  console.log({ selectedBrands, selectedRatings, price });
  useEffect(() => {
    fetch(`https://assignment-8-server.vercel.app/api/v1/products`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.data);
        setAllProducts(data.data);
      });
  }, [setProducts]);

  useEffect(() => {
    if (selectedBrands.length > 0) {
      const filteredData = allProducts.filter(
        (product) =>
          product.price >= price &&
          product.rating >= selectedRatings &&
          selectedBrands.includes(product.brand)
      );
      setProducts(filteredData);
      // console.log(filteredData, "with barand");
    } else {
      const filteredData = allProducts.filter(
        (product) => product.price > price && product.rating > selectedRatings
      );
      // console.log(filteredData, "without barand");
      setProducts(filteredData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [price, selectedBrands, selectedRatings]);

  const addBrands = (brand: any) => {
    if (!selectedBrands.includes(brand)) {
      setSelectedBrands((prev) => [...prev, brand]);
    } else {
      setSelectedBrands((prev) => {
        return prev.filter((item) => item !== brand);
      });
    }
  };
  const ratingChange = (rating: any) => {
    if (selectedRatings && selectedRatings === rating) {
      setSelectedRatings(0);
    } else {
      setSelectedRatings(rating);
    }
  };
  const handleChange = (event: Event, newValue: number | number[]) => {
    setPrice(newValue as number);
  };

 */
