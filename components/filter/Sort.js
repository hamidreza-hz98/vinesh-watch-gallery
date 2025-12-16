/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { useState, useEffect } from "react";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import PropTypes from "prop-types";

const Sort = ({ options = [] }) => {
  const theme = useTheme();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Active sort state
  const [activeSort, setActiveSort] = useState(null);

  useEffect(() => {
    // Read from URL on mount
    const sortParam = searchParams.get("sort");
    if (sortParam) {
      try {
        const parsed = JSON.parse(sortParam);
        setActiveSort(parsed[0]); // assuming single sort
      } catch (e) {
        setActiveSort(null);
      }
    }
  }, [searchParams]);

  const handleClick = (option) => {
    setActiveSort(option);

    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set("sort", JSON.stringify([{ field: option.field, order: option.order }]));
    
    router.replace(`?${newSearchParams.toString()}`);
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "start",
        width: "100%",
        gap: 1.5,
        overflowX: "auto",
        py: 1,
        px: 0.5,
        "&::-webkit-scrollbar": {
          display: "none",
        },
        scrollbarWidth: "none",
      }}
    >
      <Typography textOverflow="clip" noWrap>
        مرتب سازی:
      </Typography>

      {options.map((option, index) => {
        const isActive =
          activeSort &&
          activeSort.field === option.field &&
          activeSort.order === option.order;

        return (
          <Button
            key={index}
            onClick={() => handleClick(option)}
            variant={isActive ? "contained" : "outlined"}
            color={isActive ? "primary" : "inherit"}
            sx={{
              flexShrink: 0,
              textTransform: "none",
              fontWeight: isActive ? 600 : 400,
              borderColor: isActive ? theme.palette.primary.main : theme.palette.divider,
              color: isActive ? theme.palette.primary.contrastText : theme.palette.text.primary,
              "&:hover": {
                backgroundColor: isActive
                  ? theme.palette.primary.dark
                  : theme.palette.action.hover,
                borderColor: isActive
                  ? theme.palette.primary.dark
                  : theme.palette.divider,
              },
            }}
          >
            {option.label}
          </Button>
        );
      })}
    </Box>
  );
};

Sort.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      field: PropTypes.string.isRequired,
      order: PropTypes.oneOf(["asc", "desc"]).isRequired,
    })
  ).isRequired,
};

export default Sort;
