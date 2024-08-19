"use client";
import { Button, SxProps } from "@mui/material";
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
  sx?: SxProps;
  fullWidth?: boolean;
};

const AddToCartButton = ({
  productId,
  price,
  thumbnail,
  productName,
  sx,
  fullWidth = true,
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
      fullWidth={fullWidth}
      onClick={(e) => handleAddToCart(e)}
      size="small"
      endIcon={<ShoppingCartIcon />}
      sx={sx}
    >
      Add To Cart
    </Button>
  );
};

export default AddToCartButton;
