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
import RichTextEditor from "@/components/fields/RichTextEditor";
import { toPersian } from "@/lib/number";

const TermsSettingsForm = ({ data, onSubmit }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      terms: data?.length ? data : [{ title: "", description: "" }],
    },
  });

  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: "terms",
  });

  // Sync with server data
  React.useEffect(() => {
    const initialTerms = data?.length ? data : [{ title: "", description: "" }];
    reset({ terms: initialTerms });
    replace(initialTerms);
  }, [data, reset, replace]);

  const handleFormSubmit = async ({ terms }) => {
    onSubmit && onSubmit(terms);
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
            <Grid size={{ xs: 12 }} display="flex" justifyContent="space-between">
              <Typography> مورد {toPersian(index + 1)} </Typography>

              <Button
                variant="outlined"
                color="error"
                size="small"
                startIcon={<DeleteIcon />}
                onClick={() => {
                  if (fields.length === 1) {
                    reset({ terms: [{ title: "", description: "" }] });
                    replace([{ title: "", description: "" }]);
                    return;
                  }
                  remove(index);
                }}
              >
                حذف آیتم
              </Button>
            </Grid>

            {/* Title Field */}
            <Grid size={{ xs: 12 }}>
              <Controller
                name={`terms.${index}.title`}
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="عنوان"
                    size="small"
                    fullWidth
                    multiline
                    minRows={1}
                  />
                )}
              />
            </Grid>

            {/* Description Field */}
            <Grid size={{ xs: 12 }}>
              <Controller
                name={`terms.${index}.description`}
                control={control}
                render={({ field }) => (
                  <RichTextEditor {...field} label="توضیحات" text={field.value} />
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
          onClick={() => append({ title: "", description: "" })}
        >
          افزودن مورد جدید
        </Button>

        <Button type="submit" variant="contained" disabled={isSubmitting}>
          ذخیره تغییرات
        </Button>
      </Box>
    </Box>
  );
};

export default TermsSettingsForm;
