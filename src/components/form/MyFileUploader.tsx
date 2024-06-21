import * as React from "react";
import { SxProps, styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import { Input } from "@mui/material";

type TProps = {
  name: string;
  label?: string;
  type: React.HTMLInputTypeAttribute;
  sx?: SxProps;
  fullWidth?: boolean;
  onImageChange: React.Dispatch<React.SetStateAction<File | null>>;
};

export default function MyFileUploader({
  name,
  label,
  type,
  sx,
  fullWidth = true,
  onImageChange,
}: TProps) {
  const { control } = useFormContext();
  const image = useWatch({ control, name });

  React.useEffect(() => {
    onImageChange(image);
  }, [image, onImageChange]);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value, ...field } }) => {
        return (
          <Button
            component="label"
            fullWidth={fullWidth}
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
            sx={{ ...sx }}
          >
            {label || "Upload file"}
            <Input
              {...field}
              type={type}
              value={value?.fileName}
              onChange={(e) =>
                onChange((e?.target as HTMLInputElement).files?.[0])
              }
              style={{ display: "none" }}
            />
          </Button>
        );
      }}
    />
  );
}
