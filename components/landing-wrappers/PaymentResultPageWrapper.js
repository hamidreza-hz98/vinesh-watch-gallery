"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { Box, Button, Typography, Paper, Stack, useTheme } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { toPersian } from "@/lib/number";

const PaymentResultPageWrapper = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const theme = useTheme();

  const orderCode = searchParams.get("order");
  const result = searchParams.get("result");

  const isSuccess = result === "successful";

  return (
    <Box
      minHeight="80vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      bgcolor={theme.palette.background.default}
      p={2}
    >
      <Paper
        elevation={6}
        sx={{
          width: "100%",
          maxWidth: 480,
          p: 4,
          borderRadius: 3,
          textAlign: "center",
        }}
      >
        <Stack spacing={2} alignItems="center">
          {isSuccess ? (
            <CheckCircleIcon
              sx={{ fontSize: 80, color: theme.palette.success.main }}
            />
          ) : (
            <CancelIcon
              sx={{ fontSize: 80, color: theme.palette.error.main }}
            />
          )}

          <Typography variant="h5" fontWeight={700}>
            {isSuccess ? "پرداخت موفق" : "پرداخت نا موفق"}
          </Typography>

          <Typography variant="body1" color="text.secondary">
            {isSuccess
              ? "ممنون از خرید شما، سفارشتون به زودی پردازش میشه."
              : "متاسفانه پرداخت شما با مشکل مواجه شد. از پروفایل کاربری میتوانید جددا اقدام به پرداخت کنید."}
          </Typography>

          {orderCode && (
            <Typography
              variant="subtitle2"
              sx={{
                mt: 1,
                p: 1.2,
                borderRadius: 2,
                bgcolor: theme.palette.action.hover,
              }}
            >
              شماره سفارش: <strong>{toPersian(orderCode)}#</strong>
            </Typography>
          )}

          <Stack direction="row" width="100%" spacing={2} mt={3}>
            <Button
              variant="contained"
              color={isSuccess ? "success" : "error"}
              onClick={() => router.push("/")}
              sx={{ minWidth: 120 }}
            >
              صفحه اصلی
            </Button>

            <Box sx={{ flex: "1 1" }} />

            <Button
              variant="outlined"
              onClick={() => router.push(`/profile/orders/${orderCode}`)}
              sx={{ minWidth: 120 }}
            >
              مشاهده سفارش
            </Button>
          </Stack>
        </Stack>
      </Paper>
    </Box>
  );
};

export default PaymentResultPageWrapper;
