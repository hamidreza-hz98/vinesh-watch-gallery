"use client";

import React from "react";
import PropTypes from "prop-types";
import { Drawer, Divider, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import LandingThemeProvider from "@/theme/landing/provider";

function DrawerDialog({ open, payload, onClose }) {
  const { title, children = null } = payload;

  return (
    <LandingThemeProvider>
      <Drawer anchor="right" open={open} onClose={() => onClose()}>
        <div
          style={{
            width: 275,
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "1rem",
            }}
          >
            <h3>{title || "منو"}</h3>
            <IconButton onClick={() => onClose()}>
              <CloseIcon />
            </IconButton>
          </div>

          <Divider />

          {children}
        </div>
      </Drawer>
    </LandingThemeProvider>
  );
}

DrawerDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  payload: PropTypes.shape({
    title: PropTypes.string,
    links: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        href: PropTypes.string,
      })
    ),
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default DrawerDialog;
