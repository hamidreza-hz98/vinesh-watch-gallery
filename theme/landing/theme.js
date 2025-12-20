import { createTheme } from "@mui/material/styles";

import palette from "./palette";
import typography from "./typography";
import breakpoints from "./breakpoints";
import shadows from "./shadows";
import shape from "./shape";
import transitions from "./transitions";
import getComponents from "./components";

const baseTheme = createTheme({
  direction: "rtl",
  palette,
  typography,
  breakpoints,
  shadows,
  shape,
  transitions,
});

const components = getComponents(baseTheme);

export default createTheme(baseTheme, { components });
