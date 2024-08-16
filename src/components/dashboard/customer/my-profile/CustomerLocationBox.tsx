"use client";
import { Edit, PlaceOutlined } from "@mui/icons-material";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import EditLocationModal from "./EditLocationModal";
import { useGetMeQuery } from "@/redux/api/user.api";

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
  const { data, isLoading } = useGetMeQuery({});

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
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="body1" fontWeight={600} fontSize={16} mb={2}>
          Customer Location
        </Typography>
        <IconButton onClick={() => setOpen(!open)} color="error">
          <Edit />
        </IconButton>
      </Stack>
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
  );
};

export default CustomerLocationBox;
