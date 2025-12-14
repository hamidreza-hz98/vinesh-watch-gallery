"use client";

import React from "react";
import {
  Box,
  Typography,
  IconButton,
  Button,
  useTheme,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PhoneIcon from "@mui/icons-material/Phone";
import { toPersian } from "@/lib/number";

const ContactDrawer = ({ data, onClose }) => {
  const theme = useTheme();


  if(!data){
    return
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
        height: "100%",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h2" sx={{ fontWeight: 600 }}>
          اطلاعات تماس
        </Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Divider />

      {/* Contact Info */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Box>
          <Typography
            variant="subtitle2"
            sx={{ color: theme.palette.text.secondary }}
          >
            نام کامل
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: 500 }}>
            {data.fullName}
          </Typography>
        </Box>

        <Box>
          <Typography
            variant="subtitle2"
            sx={{ color: theme.palette.text.secondary }}
          >
            شماره موبایل
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography variant="h5" sx={{ fontWeight: 500 }}>
              {toPersian(data.mobile)}
            </Typography>

            <Button
              variant="contained"
              color="primary"
              size="small"
              startIcon={<PhoneIcon />}
              href={`tel:${data.mobile}`}
            >
              تماس
            </Button>
          </Box>
        </Box>

        <Box>
          <Typography
            variant="subtitle2"
            sx={{ color: theme.palette.text.secondary }}
          >
            پیام
          </Typography>
          <Typography
            variant="body1"
            sx={{ fontWeight: 500, whiteSpace: "pre-line" }}
          >
            {data.message}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ContactDrawer;
