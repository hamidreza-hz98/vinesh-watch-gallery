/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import {
  Card,
  Typography,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Divider,
  Box,
  useTheme,
} from "@mui/material";
import Loader from "../common/Loader";
import { calculateFinalPrice, formatPrice, toPersian } from "@/lib/number";
import { formatDateAndTime } from "@/lib/date";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const tabs = [
  { label: "در حال پردازش", value: "processing" },
  { label: "در حال ارسال", value: "shipping" },
  { label: "ناموفق", value: "failed" },
];

export default function LatestOrders({ orders }) {
  const theme = useTheme();

  const [status, setStatus] = useState("processing");

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const statusFromUrl = searchParams.get("status");

  useEffect(() => {
    if (statusFromUrl) {
      setStatus(statusFromUrl);
    }
  }, [statusFromUrl]);

  const handleTabChange = (event, value) => {
    setStatus(value);

    const params = new URLSearchParams(searchParams.toString());
    params.set("status", value);

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  if (!orders) {
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
        <Typography variant="h3">آخرین سفارش‌ها</Typography>
      </Box>

      <Tabs value={status} onChange={handleTabChange}>
        {tabs.map((tab) => (
          <Tab key={tab.value} value={tab.value} label={tab.label} />
        ))}
      </Tabs>

      {/* Scrollable container with hidden scrollbar */}
      <Box
        sx={{
          overflowX: "auto",
          // Hide scrollbar
          "&::-webkit-scrollbar": { display: "none" },
          "-ms-overflow-style": "none", // IE and Edge
          "scrollbar-width": "none", // Firefox
        }}
      >
        <Table sx={{ minWidth: 800 /* ensures table can scroll */ }}>
          <TableHead>
            <TableRow>
              <TableCell>کد سفارش</TableCell>
              <TableCell>مشتری</TableCell>
              <TableCell>شماره همراه</TableCell>
              <TableCell>مبلغ</TableCell>
              <TableCell>تاریخ</TableCell>
            </TableRow>
          </TableHead>

          {orders && orders.length !== 0 ? (
            <TableBody>
              {orders.map((order) => (
                <TableRow
                  component={Link}
                  href={`/dashboard/orders/${order._id}`}
                  key={order._id}
                >
                  <TableCell>{order.code}</TableCell>
                  <TableCell>
                    {order.customer.firstName + " " + order.customer.lastName}
                  </TableCell>
                  <TableCell>{toPersian(order.customer.phone)}</TableCell>
                  <TableCell>
                    {formatPrice(calculateFinalPrice(order.price))} تومان
                  </TableCell>
                  <TableCell>
                    {toPersian(formatDateAndTime(order.createdAt))}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          ) : (
            <Box
              sx={{
                width: "100%",
                height: 100,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography textAlign="center">
                سفارشی در این وضعیت وجود ندارد!
              </Typography>
            </Box>
          )}
        </Table>
      </Box>
    </Card>
  );
}
