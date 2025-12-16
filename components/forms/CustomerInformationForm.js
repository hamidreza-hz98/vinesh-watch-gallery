"use client";

import { userInformationDefaultValues } from "@/constants/forms";
import { userInformationSchema } from "@/constants/validation";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  Divider,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import CustomDatePicker from "../fields/CustomDatePicker";
import LockIcon from "@mui/icons-material/Lock";
import { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { toPersian } from "@/lib/number";
import { useDispatch } from "react-redux";
import useNotifications from "@/hooks/useNotifications/useNotifications";
import { updateCustomer } from "@/store/customer/customer.action";

const CustomerInformationForm = ({ data }) => {
  const dispatch = useDispatch()
  const notifications = useNotifications()

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showNewPasswordConfirmation, setShowNewPasswordConfirmation] =
    useState(false);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: userInformationDefaultValues(data),
    resolver: yupResolver(userInformationSchema),
  });

  useEffect(() => {
    reset(userInformationDefaultValues(data));
  }, [data, reset]);

  const handleFormSubmit = async (body) => {
    try {
      const message = await dispatch(
          updateCustomer({ _id: data?._id, body })
        ).unwrap();

           notifications.show(message, {
        severity: "success",
        autoHideDuration: 3000,
      });
    } catch (error) {
        notifications.show(error, {
        severity: "error",
        autoHideDuration: 3000,
      });
    }
    
  }

  return (
    <Box component="form" onSubmit={handleSubmit(handleFormSubmit)}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Controller
            name="firstName"
            control={control}
            render={({ field }) => (
              <TextField
                variant="outlined"
                size="small"
                fullWidth
                error={!!errors.name}
                helperText={errors.name?.message}
                {...field}
                placeholder="مهسا"
                label="نام"
              />
            )}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Controller
            name="lastName"
            control={control}
            render={({ field }) => (
              <TextField
                variant="outlined"
                size="small"
                fullWidth
                error={!!errors.name}
                helperText={errors.name?.message}
                {...field}
                placeholder="بزرگمهری"
                label="نام خانوادگی"
              />
            )}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <TextField
                variant="outlined"
                size="small"
                fullWidth
                error={!!errors.name}
                helperText={errors.name?.message}
                {...field}
                placeholder={toPersian("09129876543")}
                label="شماره تلفن"
              />
            )}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                variant="outlined"
                size="small"
                fullWidth
                error={!!errors.name}
                helperText={errors.name?.message}
                {...field}
                placeholder="example@gmail.com"
                label="ایمیل"
              />
            )}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Controller
            name="birthdate"
            control={control}
            render={({ field }) => (
              <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography ml={2} variant="caption"> تاریخ تولد: </Typography>
              
              <CustomDatePicker
                value={field.value}
                onChange={field.onChange}
                error={!!errors.birthdate}
                helperText={errors.birthdate?.message}
                label="تاریخ تولد"
                />
                </Box>
            )}
          />
        </Grid>

        <Grid size={{ xs: 12 }} mt={2}>
          <Divider sx={{ backgroundColor: "primary.main" }} />

          <Typography mt={2} variant="h4">
            تغییر رمز عبور
          </Typography>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Controller
            name="oldPassword"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                type={showOldPassword ? "text" : "password"}
                label="رمز عبور قدیم"
                variant="outlined"
                size="small"
                margin="normal"
                error={!!errors.oldPassword}
                helperText={errors.oldPassword?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      {showOldPassword ? (
                        <VisibilityOff
                          sx={{ cursor: "pointer" }}
                          onClick={() => setShowOldPassword(false)}
                        />
                      ) : (
                        <Visibility
                          sx={{ cursor: "pointer" }}
                          onClick={() => setShowOldPassword(true)}
                        />
                      )}
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Controller
            name="newPassword"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                type={showNewPassword ? "text" : "password"}
                label="رمز عبور جدید"
                variant="outlined"
                size="small"
                margin="normal"
                error={!!errors.newPassword}
                helperText={errors.newPassword?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      {showNewPassword ? (
                        <VisibilityOff
                          sx={{ cursor: "pointer" }}
                          onClick={() => setShowNewPassword(false)}
                        />
                      ) : (
                        <Visibility
                          sx={{ cursor: "pointer" }}
                          onClick={() => setShowNewPassword(true)}
                        />
                      )}
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Controller
            name="newPasswordConfirmation"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                type={showNewPasswordConfirmation ? "text" : "password"}
                label="تکرار رمز عبور"
                variant="outlined"
                size="small"
                margin="normal"
                error={!!errors.newPasswordConfirmation}
                helperText={errors.newPasswordConfirmation?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      {showNewPasswordConfirmation ? (
                        <VisibilityOff
                          sx={{ cursor: "pointer" }}
                          onClick={() => setShowNewPasswordConfirmation(false)}
                        />
                      ) : (
                        <Visibility
                          sx={{ cursor: "pointer" }}
                          onClick={() => setShowNewPasswordConfirmation(true)}
                        />
                      )}
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
        </Grid>

        <Grid display='flex' justifyContent="end" size={{ xs:12 }}>
            
            <Button variant="contained" type="submit">
              ذخیره تغییرات
            </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CustomerInformationForm;
