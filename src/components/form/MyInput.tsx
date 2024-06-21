"use client";
import { SxProps, TextField } from "@mui/material";
import React, { HTMLInputTypeAttribute } from "react";
import { Controller, useFormContext } from "react-hook-form";

type TInput = {
  name: string;
  type: HTMLInputTypeAttribute;
  label: string;
  sx?: SxProps;
  placeholder?: string;
  multiline?: boolean;
  rows?: number;
};

const MyInput = ({
  type,
  name,
  sx,
  label,
  placeholder,
  multiline,
  rows,
}: TInput) => {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <TextField
          // value={field?.value}
          sx={sx}
          {...field}
          size="small"
          type={type}
          fullWidth
          label={label}
          variant="outlined"
          multiline={multiline}
          rows={rows}
          placeholder={placeholder && placeholder}
          error={!!error?.message}
          helperText={error?.message}
        />
      )}
    />
  );
};

export default MyInput;
