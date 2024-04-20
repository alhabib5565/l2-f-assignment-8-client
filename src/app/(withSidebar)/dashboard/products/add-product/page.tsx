"use client";
import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";

import Grid from "@mui/material/Grid";
import MyForm from "@/components/form/MyForm";
import { FieldValues } from "react-hook-form";
import MyInput from "@/components/form/MyInput";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ImageUpload from "./components/ImageUpload";

const AddProduct = () => {
  const onSubmit = (value: FieldValues) => {
    console.log(value);
  };
  const [productImagesUrl, setProductImagesUrl] = useState<string[]>([]);
  /**
   *    _id: number
    title: string
    description: string
    price: number
    discountPercentage: number | null
    flash_sale: FlashSale | null
    rating: number
    stock: number
    brand: string
    category: string
    thumbnail: string
    images: string[]
    weight?: string
    type?: string
    features?: string[]
   */
  return (
    <Box bgcolor="white" padding={2} borderRadius={2}>
      <Typography variant="h6" component="h6">
        Add New Product
      </Typography>
      <Box width="100%" mt={2}>
        <MyForm onSubmit={onSubmit}>
          <Grid container spacing={2}>
            {/* left side of the form */}
            <Grid item xs={12} md={6} lg={7}>
              {/* General Information */}
              <Box p={2} borderRadius={2}>
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
            </Grid>

            {/* right side of the form */}
            <Grid item xs={12} md={6} lg={5}>
              {/* Image Upload  */}
              <Box bgcolor="secondary.main" p={2} borderRadius={2}>
                <Typography
                  variant="h6"
                  component="h6"
                  fontWeight={600}
                  fontSize={18}
                  mb={1}
                >
                  Product Images
                </Typography>
                <Grid container spacing={2}>
                  <Grid xs={12} item>
                    <ImageUpload
                      productImagesUrl={productImagesUrl}
                      setProductImagesUrl={setProductImagesUrl}
                    />
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
          <Button type="submit">Add Now</Button>
        </MyForm>
      </Box>
    </Box>
  );
};

export default AddProduct;
