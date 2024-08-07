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
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import MySelect from "@/components/form/MySelect";
import {
  deliveryTypeOptions,
  itemTypeOptions,
} from "./procedOrderSelectOptions";
import { useGetDivisionOptions } from "@/hooks/locationOptionHook/useGetDivisionOptions";
import { useGetDistrictOptions } from "@/hooks/locationOptionHook/useGetDistrictOptions";
import { useGetUpazilaOptions } from "@/hooks/locationOptionHook/useGetUpazilaOptions";

const PlaceOrderFrom = () => {
  const { user } = useAppSelector((state) => state.auth);
  console.log(user);

  const divisionOptions = useGetDivisionOptions();
  const districtOptions = useGetDistrictOptions();
  const upazilaOptions = useGetUpazilaOptions();
  const unionOptions = useGetUpazilaOptions();

  const { products, selectedProducts, priceOfTotalSelectedProducts } =
    useAppSelector((state) => state.cart);
  const totalPrice = priceOfTotalSelectedProducts + selectedProducts * 15;

  const dispatch = useAppDispatch();

  const onSubmit = async (value: FieldValues) => {
    if (!user) {
      return toast.error("Please login", {
        duration: 5000,
      });
    }
    value.products = products;
    value.totalPrice = totalPrice;
    value.paymentInfo.method = "Cash On Delivery";
    const response = await proceedOrder(value);
    console.log(response);
    if (response?.success) {
      toast.success(response?.message || "Order place sucesfully");
      dispatch(clearCart());
    }
  };

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

          <Grid item xs={6}>
            <MySelect
              name="division"
              label="Division"
              options={divisionOptions}
            />
          </Grid>

          <Grid item xs={6}>
            <MySelect
              name="district"
              label="District"
              options={districtOptions}
            />
          </Grid>
          <Grid item xs={6}>
            <MySelect label="Upazila" name="upazila" options={upazilaOptions} />
          </Grid>

          <Grid item xs={6}>
            <MySelect name="union" label="Union" options={unionOptions} />
          </Grid>

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
