import MyFileUploader from "@/components/form/MyFileUploader";
import MyForm from "@/components/form/MyForm";
import MyInput from "@/components/form/MyInput";
import MyModal from "@/components/modal/MyModal";
import { uploadImage } from "@/utils/uploadImage";
import { Box, Button, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import MySelect from "@/components/form/MySelect";
import CategoryValidationSchema from "./categoryValidation";

type TCreateCategoryModalOpen = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const CreateCategoryModal = ({ open, setOpen }: TCreateCategoryModalOpen) => {
  const [image, setImage] = useState<File | null>(null);
  const [imageURL, setImageURL] = useState("");

  useEffect(() => {
    const uploadImageAndSetGallery = async () => {
      try {
        if (image) {
          const data = await uploadImage(image);
          setImageURL(data?.display_url);
          setImage(null);
          console.log(data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    uploadImageAndSetGallery();
  }, [image]);

  const onSubmit = (data: FieldValues) => {
    // if (!imageURL) {
    //   return alert("Please upload image");
    // }
    data.imageURL = imageURL;
    console.log(data);
  };

  return (
    <MyModal title="Create A Category" open={open} setOpen={setOpen}>
      <MyForm
        onSubmit={onSubmit}
        resolver={zodResolver(CategoryValidationSchema)}
      >
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <MyInput
              name="categoryName"
              label="Main Category Name"
              type="text"
            />
          </Grid>
          <Grid item xs={4}>
            <MyFileUploader
              onImageChange={setImage}
              type="file"
              name="imageURL"
              label="Upload Image"
            />
          </Grid>
          <Grid item xs={12}>
            <MySelect
              label="Select Main Category"
              name="mainCategoryName"
              options={[
                {
                  label: "Women",
                  value: "women",
                },
              ]}
            />
          </Grid>
          <Grid item xs={12}>
            <MyInput name="metaTitle" label="Meta Title" type="text" />
          </Grid>
          <Grid item xs={12}>
            <MyInput
              multiline={true}
              rows={4}
              name="metaDescription"
              label="Meta Description"
              type="text"
            />
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
    </MyModal>
  );
};

export default CreateCategoryModal;
