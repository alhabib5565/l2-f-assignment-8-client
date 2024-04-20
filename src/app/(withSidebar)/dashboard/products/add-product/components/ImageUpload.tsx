"use client";
import { Box, Button, IconButton, Input } from "@mui/material";
import React, { useEffect, useState } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { uploadImage } from "@/utils/uploadImage";
import Image from "next/image";
// import { Cancel } from "@mui/icons-material";
import CancelIcon from "@mui/icons-material/Cancel";

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

  console.log(productImagesUrl);

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
          console.log("Image uploaded successfully:", data);
        }
      } catch (error) {
        setLoading(false);
        console.error(error);
      }
    };

    uploadImageAndSetGallery();
  }, [image, setProductImagesUrl]);

  const handleOnRemoveImage = (url: string) => {
    const remainingImages = productImagesUrl.filter((url) => url !== url);
    setProductImagesUrl(remainingImages);
    console.log(url);
  };
  return (
    <Box>
      {productImagesUrl.length ? (
        <Box
          sx={{
            display: "flex",
            position: "relative",
            justifyContent: "center",
          }}
        >
          <IconButton
            aria-label="delete image"
            style={{
              position: "absolute",
              top: 5,
              right: 5,
              color: "#aaa",
            }}
            onClick={() => handleOnRemoveImage(productImagesUrl[0])}
          >
            <CancelIcon />
          </IconButton>
          <Image
            height={300}
            width={300}
            style={{
              width: "100%",
              //   objectFit: "cover",
              height: "300px",
            }}
            src={productImagesUrl[0] || ""}
            alt="product"
          />
        </Box>
      ) : (
        <Button
          sx={{
            height: 200,
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
  );
};

export default ImageUpload;
