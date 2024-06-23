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
import CategoryValidationSchema, {
  categoryDefaultValues,
} from "./categoryValidation";
import { useGetMainCategoriesQuery } from "@/redux/api/categories/mainCategory.api";
import { TSelectOptions } from "@/type";
import { useCreateCategoryMutation } from "@/redux/api/categories/category.api";
import { toast } from "sonner";

type TCreateCategoryModalOpen = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const CreateCategoryModal = ({ open, setOpen }: TCreateCategoryModalOpen) => {
  const [image, setImage] = useState<File | null>(null);
  const [imageURL, setImageURL] = useState("");
  const { data, isLoading } = useGetMainCategoriesQuery({
    query: "fields=mainCategoryName&limit=20",
  });

  const [createCategory] = useCreateCategoryMutation();

  const mainCategoryOptions: TSelectOptions[] = data?.data.map(
    (item: { _id: string; mainCategoryName: string }) => ({
      label: item.mainCategoryName,
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
    const response = (await createCategory(data)) as any;
    console.log(data);
    if (response?.error) {
      toast.error(response?.error?.data.message || "Category create failed");
    } else {
      toast.success("Category create successfull");
      setImageURL("");
    }
  };

  return (
    <MyModal title="Create A Category" open={open} setOpen={setOpen}>
      <MyForm
        onSubmit={onSubmit}
        resolver={zodResolver(CategoryValidationSchema)}
        defaultValues={categoryDefaultValues}
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
              disabled={isLoading}
              label="Select Main Category"
              name="mainCategory"
              options={mainCategoryOptions || []}
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
