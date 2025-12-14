"use client";

import { mediaDefaultValues } from "@/constants/default-form-values";
import {
  Box,
  Button,
  Grid,
  LinearProgress,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import FileUpload from "../fields/FileUpload";
import useNotifications from "@/hooks/useNotifications/useNotifications";
import { setFilePath } from "@/lib/media";
import { modifyMediaApi, uploadMediaApi } from "@/constants/api.routes";

const MediaForm = ({ mode, data, onClose, onSuccess }) => {
  const [uploadProgress, setUploadProgress] = React.useState(0);
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [previewUrl, setPreviewUrl] = React.useState(null);

  const notifications = useNotifications();

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: mediaDefaultValues(data),
  });

  React.useEffect(() => {
    if (selectedFile) {
      const url = URL.createObjectURL(selectedFile);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    }

    if (data?.path) {
      setPreviewUrl(setFilePath(data.path));
    } else {
      setPreviewUrl(null);
    }
  }, [selectedFile, data?.path]);

  React.useEffect(() => {
    reset(mediaDefaultValues(data));
  }, [mode, data, reset]);

  /* ---------------------------------- */
  /* UPLOAD / UPDATE MEDIA */
  /* ---------------------------------- */
  const handleUploadMedia = async (formData) => {
    try {
      setUploadProgress(0);

      const { file, ...rest } = formData;
      const formDataToSend = new FormData();

      if (file instanceof File) {
        formDataToSend.append("file", file);
      } else if (mode === "edit" && data?.path) {
        formDataToSend.append("existingFile", data.path);
      } else {
        return;
      }

      Object.entries(rest).forEach(([key, value]) => {
        formDataToSend.append(key, value ?? "");
      });

      const url = mode === "edit" ? modifyMediaApi(formData._id) : uploadMediaApi;

      const method = mode === "edit" ? "PUT" : "POST";

      /* XMLHttpRequest for upload progress */
      const xhr = new XMLHttpRequest();
      xhr.open(method, url);

      // auth header
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

      if (token) {
        xhr.setRequestHeader("Authorization", `Bearer ${token}`);
      }

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percent = Math.round((event.loaded / event.total) * 100);
          setUploadProgress(percent);
        }
      };

      xhr.onload = () => {
        const res = JSON.parse(xhr.responseText);

        if (xhr.status >= 200 && xhr.status < 300) {
          setUploadProgress(100);
          onSuccess?.();
          reset();
          setSelectedFile(null);
          setPreviewUrl(null);

          setTimeout(() => setUploadProgress(0), 800);

          notifications.show(res.message, {
            severity: "success",
            autoHideDuration: 3000,
          });
        } else {
          throw new Error(res.message);
        }
      };

      xhr.onerror = () => {
        throw new Error("Upload failed");
      };

      xhr.send(formDataToSend);
    } catch (error) {
      notifications.show(error.message || error, {
        severity: "error",
        autoHideDuration: 3000,
      });
      setUploadProgress(0);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(handleUploadMedia)}
      sx={{ width: "100%", mt: 2 }}
    >
      <Grid container spacing={2}>
        {/* Upload */}
        <Grid size={{ xs: 12 }}>
          <Controller
            name="file"
            control={control}
            render={({ field }) => (
              <FileUpload
                {...field}
                onChange={(file) => {
                  field.onChange(file);
                  setSelectedFile(file);
                }}
                accept="image/*,video/*"
              />
            )}
          />
        </Grid>

        {/* Progress */}
        {uploadProgress > 0 && (
          <Grid size={{ xs: 12 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Box sx={{ flexGrow: 1 }}>
                <LinearProgress
                  variant="determinate"
                  value={uploadProgress}
                  sx={{ height: 8, borderRadius: 2 }}
                />
              </Box>
              <Typography variant="body2" sx={{ minWidth: 45 }}>
                {`${Math.round(uploadProgress)}%`}
              </Typography>
            </Box>
          </Grid>
        )}

        {/* Preview */}
        {previewUrl && (
          <Grid size={{ xs: 12 }}>
            <Box
              sx={{
                mt: 2,
                border: "1px solid #ccc",
                borderRadius: 2,
                p: 2,
                textAlign: "center",
              }}
            >
              {selectedFile?.type?.startsWith("image") ||
              data?.mimeType?.startsWith("image") ? (
                <Image
                  src={previewUrl}
                  alt="Preview"
                  unoptimized
                  crossOrigin="anonymous"
                  width={500}
                  height={300}
                  style={{
                    width: "100%",
                    maxHeight: 300,
                    objectFit: "contain",
                    borderRadius: 2,
                  }}
                />
              ) : (
                <video
                  src={previewUrl}
                  controls
                  style={{ width: "100%", maxHeight: 300, borderRadius: 8 }}
                />
              )}
            </Box>
          </Grid>
        )}

        {/* FORM FIELDS — PERSIAN */}
        <Grid size={{ xs: 12 }}>
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <TextField {...field} fullWidth label="عنوان" />
            )}
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="توضیحات"
                multiline
                rows={2}
              />
            )}
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Controller
            name="mediaAlt"
            control={control}
            render={({ field }) => (
              <TextField {...field} fullWidth label="متن جایگزین" />
            )}
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Controller
            name="mediaTitle"
            control={control}
            render={({ field }) => (
              <TextField {...field} fullWidth label="عنوان رسانه" />
            )}
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Controller
            name="mediaCaption"
            control={control}
            render={({ field }) => (
              <TextField {...field} fullWidth label="کپشن رسانه" />
            )}
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Controller
            name="mediaTranscript"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="متن رونوشت رسانه"
                multiline
                rows={3}
              />
            )}
          />
        </Grid>

        {/* SEO */}
        <Grid size={{ xs: 12 }}>
          <Controller
            name="seoTitle"
            control={control}
            render={({ field }) => (
              <TextField {...field} fullWidth label="عنوان سئو" />
            )}
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Controller
            name="seoDescription"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="توضیحات سئو"
                multiline
                rows={2}
              />
            )}
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Controller
            name="seoKeywords"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="کلمات کلیدی (با کاما جدا کنید)"
              />
            )}
          />
        </Grid>

        {/* Actions */}
        <Grid size={{ xs: 12 }} display="flex" justifyContent="space-between">
          <Button type="submit" variant="contained" disabled={isSubmitting}>
            {mode === "edit" ? "ویرایش" : "آپلود"}
          </Button>
          <Button variant="outlined" onClick={onClose}>
            بستن
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MediaForm;
