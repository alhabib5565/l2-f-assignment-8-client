"use client";
import * as React from "react";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { Controller, useFormContext } from "react-hook-form";

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
      defaultValue={[]} // Ensure defaultValue is set
      render={({ field }) => (
        <Autocomplete
          {...field}
          value={field.value || []} // Set the value from the field
          onChange={(event, newValue) => {
            field.onChange(newValue); // Update the field value on change
          }}
          disabled={disabled}
          size="small"
          multiple
          id="checkboxes-tags-demo"
          options={options}
          disableCloseOnSelect
          getOptionLabel={(option) => option.label}
          isOptionEqualToValue={(option, value) => option._id === value._id} // Ensure equality check is correct
          renderOption={(props, option, { selected }) => (
            <li key={option._id} {...props}>
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: 8 }}
                checked={selected}
              />
              {option.label}
            </li>
          )}
          renderInput={(params) => <TextField {...params} label={label} />}
        />
      )}
    />
  );
}
