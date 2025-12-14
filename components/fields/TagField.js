"use client";

import React, { useEffect, useState } from "react";
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
import { fetchWithAuth } from "@/lib/fetch";
import { modifyTagApi, tagApi } from "@/constants/api.routes";

export default function TagField({ tags = [], value = [], onChange }) {
  const notifications = useNotifications();
  const [loading, setLoading] = useState(false);

  // Map ObjectIds to full tag objects for display
  const selectedTags = value
    .map((id) => tags.find((t) => t._id === id))
    .filter(Boolean);

  const removeFromSelected = (tag) => {
    // Only send ObjectIds back
    onChange(value.filter((id) => id !== tag._id));
  };

  const removeFromDatabase = async (tag) => {
    try {
      setLoading(true);
      await fetchWithAuth(modifyTagApi(tag._id), { method: "DELETE" });
      notifications.show("تگ از دیتابیس حذف شد.", {
        severity: "success",
        autoHideDuration: 3000,
      });
      onChange(value.filter((id) => id !== tag._id));
    } catch (err) {
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
      const res = await fetchWithAuth(tagApi, {
        method: "POST",
        body: { name },
      });

      notifications.show(res?.message || "برچسب ایجاد و انتخاب شد.", {
        severity: "success",
        autoHideDuration: 3000,
      });
      onChange([...value, res.data._id]); // add new tag as ObjectId
    } catch (err) {
      notifications.show("مشکلی پیش آمد.", {
        severity: "error",
        autoHideDuration: 3000,
      });
    }
  };

  return (
    <Autocomplete
      multiple
      size="small"
      options={tags || []}
      value={selectedTags}
      filterSelectedOptions
      loading={loading}
      freeSolo
      getOptionLabel={(option) => option?.name || ""}
      onChange={(e, newValue, reason) => {
        const latest = newValue[newValue.length - 1];
        if (reason === "createOption" && typeof latest === "string") {
          handleCreateTag(latest);
        } else {
          onChange(newValue.map((t) => t._id)); // send back only ObjectIds
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
        <TextField
          {...params}
          label="تگ ها"
          placeholder="ساختن یا انتخاب از موارد موجود"
        />
      )}
    />
  );
}
