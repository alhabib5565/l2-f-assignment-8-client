"use client";
import MyFileUploader from "@/components/form/MyFileUploader";
import MyForm from "@/components/form/MyForm";
import MyInput from "@/components/form/MyInput";
import MyModal from "@/components/modal/MyModal";
import { uploadImage } from "@/utils/uploadImage";
import { Box, Button, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { FieldValues } from "react-hook-form";
import MainCategoryValidationSchema, {
  mainCategoryDefaultValue,
} from "./mainCategoryValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateMainCategoryMutation } from "@/redux/api/categories/mainCategory.api";
import { toast } from "sonner";

type TCreateMainCategoryModalOpen = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const CreateMainCategoryModal = ({
  open,
  setOpen,
}: TCreateMainCategoryModalOpen) => {
  const [image, setImage] = useState<File | null>(null);
  const [imageURL, setImageURL] = useState("");
  const [createMainCategory] = useCreateMainCategoryMutation();

  useEffect(() => {
    const uploadMainCategoryImage = async () => {
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

    uploadMainCategoryImage();
  }, [image]);

  const onSubmit = async (data: FieldValues) => {
    console.log(data);
    // if (!imageURL) {
    //   return alert("Please upload image");
    // }
    data.imageURL = imageURL;
    const response = (await createMainCategory(data)) as any;
    console.log(data);
    if (response?.error) {
      toast.error(
        response?.error?.data.message || "Main Category create failed"
      );
    } else {
      toast.success("Main Category create successfull");
      setImageURL("");
    }
  };

  return (
    <MyModal title="Create A Main Category" open={open} setOpen={setOpen}>
      <MyForm
        resolver={zodResolver(MainCategoryValidationSchema)}
        defaultValues={mainCategoryDefaultValue}
        onSubmit={onSubmit}
      >
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <MyInput
              name="mainCategoryName"
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

export default CreateMainCategoryModal;
