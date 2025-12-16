/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, {
  useMemo,
  useState,
  useEffect,
  createContext,
  useContext,
} from "react";
import {
  ThemeProvider,
  CssBaseline,
  useMediaQuery,
} from "@mui/material";
import createAppTheme from "../palettes/theme";

const ThemeModeContext = createContext({
  themeMode: "dark",
  setThemeMode: () => {},
});

export function useThemeMode() {
  return useContext(ThemeModeContext);
}

export default function DashboardThemeProvider({
  children,
  mode = "system",
}) {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [themeMode, setThemeMode] = useState("dark");

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

  useEffect(() => {
    localStorage.setItem("theme", themeMode);
  }, [themeMode]);

  const theme = useMemo(
    () =>
      createAppTheme({
        context: "dashboard",
        mode: themeMode,
      }),
    [themeMode]
  );

  return (
    <ThemeModeContext.Provider value={{ themeMode, setThemeMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
}
