"use client";
import { Button } from "@mui/material";
import React, { MouseEvent } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useAppDispatch } from "@/redux/hooks";
import { addToCart } from "@/redux/features/cartSlice/cartSlice";
import { toast } from "sonner";

type TAddToCartButton = {
  productId: string;
  price: number;
  thumbnail: string;
  productName: string;
};

const AddToCartButton = ({
  productId,
  price,
  thumbnail,
  productName,
}: TAddToCartButton) => {
  const dispatch = useAppDispatch();
  const handleAddToCart = (e: MouseEvent<HTMLButtonElement>) => {
    dispatch(addToCart({ price, productId, thumbnail, productName }));
    toast.success(`You have added ${productName} to your cart`);
    e.preventDefault();
    e.stopPropagation();
  };
  return (
    <Button
      fullWidth
      onClick={(e) => handleAddToCart(e)}
      size="small"
      sx={{ gap: 2, flex: 1 }}
    >
      <span className="truncate">Add To Cart </span>
      <ShoppingCartIcon />
    </Button>
  );
};

export default AddToCartButton;
