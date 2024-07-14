import { useAppSelector } from "@/redux/hooks";
import { Product } from "@/type/order.type";
import { Box, Divider, Stack, Typography } from "@mui/material";
import React from "react";

type TOrderSummeryPrpos = {
  totalPrice: number;
  products: Product[];
};

const OrderSummary = ({ products, totalPrice }: TOrderSummeryPrpos) => {
  const totalQuantity = products.reduce((previousValue, currentValue) => {
    return previousValue + currentValue.quantity;
  }, 0);
  const deliveryCharge = products.length * 15;

  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <Stack mb={2} direction="row" justifyContent="space-between">
        <Typography variant="body1" fontWeight={600} fontSize={14}>
          Total products:
        </Typography>
        <Typography variant="body1" fontWeight={600} fontSize={14}>
          {totalQuantity}
        </Typography>
      </Stack>
      <Stack mb={2} direction="row" justifyContent="space-between">
        <Typography variant="body1" fontWeight={600} fontSize={14}>
          Subtotal:
        </Typography>
        <Typography variant="body1" fontWeight={600} fontSize={14}>
          TK {totalPrice}
        </Typography>
      </Stack>
      <Stack mb={2} direction="row" justifyContent="space-between">
        <Typography variant="body1" fontWeight={600} fontSize={14}>
          Discount:
        </Typography>
        <Typography variant="body1" fontWeight={600} fontSize={14}>
          TK 00
        </Typography>
      </Stack>
      <Stack mb={2} direction="row" justifyContent="space-between">
        <Typography variant="body1" fontWeight={600} fontSize={14}>
          Delivery charge:
        </Typography>
        <Typography variant="body1" fontWeight={600} fontSize={14}>
          TK {deliveryCharge}
        </Typography>
      </Stack>
      <Stack mb={2} direction="row" justifyContent="space-between">
        <Typography variant="body1" fontWeight={600} fontSize={14}>
          Estimated Tax:
        </Typography>
        <Typography variant="body1" fontWeight={600} fontSize={14}>
          TK {deliveryCharge}
        </Typography>
      </Stack>
      <Divider sx={{ my: 2 }} />

      <Stack mb={2} direction="row" justifyContent="space-between">
        <Typography sx={{ fontSize: 18, fontWeight: 600 }}>Total</Typography>
        <Typography
          sx={{ color: "primary.main", fontSize: 18, fontWeight: 600 }}
        >
          TK {totalPrice + deliveryCharge}
        </Typography>
      </Stack>
    </Box>
  );
};

export default OrderSummary;
