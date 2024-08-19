"use client";
import MonthlySaleChart from "@/components/dashboard/admin/adminHome/MonthlySaleChart";
import OrderOverviewChart from "@/components/dashboard/admin/adminHome/OrderOverviewChart";
import OverviewCard from "@/components/dashboard/admin/adminHome/OverviewCard";
import SavenDaysChart from "@/components/dashboard/admin/adminHome/SavenDaysChart";
import PageHeader from "@/components/dashboard/shared/PageHeader";
import { useGetTotalCountWithLastMonthPercentageQuery } from "@/redux/api/analytics.api";
import {
  AccountCircle,
  ShoppingBag,
  ShoppingCart,
  Star,
} from "@mui/icons-material";
import { Box, Grid } from "@mui/material";

import React from "react";

const AdminDashboardHome = () => {
  const { data } = useGetTotalCountWithLastMonthPercentageQuery({});
  console.log(data);
  const AdminAnalyticData = data?.data;
  return (
    <Box>
      <PageHeader pageName="Dashboard" />
      {/* overview card and 7 days chart */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={4}>
          <OverviewCard
            title="Total User"
            count={AdminAnalyticData?.totalUsers || 0}
            Icon={<AccountCircle sx={{ color: "#89ecb3" }} fontSize="large" />}
            percentage={AdminAnalyticData?.lastMonthUserPercentage || 0}
            gradientStartColor="#4eda89"
            gradientEndColor="#1a9f53"
            iconGradientStartColor="#27bf68"
            iconGradientEndColor="#1a9f53"
          />
          <OverviewCard
            sx={{ mt: 3 }}
            title="Total Products"
            count={AdminAnalyticData?.totalProducts || 0}
            Icon={<ShoppingBag sx={{ color: "#96cefa" }} fontSize="large" />}
            percentage={AdminAnalyticData?.lastMonthProductPercentage || 0}
            gradientStartColor="#64b3f6"
            gradientEndColor="#2b77e5"
            iconGradientStartColor="#4094f1"
            iconGradientEndColor="#2b77e5"
          />
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <OverviewCard
            title="Total Orders"
            count={AdminAnalyticData?.totalOrders || 0}
            Icon={<ShoppingCart sx={{ color: "#f3a0ff" }} fontSize="large" />}
            percentage={AdminAnalyticData?.lastMonthOrderPercentage || 0}
            gradientStartColor="#ed68ff"
            gradientEndColor="#be0ee1"
            iconGradientStartColor="#de2fff"
            iconGradientEndColor="#be0ee1"
          />
          <OverviewCard
            sx={{ mt: 3 }}
            title="Total Reviews"
            count={AdminAnalyticData?.totalFeedbacks || 0}
            Icon={<Star sx={{ color: "#f6e053" }} fontSize="large" />}
            percentage={AdminAnalyticData?.lastMonthFeedbackPercentage || 0}
            gradientStartColor="#f4d02b"
            gradientEndColor="#e1940e"
            iconGradientStartColor="#edb213"
            iconGradientEndColor="#e1940e"
          />
        </Grid>

        <Grid item xs={12} lg={4}>
          <SavenDaysChart />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8} mt={3}>
          <MonthlySaleChart />
        </Grid>
        <Grid item xs={12} md={4} mt={3}>
          <OrderOverviewChart />
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminDashboardHome;
