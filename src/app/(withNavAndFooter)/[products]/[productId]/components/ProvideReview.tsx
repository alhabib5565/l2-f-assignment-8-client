"use client";

import * as React from "react";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import { Button, TextField } from "@mui/material";
import MyModal, { TModalProps } from "@/components/modal/MyModal";
import { useAppSelector } from "@/redux/hooks";
import { toast } from "sonner";
// import { addReview } from "@/actions/addReview";
import { useCreateFeedbackMutation } from "@/redux/api/productFeedback.api";

const labels: { [index: string]: string } = {
  0.5: "Useless",
  1: "Useless+",
  1.5: "Poor",
  2: "Poor+",
  2.5: "Ok",
  3: "Ok+",
  3.5: "Good",
  4: "Good+",
  4.5: "Excellent",
  5: "Excellent+",
};

function getLabelText(value: number) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

type TProvideReviewModal = Pick<TModalProps, "open" | "setOpen"> & {
  productId: string;
};

const ProvideReview = ({ open, setOpen, productId }: TProvideReviewModal) => {
  // state
  const [value, setValue] = React.useState<number | null>(2);
  const [hover, setHover] = React.useState(-1);
  const [review, setReview] = React.useState("");

  const [createFeedback] = useCreateFeedbackMutation();

  const user = useAppSelector((state) => state.auth.user);
  const handleAddReview = async () => {
    if (!user) {
      return toast.error("Please Login to giving review", {
        className: "text-red-500",
      });
    }
    const reviewData = {
      review,
      rating: value,
      productId,
    };
    const response: any = await createFeedback(reviewData);
    console.log(response);
    if (response?.success) {
      setOpen(false);
      toast.success(response?.message);
    } else {
      toast.error(response?.message);
    }
  };

  return (
    <MyModal title="Write a review" open={open} setOpen={setOpen}>
      <Box>
        <Box
          sx={{
            width: 200,
            display: "flex",
            mx: "auto",
            mb: 2,
            alignItems: "center",
          }}
        >
          <Rating
            name="hover-feedback"
            value={value}
            precision={0.5}
            getLabelText={getLabelText}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            onChangeActive={(event, newHover) => {
              setHover(newHover);
            }}
            emptyIcon={
              <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
            }
          />
          {value !== null && (
            <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
          )}
        </Box>
        <TextField
          onChange={(e) => setReview(e.target.value)}
          label="Review"
          multiline
          rows={3}
          fullWidth
        />
        <Box sx={{ display: "flex", justifyContent: "end" }}>
          <Button onClick={handleAddReview} sx={{ mt: 2 }}>
            send
          </Button>
        </Box>
      </Box>
    </MyModal>
  );
};

export default ProvideReview;
