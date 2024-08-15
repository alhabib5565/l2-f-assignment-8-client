import { PlaceOutlined } from "@mui/icons-material";
import { Box, Stack, Typography } from "@mui/material";
import React from "react";

const CustomerLocationBox = () => {
  const location = false;
  return (
    <Box
      sx={{
        bgcolor: "white",
        padding: 2,
        borderRadius: 1,
        minHeight: "200px",
        mt: 3,
      }}
    >
      <Typography variant="body1" fontWeight={600} fontSize={16} mb={2}>
        Customer Location
      </Typography>

      {location ? (
        <Stack gap={1}>
          <Typography variant="body1">
            <PlaceOutlined sx={{ mr: 2 }} />
            Divisioin:
          </Typography>
          <Typography variant="body1">
            <PlaceOutlined sx={{ mr: 2 }} />
            District
          </Typography>
          <Typography variant="body1">
            <PlaceOutlined sx={{ mr: 2 }} />
            Upazila
          </Typography>
          <Typography variant="body1">
            <PlaceOutlined sx={{ mr: 2 }} />
            Union
          </Typography>
          <Typography variant="body1">
            <PlaceOutlined sx={{ mr: 2 }} />
            Area
          </Typography>
        </Stack>
      ) : (
        <Box
          sx={{
            display: "grid",
            height: "100px",
            placeItems: "center",
            mt: 3,
          }}
        >
          <Typography variant="body1">No locatoin found</Typography>
        </Box>
      )}
    </Box>
  );
};

export default CustomerLocationBox;
