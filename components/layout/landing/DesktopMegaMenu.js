/* eslint-disable react-hooks/refs */
"use client";

import React, { useState, useRef } from "react";
import {
  Box,
  Typography,
  Paper,
  Popper,
  Grid,
  ClickAwayListener,
  Grow,
  Link,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { paramifyLink } from "@/lib/request";

export default function DesktopMegaMenu({ categories, searchParams }) {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <Box>
        <Box
          ref={anchorRef}
          onMouseEnter={handleOpen}
          sx={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            gap: 0.5,
            color: "text.primary",
            fontSize: 14,
            fontWeight: 500,
            transition: "0.2s",
            "&:hover": { color: "primary.main" },
          }}
        >
          <Typography fontSize="14px">دسته بندی ها</Typography>
          <ExpandMoreIcon fontSize="small" />
        </Box>

        {/* Mega Menu */}
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          placement="bottom"
          transition
          disablePortal
          sx={{ zIndex: 1300, transform: "translate3d(53.4px, 52.8px, 0px) !important" }}
        >
          {({ TransitionProps }) => (
            <Grow {...TransitionProps} timeout={250}>
              <Paper
                onMouseEnter={handleOpen}
                onMouseLeave={handleClose}
                sx={{
                  mt: 1,
                  p: 3,
                  maxWidth: 900,
                  borderRadius: 3,
                  boxShadow: "0 8px 30px rgba(0,0,0,0.4)",
                  background:
                    "linear-gradient(180deg, rgba(30,30,30,0.95), rgba(10,10,10,0.95))",
                  border: "1px solid rgba(255,255,255,0.2)",
                  textAlign: "right",
                }}
              >
                <Grid container spacing={4}>
                  {categories.map((cat) => (
                    <Grid size={{ xs: 6, md: 3 }} key={cat._id}>
                      <Typography
                        component={Link}
                        href={`/products${paramifyLink(
                          searchParams,
                          "filters",
                          {
                            categories: { type: "in", value: [cat._id] },
                          }
                        )}`}
                        fontWeight="bold"
                        underline="none"
                        color="primary"
                        sx={{
                          display: "block",
                          mb: 1,
                          "&:hover": { textDecoration: "underline" },
                        }}
                      >
                        {cat.name}
                      </Typography>

                      {cat.children?.map((child) => (
                        <Typography
                          key={child._id}
                          component={Link}
                          href={`/products?${paramifyLink(
                            searchParams,
                            "filters",
                            {
                              categories: { type: "in", value: [child._id] },
                            }
                          )}`}
                          underline="none"
                          color="text.secondary"
                          display="block"
                          my={0.5}
                          fontSize={13}
                          sx={{ "&:hover": { color: "primary.main" } }}
                        >
                          {child.name}
                        </Typography>
                      ))}
                    </Grid>
                  ))}
                </Grid>
              </Paper>
            </Grow>
          )}
        </Popper>
      </Box>
    </ClickAwayListener>
  );
}
