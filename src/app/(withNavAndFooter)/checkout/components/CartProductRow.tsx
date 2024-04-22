import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import { HeaderText } from "../page";
import { Add } from "@mui/icons-material";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  removeFromCart,
  updateQuantity,
} from "@/redux/features/cartSlice/cartSlice";
import cartImage from "../../../../assets/cart_image.png";
import CloseIcon from "@mui/icons-material/Close";

const CartProductRow = () => {
  const { products } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  return (
    <Box>
      {products.length ? (
        <>
          {products.map((product, index) => (
            <>
              <Stack
                key={product.productId}
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
                  }}
                >
                  <Image
                    style={{ borderRadius: 5 }}
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
                <HeaderText>${product.price}</HeaderText>
                <Stack alignItems="center" direction="row" gap={1}>
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
            </>
          ))}
        </>
      ) : (
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
      )}
    </Box>
  );
};

export default CartProductRow;
