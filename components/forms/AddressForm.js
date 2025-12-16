/* eslint-disable react-hooks/incompatible-library */
"use client";

import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  Autocomplete,
  Box,
  IconButton,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toPersian } from "@/lib/number";
import { shahr, ostan } from "iran-cities-json";
import { addressFormValidationSchema } from "@/constants/validation";
import { CloseOutlined } from "@mui/icons-material";

const AddressForm = ({
  open,
  onClose,
  initialValues = {},
  onSubmit,
  isEdit,
}) => {
  const {
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(addressFormValidationSchema),
  });

  useEffect(() => {
    reset(initialValues);
  }, [initialValues, open, reset]);

  const watchProvince = watch("province");

  // Provinces list
  const provinceOptions = ostan.map((p) => p.name);

  // Cities filtered by selected province
  const [cityOptions, setCityOptions] = useState([]);

  useEffect(() => {
    if (watchProvince) {
      const selectedProvince = ostan.find((p) => p.name === watchProvince);
      if (selectedProvince) {
        setCityOptions(
          shahr
            .filter((c) => c.ostan === selectedProvince.id)
            .map((c) => c.name)
        );
      } else {
        setCityOptions([]);
      }
    } else {
      setCityOptions([]);
    }
  }, [watchProvince]);

  const handleFormSubmit = (data) => {
    onSubmit(data);
    reset();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        px={1}
      >
        <DialogTitle>{isEdit ? "ویرایش آدرس" : "آدرس جدید"}</DialogTitle>

        <IconButton onClick={onClose}>
          <CloseOutlined />
        </IconButton>
      </Box>

      <DialogContent sx={{ pt: 1 }}>
        <Box component="form" onSubmit={handleSubmit(handleFormSubmit)}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <TextField
                    variant="outlined"
                    size="small"
                    fullWidth
                    error={!!errors.name}
                    helperText={errors.name?.message}
                    {...field}
                    placeholder="خانه"
                    label="نام آدرس"
                  />
                )}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <Controller
                name="recipientName"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    size="small"
                    fullWidth
                    error={!!errors.recipientName}
                    helperText={errors.recipientName?.message}
                    placeholder="لابی من"
                    label="نام گیرنده"
                  />
                )}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <Controller
                name="recipientPhone"
                control={control}
                render={({ field }) => (
                  <TextField
                    size="small"
                    error={!!errors.recipientPhone}
                    helperText={errors.recipientPhone?.message}
                    fullWidth
                    {...field}
                    placeholder={toPersian("09129876543")}
                    label="شماره تلفن گیرنده"
                  />
                )}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Controller
                name="address"
                control={control}
                render={({ field }) => (
                  <TextField
                    size="small"
                    fullWidth
                    error={!!errors.address}
                    helperText={errors.address?.message}
                    multiline
                    minRows={3}
                    {...field}
                    label="آدرس"
                    placeholder="خیابان ولنجک، خیابان بیست و چهار، پلاک 18، واحد 18"
                  />
                )}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <Controller
                name="zipCode"
                control={control}
                render={({ field }) => (
                  <TextField
                    size="small"
                    error={!!errors.zipCode}
                    helperText={errors.zipCode?.message}
                    fullWidth
                    {...field}
                    label="کد پستی"
                    placeholder={toPersian("1085789845")}
                  />
                )}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <Controller
                name="province"
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    size="small"
                    fullWidth
                    options={provinceOptions}
                    value={field.value || null}
                    onChange={(_, value) => field.onChange(value)}
                    renderInput={(params) => (
                      <TextField {...params} label="استان" />
                    )}
                  />
                )}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <Controller
                name="city"
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    size="small"
                    fullWidth
                    options={cityOptions}
                    value={field.value || null}
                    onChange={(_, value) => field.onChange(value)}
                    renderInput={(params) => (
                      <TextField {...params} label="شهر" />
                    )}
                  />
                )}
              />
            </Grid>
          </Grid>

          <DialogActions sx={{ mt: 2 }}>
            <Button color="error" variant="contained" onClick={onClose}>
              انصراف
            </Button>

            <Box sx={{ flex: "1 1" }} />

            <Button type="submit" variant="contained">
              ذخیره
            </Button>
          </DialogActions>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default AddressForm;
