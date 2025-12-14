"use client";

import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import adminLoginSchema from "@/validation/admin-login.validation";
import ButtonLoader from "../common/ButtonLoader";
import useNotifications from "@/hooks/useNotifications/useNotifications";
import { useRouter } from "next/navigation";
import { setCookie } from "nookies";

export default function LoginForm() {
  const router = useRouter();
  const notifications = useNotifications();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(adminLoginSchema),
    defaultValues: { username: "", password: "" },
  });

  const onSubmit = async (body) => {
    try {
      setIsSubmitting(true);

      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      
      const {data, message} = await res.json();

      setCookie(null, "token", data.token, {
       path: "/",
       maxAge: 60 * 60 * 24 * 30,
       sameSite: "lax",
     });

     setCookie(null, "_id", data.admin._id, {
       path: "/",
       maxAge: 60 * 60 * 24 * 30,
       sameSite: "lax",
     });

      if (!res.ok) {
        throw message || "مشکلی پیش آمد.";
      }

      notifications.show(message || "ورود موفقیت‌آمیز بود.", {
        severity: "success",
        autoHideDuration: 3000,
      });

      router.push("/dashboard");
    } catch (error) {
      notifications.show(error.message || "مشکلی پیش آمد.", {
        severity: "error",
        autoHideDuration: 3000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ width: "100%", maxWidth: 360 }}
    >
      <Typography
        variant="h5"
        component="h2"
        sx={{ mb: 3, textAlign: "center" }}
      >
        ورود
      </Typography>

      <Controller
        name="username"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            fullWidth
            label="نام کاربری"
            variant="outlined"
            margin="normal"
            error={!!errors.username}
            helperText={errors.username?.message}
            sx={{
              "& .MuiInputLabel-root": { color: "white" },
              "& .MuiInputLabel-root.Mui-focused": { color: "white" },
              "& .MuiOutlinedInput-input": { color: "white" },
              "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(255,255,255,0.5)",
              },
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "white",
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start" sx={{ color: "white" }}>
                  <EmailIcon />
                </InputAdornment>
              ),
            }}
          />
        )}
      />

      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            fullWidth
            type="password"
            label="رمز عبور"
            variant="outlined"
            margin="normal"
            error={!!errors.password}
            helperText={errors.password?.message}
            sx={{
              "& .MuiInputLabel-root": { color: "white" },
              "& .MuiInputLabel-root.Mui-focused": { color: "white" },
              "& .MuiOutlinedInput-input": { color: "white" },
              "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(255,255,255,0.5)",
              },
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "white",
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start" sx={{ color: "white" }}>
                  <LockIcon />
                </InputAdornment>
              ),
            }}
          />
        )}
      />

      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 2, py: 1.5 }}
        disabled={isSubmitting}
      >
        {isSubmitting ? <ButtonLoader /> : "ورود"}
      </Button>
    </Box>
  );
}
