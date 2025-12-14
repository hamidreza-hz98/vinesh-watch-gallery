"use client";

import { aboutSettingsDefaultValues } from "@/constants/default-form-values";
import React from "react";
import { useDispatch } from "react-redux";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Controller, useForm } from "react-hook-form";
import Loader from "@/components/common/Loader";
import { Box, Button, Drawer, Grid, Stack, Typography } from "@mui/material";
import MediaPreview from "@/components/common/MediaPreview";
import RichTextEditor from "@/components/fields/RichTextEditor";
import MediaPageWrapper from "@/components/wrappers/MediaPageWrapper";

const AboutSettingsForm = ({ data, onSubmit }) => {
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
    defaultValues: aboutSettingsDefaultValues(data),
  });

  React.useEffect(() => {
    setSelectedMediaObjects({
      image: data?.image,
    });

    reset(aboutSettingsDefaultValues(data));
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

  // if (!data) {
  //   return <Loader />;
  // }

  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit(handleFormSubmit)}
        sx={{ width: "100%", mt: 2 }}
      >
        <Grid container spacing={2}>
          <Grid size={{ xs: 12 }}>
            <Controller
              name="image"
              control={control}
              defaultValue={null}
              render={({ field }) => (
                <Stack spacing={1}>
                  <Typography>عکس صفحه ی درباره ما</Typography>
                  <Button
                    variant="contained"
                    startIcon={<CloudUploadIcon />}
                    onClick={() => openMediaDrawer("image", "image", false)}
                  >
                    انتخاب
                  </Button>
                  {selectedMediaObjects[`image`] && (
                    <MediaPreview file={selectedMediaObjects[`image`]} />
                  )}
                </Stack>
              )}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <RichTextEditor
                  {...field}
                  label="محتوای صفحه درباره ما"
                  text={field.value}
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

export default AboutSettingsForm;
