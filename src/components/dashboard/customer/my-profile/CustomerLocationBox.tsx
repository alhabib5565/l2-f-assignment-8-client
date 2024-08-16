"use client";
import { Edit, PlaceOutlined } from "@mui/icons-material";
import { Box, Divider, IconButton, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import EditLocationModal from "./EditLocationModal";

type TUserLocation = {
  userLocation: {
    area: string;
    district: string;
    division: string;
    union: string;
    upazila: string;
  };
  userId: string;
};

const CustomerLocationBox = ({ userLocation, userId }: TUserLocation) => {
  const [open, setOpen] = useState(false);

  return (
    <Box
      sx={{
        bgcolor: "white",
        border: "1px solid lightgray",
        borderRadius: 2,
        boxShadow: 1,
        mt: 3,
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        p={1}
      >
        <Typography variant="body1" fontWeight={600} fontSize={16} mb={2}>
          Customer Location
        </Typography>
        <IconButton size="small" onClick={() => setOpen(!open)} color="error">
          <Edit />
        </IconButton>
      </Stack>
      <Divider />
      <Box padding={2}>
        {open && userId && (
          <EditLocationModal userId={userId} setOpen={setOpen} open={open} />
        )}
        {userLocation ? (
          <Stack gap={1}>
            <Typography variant="body1">
              <PlaceOutlined sx={{ mr: 2 }} />
              Divisioin: {userLocation?.division}
            </Typography>
            <Typography variant="body1">
              <PlaceOutlined sx={{ mr: 2 }} />
              District: {userLocation.district}
            </Typography>
            <Typography variant="body1">
              <PlaceOutlined sx={{ mr: 2 }} />
              Upazila: {userLocation.upazila}
            </Typography>
            <Typography variant="body1">
              <PlaceOutlined sx={{ mr: 2 }} />
              Union: {userLocation.union}
            </Typography>
            <Typography variant="body1">
              <PlaceOutlined sx={{ mr: 2 }} />
              Area: {userLocation.area}
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
    </Box>
  );
};

export default CustomerLocationBox;
