"use client";
import CustomerActivities from "@/components/dashboard/customer/my-profile/CustomerActivities";
import CustomerInfomationBox from "@/components/dashboard/customer/my-profile/CustomerInfomationBox";
import CustomerLocationBox from "@/components/dashboard/customer/my-profile/CustomerLocationBox";
import RecentOrder from "@/components/dashboard/customer/my-profile/RecentOrder";
import PageHeader from "@/components/dashboard/shared/PageHeader";
import { Box, Grid } from "@mui/material";
import React from "react";

const CustomerProfile = () => {
  return (
    <Box>
      <PageHeader pageName="My Profile" />
      <Grid container spacing={2}>
        <Grid item xs={12} lg={5}>
          <CustomerInfomationBox />
          <CustomerLocationBox />
        </Grid>
        <Grid item xs={12} lg={7}>
          <CustomerActivities />
          <RecentOrder />
        </Grid>
      </Grid>
    </Box>
  );
};

export default CustomerProfile;
