"use client";
import { Box, Button, Stack, Typography } from "@mui/material";
import React, { useState } from "react";

import Grid from "@mui/material/Grid";
import MyForm from "@/components/form/MyForm";
import { FieldValues } from "react-hook-form";
import MyInput from "@/components/form/MyInput";
import ImageUpload from "./components/ImageUpload";
import MySelect from "@/components/form/MySelect";
import {
  categoryOptions,
  productTypeOptions,
  weightUnitOptions,
} from "@/constent/selectOptions";
import AddFeatures from "./components/AddFeature";
import {
  ProductValidationSchema,
  productDefaultValue,
} from "@/validationSchema/validation.addProduct";
import { zodResolver } from "@hookform/resolvers/zod";
import { addProduct } from "@/actions/addProduct";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useGetAllBrandsQuery } from "@/redux/api/brand.api";
import { TColor, TSelectOptions } from "@/type";
import { useGetAllColorsQuery } from "@/redux/api/color.api";
import MyMultiSelect, {
  TMultiSelectOption,
} from "@/components/form/MyMultiSelect";

const AddProduct = () => {
  const router = useRouter();
  const [features, setFeatures] = useState<string[]>([]);
  const [productImagesUrl, setProductImagesUrl] = useState<string[]>([]);

  const { data, isLoading } = useGetAllBrandsQuery({});
  const { data: colorData, isLoading: colorIsLoading } = useGetAllColorsQuery(
    {}
  );

  const colorOptions = colorData?.data?.map((color: TColor) => ({
    _id: color._id,
    label: color.name,
    hexCode: color.hexCode,
  }));

  if (isLoading) {
    return "loading...";
  }
  const brandOptions: TSelectOptions[] = data?.data.map((brand: any) => ({
    value: brand._id,
    label: brand._id,
  }));

  const onSubmit = async (value: FieldValues) => {
    console.log(value);
    if (!productImagesUrl.length) {
      return toast.error("Please add product thumnail", {
        className: "text-red-500",
      });
    }

    value.features = features || [];
    value.thumbnail = productImagesUrl[0];
    value.images = productImagesUrl;
    delete value.unit;

    const response = await addProduct(value);
    if (response?.success) {
      toast.success(response.message || "product add succesfull");
      router.push("/dashboard/products");
    }
  };

  return (
    <Box bgcolor="white" padding={2} borderRadius={2}>
      <Box width="100%">
        <MyForm
          // defaultValues={productDefaultValue}
          // resolver={zodResolver(ProductValidationSchema)}
          onSubmit={onSubmit}
        >
          <Stack mb={2} direction="row" justifyContent="space-between">
            <Typography variant="h6" component="h6">
              Add New Product
            </Typography>
            <Button type="submit">Add Product</Button>
          </Stack>
          <Grid container spacing={4}>
            {/* left side of the form */}
            <Grid item xs={12} md={6} lg={7}>
              {/* General Information */}
              <Box>
                <Typography
                  variant="h6"
                  component="h6"
                  fontWeight={600}
                  fontSize={18}
                  mb={1}
                >
                  General Information
                </Typography>
                <Grid container spacing={2}>
                  <Grid xs={12} item>
                    <MyInput
                      name="title"
                      // placeholder="Enter product name"
                      label="Product Name"
                      type="text"
                    />
                  </Grid>
                  <Grid xs={12} item>
                    <MyInput
                      multiline={true}
                      rows={6}
                      // placeholder="Enter product description"
                      name="description"
                      label="Poduct Description"
                      type="text"
                    />
                  </Grid>
                </Grid>
              </Box>

              {/* Price And Stock */}
              <Box mt={2}>
                <Typography
                  variant="h6"
                  component="h6"
                  fontWeight={600}
                  fontSize={18}
                  mb={1}
                >
                  Pricing And Stock
                </Typography>
                <Grid container spacing={2}>
                  <Grid xs={6} item>
                    <MyInput name="price" label="Product Price" type="number" />
                  </Grid>
                  <Grid xs={6} item>
                    <MyInput
                      name="discountPercentage"
                      label="Discount Percentage"
                      type="number"
                    />
                  </Grid>
                  <Grid xs={12} item>
                    <MyInput name="stock" label="Product Stock" type="number" />
                  </Grid>
                </Grid>
              </Box>

              {/* Weight And unit Product type*/}
              <Box mt={2}>
                <Typography
                  variant="h6"
                  component="h6"
                  fontWeight={600}
                  fontSize={18}
                  mb={1}
                >
                  Weight Unit And Product Type
                </Typography>
                <Grid container spacing={2}>
                  <Grid xs={6} item>
                    <MyInput
                      name="weight"
                      label="Product Weight"
                      type="number"
                    />
                  </Grid>
                  <Grid xs={6} item>
                    <MySelect
                      name="unit"
                      label="Unit"
                      options={weightUnitOptions}
                    />
                  </Grid>
                  <Grid xs={12} item>
                    <MySelect
                      name="type"
                      label="Product type"
                      options={productTypeOptions}
                    />
                  </Grid>
                </Grid>
              </Box>

              {/* Brand and category select  */}
              <Box mt={2}>
                <Typography
                  variant="h6"
                  component="h6"
                  fontWeight={600}
                  fontSize={18}
                  mb={1}
                >
                  Category & Brand
                </Typography>

                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Box>
                      <MySelect
                        name="category"
                        label="Product Category"
                        options={categoryOptions}
                      />
                    </Box>
                  </Grid>

                  {/* brand */}
                  <Grid item xs={6}>
                    <Box>
                      <MySelect
                        name="brand"
                        label="Product Brand"
                        options={brandOptions}
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Box>

              {/* Features */}
              <Box mt={2} borderRadius={2}>
                <Typography
                  variant="h6"
                  component="h6"
                  fontWeight={600}
                  fontSize={18}
                >
                  Features
                </Typography>

                <AddFeatures features={features} setFeatures={setFeatures} />
              </Box>
            </Grid>

            {/* right side of the form */}
            <Grid item xs={12} md={6} lg={5}>
              {/* Image Upload  */}
              <Box>
                <ImageUpload
                  productImagesUrl={productImagesUrl}
                  setProductImagesUrl={setProductImagesUrl}
                />
              </Box>
              <Box mt={2}>
                <Typography
                  variant="h6"
                  component="h6"
                  fontWeight={600}
                  fontSize={18}
                  mb={0.5}
                >
                  Variants
                </Typography>
                <MyMultiSelect
                  name="variants.color"
                  label="Colors"
                  disabled={colorIsLoading}
                  options={colorOptions || []}
                />
              </Box>
            </Grid>
          </Grid>
        </MyForm>
      </Box>
    </Box>
  );
};

export default AddProduct;

/**
 *     Brand and category select 
                <Grid
                  mt={2}
                  bgcolor="secondary.main"
                  p={2}
                  borderRadius={2}
                  xs={12}
                  item
                >
                  <Typography
                    variant="h6"
                    component="h6"
                    fontWeight={600}
                    fontSize={18}
                    mb={1}
                  >
                    Category & Brand
                  </Typography>

                  <Stack direction="row" spacing={2}>
                    <Box flex={1}>
                      <MySelect
                        name="category"
                        label="Product Category"
                        options={categoryOptions}
                      />
                    </Box>

                    <Button sx={{ whiteSpace: "nowrap" }}>Add Category</Button>
                  </Stack>
                  // brand 
                  <Stack mt={2} direction="row" spacing={2}>
                    <Box flex={1}>
                      <MySelect
                        name="brand"
                        label="Product Brand"
                        options={brandOptions}
                      />
                    </Box>

                    <Button sx={{ whiteSpace: "nowrap" }}>Add brand</Button>
                  </Stack>
                </Grid>
 */
