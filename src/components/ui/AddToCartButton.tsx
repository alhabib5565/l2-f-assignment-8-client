"use client";
import { Button } from "@mui/material";
import React from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useAppDispatch } from "@/redux/hooks";
import { addToCart } from "@/redux/features/cartSlice/cartSlice";

type TAddToCartButton = {
  productId: string;
  price: number;
  thumbnail: string;
  title: string;
};

const AddToCartButton = ({
  productId,
  price,
  thumbnail,
  title,
}: TAddToCartButton) => {
  const dispatch = useAppDispatch();
  const handleAddToCart = () => {
    dispatch(addToCart({ price, productId, thumbnail, title }));
  };
  return (
    <Button onClick={handleAddToCart} size="small" sx={{ gap: 2, flex: 1 }}>
      <span className="truncate">Add To Cart </span>
      <ShoppingCartIcon />
    </Button>
  );
};

export default AddToCartButton;
