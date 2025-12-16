"use client";

import { ThemeProvider, CssBaseline } from "@mui/material";
import { useMemo } from "react";
import createAppTheme from "../palettes/theme";

export default function LandingThemeProvider({ children }) {
  const theme = useMemo(
    () => createAppTheme({ context: "landing" }),
    []
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
