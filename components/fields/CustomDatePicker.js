"use client";

import * as React from "react";
import { AdapterDateFnsJalali } from "@mui/x-date-pickers/AdapterDateFnsJalali";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TextField, Button } from "@mui/material";
import CalendarTodayRoundedIcon from "@mui/icons-material/CalendarTodayRounded";
import { usePickerContext, useSplitFieldProps, useParsedFormat } from "@mui/x-date-pickers";

// ✅ ButtonField for MUI DatePicker custom trigger
function ButtonField(props) {
  const { forwardedProps } = useSplitFieldProps(props, "date");
  const pickerContext = usePickerContext();
  const parsedFormat = useParsedFormat();

  const valueStr =
    pickerContext.value == null
      ? parsedFormat
      : pickerContext.value.toLocaleDateString("fa-IR"); // Show Jalali date

  return (
    <Button
      {...forwardedProps}
      variant="outlined"
      ref={pickerContext.triggerRef}
      size="small"
      startIcon={<CalendarTodayRoundedIcon fontSize="small" />}
      sx={{ minWidth: "fit-content" }}
      onClick={() => pickerContext.setOpen((prev) => !prev)}
    >
      {pickerContext.label ?? valueStr}
    </Button>
  );
}

// ✅ Main DatePicker component
export default function CustomDatePicker({
  value,
  onChange,
  error,
  helperText,
  label = "تاریخ",
  ...rest
}) {
  // Convert MongoDB/JS date to Date object if it's a string
  const parsedValue = value ? new Date(value) : null;

  return (
    <LocalizationProvider dateAdapter={AdapterDateFnsJalali}>
      <DatePicker
        {...rest}
        value={parsedValue}
        onChange={(newValue) => {
          // Convert selected Jalali date to JS Date (MongoDB compatible)
          onChange(newValue ? new Date(newValue) : null);
        }}
        slots={{ field: ButtonField }}
        slotProps={{
          textField: {
            error,
            helperText,
            fullWidth: true,
            label,
          },
          nextIconButton: { size: "small" },
          previousIconButton: { size: "small" },
        }}
        views={["day", "month", "year"]}
      />
    </LocalizationProvider>
  );
}
