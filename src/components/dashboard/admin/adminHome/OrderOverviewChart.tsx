import {
  AddOutlined,
  CheckOutlined,
  CloseOutlined,
  MoreHoriz,
} from "@mui/icons-material";
import { Avatar, Box, Divider, Stack, Typography } from "@mui/material";
import { pieArcLabelClasses, PieChart } from "@mui/x-charts";
import React from "react";

const OrderOverviewChart = () => {
  const color = {
    Pending: "#DE2FFF",
    Shipped: "#4094F1",
    Recieved: "#27BF68",
    Cancelled: "red",
  };
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
          series={[
            {
              data: [
                { id: 0, value: 10, label: "Pending", color: "#DE2FFF" },
                { id: 1, value: 15, label: "Shipped", color: "#4094F1" },
                { id: 2, value: 20, label: "Recieved", color: "#27BF68" },
                { id: 3, value: 20, label: "Cancelled", color: "red" },
              ],
              arcLabel: (item) => `${item.value}`,
              paddingAngle: 2,
              innerRadius: 40,
              // cx: "100%",
              // cy: "50%",
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
      <Stack direction="row" gap={2} py={2}>
        <Avatar sx={{ bgcolor: color.Pending, height: 24, width: 24 }}>
          <MoreHoriz />
        </Avatar>
        <Typography flex={1}>Pending</Typography>
        <Typography>503</Typography>
      </Stack>
      <Divider />
      <Stack direction="row" gap={2} py={2}>
        <Avatar sx={{ bgcolor: color.Shipped, height: 24, width: 24 }}>
          <AddOutlined />
        </Avatar>
        <Typography flex={1}>Shipped</Typography>
        <Typography>324</Typography>
      </Stack>
      <Divider />
      <Stack direction="row" gap={2} py={2}>
        <Avatar sx={{ bgcolor: color.Recieved, height: 24, width: 24 }}>
          <CheckOutlined />
        </Avatar>
        <Typography flex={1}>Recieved</Typography>
        <Typography>324</Typography>
      </Stack>
      <Divider />
      <Stack direction="row" gap={2} pt={2}>
        <Avatar sx={{ bgcolor: color.Cancelled, height: 24, width: 24 }}>
          <CloseOutlined />
        </Avatar>
        <Typography flex={1}>Cancelled</Typography>
        <Typography>634</Typography>
      </Stack>
    </Box>
  );
};

export default OrderOverviewChart;
