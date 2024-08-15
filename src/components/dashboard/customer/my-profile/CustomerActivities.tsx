import { Box, Stack } from "@mui/material";
import React from "react";
import OrderOverviewCard from "../../admin/orders/OrderOverviewCard";
import { ShoppingCart, Star } from "@mui/icons-material";

const CustomerActivities = () => {
  return (
    <Stack mb={3} gap={2} direction="row" flexWrap="wrap">
      <Box sx={{ flex: 1 }}>
        <OrderOverviewCard
          title="Total Orders"
          count={234}
          Icon={<ShoppingCart sx={{ color: "#f3a0ff", fontSize: "50px" }} />}
          gradientStartColor="#be0ee1"
          gradientEndColor="#ed68ff"
        />
      </Box>

      <Box sx={{ flex: 1 }}>
        <OrderOverviewCard
          title="Total Feedback"
          count={6}
          Icon={<Star sx={{ color: "#f6e053", fontSize: "50px" }} />}
          gradientStartColor="#e1940e"
          gradientEndColor="#f4d02b"
        />
      </Box>
    </Stack>
  );
};

export default CustomerActivities;
