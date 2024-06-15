import * as React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Controller, useFormContext } from "react-hook-form";
import dayjs from "dayjs";

type TDatePicker = {
  name: string;
  label: string;
};

export default function MyDatePicker({ name, label }: TDatePicker) {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            <DatePicker
              defaultValue={dayjs(new Date())}
              views={["year", "month", "day"]}
              label={label}
            />
          </DemoContainer>
        </LocalizationProvider>
      )}
    />
  );
}
