// src/theme/index.js
import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import palette from "./mui/palette";
import paletteDark from "./mui/paletteDark";
import typography from "./mui/typography";
import getComponents from "./mui/components";
import shadows from "./mui/shadows";
import breakpoints from "./mui/breakpoints";
import shape from "./mui/shape";
import transitions from "./mui/transitions";

/**
 * createAppTheme({ mode })
 * - mode: 'light' | 'dark'
 */
export default function createAppTheme({ mode = "light" } = {}) {
  const chosenPalette = mode === "dark" ? paletteDark : palette;

  const baseOptions = {
    direction: "rtl",
    palette: chosenPalette,
    typography,
    shadows,
    breakpoints,
    shape,
    transitions,
  };

  let theme = createTheme(baseOptions);

  theme = createTheme(theme, {
    components: getComponents(theme),
  });

  theme = responsiveFontSizes(theme);

  return theme;
}
