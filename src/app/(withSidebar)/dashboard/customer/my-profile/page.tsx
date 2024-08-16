"use client";
import CustomerActivities from "@/components/dashboard/customer/my-profile/CustomerActivities";
import CustomerInfomationBox from "@/components/dashboard/customer/my-profile/CustomerInfomationBox";
import CustomerLocationBox from "@/components/dashboard/customer/my-profile/CustomerLocationBox";
import RecentOrder from "@/components/dashboard/customer/my-profile/RecentOrder";
import PageHeader from "@/components/dashboard/shared/PageHeader";
import { useGetMeQuery } from "@/redux/api/user.api";
import { Box, Grid } from "@mui/material";

const CustomerProfile = () => {
  const { data, isLoading } = useGetMeQuery({});
  const userId = data?.data?.userId;
  const location = data?.data?.userLocation;

  return (
    <Box>
      <PageHeader pageName="My Profile" />
      <Grid container spacing={2}>
        <Grid item xs={12} lg={5}>
          <CustomerInfomationBox />
          <CustomerLocationBox userLocation={location} userId={userId} />
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
