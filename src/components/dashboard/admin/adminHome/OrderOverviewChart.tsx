"use client";
import { useGetOrderStatusOverviewQuery } from "@/redux/api/analytics.api";
import { TOrderStatus } from "@/type/order.type";
import {
  AddOutlined,
  CheckCircleOutline,
  CheckOutlined,
  CloseOutlined,
  MoreHoriz,
} from "@mui/icons-material";
import { Avatar, Box, Divider, Stack, Typography } from "@mui/material";
import { pieArcLabelClasses, PieChart } from "@mui/x-charts";
import React from "react";

const OrderOverviewChart = () => {
  const { data, isLoading, isFetching } = useGetOrderStatusOverviewQuery({});
  console.log({ data, isLoading, isFetching });
  const orderStatusColor = {
    Pending: "#DE2FFF",
    Shipped: "#4094F1",
    Accepted: "#27BF68",
    Delivered: "#4CAF50",
    Cancelled: "red",
  };

  const orderOverview = data?.data?.map(
    (item: { _id: TOrderStatus; total: number }, index: number) => {
      let color = "";
      let icon: any = "";
      if (item._id === "Pending") {
        color = orderStatusColor.Pending;
        icon = MoreHoriz;
      } else if (item._id === "Accepted") {
        color = orderStatusColor.Accepted;
        icon = CheckOutlined;
      } else if (item._id === "Shipped") {
        color = orderStatusColor.Shipped;
        icon = AddOutlined;
      } else if (item._id === "Cancelled") {
        color = orderStatusColor.Cancelled;
        icon = CloseOutlined;
      } else if (item._id === "Delivered") {
        color = orderStatusColor.Delivered;
        icon = CheckCircleOutline;
      } else if (item._id === "Rejected") {
        color = orderStatusColor.Cancelled;
        icon = CloseOutlined;
      }
      return {
        id: index,
        value: item.total,
        label: item._id,
        color,
        icon,
      };
    }
  );
  return (
    <Box bgcolor="white" height={"100%"} padding={3} borderRadius={1}>
      <Typography fontWeight={700} variant="h5" component="h4" fontSize={20}>
        Order Overview
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <PieChart
          loading={isFetching || isLoading}
          series={[
            {
              data: orderOverview || [],
              arcLabel: (item) => `${item.value}`,
              paddingAngle: 2,
              innerRadius: 40,
            },
          ]}
          sx={{
            [`& .${pieArcLabelClasses.root}`]: {
              fill: "white",
              fontWeight: "bold",
            },
          }}
          height={200}
          margin={{ top: 10 }}
        />
      </Box>
      <Divider sx={{ mt: 2 }} />
      {orderOverview &&
        orderOverview?.map((item: any, index: number) => (
          <Box key={index}>
            <Stack direction="row" gap={2} py={1.2}>
              <Avatar
                sx={{
                  bgcolor: item.color,
                  height: 24,
                  width: 24,
                }}
              >
                <item.icon />
              </Avatar>
              <Typography flex={1}>{item.label}</Typography>
              <Typography>{item.value}</Typography>
            </Stack>
            {index !== 4 && <Divider />}
          </Box>
        ))}
    </Box>
  );
};

export default OrderOverviewChart;
