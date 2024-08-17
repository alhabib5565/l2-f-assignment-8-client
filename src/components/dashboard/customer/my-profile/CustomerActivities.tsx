import { Box, Stack } from "@mui/material";
import React from "react";
import OrderOverviewCard from "../../admin/orders/OrderOverviewCard";
import { ShoppingCart, Star } from "@mui/icons-material";
import OverviewCard from "../../admin/adminHome/OverviewCard";

const CustomerActivities = () => {
  return (
    <Stack mb={3} gap={2} direction="row" flexWrap="wrap">
      <OverviewCard
        title="Total Orders"
        count={546}
        Icon={<ShoppingCart sx={{ color: "#f3a0ff" }} fontSize="large" />}
        percentage={40}
        gradientStartColor="#ed68ff"
        gradientEndColor="#be0ee1"
        iconGradientStartColor="#de2fff"
        iconGradientEndColor="#be0ee1"
      />
      <OverviewCard
        sx={{ mt: 3 }}
        title="Total Reviews"
        count={342}
        Icon={<Star sx={{ color: "#f6e053" }} fontSize="large" />}
        percentage={86}
        gradientStartColor="#f4d02b"
        gradientEndColor="#e1940e"
        iconGradientStartColor="#edb213"
        iconGradientEndColor="#e1940e"
      />
    </Stack>
  );
};

export default CustomerActivities;
