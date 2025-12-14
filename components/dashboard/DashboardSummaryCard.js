"use client";

import {
  Grid,
  Card,
  Typography,
  CardContent,
  Box,
  useTheme,
  Stack,
  Divider,
} from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import WatchIcon from "@mui/icons-material/Watch";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PaymentsIcon from "@mui/icons-material/Payments";
import { formatPrice } from "@/lib/number";
import Loader from "../common/Loader";

const summaryData = [
  {
    title: "مشتری",
    key: "allCustomers",
    icon: <PeopleIcon />,
    color: "primary.main",
  },
  {
    title: "محصول ثبت شده",
    key: "totalProducts",
    icon: <WatchIcon />,
    color: "secondary.main",
  },
  {
    title: "سفارش‌",
    key: "totalOrders",
    icon: <ShoppingCartIcon />,
    color: "warning.main",
  },
  {
    title: "تومان فروش",
    key: "totalSales",
    icon: <PaymentsIcon />,
    color: "success.main",
  },
];

export default function SummaryCards({ dashboard = {} }) {

  if (!dashboard) {
    return <Loader />;
  }

  return (
    <Stack
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: {xs: 2}
      }}
    >
      {summaryData.map((item, index) => {
        return (
          <Card key={index} sx={{ px: 2 }}>
            <CardContent
              sx={{
                color: item.color,
                display: "flex",
                alignItems: "center",
                justifyContent: "start",
                gap: 1,
              }}
            >
              <Box mt={1}>{item.icon}</Box>

              <Divider
                sx={{ width: 3, bgcolor: item.color }}
                variant="middle"
                orientation="vertical"
                flexItem
              />

              <Box>
                <Typography variant="h3" fontWeight="bold">
                  {formatPrice(dashboard[item.key])}{" "}
                </Typography>
              </Box>

              <Box>
                <Typography variant="h5">{item.title}</Typography>
              </Box>
            </CardContent>
          </Card>
        );
      })}
    </Stack>
  );
}
