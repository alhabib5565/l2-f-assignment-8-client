"use client";
import { SxProps, TextField } from "@mui/material";
import React, { HTMLInputTypeAttribute } from "react";
import { Controller, useFormContext } from "react-hook-form";

type TInput = {
  name: string;
  type: HTMLInputTypeAttribute;
  label: string;
  sx?: SxProps;
};

const MyInput = ({ type, name, sx, label }: TInput) => {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <TextField
          sx={sx}
          {...field}
          size="small"
          type={type}
          fullWidth
          label={label}
          variant="outlined"
          error={!!error?.message}
          helperText={error?.message}
        />
      )}
    />
  );
};

export default MyInput;
