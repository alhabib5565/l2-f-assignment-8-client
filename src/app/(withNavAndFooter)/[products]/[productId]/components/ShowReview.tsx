import { Avatar, Box, Grid, Rating, Stack, Typography } from "@mui/material";
import React from "react";
import ReviewModalOpenButton from "./ReviewModalOpenButton";

type TShowProductFeedbackProps = {
  rating: number;
  review: string;
  createdAt: string;
  user: {
    name: string;
    email: string;
  };
};

const ShowProductFeedback = async ({
  productId,
  feedbacks,
}: {
  productId: string;
  feedbacks: TShowProductFeedbackProps[];
}) => {
  const hasFeedback =
    feedbacks?.length > 0 && feedbacks[0]?.rating ? true : false;

  return (
    <Box>
      {" "}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="centers"
        pb={1}
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
          Feedback{" "}
          <Typography>({hasFeedback ? feedbacks?.length : 0})</Typography>
        </Typography>
        <ReviewModalOpenButton productId={productId} />
      </Stack>
      {hasFeedback && (
        <Grid container spacing={2} mt={3}>
          {feedbacks.map((feedback, index: number) => (
            <Grid
              item
              xs={12}
              md={6}
              key={index}
              sx={{ bgcolor: "white", padding: 3, borderRadius: 2 }}
            >
              <Stack direction="row" alignItems="center" spacing={1}>
                <Avatar alt={feedback?.user?.name} src="">
                  {feedback?.user?.email.charAt(0).toUpperCase()}
                </Avatar>
                <Box>
                  <Typography
                    component="h6"
                    variant="h6"
                    fontSize={14}
                    fontWeight={600}
                  >
                    {feedback?.user?.name || "Not Available"}
                  </Typography>
                  <Typography fontSize={14} component="p" variant="body1">
                    {feedback?.user?.email}
                  </Typography>
                </Box>
              </Stack>
              <Box sx={{ mt: 2 }}>
                <Rating
                  size="large"
                  name="read-only"
                  value={feedback?.rating || 0}
                  readOnly
                />
                <Typography component="legend">{feedback.review}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default ShowProductFeedback;
