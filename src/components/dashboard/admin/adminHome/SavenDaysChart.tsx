import React from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { LineChart } from "@mui/x-charts";

const SavenDaysChart = () => {
  const salesData = [
    { date: "2023-06-24", sales: 150 },
    { date: "2023-06-25", sales: 200 },
    { date: "2023-06-26", sales: 170 },
    { date: "2023-06-27", sales: 180 },
    { date: "2023-06-28", sales: 220 },
    { date: "2023-06-29", sales: 210 },
    { date: "2023-06-30", sales: 190 },
  ];

  const formatedSalesData = salesData.map((sale) => {
    const day = new Date(sale.date);
    return {
      day: day.toLocaleDateString("en-us", { weekday: "short" }),
      sales: sale.sales,
    };
  });
  return (
    <Card
      sx={{
        backgroundImage: `linear-gradient(to bottom, #0858f7, #2262d3)`,
        color: "#fff",
        height: "100%",
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
        }}
      >
        <Box>
          <Typography fontSize={16} fontWeight={500} color="white" gutterBottom>
            Total Sale
          </Typography>
          <Typography fontSize={32} fontWeight={700} color="white">
            $3,787,681.00
          </Typography>
        </Box>

        <LineChart
          xAxis={[{ dataKey: "day", scaleType: "point" }]}
          series={[
            {
              dataKey: "sales",
              // area: true,
              color: "#1D58C5",
            },
          ]}
          dataset={formatedSalesData}
          height={250}
          margin={{ left: 0, right: 0, bottom: 0, top: 20 }}
          grid={{ horizontal: true, vertical: true }}
        />
      </CardContent>
    </Card>
  );
};

export default SavenDaysChart;
