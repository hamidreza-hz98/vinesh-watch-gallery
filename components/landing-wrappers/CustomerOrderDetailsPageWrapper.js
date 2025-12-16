"use client";

import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import nookies from "nookies";
import { getCustomerOrderDetails } from "@/store/order/order.action";
import { selectOrder, selectOrderLoading } from "@/store/order/order.selector";
import Loader from "../common/Loader";
import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import Link from "next/link";
import routes from "@/constants/landing.routes";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { orderStatuses } from "@/constants/general";
import { calculateFinalPrice, formatPrice, toPersian } from "@/lib/number";
import Image from "next/image";
import { setFilePath } from "@/lib/media";
import { formatDateAndTime } from "@/lib/date";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import useNotifications from "@/hooks/useNotifications/useNotifications";
import InfoIcon from "@mui/icons-material/Info";
import { retryPayment } from "@/store/transaction/transaction.action";
import { selectTransactionLoading } from "@/store/transaction/transaction.selector";

const DetailItem = ({ label, value, copyable }) => {
  const notifications = useNotifications();

  const handleCopy = () => {
    navigator.clipboard.writeText(value);

    notifications.show("کد رهگیری مرسوله کپی شد!", {
      severity: "success",
      autoHideDuration: 3000,
    });
  };

  return (
    <Box mb={1}>
      <Typography fontSize={13} color="text.secondary">
        {label}
      </Typography>

      <Box
        display="flex"
        alignItems="center"
        sx={{ cursor: copyable && "pointer" }}
        gap={1}
        onClick={copyable && handleCopy}
      >
        {copyable && (
          <IconButton size="small">
            <ContentCopyIcon fontSize="small" />
          </IconButton>
        )}

        <Typography fontSize={15} fontWeight="bold">
          {value}
        </Typography>
      </Box>
    </Box>
  );
};

const SectionTitle = ({ title }) => (
  <Typography mt={3} mb={1} fontWeight={700} fontSize={18}>
    {title}
  </Typography>
);

