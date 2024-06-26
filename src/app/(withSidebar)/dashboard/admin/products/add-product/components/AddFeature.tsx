"use client";
import { Cancel } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Dispatch, SetStateAction, memo, useState } from "react";

type TFeatures = {
  setFeatures: Dispatch<SetStateAction<string[]>>;
  features: string[];
};

const AddFeatures = ({ features, setFeatures }: TFeatures) => {
  const [featureText, setFeatureText] = useState("");

  const handleAddFeature = () => {
    if (featureText.length < 1) {
      return alert("Please write a feature");
    }
    setFeatures((previousFeature) => [...previousFeature, featureText]);
  };

  const handleRemoveFeature = (index: number) => {
    const remainingFeatures = [...features];
    remainingFeatures.splice(index, 1);
    setFeatures(remainingFeatures);
  };
  // const lastServiName = features[features.length - 1]?.feature;
  return (
    <>
      <Stack direction="row" flexWrap="wrap" gap={1} mb={2}>
        {features.length > 0 &&
          features.map((feature, index) => (
            <Typography
              sx={{
                bgcolor: "lightgray",
                borderRadius: 1,
                pl: 1,
              }}
              key={index}
            >
              <span className="truncate">{feature}</span>
              <IconButton
                onClick={() => handleRemoveFeature(index)}
                aria-label="delete"
              >
                <Cancel />
              </IconButton>
            </Typography>
          ))}
      </Stack>
      <Box
        sx={{
          display: "flex",
          gap: 2,
        }}
      >
        <TextField
          fullWidth
          size="small"
          value={featureText}
          onChange={(e) => setFeatureText(e.target.value)}
          type="text"
          placeholder="Service name"
        />
        <Button
          sx={{
            whiteSpace: "nowrap",
          }}
          onClick={handleAddFeature}
        >
          Add More
        </Button>
      </Box>
    </>
  );
};

export default memo(AddFeatures);
