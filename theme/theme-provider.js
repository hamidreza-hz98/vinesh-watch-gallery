/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { useMemo, useState, useEffect, createContext, useContext } from "react";
import { ThemeProvider as MUIThemeProvider, CssBaseline, useMediaQuery } from "@mui/material";
import createAppTheme from "./theme";

const ThemeModeContext = createContext({
  themeMode: "dark",
  setThemeMode: () => {},
});

export function useThemeMode() {
  return useContext(ThemeModeContext);
}

export default function AppThemeProvider({ children, mode = "system" }) {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [themeMode, setThemeMode] = useState("dark");

  // On mount, determine the initial theme
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "light" || savedTheme === "dark") {
      setThemeMode(savedTheme);
    } else if (mode === "system") {
      setThemeMode(prefersDarkMode ? "dark" : "light");
    } else {
      setThemeMode(mode);
    }
  }, [prefersDarkMode, mode]);

  // Save theme to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("theme", themeMode);
  }, [themeMode]);

  const theme = useMemo(() => createAppTheme({ mode: themeMode }), [themeMode]);

  return (
    <ThemeModeContext.Provider value={{ themeMode, setThemeMode }}>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </ThemeModeContext.Provider>
  );
}
