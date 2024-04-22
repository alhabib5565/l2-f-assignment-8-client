"use client";
import { clearCart } from "@/redux/features/cartSlice/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  SxProps,
  Typography,
} from "@mui/material";
import React, { ReactNode } from "react";
import dynamic from "next/dynamic";
import CloseIcon from "@mui/icons-material/Close";
const CartProductRow = dynamic(() => import("./components/CartProductRow"), {
  ssr: false,
});

const CheckoutPage = () => {
  const { products, priceOfTotalSelectedProducts, selectedProducts } =
    useAppSelector((state) => state.cart);

  const dispatch = useAppDispatch();

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <Box bgcolor="secondary.main" minHeight="100vh">
      <Container sx={{ py: 5 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={7}>
            <Box sx={{ padding: 2, bgcolor: "white", borderRadius: 2 }}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="centers"
                pb={2}
              >
                <Typography
                  display={"flex"}
                  variant="h5"
                  component="h5"
                  alignItems="end"
                  gap={1}
                  fontWeight={600}
                >
                  {" "}
                  Cart <Typography>({products.length} products)</Typography>
                </Typography>
                <Button onClick={handleClearCart} color="error" variant="text">
                  <CloseIcon fontSize="small" /> Clear Cart
                </Button>
              </Stack>
              <Stack direction="row" mb={2}>
                <Typography
                  sx={{ flexGrow: 1, fontSize: 16 }}
                  variant="h6"
                  component="h6"
                  fontWeight={600}
                >
                  Product
                </Typography>

                <HeaderText sx={{ width: 80 }}>Price</HeaderText>
                <HeaderText>Quantity</HeaderText>
                <HeaderText>Total Price</HeaderText>
                <Box width={30}></Box>
              </Stack>
              <CartProductRow />
            </Box>
          </Grid>
          <Grid item xs={12} md={5}>
            <Box sx={{ padding: 2, bgcolor: "white", borderRadius: 2 }}>
              right
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default CheckoutPage;

type THeaderText = {
  children: ReactNode;
  sx?: SxProps;
};
export const HeaderText = ({ children, sx }: THeaderText) => {
  return (
    <Typography
      variant="h6"
      component="h6"
      fontSize={16}
      fontWeight={600}
      maxWidth={100}
      width={"100%"}
      textAlign="center"
      sx={sx}
    >
      {children}
    </Typography>
  );
};
