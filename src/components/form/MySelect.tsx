"use client";
import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Controller, useFormContext } from "react-hook-form";
import { FormHelperText } from "@mui/material";

type TSelectOptions = {
  value: string;
  label: string;
};

type TSelect = {
  name: string;
  label: string;
  disabled?: boolean;
  options: TSelectOptions[];
};

const MySelect = ({ name, label, options, disabled }: TSelect) => {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl size="small" error={!!error?.message} fullWidth>
          <InputLabel id="demo-select-small-label">{label}</InputLabel>
          <Select
            disabled={disabled}
            {...field}
            labelId="demo-select-small-label"
            value={field.value}
          >
            {options?.map((item, index) => (
              <MenuItem key={index} value={item.value}>
                {item.label}
              </MenuItem>
            ))}
          </Select>
          {error && <FormHelperText>{error.message}</FormHelperText>}
        </FormControl>
      )}
    />
  );
};

export default React.memo(MySelect);
