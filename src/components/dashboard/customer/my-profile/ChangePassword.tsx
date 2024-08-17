"use client";

import MyForm from "@/components/form/MyForm";
import MyInput from "@/components/form/MyInput";
import { HeaderText } from "@/components/pages/checkout/CartProductRow";
import { useChangePasswordMutation } from "@/redux/api/auth.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Divider, Stack } from "@mui/material";
import React from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const defaultValues = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};
const validationSchema = z.object({
  currentPassword: z
    .string({
      required_error: "Current Password is required",
    })
    .min(6, {
      message: "Password must be at least 6 characters long",
    }),
  newPassword: z
    .string({
      required_error: "new Password is required",
    })
    .min(6, {
      message: "Password must be at least 6 characters long",
    }),
  confirmPassword: z
    .string({
      required_error: "Confirm Password is required",
    })
    .min(6, {
      message: "Password must be at least 6 characters long",
    }),
});
const ChangePassword = () => {
  const [changePass, { isLoading }] = useChangePasswordMutation();
  const onSubmit = async (value: FieldValues) => {
    if (value.newPassword !== value.confirmPassword) {
      toast.error("Your new password and confirmation password do not match.");
    } else {
      const response = (await changePass(value)) as any;
      if (response?.data?.success) {
        toast.success(response?.data?.message || "Successful");
      } else {
        toast.error(response?.error?.message || "Failed");
      }
    }
  };
  return (
    <Box
      sx={{
        border: "1px solid lightgray",
        borderRadius: 2,
        bgcolor: "white",
        boxShadow: 1,
      }}
    >
      <HeaderText
        sx={{
          minWidth: "100%",
          textAlign: "left",
          p: 1,
        }}
      >
        Changne Pasword
      </HeaderText>
      <Divider />
      <MyForm
        onSubmit={onSubmit}
        defaultValues={defaultValues}
        resolver={zodResolver(validationSchema)}
      >
        <Stack sx={{ p: 2 }} direction="column" gap={2}>
          <MyInput
            label="Current Password"
            name="currentPassword"
            type="password"
          />
          <MyInput label="New Password" name="newPassword" type="password" />
          <MyInput
            label="Confirm Password"
            name="confirmPassword"
            type="password"
          />
          <Box sx={{ display: "flex", justifyContent: "end" }}>
            <Button disabled={isLoading} type="submit">
              Save
            </Button>
          </Box>
        </Stack>
      </MyForm>
    </Box>
  );
};

export default ChangePassword;
