import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import cartImage from "../../../../assets/cart_image.png";

const EmptyCart = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      gap={2}
      py={3}
    >
      <Image height={100} width={100} src={cartImage} alt="" />
      <Typography component="h4" variant="h4" fontWeight={600}>
        Your cart is Empty
      </Typography>
      <Typography component="p" variant="body1" fontSize={18}>
        Sorry mate... no items found inside your cart
      </Typography>
      <Button href="/products" sx={{ borderRadius: 5 }}>
        Shop now
      </Button>
    </Box>
  );
};

export default EmptyCart;
