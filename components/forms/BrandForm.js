"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Divider,
  Drawer,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { parseCookies } from "nookies";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import MediaPreview from "../common/MediaPreview";
import MediaPageWrapper from "../wrappers/MediaPageWrapper";
import Loader from "../common/Loader";
import RichTextEditor from "../fields/RichTextEditor";
import { defaultBrandValues } from "@/constants/default-form-values";
import TagField from "../fields/TagField";

const BrandForm = ({ data, mode = "create", onSubmit }) => {
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
    defaultValues: defaultBrandValues(data),
  });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSelectedMediaObjects({
      logo: data?.logo,
      "seo.ogImage": data?.seo?.ogImage,
      "seo.twitterImage": data?.seo?.twitterImage,
    });

    reset(defaultBrandValues(data));
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

  if (mode === "edit" && !data) {
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
          {/* Basic Info */}
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField size="small" {...field} fullWidth label="نام برند" />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <Controller
              name="englishName"
              control={control}
              render={({ field }) => (
                <TextField
                  size="small"
                  {...field}
                  fullWidth
                  label="نام انگلیسی برند"
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <Controller
              name="slug"
              control={control}
              render={({ field }) => (
                <TextField size="small" {...field} fullWidth label="Slug" />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <RichTextEditor {...field} label="توضیحات" text={field.value} />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Controller
              name="logo"
              control={control}
              defaultValue={null}
              render={({ field }) => (
                <Stack spacing={1}>
                  <Typography>لوگوی برند</Typography>
                  <Button
                    variant="contained"
                    startIcon={<CloudUploadIcon />}
                    onClick={() => openMediaDrawer("logo", "image", false)}
                  >
                    انتخاب
                  </Button>
                  {selectedMediaObjects.logo && (
                    <MediaPreview file={selectedMediaObjects.logo} />
                  )}
                </Stack>
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Controller
              name="tags"
              control={control}
              defaultValue={[]}
              render={({ field }) => (
                <TagField
                  value={field.value}
                  onChange={(newValue) => field.onChange(newValue)}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12 }} mt={2}>
            <Divider sx={{ backgroundColor: "primary.main", height: 2 }} />

            <Typography mt={2} variant="h4">
              تنظیمات سئو
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <Controller
              name="seo.title"
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
              name="seo.description"
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
              name="seo.keywords"
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
              name="seo.ogTitle"
              control={control}
              render={({ field }) => (
                <TextField size="small" {...field} fullWidth label="OG Title" />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <Controller
              name="seo.ogDescription"
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
              name="seo.ogImage"
              control={control}
              defaultValue={null}
              render={({ field }) => (
                <Stack spacing={1}>
                  <Typography>OG Image</Typography>
                  <Button
                    variant="contained"
                    startIcon={<CloudUploadIcon />}
                    onClick={() =>
                      openMediaDrawer("seo.ogImage", "image", false)
                    }
                  >
                    انتخاب
                  </Button>
                  {selectedMediaObjects[`seo.ogImage`] && (
                    <MediaPreview file={selectedMediaObjects[`seo.ogImage`]} />
                  )}
                </Stack>
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <Controller
              name="seo.twitterTitle"
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
              name="seo.twitterDescription"
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
              name="seo.twitterImage"
              control={control}
              defaultValue={null}
              render={({ field }) => (
                <Stack spacing={1}>
                  <Typography>Twitter Image</Typography>
                  <Button
                    variant="contained"
                    startIcon={<CloudUploadIcon />}
                    onClick={() =>
                      openMediaDrawer("seo.twitterImage", "image", false)
                    }
                  >
                    انتخاب
                  </Button>
                  {selectedMediaObjects[`seo.twitterImage`] && (
                    <MediaPreview
                      file={selectedMediaObjects[`seo.twitterImage`]}
                    />
                  )}
                </Stack>
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <Controller
              name="seo.canonical"
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
              name="seo.robots"
              control={control}
              render={({ field }) => (
                <TextField size="small" {...field} fullWidth label="Robots" />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <Controller
              name="seo.additionalMetaTags"
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

          <Grid size={{ xs: 12 }} display="flex" justifyContent="space-between">
            <Button type="submit" variant="contained" disabled={isSubmitting}>
              {mode === "edit" ? "ویرایش برند" : "ایجاد برند"}
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

export default BrandForm;
