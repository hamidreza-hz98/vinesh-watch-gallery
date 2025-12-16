import { createTheme, responsiveFontSizes } from "@mui/material/styles";

import landingPalette from "./landing.theme";
import dashboardLightPalette from "./dashboard.light.theme";
import dashboardDarkPalette from "./dashboard.dark.theme";

import typography from "../mui/typography";
import shadows from "../mui/shadows";
import breakpoints from "../mui/breakpoints";
import shape from "../mui/shape";
import transitions from "../mui/transitions";

// import both sets of components overrides
import getDashboardComponents from "../mui/dashboard-components";
import getLandingComponents from "../mui/landing-components";

/**
 * createAppTheme
 * @param {Object}
 * @param {"landing" | "dashboard"} context
 * @param {"light" | "dark"} mode
 */
export default function createAppTheme({ context = "dashboard", mode = "light" } = {}) {
  let palette;

  if (context === "landing") {
    palette = landingPalette;
  } else {
    palette = mode === "dark" ? dashboardDarkPalette : dashboardLightPalette;
  }

  const baseOptions = {
    direction: "rtl",
    palette,
    typography,
    shadows,
    breakpoints,
    shape,
    transitions,
  };

  let theme = createTheme(baseOptions);

  // choose the correct component overrides
  const componentsOverrides = context === "landing"
    ? getLandingComponents(theme)
    : getDashboardComponents(theme);

  theme = createTheme(theme, { components: componentsOverrides });

  theme = responsiveFontSizes(theme);

  return theme;
}
