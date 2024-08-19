"use client";
import * as React from "react";
import Badge, { BadgeProps } from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useAppSelector } from "@/redux/hooks";
import Link from "next/link";

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 1,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

export default function CartIcon() {
  const { selectedProducts } = useAppSelector((state) => state.cart);
  // const selectedProducts = cart.selectedProducts
  return (
    <Link href="/checkout">
      <IconButton
        sx={{ mr: 2, display: { md: "block", xs: "none" } }}
        aria-label="cart"
      >
        <StyledBadge badgeContent={selectedProducts || 0} color="secondary">
          <ShoppingCartIcon />
        </StyledBadge>
      </IconButton>
    </Link>
  );
}
