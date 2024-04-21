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
  productTypeOptions,
  weightUnitOptions,
} from "@/constent/selectOptions";
import AddFeatures from "./components/AddFeature";
import {
  ProductValidationSchema,
  productDefaultValue,
} from "@/validationSchema/validation.addProduct";

const AddProduct = () => {
  const [features, setFeatures] = useState<string[]>([
    "habib",
    "imran",
    "netun",
  ]);
  const [productImagesUrl, setProductImagesUrl] = useState<string[]>([
    "https://i.ibb.co/GsBQtyC/netun.jpg",
    "https://i.ibb.co/GsBQtyC/netun.jpg",
    "https://i.ibb.co/GsBQtyC/netun.jpg",
    "https://i.ibb.co/GsBQtyC/netun.jpg",
    "https://i.ibb.co/GsBQtyC/netun.jpg",
    "https://i.ibb.co/GsBQtyC/netun.jpg",
    "https://i.ibb.co/GsBQtyC/netun.jpg",
  ]);

  const onSubmit = (value: FieldValues) => {
    value.price = Number(value.price);
    value.stock = Number(value.stock);
    value.weight = `${value.weight} ${value.unit}`;
    value.features = features || [];
    value.thumbnail = productImagesUrl[0];
    value.images = productImagesUrl;
    delete value.unit;
    console.log(value);
  };

  const cetagoryOptions = [
    {
      label: "Habib",
      value: "hbib",
    },
    {
      label: "Netun",
      value: "nutun",
    },
  ];

  return (
    <Box bgcolor="white" padding={2} borderRadius={2}>
      <Typography mb={2} variant="h6" component="h6">
        Add New Product
      </Typography>
      <Box width="100%">
        <MyForm
          // defaultValues={productDefaultValue}
          // resolver={ProductValidationSchema}
          onSubmit={onSubmit}
        >
          <Grid container spacing={4}>
            {/* left side of the form */}
            <Grid item xs={12} md={6} lg={7}>
              {/* General Information */}
              <Box bgcolor="secondary.main" p={2} borderRadius={2}>
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
                      rows={4}
                      // placeholder="Enter product description"
                      name="description"
                      label="Poduct Description"
                      type="text"
                    />
                  </Grid>
                </Grid>
              </Box>

              {/* Price And Stock */}
              <Box p={2} borderRadius={2}>
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
              <Box p={2} borderRadius={2}>
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

              {/* Features */}
              <Box p={2} borderRadius={2}>
                <Typography
                  variant="h6"
                  component="h6"
                  fontWeight={600}
                  fontSize={18}
                  mb={1}
                >
                  Features
                </Typography>
                <Grid container spacing={2}>
                  <Grid xs={12} item>
                    <AddFeatures
                      features={features}
                      setFeatures={setFeatures}
                    />
                  </Grid>
                </Grid>
              </Box>
            </Grid>

            {/* right side of the form */}
            <Grid item xs={12} md={6} lg={5} mt={2}>
              <Grid container spacing={2}>
                {/* Image Upload  */}
                <Grid
                  bgcolor="secondary.main"
                  p={2}
                  borderRadius={2}
                  xs={12}
                  item
                >
                  <ImageUpload
                    productImagesUrl={productImagesUrl}
                    setProductImagesUrl={setProductImagesUrl}
                  />
                </Grid>

                {/* Brand and category select  */}
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
                        options={cetagoryOptions}
                      />
                    </Box>

                    <Button sx={{ whiteSpace: "nowrap" }}>Add Category</Button>
                  </Stack>
                  {/* brand */}
                  <Stack mt={2} direction="row" spacing={2}>
                    <Box flex={1}>
                      <MySelect
                        name="brand"
                        label="Product Brand"
                        options={cetagoryOptions}
                      />
                    </Box>

                    <Button sx={{ whiteSpace: "nowrap" }}>Add brand</Button>
                  </Stack>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Button type="submit">Add Now</Button>
        </MyForm>
      </Box>
    </Box>
  );
};

export default AddProduct;
