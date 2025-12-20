"use client";

import { ThemeProvider, CssBaseline } from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";
import { createDashboardTheme } from "./theme";
import { ThemeModeContext } from "./theme-mode";

export default function DashboardThemeProvider({ children }) {
  const [mode, setMode] = useState(null); // initially null
  const [mounted, setMounted] = useState(false);

  // run on client only
  useEffect(() => {
    const match = document.cookie
      .split("; ")
      .find((row) => row.startsWith("dashboard_theme="));
    const initialMode = match?.split("=")[1] || "dark";
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMode(initialMode);
    setMounted(true);
  }, []);

  const setThemeMode = useCallback((nextMode) => {
    setMode(nextMode);
    document.cookie = `dashboard_theme=${nextMode}; path=/; max-age=31536000`;
  }, []);

  const theme = useMemo(() => {
    if (!mode) return null;
    return createDashboardTheme(mode);
  }, [mode]);

  const value = useMemo(() => ({ themeMode: mode, setThemeMode }), [mode, setThemeMode]);

  if (!mounted || !theme) return null; // prevent render until mode is loaded

  return (
    <ThemeModeContext.Provider value={value}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
}

