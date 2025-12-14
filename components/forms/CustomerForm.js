"use client";

import { defaultCustomerValues } from "@/constants/default-form-values";
import {
  createCustomer,
  updateCustomer,
} from "@/store/customer/customer.action";
import customerSchema from "@/validation/customer.validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, TextField, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import CustomDatePicker from "../fields/CustomDatePicker";

const CustomerForm = ({ mode, data, onClose, onSuccess, onError }) => {
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    reset,
    getValues,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(customerSchema),
    defaultValues: defaultCustomerValues(data),
  });

  React.useEffect(() => {
    reset(defaultCustomerValues(data));
  }, [mode, data, reset]);

  const onSubmit = async (body) => {
    let message = "";

    try {
      if (mode === "edit") {
        message = await dispatch(
          updateCustomer({ _id: data?._id, body })
        ).unwrap();
      } else {
        message = await dispatch(createCustomer(body)).unwrap();
      }

      reset();
      onSuccess && onSuccess( message );
    } catch (error) {
      onError && onError(message );
    }
  };
  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ width: "100%" }}
    >
      <Stack spacing={2}>
        <Typography variant="h4">
          {mode === "edit" ? "ویرایش مشتری" : "ساخت حساب کاربری مشتری جدید"}
        </Typography>

        <Controller
          name="firstName"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="نام"
              error={!!errors?.firstName}
              helperText={errors.firstName?.message}
              fullWidth
            />
          )}
        />

        <Controller
          name="lastName"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="نام خانوادگی"
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
              fullWidth
            />
          )}
        />

        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="شماره تلفن"
              error={!!errors.phone}
              helperText={errors.phone?.message}
              fullWidth
            />
          )}
        />

        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="ایمیل"
              type="email"
              error={!!errors.email}
              helperText={errors.email?.message}
              fullWidth
            />
          )}
        />

        <Controller
          name="birthdate"
          control={control}
          render={({ field }) => (
            <CustomDatePicker
              value={field.value}
              onChange={field.onChange}
              error={!!errors.birthdate}
              helperText={errors.birthdate?.message}
              label="تاریخ تولد"
            />
          )}
        />

        <Stack direction="row" justifyContent="space-between" spacing={2}>
          <Button type="submit" variant="contained" disabled={isSubmitting}>
            {mode === "edit" ? "ویرایش" : "ساختن"}
          </Button>

          <Button variant="outlined" color="error" onClick={onClose}>
            لغو
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default CustomerForm;
