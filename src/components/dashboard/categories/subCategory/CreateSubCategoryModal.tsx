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
import {
  subCategoryDefaultValues,
  subCategoryValidationSchema,
} from "./subCategoryValidation";
import { useGetMainCategoriesQuery } from "@/redux/api/categories/mainCategory.api";
import { TSelectOptions } from "@/type";
import { useGetCategoriesQuery } from "@/redux/api/categories/category.api";
import MySelectWithWatch from "@/components/form/MySelectWithWatch";
import { useCreateSubCategoryMutation } from "@/redux/api/categories/subCategory.api";
import { toast } from "sonner";

type TCreateSubCategoryModalOpen = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const CreateSubCategoryModal = ({
  open,
  setOpen,
}: TCreateSubCategoryModalOpen) => {
  const [image, setImage] = useState<File | null>(null);
  const [imageURL, setImageURL] = useState("");
  const [mainCategory, setMainCategory] = useState("");
  const { data: mainCategoryData, isLoading: mainCategoryLoading } =
    useGetMainCategoriesQuery({ query: "fields=mainCategoryName&limit=20" });
  const { data: categoryData, isLoading: categoryLoading } =
    useGetCategoriesQuery(
      {
        query: `fields=categoryName&limit=20&mainCategory=${mainCategory}`,
      },
      { skip: !mainCategory }
    );
  const [createSubCategory] = useCreateSubCategoryMutation();

  const mainCategoryOptions: TSelectOptions[] = mainCategoryData?.data.map(
    (item: { _id: string; mainCategoryName: string }) => ({
      label: item.mainCategoryName,
      value: item._id,
    })
  );

  const categoryOptions: TSelectOptions[] = categoryData?.data.map(
    (item: { _id: string; categoryName: string }) => ({
      label: item.categoryName,
      value: item._id,
    })
  );

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

  const onSubmit = async (data: FieldValues) => {
    // if (!imageURL) {
    //   return alert("Please upload image");
    // }
    data.imageURL = imageURL;
    const response = (await createSubCategory(data)) as any;
    if (response?.error) {
      toast.error(
        response?.error?.data.message || "Sub Category create failed"
      );
    } else {
      toast.success("Sub Category create successfull");
      setImageURL("");
    }
  };

  return (
    <MyModal title="Create A Sub Category" open={open} setOpen={setOpen}>
      <MyForm
        onSubmit={onSubmit}
        resolver={zodResolver(subCategoryValidationSchema)}
        defaultValues={subCategoryDefaultValues}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <MySelectWithWatch
              onValueChange={setMainCategory}
              disabled={mainCategoryLoading}
              label="Select Main Category"
              name="mainCategory"
              options={mainCategoryOptions || []}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <MySelect
              disabled={categoryLoading || !mainCategory}
              label="Select Category"
              name="category"
              options={categoryOptions || []}
            />
          </Grid>
          <Grid item xs={8}>
            <MyInput
              name="subCategoryName"
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

export default CreateSubCategoryModal;
