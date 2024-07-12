"use client";
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
import React, { useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import {
  allDivision,
  districtsOf,
  divisionalDataOf,
  DivisonName,
} from "@bangladeshi/bangladesh-address";
import MySelectWithWatch from "@/components/form/MySelectWithWatch";
import MySelect from "@/components/form/MySelect";
import {
  deliveryTypeOptions,
  itemTypeOptions,
} from "./procedOrderSelectOptions";
const PlaceOrderFrom = () => {
  const { products, selectedProducts, priceOfTotalSelectedProducts } =
    useAppSelector((state) => state.cart);
  const totalPrice = priceOfTotalSelectedProducts + selectedProducts * 15;

  const dispatch = useAppDispatch();

  const onSubmit = async (value: FieldValues) => {
    value.products = products;
    value.totalPrice = totalPrice;
    console.log(value);
    // const response = await proceedOrder(value);
    // if (response?.success) {
    //   toast.success(response?.message || "Order place sucesfully");
    //   dispatch(clearCart());
    // }
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

          <Grid item xs={12}>
            <MyInput label="Address" name="recipient_address" type="text" />
          </Grid>
          {/* <Grid item xs={6}>
            <MySelectWithWatch
              name="division"
              label="Division"
              options={divisionOptions}
              onValueChange={setDivision}
            />
          </Grid>
          <Grid item xs={6}>
            <MySelectWithWatch
              name="district"
              label="District"
              disabled={!division}
              options={divisionOptions}
              onValueChange={setDivision}
            />
          </Grid> */}

          <Grid item xs={12}>
            <MyInput label="Area" name="recipient_area" type="text" />
          </Grid>
          <Grid item xs={6}>
            <MySelect
              label="Item Type"
              name="item_type"
              options={itemTypeOptions}
            />
          </Grid>
          <Grid item xs={6}>
            <MySelect
              label="Delivery Type"
              name="delivery_type"
              options={deliveryTypeOptions}
            />
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
