"use client";

import useNotifications from "@/hooks/useNotifications/useNotifications";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import ButtonLoader from "../common/ButtonLoader";
import { contactSchema } from "@/validation/landing.validations";
import { fetchWithAuth } from "@/lib/fetch";
import { submitContactApi } from "@/constants/api.routes";

const ContactForm = () => {
  const notifications = useNotifications();

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(contactSchema),
    defaultValues: {
      fullName: "",
      mobile: "",
      message: "",
    },
  });

  const handleSubmitForm = async (body) => {
    try {
      const { message } = await fetchWithAuth(submitContactApi, {method: "POST", body})

      notifications.show(message, {
        severity: "success",
        autoHideDuration: 3000,
      });

      reset();
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
      onSubmit={handleSubmit(handleSubmitForm)}
      noValidate
      sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%" }}
    >



      <Controller
        name="fullName"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="نام و نام خانوادگی"
            variant="outlined"
            size="small"
            error={!!errors.fullName}
            helperText={errors.fullName?.message}
          />
        )}
      />

      <Controller
        name="mobile"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="شماره موبایل"
            variant="outlined"
            size="small"
            error={!!errors.mobile}
            helperText={errors.mobile?.message}
          />
        )}
      />

      <Controller
        name="message"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="پیام"
            variant="outlined"
            placeholder="سلام! من داشتم دنبال ....."
            size="small"
            multiline
            minRows={3}
            error={!!errors.message}
            helperText={errors.message?.message}
          />
        )}
      />

      <Button disabled={isSubmitting} variant="contained" type="submit">
        {isSubmitting ? <ButtonLoader /> : "ارسال"}
      </Button>
    </Box>
  );
};

export default ContactForm;
