"use client";

import React from "react";
import { Box, Typography, Avatar, Chip, Stack, useTheme } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { calculateFinalPrice, formatPrice, toPersian } from "@/lib/number";
import { orderStatuses } from "@/constants/general";
import { formatDate } from "@/lib/date";
import Link from "next/link";
import routes from "@/constants/landing.routes";
import Image from "next/image";
import { setFilePath } from "@/lib/media";

const OrderCard = ({ order }) => {
  return (
    <Box
      component={Link}
      href={routes.profileOrderDetails(order.code).link}
      sx={{
        display: "block",
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 2,
        p: 2,
        mb: 2,
        backgroundColor: "background.main",
      }}
    >
      {/* Header */}
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack direction="row" gap={1} alignItems="center">
          {orderStatuses[order.status].icon}

          <Typography variant="body2" color={orderStatuses[order.status].color}>
            {orderStatuses[order.status].name}
          </Typography>

        </Stack>

        <ArrowBackIosNewIcon fontSize="small" />
      </Stack>

      <Stack
        direction={{xs: "column" , sm:"row"}}
        justifyContent="flex-start"
        alignItems={{xs: "start", sm:"center"}}
        sx={{ mt: 1, borderBottom: "1px solid", borderColor: "divider", pb: 1 }}
      >
        <Typography variant="body2" color="text.secondary">
          {toPersian(formatDate(order.createdAt))}
        </Typography>

        <Typography
          sx={{ mx: `16px !important`, display: {xs: "none", sm: "block"} }}
          variant="body2"
          color="text.secondary"
        >
          •
        </Typography>

        <Typography variant="body2" color="text.secondary">
          کد سفارش : {order.code}
        </Typography>

        <Typography
          sx={{ mx: `16px !important`, display: {xs: "none", sm: "block"} }}
          variant="body2"
          color="text.secondary"
        >
          •
        </Typography>

        <Typography variant="body2" color="text.secondary">
          مبلغ {formatPrice(calculateFinalPrice(order.price))} تومان
        </Typography>
      </Stack>

      <Stack
        direction="row"
        justifyContent="flex-start"
        gap={2}
        sx={{ mt: 2 }}
      >
        {order.products.map(({product}, index) => (
          <Image
            key={index}
            src={product?.media?.[0].path}
            alt={product?.title}
            width={0}
            height={0}
            sizes="100vw"
            unoptimized
            crossOrigin="anonymous"
            style={{
              width: 64,
              height: 64,
              borderRadius: 8,
              objectFit: "cover",
            }}
          />
        ))}
      </Stack>
    </Box>
  );
};

export default OrderCard;
