import MyDatePicker from "@/components/form/MyDatePicker";
import MyForm from "@/components/form/MyForm";
import MyInput from "@/components/form/MyInput";
import { useAddToFlashSaleMutation } from "@/redux/api/product.api";
import {
  addFlashSaleFormDefaultValues,
  AddFlashSaleFormValidationSchema,
} from "@/validationSchema/validation.addFlashSale";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Grid } from "@mui/material";
import React from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

const FlashSaleForm = ({ productId }: { productId: string }) => {
  const [addFlashSale] = useAddToFlashSaleMutation();

  const onSubmit = async (value: FieldValues) => {
    value.flashSaleDiscountPercentage = Number(
      value.flashSaleDiscountPercentage
    );
    const response = (await addFlashSale({
      id: productId,
      data: { flashSale: value },
    })) as any;
    if (response?.data?.success) {
      toast.success(response?.data?.message);
    } else {
      toast.error("Failed...");
    }
  };

  return (
    <MyForm
      resolver={zodResolver(AddFlashSaleFormValidationSchema)}
      defaultValues={addFlashSaleFormDefaultValues}
      onSubmit={onSubmit}
    >
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <MyInput
            type="number"
            label="Discount Percentage"
            name="flashSaleDiscountPercentage"
          />
        </Grid>
        <Grid item xs={6}>
          <MyDatePicker label="Start Date" name="flashSaleStartDate" />
        </Grid>
        <Grid item xs={6}>
          <MyDatePicker label="End Date" name="flashSaleEndDate" />
        </Grid>
      </Grid>
      <Box
        sx={{
          display: "flex",
          justifyContent: "end",
          mt: 3,
        }}
      >
        <Button type="submit">Create</Button>
      </Box>
    </MyForm>
  );
};

export default FlashSaleForm;
