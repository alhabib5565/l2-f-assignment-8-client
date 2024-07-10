import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import React from "react";
import PlaceOrderFrom from "./PlaceOrderFrom";

const OrderSummary = () => {
  const { products, priceOfTotalSelectedProducts, selectedProducts } =
    useAppSelector((state) => state.cart);

  const deliveryCharge = selectedProducts * 15;

  const dispatch = useAppDispatch();

  const handleClearCart = () => {
    // dispatch(clearCar());
  };
  return (
    <Box
      sx={{
        padding: 2,
        bgcolor: "white",
        borderRadius: 2,
        border: "1px solid lightgray",
      }}
    >
      <Typography
        display={"flex"}
        variant="h5"
        component="h5"
        alignItems="end"
        gap={1}
        fontWeight={600}
        mb={2}
      >
        Order summary
      </Typography>
      <Stack mb={1} direction="row" justifyContent="space-between">
        <Typography sx={{ fontSize: 18 }}>Total products</Typography>
        <Typography sx={{ fontSize: 18 }}>{selectedProducts}</Typography>
      </Stack>
      <Stack mb={1} direction="row" justifyContent="space-between">
        <Typography sx={{ fontSize: 18 }}>Subtotal</Typography>
        <Typography sx={{ fontSize: 18 }}>
          ${priceOfTotalSelectedProducts}
        </Typography>
      </Stack>
      <Stack mb={1} direction="row" justifyContent="space-between">
        <Typography sx={{ fontSize: 18 }}>Delivery charge</Typography>
        <Typography sx={{ fontSize: 18 }}>${deliveryCharge}</Typography>
      </Stack>
      <Divider sx={{ my: 2 }} />

      <Stack mb={1} direction="row" justifyContent="space-between">
        <Typography sx={{ fontSize: 18, fontWeight: 600 }}>Total</Typography>
        <Typography
          sx={{ color: "primary.main", fontSize: 18, fontWeight: 600 }}
        >
          ${priceOfTotalSelectedProducts + deliveryCharge}
        </Typography>
      </Stack>
      {/* <Box mb={3}>
        <PlaceOrderFrom />
      </Box> */}
    </Box>
  );
};

export default OrderSummary;
