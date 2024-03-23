import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

type TSectionHeaderProp = {
  title: string;
  description: string;
};

const SectionHeader = ({ title, description }: TSectionHeaderProp) => {
  return (
    <div>
      <Stack direction="row" justifyContent="space-between">
        <Box maxWidth={340}>
          <Typography component="h3" variant="h4">
            {title}
          </Typography>
          <Typography component="p" variant="body1" mt={1}>
            {description}
          </Typography>
        </Box>
        <div>
          <Button variant="outlined" className="group">
            <span>Show All</span>{" "}
            <ArrowForwardIcon className="group-hover:translate-x-1 transition-all duration-300" />
          </Button>
        </div>
      </Stack>
    </div>
  );
};

export default SectionHeader;
