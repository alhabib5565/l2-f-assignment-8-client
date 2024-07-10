import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  Box,
  Button,
  IconButton,
  Stack,
  SxProps,
  Typography,
} from "@mui/material";
import Image from "next/image";
import React, { ReactNode } from "react";
import { Add } from "@mui/icons-material";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  clearCart,
  removeFromCart,
  updateQuantity,
} from "@/redux/features/cartSlice/cartSlice";
import CloseIcon from "@mui/icons-material/Close";
import EmptyCart from "./EmptyCart";

const CartProductRow = () => {
  const { products } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const handleClearCart = () => {
    dispatch(clearCart());
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
      {products.length ? (
        <Box>
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

            <HeaderText sx={{ width: 80, display: { xs: "none", sm: "flex" } }}>
              Price
            </HeaderText>
            <HeaderText>Quantity</HeaderText>
            <HeaderText>Total Price</HeaderText>
            <Box width={30}></Box>
          </Stack>
          {products.map((product, index) => (
            <Box key={index}>
              <Stack
                direction="row"
                alignItems="center"
                border="1px solid lightgray"
                borderRadius={2}
                mb={2}
                p={1}
              >
                <Box
                  sx={{
                    flexGrow: 1,
                    alignItems: "center",
                    display: "flex",
                    gap: 2,
                    minHeight: 60,
                  }}
                >
                  <Image
                    style={{ borderRadius: 5, height: "100%" }}
                    height={60}
                    width={60}
                    src={product.thumbnail}
                    alt="product image"
                  />
                  <Typography
                    variant="h6"
                    component="h6"
                    sx={{ fontSize: 14, fontWeight: 600 }}
                  >
                    {product.title}
                  </Typography>
                </Box>
                <HeaderText sx={{ display: { xs: "none", sm: "flex" } }}>
                  ${product.price.toFixed(2)}
                </HeaderText>
                <Stack
                  alignItems="center"
                  direction={{ xs: "column", sm: "row" }}
                  spacing={{ xs: 0, sm: 1 }}
                >
                  <IconButton
                    onClick={() =>
                      dispatch(
                        updateQuantity({
                          productId: product.productId,
                          type: "increment",
                        })
                      )
                    }
                    sx={{
                      border: "1px solid",
                      borderRadius: 1,
                      padding: "1px",
                    }}
                    size="small"
                  >
                    <Add sx={{ height: 20, width: 20 }} />
                  </IconButton>
                  <HeaderText>{product.quantity}</HeaderText>
                  <IconButton
                    onClick={() =>
                      dispatch(
                        updateQuantity({
                          productId: product.productId,
                          type: "decrement",
                        })
                      )
                    }
                    sx={{
                      border: "1px solid",
                      borderRadius: 1,
                      padding: "1px",
                    }}
                    size="small"
                  >
                    <RemoveIcon sx={{ height: 20, width: 20 }} />
                  </IconButton>
                </Stack>
                <HeaderText sx={{ color: "primary.main" }}>
                  ${product.price * product.quantity}
                </HeaderText>
                <IconButton
                  onClick={() =>
                    dispatch(removeFromCart({ productId: product.productId }))
                  }
                  color="error"
                  size="small"
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Stack>
            </Box>
          ))}
        </Box>
      ) : (
        <EmptyCart />
      )}
    </Box>
  );
};

export default CartProductRow;

// @ts-ignore
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
      sx={sx || {}}
    >
      {children}
    </Typography>
  );
};
