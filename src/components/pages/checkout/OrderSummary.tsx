import { Product } from "@/type/order.type";
import { Box, Divider, Stack, Typography } from "@mui/material";
import React from "react";

type TOrderSummeryPrpos = {
  subTotalPrice: number;
  products: Product[];
};

const OrderSummary = ({ products, subTotalPrice }: TOrderSummeryPrpos) => {
  const totalQuantity = products.reduce((previousValue, currentValue) => {
    return previousValue + currentValue.quantity;
  }, 0);

  const deliveryCharge = products.length * 15;

  const estimatedTax = ((4 / 100) * (subTotalPrice + deliveryCharge)).toFixed(
    2
  );

  const totalPrice = subTotalPrice + deliveryCharge + Number(estimatedTax);
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
          Sub Total:
        </Typography>
        <Typography variant="body1" fontWeight={600} fontSize={14}>
          TK {subTotalPrice}
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
          TK {estimatedTax}
        </Typography>
      </Stack>
      <Divider sx={{ my: 2 }} />

      <Stack mb={2} direction="row" justifyContent="space-between">
        <Typography sx={{ fontSize: 18, fontWeight: 600 }}>Total</Typography>
        <Typography
          sx={{ color: "primary.main", fontSize: 18, fontWeight: 600 }}
        >
          TK {totalPrice}
        </Typography>
      </Stack>
    </Box>
  );
};

export default OrderSummary;
