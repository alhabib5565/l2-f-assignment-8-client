"use client";
import * as React from "react";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { Controller, useFormContext } from "react-hook-form";
import { Stack, Typography } from "@mui/material";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export type TMultiSelectOption = {
  _id: string;
  label: string;
  hexCode?: string;
};
type TMyMultiSelect = {
  options: TMultiSelectOption[];
  disabled: boolean;
  name: string;
  label: string;
};

export default function MyMultiSelect({
  options,
  disabled,
  name,
  label,
}: TMyMultiSelect) {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={[]}
      render={({ field }) => (
        <Autocomplete
          {...field}
          value={field.value || []}
          onChange={(event, newValue) => {
            field.onChange(newValue);
          }}
          disabled={disabled}
          size="small"
          multiple
          id="checkboxes-tags-demo"
          options={options}
          disableCloseOnSelect
          getOptionLabel={(option) => option.label}
          isOptionEqualToValue={(option, value) => option._id === value._id}
          renderOption={(props, option, { selected }) => (
            <Typography
              sx={{ display: "flex", gap: 1, alignItems: "center" }}
              key={option._id}
              {...props}
            >
              <Typography
                component="span"
                height={15}
                width={15}
                borderRadius={0.5}
                bgcolor={option.hexCode}
              ></Typography>
              <Typography>{option.label}</Typography>
            </Typography>
          )}
          renderInput={(params) => <TextField {...params} label={label} />}
        />
      )}
    />
  );
}
