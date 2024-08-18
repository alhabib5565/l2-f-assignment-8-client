"use client";
import OverviewCard from "@/components/dashboard/admin/adminHome/OverviewCard";
import RecentOrder from "@/components/dashboard/customer/my-profile/RecentOrder";
import PageHeader from "@/components/dashboard/shared/PageHeader";
import { useGetTotalCountWithLastMonthPercentageForAUserQuery } from "@/redux/api/analytics.api";
import { ShoppingCart, Star } from "@mui/icons-material";
import { Box, Stack } from "@mui/material";
import React from "react";

const CustomerDashboardHome = () => {
  const { data } = useGetTotalCountWithLastMonthPercentageForAUserQuery({});
  const userHomeOverviewData = data?.data;
  return (
    <Box>
      <PageHeader pageName="Customer " />
      <Stack mb={3} gap={2} direction="row" flexWrap="wrap">
        <Box sx={{ flex: 1 }}>
          <OverviewCard
            title="Total Orders"
            count={userHomeOverviewData?.totalOrders || 0}
            Icon={<ShoppingCart sx={{ color: "#f3a0ff" }} fontSize="large" />}
            percentage={userHomeOverviewData?.lastMonthOrderPercentage || 0}
            gradientStartColor="#ed68ff"
            gradientEndColor="#be0ee1"
            iconGradientStartColor="#de2fff"
            iconGradientEndColor="#be0ee1"
          />
        </Box>
        <Box sx={{ flex: 1 }}>
          <OverviewCard
            title="Total Feedbacks"
            count={userHomeOverviewData?.totalFeedbacks || 0}
            Icon={<Star sx={{ color: "#f6e053" }} fontSize="large" />}
            percentage={userHomeOverviewData?.lastMonthFeedbackPercentage || 1}
            gradientStartColor="#f4d02b"
            gradientEndColor="#e1940e"
            iconGradientStartColor="#edb213"
            iconGradientEndColor="#e1940e"
          />
        </Box>
      </Stack>
      <RecentOrder />
    </Box>
  );
};

export default CustomerDashboardHome;
