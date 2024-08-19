import { useGetMontlyTotalSalesForAYerarQuery } from "@/redux/api/analytics.api";
import { Box, Typography } from "@mui/material";
import { BarChart } from "@mui/x-charts";
import React from "react";
const data = [
  { date: "2024-01", totalSales: 15000.0 },
  { date: "2024-02", totalSales: 12000.0 },
  { date: "2024-03", totalSales: 17000.0 },
  { date: "2024-04", totalSales: 14000.0 },
  { date: "2024-05", totalSales: 16000.0 },
  { date: "2024-06", totalSales: 13000.0 },
  { date: "2024-07", totalSales: 19000.0 },
  { date: "2024-08", totalSales: 15000.0 },
  { date: "2024-09", totalSales: 17000.0 },
  { date: "2024-10", totalSales: 18000.0 },
  { date: "2024-11", totalSales: 16000.0 },
  { date: "2024-12", totalSales: 20000.0 },
];

// console.log(formatdedMonthlySale);
const MonthlySaleChart = () => {
  const { data, isLoading, isFetching } = useGetMontlyTotalSalesForAYerarQuery(
    {}
  );

  const formatdedMonthlySale = data?.data.map(
    (sale: { date: string; totalSales: number }) => {
      const date = new Date(sale.date);

      return {
        month: date.toLocaleDateString("en-us", { month: "short" }),
        totalSales: sale.totalSales,
      };
    }
  );
  return (
    <Box bgcolor="white" height={"100%"} padding={3} borderRadius={1}>
      <Typography fontWeight={700} variant="h5" component="h4" fontSize={20}>
        Revenue Report
      </Typography>
      <BarChart
        loading={isFetching || isLoading}
        dataset={formatdedMonthlySale || []}
        xAxis={[
          {
            scaleType: "band",
            dataKey: "month",
            tickLabelPlacement: "middle",
            tickPlacement: "middle",
            valueFormatter: (value) => value,
          },
        ]}
        series={[
          {
            dataKey: "totalSales",
            label: "Total Sales",
          },
        ]}
        height={400}
        margin={{ right: 0, bottom: 20, top: 50 }}
      />
    </Box>
  );
};

export default MonthlySaleChart;
