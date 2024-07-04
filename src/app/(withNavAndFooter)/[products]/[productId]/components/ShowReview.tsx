import { Avatar, Box, Rating, Stack, Typography } from "@mui/material";
import React from "react";
import ReviewModalOpenButton from "./ReviewModalOpenButton";
import { TReviewData } from "@/type";

const ShowReview = async ({ productId }: { productId: string }) => {
  const response = await fetch(
    `${process.env.SERVER_URL}/review/${productId}`,
    {
      next: {
        tags: ["reviews"],
      },
    }
  );
  const reviews = await response.json();
  return (
    <Box>
      {" "}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="centers"
        pb={2}
      >
        <Typography
          display={"flex"}
          variant="h5"
          component="h5"
          alignItems="end"
          gap={1}
          fontWeight={600}
        >
          {" "}
          Review <Typography>({reviews?.data?.length} reviews)</Typography>
        </Typography>
        <ReviewModalOpenButton productId={productId} />
      </Stack>
      <Box mt={3} display="flex" flexDirection="column" gap={3}>
        {reviews?.data?.map((review: TReviewData, index: number) => (
          <Box
            key={index}
            sx={{ bgcolor: "secondary.main", padding: 2, borderRadius: 2 }}
          >
            <Stack direction="row" alignItems="center" spacing={1}>
              <Avatar alt="Remy Sharp" src="">
                {review.userEmail.charAt(0).toUpperCase()}
              </Avatar>
              <Box>
                <Typography
                  component="h6"
                  variant="h6"
                  fontSize={16}
                  fontWeight={600}
                >
                  {review?.userName || "Not Available"}
                </Typography>
                <Typography component="p" variant="body1">
                  {review.userEmail}
                </Typography>
              </Box>
            </Stack>
            <Box sx={{ mt: 2 }}>
              <Rating
                size="large"
                name="read-only"
                value={review?.ratings || 0}
                readOnly
              />
              <Typography component="legend">{review.review}</Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ShowReview;
