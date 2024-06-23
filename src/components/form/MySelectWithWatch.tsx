"use client";
import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import { FormHelperText } from "@mui/material";
import { TSelectOptions } from "@/type";

type TSelect = {
  name: string;
  label: string;
  disabled?: boolean;
  options: TSelectOptions[];
  onValueChange: React.Dispatch<React.SetStateAction<string>>;
};

export default function MySelectWithWatch({
  name,
  label,
  options,
  disabled,
  onValueChange,
}: TSelect) {
  const { control } = useFormContext();
  const selectValue = useWatch({
    control,
    name,
  });

  React.useEffect(() => {
    onValueChange(selectValue);
  }, [onValueChange, selectValue]);
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
            {options.map((item, index) => (
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
}
