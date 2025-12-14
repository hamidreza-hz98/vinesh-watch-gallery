"use client";

import React from "react";
import { useDispatch } from "react-redux";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Controller, useForm } from "react-hook-form";
import { seoSettingsDefaultValues } from "@/constants/default-form-values";
import Loader from "@/components/common/Loader";
import { Box, Button, Drawer, Grid, Stack, TextField, Typography } from "@mui/material";
import MediaPreview from "@/components/common/MediaPreview";
import MediaPageWrapper from "@/components/wrappers/MediaPageWrapper";

const DefaultSeoSettingsForm = ({ data, onSubmit }) => {
  const [activeField, setActiveField] = React.useState(null);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [drawerType, setDrawerType] = React.useState("image");
  const [drawerMultiple, setDrawerMultiple] = React.useState(false);
  const [selectedMediaObjects, setSelectedMediaObjects] = React.useState({});

  const {
    control,
    handleSubmit,
    reset,
    getValues,
    setValue,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: seoSettingsDefaultValues(data),
  });

  React.useEffect(() => {
    setSelectedMediaObjects({
      ogImage: data?.ogImage,
      twitterImage: data?.twitterImage,
    });

    reset(seoSettingsDefaultValues(data));
  }, [data, reset]);

  const handleFormSubmit = async (data) => {
    onSubmit && onSubmit(data);
  };

  const openMediaDrawer = (fieldName, type, multiple) => {
    setActiveField(fieldName);
    setDrawerType(type);
    setDrawerMultiple(multiple);
    setDrawerOpen(true);
  };

  const handleSelect = (media) => {
    const ids = drawerMultiple ? media.map((m) => m?._id) : media[0]?._id;
    setValue(activeField, ids);

    setSelectedMediaObjects((prev) => ({
      ...prev,
      [activeField]: drawerMultiple ? media : media[0] || null,
    }));

    setDrawerOpen(false);
  };
  

  if (!data) {
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
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <TextField
                  size="small"
                  {...field}
                  fullWidth
                  label="عنوان سئو"
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 8 }}>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TextField
                  size="small"
                  {...field}
                  fullWidth
                  label="توضیحات سئو"
                  multiline
                  rows={2}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <Controller
              name="keywords"
              control={control}
              render={({ field }) => (
                <TextField
                  size="small"
                  {...field}
                  fullWidth
                  label="کلمات کلیدی (با کاما جدا کنید)"
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <Controller
              name="ogTitle"
              control={control}
              render={({ field }) => (
                <TextField size="small" {...field} fullWidth label="OG Title" />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <Controller
              name="ogDescription"
              control={control}
              render={({ field }) => (
                <TextField
                  size="small"
                  {...field}
                  fullWidth
                  label="OG Description"
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <Controller
              name="ogImage"
              control={control}
              defaultValue={null}
              render={({ field }) => (
                <Stack spacing={1}>
                  <Typography>OG Image</Typography>
                  <Button
                    variant="contained"
                    startIcon={<CloudUploadIcon />}
                    onClick={() => openMediaDrawer("ogImage", "image", false)}
                  >
                    انتخاب
                  </Button>
                  {selectedMediaObjects[`ogImage`] && (
                    <MediaPreview file={selectedMediaObjects[`ogImage`]} />
                  )}
                </Stack>
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <Controller
              name="twitterTitle"
              control={control}
              render={({ field }) => (
                <TextField
                  size="small"
                  {...field}
                  fullWidth
                  label="تیتر توییتر"
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <Controller
              name="twitterDescription"
              control={control}
              render={({ field }) => (
                <TextField
                  size="small"
                  {...field}
                  fullWidth
                  label="توضیحات توییتر"
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <Controller
              name="twitterImage"
              control={control}
              defaultValue={null}
              render={({ field }) => (
                <Stack spacing={1}>
                  <Typography>Twitter Image</Typography>
                  <Button
                    variant="contained"
                    startIcon={<CloudUploadIcon />}
                    onClick={() =>
                      openMediaDrawer("twitterImage", "image", false)
                    }
                  >
                    انتخاب
                  </Button>
                  {selectedMediaObjects[`twitterImage`] && (
                    <MediaPreview file={selectedMediaObjects[`twitterImage`]} />
                  )}
                </Stack>
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <Controller
              name="canonical"
              control={control}
              render={({ field }) => (
                <TextField
                  size="small"
                  {...field}
                  fullWidth
                  label="لینک کنونیکال"
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <Controller
              name="robots"
              control={control}
              render={({ field }) => (
                <TextField size="small" {...field} fullWidth label="Robots" />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <Controller
              name="additionalMetaTags"
              control={control}
              render={({ field }) => (
                <TextField
                  size="small"
                  {...field}
                  fullWidth
                  label="متا تگ های اضافی"
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12 }} display="flex" justifyContent="flex-end">
            <Button type="submit" variant="contained" disabled={isSubmitting}>
              ثبت تغییرات سایت
            </Button>
          </Grid>
        </Grid>
      </Box>

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        ModalProps={{
          sx: {
            zIndex: (theme) => theme.zIndex.modal + 1000,
          },
        }}
      >
        <Box>
          <MediaPageWrapper
            onSelect={handleSelect}
            isOnForm
            type={drawerType}
            multiple={drawerMultiple}
          />
        </Box>
      </Drawer>
    </>
  );
};

export default DefaultSeoSettingsForm;
