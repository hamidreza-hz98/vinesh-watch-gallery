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
import { toEnglish, toPersian } from "@/lib/number";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import useNotifications from "@/hooks/useNotifications/useNotifications";
import { useRouter } from "next/navigation";
import { setCookie } from "nookies";
import { loginFormValidationSchema } from "@/validation/landing.validations";
import { loginCustomer } from "@/app/actions/customer";

const CustomerLoginForm = ({ onSwitch, onSuccess }) => {
  const [showPassword, setShowPassword] = useState(false);

    const notifications = useNotifications();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(loginFormValidationSchema) });

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (e) => e.preventDefault();

  const onSubmit = async (body) => {
     try {
      const {data, message} = await loginCustomer({...body, phone: toEnglish(body.phone)})

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

      onSuccess?.()
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
        ورود به حساب کاربری
      </Typography>

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
        <Typography variant="caption">حساب کاربری ندارید؟</Typography>
        <Typography mr={1} variant="caption" color="primary">
          ثبت نام
        </Typography>
      </Box>

      <Button
        variant="contained"
        type="submit"
        disabled={isSubmitting}
        sx={{ mt: 1 }}
      >
        {isSubmitting ? "Loading..." : "ورود"}
      </Button>
    </Box>
  );
};

export default CustomerLoginForm;