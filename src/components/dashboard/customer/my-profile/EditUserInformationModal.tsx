import MyForm from "@/components/form/MyForm";
import MyInput from "@/components/form/MyInput";
import MyModal from "@/components/modal/MyModal";
import { Box, Button, Grid, Input } from "@mui/material";
import React, { useEffect, useState } from "react";
import { FieldValues } from "react-hook-form";
import { TUserInformationBoxProps } from "./CustomerInfomationBox";
import { useUpdateUserMutation } from "@/redux/api/user.api";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { CloudUpload } from "@mui/icons-material";
import { uploadImage } from "@/utils/uploadImage";

type TEditUserInformationModalOpen = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
} & TUserInformationBoxProps;
const EditUserInformationModal = ({
  open,
  setOpen,
  userId,
  name,
  email,
  phone,
  imageURL,
}: TEditUserInformationModalOpen) => {
  const [updateUserInfo, { isLoading: updating }] = useUpdateUserMutation();
  const [imageUrl, setImageUrl] = useState<string>(imageURL || "");

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
          setImageUrl(data?.display_url);
          setLoading(false);
          setImage(null);
        }
      } catch (error) {
        setLoading(false);
        console.error(error);
      }
    };

    uploadImageAndSetGallery();
  }, [image, setImageUrl]);

  const onSubmit = async (value: FieldValues) => {
    value.imageURL = imageUrl;
    console.log(value);
    const response = (await updateUserInfo({ data: value, id: userId })) as any;
    if (response?.data?.success) {
      toast.success(response?.data?.message || "Successful");
      setOpen(false);
    } else {
      toast.error(response?.error?.message || "Failed");
    }
  };

  const defaultValues = {
    name: name || "",
    email: email || "",
    phone: phone || "",
  };

  const validation = z.object({
    // phone: z
    //   .string()
    //   .length(11, { message: "Phone number must be at least 11 characters" })
    //   .optional(),
    email: z
      .string()
      .email({ message: "Please provide a valid email" })
      .optional(),
  });

  return (
    <MyModal title="Edit User Infromation" open={open} setOpen={setOpen}>
      <MyForm
        defaultValues={defaultValues}
        onSubmit={onSubmit}
        resolver={zodResolver(validation)}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {imageUrl ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Image
                  height={250}
                  width={300}
                  style={{
                    width: "100%",
                    height: "250px",
                    borderRadius: 5,
                  }}
                  src={imageUrl || ""}
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
                startIcon={<CloudUpload sx={{ height: 30, width: 30 }} />}
              >
                <Input
                  onChange={handleImageChange}
                  type="File"
                  style={{ display: "none" }}
                />
                Product Thumbnail
              </Button>
            )}
          </Grid>
          <Grid xs={12} item>
            <MyInput label="Name" name="name" type="text" />
          </Grid>
          <Grid xs={12} item>
            <MyInput label="Email" name="email" type="email" />
          </Grid>
          <Grid item xs={12}>
            <MyInput label="Phone" name="phone" type="text" />
          </Grid>
        </Grid>
        <Box sx={{ display: "flex", justifyContent: "end", mt: 2 }}>
          <Button disabled={updating || loading} type="submit">
            Save
          </Button>
        </Box>
      </MyForm>
    </MyModal>
  );
};

export default EditUserInformationModal;
