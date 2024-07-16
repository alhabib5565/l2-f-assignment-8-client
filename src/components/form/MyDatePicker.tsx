import * as React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { Controller, useFormContext } from "react-hook-form";
import dayjs from "dayjs";

type TDatePicker = {
  name: string;
  label: string;
};

export default function MyDatePicker({ name, label }: TDatePicker) {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  console.log(errors);
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, value, ...field },
        fieldState: { error },
      }) => (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-us">
          <DemoContainer components={["DateTimePicker", "DateTimePicker"]}>
            <DateTimePicker
              views={["year", "month", "day", "hours", "minutes"]}
              {...field}
              value={dayjs(value)}
              onChange={(date) => onChange(date?.format())}
              label={label}
              slotProps={{
                textField: {
                  size: "small",
                  fullWidth: true,
                  helperText: error?.message,
                },
              }}
            />
          </DemoContainer>
        </LocalizationProvider>
      )}
    />
  );
}
