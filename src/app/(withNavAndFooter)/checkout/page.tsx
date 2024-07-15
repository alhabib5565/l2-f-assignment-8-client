"use client";
import { Box, Container, Grid, SxProps, Typography } from "@mui/material";
import React from "react";
import dynamic from "next/dynamic";
import PlaceOrderFrom from "./components/PlaceOrderFrom";
import { useAppSelector } from "@/redux/hooks";
import { Product } from "@/type/order.type";
const CartProductRow = dynamic(() => import("./components/CartProductRow"), {
  ssr: false,
});
const OrderSummary = dynamic(() => import("./components/OrderSummary"), {
  ssr: false,
});

const CheckoutPage = () => {
  const { priceOfTotalSelectedProducts, selectedProducts, products } =
    useAppSelector((state) => state.cart);
  return (
    <Box bgcolor="secondary.main" minHeight="100vh">
      <Container sx={{ py: 5 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={7}>
            <CartProductRow />
            <PlaceOrderFrom />
          </Grid>

          <Grid item xs={12} md={5}>
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
              <OrderSummary
                subTotalPrice={priceOfTotalSelectedProducts}
                products={products as Product[]}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default CheckoutPage;
