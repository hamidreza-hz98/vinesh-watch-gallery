"use client";

import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { toPersian } from "@/lib/number";
import useNotifications from "@/hooks/useNotifications/useNotifications";
import Link from "next/link";
import { fetchWithAuth } from "@/lib/fetch";
import { customerSignupApi } from "@/constants/api.routes";
import { setCookie } from "nookies";
import { signupFormValidationSchema } from "@/validation/landing.validations";
import { signupCustomer } from "@/app/actions/customer";

const CustomerSignupForm = ({ onSwitch, onSuccess, onClose }) => {
  const [showPassword, setShowPassword] = useState(false);

  const notifications = useNotifications();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(signupFormValidationSchema) });

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (e) => e.preventDefault();

  const onSubmit = async (body) => {
    try {
      const {data, message} = await signupCustomer(body)

      const { token, customer } = data;

      setCookie(null, "token", token, {
        maxAge: 365 * 30 * 24 * 60 * 60,
        path: "/",
        sameSite: "lax",
      });

      setCookie(null, "customer", customer._id, {
        maxAge: 365 * 30 * 24 * 60 * 60,
        path: "/",
        sameSite: "lax",
      });

      notifications.show(message, {
        severity: "success",
        autoHideDuration: 3000,
      });

      onSuccess?.();
    } catch (error) {
      notifications.show(error.message, {
        severity: "error",
        autoHideDuration: 3000,
      });
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      sx={{ display: "flex", flexDirection: "column", gap: 2, width: 320 }}
    >
      <Typography variant="h5" fontWeight={600} textAlign="center">
        ثبت نام
      </Typography>

      <Controller
        name="firstName"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="نام"
            variant="outlined"
            size="small"
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
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
            variant="outlined"
            size="small"
            error={!!errors.lastName}
            helperText={errors.lastName?.message}
          />
        )}
      />

      <Controller
        name="phone"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="شماره همراه"
            variant="outlined"
            placeholder={toPersian("09129876543")}
            size="small"
            error={!!errors.phone}
            helperText={errors.phone?.message}
          />
        )}
      />

      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="رمز عبور"
            type={showPassword ? "text" : "password"}
            variant="outlined"
            size="small"
            error={!!errors.password}
            helperText={errors.password?.message}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        )}
      />

      <Box
        onClick={onSwitch}
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{ cursor: "pointer" }}
      >
        <Typography variant="caption">حساب کاربری دارید؟</Typography>
        <Typography mr={1} variant="caption" color="primary">
          ورود
        </Typography>
      </Box>

      <Typography fontSize={12} textAlign="center" color="textSecondary">
        ثبت نام در این سایت به منزله پذیرش{" "}
        <Link href="/terms" passHref>
          <Typography
            component="span"
            color="primary"
            fontSize={12}
            sx={{ cursor: "pointer" }}
            onClick={onClose}
          >
            شرایط و قوانین
          </Typography>
        </Link>{" "}
        می‌باشد.
      </Typography>

      <Button
        variant="contained"
        type="submit"
        disabled={isSubmitting}
        sx={{ mt: 1 }}
      >
        {isSubmitting ? "Loading..." : "ثبت نام"}
      </Button>
    </Box>
  );
};

export default CustomerSignupForm;
