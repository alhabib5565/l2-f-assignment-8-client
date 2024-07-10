"use client";
import { Box, Container, Grid, SxProps, Typography } from "@mui/material";
import React from "react";
import dynamic from "next/dynamic";
import PlaceOrderFrom from "./components/PlaceOrderFrom";
const CartProductRow = dynamic(() => import("./components/CartProductRow"), {
  ssr: false,
});
const OrderSummary = dynamic(() => import("./components/OrderSummary"), {
  ssr: false,
});

const CheckoutPage = () => {
  return (
    <Box bgcolor="secondary.main" minHeight="100vh">
      <Container sx={{ py: 5 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={7}>
            <CartProductRow />
            <PlaceOrderFrom />
          </Grid>

          <Grid item xs={12} md={5}>
            <OrderSummary />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default CheckoutPage;
