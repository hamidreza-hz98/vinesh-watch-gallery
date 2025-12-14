"use client";

import Loader from "@/components/common/Loader";
import MediaPageWrapper from "@/components/wrappers/MediaPageWrapper";
import { defaultGeneralSettingsValues } from "@/constants/default-form-values";
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
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import MediaPreview from "@/components/common/MediaPreview";
import RichTextEditor from "@/components/fields/RichTextEditor";

const GeneralSettingsForm = ({ data, onSubmit }) => {
  const dispatch = useDispatch();

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
    defaultValues: defaultGeneralSettingsValues(data),
  });

  React.useEffect(() => {
    setSelectedMediaObjects({
      homepageSlider: data?.homepageSlider,
      logo: data?.logo,
    });

    reset(defaultGeneralSettingsValues(data));
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
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField size="small" {...field} fullWidth label="نام سایت" />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 8 }}>
            <Controller
              name="logo"
              control={control}
              defaultValue={null}
              render={({ field }) => (
                <Stack spacing={1}>
                  <Button
                    variant="contained"
                    startIcon={<CloudUploadIcon />}
                    onClick={() => openMediaDrawer("logo", "image", false)}
                  >
                    لوگو
                  </Button>
                  {selectedMediaObjects.logo && (
                    <MediaPreview file={selectedMediaObjects.logo} />
                  )}
                </Stack>
              )}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Controller
              name="footerText"
              control={control}
              render={({ field }) => (
                <RichTextEditor
                  {...field}
                  label="متن فوتر سایت"
                  text={field.value}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Controller
              name="homepageSlider"
              control={control}
              defaultValue={null}
              render={({ field }) => (
                <Stack spacing={1}>
                  <Typography>عکس های اسلایدر صفحه اصلی</Typography>

                  <Button
                    variant="contained"
                    startIcon={<CloudUploadIcon />}
                    onClick={() =>
                      openMediaDrawer("homepageSlider", "image", true)
                    }
                  >
                    انتخاب
                  </Button>

                  <Box display="flex" gap={2}>
                    {selectedMediaObjects.homepageSlider &&
                      selectedMediaObjects.homepageSlider.length !== 0 &&
                      selectedMediaObjects.homepageSlider.map((item, index) => (
                        <MediaPreview key={index} file={item} />
                      ))}
                  </Box>
                </Stack>
              )}
            />
          </Grid>

          <Grid size={{ xs: 12 }} mt={2}>
            <Divider sx={{ backgroundColor: "primary.main", height: 2 }} />

            <Typography mt={2} variant="h4">
              راه های ارتباطی
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Controller
              name="contactInfo.mobile"
              control={control}
              render={({ field }) => (
                <TextField
                  size="small"
                  {...field}
                  fullWidth
                  label="شماره همراه"
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Controller
              name="contactInfo.phone"
              control={control}
              render={({ field }) => (
                <TextField
                  size="small"
                  {...field}
                  fullWidth
                  label="شماره ثابت"
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Controller
              name="contactInfo.email"
              control={control}
              render={({ field }) => (
                <TextField size="small" {...field} fullWidth label="ایمیل" />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Controller
              name="contactInfo.address"
              control={control}
              render={({ field }) => (
                <TextField size="small" {...field} fullWidth label="آدرس" />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 8 }}>
            <Controller
              name="contactInfo.mapIframe"
              control={control}
              render={({ field }) => (
                <TextField
                  multiline
                  minRows={3}
                  size="small"
                  {...field}
                  fullWidth
                  label="لوکیشن آدرس (iframe)"
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12 }} mt={2}>
            <Divider sx={{ backgroundColor: "primary.main", height: 2 }} />

            <Typography mt={2} variant="h4">
              حساب های شبکه های اجتماعی
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Controller
              name="social.instagram"
              control={control}
              render={({ field }) => (
                <TextField
                  size="small"
                  {...field}
                  fullWidth
                  label="اینستاگرام"
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Controller
              name="social.telegram"
              control={control}
              render={({ field }) => (
                <TextField size="small" {...field} fullWidth label="تلگرام" />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Controller
              name="social.whatsapp"
              control={control}
              render={({ field }) => (
                <TextField size="small" {...field} fullWidth label="واتس اپ" />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Controller
              name="social.facebook"
              control={control}
              render={({ field }) => (
                <TextField
                  size="small"
                  {...field}
                  fullWidth
                  label="فیس بوک (متا)"
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Controller
              name="social.youtube"
              control={control}
              render={({ field }) => (
                <TextField size="small" {...field} fullWidth label="یوتیوب" />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Controller
              name="social.linkedin"
              control={control}
              render={({ field }) => (
                <TextField size="small" {...field} fullWidth label="لینکداین" />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Controller
              name="social.x"
              control={control}
              render={({ field }) => (
                <TextField
                  size="small"
                  {...field}
                  fullWidth
                  label="ایکس (توییتر)"
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

export default GeneralSettingsForm;