const CustomerOrderDetailsPageWrapper = ({ code }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { customer } = nookies.get();
  const order = useSelector(selectOrder);
  const loading = useSelector(selectOrderLoading);
  const paymentLoading = useSelector(selectTransactionLoading);

  const loadData = useCallback(async () => {
    await dispatch(getCustomerOrderDetails({ code, customer })).unwrap();
  }, [dispatch, customer, code]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleRetryPayment = async () => {
    await dispatch(retryPayment({ orderId: order?._id })).unwrap();
  };

  if (!order || Object.keys(order).length === 0 || loading) {
    return <Loader />;
  }

  return (
    <Grid container>
      <Grid
        size={{ xs: 12 }}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="flex-start"
          gap={2}
        >
          <Typography> جزییات سفارش </Typography>

          {["pending_payment", "failed"].includes(order.status) && (
            <Button
              loading={paymentLoading}
              variant="contained"
              onClick={handleRetryPayment}
            >
              پرداخت مجدد
            </Button>
          )}
        </Box>

        <Link
          href={routes.profileOrders.link}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          بازگشت
          <ChevronLeftIcon />
        </Link>
      </Grid>

      <Grid size={{ xs: 12 }}>
        <Divider sx={{ my: 3 }} />
      </Grid>

      <Grid item size={{ xs: 12, sm: 6 }}>
        <DetailItem label="کد سفارش" value={order?.code} />
      </Grid>

      <Grid item size={{ xs: 12, sm: order?.shipmentTrackNumber ? 3 : 6 }}>
        {order?.shipmentTrackNumber ? (
          <DetailItem
            label="کد رهگیری مرسوله"
            value={order?.shipmentTrackNumber}
            copyable
          />
        ) : (
          <Box
            color="info.main"
            display="flex"
            alignItems="center"
            justifyContent="start"
            gap={1}
          >
            <InfoIcon />
            <Typography>
              به محض تحویل سفارش شما به مامور پست، کد رهگیری همینجا قابل مشاهده
              خواهد بود.
            </Typography>
          </Box>
        )}
      </Grid>

      <Grid item size={{ xs: 12, sm: 6 }}>
        <Typography fontSize={13} color="text.secondary">
          وضعیت سفارش
        </Typography>

        <Box display="flex" alignItems="center" gap={1}>
          <Box display="flex">{orderStatuses[order.status].icon}</Box>

          <Typography fontSize={15} fontWeight="bold">
            {orderStatuses[order.status].name}
          </Typography>
        </Box>
      </Grid>

      <Grid item size={{ xs: 12, sm: 6 }}>
        <DetailItem
          label="تاریخ سفارش"
          value={formatDateAndTime(order?.createdAt)}
        />
      </Grid>

      <Grid item size={{ xs: 12 }}>
        <SectionTitle title="آدرس ارسال" />
      </Grid>

      <Grid item size={{ xs: 12, sm: 3 }}>
        <DetailItem
          label="تحویل گیرنده"
          value={order?.address?.recipientName}
        />
      </Grid>

      <Grid item size={{ xs: 12, sm: 3 }}>
        <DetailItem label="استان" value={order?.address?.province} />
      </Grid>

      <Grid item size={{ xs: 12, sm: 3 }}>
        <DetailItem label="شهر" value={order?.address?.city} />
      </Grid>

      <Grid item size={{ xs: 12, sm: 3 }}>
        <DetailItem label="کد پستی" value={order?.address?.zipCode} />
      </Grid>

      <Grid item size={{ xs: 12 }}>
        <DetailItem label="آدرس کامل" value={order?.address?.address} />
      </Grid>

      <Grid item size={{ xs: 12 }}>
        <SectionTitle title="هزینه‌ها" />
      </Grid>

      <Grid item size={{ xs: 12, sm: 4 }}>
        <DetailItem
          label="جمع محصولات"
          value={`${formatPrice(calculateFinalPrice(order?.price))} تومان`}
        />
      </Grid>

      <Grid item size={{ xs: 12, sm: 4 }}>
        <DetailItem
          label="هزینه ارسال"
          value={`${formatPrice(order?.price.shipment || 0)} تومان`}
        />
      </Grid>

      <Grid item size={{ xs: 12, sm: 4 }}>
        <DetailItem
          label="تخفیف‌ها"
          value={`${formatPrice(order?.price?.discounts || 0)} تومان`}
        />
      </Grid>

      <Grid size={{ xs: 12 }}>
        <Divider sx={{ my: 3 }} />
      </Grid>

      <Grid item size={{ xs: 12 }}>
        <SectionTitle title="محصولات سفارش" />
      </Grid>

      {order?.products &&
        order?.products?.length !== 0 &&
        order?.products?.map((item) => (
          <Grid
            key={item._id}
            item
            size={{ xs: 12 }}
            sx={{
              p: 2,
              border: `1px solid ${theme.palette.primary.dark}`,
              borderRadius: 2,
              mb: 2,
            }}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              flexDirection={{ xs: "column", sm: "row" }}
              gap={2}
            >
              <Box display="flex" justifyContent="start" gap={2}>
                <Image
                  src={setFilePath(item?.product?.media?.[0].path)}
                  alt={item?.product?.title}
                  width={0}
                  height={0}
                  sizes="100vw"
                  unoptimized
                  crossOrigin="anonymous"
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 8,
                    objectFit: "cover",
                  }}
                />
                <Box>
                  <Typography fontWeight="bold">
                    {item.product.title}
                  </Typography>
                  <Typography fontSize={14} color="text.secondary">
                    تعداد: {item.quantity}
                  </Typography>
                </Box>
              </Box>

              <Box>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  gap={1}
                >
                  <Typography fontSize={13} color="text.secondary">
                    قیمت محصول:
                  </Typography>

                  <Typography fontSize={15} fontWeight="bold">
                    {formatPrice(item.product.price)} تومان
                  </Typography>
                </Box>

                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  gap={1}
                >
                  <Typography fontSize={13} color="text.secondary">
                    تخفیف:
                  </Typography>

                  <Typography fontSize={15} fontWeight="bold">
                    {formatPrice(item.product.discount)} تومان
                  </Typography>
                </Box>

                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  gap={1}
                >
                  <Typography fontSize={13} color="text.secondary">
                    قیمت نهایی:
                  </Typography>

                  <Typography fontSize={15} fontWeight="bold">
                    {formatPrice(
                      (item.product.price - item.product.discount) *
                        item.quantity
                    )}{" "}
                    تومان
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
        ))}
    </Grid>
  );
};

export default CustomerOrderDetailsPageWrapper;
