"use client";

import { defaultOrderValues } from "@/constants/default-form-values";
import { orderStatuses } from "@/constants/general";
import { formatDateAndTime } from "@/lib/date";
import { calculateFinalPrice, formatPrice, toPersian } from "@/lib/number";
import {
  Autocomplete,
  Box,
  Button,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import Loader from "../common/Loader";
import Image from "next/image";
import { setFilePath } from "@/lib/media";

const statusOptions = Object.entries(orderStatuses).map(([key, value]) => ({
  value: key,
  label: value.name,
  color: value.color,
  icon: value.icon,
}));

const DetailItem = ({ label, value }) => (
  <Box mb={1}>
    <Typography fontSize={13} color="text.secondary">
      {label}
    </Typography>
    <Typography fontSize={15} fontWeight="bold">
      {value}
    </Typography>
  </Box>
);

const SectionTitle = ({ title }) => (
  <Typography mt={3} mb={1} fontWeight={700} fontSize={18}>
    {title}
  </Typography>
);

const OrderForm = ({ order, onSubmit }) => {
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    reset,
    getValues,
    setValue,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: defaultOrderValues(order),
  });

  React.useEffect(() => {
    reset(defaultOrderValues(order));
  }, [order, reset]);

  const handleFormSubmit = async (data) => {
    onSubmit && onSubmit(data);
  };

  if (!order || Object.keys(order).length === 0) {
    return <Loader />;
  }

  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit(handleFormSubmit)}
        sx={{ width: "100%", mt: 2 }}
      >
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Controller
              name="shipmentTrackNumber"
              control={control}
              render={({ field }) => (
                <TextField
                  size="small"
                  {...field}
                  fullWidth
                  label="کد رهگیری ارسال"
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <Autocomplete
                  {...field}
                  options={statusOptions}
                  size="small"
                  getOptionLabel={(option) => option.label}
                  value={
                    statusOptions.find((opt) => opt.value === field.value) ||
                    null
                  }
                  onChange={(_, newValue) =>
                    field.onChange(newValue?.value || "")
                  }
                  renderOption={(props, option) => (
                    <li {...props}>
                      {option.icon}
                      <span style={{ marginLeft: 8 }}>{option.label}</span>
                    </li>
                  )}
                  renderInput={(params) => (
                    <TextField {...params} label="وضعیت سفارش" />
                  )}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12 }} display="flex" justifyContent="flex-end">
            <Button type="submit" variant="contained" disabled={isSubmitting}>
              ذخیره تغییرات
            </Button>
          </Grid>
        </Grid>
      </Box>

      <Grid container>
        <Grid size={{ xs: 12 }} mt={4}>
          <Divider sx={{ backgroundColor: "primary.main", height: 2 }} />

          <Typography mt={2} variant="h4">
            جزییات سفارش
          </Typography>
        </Grid>

        <Grid item size={{ xs: 12, sm: 6 }}>
          <DetailItem label="کد سفارش" value={order.code} />
        </Grid>

        <Grid item size={{ xs: 12, sm: 6 }}>
          <DetailItem
            label="وضعیت سفارش"
            value={
              <Box display="flex" alignItems="center" gap={1}>
                {orderStatuses[order.status].icon}
                <Typography>{orderStatuses[order.status].name}</Typography>
              </Box>
            }
          />
        </Grid>

        <Grid item size={{ xs: 12 }}>
          <SectionTitle title="اطلاعات مشتری" />
        </Grid>

        <Grid item size={{ xs: 12, sm: 4 }}>
          <DetailItem
            label="نام مشتری"
            value={`${order.customer.firstName} ${order.customer.lastName}`}
          />
        </Grid>

        <Grid item size={{ xs: 12, sm: 4 }}>
          <DetailItem
            label="شماره تماس"
            value={toPersian(order.customer.phone)}
          />
        </Grid>

        <Grid item size={{ xs: 12 }}>
          <SectionTitle title="آدرس ارسال" />
        </Grid>

        <Grid item size={{ xs: 12, sm: 4 }}>
          <DetailItem label="استان" value={order.address.province} />
        </Grid>

        <Grid item size={{ xs: 12, sm: 4 }}>
          <DetailItem label="شهر" value={order.address.city} />
        </Grid>

        <Grid item size={{ xs: 12, sm: 4 }}>
          <DetailItem
            label="کد پستی"
            value={toPersian(order.address.zipCode)}
          />
        </Grid>

        <Grid item size={{ xs: 12 }}>
          <DetailItem
            label="آدرس کامل"
            value={toPersian(order.address.address)}
          />
        </Grid>

        <Grid item size={{ xs: 12 }}>
          <SectionTitle title="هزینه‌ها" />
        </Grid>

        <Grid item size={{ xs: 12, sm: 4 }}>
          <DetailItem
            label="جمع محصولات"
            value={`${formatPrice(calculateFinalPrice(order.price))} تومان`}
          />
        </Grid>

        <Grid item size={{ xs: 12, sm: 4 }}>
          <DetailItem
            label="هزینه ارسال"
            value={`${formatPrice(order.price.shipment)} تومان`}
          />
        </Grid>

        <Grid item size={{ xs: 12, sm: 4 }}>
          <DetailItem
            label="تخفیف‌ها"
            value={`${formatPrice(order.price.discounts)} تومان`}
          />
        </Grid>

        <Grid item size={{ xs: 12 }}>
          <SectionTitle title="محصولات سفارش" />
        </Grid>

        {order.products.map((item) => (
          <Grid
            key={item._id}
            item
            size={{ xs: 12 }}
            sx={{
              p: 2,
              border: "1px solid #ddd",
              borderRadius: 2,
              mb: 2,
            }}
          >
            <Box display="flex" justifyContent="space-between" flexDirection={{xs: "column", sm: "row"}} gap={2}>
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
                    {formatPrice((item.product.price - item.product.discount) * item.quantity)} تومان
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
        ))}

        <Grid item size={{ xs: 12, sm: 6 }}>
          <DetailItem
            label="تاریخ ایجاد"
            value={toPersian(formatDateAndTime(order.createdAt))}
          />
        </Grid>

        <Grid item size={{ xs: 12, sm: 6 }}>
          <DetailItem
            label="آخرین بروزرسانی"
            value={toPersian(formatDateAndTime(order.updatedAt))}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default OrderForm;
