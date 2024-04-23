"use client";
import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import ProvideReview from "./ProvideReview";
import { Add } from "@mui/icons-material";

const ReviewModalOpenButton = ({ productId }: { productId: string }) => {
  const [open, setOpen] = useState(false);

  return (
    <Box>
      <Button onClick={() => setOpen(!open)} variant="outlined">
        Write Review <Add />
      </Button>
      <ProvideReview productId={productId} open={open} setOpen={setOpen} />
    </Box>
  );
};

export default ReviewModalOpenButton;
