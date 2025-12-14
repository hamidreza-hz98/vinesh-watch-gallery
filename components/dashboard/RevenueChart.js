"use client";

import { formatPrice, toPersian } from "@/lib/number";
import { Box, Card, Divider, Typography, useTheme } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import Loader from "../common/Loader";

export default function RevenueChart({ orderRevenueData }) {
  const theme = useTheme();

  if (!orderRevenueData) {
    return <Loader />;
  }

  return (
    <Card sx={{ p: 3 }}>
      <Box display="flex" alignItems="center" gap={2}>
        <Divider
          sx={{ width: 5, height: 32, bgcolor: theme.palette.primary.main }}
          orientation="vertical"
          flexItem
        />

        <Typography variant="h3">چارت درآمد سالانه</Typography>
        <Typography variant="body1">( میلیون تومان )</Typography>
      </Box>

      <BarChart
        height={300}
        series={[
          {
            data: orderRevenueData.map((item) => item.totalSales),
            barLabel: (item) => formatPrice(item.totalSales),
            valueFormatter: (totalSales) => formatPrice(totalSales),
          },
        ]}
        yAxis={[
          {
            label: "میلیون تومان",
            valueFormatter: (totalSales) => formatPrice(totalSales),
          },
        ]}
        xAxis={[
          {
            data: orderRevenueData.map((item) => item.time),
            valueFormatter: (time) => toPersian(time),
            label: "ماه",
          },
        ]}
      />
    </Card>
  );
}
