import { proceedOrder } from "@/actions/proceedOrder";
import MyForm from "@/components/form/MyForm";
import MyInput from "@/components/form/MyInput";
import { clearCart } from "@/redux/features/cartSlice/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  CheckoutValidationSchema,
  checkoutDefaultValue,
} from "@/validationSchema/validation.procedCheckout";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import React from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

const PlaceOrderFrom = () => {
  const { products, selectedProducts, priceOfTotalSelectedProducts } =
    useAppSelector((state) => state.cart);

  const totalPrice = priceOfTotalSelectedProducts + selectedProducts * 15;

  const dispatch = useAppDispatch();

  const onSubmit = async (value: FieldValues) => {
    value.products = products;
    value.totalPrice = totalPrice;
    const response = await proceedOrder(value);
    if (response?.success) {
      toast.success(response?.message || "Order place sucesfully");
      dispatch(clearCart());
    }
  };
  return (
    <Box>
      <Typography
        variant="h5"
        component="h5"
        alignItems="end"
        gap={1}
        fontWeight={600}
        mb={2}
      >
        Shipping Address
      </Typography>

      <MyForm
        resolver={zodResolver(CheckoutValidationSchema)}
        defaultValues={checkoutDefaultValue}
        onSubmit={onSubmit}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <MyInput label="Name" name="name" type="text" />
          </Grid>
          <Grid item xs={12}>
            <MyInput label="Email" name="email" type="email" />
          </Grid>
          <Grid item xs={12}>
            <MyInput label="Phone" name="phone" type="text" />
          </Grid>
          <Grid item xs={6}>
            <MyInput label="Town/City" name="town_city" type="text" />
          </Grid>
          <Grid item xs={6}>
            <MyInput label="Post Code" name="post_code" type="number" />
          </Grid>
        </Grid>
        <Divider sx={{ my: 2 }} />
        <Button type="submit" fullWidth sx={{ borderRadius: 5 }}>
          Place Order
        </Button>
      </MyForm>
    </Box>
  );
};

export default PlaceOrderFrom;
