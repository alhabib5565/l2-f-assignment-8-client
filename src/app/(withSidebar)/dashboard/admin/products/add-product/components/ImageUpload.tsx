"use client";
import { Box, Button, IconButton, Input, Typography } from "@mui/material";
import React, { memo, useEffect, useState } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { uploadImage } from "@/utils/uploadImage";
import Image from "next/image";
// import { Cancel } from "@mui/icons-material";
import CancelIcon from "@mui/icons-material/Cancel";
import { AddAPhoto } from "@mui/icons-material";

type TImageUpload = {
  productImagesUrl: string[];
  setProductImagesUrl: React.Dispatch<React.SetStateAction<string[]>>;
};

const ImageUpload = ({
  productImagesUrl,
  setProductImagesUrl,
}: TImageUpload) => {
  // state
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImage(e.target.files ? e.target.files[0] : null);
  };

  useEffect(() => {
    const uploadImageAndSetGallery = async () => {
      try {
        if (image) {
          setLoading(true);
          const data = await uploadImage(image);
          setProductImagesUrl((previousImages) => [
            ...previousImages,
            data?.display_url,
          ]);
          setLoading(false);
          setImage(null);
        }
      } catch (error) {
        setLoading(false);
        console.error(error);
      }
    };

    uploadImageAndSetGallery();
  }, [image, setProductImagesUrl]);

  const handleOnRemoveImage = (index: number) => {
    let remainingImages = [...productImagesUrl];
    remainingImages.splice(index, 1);

    setProductImagesUrl(remainingImages);
  };

  return (
    <Box>
      {/* product thumbnail */}
      <Box>
        <Typography
          variant="h6"
          component="h6"
          fontWeight={600}
          fontSize={18}
          mb={1}
        >
          Product Images
        </Typography>
        {productImagesUrl.length ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Image
              height={300}
              width={300}
              style={{
                width: "100%",
                height: "300px",
                borderRadius: 5,
              }}
              src={productImagesUrl[0] || ""}
              alt="product"
            />
          </Box>
        ) : (
          <Button
            sx={{
              height: 211,
              border: "1px dashad black",
            }}
            fullWidth
            component="label"
            role={undefined}
            variant="outlined"
            tabIndex={-1}
            disabled={loading}
            startIcon={<CloudUploadIcon sx={{ height: 30, width: 30 }} />}
          >
            <Input
              onChange={handleImageChange}
              type="File"
              style={{ display: "none" }}
            />
            Product Thumbnail
          </Button>
        )}
      </Box>

      {/* Add more images */}
      <Box mt={2}>
        <Typography
          variant="h6"
          component="h6"
          fontWeight={600}
          fontSize={18}
          mb={1}
        >
          Add More Photo
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          {productImagesUrl.length
            ? productImagesUrl.map((url, index) => (
                <Box
                  sx={{
                    position: "relative",
                  }}
                  key={index}
                >
                  <Image
                    style={{
                      height: "100px",
                    }}
                    height={100}
                    width={100}
                    src={url}
                    alt="product image"
                  />
                  <IconButton
                    aria-label="delete image"
                    style={{
                      position: "absolute",
                      top: 5,
                      right: 5,
                      color: "#aaa",
                    }}
                    onClick={() => handleOnRemoveImage(index)}
                  >
                    <CancelIcon />
                  </IconButton>
                </Box>
              ))
            : ""}

          <Button
            sx={{
              height: 100,
              width: 100,
              padding: 0,
            }}
            fullWidth
            component="label"
            role={undefined}
            variant="outlined"
            tabIndex={-1}
            disabled={loading || !productImagesUrl.length}
            // startIcon={<CloudUploadIcon sx={{ height: 30, width: 30 }} />}
          >
            <Input
              onChange={handleImageChange}
              type="File"
              style={{ display: "none" }}
            />
            <AddAPhoto />
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default memo(ImageUpload);
