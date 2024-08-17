import React from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { LineChart } from "@mui/x-charts";
import { useGetLastSavenDaysSalesPerDayQuery } from "@/redux/api/analytics.api";

const SavenDaysChart = () => {
  const { data, isLoading, isFetching } = useGetLastSavenDaysSalesPerDayQuery(
    {}
  );

  const lastSavenDaysSale = data?.data as [{ date: string; sales: number }];

  const totalSale = lastSavenDaysSale?.reduce((previousValue, currentValue) => {
    return previousValue + currentValue.sales;
  }, 0);

  const formatedSalesData = lastSavenDaysSale?.map((sale) => {
    const day = new Date(sale.date);
    return {
      day: day.toLocaleDateString("en-us", { weekday: "short" }),
      sales: sale.sales || 0,
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
            Weekly Sales
          </Typography>
          <Typography fontSize={32} fontWeight={700} color="white">
            TK {totalSale}
          </Typography>
        </Box>

        <LineChart
          loading={isLoading || isFetching}
          xAxis={[{ dataKey: "day", scaleType: "point" }]}
          series={[
            {
              dataKey: "sales",
              // area: true,
              color: "#1D58C5",
            },
          ]}
          dataset={formatedSalesData || []}
          height={250}
          margin={{ left: 0, right: 0, bottom: 0, top: 20 }}
          grid={{ horizontal: true, vertical: true }}
        />
      </CardContent>
    </Card>
  );
};

export default SavenDaysChart;
