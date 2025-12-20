"use client";

import React, { useEffect, useState, useCallback } from "react";
import {
  Autocomplete,
  TextField,
  Chip,
  IconButton,
  Box,
  Tooltip,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ClearIcon from "@mui/icons-material/Clear";
import useNotifications from "@/hooks/useNotifications/useNotifications";
import { createTag, deleteTag, getAllTags } from "@/app/actions/tag";

export default function TagField({ initialTags = [], value = [], onChange }) {
  const notifications = useNotifications();
  const [tags, setTags] = useState(initialTags);
  const [loading, setLoading] = useState(false);

  /* -------------------------------- fetch all tags -------------------------------- */

  const fetchTags = useCallback(async () => {
    try {
      const query = { page_size: 1000 };

      const { data } = await getAllTags(query);

      setTags(data?.tags || []);
    } catch {
      notifications.show("خطا در دریافت تگ‌ها.", { severity: "error" });
    }
  }, [notifications]);

  useEffect(() => {
    fetchTags();
  }, [fetchTags]);

  /* -------------------- map ObjectIds → full tag objects -------------------- */

  const selectedTags = React.useMemo(() => {
    return value
      .map((v) => {
        if (typeof v === "object") return v;
        return tags.find((t) => String(t._id) === String(v));
      })
      .filter(Boolean);
  }, [value, tags]);

  /* -------------------------------- handlers -------------------------------- */

  const removeFromSelected = (tag) => {
    onChange(value.filter((id) => id !== tag._id));
  };

  const removeFromDatabase = async (tag) => {
    try {
      setLoading(true);
      await deleteTag(tag._id);

      setTags((prev) => prev.filter((t) => t._id !== tag._id));
      onChange(value.filter((id) => id !== tag._id));

      notifications.show("تگ حذف شد.", {
        severity: "success",
        autoHideDuration: 3000,
      });
    } catch (error) {
      console.log(error);

      notifications.show("خطا هنگام حذف تگ.", {
        severity: "error",
        autoHideDuration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTag = async (name) => {
    try {
      const { data, message } = await createTag({ name });

      const newTag = data;

      setTags((prev) => [...prev, newTag]);
      onChange([...value, newTag._id]);

      notifications.show(message || "تگ ایجاد شد.", {
        severity: "success",
        autoHideDuration: 3000,
      });
    } catch (error) {
      console.log(error)
      notifications.show(error.message || "مشکلی پیش آمد.", {
        severity: "error",
        autoHideDuration: 3000,
      });
    }
  };

  /* -------------------------------- render -------------------------------- */

  return (
    <Autocomplete
      multiple
      size="small"
      options={tags}
      value={selectedTags}
      loading={loading}
      filterSelectedOptions
      freeSolo
      getOptionLabel={(option) => option?.name || ""}
      onChange={(e, newValue, reason) => {
        const latest = newValue[newValue.length - 1];

        if (reason === "createOption" && typeof latest === "string") {
          handleCreateTag(latest);
        } else {
          onChange(newValue.map((t) => t._id));
        }
      }}
      renderTags={(selected, getTagProps) =>
        selected.map((option, index) => (
          <Chip
            {...getTagProps({ index })}
            key={option._id}
            label={option.name}
            size="small"
            deleteIcon={<ClearIcon />}
            onDelete={() => removeFromSelected(option)}
          />
        ))
      }
      renderOption={(props, option) => (
        <Box
          {...props}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Typography variant="caption" noWrap>
            {option.name}
          </Typography>
          <Tooltip title="حذف از سایت">
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                removeFromDatabase(option);
              }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      )}
      renderInput={(params) => (
        <TextField {...params} label="تگ‌ها" placeholder="ساختن یا انتخاب" />
      )}
    />
  );
}
