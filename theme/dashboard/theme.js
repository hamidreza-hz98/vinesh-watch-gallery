import getComponents from "./components";


import darkPalette from "./palette.dark";
import lightPalette from "./palette.light";
import typography from "./typography";
import breakpoints from "./breakpoints";
import shadows from "./shadows";
import shape from "./shape";
import transitions from "./transitions";
import { createTheme } from "@mui/material";

export function createDashboardTheme(mode = "dark") {
  const palette = mode === "light" ? lightPalette : darkPalette;

  const baseTheme = createTheme({
    direction: "rtl",
    palette,
    typography,
    breakpoints,
    shadows,
    shape,
    transitions,
  });

  // Now get components overrides using the base theme
  const components = getComponents(baseTheme);

  // Return theme including component overrides
  return createTheme(baseTheme, { components });
}
