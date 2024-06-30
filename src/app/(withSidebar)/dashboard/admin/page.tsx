"use client";
import OverviewCard from "@/components/dashboard/admin/adminHome/OverviewCard";
import PageHeader from "@/components/dashboard/shared/PageHeader";
import { AccountCircle } from "@mui/icons-material";
import { Box, Grid } from "@mui/material";

import React from "react";

const AdminDashboardHome = () => {
  return (
    <Box>
      <PageHeader pageName="Dashboard" />
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <OverviewCard
            title="Total User"
            count={234}
            Icon={<AccountCircle sx={{ color: "#89ecb3" }} fontSize="large" />}
            gradientStartColor="#4eda89"
            gradientEndColor="#1a9f53"
            iconGradientStartColor="#27bf68"
            iconGradientEndColor="#1a9f53"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminDashboardHome;
