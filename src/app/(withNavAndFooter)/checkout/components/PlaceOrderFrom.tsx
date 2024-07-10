"use client";
import { proceedOrder } from "@/actions/proceedOrder";
import MyForm from "@/components/form/MyForm";
import MyInput from "@/components/form/MyInput";
import { useGetDivisionsQuery } from "@/redux/api/bdLocation.api";
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
  // const { data, isLoading } = useGetDivisionsQuery({});
  // console.log(data);
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

  /**

recipient_name:"<recipient name>"
recipient_phone:"<recipient phone>"
recipient_address:"<recipient address>"
recipient_city:"<recipient city>"
recipient_zone:"<recipient zone>"
recipient_area:"<recipient area>"
delivery_type:"<delivery type>"
item_type:"<item type>"
   */
  return (
    <Box
      sx={{
        mt: 4,
        padding: 2,
        bgcolor: "white",
        borderRadius: 2,
        border: "1px solid lightgray",
      }}
    >
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
          <Grid item xs={6}>
            <MyInput label="Name" name="recipient_name" type="text" />
          </Grid>
          <Grid item xs={6}>
            <MyInput label="Phone" name="recipient_phone" type="text" />
          </Grid>
          {/* <Grid item xs={12}>
            <MyInput label="Email" name="email" type="email" />
          </Grid> */}
          <Grid item xs={12}>
            <MyInput label="Address" name="recipient_address" type="text" />
          </Grid>
          <Grid item xs={6}>
            <MyInput label="City" name="recipient_city" type="text" />
          </Grid>
          <Grid item xs={6}>
            <MyInput label="Zone" name="recipient_zone" type="text" />
          </Grid>
          <Grid item xs={12}>
            <MyInput label="Area" name="recipient_area" type="text" />
          </Grid>
          <Grid item xs={6}>
            <MyInput label="Item Type" name="item_type" type="text" />
          </Grid>
          <Grid item xs={6}>
            <MyInput label="Delivery Type" name="delivery_type" type="text" />
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
