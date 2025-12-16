"use client";

import { Box, Typography, useTheme } from "@mui/material";
import React from "react";
import AddIcon from "@mui/icons-material/Add";

const NoDataAvailable = ({
  text = "داده ای برای نمایش وجود ندارد",
  onClick,
  clickText = "برای ساختن کلیک کنید",
}) => {
  const theme = useTheme();

  return (
    <Box
      onClick={onClick}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        cursor: "pointer",
        height: "100%",
        minHeight: "300px",
        borderRadius: 2,
        border: `4px dashed ${theme.palette.primary.main}`,
      }}
    >
      <Box>
        <Typography variant="h3"> {text} </Typography>

        <Box color={theme.palette.primary.main} mt={2} display="flex" alignItems="center" justifyContent="flex-start">
          <AddIcon />

          <Typography variant="h5">
            {" "}
            {clickText}{" "}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default NoDataAvailable;
