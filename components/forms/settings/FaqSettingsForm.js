"use client";

import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import React from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { faqSettingsDefaultValues } from "@/constants/default-form-values";
import { toPersian } from "@/lib/number";

const FaqSettingsForm = ({ data, onSubmit }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      faq: data?.length ? data : [{ question: "", answer: "" }],
    },
  });

  // useFieldArray
  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: "faq",
  });

  // Update fields whenever `data` changes
  React.useEffect(() => {
    const initialFaq = data?.length ? data : [{ question: "", answer: "" }];
    reset({ faq: initialFaq });
    replace(initialFaq); // <-- update useFieldArray internal fields
  }, [data, reset, replace]);

  const handleFormSubmit = async ({ faq }) => {
    onSubmit && onSubmit(faq);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(handleFormSubmit)}
      sx={{ width: "100%", mt: 2 }}
    >
      {fields.map((item, index) => (
        <Box key={item.id}>
          <Grid container spacing={2} mt={4}>
            <Grid
              size={{ xs: 12 }}
              display="flex"
              justifyContent="space-between"
            >
              <Typography> مورد {toPersian(index + 1)} </Typography>

              <Button
                variant="outlined"
                color="error"
                size="small"
                startIcon={<DeleteIcon />}
                onClick={() => {
                  if (fields.length === 1) {
                    // Reset to one empty item
                    reset({ faq: [{ question: "", answer: "" }] });
                    return;
                  }
                  remove(index);
                }}
              >
                حذف آیتم
              </Button>
            </Grid>

            {/* Question Field */}
            <Grid size={{ xs: 12 }}>
              <Controller
                name={`faq.${index}.question`}
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="سوال"
                    size="small"
                    fullWidth
                    multiline
                    minRows={1}
                  />
                )}
              />
            </Grid>

            {/* Answer Field */}
            <Grid item size={{ xs: 12 }}>
              <Controller
                name={`faq.${index}.answer`}
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="پاسخ"
                    size="small"
                    fullWidth
                    multiline
                    minRows={3}
                  />
                )}
              />
            </Grid>

            {index !== fields.length - 1 && (
              <Grid size={{ xs: 12 }} mt={2}>
                <Divider sx={{ backgroundColor: "primary.main", height: 2 }} />
              </Grid>
            )}
          </Grid>
        </Box>
      ))}

      <Box display="flex" justifyContent="space-between" mt={4}>
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={() => append({ question: "", answer: "" })}
        >
          افزودن سوال جدید
        </Button>

        <Button type="submit" variant="contained" disabled={isSubmitting}>
          ذخیره تغییرات
        </Button>
      </Box>
    </Box>
  );
};

export default FaqSettingsForm;
