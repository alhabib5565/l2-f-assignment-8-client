"use client";
import {
  InputBaseComponentProps,
  SxProps,
  TextField,
  TextFieldPropsSizeOverrides,
} from "@mui/material";
import { OverridableTypeMap } from "@mui/material/OverridableComponent";
import React, { HTMLInputTypeAttribute } from "react";
import { Controller, useFormContext } from "react-hook-form";

type TInput = {
  name: string;
  type: HTMLInputTypeAttribute;
  label?: string;
  sx?: SxProps;
  placeholder?: string;
  multiline?: boolean;
  rows?: number;
  size?: "small" | "medium";
  inputProps?: InputBaseComponentProps;
};

const MyInput = ({
  type,
  name,
  sx,
  label,
  placeholder,
  multiline,
  rows,
  size = "small",
  inputProps,
}: TInput) => {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={""}
      render={({ field, fieldState: { error } }) => (
        <TextField
          sx={sx}
          {...field}
          inputProps={inputProps}
          size={size}
          value={field.value || ""}
          type={type}
          fullWidth
          label={label || ""}
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
